import CartItem from '../CartItem';
import Expandable from './Expandable';

export default function Orders({orders}) {
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
}