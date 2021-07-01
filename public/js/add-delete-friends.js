// Deleting a Friend

async function deleteFormHandler(event) {
  event.preventDefault();

  const id = document
    .querySelector(".delete-post-btn")
    .getAttribute("data-value");

  const response = await fetch(`/api/friends/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".delete-btn")
  .addEventListener("click", deleteFormHandler);

// -----------------------------------------------------------------------------

// adding a Friend
async function newFormHandler(event) {
  event.preventDefault();

  const id = document.getElementById("input1").value.trim();
  console.log(id);

  const response = await fetch(`/api/friends/${id}`, {
    method: "POST",
    // body: JSON.stringify({
    //   id: id,
    // }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#input2").addEventListener("submit", newFormHandler);
