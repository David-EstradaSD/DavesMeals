import { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // we want to start this componenet with rendering data from the DB, thus we want to show this
  const [httpError, setHttpError] = useState(null);

  useEffect(() => { // This will only run the 1st time the component is rendered
    const fetchMeals = async () => {
      const response = await fetch('https://react-udemy-http-fd441-default-rtdb.firebaseio.com/meals.json').then();


      if (response.status !== 200) {
        throw new Error('Something went wrong!');
        // by instantiating a new Error object, we give it default properties such as "message"
      }

      const responseData = await response.json();
      
  // ---- we need to transform our data "object" into an array of "meals"
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
      setIsLoading(false); // done loading data from the DB
    };
 
    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message); // we can invoke the built-in "message" property
      }); // since fetchMeals() is an "async" function, it returns a "promise" and thus we can invoke the "catch" method directly (instead of wrapping this in a try catch block)
  }, []);

  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p> Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.mealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

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
