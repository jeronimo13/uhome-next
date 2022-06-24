import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {addToCart} from '../../mutations/cart';
import {CheckIcon, ShoppingCartIcon} from '@heroicons/react/outline';

enum CartStatus {
    OPEN,
    UNAVAILABLE,
    LOADING,
    BOUGHT,
}
export default function Product({product}) {
    const router = useRouter();
    let initialState = CartStatus.OPEN;

    if (product.quantity === 0) initialState = CartStatus.UNAVAILABLE;
    if (product.inCart) initialState = CartStatus.BOUGHT;

    const [cartState, setState] = useState<CartStatus>(initialState);

    useEffect(() => {
        setState(initialState);
    }, [product.inCart]);

    const add = async (product) => {
        if (cartState === CartStatus.OPEN) {
            setState(CartStatus.LOADING);

            await addToCart({productId: product.id});

            setState(CartStatus.BOUGHT);
        }
        if (cartState === CartStatus.BOUGHT) {
            await router.push('/checkout');
        }
    };

    const renderCart = (cartStatus: CartStatus) => {
        switch (cartStatus) {
            case CartStatus.OPEN:
                return (
                    <div className={'bg-indigo-600 text-white p-3 hover:bg-indigo-500 rounded cursor-pointer'} onClick={() => add(product)}>
                        <ShoppingCartIcon className={'text-white w-6 h-6'} />
                    </div>
                );
            case CartStatus.LOADING:
                return (
                    <div className={'bg-indigo-600 text-white p-3 hover:bg-indigo-500 rounded cursor-pointer'} onClick={() => add(product)}>
                        <svg focusable="false" width="1.5rem" height="1.5rem" viewBox="25 25 50 50" className="spinner q-spinner-mat text-white">
                            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="5" strokeMiterlimit="10" className="path" />
                        </svg>
                    </div>
                );
            case CartStatus.BOUGHT:
                return (
                    <div className={'bg-indigo-600 text-white p-3 hover:bg-indigo-500 rounded cursor-pointer'} onClick={() => add(product)}>
                        <CheckIcon className={'w-6 h-6'} />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div key={product.id} className={'group pb-4'}>
            <div className={`p-3 group-hover:shadow rounded-lg ${cartState === CartStatus.UNAVAILABLE && 'opacity-50'}`}>
                <a href={product.slug}>
                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                        <img src={product.imgUrl} alt={product.summary} className="w-full h-full object-center object-cover " />
                    </div>
                </a>

                <div className={'flex mt-4 justify-between p-2'}>
                    <div className={'pr-2'}>
                        <h3 className="text-xs md:text-sm text-gray-700">{product.title}</h3>
                    </div>
                </div>
                <div className={'flex justify-between'}>
                    <div className={' pl-2'}>
                        <p className="mt-1 text-md md:text-lg font-medium text-gray-900">{product.price}₴</p>

                        <div className={'text-xs md:text-sm flex justify-start w-full'}>
                            {product.quantity > 0 ? (
                                product.quantity < 3 ? (
                                    <span className={'text-green-500 font-light'}>Закінчується</span>
                                ) : (
                                    <span className={'text-green-500 font-light'}>Є в наявності</span>
                                )
                            ) : (
                                <span className={'text-gray-500 font-light'}>Немає в наявності</span>
                            )}
                        </div>
                    </div>
                    <div>{renderCart(cartState)}</div>
                </div>
            </div>
        </div>
    );
}
