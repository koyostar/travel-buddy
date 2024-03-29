import { useEffect, useState } from "react";
import AccommodationForm from "./AccommodationForm";
import Airtable, { apiKey } from "airtable";
import AccommodationItem from "./AccommodationItem";

const config = {
  baseId: import.meta.env.VITE_AIRTABLE_BASE_ID,
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
  tableName: import.meta.env.VITE_AIRTABLE_TABLE_NAME1,
};

const base = new Airtable({ apiKey: config.apiKey }).base(config.baseId);

function AccommodationList() {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    async function fetchAccommodations() {
      try {
        const records = await base(config.tableName).select().all();
        records.sort(
          (a, b) =>
            new Date(a.fields.checkInDate) - new Date(b.fields.checkInDate)
        );
        setAccommodations(records);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchAccommodations();
  }, []);

  const addAccommodation = async (newAccommodation) => {
    try {
      const createRecord = await base(config.tableName).create(
        newAccommodation
      );
      setAccommodations([...accommodations, createRecord]);
    } catch (error) {
      console.error("Error adding accommodation:", error);
    }
  };

  const deleteAccommodation = async (id) => {
    try {
      await base(config.tableName).destroy(id);
      setAccommodations(accommodations.filter((acc) => acc.id !== id));
    } catch (error) {
      console.error("Error deleting accommodation:", error);
    }
  };

  return (
    <div className="accommodation-container">
      <h2>Accomodation</h2>
      <AccommodationForm handleAddAccommodation={addAccommodation} />
      <h2>Booked Accomodation</h2>
      <div class="table-container">
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
    </div>
  );
}
export default AccommodationList;
