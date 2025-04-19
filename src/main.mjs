import { blogApi_url, error_message_default } from "./constant.mjs";

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const gridBlog = document.getElementById("gridBlog");

document.addEventListener("DOMContentLoaded", initializeBlog);

async function fetchBlogPosts() {
  try {
    const response = await fetch(blogApi_url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error_message_default, error?.message);
  }
}

function createTemplate(posts) {
  const blogItems = posts
    .map(
      (post) => `
    <div class="blog-card">
        ${
          post.media?.url
            ? `
        <img src="${post.media.url}" alt="${
                post.media.alt || "Post Image"
              }" width = "450" />`
            : `<p>No Image Available</p>`
        }
        <div class= "blog-card-content">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <a href="post/index.html?id=${
              post.id
            }" class="read-more">Read More</a>
        </div>
    </div>
    `
    )
    .join("");
  gridBlog.innerHTML = blogItems;
}

async function initializeBlog() {
  const posts = await fetchBlogPosts();
  if (posts.length > 0) {
    createTemplate(posts);
  }
}

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
