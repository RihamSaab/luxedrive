import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import axios from "axios";
import { Flex } from "antd";
import styled from "styled-components";

export default function CardList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getCars.php")
      .then((res) => setCars(res.data))
      .catch(() => {});
  }, []);

  return (
    <StyledFlex>
      {cars?.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
      {cars.length === 0 && <p>No cars available.</p>}
    </StyledFlex>
  );
}
const StyledFlex = styled(Flex)`
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 40px;
  background-color: #f5f5f5;
  color: black;
`;
