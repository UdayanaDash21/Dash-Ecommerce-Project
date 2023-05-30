export interface signUp{
    name:string,
    email:string,
    password:string
}
export interface logIn{
   email:string,
   password:string 
}

export interface product{
    id:number,
    name: string,
    price: number,
    category: string,
    color: string ,
    description: string,
    image: string, 
   quantity:undefined | number,
    productId:undefined | number,
 }

 export interface cart{
    id:number | undefined,
    name: string,
    price: number,
    category: string,
    color: string ,
    description: string,
    image: string, 
    quantity:undefined | number,
    productId:number,
    userId:number,
 }
 export interface priceSummary{
   price:number,
   discount:number,
   tax:number,
   delivery:number,
   total:number,
 }

 export interface order{
   email:string,
   address:string,
   contact:string,
   totalPrice:number,
   userId:string,
   id:number | undefined,
 }