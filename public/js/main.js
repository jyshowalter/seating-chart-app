let seats = document.querySelector(".all-seats");

let tickets = seats.querySelectorAll("input");
tickets.forEach((ticket) => {
  ticket.addEventListener("change", () => {
    let amount = document.querySelector(".amount").innerHTML;
    let count = document.querySelector(".count").innerHTML;
    amount = Number(amount);
    count = Number(count);
    const itemText = ticket.id;
    console.log(itemText);

    if (ticket.checked) {
      count += 1;
      amount += 10;
    } else {
      count -= 1;
      amount -= 10;
    }
    document.querySelector(".amount").innerHTML = amount;
    document.querySelector(".count").innerHTML = count;

    const requestData = {
      ticketId: ticket.id,
      isChecked: ticket.checked,
      amount: amount,
      count: count,
    };

    fetch("/buyTicket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
