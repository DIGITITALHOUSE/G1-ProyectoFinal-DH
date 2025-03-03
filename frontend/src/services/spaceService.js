const API_URL = "http://localhost:8080/spaces";

export const getAllSpaces = async () => {
  const response = await fetch(API_URL);
  return response.ok ? response.json() : [];
};

export const getSpaceById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.ok ? response.json() : null;
};

export const createSpace = async (spaceData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spaceData),
  });
  return response.ok ? response.json() : null;
};

export const updateSpace = async (id, spaceData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spaceData),
  });
  return response.ok ? response.json() : null;
};

export const deleteSpace = async (id) => {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
