import React, { useEffect, useState } from "react";

function YourComponent() {
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    // Vérifiez si le navigateur prend en charge la géolocalisation
    if ("geolocation" in navigator) {
      // Demandez l'autorisation d'accéder à la géolocalisation
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition({ latitude, longitude });
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
        }
      );
    } else {
      console.log("La géolocalisation n'est pas prise en charge.");
    }
  }, []);

  console.log("Position de l'utilisateur :", userPosition);

  return (
    <div>
      {/* Votre JSX ici */}
    </div>
  );
}

export default YourComponent;
