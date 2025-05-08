import { error_message_default, loginApi_url } from "./constant.mjs";
import { validateEmail, validPassword } from "./utils.mjs";
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
    alert("Please enter a valid Email address");
    return;
  }
  if (!validPassword(password)) {
    alert("Password must be at least 6 characters long");
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
    console.log(data.data);

    if (response.ok) {
      saveToken(data.data.accessToken);
      window.location.href = "../post/manage-post.html";
    } else {
      alert("Login failed! Please try again");
    }
  } catch (error) {
    console.error(error_message_default, error?.message);
  }
});
