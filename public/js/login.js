const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-field").value.trim();
  const password = document.querySelector("#password-field").value.trim();

  const response = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
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
