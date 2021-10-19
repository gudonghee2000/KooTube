import 'regenerator-runtime';
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");
const videoId = videoContainer.dataset.id;

const handleDeleteNewComment = async (event) => {
  const li = event.target.closest("li");
  const commentId = li.dataset.id;
  const response = await fetch(`/api/videos/${videoId}/deletecomment/${commentId}`, {
    method: "DELETE",
  })
  if (response.status === 200) {
    videoComments.removeChild(li);
  }
}

const addComment = (text, id) => {
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.id = "deleteCommentBtn";
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
  span2.addEventListener("click", handleDeleteNewComment);
}

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
}

const handleDeleteComment = async (event) => {
  if (event.target.className !== "deleteCommentBtn") {
    return;
  }
  const li = event.target.closest("li");
  const commentId = li.dataset.id;
  const response = await fetch(`/api/videos/${videoId}/deletecomment/${commentId}`, {
    method: "DELETE",
  })
  if (response.status === 200) {
    videoComments.removeChild(li);
  }
}

form.addEventListener("submit", handleSubmit);
videoComments.addEventListener("click", handleDeleteComment);