
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { FiAlertCircle } from "react-icons/fi";
import bgCar from "../assets/images/car.png";

export default function Signup({ setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

const handleSignup = async (e) => {
  e.preventDefault();

  setMessage(""); //reset old errors before sending

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/signup.php`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.success) {
      const userObj = { username, role: "user" };
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
      navigate("/");
    }
  } catch {
    setMessage("Network error");
  }
};


  return (
    <Wrapper>
      <Overlay />
      <Card>
        <Title>Create Account</Title>
        <Subtitle>Join the luxury ride community</Subtitle>

        <Form onSubmit={handleSignup}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit">Sign Up</Button>
        </Form>

        {message && (
          <Error>
            <FiAlertCircle className="icon" />
            {message}
          </Error>
        )}

        <BottomText>
          Already have an account? <LoginLink to="/login">Login</LoginLink>
        </BottomText>
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
  padding: 40px 35px;
  background: rgba(20, 20, 20, 0.85);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  width: 400px;
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
  margin-bottom: 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Input = styled.input`
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: white;
  font-size: 14px;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    border-color: #ffffff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  background: #ffffff;
  color: black;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }
`;

const Error = styled.div`
  margin-top: 15px;
  padding: 10px 14px;
  background: rgba(255, 0, 0, 0.15);
  border-left: 3px solid #ff4d4d;
  color: #ff7979;
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

const BottomText = styled.p`
  margin-top: 18px;
  text-align: center;
  font-size: 14px;
  opacity: 0.8;
`;

const LoginLink = styled(Link)`
  color: #ffffff;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
