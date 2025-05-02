import { blogApi_url, error_message_default } from "./constant.mjs";
const postTitle = document.querySelector(".post-title");
const postAuthor = document.querySelector(".post-author");
const postDate = document.querySelector(".post-date");
const postImage = document.querySelector(".post-image");
const postContent = document.querySelector(".post-content");

document.addEventListener("DOMContentLoaded", postPage);
async function postPage() {
  const postId = new URLSearchParams(window.location.search).get("id");

  if (!postId) {
    window.location.href = "../index.html";
    return;
  }

  try {
    const response = await fetch(`${blogApi_url}/${postId}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      postTitle.textContent = data.data.title;
      postAuthor.textContent = `Author: ${data.data.author.name}`;
      postDate.textContent = `Publish on: ${new Date(
        data.data.created
      ).toLocaleDateString()}`;
      postImage.src = data.data.media.url;
      postImage.alt = data.data.media.alt;
      postContent.innerHTML = data.data.body;
    } else {
      window.location.href = "../index.html";
    }
  } catch (error) {
    console.log(error_message_default, error?.message);
  }
}
