import { blogApi_url, error_message_default } from "./constant.mjs";

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const gridBlog = document.getElementById("gridBlog");
const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");

document.addEventListener("DOMContentLoaded", initializeBlog);
let currentSlide = 0;
let slides = [];
debugger;

async function fetchBlogPosts() {
  try {
    const response = await fetch(blogApi_url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error_message_default, error?.message);
  }
}

// carousel

function createCarouselTemplate(posts) {
  const carouselItems = posts
    .slice(0, 3)
    .map(
      (post, index) => `
  <div class="carousel-item ${index === 0 ? "active" : ""} ">
    <img src="${post.media.url}" alt="${post.media.alt}">
    <div class="carousel-content">
       <h2>${post.title} </h2>
       <a href="/index.html?id=${post.id}" >Read More</a>
    </div>
  </div>
  
  `
    )
    .join("");
  carousel.innerHTML = carouselItems;
  slides = document.querySelectorAll(".carousel-item");
  debugger;
  console.log("Slides>>>", slides.length);
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
function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.remove("active");
    if (index === currentSlide) {
      slide.classList.add("active");
    }
  });
}

async function initializeBlog() {
  const posts = await fetchBlogPosts();
  if (posts.length > 0) {
    createCarouselTemplate(posts);
    createTemplate(posts);
  }
}

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
});
nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
});
