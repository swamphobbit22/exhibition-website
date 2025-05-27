export const getPaginationData = (items, currentPage, itemsPerPage) => {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage -1 ) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);


  return {
    currentItems,
    totalPages,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    startIndex: startIndex + 1,
    endIndex: Math.min(endIndex, totalItems)
  };
};

export const getPageNumbers = (totalPages, currentPage, pagesPerGroup = 10) => {
  if (totalPages <= 0) return [];

  const groupIndex = Math.floor((currentPage - 1) / pagesPerGroup);
  const startPage = groupIndex * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};


