
interface Product{
    name:string,
    idProduct:string,
    type:string,
    price:number,
    onSale:boolean,
    salePercentage?:number,
    description:string,
    Gallery:string[],
}

interface Inventory{
    name:string,
    id:string,
    type:string,
    price:number,
    onSale:boolean,
    salePrice:number,
    description:string,
    Gallery:string[],
}[]

export {
    Product,
    Inventory
}