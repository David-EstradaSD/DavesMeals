import { useContext, useEffect, useState } from "react";

import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartContext = useContext(CartContext);

  const { items } = cartContext; // using object destructuring to pull out only the items array from cartContext

  const numOfCartItems = items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);
  // by using array.reduce(), we can extract a single value for an array by 
  // selecting the total number of items where each cart item is just a single
  // aggregate of its total number of pieces of that item 


  const buttonClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : '' }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    } 
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => { // recall that any functions being returned in useEffect are called automatically as a "cleanup" function
      clearTimeout(timer); // ensures that the Header's Add Cart button clears & bumps even if we "spam" the Add button very fast. 
    };

  }, [items]);


  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
