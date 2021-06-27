async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#event-name").value;
  const event_info = document.querySelector("#event-desc").value;
  const date_created = document.querySelector("#event-date").value;

  // Send fetch request to add a new event
  const response = await fetch(`/api/events`, {
    method: "POST",
    body: JSON.stringify({
      title,
      event_info,
      date_created,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //if the dish is added, the 'all' template will be rerendered
  if (response.ok) {
    document.location.replace("/events");
  } else {
    alert("Failed to add event");
  }
}

document
  .querySelector("#create-event-form")
  .addEventListener("submit", newFormHandler);
