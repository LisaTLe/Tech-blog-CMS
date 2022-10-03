const logout = async function () {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("could not log out");
  }
};

const logoutBtn = document.querySelector("#logout-link");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
