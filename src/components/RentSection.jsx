
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const RentSection = ({ title, items }) => {
  const navigate = useNavigate();

  

  return (
    <StyledRentSection>
      <div className="header">
        <h2>{title}</h2>
      </div>

      <div className="grid">
        {items.map((item) => (
          <div key={item.id} className="card">
            <div className="image-wrapper">
              <img src={item.logo} alt={item.name} />
            </div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </StyledRentSection>
  );
};

export default RentSection;

const StyledRentSection = styled.section`
  width: 100%;
  padding: 80px 40px;
  background: #fff;
  color: #000;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    h2 {
      font-size: 28px;
      font-weight: 700;
      color: #111;
    }

    
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 28px;
  }

  .card {
    background: #f7f7f7;
    border-radius: 16px;
    padding: 32px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    cursor: pointer;
    min-height: 150px;

    &:hover {
      background: #000;
      color: #fff;
      transform: translateY(-6px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

      img {
        filter: brightness(0) invert(1);
      }
    }

    .image-wrapper {
      width: 100%;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;

      img {
        max-width: 80%;
        max-height: 60px;
        object-fit: contain;
        transition: all 0.3s ease;
      }
    }

    p {
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    padding: 60px 20px;

    .header h2 {
      font-size: 22px;
    }
  }
`;
