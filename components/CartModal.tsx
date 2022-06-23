import {useQuery} from 'react-query';
import CartItem from './CartItem';
import {useRouter} from 'next/router';

export default function CartModal({setShowModal}) {
    const results = useQuery('cart', () => {
        return fetch('/api/cart').then((res) => res.json());
    });
    const router = useRouter();

    if (results.isLoading) {
        return <div>Loading...</div>;
    }

    const {cart} = results.data;

    console.log(cart);

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="sm:h-fit h-full relative w-full my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
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
                        <div className="relative p-6 flex-auto">
                            {cart.items.map((order, index) => (
                                <CartItem key={order.id} order={order} index={index} />
                            ))}
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-blue-500 background-transparent px-6 py-2 text-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Продовжити покупки
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black" />
        </>
    );
}
