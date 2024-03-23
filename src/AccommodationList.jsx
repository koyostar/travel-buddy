import { useEffect, useState } from "react";
import AccommodationForm from "./AccommodationForm";
import Airtable, { apiKey } from "airtable";

const config = {
  baseId: import.meta.env.VITE_AIRTABLE_BASE_ID,
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
  tableName: import.meta.env.VITE_AIRTABLE_TABLE_NAME,
};
console.log(config);

const base = new Airtable({ apiKey: config.apiKey }).base(config.baseId);

function AccommodationList() {
  const [accommodations, setAccomodations] = useState([]);

  useEffect(() => {
    async function fetchAccommodations() {
      try {
        const records = await base(config.tableName).select().all();
        records.sort(
          (a, b) =>
            new Date(a.fields.checkInDate) - new Date(b.fields.checkInDate)
        );
        setAccomodations(records);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchAccommodations();
  }, []);

  const addAccommodation = async (newAccomodation) => {
    try {
      const createRecord = await base(config.tableName).create(newAccomodation);
      setAccomodations([...accommodations, createRecord]);
    } catch (error) {
      console.error("Error adding accommodation:", error);
    }
  };

  const deleteAccommodation = async (id) => {
    try {
      await base(config.tableName).destroy(id);
      setAccomodations(accommodations.filter((acc) => acc.id !== id));
    } catch (error) {
      console.error("Error deleting accommodation:", error);
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
                <td className="hotel-name">{accommodation.fields.hotel}</td>
                <td className="check-in-date">
                  {accommodation.fields.checkInDate}
                </td>
                <td className="check-out-date">
                  {accommodation.fields.checkOutDate}
                </td>
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

// async function fetchAccommodations() {
// try {
//   const response = await fetch(
//     "http://localhost:3000/api/accommodations"
//   );
//   const jsonData = await response.json();
//   jsonData.sort(
//     (a, b) => new Date(a.checkInDate) - new Date(b.checkInDate)
//   );
//   setAccomodations(jsonData);
// } catch (error) {
//   console.error("Error fetching data:", error);
// }}

// base(config.table)
//   .select({ view: "Grid view" })
//   .eachPage((records, fetchNextPage) => {
//     setAccomodations(records);
//     fetchNextPage();
//   });
