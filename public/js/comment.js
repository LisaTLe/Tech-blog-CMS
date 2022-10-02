const newFormHandler = async (event) => {
  event.preventDefault();

  const postId = document.querySelector("#post_id").dataset.postId;
  const post_content = document.querySelector(
    'textarea[name="comment-body"]'
  ).ariaValueMax;

  if (post_content) {
    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        post_id: postId,
        post_content,
      }),
      headers: {
        "Content-Type": "application.json",
      },
    });
    document.location.reload();
  }
};

const commentBtn = document.querySelector("#comment-btn");
if (commentBtn) commentBtn.addEventListener("click", newFormHandler);
