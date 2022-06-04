import {ArrowLeftIcon, TrashIcon} from '@heroicons/react/outline';
import {getSession} from 'next-auth/react';
import {useState} from 'react';
import {getCart} from './api/cart';

const Bubble = (props) => {
    return <div className={'bg-white rounded-xl p-5 mt-5'}>{props.children}</div>;
};

interface Order {
    id: number;
    title: string;
    imgUrl: string;
    price: number;
    discount: number;
    code: number;
    quantity: number;
}

interface CheckoutProps {
    cart: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        street: string;
        city: string;
        zip: string;
        items: Order[];
    };
}

const Quantity = (props) => {
    const [quantity, setQuantity] = useState(props.quantity);
    return (
        <div className={'flex items-center'}>
            <button
                className={'border-2 w-5 h-5 justify-center items-center flex rounded-full'}
                onClick={() => {
                    setQuantity(quantity - 1);
                }}
            >
                -
            </button>
            <div className={'text-xl border-2 w-10 h-10 flex justify-center items-center rounded mx-2'}>{quantity}</div>
            <button
                className={'border-2 w-5 h-5 justify-center items-center flex rounded-full'}
                onClick={() => {
                    setQuantity(quantity + 1);
                }}
            >
                +
            </button>
        </div>
    );
};

const formatPriceWithSpaces = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const Order = ({order}: {order: Order}) => {
    return (
        <div className={'mt-5 mx-2 flex items-center'}>
            <div className={'w-32 flex-none'}>
                <img src={order.imgUrl} className="rounded w-32 l-32 object-cover" alt={order.title} />
            </div>
            <div className={'pl-5 lg:flex flex-1 items-center justify-between'}>
                <div>
                    <div className={'text-lg font-light'}>{order.title}</div>
                    <div className={'mt-2 text-xs font-light text-slate-400'}>Код: {order.code}</div>
                </div>
                <div className={'flex flex-initial w-64 justify-between'}>
                    <Quantity quantity={order.quantity} />
                    <div className={'mx-2'}>
                        <div className={'text-lg font-medium whitespace-nowrap'}>{formatPriceWithSpaces(order.price * order.quantity)}₴</div>
                    </div>
                    <div>
                        <TrashIcon className={'text-slate-400 w-5 h-5'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Checkout(props: CheckoutProps) {
    return (
        <div className={'bg-gray-100 h-full'}>
            <div className={'flex justify-between p-5 bg-indigo-100'}>
                <div>UHome</div>
                <span>
                    <a href={'/'} className={'text-indigo-500'}>
                        <div className={'flex'}>
                            <ArrowLeftIcon className={'h-5 w-5 '} /> <div>Повернутися до покупок</div>
                        </div>
                    </a>
                </span>
            </div>

            <div className={'md:grid md:grid-cols-3 md:gap-6 mx-2 md:mx-5'}>
                <div className={'md:col-span-2'}>
                    <Bubble>
                        <h1>Ваше замовлення</h1>
                        <div>
                            {props.cart.items.map((order) => (
                                <Order order={order} />
                            ))}
                        </div>
                    </Bubble>
                    <Bubble>
                        <h1>1. Контактна інформація</h1>
                    </Bubble>
                </div>
                <div className={'md:col-span-1'}>
                    <Bubble>
                        <h1>Разом</h1>
                    </Bubble>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);

    const cart = await getCart({userId: session.user.id});

    return {
        props: {
            cart: cart,
        },
    };
}
