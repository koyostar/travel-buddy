import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AccommodationForm({ handleAddAccommodation }) {
  const [hotel, setHotel] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleAdd = async (event) => {
    if (hotel.trim() !== "" && checkInDate !== null && checkOutDate !== null) {
      event.preventDefault();

      const payload = {
        hotel: hotel,
        checkInDate: formatDate(checkInDate),
        checkOutDate: formatDate(checkOutDate),
      };

      try {
        const createdRecord = await handleAddAccommodation(payload);

        setHotel("");
        setCheckInDate(null);
        setCheckOutDate(null);
      } catch (error) {
        console.error("Error adding accommodation:", error);
      }
    }
  };

  return (
    <>
      <div className="input-form">
        <input
          className="input-hotel"
          type="text"
          placeholder="Enter Hotel Name"
          value={hotel}
          onChange={(e) => setHotel(e.target.value)}
        />
        <br />
      </div>

      <div className="input-form">
        <DatePicker
          className="date-picker1"
          showIcon
          fixedHeight
          placeholderText="Select Check-In Date"
          dateFormat="dd MMMM yyyy"
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
        />
        <DatePicker
          className="date-picker2"
          showIcon
          fixedHeight
          placeholderText="Select Check-Out Date"
          dateFormat="dd MMMM yyyy"
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
        />
      </div>
      <button className="add-button" onClick={handleAdd}>
        +
      </button>
    </>
  );
}
export default AccommodationForm;
