export const truncate = (text) => {
  const limit = 150;
  return text.length > limit ? text.slice(0, limit) + '...': text;
};

