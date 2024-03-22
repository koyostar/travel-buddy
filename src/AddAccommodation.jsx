import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { addNewAccommodation } from "./AccommodationData";

function AddAccommodation() {
  const [hotel, setHotel] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  function handleHotelChange(event) {
    setHotel(event.target.value);
  }

  function addAcc() {
    if (hotel.trim() !== "" && checkInDate !== null && checkOutDate !== null) {
      const newAccommodation = {
        hotel: hotel,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
      };

      addNewAccommodation(newAccommodation);
      setHotel("");
      setCheckInDate(null);
      setCheckOutDate(null);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Hotel Name"
        value={hotel}
        onChange={handleHotelChange}
      />

      <ReactDatePicker
        placeholderText="Select Check-In Date"
        selected={checkInDate}
        onChange={(date) => setCheckInDate(date)}
        fixedHeight
      />
      <ReactDatePicker
        placeholderText="Select Check-Out Date"
        selected={checkOutDate}
        onChange={(date) => setCheckOutDate(date)}
        fixedHeight
      />
      <button className="add-button" onClick={() => addAcc()}>
        Add
      </button>
    </div>
  );
}

export default AddAccommodation;
