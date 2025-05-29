export const truncate = (text, limit) => {
  return text.length > limit ? text.slice(0, 150) + '...' : text;
};

