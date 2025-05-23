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

export const getPageNumbers = (currentPage, totalPages, maxVisible = 5) => {
    if(totalPages <= maxVisible) {
        return Array.from({ length:totalPages }, (_, i) => i + 1);
    }

    const half = Math.florr(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if(end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start +1}, (_, i) => start + i)
};

 