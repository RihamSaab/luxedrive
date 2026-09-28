import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FiAlertCircle, FiCheckCircle, FiUploadCloud } from "react-icons/fi";
import bgCar from "../assets/images/car.png";

export default function AddCarForm() {
  const [formData, setFormData] = useState({
    brand: "",
    type: "",
    model: "",
    year: "",
    price_per_day: "",
    passengers: "",
    transmission: "",
    fuel_type: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFile = (e) => setImage(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    axios
      .post("http://localhost:8000/addCar.php", data)
      .then((res) => {
        setStatus("success");
        setMessage(res.data.message || "Car added successfully");
        setTimeout(() => window.location.reload(), 1200);
      })
      .catch(() => {
        setStatus("error");
        setMessage("Failed to add car. Please try again.");
      });
  };

  return (
    <Wrapper>
      <Overlay />
      <Card>
        <Title>Add a New Vehicle</Title>
        <Subtitle>Expand your luxury fleet</Subtitle>

        <Form onSubmit={handleSubmit}>
          <FormRow>
            <Input
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
            <Input
              name="type"
              placeholder="Type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </FormRow>

          <FormRow>
            <Input
              name="model"
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </FormRow>

          <FormRow>
            <Input
              type="number"
              name="price_per_day"
              placeholder="Price per Day"
              value={formData.price_per_day}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="passengers"
              placeholder="Passengers"
              value={formData.passengers}
              onChange={handleChange}
              required
            />
          </FormRow>

          <FormRow>
            <Input
              name="transmission"
              placeholder="Transmission"
              value={formData.transmission}
              onChange={handleChange}
              required
            />
            <Input
              name="fuel_type"
              placeholder="Fuel Type"
              value={formData.fuel_type}
              onChange={handleChange}
              required
            />
          </FormRow>

          <FileLabel>
            <FiUploadCloud className="icon" />
            <span>{image ? image.name : "Upload car image"}</span>
            <input type="file" name="image" onChange={handleFile} accept="image/*" />
          </FileLabel>

          <SubmitButton type="submit">Add Car</SubmitButton>
        </Form>

        {message && (
          <Feedback $status={status}>
            {status === "success" ? (
              <FiCheckCircle className="icon" />
            ) : (
              <FiAlertCircle className="icon" />
            )}
            {message}
          </Feedback>
        )}
      </Card>
    </Wrapper>
  );
}

/* ===================== STYLED COMPONENTS ===================== */

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: url(${bgCar}) center/cover no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 20px;
    background-position: top;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
`;

const Card = styled.div`
  position: relative;
  padding: 45px 40px;
  background: rgba(20, 20, 20, 0.85);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  width: 720px;
  max-width: 95%;
  color: white;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    padding: 30px 25px;
  }
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #ffffff;
`;

const Subtitle = styled.p`
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 28px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: white;
  font-size: 14px;
  transition: border-color 0.3s;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    border-color: #ffffff;
    outline: none;
  }

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const FileLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px dashed rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  color: #ccc;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border-color: #ffffff;
    color: #ffffff;
  }

  .icon {
    font-size: 20px;
  }

  input {
    display: none;
  }
`;

const SubmitButton = styled.button`
  padding: 13px;
  background: #ffffff;
  color: black;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  margin-top: 6px;
  transition: 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }
`;

const Feedback = styled.div`
  margin-top: 18px;
  padding: 10px 14px;
  background: ${({ $status }) =>
    $status === "success" ? "rgba(76, 175, 80, 0.15)" : "rgba(255, 0, 0, 0.15)"};
  border-left: 3px solid
    ${({ $status }) => ($status === "success" ? "#4caf50" : "#ff4d4d")};
  color: ${({ $status }) => ($status === "success" ? "#a5e0a8" : "#ff7979")};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  animation: fadeIn 0.3s ease;

  .icon {
    font-size: 18px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
