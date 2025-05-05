import { blogApi_url, error_message_default } from "./constant.mjs";
const editPostForm = document.getElementById("editPostForm");

editPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const image = document.getElementById("image").value;
  const content = document.getElementById("content").value;
  const postId = new URLSearchParams(window.location.search).get("id");

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
      window.location.href = "../index.html";
    }
  } catch (error) {
    console.error(error_message_default, error?.message);
  }
});
