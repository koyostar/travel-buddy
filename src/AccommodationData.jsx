export const AccommodationData = [
  {
    hotel: "citizenM Taipei",
    checkInDate: "15 May 2024",
    checkOutDate: "17 May 2024",
  },
  {
    hotel: "Miramar Garden Taipei",
    checkInDate: "17 May 2024",
    checkOutDate: "19 May 2024",
  },
  {
    hotel: "Inhouse Hotel Taichung",
    checkInDate: "19 May 2024",
    checkOutDate: "20 May 2024",
  },
];

export function addNewAccommodation(newAccommodation) {
  const updatedAccommodationData = [...AccommodationData, newAccommodation];

  AccommodationData = updatedAccommodationData;
}
