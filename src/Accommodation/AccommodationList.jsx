import { useEffect, useState } from "react";
import AccommodationForm from "./AccommodationForm";
import Airtable, { apiKey } from "airtable";
import AccommodationItem from "./AccommodationItem";

const config = {
  baseId: import.meta.env.VITE_AIRTABLE_BASE_ID,
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
  tableName: import.meta.env.VITE_AIRTABLE_TABLE_NAME,
};

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
        <thead>
          <tr>
            <th>Hotel</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {accommodations.map((accommodation) => (
            <AccommodationItem
              key={accommodation.id}
              accommodation={accommodation}
              onDelete={deleteAccommodation}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default AccommodationList;
