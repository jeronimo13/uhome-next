const pluralizeItems = (count) => {
    const mod = count % 10;
    if (mod === 1) {
        return count + ' товар';
    }
    if (mod > 1 && mod < 5) {
        return count + ' товара';
    }
    return count + ' товарів';
};

const formatPriceWithSpaces = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export {pluralizeItems, formatPriceWithSpaces};
