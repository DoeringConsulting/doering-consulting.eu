
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

const FooterList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLink = styled(Link)`
  color: ${(props) => props.theme.colors.white};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.gold};
  }
`;

const FooterExternalLink = styled.a`
  color: ${(props) => props.theme.colors.white};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.gold};
  }
`;

const FooterContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;

  svg {
    margin-right: 0.75rem;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }
`;

const Footer: FC = () => {
  return (
    <IconContext.Provider value={{ size: '1em' }}>
      <FooterContainer>
        <FooterContent>
          <FooterColumn>
            <FooterTitle>Unternehmen</FooterTitle>
            <FooterList>
              <FooterListItem><FooterLink to="/about">Über uns</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/services">Leistungen</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/downloads">Downloads</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/kontakt">Kontakt</FooterLink></FooterListItem>
            </FooterList>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Rechtliches</FooterTitle>
            <FooterList>
              <FooterListItem><FooterLink to="/impressum">Impressum</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/datenschutz">Datenschutz</FooterLink></FooterListItem>
            </FooterList>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Adresse</FooterTitle>
            <FooterContactItem>
              <FaMapMarkerAlt />
              <FooterExternalLink
                href="https://www.google.com/maps/search/?api=1&query=D%C3%96RING+Consulting,+ul.+Gen.+Leopolda+Okulickiego+4,+41-208+Sosnowiec,+Poland"
                target="_blank"
                rel="noopener noreferrer"
              >
                DÖRING CONSULTING<br />
                ul. Gen. Leopolda Okulickiego 4<br />
                41-208 Sosnowiec, POLAND
              </FooterExternalLink>
            </FooterContactItem>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Kontakt</FooterTitle>
            <FooterContactItem>
              <FaPhoneAlt />
              <FooterExternalLink href="tel:+48123456789">+48 123 456 789</FooterExternalLink>
            </FooterContactItem>
            <FooterContactItem>
              <FaEnvelope />
              <FooterExternalLink href="mailto:kontakt@doering-consulting.eu">
                kontakt@doering-consulting.eu
              </FooterExternalLink>
            </FooterContactItem>
          </FooterColumn>
        </FooterContent>
      </FooterContainer>
    </IconContext.Provider>
  );
};

export default Footer;
