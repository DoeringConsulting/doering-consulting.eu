import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { careerData, educationData, certificationData, skillsData } from '../data/careerData';

// Styled components for UeberMichPage
const AboutSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.white};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const AboutHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 4rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`;

const AboutImageContainer = styled.div`
  flex: 1;
  max-width: 400px;
  
  @media (max-width: 992px) {
    max-width: 300px;
    width: 100%;
  }
`;

const AboutImage = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const AboutHeaderContent = styled.div`
  flex: 2;
`;

const AboutTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AboutSubtitle = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${props => props.theme.colors.gold};
  margin-bottom: 1.5rem;
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
`;

const AboutSocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: 50%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.gold};
  }
`;

const ExperienceSection = styled.div`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 3px;
    background-color: ${props => props.theme.colors.gold};
  }
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Timeline = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 16px;
    height: 100%;
    width: 2px;
    background-color: ${props => props.theme.colors.gray};
    
    @media (min-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 45px;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    width: 50%;
    padding-left: 0;
    
    &:nth-child(even) {
      margin-left: 50%;
      padding-left: 45px;
      padding-right: 0;
    }
    
    &:nth-child(odd) {
      padding-right: 45px;
      text-align: right;
    }
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  top: 0;
  left: 12px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.gold};
  
  @media (min-width: 768px) {
    left: auto;
    right: -6px;
    
    ${TimelineItem}:nth-child(even) & {
      right: auto;
      left: -6px;
    }
  }
`;

const TimelineDate = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.gold};
  margin-bottom: 0.5rem;
`;

const TimelineTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TimelineCompany = styled.div`
  font-style: italic;
  margin-bottom: 1rem;
`;

const TimelineDescription = styled.p`
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
`;

const SkillsSection = styled.div`
  margin-bottom: 4rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const SkillCategory = styled.div``;

const SkillCategoryTitle = styled.h3`
  font-size: 1.25rem;
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

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  margin-bottom: 1rem;
`;

const SkillName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const SkillLabel = styled.span`
  font-weight: 500;
`;

const SkillLevel = styled.span`
  color: ${props => props.theme.colors.gold};
`;

const SkillBar = styled.div`
  height: 8px;
  background-color: ${props => props.theme.colors.lightGray};
  border-radius: 4px;
  overflow: hidden;
`;

const SkillProgress = styled.div<{ level: number }>`
  height: 100%;
  width: ${props => props.level}%;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 4px;
`;

const EducationSection = styled.div`
  margin-bottom: 4rem;
`;

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const EducationCard = styled.div`
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

const EducationDate = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.gold};
  margin-bottom: 0.5rem;
`;

const EducationTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const EducationInstitution = styled.div`
  font-style: italic;
  margin-bottom: 1rem;
`;

const EducationDescription = styled.p`
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
`;

const CtaSection = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
`;

const CtaTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
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
  
  @media (max-width: 480px) {
    display: block;
    width: 100%;
    text-align: center;
  }
`;

const UeberMichPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <AboutSection>
      <AboutContainer>
        {/* Header Section */}
        <AboutHeader>
          <AboutImageContainer>
            <AboutImage src="./images/DSC07810.jpeg" alt="Alexander Döring" />
          </AboutImageContainer>
          <AboutHeaderContent>
            <AboutTitle>{t('about.title')}</AboutTitle>
            <AboutSubtitle>{t('about.subtitle')}</AboutSubtitle>
            <AboutText>
              {t('about.intro.part1')}
            </AboutText>
            <AboutText>
              {t('about.intro.part2')}
            </AboutText>
            <AboutSocialLinks>
              <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://xing.com" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-14.085 15.744c-.184 0-.332-.148-.332-.332 0-.13.073-.25.189-.309l1.813-1.062-2.842-5c-.064-.116-.064-.25 0-.368.063-.118.184-.192.318-.192h2.099c.184 0 .349.117.412.291l1.859 3.365 3.161-5.512c.063-.116.184-.189.318-.189h2.099c.134 0 .255.074.319.192.063.118.063.252 0 .368l-7.739 13.451c-.063.116-.184.189-.318.189h-2.099c-.135 0-.255-.074-.319-.192-.063-.116-.063-.25 0-.368l2.842-4.969-1.448.847c-.117.064-.248.064-.364 0-.118-.064-.192-.184-.192-.319v-1.891z"/>
                </svg>
              </SocialLink>
            </AboutSocialLinks>
          </AboutHeaderContent>
        </AboutHeader>
        
        {/* Experience Section */}
        <ExperienceSection>
          <SectionTitle>{t('about.experience.title')}</SectionTitle>
          <Timeline>
            {careerData.map((experience, index) => (
              <TimelineItem key={index}>
                <TimelineDot />
                <TimelineDate>{experience.period}</TimelineDate>
                <TimelineTitle>{experience.title}</TimelineTitle>
                <TimelineCompany>{experience.company}</TimelineCompany>
                <TimelineDescription>
                  {experience.description}
                </TimelineDescription>
              </TimelineItem>
            ))}
          </Timeline>
        </ExperienceSection>
        
        {/* Skills Section */}
        <SkillsSection>
          <SectionTitle>{t('about.skills.title')}</SectionTitle>
          <SkillsGrid>
            {/* Strategic Skills */}
            <SkillCategory>
              <SkillCategoryTitle>{t('about.skills.strategic')}</SkillCategoryTitle>
              <SkillList>
                {skillsData.strategic.map((skill, index) => (
                  <SkillItem key={index}>
                    <SkillName>
                      <SkillLabel>{skill.name}</SkillLabel>
                      <SkillLevel>{skill.level}%</SkillLevel>
                    </SkillName>
                    <SkillBar>
                      <SkillProgress level={skill.level} />
                    </SkillBar>
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCategory>
            
            {/* Operational Skills */}
            <SkillCategory>
              <SkillCategoryTitle>{t('about.skills.operational')}</SkillCategoryTitle>
              <SkillList>
                {skillsData.operational.map((skill, index) => (
                  <SkillItem key={index}>
                    <SkillName>
                      <SkillLabel>{skill.name}</SkillLabel>
                      <SkillLevel>{skill.level}%</SkillLevel>
                    </SkillName>
                    <SkillBar>
                      <SkillProgress level={skill.level} />
                    </SkillBar>
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCategory>
            
            {/* Leadership Skills */}
            <SkillCategory>
              <SkillCategoryTitle>{t('about.skills.leadership')}</SkillCategoryTitle>
              <SkillList>
                {skillsData.leadership.map((skill, index) => (
                  <SkillItem key={index}>
                    <SkillName>
                      <SkillLabel>{skill.name}</SkillLabel>
                      <SkillLevel>{skill.level}%</SkillLevel>
                    </SkillName>
                    <SkillBar>
                      <SkillProgress level={skill.level} />
                    </SkillBar>
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCategory>
          </SkillsGrid>
        </SkillsSection>
        
        {/* Education Section */}
        <EducationSection>
          <SectionTitle>{t('about.education.title')}</SectionTitle>
          <EducationGrid>
            {/* Academic Education */}
            {educationData.map((education, index) => (
              <EducationCard key={index}>
                <EducationDate>{education.period}</EducationDate>
                <EducationTitle>{education.title}</EducationTitle>
                <EducationInstitution>{education.institution}</EducationInstitution>
                <EducationDescription>
                  {education.description}
                </EducationDescription>
              </EducationCard>
            ))}
            
            {/* Certifications */}
            {certificationData.map((certification, index) => (
              <EducationCard key={`cert-${index}`}>
                <EducationTitle>{certification.title}</EducationTitle>
                <EducationDescription>
                  {certification.description}
                </EducationDescription>
              </EducationCard>
            ))}
          </EducationGrid>
        </EducationSection>
        
        {/* CTA Section */}
        <CtaSection>
          <CtaTitle>{t('about.cta.title')}</CtaTitle>
          <CtaText>
            {t('about.cta.description')}
          </CtaText>
          <CtaButton to="/kontakt">
            {t('about.cta.button')}
          </CtaButton>
        </CtaSection>
      </AboutContainer>
    </AboutSection>
  );
};

export default UeberMichPage;
