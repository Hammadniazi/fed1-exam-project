export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  return emailRegex.test(email);
}
export function validPassword(password) {
  return password.length >= 6;
}

export function hamburger() {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}
