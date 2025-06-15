import { FC } from 'react';
import styled from 'styled-components';

// Styled components for Footer
const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
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
    background-color: ${props => props.theme.colors.gold};
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

const FooterLink = styled.a`
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.gold};
  }
`;

const FooterText = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const FooterContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const FooterContactIcon = styled.div`
  margin-right: 0.75rem;
  
  svg {
    width: 18px;
    height: 18px;
    color: ${props => props.theme.colors.gold};
  }
`;

const FooterContactText = styled.p`
  margin: 0;
`;

const FooterSocial = styled.div`
  display: flex;
  margin-top: 1.5rem;
`;

const FooterSocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: ${props => props.theme.colors.gold};
  color: ${props => props.theme.colors.secondary};
  border-radius: 50%;
  margin-right: 0.75rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.white};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 3rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterCopyright = styled.p`
  margin: 0;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const FooterBottomLinks = styled.div`
  display: flex;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterBottomLink = styled.a`
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  margin-left: 1.5rem;
  transition: color 0.3s ease;
  
  @media (max-width: 576px) {
    margin: 0 0 0.5rem;
  }
  
  &:hover {
    color: ${props => props.theme.colors.gold};
  }
`;

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>Über uns</FooterTitle>
          <FooterText>
            DÖRING Consulting bietet maßgeschneiderte Beratungslösungen in den Bereichen Einkauf, Supply Chain Management und Operations für Unternehmen jeder Größe.
          </FooterText>
          <FooterSocial>
            <FooterSocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </FooterSocialLink>
            <FooterSocialLink href="https://xing.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.188 0c-.517 0-.741.325-.927.66-.5.846-6.254 11.068-6.501 11.49.023.036 4.141 7.59 4.359 7.98.217.394.442.685.976.685h3.501c.206 0 .366-.094.442-.252.075-.158.07-.355-.013-.518l-4.35-7.89c-.004-.007-.004-.018 0-.025l6.494-11.424c.086-.16.088-.355.014-.516C22.106.097 21.946 0 21.74 0h-3.552zM8.5 4.5c-.211 0-.38.088-.49.224-.11.137-.125.299-.09.455l1.751 5.272c.006.016.006.033 0 .048l-2.995 5.388c-.084.16-.088.355-.014.516.075.158.235.252.441.252h3.552c.518 0 .742-.325.927-.66.183-.336 2.961-5.334 2.995-5.388.033-.061.038-.149.01-.212L10.59 4.75c-.18-.335-.414-.25-.927-.25H8.5z" />
              </svg>
            </FooterSocialLink>
          </FooterSocial>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Fachgebiete</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="/#/fachgebiete">Einkauf und Beschaffung</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/#/fachgebiete">Supply Chain Management</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/#/fachgebiete">Operations</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/#/fachgebiete">Sourcing</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/#/fachgebiete">Interim Executive</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Nützliche Links</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="/#/ueber-mich">Über mich</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/#/erfolgsgeschichten">Erfolgsgeschichten</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/#/blog">Blog</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/#/downloads">Downloads</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/#/kontakt">Kontakt</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Kontakt</FooterTitle>
          <FooterContactItem>
            <FooterContactIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </FooterContactIcon>
            <FooterContactText>+49 151 27266372</FooterContactText>
          </FooterContactItem>
          <FooterContactItem>
            <FooterContactIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </FooterContactIcon>
            <FooterContactText>office@doering-consulting.eu</FooterContactText>
          </FooterContactItem>
          <FooterContactItem>
            <FooterContactIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </FooterContactIcon>
            <FooterContactText>
              DÖRING CONSULTING<br />
              <a href="https://maps.google.com/?q=50.2592628,19.1867242" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                ul. Gen. Leopolda Okulickiego 4<br />
                41-208 Sosnowiec<br />
                POLAND
              </a>
            </FooterContactText>
          </FooterContactItem>
        </FooterColumn>
      </FooterContent>
      
      <FooterBottom>
        <FooterCopyright>
          &copy; {currentYear} DÖRING Consulting. Alle Rechte vorbehalten.
        </FooterCopyright>
        <FooterBottomLinks>
          <FooterBottomLink href="/#/impressum">Impressum</FooterBottomLink>
          <FooterBottomLink href="/#/datenschutz">Datenschutz</FooterBottomLink>
        </FooterBottomLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
