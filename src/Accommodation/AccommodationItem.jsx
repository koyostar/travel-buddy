export default function AccommodationItem({ accommodation, onDelete }) {
  const checkInDate = new Date(accommodation.fields.checkInDate);
  const checkOutDate = new Date(accommodation.fields.checkOutDate);

  const handleDeleteClick = () => {
    onDelete(accommodation.id);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <tr>
      <td className="hotel-name">{accommodation.fields.hotel}</td>
      <td className="check-in-date">{formatDate(checkInDate)}</td>
      <td className="check-out-date">{formatDate(checkOutDate)}</td>
      <td className="delete-button" onClick={handleDeleteClick}>
        X
      </td>
    </tr>
  );
}
