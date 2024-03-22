import { useEffect, useState } from "react";
import AccommodationForm from "./AccommodationForm";

function AccommodationList() {
  const [accommodations, setAccomodations] = useState([]);

  useEffect(() => {
    async function fetchAccommodations() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/accommodations"
        );
        const jsonData = await response.json();
        jsonData.sort(
          (a, b) => new Date(a.checkInDate) - new Date(b.checkInDate)
        );
        setAccomodations(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchAccommodations();
  }, []);

  const addAccommodation = (a) => {
    setAccomodations([...accommodations, a]);
  };

  const deleteAccommodation = async (id) => {
    const response = await fetch(
      `http://localhost:3000/api/accommodations/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Typconse": "application/json",
        },
      }
    );
    if (response.ok) {
      setAccomodations(accommodations.filter((acc) => acc.id !== id));
    }
  };

  return (
    <div className="accommodation-container">
      <h1>Accomodation</h1>
      <AccommodationForm handleAddAccommodation={addAccommodation} />
      <h2>Booked Accomodation</h2>
      <table>
        <tbody>
          <tr>
            <th>Hotel</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Delete</th>
          </tr>
          {accommodations.map((accommodation) => {
            return (
              <tr key={accommodation.id}>
                <td className="hotel-name">{accommodation.hotel}</td>
                <td className="check-in-date">{accommodation.checkInDate}</td>
                <td className="check-out-date">{accommodation.checkOutDate}</td>
                <td
                  className="delete-button"
                  onClick={() => deleteAccommodation(accommodation.id)}
                >
                  X
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AccommodationList;
