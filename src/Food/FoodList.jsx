import { useEffect, useState } from "react";
import FoodForm from "./FoodForm";
import Airtable, { apiKey } from "airtable";
import FoodItem from "./FoodItem";

const config = {
  baseId: import.meta.env.VITE_AIRTABLE_BASE_ID,
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
  tableName: import.meta.env.VITE_AIRTABLE_TABLE_NAME3,
};

const base = new Airtable({ apiKey: config.apiKey }).base(config.baseId);

function FoodList() {
  const [food, setFood] = useState([]);

  useEffect(() => {
    async function fetchFood() {
      try {
        const records = await base(config.tableName).select().all();
        records.sort((a, b) =>
          a.fields.foodItem.localeCompare(b.fields.foodItem)
        );
        setFood(records);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchFood();
  }, []);

  const addFoodItem = async (newFoodItem) => {
    try {
      const createRecord = await base(config.tableName).create(newFoodItem);
      setFood([...food, createRecord]);
    } catch (error) {
      console.error("Error adding foodItem:", error);
    }
  };

  const deleteFoodItem = async (id) => {
    try {
      await base(config.tableName).destroy(id);
      setFood(food.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Error deleting foodItem:", error);
    }
  };

  const handleAteChange = async (id, boolean) => {
    try {
      console.log("Updating foodItem with ID:", id);
      console.log("Setting ate to:", boolean);

      const updatedFood = food.map((foodItem) => {
        if (foodItem.id === id) {
          return {
            ...foodItem,
            ate: boolean,
          };
        }
        return foodItem;
      });
      console.log("Updated food array:", updatedFood);

      const response = await base(config.tableName).update(id, {
        ate: boolean,
      });

      console.log("Update response:", response);

      setFood(updatedFood);
    } catch (error) {
      console.error("Error updating foodItem:", error);
    }
  };

  return (
    <div className="food-container">
      <h2>Food To Eat</h2>
      <FoodForm handleAddFoodItem={addFoodItem} />
      <h2>List of Food</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Food</th>
              <th>Restaurant</th>
              <th>Ate</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {food.map((foodItem) => (
              <FoodItem
                key={foodItem.id}
                foodItem={foodItem}
                onDelete={deleteFoodItem}
                onAteChange={handleAteChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default FoodList;
