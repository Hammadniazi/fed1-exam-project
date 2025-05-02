import { error_message_default, postPage_url } from "./constant.mjs";

document.addEventListener("DOMContentLoaded", postPage);
async function postPage() {
  const postId = new URLSearchParams(window.location.search).get("id");
  debugger;
  if (!postId) {
    window.location.href = "../index.html";
    return;
  }

  try {
    const response = await fetch(`${postPage_url}/${postId}`);
    const data = await response.json();
    debugger;
    console.log(data);
  } catch (error) {
    console.log(error_message_default, error?.message);
    // window.location.href = "../index.html";
  }
}
