export const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return `Bearer ${token}`;
};
