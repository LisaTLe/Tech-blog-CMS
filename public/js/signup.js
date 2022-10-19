async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-field").value.trim();
  // const email = document.querySelector("#email-field");
  const password = document.querySelector("#password-field").value.trim();
  // const github = document.querySelector("#github-field");

  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("success");

      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
