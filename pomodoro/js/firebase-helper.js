export function saveUserToLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
}
  
export function getUserFromLocalStorage() {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
}