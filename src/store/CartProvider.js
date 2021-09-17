import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [], // this is the total number of items in the shopping cart
  totalAmount: 0, // this is the total price of the shopping cart
};

const cartReducer = (state, action) => {
  // cartReducer holds all the logic for adding an item to the cart
  if (action.identifier === "ADD") {
    
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
      ); // findIndex() is a built-in JS function which finds the index of an item in an array
         // so we find a specific element (item) in our array of items and Add / Remove it
      const existingCartItem = state.items[existingCartItemIndex];
      
      let updatedItems;
      
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item); 
    // recall that concat() adds a new element to the array BUT generates a brand new array 'state-object'
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.identifier === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
      ); 
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) { // if it's the last item of that type of food order / For ex) 1 Sushi
        updatedItems = state.items.filter(item => item.id !== action.id);
        // want to return a new array with filter() of all items that don't match the item.id with the action.id
      } else {
        const updatedItem = {...existingItem, amount: existingItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };
  }
  
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ identifier: "ADD", item: item });
    // Generally, we name our object's 1st property 'identifier' or 'type'
    // and we set the value to ALL CAPS String with a relavant name
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ identifier: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
