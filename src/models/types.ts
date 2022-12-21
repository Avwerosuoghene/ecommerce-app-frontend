export interface IloginPayload {
    email: string,
    password: string, 
}

export interface IsignUpPayload extends IloginPayload {

    name: string
}

export interface IpasswordResetPayload extends IloginPayload {
    confirmPassword: string
}

//   export interface  IloginPayload {
//     email: string,
//     password: string,
//   }