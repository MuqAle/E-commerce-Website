

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
        postedBy:{
            id:string,
            firstName:string,
            lastName:string
        },
        reviewDesc:string,
        reviewTitle:string
        rating:number,
        datePosted:Date
    }[]
    images:string[]
    imageFolder:string
}

interface UserTypes{
    id:string
    firstName:string,
    lastName:string,
    email:string,
    passwordHash:string
    wishList:ProductDb[],
    shoppingCart:string,
    reviews?:{
        product:ProductDb,
        reviewDesc:string,
        reviewTitle:string
        rating:number}[],
    orders?:OrderType[],
    isAdmin:boolean,
    stripeId?:string
}

interface UserReviewType{
    reviews:{
        reviewDesc:string,
        reviewTitle:string
        rating:number | null
    } | undefined
}

interface ReviewType{
    postedBy:{
        id:string,
        firstName:string,
        lastName:string
    },
    reviewDesc:string,
    reviewTitle:string
    rating:number,
    datePosted:Date
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
    title:string,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>
}

interface LandingTypes extends FunctionTypes{
    title:string,
    isLoading:boolean,
    data:ProductDb[]
}
interface ProductTypes extends FunctionTypes{
    loginFnc:() => void,
    user:LoginTypes | null,
    userReviews:UserTypes['reviews']
}

interface CardType{
    cardInfo: ProductDb
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
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    token:string|null,
    favorited:(id: string) => boolean
    moveToWishlist: (id:string) => void,
}

interface ProductCartType extends CartFncType{
    favorited:(id: string) => boolean,
    moveToWishlist: (id:string) => void,
    cart:{
        product:ProductDb,
        quantity:number
    }
}

interface LoginTypes{
    email:string,
    name:string,
    token:string,
    isAdmin:boolean
}

interface OrderType{
    id:string,
    createdAt:string,
    products:{
        product:ProductDb,
        quantity:number}[],
    name:string,
    email:string,
    shippingName:string,
    shippingAddress:{
        line1:string,
        line2:string,
        postal_code:string,
        city:string,
        state:string,
        country:string
    },
    paymentType:string,
    billingDetails:{
        address:OrderType['shippingAddress']
        email:string,
        name:string
    }
    cardInfo:{
        brand:string,
        last4:string
    }
    userId:string,
    paymentIntentId:string,
    orderStatus:string,
    shippingMethod:string,
    shippingCost:number,
    tax:number,
    subtotal:number,
    total:number
}


export type {
    LandingTypes,
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
    CartFncType,
    LoginTypes,
    ProductTypes,
    UserReviewType,
    OrderType
}