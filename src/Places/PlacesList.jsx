import { useEffect, useState } from "react";
import PlacesForm from "./PlacesForm";
import Airtable, { apiKey } from "airtable";
import PlacesItem from "./PlacesItem";

const config = {
  baseId: import.meta.env.VITE_AIRTABLE_BASE_ID,
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
  tableName: import.meta.env.VITE_AIRTABLE_TABLE_NAME2,
};

const base = new Airtable({ apiKey: config.apiKey }).base(config.baseId);

function PlacesList() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const records = await base(config.tableName).select().all();
        records.sort((a, b) => a.fields.place.localeCompare(b.fields.place));
        setPlaces(records);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchPlaces();
  }, []);

  const addPlace = async (newPlace) => {
    try {
      const createRecord = await base(config.tableName).create(newPlace);
      setPlaces([...places, createRecord]);
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  const deletePlace = async (id) => {
    try {
      await base(config.tableName).destroy(id);
      setPlaces(places.filter((acc) => acc.id !== id));
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  const handleVisitedChange = async (id, boolean) => {
    try {
      console.log("Updating place with ID:", id);
      console.log("Setting visited to:", boolean);

      const updatedPlaces = places.map((place) => {
        if (place.id === id) {
          return {
            ...place,
            visited: boolean,
          };
        }
        return place;
      });
      console.log("Updated places array:", updatedPlaces);

      const response = await base(config.tableName).update(id, {
        visited: boolean,
      });

      console.log("Update response:", response);

      setPlaces(updatedPlaces);
    } catch (error) {
      console.error("Error updating place:", error);
    }
  };

  return (
    <div className="places-container">
      <h2>Places To Visit</h2>
      <PlacesForm handleAddPlace={addPlace} />
      <h2>List of Places</h2>
      <div class="table-container2">
        <table>
          <thead>
            <tr>
              <th>Place</th>
              <th>Address</th>
              <th>Reason To Visit</th>
              <th>Visited</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place) => (
              <PlacesItem
                key={place.id}
                place={place}
                onDelete={deletePlace}
                onVisitedChange={handleVisitedChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default PlacesList;
