import { registerApi_url, error_message_default } from "./constant.mjs";
const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassward = document.getElementById("confirmPassword").value;
  debugger;

  try {
    const response = await fetch(registerApi_url);
    const data = await response.json();
    if (response.ok) {
      console.alert("You have successfully register");
    } else {
      alert("data.message" || "Registration failed. Please try again later.");
    }
  } catch (error) {
    console.error(error_message_default, error?.message);
  }
});
