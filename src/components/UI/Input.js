import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input id={props.input.id} {...props.input} />
      {/* NOTE: {...props.input} ensures that all the key-value pairs 
      on this input object are added as props to input. 
      So if there is additional props like {type="text"} or other attributes, it's added! */}
    </div>
  );
};

export default Input;
