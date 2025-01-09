import { useEffect, useState } from "react";
import AccommodationForm from "./AccommodationForm";
import AccommodationItem from "./AccommodationItem";
import {
  addAccommodation,
  deleteAccommodation,
  editAccommodation,
  fetchAllAccommodations,
  updateStayedStatus,
} from "../API/AccommodationAPI";

function AccommodationList() {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    async function loadAccommodations() {
      try {
        const data = await fetchAllAccommodations();
        data.sort(
          (a, b) =>
            new Date(a.fields.checkInDate) - new Date(b.fields.checkInDate)
        );
        setAccommodations(data);
      } catch (error) {
        console.error("Error loading Accommodations:", error);
      }
    }

    loadAccommodations();
  }, []);

  const handleAddAccommodation = async (newAccommodation) => {
    try {
      const createdAccommodation = await addAccommodation(newAccommodation);

      setAccommodations((prev) => [...prev, createdAccommodation]);
    } catch (error) {
      console.error("Error adding accommodation:", error);
    }
  };

  const handleUpdateStayedStatus = async (id, stayed) => {
    try {
      const updatedAccommodation = await updateStayedStatus(id, stayed);
      setAccommodations((prev) =>
        prev.map((acc) =>
          acc.id === id ? { ...acc, stayed: updatedAccommodation.stayed } : acc
        )
      );
    } catch (error) {
      console.error("Error updating Accommodation status:", error);
    }
  };

  const handleDeleteAccommodation = async (id) => {
    try {
      await deleteAccommodation(id);
      setAccommodations((prev) => prev.filter((acc) => acc.id !== id));
    } catch (error) {
      console.error("Error deleting accommodation:", error);
    }
  };

  const handleEditAccommodation = async (id, updatedAccommodation) => {
    try {
      const updatedData = await editAccommodation(id, updatedAccommodation);
      setAccommodations((prev) =>
        prev.map((acc) => (acc.id === id ? { ...acc, ...updatedData } : acc))
      );
    } catch (error) {
      console.error("Error updating Accommodation:", error);
    }
  };

  return (
    <div className="accommodation-container">
      <h2>Accomodation</h2>
      <AccommodationForm handleAddAccommodation={handleAddAccommodation} />
      <h2>Booked Accomodation</h2>
      <div className="table-container">
        {accommodations.length === 0 ? (
          <p>No accommodations available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Hotel</th>
                <th>Check-In Date</th>
                <th>Check-In Time</th>
                <th>Check-Out Date</th>
                <th>Check-Out Time</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {accommodations.map((accommodation) => (
                <AccommodationItem
                  key={accommodation.id}
                  accommodation={accommodation}
                  onEdit={handleEditAccommodation}
                  onDelete={handleDeleteAccommodation}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
export default AccommodationList;
