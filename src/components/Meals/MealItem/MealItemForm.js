import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = (props) => {
    return (
        <form className={styles.form}>
            <Input label="Amount" input={{
                id: 'amount',
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
        // NOTE: all these props^ are built-in props for all standard <input> tags in JS
        // thus, we can use them in our custom <Input> component as well
            }} />
            <button>Add To Cart</button>
        </form>
    );
};

export default MealItemForm;