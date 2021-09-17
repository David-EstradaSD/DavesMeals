import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  // toFixed(2) ensures that we always render 2 decimal places.
  // Reminds me of .printf() in Java
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
        <MealItemForm id={props.id} />
      <div>

      </div>
    </li>
  );
};

export default MealItem;
