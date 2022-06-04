import Layout from './Layout';
import {StarIcon} from '@heroicons/react/solid';
const reviews = {href: '#', average: 0, totalCount: 0};

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
export default function Product(props) {
    const productSlug = props.product;

    return (
        <Layout>
            <div className="bg-white">
                <div className="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                            {productSlug.breadcrumbs.map((breadcrumb) => (
                                <li key={breadcrumb.id}>
                                    <div className="flex items-center">
                                        <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                            {breadcrumb.name}
                                        </a>
                                        <svg
                                            width={16}
                                            height={20}
                                            viewBox="0 0 16 20"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            className="w-4 h-5 text-gray-300"
                                        >
                                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                        </svg>
                                    </div>
                                </li>
                            ))}
                            <li className="text-sm">
                                <a href={productSlug.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                    {productSlug.name}
                                </a>
                            </li>
                        </ol>
                    </nav>

                    {/* Image gallery */}
                    <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                        {/*<div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">*/}
                        {/*    <img src={productSlug.images[0].src} alt={productSlug.images[0].alt} className="w-full h-full object-center object-cover" />*/}
                        {/*</div>*/}
                        {/*<div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">*/}
                        {/*    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">*/}
                        {/*        <img src={productSlug.images[1].src} alt={productSlug.images[1].alt} className="w-full h-full object-center object-cover" />*/}
                        {/*    </div>*/}
                        {/*    <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">*/}
                        {/*        <img src={productSlug.images[2].src} alt={productSlug.images[2].alt} className="w-full h-full object-center object-cover" />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                            <img src={productSlug.images[0].src} alt={productSlug.images[0].alt} className="w-full h-full object-center object-cover" />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{productSlug.title}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:mt-0 lg:row-span-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl text-gray-900">{productSlug.price}₴</p>

                            {/* Reviews */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(reviews.average > rating ? 'text-gray-900' : 'text-gray-200', 'h-5 w-5 flex-shrink-0')}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        {reviews.totalCount} відгуків
                                    </a>
                                </div>
                            </div>

                            <form className="mt-10">
                                <button
                                    type="submit"
                                    className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Додати в корзину
                                </button>
                            </form>
                        </div>

                        <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{productSlug.summary}</p>
                                </div>
                            </div>

                            {/*<div className="mt-10">*/}
                            {/*    <h3 className="text-sm font-medium text-gray-900">Основні моменти</h3>*/}

                            {/*    <div className="mt-4">*/}
                            {/*        <ul role="list" className="pl-4 list-disc text-sm space-y-2">*/}
                            {/*            {productSlug.highlights.map((highlight) => (*/}
                            {/*                <li key={highlight} className="text-gray-400">*/}
                            {/*                    <span className="text-gray-600">{highlight}</span>*/}
                            {/*                </li>*/}
                            {/*            ))}*/}
                            {/*        </ul>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Деталі</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{productSlug.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
