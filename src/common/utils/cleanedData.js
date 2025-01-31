const cleanedData = (obj) => {
    for (const key in obj) {
        if (obj[key] === null ||
            obj[key] === undefined ||
            (typeof obj[key] === 'string' && obj[key].trim() === '') ||
            (Array.isArray(obj[key]) && obj[key].length === 0)
        ) {
            delete obj[key];
        } else if (typeof obj[key] === 'string') {
            obj[key] = obj[key].replace(/\s+/g, ' ');
        }
    }
    return obj;
}

export default cleanedData;