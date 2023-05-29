// Opt 1 fetch client side
import Head from 'next/head';
import Title from './components/Title';
import { getProducts } from '../lib/products';
import {useState,useEffect} from 'react';
function HomePage() {
  // fetch when mounted
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then(setProducts)
  }, []);
  console.log('[HOMEPAGE2] rendered', products);

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