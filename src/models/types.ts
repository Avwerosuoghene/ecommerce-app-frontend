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
  features: Array<Object>;
  image: any;
  userId: string | undefined;
}

//   export interface  IloginPayload {
//     email: string,
//     password: string,
//   }
