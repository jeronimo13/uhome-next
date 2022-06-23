import {ArrowLeftIcon} from '@heroicons/react/outline';
import {useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {useRouter} from 'next/router';
import {formatPriceWithSpaces, pluralizeItems} from '../utils/utils';
import CartItem from '../components/CartItem';

const Bubble = (props) => {
    return <div className={`${props.color} rounded-xl p-5 mt-5`}>{props.children}</div>;
};

interface IExpandable {
    isExpanded: boolean;
    onTriggerExpanded: (expanded: boolean) => void;
    expandedContent: JSX.Element;
    collapsedContent: JSX.Element;
}

const Expandable = (props: IExpandable & any) => {
    const [expanded, setExpanded] = useState<boolean>(props.isExpanded);

    const trigger = () => {
        setExpanded(!expanded);
        props.onTriggerExpanded && props.onTriggerExpanded(!expanded);
    };

    return (
        <Bubble color={expanded ? 'bg-white' : 'bg-slate-300 text-gray-600'}>
            <div>{expanded ? props.expandedContent : props.collapsedContent}</div>
            <div className={'text-center mt-2'}>
                {expanded ? (
                    <button className={'bg-indigo-600 p-3 rounded text-white w-64'} onClick={trigger}>
                        Продовжити замовлення
                    </button>
                ) : (
                    <button className={'border border-indigo-600 text-indigo-600 p-3 rounded text-white w-64'} onClick={trigger}>
                        Змінити
                    </button>
                )}
            </div>
        </Bubble>
    );
};

const Orders = ({orders}) => {
    return (
        <Expandable
            expandedContent={
                <div>
                    <span className={'text-xl'}>Ваше замовлення</span>
                    <div className={'w-full'}>
                        {orders.map((order, index) => (
                            <CartItem key={order.id} order={order} index={index} />
                        ))}
                    </div>
                </div>
            }
            collapsedContent={
                <>
                    <span className={'text-xl'}>Ваше замовлення</span>
                    <div className={`flex flex-wrap`}>
                        {orders.map((order, index) => (
                            <div key={index} className={'flex-none m-2'}>
                                <img src={order.product.imgUrl} className="rounded w-16 h-16 object-cover" alt={order.product.title} />
                            </div>
                        ))}
                    </div>
                </>
            }
        />
    );
};

export default function Checkout() {
    const router = useRouter();

    const {data, isLoading, mutate} = useMutation<{}, {}, {cartId: number}>(
        (args) => {
            return fetch('/api/cart/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(args),
            });
        },
        {
            onSuccess: async (response: any) => {
                const data = await response.json();
                console.log(data);
                await router.push(`/orders/${data.order.id}`);
            },
        }
    );

    const results = useQuery('cart', () => {
        return fetch('/api/cart').then((res) => res.json());
    });

    if (results.isLoading) {
        return <div>Loading...</div>;
    }

    const {cart} = results.data;

    return (
        <div className={'bg-gray-100'}>
            <div className={'flex justify-center p-5 bg-gray-800 items-center'}>
                <div className={'ml-2 text-white'}>UHome</div>

                <div className={'absolute inset-y-0 left-0 p-3'}>
                    <a href={'/'} className={'text-indigo-500'}>
                        <div className={'flex items-center bg-indigo-600 p-2 rounded hover:bg-indigo-400'}>
                            <div>
                                <ArrowLeftIcon className={'h-5 w-5 text-white mr-1'} />
                            </div>

                            <div className={'text-white'}>Назад</div>
                        </div>
                    </a>
                </div>
            </div>
            <div className={'mx-5 mt-5 text-xl text-center'}>Оформити замовлення</div>

            <div className={'md:grid md:grid-cols-3 md:gap-6 mx-2 md:mx-5'}>
                <div className={'md:col-span-2 h-full'}>
                    <Orders orders={cart.items} />
                    <Expandable
                        collapsedContent={
                            <>
                                <span className={'text-xl'}>1. Контактна інформація</span>
                                <div>
                                    {cart.phoneNumber} / {cart.lastName} {cart.firstName}
                                </div>
                            </>
                        }
                        expandedContent={
                            <>
                                <span className={'text-xl'}>1. Контактна інформація</span>

                                <div className={'py-2'}>
                                    <div>Номер телефону</div>
                                    <input type={'text'} value={cart.phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>

                                <div>
                                    <div>Email</div>
                                    <input
                                        type={'text'}
                                        value={cart.email}
                                        onChange={(e) =>
                                            setCart({
                                                ...cart,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <div>Ім'я</div>
                                    <input type={'text'} value={cart.firstName} onChange={(e) => setFirstName(e.target.value)} />

                                    <div>Прізвище</div>
                                    <input type={'text'} value={cart.lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </>
                        }
                    />
                    <Expandable
                        expandedContent={
                            <>
                                <span className={'text-xl'}>2. Cпосіб оплати</span>
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
                            </>
                        }
                        collapsedContent={
                            <>
                                <span className={'text-xl'}>2. Cпосіб оплати</span>
                                <div>Карткою на сайті</div>
                            </>
                        }
                    />
                    <Expandable
                        expandedContent={
                            <>
                                <span className={'text-xl'}>3. Доставка</span>

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
                            </>
                        }
                        collapsedContent={
                            <>
                                <span className={'text-xl'}>3. Доставка</span>
                                <div>
                                    {cart.city}, {cart.region} область, {cart.street}, {cart.zipCode}
                                </div>
                            </>
                        }
                    />
                </div>
                <div className={'md:col-span-1'}>
                    <Bubble color={'bg-white'}>
                        <span className={'text-lg'}>Разом:</span>
                        <div className={'flex justify-between my-3 items-baseline border-b pb-5'}>
                            <div className={'text-medium font-light'}>{pluralizeItems(cart.items.length)} на сумму:</div>
                            <div className={'text-lg font-medium whitespace-nowrap'}>
                                {formatPriceWithSpaces(cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0))}₴
                            </div>
                        </div>
                        <div className={'flex justify-between mb-5'}>
                            <div>До сплати: </div>
                            <div className={'text-xl font-bold'}>
                                {' '}
                                {formatPriceWithSpaces(cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0))}₴
                            </div>
                        </div>
                        <div className={'flex justify-center'}>
                            <button
                                className={'bg-indigo-600 w-64 p-3 rounded text-white hover:bg-indigo-400 whitespace-nowrap'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    mutate({
                                        cartId: cart.id,
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
