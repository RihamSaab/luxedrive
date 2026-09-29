import React, { useState } from "react";
import axios from "axios";
import { FaUsers, FaTachometerAlt, FaGasPump, FaCogs } from "react-icons/fa";
import { FiCheckCircle, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Space, Flex, Modal, DatePicker } from "antd";

const Card = styled.div`
  background-color: #fff;
  color: black;
  border-radius: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  padding: 16px;
  display: flex;
  flex-direction: column;
  width: 384px;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 16px;
`;

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 12px;
`;

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 4px;

  span {
    font-size: 1rem;
    font-weight: 400;
  }
`;

const StatsRow = styled(Space)`
  margin-top: 12px;
  color: #555;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #f6f6f6;
  padding: 8px 12px;
  border-radius: 12px;
`;

const StatItem = styled(Flex)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
`;

const RentButton = styled.button`
  margin-top: 16px;
  width: 100%;
  border: 1px solid #000;
  border-radius: 16px;
  padding: 8px 0;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

/* ========= Booking Modal Styles ========= */

const BookingForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  label {
    font-size: 14px;
    margin-bottom: 4px;
    font-weight: 500;
  }

  input {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
    outline: none;
  }

  input:focus {
    border-color: #000;
  }
`;

const SubmitBookingButton = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 10px 0;
  border-radius: 10px;
  border: none;
  background-color: #000;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #222;
  }
`;
const ErrorText = styled.p`
  margin-top: 8px;
  color: #d32f2f;
  font-size: 13px;
`;

const SuccessContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px 4px 4px;
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f4f4;
  color: #000;
  font-size: 34px;
  margin-bottom: 16px;
`;

const SuccessTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
  color: #000;
`;

const SuccessText = styled.p`
  margin: 0 0 22px;
  color: #555;
  font-size: 14px;
  line-height: 1.55;
`;

const GotItButton = styled.button`
  width: 100%;
  padding: 12px 0;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 40px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: transparent;
    color: #000;
  }
`;

const PromptActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const SecondaryButton = styled.button`
  width: 100%;
  padding: 12px 0;
  background: transparent;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 40px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    color: #000;
    border-color: #000;
  }
`;

export default function CarCard({ car }) {
  const navigate = useNavigate();
  const transmissionMap = { 1: "Auto", 0: "Manual" };
  const fuelMap = { 1: "Electric", 0: "Gas" };

  // Booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Success modal state
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Login-required modal state
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  // Booking form fields
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRentNow = () => {
    let user = null;
    try {
      const saved = localStorage.getItem("user");
      user = saved ? JSON.parse(saved) : null;
    } catch {
      user = null;
    }

    if (!user?.username) {
      setIsLoginPromptOpen(true);
      return;
    }

    setIsBookingOpen(true);
    setErrorMsg("");
  };

  const resetForm = () => {
    setCustomerPhone("");
    setPickupDate(null);
    setDropoffDate(null);
    setErrorMsg("");
  };

  const handlePhoneChange = (e) => {
    // Keep digits only (also allows leading + for international numbers)
    const raw = e.target.value;
    const cleaned = raw.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
    setCustomerPhone(cleaned);
  };

  const [submitting, setSubmitting] = useState(false);

  const handleBookingSubmit = async () => {
    if (!customerPhone || !pickupDate || !dropoffDate) {
      setErrorMsg(
        "Please fill in your phone, pick-up and drop-off dates before submitting."
      );
      return;
    }

    if (customerPhone.replace(/\D/g, "").length < 6) {
      setErrorMsg("Please enter a valid phone number.");
      return;
    }

    if (dropoffDate <= pickupDate) {
      setErrorMsg("Drop-off must be after the pick-up date.");
      return;
    }

    let user = null;
    try {
      const saved = localStorage.getItem("user");
      user = saved ? JSON.parse(saved) : null;
    } catch {
      user = null;
    }

    if (!user?.username) {
      setErrorMsg("You must be logged in to book.");
      return;
    }

    const carInfo = `${car.brand} ${car.model} ${car.year}`;

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("pickup_location", carInfo);
    formData.append("pickup_date", pickupDate.format("YYYY-MM-DD"));
    formData.append("dropoff_location", carInfo);
    formData.append("dropoff_date", dropoffDate.format("YYYY-MM-DD"));
    formData.append("car_info", carInfo);
    formData.append("phone", customerPhone);

    try {
      setSubmitting(true);
      setErrorMsg("");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/addBooking.php`,
        formData
      );

      if (res.data.success) {
        setIsBookingOpen(false);
        resetForm();
        setIsSuccessOpen(true);
        window.dispatchEvent(new CustomEvent("luxedrive:booking-created"));
      } else {
        setErrorMsg(res.data.message || "Booking failed.");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CarImage src={`${import.meta.env.VITE_API_URL}/${car.image}`} alt={car.model} />

      <Title>
        {car.brand} {car.model} {car.year}
      </Title>
      <Price>
        ${Math.abs(car.price_per_day).toFixed(2)} <span>/day</span>
      </Price>

      <StatsRow>
        <StatItem>
          <FaTachometerAlt /> <span>{Math.abs(car.type)}</span>
        </StatItem>
        <StatItem>
          <FaCogs />{" "}
          <span>{transmissionMap[car.transmission] || car.transmission}</span>
        </StatItem>
        <StatItem>
          <FaUsers /> <span>{Math.abs(car.passengers)} Person</span>
        </StatItem>
        <StatItem>
          <FaGasPump /> <span>{fuelMap[car.fuel_type] || car.fuel_type}</span>
        </StatItem>
      </StatsRow>

      {/* Rent Now button */}
      <RentButton onClick={handleRentNow}>Rent Now</RentButton>

      {/* Booking Modal */}
      <Modal
        title={`Rent ${car.brand} ${car.model}`}
        open={isBookingOpen}
        onCancel={() => {
          setIsBookingOpen(false);
          resetForm();
        }}
        footer={null}
        centered
      >
        <BookingForm>
          <Field>
            <label>Phone Number</label>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9+]*"
              maxLength={15}
              placeholder="e.g. 0791234567"
              value={customerPhone}
              onChange={handlePhoneChange}
            />
          </Field>

          <Field>
            <label>Pick-up date</label>
            <DatePicker
              style={{ width: "100%" }}
              value={pickupDate}
              onChange={(value) => setPickupDate(value)}
            />
          </Field>

          <Field>
            <label>Drop-off date</label>
            <DatePicker
              style={{ width: "100%" }}
              value={dropoffDate}
              onChange={(value) => setDropoffDate(value)}
            />
          </Field>

          <SubmitBookingButton
            type="button"
            onClick={handleBookingSubmit}
            disabled={submitting}
          >
            {submitting ? "Booking..." : "Submit booking"}
          </SubmitBookingButton>
          {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
        </BookingForm>
      </Modal>

      {/* Success popup modal */}
      <Modal
        open={isSuccessOpen}
        onCancel={() => setIsSuccessOpen(false)}
        footer={null}
        centered
        closable={false}
        width={420}
      >
        <SuccessContent>
          <SuccessIcon>
            <FiCheckCircle />
          </SuccessIcon>
          <SuccessTitle>Car booked!</SuccessTitle>
          <SuccessText>
            Your booking request for {car.brand} {car.model} has been submitted.
            Our team will contact you as soon as possible.
          </SuccessText>
          <GotItButton onClick={() => setIsSuccessOpen(false)}>
            Got it
          </GotItButton>
        </SuccessContent>
      </Modal>

      {/* Login-required modal */}
      <Modal
        open={isLoginPromptOpen}
        onCancel={() => setIsLoginPromptOpen(false)}
        footer={null}
        centered
        closable={false}
        width={420}
      >
        <SuccessContent>
          <SuccessIcon>
            <FiLock />
          </SuccessIcon>
          <SuccessTitle>Sign in required</SuccessTitle>
          <SuccessText>
            Please log in to rent {car.brand} {car.model}.
          </SuccessText>
          <PromptActions>
            <GotItButton
              onClick={() => {
                setIsLoginPromptOpen(false);
                navigate("/login");
              }}
            >
              Log in
            </GotItButton>
            <SecondaryButton onClick={() => setIsLoginPromptOpen(false)}>
              Not now
            </SecondaryButton>
          </PromptActions>
        </SuccessContent>
      </Modal>
    </Card>
  );
}
