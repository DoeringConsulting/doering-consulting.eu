
import { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  padding: 3rem 1rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div``;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.75rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: ${(props) => props.theme.colors.gold};
  }
`;

const Footer: FC = () => {
  return (
    <IconContext.Provider value={{ className: 'mr-2 inline text-white align-middle' }}>
      <FooterContainer>
        <FooterContent>
          <FooterColumn>
            <FooterTitle>Unternehmen</FooterTitle>
            <ul>
              <li><Link to="/about">Über uns</Link></li>
              <li><Link to="/services">Leistungen</Link></li>
              <li><Link to="/downloads">Downloads</Link></li>
              <li><Link to="/kontakt">Kontakt</Link></li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Rechtliches</FooterTitle>
            <ul>
              <li><Link to="/impressum">Impressum</Link></li>
              <li><Link to="/datenschutz">Datenschutz</Link></li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Adresse</FooterTitle>
            <p>
              <FaMapMarkerAlt />
              <a
                href="https://www.google.com/maps/search/?api=1&query=D%C3%96RING+Consulting,+ul.+Gen.+Leopolda+Okulickiego+4,+41-208+Sosnowiec,+Poland"
                target="_blank"
                rel="noopener noreferrer"
              >
                DÖRING CONSULTING<br />
                ul. Gen. Leopolda Okulickiego 4<br />
                41-208 Sosnowiec, POLAND
              </a>
            </p>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Kontakt</FooterTitle>
            <p>
              <FaPhoneAlt />
              <a href="tel:+48123456789">+48 123 456 789</a>
            </p>
            <p>
              <FaEnvelope />
              <a href="mailto:kontakt@doering-consulting.eu">kontakt@doering-consulting.eu</a>
            </p>
          </FooterColumn>
        </FooterContent>
      </FooterContainer>
    </IconContext.Provider>
  );
};

export default Footer;
