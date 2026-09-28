
import { useState } from 'react';
import styled from 'styled-components';
import { FaApple, FaGooglePlay, FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa';
import logoImage from "../assets/images/image.png";
import ContactUsModal from "./ContactUsModal";

const LuxedriveFooter = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <FooterContainer>


      <BottomSection>
        <Logo>
          <img src={logoImage} alt="Luxe Drive Logo" />
        </Logo>
        <NavLinks>
          <NavLink href="#available-cars">Available Cars</NavLink>
          <NavLink href="#cars-for-rent">Cars for Rent</NavLink>
          <NavLink href="#how-it-works">How it works</NavLink>
          <NavLink href="#services">About Us</NavLink>
          <NavLink href="#feedbacks">Feedbacks</NavLink>
          <NavLink
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setContactOpen(true);
            }}
          >
            Contact us
          </NavLink>
        </NavLinks>
        <SocialIcons>
          <SocialLink href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></SocialLink>
          <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></SocialLink>
          <SocialLink href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></SocialLink>
          <SocialLink href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></SocialLink>
        </SocialIcons>
      </BottomSection>

      <ContactUsModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </FooterContainer>
  );
};

export default LuxedriveFooter;

/* ===========================
   Styled Components
=========================== */

const FooterContainer = styled.footer`
  background-color: #121212;
  color: #ffffff;
  padding: 40px 0 20px;
  font-family: Arial, sans-serif;
`;



const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 80px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 40px;
  }
`;

const Logo = styled.div`
  img {
    max-height: 50px;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 30px;

  @media (max-width: 900px) {
    margin: 20px 0;
    gap: 20px;
  }
`;

const NavLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s;

`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialLink = styled.a`
  color: #ffffff;
  font-size: 1.2rem;
  transition: color 0.3s;

  &:hover {
    color: #cccccc;
  }
`;
