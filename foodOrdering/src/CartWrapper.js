import { useNavigate } from "react-router-dom";
import Cart from "./Cart";

function CartWrapper(props) {
  const navigate = useNavigate();
  return <Cart navigate={navigate} {...props} />;
}

export default CartWrapper;
