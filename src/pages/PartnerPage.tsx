import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// Styled components for PartnerPage
const PartnerSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.white};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const PartnerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PartnerHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const PartnerTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PartnerSubtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  color: ${props => props.theme.colors.text};
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.white};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.text};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.lightGray};
  }
`;

const PartnerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PartnerCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
`;

const PartnerImageContainer = styled.div`
  height: 200px;
  background-color: ${props => props.theme.colors.lightGray};
  overflow: hidden;
`;

const PartnerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${PartnerCard}:hover & {
    transform: scale(1.05);
  }
`;

const PartnerContent = styled.div`
  padding: 1.5rem;
`;

const PartnerName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const PartnerPosition = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.gold};
  margin-bottom: 1rem;
`;

const PartnerDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
`;

const PartnerTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const PartnerTag = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: ${props => props.theme.colors.primary}10;
  color: ${props => props.theme.colors.primary};
  border-radius: 20px;
  font-size: 0.85rem;
`;

const PartnerContact = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PartnerContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}dd;
  }
`;

const PartnerSocialLinks = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const PartnerSocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.text};
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${props => props.theme.colors.lightGray}50;
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
`;

// Partner data type
interface Partner {
  id: string;
  name: string;
  position: string;
  description: string;
  image: string;
  expertise: string[];
  languages: string[];
  email: string;
  linkedin?: string;
  xing?: string;
}

const PartnerPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = React.useState('all');
  
  // Sample partner data
  const partners: Partner[] = [
    {
      id: 'partner1',
      name: 'Dr. Michael Schmidt',
      position: 'Supply Chain Experte',
      description: 'Spezialist für Supply Chain Optimierung mit über 20 Jahren Erfahrung in der Automobilindustrie und im Maschinenbau.',
      image: './images/supply_chain.jpg',
      expertise: ['supply-chain', 'operations'],
      languages: ['Deutsch', 'Englisch'],
      email: 'schmidt@doering-consulting.eu',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 'partner2',
      name: 'Julia Weber',
      position: 'Einkaufsberaterin',
      description: 'Expertin für strategischen Einkauf und Lieferantenmanagement mit Fokus auf Kostenoptimierung und nachhaltige Beschaffung.',
      image: './images/procurement.jpg',
      expertise: ['procurement', 'sourcing'],
      languages: ['Deutsch', 'Englisch', 'Französisch'],
      email: 'weber@doering-consulting.eu',
      xing: 'https://xing.com'
    },
    {
      id: 'partner3',
      name: 'Thomas Becker',
      position: 'Interim Manager',
      description: 'Erfahrener Interim Manager mit Schwerpunkt auf Restrukturierung und Transformation von Einkaufs- und Supply-Chain-Abteilungen.',
      image: './images/interim_executive.jpg',
      expertise: ['interim', 'procurement'],
      languages: ['Deutsch', 'Englisch'],
      email: 'becker@doering-consulting.eu',
      linkedin: 'https://linkedin.com',
      xing: 'https://xing.com'
    }
  ];
  
  // Filter partners based on active filter
  const filteredPartners = activeFilter === 'all' 
    ? partners 
    : partners.filter(partner => partner.expertise.includes(activeFilter));
  
  return (
    <PartnerSection>
      <PartnerContainer>
        <PartnerHeader>
          <PartnerTitle>{t('partners.title')}</PartnerTitle>
          <PartnerSubtitle>
            {t('partners.description')}
          </PartnerSubtitle>
        </PartnerHeader>
        
        <FilterSection>
          <FilterTitle>{t('partners.filter.title')}</FilterTitle>
          <FilterButtons>
            <FilterButton 
              active={activeFilter === 'all'} 
              onClick={() => setActiveFilter('all')}
            >
              {t('partners.filter.all')}
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'procurement'} 
              onClick={() => setActiveFilter('procurement')}
            >
              {t('partners.filter.procurement')}
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'supply-chain'} 
              onClick={() => setActiveFilter('supply-chain')}
            >
              {t('partners.filter.supplyChain')}
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'operations'} 
              onClick={() => setActiveFilter('operations')}
            >
              {t('partners.filter.operations')}
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'sourcing'} 
              onClick={() => setActiveFilter('sourcing')}
            >
              {t('partners.filter.sourcing')}
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'interim'} 
              onClick={() => setActiveFilter('interim')}
            >
              {t('partners.filter.interim')}
            </FilterButton>
          </FilterButtons>
        </FilterSection>
        
        {filteredPartners.length > 0 ? (
          <PartnerGrid>
            {filteredPartners.map(partner => (
              <PartnerCard key={partner.id}>
                <PartnerImageContainer>
                  <PartnerImage src={partner.image} alt={partner.name} />
                </PartnerImageContainer>
                <PartnerContent>
                  <PartnerName>{partner.name}</PartnerName>
                  <PartnerPosition>{partner.position}</PartnerPosition>
                  <PartnerDescription>{partner.description}</PartnerDescription>
                  
                  <PartnerTags>
                    {partner.expertise.map(exp => (
                      <PartnerTag key={exp}>
                        {t(`partners.filter.${exp}`, exp)}
                      </PartnerTag>
                    ))}
                  </PartnerTags>
                  
                  <PartnerContact>
                    <PartnerContactButton href={`mailto:${partner.email}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      {t('partners.contact')}
                    </PartnerContactButton>
                    
                    <PartnerSocialLinks>
                      {partner.linkedin && (
                        <PartnerSocialLink href={partner.linkedin} target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </PartnerSocialLink>
                      )}
                      
                      {partner.xing && (
                        <PartnerSocialLink href={partner.xing} target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-14.085 15.744c-.184 0-.332-.148-.332-.332 0-.13.073-.25.189-.309l1.813-1.062-2.842-5c-.064-.116-.064-.25 0-.368.063-.118.184-.192.318-.192h2.099c.184 0 .349.117.412.291l1.859 3.365 3.161-5.512c.063-.116.184-.189.318-.189h2.099c.134 0 .255.074.319.192.063.118.063.252 0 .368l-7.739 13.451c-.063.116-.184.189-.318.189h-2.099c-.135 0-.255-.074-.319-.192-.063-.116-.063-.25 0-.368l2.842-4.969-1.448.847c-.117.064-.248.064-.364 0-.118-.064-.192-.184-.192-.319v-1.891z"/>
                          </svg>
                        </PartnerSocialLink>
                      )}
                    </PartnerSocialLinks>
                  </PartnerContact>
                </PartnerContent>
              </PartnerCard>
            ))}
          </PartnerGrid>
        ) : (
          <NoResults>
            {t('partners.noResults')}
          </NoResults>
        )}
      </PartnerContainer>
    </PartnerSection>
  );
};

export default PartnerPage;
