import { Home } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductInfo from "../product_info/product_info";
import Checkout from "./checkout/checkout";
import Main from "./main";


const MainRoutes = () => {
    const authState = useSelector((state: any) => state.auth);

    return (
        <section>
             <Routes>
        <Route
          path="/main"
          element={
            authState.isLoggedIn ? <Main /> : <Navigate replace to={"/"} />
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="product-info" element={<ProductInfo />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
        </section>
    )
}

export default MainRoutes;