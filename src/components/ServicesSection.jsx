import React from "react";
import styled from "styled-components";
import { FaStar, FaDollarSign, FaRegCalendarCheck } from "react-icons/fa";

const servicesData = [
  {
    icon: <FaStar />,
    title: "Quality Choice",
    description:
      "We offer a wide range of high-quality vehicles to choose from, including luxury cars, SUVs, vans, and more.",
  },
  {
    icon: <FaDollarSign />,
    title: "Affordable Prices",
    description:
      "Our rental rates are highly competitive and affordable, allowing our customers to enjoy their trips without breaking the bank.",
  },
  {
    icon: <FaRegCalendarCheck />,
    title: "Convenient Online Booking",
    description:
      "With our easy-to-use online booking system, customers can quickly and conveniently reserve their rental car from anywhere, anytime.",
  },
];

const ServicesSection = () => {
  return (
    <Section>
      <Title>Our Services & Benefits</Title>
      <Subtitle>
        To make renting easy and hassle-free, we provide a variety of services
        and advantages. We have you covered with a variety of vehicles and
        flexible rental terms.
      </Subtitle>
      <ServicesWrapper>
        {servicesData.map((service, index) => (
          <ServiceCard key={index}>
            <IconWrapper>{service.icon}</IconWrapper>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServicesWrapper>
    </Section>
  );
};

export default ServicesSection;

const Section = styled.section`
  background-color: #111;
  color: #fff;
  padding: 80px 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  max-width: 700px;
  margin: 0 auto 60px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 40px;
  }
`;

const ServicesWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
`;

const ServiceCard = styled.div`
  flex: 1 1 250px;
  max-width: 300px;
  background-color: #1a1a1a;
  padding: 30px 20px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const IconWrapper = styled.div`
  background-color: #222;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const ServiceDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
`;
