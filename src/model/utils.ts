function generateRandomId() {
    return 'id' + Math.random().toString(16).slice(2);
}

const getNumfromPxString = (str: string): number => {
    let num = 0;
    num = Number(str.slice(0, str.length - 2));
    return num;
};

export { generateRandomId, getNumfromPxString };
