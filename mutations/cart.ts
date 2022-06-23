import queryClient from './queryClient';
import {Store} from 'react-notifications-component';
import message from '../notifications/message';

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

    Store.addNotification({
        title: 'Товар додано в кошик',
        message: message(),
        type: 'success',
        container: 'bottom-center',
        dismiss: {
            duration: 3000,
        },
    });
};

const deleteFromCart = async ({productId}) => {
    await fetch(`/api/cart/item/${productId}`, {
        method: 'DELETE',
    });
    await queryClient.invalidateQueries('cart');
};

export {addToCart, deleteFromCart};
