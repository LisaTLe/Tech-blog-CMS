const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title-field").value.trim();
  const post_content = document.querySelector("#content-field").value.trim();

  if (!(title && post_content)) {
    alert("Please fill out all requried fields");
    return;
  }
  await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      title,
      post_content,
    }),
    headers: { "Content-Type": "application.json" },
  });

  document.location.replace("/dashboard");
};

document.querySelector("#submit-btn").addEventListener("clcik", newFormHandler);
