import { useContext } from 'react';

import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
  const cartContext = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;
  // toFixed(2) ensures that we always render 2 decimal places.
  // Reminds me of .printf() in Java

  const addToCartHandler = validatedAmount => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: validatedAmount,
      price: props.price
    });
  };


  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
        <MealItemForm onAddToCart={addToCartHandler} />
      <div>

      </div>
    </li>
  );
};

export default MealItem;
