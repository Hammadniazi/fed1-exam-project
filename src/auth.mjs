import { registerApi_url, error_message_default } from "./constant.mjs";
import { hamburger,  validateEmail, validPassword } from "./utils.mjs";

const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!validateEmail(email)) {
    alert("Please enter a valid email address ");
    return;
  }
  if (!validPassword(password)) {
    alert("Password must be alteast 6 characters long");
    return;
  }
  if (password !== confirmPassword) {
    alert("Password do not match");
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
      alert("You have successfully register");
    } else {
      alert(data.message || "Registration failed. Please try again later.");
    }
  } catch (error) {
    console.error(error_message_default, error?.message);
  }
});
hamburger();
