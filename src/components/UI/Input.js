import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
      {/* NOTE: {...props.input} ensures that all the key-value pairs 
      on this input object are added as props to input. 
      So if there is additional props like {type="text"} or other attributes, it's added! */}
    </div>
  );
});

export default Input;
