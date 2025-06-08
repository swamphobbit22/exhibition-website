export const sortedByField = (array, field, order = 'asc') => {
    const sortedArray = array.toSorted((a, b) => {
        const aRaw = a[field];
        const bRaw = b[field];

        const aValue = aRaw ? aRaw.toString().toLowerCase() : 'zzzz';
        const bValue = bRaw ? bRaw.toString().toLowerCase() : 'zzzz';

        return aValue.localeCompare(bValue, undefined, { sensitivity: 'base'})
    });
    return order === 'desc' ? sortedArray.toReversed() : sortedArray;
};

export const sortedByNumber = (array, field, order = 'asc') => {
    const sortedArray = array.toSorted((a, b) => a[field] - b[field]);
    return order === 'desc' ? sortedArray.toReversed() : sortedArray;
};

export const sortedByDate = (array, field, order='asc') => {
    const sortedArray = [...array].toSorted((a, b) => {
        const dateA = new Date(a[field])
        const dateB = new Date(b[field])
        return dateA - dateB //put in some error checking
    });
    return order === 'desc' ? sortedArray.toReversed() : sortedArray;
};