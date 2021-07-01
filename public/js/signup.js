const signUpFormHandler = async (event) => {
    event.preventDefault();    const name = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();    if (name && password) {
      const response = await fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify({ name, password }),
        headers: { "Content-Type": "application/json" },
      });
      console.log("here")
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to sign up");
      }
    }
  };  document
    .querySelector("#signup-form")
    .addEventListener("submit", signUpFormHandler);