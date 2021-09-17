import { useContext } from "react";

import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);

  const numOfCartItems = cartContext.items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);
  // by using array.reduce(), we can extract a single value for an array by 
  // selecting the total number of items where each cart item is just a single
  // aggregate of its total number of pieces of that item 


  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
