import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutDialog from "../../../components/dialogs/checkout-dialog/checkout_dialog";
import ConfirmationDialog from "../../../components/dialogs/confirmation-dialog/confirmation_dialog";
import AdminCard from "../../../components/UI/admin-card/admin-card";
import useHttp from "../../../hooks/useHttp";
import {
  deleteProductById,
  getProducts,
  getUserProducts,
} from "../../../services/api";
import classes from "./admin-home.module.scss";

const AdminHome = () => {
  const [open, setOpen] = useState(false);
  const { sendRequest } = useHttp();
  const [isLoading, setIsLoading] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const navigate = useNavigate();
  const confirmMessage =
    "Do you really want to delete this product? This process cannot be reversed.";

  useEffect(() => {
    fetchUserproducts();
  }, []);



  const fetchUserproducts = async () => {
    try {
      setIsLoading(true);
      const apiResponse = await sendRequest(getUserProducts);
      setIsLoading(false);
      if (apiResponse.isSuccess) {
        console.log(apiResponse);
      }
      setUserProducts(apiResponse.data);

      console.log(cardsTopDeals);
    } catch (error) {
      setIsLoading(false);
      console.log(`error in fetching products upload ${error}`);
    }
  };

  const deletProduct = async (productId: string | undefined): Promise< {message:string,onSuccess: boolean  }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const apiResponse = await sendRequest(deleteProductById, productId);
        if (apiResponse.isSuccess) {
          console.log(apiResponse);
          resolve({
            onSuccess: true,
            message: "Product deleted succesfully",
          });
          // fetchUserproducts()
        } else {
          reject({
            onSuccess: false,
            message: "Error deleting product",
          });
        }
        // setIsLoading(true);
        setIsLoading(false);

        // setUserProducts(apiResponse.data);

        console.log(cardsTopDeals);
      } catch (error) {
        //   setIsLoading(false);
        reject({
          onSuccess: false,
          message: `Error deleting product ${error}`,
        });
        //   console.log(`error in deleting product ${error}`);
      }
    });
  };

  const handleDialogClose = (value: string) => {
    setOpen(false);
    fetchUserproducts()
  };

  const [selectedProduct, setSelectedProduct] = useState<string>();
  const createCards = () => {
    const generatedDisplayedCards = userProducts?.map((product: any) => (
      <AdminCard
        slideContent={product}
        key={product._id}
        onDeleteClicked={() => openCartHandler(product._id)}
        // onCardClick={() => onCardClicked(product._id)}
        card_container={classes.cardContainer}
        onEditClicked = {() =>  navigate(`/admin/upload/${product._id}`)}
        // addToCartClicked={addToCartHandler}
      />
    ));
    // console.log(generatedDisplayedCards)
    return generatedDisplayedCards;
  };

  const openCartHandler = (e: any) => {
    setSelectedProduct(e);
    console.log(e);
    setOpen(true);
  };


  let cardsTopDeals: any = createCards();
  console.log(cardsTopDeals);

  if (cardsTopDeals.length <= 0 && !isLoading)
    return (
      <section className={classes.default_container}>
        <h3>No upload found for current user</h3>
      </section>
    );

  return (
    <section className={classes.default_container}>
      {isLoading && <LinearProgress className={classes.loader} />}
      {cardsTopDeals}
      <ConfirmationDialog
        open={open}
        onClose={handleDialogClose}
        productId={selectedProduct}
        message={confirmMessage}
        confirmFunction={deletProduct}
      />
    </section>
  );
};

export default AdminHome;
