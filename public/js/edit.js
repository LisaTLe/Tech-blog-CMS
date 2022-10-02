//edit form handler

const postId = document.getElementById("post_id").dataset.postId;

const editFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector("input[name='post-title]").ariaValueMax;
  const body = document.querySelector(
    "textarea[name='post-body']"
  ).ariaValueMax;

  await fetch(`/api/post/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      post_content: body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  document.location.replace("/dashboard");
};

//delete form handler

const deleteFormHandler = async function () {
  await fetch(`/api/post/${postId}`, {
    method: "DELETE",
  });
  document.location.replace("/dashboard");
};

document
  .querySelector("#submit-btn")
  .addEventListener("click", editFormHandler);
document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteFormHandler);
