import {useRouter} from 'next/router';
import {useMutation, useQuery} from 'react-query';
import Expandable from './Expandable';
import Bubble from './Bubble';
import {formatPriceWithSpaces, pluralizeItems} from '../../utils/utils';
import {ArrowLeftIcon} from '@heroicons/react/outline';
import {useEffect, useRef, useState} from 'react';
import CartItem from '../CartItem';

import InputMask from 'react-input-mask';
import {updateContactDetails} from '../../mutations/cart';
import {useForm, Controller} from 'react-hook-form';

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

    const [collapsedItems, setCollapsedItems] = useState([false, true, false, false]);

    const cart = results?.data?.cart;

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        setValue,
        control,
    } = useForm({
        defaultValues: {
            phoneNumber: '+380',
            email: '',
            firstName: '',
            lastName: '',
        },
    });

    const onSubmit = async (data) => {
        await updateContactDetails({
            id: cart.id,
            ...data,
        });

        if (Object.keys(errors).length === 0) {
            setCollapsedItems([false, false, true, false]);
        }
    };

    const contracts = useRef(null);

    useEffect(() => {
        if (cart) {
            setValue('phoneNumber', cart.phoneNumber);
            setValue('email', cart.email);
            setValue('firstName', cart.firstName);
            setValue('lastName', cart.lastName);
        }
    }, [cart]);

    if (results.isLoading) {
        return <div>Loading...</div>;
    }

    const inputClasses = `form-control
                         block
                         w-full
                         bg-clip-padding 
                         border border-solid border-gray-300
                         rounded
                         transition
                         ease-in-out
                         m-0
                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;

    return (
        <div className={'bg-white'}>
            {/*header*/}
            <div className={'flex justify-center p-5 bg-gray-800 items-center'}>
                <div className={'ml-2 text-white'}>UHome</div>
            </div>

            <div className={'flex justify-center px-2.5 md:px-5 lg:px-10 pb-10'}>
                <div className={'flex flex-col  max-w-7xl w-full'}>
                    <div className={'flex justify-between items-baseline'}>
                        <div className={'mt-5 text-xl font-light'}>Оформлення замовлення</div>
                        <div className={'mt-5'}>
                            <a href={'/'} className={'text-indigo-500'}>
                                <div className={'flex items-center  rounded '}>
                                    <div>
                                        <ArrowLeftIcon className={'h-5 w-5 mr-1'} />
                                    </div>

                                    <div>Повернутися</div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className={'flex flex-col lg:flex-row'}>
                        {/*left*/}
                        <div className={'flex-1 h-full mr-0 lg:mr-6'}>
                            <Expandable
                                isExpanded={collapsedItems[0]}
                                onTriggerExpanded={(isExpanded) => {
                                    if (isExpanded) {
                                        setCollapsedItems([true, false, false, false]);
                                    } else {
                                        setCollapsedItems([false, true, false, false]);
                                    }
                                }}
                                expandedContent={
                                    <div>
                                        <span className={'text-xl'}>Ваше замовлення</span>
                                        <div className={'w-full'}>
                                            {cart.items.map((order, index) => (
                                                <CartItem key={order.id} order={order} index={index} />
                                            ))}
                                        </div>
                                    </div>
                                }
                                collapsedContent={
                                    <>
                                        <span className={'text-xl'}>Ваше замовлення</span>
                                        <div className={`flex flex-wrap`}>
                                            {cart.items.map((order, index) => (
                                                <div key={index} className={'flex-none m-2'}>
                                                    <img src={order.product.imgUrl} className="rounded w-16 h-16 object-cover" alt={order.product.title} />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                }
                            />
                            <Expandable
                                isExpanded={collapsedItems[1]}
                                onTriggerExpanded={(isExpanded) => {
                                    if (isExpanded) {
                                        setCollapsedItems([false, true, false, false]);
                                    } else {
                                        contracts.current.click();
                                    }
                                }}
                                collapsedContent={
                                    <>
                                        <span className={'text-xl'}>1. Контактна інформація</span>
                                        {cart.phoneNumber && cart.lastName && cart.firstName && (
                                            <div>
                                                {cart.phoneNumber} / {cart.lastName} {cart.firstName}
                                            </div>
                                        )}
                                    </>
                                }
                                expandedContent={
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <span className={'text-xl'}>1. Контактна інформація</span>

                                        <div className={'flex pt-2'}>
                                            <div className={'flex-1 mr-5'}>
                                                <div>Номер телефону</div>
                                                <Controller
                                                    control={control}
                                                    name="phoneNumber"
                                                    defaultValue={'+380'}
                                                    render={({field}) => {
                                                        return (
                                                            <InputMask
                                                                className={inputClasses}
                                                                mask={'+380 99 999 99 99'}
                                                                onChange={(e) => {
                                                                    field.onChange(e.target.value);
                                                                }}
                                                                maskChar={' '}
                                                                alwaysShowMask={true}
                                                                name={'phoneNumber'}
                                                                value={field.value}
                                                            >
                                                                {(inputProps) => <input {...inputProps} name={'phoneNumber'} type={'tel'} />}
                                                            </InputMask>
                                                        );
                                                    }}
                                                />
                                            </div>

                                            <div className={'flex-1'}>
                                                <div>Імейл</div>
                                                <input
                                                    type={'email'}
                                                    name={'email'}
                                                    className={inputClasses}
                                                    {...register('email', {required: 'Введіть електронну адресу'})}
                                                    placeholder={'Введіть email'}
                                                />
                                                <div className={'text-red-500'}>{errors.email?.message}</div>
                                            </div>
                                        </div>
                                        <div className={'pt-2'}>
                                            <div>Прізвище</div>
                                            <input
                                                type={'text'}
                                                name={'lastName'}
                                                className={inputClasses}
                                                placeholder={'Бандера'}
                                                {...register('lastName', {required: 'Введіть прізвище'})}
                                            />
                                            <div className={'text-red-500'}>{errors.lastName?.message}</div>
                                        </div>
                                        <div className={'pt-2'}>
                                            <div>Ім'я</div>
                                            <input
                                                type={'text'}
                                                name={'firstName'}
                                                className={inputClasses}
                                                {...register('firstName', {required: "Введіть ім'я"})}
                                                placeholder={'Степан'}
                                            />
                                            <div className={'text-red-500'}>{errors.firstName?.message}</div>
                                        </div>
                                        <input type={'submit'} className={'hidden'} ref={contracts} />
                                    </form>
                                }
                            />

                            <Expandable
                                isExpanded={collapsedItems[2]}
                                onTriggerExpanded={(isExpanded) => {
                                    if (isExpanded) {
                                        setCollapsedItems([false, false, true, false]);
                                    } else {
                                        setCollapsedItems([false, false, false, true]);
                                    }
                                }}
                                collapsedContent={
                                    <>
                                        <span className={'text-xl'}>2. Доставка</span>
                                        {cart.city && cart.region && cart.street && cart.zipCode && (
                                            <div>
                                                {cart.city}, {cart.region} область, {cart.street}, {cart.zipCode}
                                            </div>
                                        )}
                                    </>
                                }
                                expandedContent={
                                    <>
                                        <span className={'text-xl'}>2. Доставка</span>

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
                            />
                            <Expandable
                                isExpanded={collapsedItems[3]}
                                onTriggerExpanded={(isExpanded) => {
                                    if (isExpanded) {
                                        setCollapsedItems([false, false, false, true]);
                                    }
                                }}
                                collapsedContent={
                                    <>
                                        <span className={'text-xl'}>3. Спосіб оплати</span>
                                        <div>Карткою на сайті</div>
                                    </>
                                }
                                expandedContent={
                                    <>
                                        <span className={'text-xl'}>3. Спосіб оплати</span>
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
                            />
                        </div>
                        {/*right*/}
                        <div>
                            <Bubble>
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
            </div>
        </div>
    );
}
