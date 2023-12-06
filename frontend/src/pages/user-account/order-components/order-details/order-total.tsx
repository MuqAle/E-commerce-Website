


const OrderTotal = ({shippingCost,tax,subtotal,total,discount}:
    {shippingCost:number,
    tax:number,
    subtotal:number,
    total:number,
    discount:number}) => {
    return (
        <div className="order-summary">
            <div className="order-summary-subtotal">
                <p>Subtotal</p>
                <p>{subtotal}</p>
            </div>
            <div className="order-summary-shipping-cost">
                <p>Shipping & Handling</p>
                <p>{shippingCost}</p>
            </div>
            <div className="order-summary-discount">
                <p>Discounts</p>
                <p>{discount}</p>
            </div>
            <div className="order-summary-tax">
                <p>Tax</p>
                <p>{tax}</p>
            </div>
            <div className="order-summary-total">
                <p><strong>Order Total</strong></p>
                <p><strong>{total}</strong></p>
            </div>
        </div>
    )
}

export default OrderTotal