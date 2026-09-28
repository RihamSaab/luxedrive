import React, { useRef, useEffect, useState } from "react";
import { User } from "lucide-react";
import styled from "styled-components";
import { Flex } from "antd";

export default function TestimonialSection() {
  const containerRef = useRef(null);
  const [isPinned, setIsPinned] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const testimonials = [
    {
      text: "Excellent service and amazing cars. The staff made everything simple and the rental experience was seamless. Highly recommended for anyone wanting a premium feel!",
      name: "Lamar Lee",
      info: "London",
    },
    {
      text: "Fast, reliable, and professional. Renting a car with this company was a pleasure, and the vehicle was in top condition. Will definitely come back!",
      name: "Mohammed Ali",
      info: "Dubai",
    },
    {
      text: "Smooth booking, excellent cars, and friendly staff. Everything was top-notch and exceeded my expectations!",
      name: "Sara Ahmed",
      info: "Paris",
    },
  ];
// the scroll handler
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
// determine if pinned and progress
      if (rect.top <= 0 && rect.bottom >= viewportHeight) {
        setIsPinned(true);
//calculate scroll progress (between 0 and 1)
        const scrollDistance = -rect.top;
        const maxScroll = rect.height - viewportHeight;
        const progress = Math.min(Math.max(scrollDistance / maxScroll, 0), 1);

        setScrollProgress(progress);
      } else {
        setIsPinned(false);
        if (rect.top > 0) setScrollProgress(0);
        else setScrollProgress(1);
      }
    };
// attach and clean up scroll listener
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
// calculate translation based on progress
  const maxTranslate = -(testimonials.length - 1) * 100;
  const translateX = scrollProgress * maxTranslate;
  const end = scrollProgress >= 1;

  return (
    <Outer>
      <Container ref={containerRef}>
        <Pinned isPinned={isPinned} end={end}>
          <Title>What Our Customers Say</Title>

          <Wrapper translateX={translateX}>
            {testimonials.map((t, i) => (
              <Slide key={i}>
                <Text>“{t.text}“</Text>

                <UserInfo>
                  <Avatar>
                    <User size={36} />
                  </Avatar>

                  <Flex vertical>
                    <Name>{t.name}</Name>
                    <Info>{t.info}</Info>
                  </Flex>
                </UserInfo>
              </Slide>
            ))}
          </Wrapper>
        </Pinned>
      </Container>
    </Outer>
  );
}

const Outer = styled.div`
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  height: 300vh;
  position: relative;
`;

const Pinned = styled.div`
  position: ${({ isPinned }) => (isPinned ? "fixed" : "absolute")};
  top: ${({ isPinned, end }) => (end ? "auto" : isPinned ? "0" : "0")};
  bottom: ${({ end }) => (end ? "0" : "auto")};
  left: 0;
  right: 0;
  height: 100vh;
  overflow: hidden;
  background: #fff;
  color: #000;
`;

const Title = styled.h2`
  text-align: center;
  font-size: clamp(20px, 3vw, 36px);
  font-weight: 700;
  padding: 20px 0;
  margin: 0;
  border-bottom: 1px solid black;
`;

const Wrapper = styled.div`
  display: flex;
  height: calc(100% - 60px);
  transform: ${({ translateX }) => `translateX(${translateX}%)`};
  transition: transform 0.1s linear;
`;

const Slide = styled.div`
  min-width: 100vw;
  height: 100%;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  background: #fff;

  @media (max-width: 768px) {
    padding: 20px 30px;
  }
`;

const Text = styled.p`
  font-size: clamp(20px, 4vw, 36px);
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 10%;

  @media (max-width: 768px) {
    margin-top: 46%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: absolute;
  bottom: 25%;
  left: 80px;

  @media (max-width: 768px) {
    bottom: 15%;
    left: 20px;
  }
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const Info = styled.span`
  font-size: 14px;
  color: #777;
`;


