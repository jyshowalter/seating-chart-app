const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "seats";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/buyTicket", (request, response) => {
  db.collection("tickets")
    .insertOne(request.body)
    .then((result) => {
      console.log("Ticket Bought");
      response.redirect("/");
    })
    .catch((error) => console.error(error));
});

app.put("/markUncomplete", (request, response) => {
  db.collection("seats")
    .updateOne(
      { thing: request.body.itemFromJS },
      {
        $tickets: {
          isChecked: false,
        },
      },
      {
        sort: { _id: -1 },
        upsert: false,
      }
    )
    .then((result) => {
      console.log("Marked Unbought");
      response.json("Marked Unbought");
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
