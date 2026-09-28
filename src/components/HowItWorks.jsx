
import styled from "styled-components";
import carImage from "../assets/images/howItWorks.png";
import { FiSearch, FiCalendar, FiSmile } from "react-icons/fi";

 // Data for the steps
const steps = [
  {
    id: 1,
    icon: <FiSearch size={24} />,
    title: "Browse and select",
    description:
      "Choose from our wide range of premium cars, select the pickup and return dates and locations that suit you best.",
  },
  {
    id: 2,
    icon: <FiCalendar size={24} />,
    title: "Book and confirm",
    description:
      "Book your desired car with just a few clicks and receive an instant confirmation via email or SMS.",
  },
  {
    id: 3,
    icon: <FiSmile size={24} />,
    title: "Enjoy your ride",
    description:
      "Pick up your car at the designated location and enjoy your premium driving experience with our top-quality service.",
  },
];

// Card Component
const WorkCard = ({ icon, title, description }) => (
  <Card>
    <IconContainer>{icon}</IconContainer>
    <TextContainer>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </TextContainer>
  </Card>
);

// Main HowItWorks Section
const HowItWorks = () => {
  return (
    <Section>
      <Container>
        <Title>How it works</Title>
        <Subtitle>
          Renting a luxury car has never been easier. Our streamlined process
          makes it simple for you to book and confirm your vehicle of choice
          online.
        </Subtitle>

        <ContentWrapper>
          <ImageWrapper>
            <CarImage src={carImage} alt="Luxury Car" />
          </ImageWrapper>

          <CardColumn>
            {steps.map((step) => (
              <WorkCard
                key={step.id}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </CardColumn>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default HowItWorks;

// ===== Styled Components =====
const Section = styled.section`
  background: #fff;
  padding: 80px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  color: #666;
  max-width: 650px;
  margin: 0 auto 60px auto;
  line-height: 1.6;
`;

const ContentWrapper = styled.div`
  background: #f9f9f9;
  border-radius: 20px;
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 40px;
    padding: 40px 20px;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 280px;
`;

const CarImage = styled.img`
  width: 100%;
  max-width: 480px;
  height: auto;
  object-fit: contain;
`;

const CardColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 320px;

  @media (max-width: 900px) {
    width: 100%;
    max-width: 600px;
  }
`;

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fff;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: left;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: #f3f3f3;
    transform: translateY(-2px);
  }
`;

const IconContainer = styled.div`
  background: #f0f0f0;
  border-radius: 12px;
  padding: 12px;
  color: #111;
  flex-shrink: 0;
`;

const TextContainer = styled.div`
  text-align: left;
`;

const CardTitle = styled.h4`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 6px;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
`;
