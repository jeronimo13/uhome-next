import {useState} from 'react';
import {addToCart, decreaseItemQuantity} from '../mutations/cart';

const Quantity = (props) => {
    const [quantity, setQuantity] = useState(props.quantity);
    return (
        <div className={'flex items-center'}>
            <div
                className={`border w-6 h-6 text-lg font-light justify-center items-center flex rounded-full 
                ${quantity > 1 && 'cursor-pointer'}
                ${quantity === 1 && 'text-gray-300'}
                `}
                onClick={async () => {
                    if (quantity > 1) {
                        await decreaseItemQuantity({productId: props.productId});
                        setQuantity(quantity - 1);
                    }
                }}
            >
                –
            </div>
            <div className={'text-md font-light text-lg border w-10 h-10 flex justify-center items-center rounded mx-2'}>{quantity}</div>
            <div
                className={'border w-6 h-6 flex text-xl font-light justify-center items-center rounded-full cursor-pointer'}
                onClick={async () => {
                    await addToCart({productId: props.productId});
                    setQuantity(quantity + 1);
                }}
            >
                +
            </div>
        </div>
    );
};

export default Quantity;
