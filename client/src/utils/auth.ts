export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("currentUser");
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};
