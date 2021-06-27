async function newFormHandler(event) {
  event.preventDefault();

  const title = document.getElementById("event-name").value;
  const event_info = document.getElementById("event-desc").value;
  const date_created = document.getElementById("event-date").value;

  console.log(title);
  console.log(event_info);
  console.log(date_created);

  // Send fetch request to add a new event
  const response = await fetch(`/api/events`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      event_info: event_info,
      date_created: date_created,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response);

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to add event");
  }
}

document
  .getElementById("create-event-form")
  .addEventListener("click", newFormHandler);
