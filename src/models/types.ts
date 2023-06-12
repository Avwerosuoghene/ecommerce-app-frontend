export interface IloginPayload {
  email: string;
  password: string;
}

export interface IsignUpPayload extends IloginPayload {
  name: string;
}

export interface IpasswordResetPayload extends IloginPayload {
  confirmPassword: string;
}

export interface IpostUploadPayload {
  title: string;
  price: number;
  category: string;
  description: string;
  features: Array<{name: string, quantity: number}>;
  featuresDescription: string;
  image: any;
  userId: string | undefined;
}

export interface ProductI{
  _id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  features: [
    {
      name: string;
      quantity: number;
    }
  ];
  featuresDescription: string;
  rating: number;
  reviews: number;
  userId: Object;
  image: string;

  
}

export interface CartItem {
  product: Pick<ProductI, '_id' | 'title' | 'price' | 'image'>,
  quantity: number,
  _id: string,
  sum: number
}


