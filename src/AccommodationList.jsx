import { AccommodationData } from "./AccommodationData";

function AccommodationList() {
  const accommodations = AccommodationData;

  return (
    <div className="accommodation-list">
      <h1>Booked Accomodation</h1>
      <ol>
        {accommodations.map((accommodation, index) => (
          <li key={index}>
            <p className="hotel-name">
              Hotel: <span>{accommodation.hotel} </span>
            </p>
            <p className="check-in-date">
              Check-In: <span>{accommodation.checkInDate} </span>
            </p>
            <p className="check-out-date">
              Check-Out: <span>{accommodation.checkOutDate}</span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default AccommodationList;
