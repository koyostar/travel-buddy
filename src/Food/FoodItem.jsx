export default function FoodItem({ foodItem, onDelete, onAteChange }) {
  const handleDeleteClick = () => {
    onDelete(foodItem.id);
  };

  const handleAteChange = (event) => {
    onAteChange(foodItem.id, event.target.checked);
  };

  return (
    <tr>
      <td className="foodItem-name">{foodItem.fields.foodItem}</td>
      <td className="restaurant">{foodItem.fields.restaurant}</td>
      <td className="ate-checkbox">
        <input
          type="checkbox"
          checked={foodItem.fields.ate}
          onChange={handleAteChange}
        />
      </td>
      <td
        className="delete-button"
        onClick={handleDeleteClick}
        onChange={handleAteChange}
      >
        X
      </td>
    </tr>
  );
}
