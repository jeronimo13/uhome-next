import ProductList from '../components/list/ProductList';
import {useQuery} from 'react-query';

export default function ProductsPage(props) {
    const results = useQuery('products', () => {
        return fetch('/api/products').then((res) => res.json());
    });
    if (results.isLoading) {
        return <div>Loading...</div>;
    }

    const {products} = results.data;
    props = {products, ...props};
    return <ProductList {...props} />;
}

export async function getServerSideProps(ctx) {
    const {error} = ctx.query;

    return {
        props: {
            error: error || null,
        },
    };
}
