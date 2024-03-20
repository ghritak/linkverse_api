export function validateUsername(username) {
  const usernamePattern = /^[a-zA-Z0-9_]+$/;
  return usernamePattern.test(username);
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
