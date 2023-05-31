export default function CartTable ({cartItems}) {
    const grandTotal = cartItems.reduce((accum,curr) => {
        return accum + curr.product.price * curr.quantity
    }, 0);
    return (
        <table>
            <thead>
                <tr>
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Quantity</th>
                </tr>
            </thead>
            <tbody>
                {cartItems && cartItems.map((cartItem) => (
                    <tr key={cartItem.id}>
                        <td className="px-4 py-2">
                            {cartItem.product.title}
                        </td>
                        <td className="px-4 py-2 text-right">
                            {cartItem.product.price}
                        </td>
                        <td className="px-4 py-2 text-right">
                            {cartItem.product.quantity}
                        </td>
                        <td className="px-4 py-2 text-right">
                            {`$ ${cartItem.quantity.toFixed(2).toString()}`}
                        </td>
                    </tr>

                ))}
                <tr>
                    <td className="px-4 py-2 font-bold">Order Total</td>
                    <td></td>
                    <td className="px-4 py-2 text-right">{grandTotal}</td>
                </tr>
            </tbody>
        </table>
    )
}