// src/utils/generate-slug.ts
function generateSlug(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").replace(/-{2,}/g, "-");
}

export {
  generateSlug
};
