import Layout from './Layout';
import {ShoppingCartIcon, CheckIcon} from '@heroicons/react/outline';
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Store} from 'react-notifications-component';
import {addToCart} from '../mutations/cart';

enum CartStatus {
    OPEN,
    LOADING,
    BOUGHT,
}

const Product = ({product}) => {
    const router = useRouter();
    const [cartState, setState] = useState<CartStatus>(product.inCart ? CartStatus.BOUGHT : CartStatus.OPEN);

    const add = async (product) => {
        if (cartState === CartStatus.OPEN) {
            setState(CartStatus.LOADING);

            await addToCart({productId: product.id});

            Store.addNotification({
                title: 'Товар додано в кошик',
                message: <a href={'/checkout'}>Оформити замовлення</a>,
                type: 'success',
                container: 'bottom-center',
                dismiss: {
                    duration: 3000,
                },
            });
            setState(CartStatus.BOUGHT);
        }
        if (cartState === CartStatus.BOUGHT) {
            await router.push('/checkout');
        }
    };

    const renderCart = (cartStatus: CartStatus) => {
        switch (cartStatus) {
            case CartStatus.OPEN:
                return <ShoppingCartIcon className={'text-white w-6 h-6'} />;
            case CartStatus.LOADING:
                return (
                    <svg focusable="false" width="1.5rem" height="1.5rem" viewBox="25 25 50 50" className="spinner q-spinner-mat text-white">
                        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="5" strokeMiterlimit="10" className="path" />
                    </svg>
                );
            case CartStatus.BOUGHT:
                return <CheckIcon className={'w-6 h-6'} />;
            default:
                return <ShoppingCartIcon className={'text-white w-6 h-6'} />;
        }
    };

    return (
        <div key={product.id} className={'group'}>
            <div className={'p-3 group-hover:shadow rounded-lg'}>
                <a href={product.slug}>
                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                        <img src={product.imgUrl} alt={product.summary} className="w-full h-full object-center object-cover " />
                    </div>
                </a>

                <div className={'flex mt-4 justify-between p-2'}>
                    <div>
                        <h3 className="text-sm text-gray-700">{product.title}</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">{product.price}₴</p>
                    </div>
                    <div>
                        <div className={'bg-indigo-600 text-white p-3 hover:bg-indigo-500 rounded cursor-pointer'} onClick={() => add(product)}>
                            {renderCart(cartState)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Products(props) {
    return (
        <Layout>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    {props.error === '404' && (
                        <div className={'flex justify-center'}>
                            <h2 className="text-xl  text-gray-900"> Товар не знайдено.</h2>
                        </div>
                    )}
                    <h2 className="text-4xl font-extrabold text-gray-900">{props.category ? props.category.title : 'Усі товари'}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                        {props.products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
