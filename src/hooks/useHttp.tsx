import { signUp } from "../services/api";
import { IsignUpPayload } from "../models/types";



const useHttp = async (signUpPayload: IsignUpPayload) => {
    let result;

   

        try {
            const data = await signUp(signUpPayload );
            result = data;
            console.log(data)
        } catch  (error){
            console.log(error)
        }
       
    

    return result;
   
}

export default useHttp;