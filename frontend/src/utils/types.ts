

interface ProductDb {
    _id:string,
    name:string,
    type:string,
    price:number,
    onSale:boolean,
    salePercentage?:number,
    salePrice?:number,
    description:string,
    stock:number,
    sold:number,
    metal: 'gold' | 'silver' | 'brass',
    colors:string[],
    overallRating:number,
    reviews?:{
        postedBy:string,
        reviewDesc:string,
        rating:number,
        datePosted:Date
    }[]
    images:string[]
    imageFolder:string
}

interface UserTypes{
    id:string
    name:string,
    email:string,
    passwordHash:string
    wishList?:string[],
    shoppingCart:string,
    reviews?:{
        product:string[],
        reviewDesc:string,
        rating:number}[],
    orders?:string[],
    isAdmin:boolean,
    stripeId?:string
}

interface FunctionTypes{
    addFavorite: (id:string) => void,
    addToCart: (id:string) => void
    favorited: (id:string) => boolean
}

interface LandingPageTypes extends FunctionTypes{
    data:ProductDb[]
}

interface CatalogueTypes extends FunctionTypes{
    data:ProductDb[],
    title:string,
}

interface CardType{
    cardInfo: ProductDb
}

interface ReviewType{ 
    product:string,
    reviewDesc:string,
    rating:number[]
}

interface CartTypes{
    products:{
        product:ProductDb,
        quantity:number
    }[],
    user?:string,
    cartTotal:number,
    cartPrice:number,
}

interface CartFncType{
    increaseAmount:(id:string) => void,
    decreaseAmount:(id:string) => void,
    deleteProductCart : (id:string) => void
}

interface CartCheckoutTypes extends CartFncType{
    cart:CartTypes,
}

interface ProductCartType extends CartFncType{
    cart:{
        product:ProductDb,
        quantity:number
    }

}

export type {
    CardType,
    ProductDb,
    UserTypes,
    CatalogueTypes,
    ReviewType,
    CartCheckoutTypes,
    ProductCartType,
    FunctionTypes,
    CartTypes,
    LandingPageTypes,
    CartFncType
}