export default function PlacesItem({ place, onDelete, onVisitedChange }) {
  const handleDeleteClick = () => {
    onDelete(place.id);
  };

  const handleVisitedChange = (event) => {
    onVisitedChange(place.id, event.target.checked);
  };

  return (
    <tr>
      <td className="place-name">{place.fields.place}</td>
      <td className="place-address">{place.fields.placeAddress}</td>
      <td className="reason-to-visit">{place.fields.reasonToVisit}</td>
      <td className="visited-checkbox">
        <input
          type="checkbox"
          checked={place.fields.visited}
          onChange={handleVisitedChange}
        />
      </td>
      <td
        className="delete-button"
        onClick={handleDeleteClick}
        onChange={handleVisitedChange}
      >
        X
      </td>
    </tr>
  );
}
