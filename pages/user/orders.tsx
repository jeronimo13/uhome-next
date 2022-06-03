import Layout from '../../components/Layout';
import {getSession, useSession} from 'next-auth/react';

import moment from 'moment';
import 'moment/locale/uk';

export default function Orders(props) {
    const {data: session, status} = useSession();

    if (status === 'loading') return <div>Loading</div>;
    return (
        <Layout>
            <div className="p-8">
                <div className={'text-center text-2xl font-medium'}>Історія замовлень</div>

                {props.orders.map((order) => {
                    moment.locale('uk');

                    return (
                        <div>
                            <div className={'border m-4 p-4 w-full rounded border-b'}>
                                <div className="border-b p-8 flex justify-between">
                                    <div className={'flex'}>
                                        <div>
                                            <h3 className={'font-medium'}>Замовлення #WS0000{order.id}</h3>
                                        </div>
                                        <div className="pl-2">
                                            <h3 className={'text-gray-600'}>{moment(order.createdAt).format('D MMMM YYYY HH:MM')}</h3>
                                        </div>
                                    </div>

                                    <div className={'text-green-600'}>Виконано</div>
                                </div>

                                <div>
                                    {order.items.map((item) => {
                                        return (
                                            <div className={'p-8'}>
                                                <div className={'flex'}>
                                                    <div className={'flex-none box-border h-32 w-32 border bg-slate-900'} />

                                                    <div className={'pl-6 w-full'}>
                                                        <div className={'flex justify-between'}>
                                                            <div>{item.name}</div>
                                                            <div className={'flex'}>
                                                                <div
                                                                    className={'text-gray-600 font-small text-sm whitespace-nowrap flex items-center'}
                                                                >
                                                                    {item.quantity} шт.
                                                                </div>
                                                                <div className={'pl-1 flex items-center'}>{item.price}₴</div>
                                                            </div>
                                                        </div>

                                                        <div className={'pt-4 text-gray-600'}>{item.description}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className={'flex justify-between px-8'}>
                                    <div>
                                        <span className={`inline-block align-middle`}>
                                            <p className={'pl-1 text-gray-600'}> Дата доставки: {moment(order.completedAt).format('Dd.MM.YYYY')}</p>
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className={'font-medium'}>Разом: {order.total}₴</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);

    return {
        props: {
            orders: [
                {
                    id: 1,
                    total: 527.5,
                    createdAt: '2020-01-01T00:00:00.000Z',
                    status: 'DELIVERED',
                    completedAt: '2020-01-02T00:00:00.000Z',
                    items: [
                        {
                            id: 1,
                            name: 'Дуже красива баночка',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
                            price: 20,
                            quantity: 5,
                        },
                        {
                            id: 2,
                            name: 'Нормальна скляночка',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
                            price: 100,
                            quantity: 2,
                        },
                        {
                            id: 3,
                            name: 'Щось дуже користне',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
                            price: 227.5,
                            quantity: 1,
                        },
                    ],
                },
                {
                    id: 2,
                    total: 527.5,
                    createdAt: '2020-01-01T00:00:00.000Z',
                    status: 'DELIVERED',
                    completedAt: '2020-01-02T00:00:00.000Z',
                    items: [
                        {
                            id: 1,
                            name: 'Дуже красива баночка',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
                            price: 20,
                            quantity: 5,
                        },
                        {
                            id: 2,
                            name: 'Нормальна скляночка',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
                            price: 100,
                            quantity: 2,
                        },
                    ],
                },{
                    id: 35,
                    total: 275,
                    createdAt: '2020-01-01T00:00:00.000Z',
                    status: 'DELIVERED',
                    completedAt: '2020-01-02T00:00:00.000Z',
                    items: [
                        {
                            id: 1,
                            name: 'Дуже красива баночка',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
                            price: 275,
                            quantity: 1,
                        },
                    ],
                },
            ],
        },
    };
}
