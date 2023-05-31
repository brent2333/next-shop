import { getProducts } from "../../lib/products";
const handler = async (req,res) => {
    console.log('[handler products]');
    // proxies  cms
    const products = await getProducts();
    res.status(200).json(products);
}

export default handler;