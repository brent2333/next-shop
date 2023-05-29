// Opt 1 fetch server side
import Head from 'next/head';
import Title from './components/Title';
import { getProducts } from '../lib/products';

export async function getStaticProps() {
    console.log('[HOMEPAGE1] getStaticProps')
    const products = await getProducts();
    return {
        props: {products},
        revalidate: 60 * 5 //seconds - incremental static regeneration
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
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.title}
            </li>
          ))}
        </ul>
    </main>
    </>
  )
}
export default HomePage;