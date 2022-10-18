export type  User= {
  id:number;
  name: string;
  email: string;
  password:string;
  zipcode: string;
  address:string;
  telephone: string;
};

export type Item ={
  id:number;
  type:string;
  name:string;
  description:string;
  priceM:number;
  priceL:number;
  imagePath:string;
  deleted:boolean;
  toppingList: [];
}

export type Topping ={
  id:number;
  type:string;
  name:string;
  // priceM:number;
  //priceL:number;
}

export type Order ={
  id:number;
  userId:number;
  status:number;
  totalPrice:number;
  orderDate:Date;
  destinationName: string;
  destinationEmail: string;
  destinationZipcode:string;
  destinationAddress: string;
  destinationTel:string;
  deliveryTime: Date;
  paymentMethod: number;
  user:User;
  orderItemList: [];
}

export type OrderItem = {
  id:number;
  itemId:number;
  orderId:number;
  quantity:number;
  size:number;
  item:Item;
  orderToppingList:[];
}

export type OrderTopping={
  id:number;
  toppingId:number;
  orderItemId:number;
  topping: Topping;
}
