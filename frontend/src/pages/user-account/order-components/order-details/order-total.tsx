

const OrderTotal = (shippingCost:number,tax:number,subtotal:number,total:number,discount:string) => {
    return (
        <div>
            <div>
                <p>Subtotal</p>
                <p>{subtotal}</p>
            </div>
            <div>
                <p>Shipping & Handling</p>
                <p>{shippingCost}</p>
            </div>
            <div>
                <p>Discounts</p>
                <p>{discount}</p>
            </div>
            <div>
                <p>Tax</p>
                <p>{tax}</p>
            </div>
            <div>
                <p><strong>Order Total</strong></p>
                <p><strong>{total}</strong></p>
            </div>
        </div>
    )
}

export default OrderTotal