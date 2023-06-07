import { Dialog } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import { LinearProgress } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import classes from "./confirmation_dialog.module.scss";
import Button from "../../UI/button/Button";
import { useEffect, useState } from "react";

const ConfirmationDialog = (props: {
  message: string;
  onClose: (msg: string) => void;
  open: boolean;
  confirmFunction: (
    prodId: string | undefined
  ) => Promise<{ message: string; onSuccess: boolean }>;
  productId: string | undefined;
}) => {
  const navigate = useNavigate();
  const [succesPage, setSucessPage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setSucessPage(false)
  }, [])

  const handleClose = () => {
    setSucessPage(false)
    props.onClose("dialog closed");
  };

  const confirmActionHandler = async () => {
    setIsLoading(true);

      const confirmAction: { message: string; onSuccess: boolean } =
      await props.confirmFunction(props.productId);
      setIsLoading(false);
    if (confirmAction.onSuccess) {
      setMessage(confirmAction.message);
      setSucessPage(true);
      setIsSuccess(true);
    } else {
      setMessage(confirmAction.message);
      setSucessPage(true);
      setIsSuccess(false);
    }
    
 
  
  };

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      sx={{
        backdropFilter: "blur(2px)",
      }}
      className={classes.dialog}
    >
        {isLoading && <LinearProgress className={classes.loader} />}
     {!succesPage &&  <DialogContent className={classes.dialog_content}>
        {/* <div className={classes.dialog_header}> */}
        <CancelOutlinedIcon
          sx={{ color: "#D0312D", fontSize: 60, marginBottom: 4 }}
        />
        {/* </div> */}
        <h3>Are you sure?</h3>
        <div>
          <h5>{props.message}</h5>
        </div>
        <div className={classes.action_buttons}>
          <Button
            type="button"
            design="orange"
            onClick={confirmActionHandler}
            style={classes.card_button_cancel}
            // onMouseDown={(e: any) => e.stopPropagation()}
          >
            CONFIRM
          </Button>
          <Button
            type="button"
            design="outline"
            onClick = {handleClose}
            style={classes.card_button}
            // onMouseDown={(e: any) => e.stopPropagation()}
          >
            CANCEL
          </Button>
        </div>
      </DialogContent>}

      {succesPage && (
        <DialogContent className={`${classes.dialog_content} ${classes.success}`}>
          {isSuccess && (
            <CheckCircleOutlineIcon
              sx={{ color: "#3CB043", fontSize: 50, marginBottom: 4 }}
            />
          )}
          {!isSuccess && (
            <CancelOutlinedIcon
              sx={{ color: "#3CB043", fontSize: 50, marginBottom: 4 }}
            />
          )}
          <h3>{message}</h3>
          <Button
            type="button"
            design="orange"
            onClick = {handleClose}
            style={classes.card_button_done}
            // onMouseDown={(e: any) => e.stopPropagation()}
          >
            DONE
          </Button>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ConfirmationDialog;
