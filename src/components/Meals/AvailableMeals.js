import { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => { // This useEffect will only run the 1st time the component is rendered
    const fetchMeals = async () => {
      const response = await fetch('https://react-udemy-http-fd441-default-rtdb.firebaseio.com/meals.json').then();
      const responseData = await response.json();
      
  // we need to transform our data "object" into an array of "meals"
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key, // the key will be the id of the invdivual meal we're fetching from the DB
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals); // update our empty array with the fetched data from the DB
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      //   meal={meal} // note that we can just pass a "meal" prop and chain.invoke it in the child MealItem along with props!!
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
