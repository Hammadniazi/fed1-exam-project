export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  return emailRegex.test(email);
}
export function validPassword(password) {
  return password.length >= 6;
}
