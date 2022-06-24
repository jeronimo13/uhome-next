import {useQuery} from 'react-query';
import CartItem from './CartItem';
import {useRouter} from 'next/router';
import {formatPriceWithSpaces} from '../utils/utils';

export default function CartModal({setShowModal}) {
    const results = useQuery('cart', () => {
        return fetch('/api/cart').then((res) => res.json());
    });
    const router = useRouter();

    if (results.isLoading) {
        return <div>Loading...</div>;
    }

    const {cart} = results.data;

    return (
        <>
            <div className="opacity-50 fixed inset-0 z-40 bg-black" />
            <div
                className="z-50 fixed left-0 right-0 top-0 bottom-0
                overflow-hidden
                flex flex-col items-center justify-center
            h-full sm:p-5 w-full "
            >
                <div
                    className="
                relative
                flex
                flex-col
                w-full
                max-w-3xl
                h-full
                m-auto
                bg-white
                rounded-lg
                shadow-lg
                overflow-hidden
                "
                >
                    {/*content*/}
                    {/*<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">*/}
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">Корзина</h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                        >
                            <span className="bg-transparent text-black opacity-50 h-6 w-6 text-3xl block outline-none focus:outline-none">×</span>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="p-6 overflow-y-auto">
                        {cart.items.map((order, index) => (
                            <CartItem key={order.id} order={order} index={index} />
                        ))}
                    </div>
                    {/*footer*/}
                    <div className="sticky bottom bg-white w-full flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="
                            hidden
                            sm:block
                            text-blue-500 background-transparent px-6 py-2 text-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Продовжити покупки
                        </button>
                        <div className={'flex flex-col w-full sm:w-fit'}>
                            <div className={'flex justify-between w-full pb-5 sm:hidden block text-2xl'}>
                                <span>Разом</span>
                                <span className={'whitespace-nowrap'}>
                                    {formatPriceWithSpaces(cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0))} ₴
                                </span>
                            </div>
                            <div className={'flex items-center'}>
                                <span className={'hidden sm:block mr-3 text-2xl font-medium whitespace-nowrap'}>
                                    {formatPriceWithSpaces(cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0))} ₴
                                </span>
                                <button
                                    className="
                            sm:w-fit
                            w-full
                            bg-emerald-500 text-white active:bg-emerald-600 text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={async () => {
                                        await router.push('/checkout');
                                    }}
                                >
                                    Оформити замовлення
                                </button>
                            </div>
                        </div>
                    </div>
                    {/*</div>*/}
                </div>
            </div>
        </>
    );
}
