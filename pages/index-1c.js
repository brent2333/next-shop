// Opt 1 fetch server side - refetched on every request, slower - done at runtime
import Head from 'next/head';
import Title from './components/Title';
import { getProducts } from '../lib/products';

export async function getServerSideProps() {
    console.log('[HOMEPAGE1] getServerSideProps')
    const products = await getProducts();
    return {
        props: {products}
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