const serverUrl = import.meta.env.VITE_API_URL;

export const fetchAllAccommodations = async () => {
  const response = await fetch(`${serverUrl}/accommodations`);
  if (!response.ok) throw new Error("Failed to fetch all accommodations");
  return response.json();
};

export const addAccommodation = async (payload) => {
  const response = await fetch(`${serverUrl}/accommodations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Failed to add accommodation");
  return response.json();
};

export const fetchAccommodationById = async (id) => {
  const response = await fetch(`${serverUrl}/accommodations/${id}`);
  if (!response.ok)
    throw new Error(`Failed to fetch accommodation with ID ${id}`);
  return response.json();
};

export const updateStayedStatus = async (id, stayed) => {
  const response = await fetch(`${serverUrl}/accommodations/${id}/stayed`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stayed }),
  });
  if (!response.ok) throw new Error("Failed to update Accommodation status");
  return response.json();
};

export const deleteAccommodation = async (id) => {
  const response = await fetch(`${serverUrl}/accommodations/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete accommodation");
  return response.json();
};

export const editAccommodation = async (id, updatedData) => {
  const response = await fetch(`${serverUrl}/accommodations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) throw new Error("Failed to update Accommodation");
  return response.json();
};
