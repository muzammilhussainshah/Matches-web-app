import toast from 'react-hot-toast';

export const allLetter = (data) => {
    let letters = /^[a-zA-Z\s]*$/;
    if (letters.test(data)) {
        return true;
    } else {
        toast.error('You can type only alphabet characters.');
        return false;
    }
};
