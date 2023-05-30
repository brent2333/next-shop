
import Page from '../Page';
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
        <Page title={product.title}>
        <div className="flex flex-col lg:flex-row">
            <div>
        <Image src={product.pictureUrl} alt="" width={640} height={480}/>
        </div>
        <div className="flex-1 lg:ml-4">
        <p clasName="text-sm">{product.description}</p>
        <p className="text-lg font-bold mt-4">{product.price}</p>
        </div>
        </div>
        </Page>
      )

}

export default ProductPage;