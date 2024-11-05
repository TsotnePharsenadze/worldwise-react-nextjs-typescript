import axios from "axios";

export async function getCreateRandomCity() {
  await axios.post("/api/city", {
    data: {
      cityName: "San Francisco",
      country: "USA",
      emoji: "🌉",
      date: "2024-11-01T12:00:00.000Z",
      notes:
        "Famous for the Golden Gate Bridge, cable cars, and Alcatraz Island.",
      lat: 37.7749,
      lng: -122.4194,
    },
  });
}
