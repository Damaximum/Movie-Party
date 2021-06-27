const logout = async () => {
<<<<<<< HEAD
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
=======
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
>>>>>>> origin/main
  });

  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert(response.statusText);
  }
};

<<<<<<< HEAD
document.querySelector('#logout').addEventListener('click', logout);
=======
document.querySelector("#logout").addEventListener("click", logout);
>>>>>>> origin/main
