function convertToSubcurrency(amount: number, factor = 100){
    const result = Math.round(amount * factor);

    if (result < 50){
        throw new Error('Le prix doit etre supérieur a 50 centime')
    }

    return result;
}

export default convertToSubcurrency;