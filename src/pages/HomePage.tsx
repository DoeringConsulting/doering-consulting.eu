import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getTranslation } from '../i18n/i18n';

// Styled components for HomePage
const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  overflow: hidden;
  background-image: url('./images/consulting_meeting.jpg');
  background-size: cover;
  background-position: center;
  
  @media (max-width: 768px) {
    min-height: 500px;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const HeroButton = styled(Link)`
  display: inline-block;
  background-color: ${props => props.theme.colors.gold};
  color: ${props => props.theme.colors.white};
  padding: 0.75rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.gold}dd;
  }
`;

const ServicesSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.white};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  color: ${props => props.theme.colors.text};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const ServiceCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${props => props.theme.colors.primary}10;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
`;

const AboutSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.lightGray};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const AboutImage = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  
  @media (max-width: 992px) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const AboutContent = styled.div``;

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
`;

const AboutButton = styled(Link)`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 0.75rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}dd;
  }
`;

const CtaSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const CtaTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CtaText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto 2rem;
`;

const CtaButton = styled(Link)`
  display: inline-block;
  background-color: ${props => props.theme.colors.gold};
  color: ${props => props.theme.colors.white};
  padding: 0.75rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.gold}dd;
  }
`;

const SuccessStoriesSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.paleGold}30;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SuccessStoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SuccessStoryCard = styled.div`
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

const SuccessStoryImage = styled.div`
  height: 200px;
  background-color: ${props => props.theme.colors.lightGray};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${SuccessStoryCard}:hover & img {
    transform: scale(1.05);
  }
`;

const SuccessStoryContent = styled.div`
  padding: 1.5rem;
`;

const SuccessStoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const SuccessStoryDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
`;

const SuccessStoryLink = styled(Link)`
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

const HomePage: React.FC = () => {
  // We use getTranslation helper directly instead of useTranslation hook
  // const { i18n } = useTranslation();

  // Sample success stories data
  const successStories = [
    {
      id: 'story1',
      title: getTranslation('successStories.story1.title'),
      description: getTranslation('successStories.story1.description'),
      image: './images/success_stories.jpg'
    },
    {
      id: 'story2',
      title: getTranslation('successStories.story2.title'),
      description: getTranslation('successStories.story2.description'),
      image: './images/supply_chain.jpg'
    },
    {
      id: 'story3',
      title: getTranslation('successStories.story3.title'),
      description: getTranslation('successStories.story3.description'),
      image: './images/operations.jpg'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle style={{
            fontFamily: "'Times New Roman', serif",
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>DÖRING CONSULTING</HeroTitle>
          <HeroSubtitle>
            {getTranslation('home.hero.subtitle')}
          </HeroSubtitle>
          <HeroButton to="/kontakt">
            {getTranslation('home.hero.cta')}
          </HeroButton>
        </HeroContent>
      </HeroSection>
      
      {/* Services Section */}
      <ServicesSection>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>{getTranslation('home.expertise.title')}</SectionTitle>
            <SectionSubtitle>
              {getTranslation('home.expertise.description')}
            </SectionSubtitle>
          </SectionHeader>
          
          <ServicesGrid>
            {/* Service 1 */}
            <ServiceCard>
              <ServiceIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </ServiceIcon>
              <ServiceTitle>{getTranslation('home.expertise.procurement.title')}</ServiceTitle>
              <ServiceDescription>
                {getTranslation('home.expertise.procurement.description')}
              </ServiceDescription>
            </ServiceCard>
            
            {/* Service 2 */}
            <ServiceCard>
              <ServiceIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </ServiceIcon>
              <ServiceTitle>{getTranslation('home.expertise.supplyChain.title')}</ServiceTitle>
              <ServiceDescription>
                {getTranslation('home.expertise.supplyChain.description')}
              </ServiceDescription>
            </ServiceCard>
            
            {/* Service 3 */}
            <ServiceCard>
              <ServiceIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </ServiceIcon>
              <ServiceTitle>{getTranslation('home.expertise.operations.title')}</ServiceTitle>
              <ServiceDescription>
                {getTranslation('home.expertise.operations.description')}
              </ServiceDescription>
            </ServiceCard>
            
            {/* Service 4 */}
            <ServiceCard>
              <ServiceIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </ServiceIcon>
              <ServiceTitle>{getTranslation('home.expertise.sourcing.title')}</ServiceTitle>
              <ServiceDescription>
                {getTranslation('home.expertise.sourcing.description')}
              </ServiceDescription>
            </ServiceCard>
            {/* Service 5 - Interim Executive */}
            <ServiceCard>
              <ServiceIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </ServiceIcon>
              <ServiceTitle>Interim Executive</ServiceTitle>
              <ServiceDescription>
                Temporäre Übernahme von Führungspositionen im Bereich Einkauf, Supply Chain und Operations für Transformationsphasen, Vakanzen oder Restrukturierungen.
              </ServiceDescription>
            </ServiceCard>
            
      {/* Service 6 - Digitale Transformation */}
            <ServiceCard>
              <ServiceIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </ServiceIcon>
              <ServiceTitle>Digitale Transformation</ServiceTitle>
              <ServiceDescription>
                Begleitung bei der Digitalisierung von Einkaufs- und Supply-Chain-Prozessen, Implementierung von digitalen Tools und Entwicklung einer Digitalisierungsstrategie.
              </ServiceDescription>
            </ServiceCard>
          </ServicesGrid>
        </SectionContainer>
      </ServicesSection>
      
      {/* About Section */}
      <AboutSection>
        <AboutContainer>
          <AboutImage src="./images/DSC07810.jpeg" alt="Alexander Döring" />
          <AboutContent>
            <AboutTitle>{getTranslation('common.about')}</AboutTitle>
            <AboutText>
              {getTranslation('home.intro.description')}
            </AboutText>
            <AboutButton to="/ueber-mich">
              {getTranslation('common.readMore')}
            </AboutButton>
          </AboutContent>
        </AboutContainer>
      </AboutSection>
      
      {/* Success Stories Section */}
      <SuccessStoriesSection>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>{getTranslation('home.successStories.title')}</SectionTitle>
            <SectionSubtitle>
              {getTranslation('home.successStories.description')}
            </SectionSubtitle>
          </SectionHeader>
          
          <SuccessStoriesGrid>
            {successStories.map(story => (
              <SuccessStoryCard key={story.id}>
                <SuccessStoryImage>
                  <img src={story.image} alt={story.title} />
                </SuccessStoryImage>
                <SuccessStoryContent>
                  <SuccessStoryTitle>{story.title}</SuccessStoryTitle>
                  <SuccessStoryDescription>
                    {story.description}
                  </SuccessStoryDescription>
                  <SuccessStoryLink to="/erfolgsgeschichten">
                    {getTranslation('common.readMore')}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </SuccessStoryLink>
                </SuccessStoryContent>
              </SuccessStoryCard>
            ))}
          </SuccessStoriesGrid>
        </SectionContainer>
      </SuccessStoriesSection>
      
      {/* CTA Section */}
      <CtaSection>
        <SectionContainer>
          <CtaTitle>{getTranslation('home.cta.title')}</CtaTitle>
          <CtaText>
            {getTranslation('home.cta.description')}
          </CtaText>
          <CtaButton to="/kontakt">
            {getTranslation('home.cta.button')}
          </CtaButton>
        </SectionContainer>
      </CtaSection>
    </>
  );
};

export default HomePage;
