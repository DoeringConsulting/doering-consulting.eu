import { FC, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { getTranslation } from '../i18n/i18n';

const HeaderContainer = styled.header`
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 3rem;
  
  img {
    width: auto;
    height: 60px;
    filter: brightness(1.05);
    
    @media (max-width: 992px) {
      height: 50px;
    }
    
    @media (max-width: 768px) {
      height: 45px;
    }
  }
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const LogoText = styled.div`
  display: none;
`;

const Navigation = styled.nav`
  @media (max-width: 992px) {
    display: none;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    order: 3;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 0.5rem;
  
  &:last-child {
    margin-right: 0;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    background-color: ${props => props.theme.colors.gray};
  }
  
  &.active {
    box-shadow: 0 2px 0 ${props => props.theme.colors.gold};
    font-weight: 600;
  }
`;

const LanguageSwitcher = styled.button`
  display: none;
`;

const MobileMenuButton = styled.button`
  display: none;
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
`;

const MobileMenuHeader = styled.div`
  display: none;
`;

const MobileMenuCloseButton = styled.button`
  display: none;
`;

const MobileNavList = styled.ul`
  display: none;
`;

const MobileNavItem = styled.li`
  display: none;
`;

const MobileNavLink = styled(Link)`
  display: none;
`;

const MobileLanguageSwitcher = styled.button`
  display: none;
`;

const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  // We use getTranslation helper directly instead of useTranslation hook
  // const { i18n } = useTranslation();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const changeLanguage = () => {
    const currentLang = localStorage.getItem('i18nextLng') || 'en';
    const newLang = currentLang === 'en' ? 'de' : 'en';
    localStorage.setItem('i18nextLng', newLang);
    window.location.reload();
  };
  
  const currentLang = localStorage.getItem('i18nextLng') || 'en';
  const languageButtonText = currentLang === 'en' ? 'DE' : 'EN';
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <img src="./images/color_logo_no_background_2.svg" alt="DÖRING Consulting Logo" />
          <LogoText>DÖRING Consulting</LogoText>
        </Logo>
        
        <Navigation>
          <NavList>
            <NavItem>
              <NavLink to="/" className={isActive('/')}>{getTranslation('common.home')}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/ueber-mich" className={isActive('/ueber-mich')}>{getTranslation('common.about')}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/fachgebiete" className={isActive('/fachgebiete')}>{getTranslation('common.expertise')}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/erfolgsgeschichten" className={isActive('/erfolgsgeschichten')}>{getTranslation('common.success_stories')}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/blog" className={isActive('/blog')}>{getTranslation('common.blog')}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/partner" className={isActive('/partner')}>{getTranslation('common.partners')}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/downloads" className={isActive('/downloads')}>{getTranslation('common.downloads')}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/kontakt" className={isActive('/kontakt')}>{getTranslation('common.contact')}</NavLink>
            </NavItem>
          </NavList>
        </Navigation>
        
        <LanguageSwitcher onClick={changeLanguage}>
          {languageButtonText}
        </LanguageSwitcher>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </MobileMenuButton>
      </HeaderContent>
      
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileMenuHeader>
          <Logo>
            <img src="./images/color_logo_no_background_2.svg" alt="DÖRING Consulting Logo" />
            <LogoText>DÖRING Consulting</LogoText>
          </Logo>
          <MobileMenuCloseButton onClick={closeMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </MobileMenuCloseButton>
        </MobileMenuHeader>
        
        <MobileNavList>
          <MobileNavItem>
            <MobileNavLink to="/" onClick={closeMobileMenu}>
              {getTranslation('common.home')}
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink to="/ueber-mich" onClick={closeMobileMenu}>
              {getTranslation('common.about')}
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink to="/fachgebiete" onClick={closeMobileMenu}>
              {getTranslation('common.expertise')}
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink to="/erfolgsgeschichten" onClick={closeMobileMenu}>
              {getTranslation('common.success_stories')}
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink to="/blog" onClick={closeMobileMenu}>
              {getTranslation('common.blog')}
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink to="/partner" onClick={closeMobileMenu}>
              {getTranslation('common.partners')}
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink to="/downloads" onClick={closeMobileMenu}>
              {getTranslation('common.downloads')}
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem>
            <MobileNavLink to="/kontakt" onClick={closeMobileMenu}>
              {getTranslation('common.contact')}
            </MobileNavLink>
          </MobileNavItem>
        </MobileNavList>
        
        <MobileLanguageSwitcher onClick={changeLanguage}>
          {languageButtonText}
        </MobileLanguageSwitcher>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;
 
