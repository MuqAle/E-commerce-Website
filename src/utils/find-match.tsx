interface ArrayProps{
    object:{
        name:string,
        id:string,
        type:string,
        price:number,
        onSale:boolean,
        salePrice:number,
        description:string,
        Gallery:string[],
      },
    array:{
        product:ArrayProps['object'],
        amount:number
    }[]
}


export function containsCartObject(array:ArrayProps["array"], object:ArrayProps["object"]) {
    return array.find(item => item.product === object) !== undefined;
  }

export function containsFavoriteObject(array:ArrayProps['object'][], object:ArrayProps["object"]){
    return array.find(item => item === object) !== undefined
}
