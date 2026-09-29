import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Input, DatePicker } from "antd";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  LockFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const luxeModalStyles = {
  mask: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
  content: {
    background: "rgba(20, 20, 20, 0.95)",
    backdropFilter: "blur(6px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: 15,
    color: "#ffffff",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
    padding: "26px 28px",
  },
  header: { background: "transparent", borderBottom: "none", padding: 0 },
  body: { color: "#cccccc", fontSize: 14, padding: "14px 0 4px" },
  footer: { borderTop: "none", padding: "16px 0 0" },
};

const luxeOkButton = {
  style: {
    background: "#ffffff",
    color: "#000000",
    border: "1px solid #ffffff",
    fontWeight: 600,
    borderRadius: 10,
    height: 40,
    padding: "0 20px",
  },
};

const luxeCancelButton = {
  style: {
    background: "transparent",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    fontWeight: 500,
    borderRadius: 10,
    height: 40,
    padding: "0 18px",
  },
};

const readUser = () => {
  try {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const BookingSection = () => {
  const navigate = useNavigate();

  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [dropoffDate, setDropoffDate] = useState(null);

  const [errors, setErrors] = useState({});
  const [popupVisible, setPopupVisible] = useState(false);
  const [loginPromptVisible, setLoginPromptVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(readUser);

  // Keep the login state in sync across tabs / after login/logout
  useEffect(() => {
    const sync = () => setUser(readUser());
    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
    };
  }, []);

  const isLoggedIn = !!user?.username;

  const isFormValid =
    pickupLocation.trim() !== "" &&
    dropoffLocation.trim() !== "" &&
    !!pickupDate &&
    !!dropoffDate &&
    pickupDate >= dayjs().startOf("day") &&
    dropoffDate > pickupDate.startOf("day");

  const clearError = (field) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  const disablePastDates = (current) =>
    current && current < dayjs().startOf("day");

  const disableBeforePickup = (current) => {
    if (!current) return false;
    if (current < dayjs().startOf("day")) return true;
    if (pickupDate && current <= pickupDate.startOf("day")) return true;
    return false;
  };

  const validate = () => {
    const next = {};
    if (!pickupLocation.trim()) next.pickupLocation = "Pick-up location is required.";
    if (!pickupDate) next.pickupDate = "Pick-up date is required.";
    else if (pickupDate < dayjs().startOf("day"))
      next.pickupDate = "Pick-up date can't be in the past.";

    if (!dropoffLocation.trim()) next.dropoffLocation = "Drop-off location is required.";
    if (!dropoffDate) next.dropoffDate = "Drop-off date is required.";
    else if (pickupDate && dropoffDate <= pickupDate.startOf("day"))
      next.dropoffDate = "Drop-off must be after the pick-up date.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleFindVehicle = async () => {
    setErrorMsg("");

    if (!isLoggedIn) {
      setLoginPromptVisible(true);
      return;
    }

    if (!validate()) return;

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("pickup_location", pickupLocation);
    formData.append("pickup_date", pickupDate.format("YYYY-MM-DD"));
    formData.append("dropoff_location", dropoffLocation);
    formData.append("dropoff_date", dropoffDate.format("YYYY-MM-DD"));

    try {
      setSubmitting(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/addBooking.php`,
        formData
      );

      if (res.data.success) {
        setPopupVisible(true);
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
    <StyledBookingSection>
      <div className="booking-card">
        <div className="field">
          <label>Pick-up Location</label>
          <Input
            size="large"
            prefix={<EnvironmentOutlined />}
            placeholder="Search a location"
            value={pickupLocation}
            status={errors.pickupLocation ? "error" : ""}
            onChange={(e) => {
              setPickupLocation(e.target.value);
              clearError("pickupLocation");
            }}
          />
          {errors.pickupLocation && (
            <span className="field-error">{errors.pickupLocation}</span>
          )}
        </div>

        <div className="field">
          <label>Pick-up date</label>
          <DatePicker
            size="large"
            suffixIcon={<CalendarOutlined />}
            style={{ width: "100%" }}
            placeholder="Select date"
            value={pickupDate}
            status={errors.pickupDate ? "error" : ""}
            disabledDate={disablePastDates}
            onChange={(value) => {
              setPickupDate(value);
              clearError("pickupDate");
              // if dropoff is now invalid, clear it
              if (dropoffDate && value && dropoffDate <= value.startOf("day")) {
                setDropoffDate(null);
              }
            }}
          />
          {errors.pickupDate && (
            <span className="field-error">{errors.pickupDate}</span>
          )}
        </div>

        <div className="field">
          <label>Drop-off Location</label>
          <Input
            size="large"
            prefix={<EnvironmentOutlined />}
            placeholder="Search a location"
            value={dropoffLocation}
            status={errors.dropoffLocation ? "error" : ""}
            onChange={(e) => {
              setDropoffLocation(e.target.value);
              clearError("dropoffLocation");
            }}
          />
          {errors.dropoffLocation && (
            <span className="field-error">{errors.dropoffLocation}</span>
          )}
        </div>

        <div className="field">
          <label>Drop-off date</label>
          <DatePicker
            size="large"
            suffixIcon={<CalendarOutlined />}
            style={{ width: "100%" }}
            placeholder="Select date"
            value={dropoffDate}
            status={errors.dropoffDate ? "error" : ""}
            disabledDate={disableBeforePickup}
            onChange={(value) => {
              setDropoffDate(value);
              clearError("dropoffDate");
            }}
          />
          {errors.dropoffDate && (
            <span className="field-error">{errors.dropoffDate}</span>
          )}
        </div>

        <button
          className="find-btn"
          onClick={handleFindVehicle}
          disabled={submitting || (isLoggedIn && !isFormValid)}
        >
          {submitting
            ? "Booking..."
            : isLoggedIn
            ? "Find a Vehicle"
            : "Sign in to book"}{" "}
          <ArrowRightOutlined />
        </button>

        {errorMsg && <div className="error-msg">{errorMsg}</div>}
      </div>

      <Modal
        title={
          <ModalTitle>
            <CheckCircleFilled style={{ color: "#4caf50" }} />
            Booking confirmed
          </ModalTitle>
        }
        open={popupVisible}
        onOk={() => {
          setPopupVisible(false);
          const carsSection = document.getElementById("cars-for-rent");
          if (carsSection) {
            carsSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
        onCancel={() => setPopupVisible(false)}
        okText="Browse Cars"
        cancelText="Close"
        centered
        closeIcon={<CloseIcon>×</CloseIcon>}
        styles={luxeModalStyles}
        okButtonProps={luxeOkButton}
        cancelButtonProps={luxeCancelButton}
      >
        <ModalText>
          Your booking has been saved. You can view it anytime in{" "}
          <em>My Bookings</em>.
        </ModalText>
      </Modal>

      <Modal
        title={
          <ModalTitle>
            <LockFilled style={{ color: "#ffffff" }} />
            Sign in required
          </ModalTitle>
        }
        open={loginPromptVisible}
        onOk={() => {
          setLoginPromptVisible(false);
          navigate("/login");
        }}
        onCancel={() => setLoginPromptVisible(false)}
        okText="Log in"
        cancelText="Cancel"
        centered
        closeIcon={<CloseIcon>×</CloseIcon>}
        styles={luxeModalStyles}
        okButtonProps={luxeOkButton}
        cancelButtonProps={luxeCancelButton}
      >
        <ModalText>Please log in to book a vehicle.</ModalText>
      </Modal>
    </StyledBookingSection>
  );
};

export default BookingSection;

/* ========================= STYLES ========================== */
const StyledBookingSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  .booking-card {
    position: absolute;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
    background: #f7f7f7;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1200px;
    padding: 24px 32px;
    gap: 20px;
  }

  .field {
    display: flex;
    flex-direction: column;
    flex: 1 1 200px;
    min-width: 200px;
  }

  label {
    font-weight: 500;
    margin-bottom: 6px;
    color: #222;
  }

  .find-btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    background: black;
    border: none;
    font-weight: 600;
    height: 48px;
    justify-content: center;
    padding: 0 32px;
    color: #fff;
    border-radius: 40px;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .error-msg {
    flex-basis: 100%;
    color: #d32f2f;
    font-size: 14px;
    margin-top: 4px;
  }

  .field-error {
    color: #d32f2f;
    font-size: 12px;
    margin-top: 4px;
  }
`;

const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.2px;

  svg {
    font-size: 22px;
  }
`;

const ModalText = styled.p`
  margin: 6px 0 0;
  color: #cccccc;
  font-size: 14px;
  line-height: 1.55;

  em {
    color: #ffffff;
    font-style: normal;
    font-weight: 600;
  }
`;

const CloseIcon = styled.span`
  color: #cccccc;
  font-size: 22px;
  line-height: 1;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;
