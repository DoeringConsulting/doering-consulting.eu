import { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Styled components for FachgebieteOverview
const FachgebieteSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.white};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const FachgebieteContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FachgebieteHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const FachgebieteTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FachgebieteSubtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  color: ${props => props.theme.colors.text};
`;

const FachgebieteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FachgebieteCard = styled.div`
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

const FachgebieteCardImage = styled.div`
  height: 200px;
  background-color: ${props => props.theme.colors.lightGray};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${FachgebieteCard}:hover & img {
    transform: scale(1.05);
  }
`;

const FachgebieteCardContent = styled.div`
  padding: 1.5rem;
`;

const FachgebieteCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const FachgebieteCardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
`;

const FachgebieteCardLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.gold};
  }
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

const FachgebieteOverview: FC = () => {
  const { t } = useTranslation();
  
  // Updated fachgebiete data with local images
  const fachgebiete = [
    {
      id: 'einkauf',
      title: t('expertise.procurement.title'),
      description: t('expertise.procurement.description'),
      image: './images/procurement.jpg'
    },
    {
      id: 'supply-chain',
      title: t('expertise.supplyChain.title'),
      description: t('expertise.supplyChain.description'),
      image: './images/supply_chain.jpg'
    },
    {
      id: 'operations',
      title: t('expertise.operations.title'),
      description: t('expertise.operations.description'),
      image: './images/operations.jpg'
    },
    {
      id: 'sourcing',
      title: t('expertise.sourcing.title'),
      description: t('expertise.sourcing.description'),
      image: './images/consulting_meeting.jpg'
    },
    {
      id: 'interim',
      title: t('expertise.interim.title'),
      description: t('expertise.interim.description'),
      image: './images/interim_executive.jpg'
    },
    {
      id: 'digital',
      title: t('expertise.digital.title', 'Digitale Transformation'),
      description: t('expertise.digital.description', 'Begleitung bei der Digitalisierung von Einkaufs- und Supply-Chain-Prozessen, Implementierung von digitalen Tools und Entwicklung einer Digitalisierungsstrategie.'),
      image: './images/consulting_meeting.jpg'
    }
  ];

  return (
    <FachgebieteSection>
      <FachgebieteContainer>
        <FachgebieteHeader>
          <FachgebieteTitle>{t('expertise.title')}</FachgebieteTitle>
          <FachgebieteSubtitle>
            {t('expertise.intro')}
          </FachgebieteSubtitle>
        </FachgebieteHeader>
        
        <FachgebieteGrid>
          {fachgebiete.map(fachgebiet => (
            <FachgebieteCard key={fachgebiet.id}>
              <FachgebieteCardImage>
                <img src={fachgebiet.image} alt={fachgebiet.title} />
              </FachgebieteCardImage>
              <FachgebieteCardContent>
                <FachgebieteCardTitle>{fachgebiet.title}</FachgebieteCardTitle>
                <FachgebieteCardDescription>{fachgebiet.description}</FachgebieteCardDescription>
                <FachgebieteCardLink to={`/fachgebiete/${fachgebiet.id}`}>
                  {t('common.readMore')}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </FachgebieteCardLink>
              </FachgebieteCardContent>
            </FachgebieteCard>
          ))}
        </FachgebieteGrid>
      </FachgebieteContainer>
    </FachgebieteSection>
  );
};

export default FachgebieteOverview;
