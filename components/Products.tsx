import Layout from './Layout';
import {ShoppingCartIcon} from '@heroicons/react/outline';

export default function Products(props) {
    return (
        <Layout>
            <div className="bg-white h-screen">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {props.products.map((product) => (
                            <div key={product.id} className={'group'}>
                                <div className={'group-hover:shadow  rounded-lg'}>
                                    <a href={product.slug}>
                                        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                            <img src={product.url} alt={product.summary} className="w-full h-full object-center object-cover " />
                                        </div>
                                    </a>

                                    <div className={'flex mt-4 justify-between p-2'}>
                                        <div>
                                            <h3 className="text-sm text-gray-700">{product.title}</h3>
                                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}₴</p>
                                        </div>
                                        <div>
                                            <div className={'bg-gray-800 text-white p-3 hover:bg-black rounded cursor-pointer'}>
                                                <ShoppingCartIcon className={'text-white w-6 h-6'} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
