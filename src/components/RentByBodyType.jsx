import React from "react";
import RentSection from "./RentSection";
import brand1 from "../assets/images/types/compact.png";
import brand2 from "../assets/images/types/convertible.png";
import brand3 from "../assets/images/types/coup.png";
import brand4 from "../assets/images/types/crossover.png";
import brand5 from "../assets/images/types/mpv.png";
import brand6 from "../assets/images/types/pickup.png";
import brand7 from "../assets/images/types/sedan.png";
import brand8 from "../assets/images/types/sport.png";
import brand9 from "../assets/images/types/suv.png";
import brand10 from "../assets/images/types/wagon.png";

const types = [
  { id: 1, name: "Compact", logo: brand1 },
  { id: 2, name: "Convertible", logo: brand2 },
  { id: 3, name: "Coupe", logo: brand3 },
  { id: 4, name: "Crossover", logo: brand4 },
  { id: 5, name: "MPV", logo: brand5 },
  { id: 6, name: "Pickup", logo: brand6 },
  { id: 7, name: "Sedan", logo: brand7 },
  { id: 8, name: "Sport", logo: brand8 },
  { id: 9, name: "SUV", logo: brand9 },
  { id: 10, name: "Wagon", logo: brand10 },
];

const RentByType = () => {
  return (
    <RentSection title="Rent by Types" items={types} viewAllLink="/types" />
  );
};

export default RentByType;
