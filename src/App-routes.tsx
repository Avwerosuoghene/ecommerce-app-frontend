import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Auth from "./pages/auth/auth";
import PasswordReset from "./pages/auth/password-reset/password-reset";
import Signup from "./pages/auth/signup/signup";
import Speakers from "./pages/speakers/speakers";
import Login from "./pages/auth/login/login";
import Home from "./pages/main/home/home";
import { useDispatch, useSelector } from "react-redux";
import { ReactNode, useEffect } from "react";
import { authActions } from "./redux/store/auth";
import ProductInfo from "./pages/product_info/product_info";
import Main from "./pages/main/main";
import Checkout from "./pages/main/checkout/checkout";
import ErrorPage from "./pages/main/404_page/error_page";
import UserProfile from "./pages/main/user-profile/user-profile";
import Admin from "./pages/admin/admin";
import AdminHome from "./pages/admin/admin-home/admin-home";
import AdminUpload from "./pages/admin/admin-upload/admin-upload";



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
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Routes>
        <Route
          path="/main"
          element={
            authState.isLoggedIn && authState.userType === 'buyer' ? <Main /> : <Navigate replace to={"/"} />
          }

       
        >
          <Route path="" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="product-info/:id" element={<ProductInfo />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/admin"  element={
            authState.isLoggedIn && authState.userType === 'seller' ? <Admin /> :   <Navigate replace to={"/"} />
          }>
          <Route path="" element={<Navigate to="home" />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="upload" element={<AdminUpload />} />
          <Route path="upload/:id" element={<AdminUpload />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>

      {/* <Routes>
        <Route path="/earphones" element={<EarPhones />} />
      </Routes>
      <Routes>
        <Route path="/speakers" element={<Speakers />} />
      </Routes>
      <Routes>

      </Routes> */}
  
      <Routes>
      </Routes>
    </section>
  );
};

export default AppRoutes;
