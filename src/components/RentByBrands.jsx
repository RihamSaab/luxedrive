import React from "react";
import RentSection from "./RentSection";
import brand1 from "../assets/images/brands/bmw.png";
import brand2 from "../assets/images/brands/Chevrolet.png";
import brand3 from "../assets/images/brands/ford.png";
import brand4 from "../assets/images/brands/Honda.png";
import brand5 from "../assets/images/brands/Nissan.png";
import brand6 from "../assets/images/brands/toyota.svg";
import brand7 from "../assets/images/brands/Volkswagen.png";
import brand8 from "../assets/images/brands/mercedes.png";
import brand9 from "../assets/images/brands/audi.png";
import brand10 from "../assets/images/brands/Hyundai.png";
import brand11 from "../assets/images/brands/kia.png";

const brands = [
  { id: 1, name: "BMW", logo: brand1 },
  { id: 2, name: "Chevrolet", logo: brand2 },
  { id: 3, name: "Ford", logo: brand3 },
  { id: 4, name: "Honda", logo: brand4 },
  { id: 5, name: "Nissan", logo: brand5 },
  { id: 6, name: "Toyota", logo: brand6 },
  { id: 7, name: "Volkswagen", logo: brand7 },
  { id: 8, name: "Mercedes", logo: brand8 },
  { id: 9, name: "Audi", logo: brand9 },
  { id: 10, name: "Hyundai", logo: brand10 },
  { id: 11, name: "Kia", logo: brand11 },
];

const RentByBrands = () => {
  return (
    <RentSection title="Rent by Brands" items={brands} viewAllLink="/brands" />
  );
};

export default RentByBrands;
