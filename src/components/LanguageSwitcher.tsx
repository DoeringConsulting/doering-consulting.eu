import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LanguageSwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const LanguageButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.gold};
  }
`;

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'de' ? 'en' : 'de';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <LanguageSwitcherContainer>
      <LanguageButton onClick={toggleLanguage}>
        {t('common.languageSwitch')}
      </LanguageButton>
    </LanguageSwitcherContainer>
  );
};

export default LanguageSwitcher;
