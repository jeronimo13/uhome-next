import {useState} from 'react';
import {addToCart} from '../mutations/cart';

const Quantity = (props) => {
    const [quantity, setQuantity] = useState(props.quantity);
    return (
        <div className={'flex items-center'}>
            <div
                className={'border w-5 h-5 font-medium justify-center items-center flex rounded-full cursor-pointer'}
                onClick={async () => {
                    setQuantity(quantity - 1);
                }}
            >
                -
            </div>
            <div className={'text-md font-medium border w-10 h-10 flex justify-center items-center rounded mx-2'}>{quantity}</div>
            <div
                className={'border w-5 h-5 flex font-medium justify-center items-center rounded-full cursor-pointer'}
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
