import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth/auth";
import PasswordReset from "./pages/auth/password-reset/password-reset";
import Signup from "./pages/auth/signup/signup";
import EarPhones from "./pages/earphones/earphones";
import Speakers from "./pages/speakers/speakers";
import Login from "./pages/auth/login/login";
import Home from "./pages/main/home/home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./redux/store/auth";
import ProductInfo from "./pages/product_info/product_info";
import Main from "./pages/main/main";

const AppRoutes = () => {
  const authState = useSelector((state: any) => state.auth);

  return (
    <section>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
      </Routes>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth" element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="password-reset" element={<PasswordReset />} />
        </Route>
      </Routes>
      <Routes>
        <Route
          path="/main"
          element={
            authState.isLoggedIn ? <Main /> : <Navigate replace to={"/"} />
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="product-info" element={<ProductInfo />} />
        </Route>
      </Routes>
      {/* <Routes>
        <Route
          path="/home"
          element={
            authState.isLoggedIn ? <Home /> : <Navigate replace to={"/"} />
          }
        />

      </Routes> */}
      {/* <Routes>
     
      </Routes> */}
      <Routes>
        <Route path="/earphones" element={<EarPhones />} />
      </Routes>
      <Routes>
        <Route path="/speakers" element={<Speakers />} />
      </Routes>
      <Routes>{/* <Route path="*" element={<Navigate to="/" />} /> */}</Routes>
    </section>
  );
};

export default AppRoutes;
