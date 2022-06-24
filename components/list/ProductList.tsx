import Layout from '../Layout';
import Product from './Product';

export default function ProductList(props) {
    return (
        <Layout>
            <div className="bg-white">
                <div className="mx-auto py-8 px-4 lg:max-w-7xl">
                    {props.error === '404' && (
                        <div className={'flex justify-center'}>
                            <h2 className="text-xl  text-gray-900"> Товар не знайдено.</h2>
                        </div>
                    )}
                    <h2 className="text-4xl font-extrabold text-gray-900 pb-2">{props.category ? props.category.title : 'Усі товари'}</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {props.products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
