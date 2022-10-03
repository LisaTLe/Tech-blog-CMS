const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-field");
  const password = document.querySelector("#password-field");

  const response = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  response.json().then((data) => console.log(data));

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("failed to login");
  }
};

document
  .querySelector("#login-btn")
  .addEventListener("click", loginFormHandler);
