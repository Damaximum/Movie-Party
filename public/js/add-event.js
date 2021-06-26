async function newFormHandler(event) {
    event.preventDefault();
    const event_name = document.querySelector('#event-name').value;
    const description = document.querySelector('#event-desc').value;
    const date = document.querySelector('#event-date').value;
   
    // Send fetch request to add a new event
    const response = await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({
        event_name,
        description,
        date
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //if the dish is added, the 'all' template will be rerendered
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add event');
    }
  }
  
  document.querySelector('.new-event-form').addEventListener('submit', newFormHandler);
    