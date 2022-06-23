import queryClient from './queryClient';

const addToCart = async ({productId}) => {
    await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId,
        }),
    });

    await queryClient.invalidateQueries(['cart']);
};

const deleteFromCart = async ({productId}) => {
    await fetch(`/api/cart/item/${productId}`, {
        method: 'DELETE',
    });
    await queryClient.invalidateQueries('cart');
};

export {addToCart, deleteFromCart};
