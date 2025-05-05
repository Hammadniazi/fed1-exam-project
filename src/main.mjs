import { blogApi_url, error_message_default } from "./constant.mjs";

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const gridBlog = document.getElementById("gridBlog");
const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("pageInfo");
const paginationContainer = document.getElementById("pagination");
const loader = document.getElementById("loader");

document.addEventListener("DOMContentLoaded", initializeBlog);
function initializeBlog() {
  fetchBlogPosts(currentPage);
}

let currentSlide = 0;
let slides = [];

const postPerPage = 12;
let currentPage = 1;
let totalPages = 1;
let totalPosts = 0;

async function fetchBlogPosts(page) {
  showLoader();
  try {
    const response = await fetch(
      `${blogApi_url}?limit=${postPerPage}&page=${page}`
    );
    const data = await response.json();
    totalPosts = data.meta.totalCount;
    totalPages = Math.ceil(totalPosts / postPerPage);
    currentPage = page;
    console.log(totalPosts);
    console.log(totalPages);
    console.log(currentPage);
    updatePagination();
    if (currentPage === 1) {
      createCarouselTemplate(data.data);
    }
    displayPosts(data.data);
  } catch (error) {
    console.error(error_message_default, error?.message);
  } finally {
    hideLoader();
  }
}

// carousel

function createCarouselTemplate(posts) {
  const carouselItems = posts
    .slice(0, 3)
    .map(
      (post, index) => `
  <div class="carousel-item ${index === 0 ? "active" : ""} ">
    <a href="post/post-page.html?id=${post.id}">
    <img src="${
      post.media?.url || "https://picsum.photos/450/250?grayscale"
    }" alt="${post.media?.alt || "NO Image"}">
    </a>
    <div class="carousel-content">
       <h2>${post.title} </h2>
    </div>
  </div>
  
  `
    )
    .join("");
  carousel.innerHTML = carouselItems;
  slides = document.querySelectorAll(".carousel-item");
  console.log("Slides>>>", slides.length);
}

function displayPosts(posts) {
  const blogItems = posts
    .map(
      (post) => `
    <div class="blog-card">
        ${
          post.media?.url
            ? `
        <a href="post/post-page.html?id=${post.id}">
        <img  src="${post.media.url}" alt="${
                post.media.alt || "Post Image"
              }" width = "450" />`
            : `<p>No Image Available</p>`
        } </a>
        <div class= "blog-card-content">
            <h3>${post.title}</h3>
            <p>${post.body ? trimText(post.body, 100) : ""}</p>
            <a href="post/post-page.html?id=${
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

function updatePagination() {
  paginationContainer.innerHTML = "";
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  const prevButton = document.createElement("button");
  const nextButton = document.createElement("button");
  prevButton.innerHTML = "&laquo";
  nextButton.innerHTML = "&raquo";
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      let previousPage = currentPage - 1;
      fetchBlogPosts(previousPage);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      let nextPage = currentPage + 1;
      fetchBlogPosts(nextPage);
    }
  });
  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(nextButton);
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
function showLoader() {
  loader.style.display = "block";
}
function hideLoader() {
  loader.style.display = "none";
}
const trimText = (text, maxLength) => {
  if (text.length >= maxLength) {
    return text.slice(0, text.slice(0, maxLength).lastIndexOf(" ")) + "...";
  } else {
    return text;
  }
};
