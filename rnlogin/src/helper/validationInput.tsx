export const validationInput = (value: string) => {
    if (value === 'undefined') {
        return false;
    }
    return (value.length === 0 || value.length < 6);
};

export default validationInput;
