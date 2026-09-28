import carbg from "../assets/images/car.png";
import styled from "styled-components";

const IntroSection = () => {
  return (
    <StyledIntroSection_div>
      <img src={carbg} alt="Intro" />
      <h1>Discover the world on wheels with our car rental service</h1>
    </StyledIntroSection_div>
  );
};

export default IntroSection;

const StyledIntroSection_div = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* fills area on big screens */
    object-position: center; /* centered by default */
    transition: object-position 0.3s ease;
  }

  h1 {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    color: #ffffff;
    font-size: 60px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    line-height: 1.2;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
  }

  
  @media (max-width: 1024px) {
    img {
      object-position: 40% center; /* shift a bit to the left */
    }
    h1 {
      font-size: 48px;
    }
  }

  @media (max-width: 768px) {
    img {
      object-position: 30% center; /* show more of the left side */
    }
    h1 {
      font-size: 36px;
    }
  }

  @media (max-width: 480px) {
    img {
      object-position: 25% center; /* mostly left, but not full left */
    }
    h1 {
      font-size: 28px;
    }
  }
`;
