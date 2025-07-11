export function validateEmail(email) {
  return email.endsWith("@stud.noroff.no");
}
export function validPassword(password) {
  return password.length >= 6;
}

export function hamburger() {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  const navLinksAnchors = navLinks.querySelectorAll("a")

  function toggleMenu(){
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("active");
    navLinks.setAttribute("aria-hidden", String(isExpanded));
    if(!isExpanded){
      setTimeout(()=>{
        navLinksAnchors[0]?.focus()
      }, 100);
    }

}
  hamburger.addEventListener("click", toggleMenu);
    hamburger.addEventListener("keydown", (e)=>{
      if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        toggleMenu();
      }
      });

}
