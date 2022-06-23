import Quantity from './Quantity';
import {formatPriceWithSpaces} from '../utils/utils';
import {TrashIcon} from '@heroicons/react/outline';
import {deleteFromCart} from '../mutations/cart';

export interface Order {
    id: number;
    price: number;
    discount: number;
    quantity: number;
    product: {
        id: string;
        code: number;
        title: string;
        metaTitle: string;
        slug: string;
        summary: string;
        description: string;
        imgUrl: string;
        discount: number;
    };
}

const CartItem = ({order, index}: {order: Order; index: number}) => {
    return (
        <div className={`py-5 mx-2 flex items-center ${index > 0 && `border-t-2`}`}>
            <div className={'w-32 flex-none'}>
                <img src={order.product.imgUrl} className="rounded w-32 h-32 object-cover" alt={order.product.title} />
            </div>
            <div className={'pl-5 w-full'}>
                <div className={'min-w-fit pr-5'}>
                    <div className={'text-lg font-light'}>{order.product.title}</div>
                    <div className={'text-xs font-light text-slate-400'}>Код: {order.product.code}</div>
                </div>
                <div className={'flex justify-end'}>
                    <div className={'mt-2 lg:mt-0 flex w-full max-w-xs justify-between items-center'}>
                        <Quantity quantity={order.quantity} productId={order.product.id} />
                        <div className={'mx-2'}>
                            <div className={'text-lg font-medium whitespace-nowrap'}>{formatPriceWithSpaces(order.price * order.quantity)}₴</div>
                        </div>
                        <div>
                            <TrashIcon
                                className={'text-slate-400 w-5 h-5 cursor-pointer hover:text-red-500'}
                                onClick={async () => {
                                    await deleteFromCart({productId: order.id});
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
