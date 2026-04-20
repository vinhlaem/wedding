import api from "./axios";

/**
 * Fetch media items for a given component (and optional role) from the backend.
 * @param {'banner'|'gallery'|'program'|'video'|'timeline'|'profile'|'quote'|'footer'} component
 * @param {string} [role] - optional role filter (e.g. 'wife', 'husband', 'image1', 'source', 'poster')
 * @returns {Promise<Array>}
 */
export const fetchMedia = async (component, role, limit) => {
  const params = { component };
  if (role) params.role = role;
  if (limit) params.limit = limit;
  const { data } = await api.get("/media", { params });
  return data.data; // array of Media documents
};
