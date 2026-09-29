import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiSettings, FiShield } from "react-icons/fi";

export default function AdminBanner({ user }) {
  const navigate = useNavigate();

  if (!user || user.role !== "admin") return null;

  return (
    <Banner>
      <Left>
        <IconWrap>
          <FiShield />
        </IconWrap>
        <Text>
          <Title>Welcome back, {user.username}</Title>
          <Subtitle>
            You're signed in as an admin. Add or remove vehicles from your fleet.
          </Subtitle>
        </Text>
      </Left>

      <AddButton onClick={() => navigate("/addCars")}>
        <FiSettings className="icon" />
        Manage Fleet
      </AddButton>
    </Banner>
  );
}

/* ===================== STYLED COMPONENTS ===================== */

const Banner = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 22px 80px;
  background: linear-gradient(90deg, #0a0a0a 0%, #1a1a1a 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  color: #ffffff;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 40px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconWrap = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 20px;
  color: #ffffff;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: #ffffff;
`;

const Subtitle = styled.p`
  margin: 2px 0 0;
  font-size: 0.88rem;
  color: #cccccc;
  opacity: 0.9;
`;

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  background: #ffffff;
  color: #000000;
  font-size: 0.95rem;
  font-weight: 600;
  border: 1px solid #ffffff;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  .icon {
    font-size: 18px;
  }

  &:hover {
    background: transparent;
    color: #ffffff;
  }
`;
