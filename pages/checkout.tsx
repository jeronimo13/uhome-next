import {ArrowLeftIcon, TrashIcon} from '@heroicons/react/outline';
import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {router} from 'next/client';

const Bubble = (props) => {
    return <div className={'bg-white rounded-xl p-5 mt-5'}>{props.children}</div>;
};

interface Order {
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

const pluralizeItems = (count) => {
    const mod = count % 10;
    if (mod === 1) {
        return count + ' товар';
    }
    if (mod > 1 && mod < 5) {
        return count + ' товара';
    }
    return count + ' товарів';
};

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
                onClick={async () => {
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

const Order = ({order, index}: {order: Order; index: number}) => {
    const queryClient = useQueryClient();

    const deleteOrder = useMutation<{}, {}, {id: number}>(
        (args) =>
            fetch(`/api/cart/item/${args.id}`, {
                method: 'DELETE',
            }),
        {
            onSuccess: () => {
                return queryClient.invalidateQueries('cart');
            },
        }
    );
    return (
        <div className={`py-5 mx-2 flex items-center ${index > 0 && `border-t-2`}`}>
            <div className={'w-32  flex-none'}>
                <img src={order.product.imgUrl} className="rounded w-32 h-32 object-cover" alt={order.product.title} />
            </div>
            <div className={'pl-5 lg:flex flex-1 items-center justify-between'}>
                <div>
                    <div className={'text-lg font-light'}>{order.product.title}</div>
                    <div className={'mt-2 text-xs font-light text-slate-400'}>Код: {order.product.code}</div>
                </div>
                <div className={'flex flex-initial w-64 justify-between'}>
                    <Quantity quantity={order.quantity} />
                    <div className={'mx-2'}>
                        <div className={'text-lg font-medium whitespace-nowrap'}>{formatPriceWithSpaces(order.price * order.quantity)}₴</div>
                    </div>
                    <div>
                        <TrashIcon
                            className={'text-slate-400 w-5 h-5 cursor-pointer hover:text-red-500'}
                            onClick={async () => {
                                deleteOrder.mutate({id: order.id});
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Checkout() {
    const results = useQuery('cart', () => {
        return fetch('/api/cart').then((res) => res.json());
    });

    const [phoneNumber, setPhoneNumber] = useState(results.data?.cart?.phoneNumber);
    const [firstName, setFirstName] = useState(results.data?.cart?.firstName);
    const [lastName, setLastName] = useState(results.data?.cart?.lastName);
    const [email, setEmail] = useState(results.data?.cart?.email);

    const {data, isLoading, mutate} = useMutation<{}, {}, {cartId: number}>(
        (args) => {
            console.log(args);
            return fetch('/api/cart/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(args),
            });
        },
        {
            onSuccess: async () => {
                console.log('success');
                await router.push('/order-success');
            },
        }
    );

    if (results.isLoading) {
        return <div>Loading...</div>;
    }

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
                        <span className={'text-xl'}>Ваше замовлення</span>
                        <div>
                            {results.data.cart.items.map((order, index) => (
                                <Order key={order.id} order={order} index={index} />
                            ))}
                        </div>
                    </Bubble>
                    <Bubble>
                        <span className={'text-xl'}>1. Контактна інформація</span>

                        <div className={'py-2'}>
                            <div>Номер телефону</div>
                            <input type={'text'} value={phoneNumber || results.data.cart.phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>

                        <div>
                            <div>Email</div>
                            <input type={'text'} value={email || results.data.cart.email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <div>Ім'я</div>
                            <input type={'text'} value={firstName || results.data.cart.firstName} onChange={(e) => setFirstName(e.target.value)} />

                            <div>Прізвище</div>
                            <input type={'text'} value={lastName || results.data.cart.lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </Bubble>
                    <Bubble>
                        <h1>2. Оплата</h1>
                        <div>
                            <div>Спосіб оплати</div>
                            <div className={'flex'}>
                                <div className={'flex-1'}>
                                    <input className={'border-2 p-2'} type={'radio'} name={'payment'} value={'cash'} />
                                    <div>Готівкою</div>
                                </div>
                                <div className={'flex-1'}>
                                    <input className={'border-2 p-2'} type={'radio'} name={'payment'} value={'card'} />
                                    <div>Карткою</div>
                                </div>
                            </div>
                        </div>
                    </Bubble>
                    <Bubble>
                        <h1>3. Доставка</h1>

                        <div>
                            <div>Спосіб доставки</div>
                            <div className={'flex'}>
                                <div className={'flex-1'}>
                                    <input className={'border-2 p-2'} type={'radio'} name={'delivery'} value={'self'} />
                                    <div>Самовивіз</div>
                                </div>
                                <div className={'flex-1'}>
                                    <input className={'border-2 p-2'} type={'radio'} name={'delivery'} value={'courier'} />
                                    <div>Кур'єром</div>
                                </div>
                            </div>
                        </div>
                    </Bubble>
                </div>
                <div className={'md:col-span-1'}>
                    <Bubble>
                        <span className={'text-lg'}>Разом</span>

                        <div className={'flex justify-between my-5'}>
                            <div className={'text-medium font-light'}>{pluralizeItems(results.data.cart.items.length)} на сумму:</div>
                            <div className={'text-lg font-medium whitespace-nowrap'}>
                                {formatPriceWithSpaces(results.data.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0))}₴
                            </div>
                        </div>
                        <div className={'flex justify-center'}>
                            <button
                                className={'bg-indigo-600 p-5 rounded-xl text-white hover:bg-indigo-400'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    mutate({
                                        cartId: results.data.cart.id,
                                    });
                                }}
                            >
                                ОФОРМИТИ ЗАМОВЛЕННЯ
                            </button>
                        </div>
                    </Bubble>
                </div>
            </div>
        </div>
    );
}
