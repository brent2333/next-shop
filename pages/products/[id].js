
import Head from 'next/head';
import Title from '../components/Title';
import { getProducts, getProduct } from '../../lib/products';
import { ApiError } from '../../lib/api';

export async function getStaticPaths() {
    const products = await getProducts();
    return {
        paths: products.map((product) => ({
            params: {id: product.id.toString() }
        })),
        fallback: 'blocking' // generate new page in server with page was not built initially
    }
}
// ***!!! getStaticPaths PROVIDES THE ID to this function UNDER THE HOOD SOMEHOW MAGIC
export async function getStaticProps({ params: {id} }) {
    console.log('[product page] getStaticProps');
    try {
        const product = await getProduct(id);
        return {
            props: {product},
            revalidate: parseInt(process.env.REVALIDATE_SECONDS)
        }
    } catch(err) {
        if (err instanceof ApiError && err.status === 404) {
            return {
            // NextJS recognizes this to give 404
            notFound: true 
            }
        } else {
            throw err
        }
    }
}

function ProductPage({product}) {
    console.log('[Product page] re-render]')
    return (
        <>
        <Head>
          <title>Product</title>
        </Head>
        <main className="px-6 py-4">
        <Title>{product.title}</Title>
        <p>{product.description}</p>
        </main>
        </>
      )

}

export default ProductPage;