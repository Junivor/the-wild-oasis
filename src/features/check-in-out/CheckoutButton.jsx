import Button from "../../ui/Button";
import {useCheckout} from "./useCheckout.js";
import Spinner from "../../ui/Spinner.jsx";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

function CheckoutButton({ bookingId }) {
  const { isCheckout, setCheckout } = useCheckout()
  console.log(isCheckout)
  return (
    <Button
        variations="primary"
        sizes="small"
        disabled={isCheckout}
        onClick={() => setCheckout(bookingId)}
    >
      {isCheckout ? <SpinnerMini /> : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
