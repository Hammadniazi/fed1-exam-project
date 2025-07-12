import { registerApi_url, error_message_default } from "./constant.mjs";
import { hamburger,  validateEmail, validPassword } from "./utils.mjs";

const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("password-confirm-error");
const formError = document.getElementById("form-register-error");

const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Clears previous errors
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
  formError.textContent = "";
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!validateEmail(email)) {
    emailError.textContent = "Please enter a valid email address!";
    return;
  }
  if (!validPassword(password)) {
    passwordError.textContent = "Password must be 6 characters long";
    return;
  }
  if (password !== confirmPassword) {
    confirmPasswordError.textContent= "Password do not match";
    return;
  }
  try {
    const response = await fetch(registerApi_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: email.split("@")[0],
      }),
    });
    const data = await response.json();

    if (response.ok) {
      window.location.href = "./login.html"
      alert("You have successfully register");
    } else {
      formError.textContent = data.message || "Registration failed. Please try again later.";
    }
  } catch (error) {
    console.error(error_message_default, error?.message);
  }
});
hamburger();
