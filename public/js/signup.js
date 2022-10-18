const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-field").value.trim();
  // const email = document.querySelector("#email-field");
  const password = document.querySelector("#password-field").value.trim();
  // const github = document.querySelector("#github-field");

  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username,

      password,
    }),
    headers: {
      "Content-Type": "application/json",
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
