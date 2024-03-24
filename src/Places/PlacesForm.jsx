import { useState } from "react";

function PlacesForm({ handleAddPlace }) {
  const [place, setPlace] = useState("");
  const [placeAddress, setPlaceAddress] = useState("");
  const [reasonToVisit, setReasonToVisit] = useState("");
  const [visited, setVisited] = useState(false);

  const handleAdd = async (event) => {
    if (place.trim() !== "" && placeAddress !== "" && reasonToVisit !== "") {
      event.preventDefault();

      const payload = {
        place: place,
        placeAddress: placeAddress,
        reasonToVisit: reasonToVisit,
        visited: visited,
      };

      try {
        const createdRecord = await handleAddPlace(payload);

        setPlace("");
        setPlaceAddress("");
        setReasonToVisit("");
        setVisited(false);
      } catch (error) {
        console.error("Error adding place:", error);
      }
    }
  };

  return (
    <>
      <div className="input-form">
        <input
          className="input-place"
          type="text"
          placeholder="Enter Place to Visit"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />

        <input
          className="input-place-address"
          type="text"
          placeholder="Enter Place Address"
          value={placeAddress}
          onChange={(e) => setPlaceAddress(e.target.value)}
        />

        <input
          className="input-reason-to-visit"
          type="text"
          placeholder="Enter Reason to Visit"
          value={reasonToVisit}
          onChange={(e) => setReasonToVisit(e.target.value)}
        />
      </div>
      <button className="add-button" onClick={handleAdd}>
        +
      </button>
    </>
  );
}
export default PlacesForm;
