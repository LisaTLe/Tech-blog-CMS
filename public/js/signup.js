const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-field");
  const email = document.querySelector("#email-field");
  const password = document.querySelector("#password-field");
  const github = document.querySelector("#github-field");

  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
      github: github.value,
    }),
    headers: {
      "Content-Type": "application.json",
    },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("failed to sign up");
  }
};

document
  .querySelector("#signup-btn")
  .addEventListener("click", signupFormHandler);
