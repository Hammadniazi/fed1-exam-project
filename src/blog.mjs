import { blogApi_url, error_message_default } from "./constant.mjs";
const blogForm = document.getElementById("blogForm");
const cancelButton = document.getElementById("cancel-button");
if (blogForm) {
  blogForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const image = document.getElementById("image").value;
    const content = document.getElementById("content").value;

    const postData = {
      title,
      media: {
        url: image,
        alt: title || "Blog Image",
      },
      body: content,
    };
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        window.location.href = "../account/login.html";
        return;
      }
      const response = await fetch(blogApi_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });
      console.log({ title, image, content });
      const data = await response.json();
      console.log("Response>>>", data);

      if (response.ok) {
        window.location.href = "../index.html";
      } else {
        alert("Failed to create post");
      }
    } catch (error) {
      console.error(error_message_default, error?.message);
    }
  });

  cancelButton.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
}
