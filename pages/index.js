import Head from 'next/head';
import Link from 'next/link';
import Title from './components/Title';
import { getProducts } from '../lib/products';
import ProductCard from './components/ProductCard';
export async function getStaticProps() {
    console.log('[HOMEPAGE1] getStaticProps')
    const products = await getProducts();
    return {
        props: {products},
        revalidate: parseInt(process.env.REVALIDATE_SECONDS) //seconds - incremental static regeneration
    }
}

function HomePage({products}) {
  console.log('[HOMEPAGE] rendered', products)
  return (
    <>
    <Head>
      <title>Next Shop</title>
    </Head>
    <main className="px-6 py-4">
    <Title>Next Shop</Title>
        <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
    </main>
    </>
  )
}
export default HomePage;