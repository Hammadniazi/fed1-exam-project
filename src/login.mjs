import { error_message_default, loginApi_url } from "./constant.mjs";
import { validateEmail, validPassword, hamburger } from "./utils.mjs";
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const formError = document.getElementById("form-error");


function saveToken(token) {
  localStorage.setItem("accessToken", token);
}
function getToken() {
  return localStorage.getItem("accessToken");
}
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!validateEmail(email)) {
    emailError.textContent = "Please enter a valid email address"
    
    return;
  }
  if (!validPassword(password)) {
    passwordError.textContent = "Password must be atleast 6 characters long!"
    return;
  }
  try {
    const response = await fetch(loginApi_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();


    if (response.ok) {
      localStorage.setItem("username", data.data.name);

      saveToken(data.data.accessToken);
      window.location.href = "../post/manage-post.html";
    } else {
      
      formError.textContent = data.message || " Login Failed! Please try again."
    }
  } catch (error) {
    console.error(error_message_default, error?.message);
  }
});
hamburger();
