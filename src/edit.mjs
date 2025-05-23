import { blogApi_url, error_message_default } from "./constant.mjs";
const editPostForm = document.getElementById("editPostForm");
const deletePostButton = document.getElementById("delete-button");
const cancelBtn = document.querySelector(".cancel-button");
const titleInput = document.getElementById("title");
const imageInput = document.getElementById("image");
const contentInput = document.getElementById("content");
const postId = new URLSearchParams(window.location.search).get("id");

document.addEventListener("DOMContentLoaded", () => {
  if (!postId) {
    alert("No Id found in the URl");
    return;
  } else {
    getData(postId);
  }
});
async function getData() {
  try {
    const response = await fetch(`${blogApi_url}/${postId}`);
    const data = await response.json();
    titleInput.value = data.data.title;
    imageInput.value = data.data.media.url;
    contentInput.value = data.data.body;
  } catch (error) {
    console.error(error_message_default, error?.message);
  }
}

editPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = titleInput.value;
  const image = imageInput.value;
  const content = contentInput.value;

  const editData = {
    title,
    media: {
      url: image,
      alt: title || "Updated Image",
    },
    body: content,
  };
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "../account/login.html";
      return;
    }

    const response = await fetch(`${blogApi_url}/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editData),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Post updated successfully");
      window.location.href = "../post/manage-post.html";
    }
  } catch (error) {
    console.error(error_message_default, error?.message);
  }
});

deletePostButton.addEventListener("click", async () => {
  const confirmDelete = confirm("Are you sure you want to delete this post ?");
  if (!confirmDelete) return;
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "../account/login.html";
      return;
    }
    const response = await fetch(`${blogApi_url}/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      alert("Post deleted successfully");
      window.location.href = "../post/manage-post.html";
    } else {
      alert("Failed to delete the post");
    }
  } catch (error) {
    console.error(error_message_default, error?.message);
  }
});

cancelBtn.addEventListener("click", () => {
  window.location.href = "../post/manage-post.html";
});
