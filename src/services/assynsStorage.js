export const _storeData = async (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const _retrieveData = async (key) => {
    const items = JSON.parse(localStorage.getItem(key));
    if (items) {
        return items;
    }
};