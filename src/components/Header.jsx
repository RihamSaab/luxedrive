import React, { useState } from "react";
import styled from "styled-components";
import { Flex, Dropdown, Modal } from "antd";
import logoImage from "../assets/images/image.png";
import { Link, useNavigate } from "react-router-dom";
import ContactUsModal from "./ContactUsModal";

export const Header = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const navigate = useNavigate();

  const openContact = (e) => {
    e?.preventDefault();
    setMenuOpen(false);
    setContactOpen(true);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);


const menuItems = [
  {
    key: "available-cars",
    label: <a href="#available-cars">Available Cars</a>,
  },
  {
    key: "cars-for-rent",
    label: <a href="#cars-for-rent">Cars for rent</a>,
  },
  {
    key: "how-it-works",
    label: <a href="#how-it-works">How it works</a>,
  },
  ...(user
    ? [
        {
          key: "your-bookings",
          label: <a href="#your-bookings">Your Bookings</a>,
        },
      ]
    : []),
  {
    key: "about",
    label: <a href="#services">About Us</a>,
  },
  {
    key: "feedbacks",
    label: <a href="#feedbacks">Feedbacks</a>,
  },
  {
    key: "contact",
    label: (
      <a href="#contact" onClick={openContact}>
        Contact Us
      </a>
    ),
  },
];

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setLogoutModalVisible(false);
    navigate("/");
  };

  return (
    <StyledHeader_Flex align="center" justify="space-between">
      <Dropdown
  menu={{ items: menuItems }}
  trigger={["click"]}
  open={menuOpen}
  onOpenChange={(open) => setMenuOpen(open)}
  overlayStyle={{ marginTop: 15 }}
>
  <Hamburger  className={menuOpen ? "open" : ""}>
    <span />
    <span />
  </Hamburger>
</Dropdown>


      <LogoContainer>
        <img className="logo-image" src={logoImage} alt="Leuxe Drive Logo" />
      </LogoContainer>

      {user ? (
        <button
          className="login-register-button"
          onClick={() => setLogoutModalVisible(true)}
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className="login-register-button">Login / Register</button>
        </Link>
      )}

      
      <Modal
        title="Confirm Logout"
        open={logoutModalVisible}
        onOk={handleLogout}
        onCancel={() => setLogoutModalVisible(false)}
        okText="Yes, Logout"
        cancelText="Cancel"
        centered
        closable={false}
        okButtonProps={{
          style: {
            backgroundColor: "#000",
            color: "#fff",
            border: "1px solid #fff",
            boxShadow: "0 0 10px rgba(255,255,255,0.3)",
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "#000",
            color: "#fff",
            border: "1px solid #fff",
            boxShadow: "0 0 10px rgba(255,255,255,0.3)",
          },
        }}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>

      <ContactUsModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </StyledHeader_Flex>
  );
};



const StyledHeader_Flex = styled(Flex)`
  padding: 20px 40px;
  margin: 0;
  background-color: black;

  .login-register-button {
    cursor: pointer;
    padding: 8px 20px;
    border-radius: 48px;
    border: 1px solid #ffffff;
    background: transparent;
    transition: all 0.3s ease;
    color: #ffffff;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  @media (max-width: 768px) {
    padding: 15px 20px;

    .login-register-button {
      padding: 6px 16px;
      font-size: 14px;
    }
  }
`;

const LogoContainer = styled.div`
  img {
    width: 120px;
    height: auto;
  }

  @media (max-width: 768px) {
    img {
      width: 100px;
    }
  }
`;

const Hamburger = styled.div`
  position: relative;
  width: 154px;
  height: 41px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  span {
    display: block;
    width: 41px;
    height: 4px;
    background: #ffffff;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  &.open {
    gap: 0;

    span:first-child {
      transform: rotate(45deg);
      position: absolute;
    }

    span:last-child {
      transform: rotate(-45deg);
      position: absolute;
    }
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;

    span {
      width: 35px;
      height: 3px;
    }
  }
`;
