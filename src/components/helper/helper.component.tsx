export class HelperComponent {
  emailTest = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
  passwordTest = new RegExp(
    /^(?=.*\d{1,})(?=.*[A-Z]{1,})[\w\d[\]{};:=<>_+^#$@!%*?&\.]{6,}$/
  );

  private reducerFunction = (test: any, action: any, state: any) => {
    if (action.type === "INPUT") {
      return {
        value: action.value,
        isValid: test,
      };
    }
    if (action.type === "BLUR") {
      return { value: state.value, isValid: state.isValid, touched: true };
    }
    return { value: "", isValid: false };
  };

  defaultReducer = (state: any, action: any) => {
    let test;
 
    if (action.value) {

      switch (action.element) {
        case "email":
          test = this.emailTest.test(action.value.trim());
          break;
        case "phone":
          if (action.value.length > 11) {
            return {
              value: state.value,
              isValid: true,
            };
          }
          action.value = action.value.replace(/\D/g, "");
          test = action.value.trim().length === 11;
          break;
        case "password":
          test = action.value.trim().length > 3;
          break;
        case "sup_password":
          test = this.passwordTest.test(action.value.trim());
          break;
        case "zip code":
          action.value = action.value.replace(/\D/g, "");
          test = action.value.trim().length > 3;
          break;
        default:
          test = action.value.trim().length > 3;
          break;
      }
    } else {
      test = null;
    }
    return this.reducerFunction(test, action, state);
  };

  initialDispatchState = {
    value: "",
    isValid: false,
    touched: false,
  };
}
