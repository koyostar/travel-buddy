import { useState } from "react";

function FoodForm({ handleAddFoodItem }) {
  const [foodItem, setFoodItem] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [ate, setAte] = useState(false);

  const handleAdd = async (event) => {
    if (foodItem.trim() !== "" && restaurant !== "") {
      event.preventDefault();

      const payload = {
        foodItem: foodItem,
        restaurant: restaurant,
        ate: ate,
      };

      try {
        const createdRecord = await handleAddFoodItem(payload);

        setFoodItem("");
        setRestaurant("");
        setAte(false);
      } catch (error) {
        console.error("Error adding foodItem:", error);
      }
    }
  };

  return (
    <>
      <div className="input-form">
        <input
          className="input-food-item"
          type="text"
          placeholder="Enter Food to Eat"
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
        />

        <input
          className="input-restaurant"
          type="text"
          placeholder="Enter Restaurant"
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}
        />
      </div>
      <button className="add-button" onClick={handleAdd}>
        +
      </button>
    </>
  );
}
export default FoodForm;
