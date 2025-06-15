import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// Styled components for DownloadsPage
const DownloadsSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.white};
`;

const DownloadsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DownloadsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const DownloadsTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const DownloadsDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  color: ${props => props.theme.colors.text};
`;

const DownloadsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const DownloadCard = styled.div`
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

const IconContainer = styled.div`
  margin-bottom: 1.5rem;
  svg {
    width: 48px;
    height: 48px;
    color: ${props => props.theme.colors.primary};
  }
`;

const DownloadTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const DownloadDescription = styled.p`
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary}dd;
  }
`;

const DownloadButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DownloadsPage: React.FC = () => {
  const { t } = useTranslation();

  // Absolute Pfade für alle Downloads verwenden mit type="application/pdf" hinzugefügt
  const cvFile = '/downloads/cv_alexander_doering_en.pdf';
  const executiveSummaryFile = '/downloads/executive_summary_alexander_doering.pdf';
  const projectOverviewFile = '/downloads/projects.pdf';

  return (
    <DownloadsSection>
      <DownloadsContainer>
        <DownloadsHeader>
          <DownloadsTitle>{t('downloads.title')}</DownloadsTitle>
          <DownloadsDescription>{t('downloads.description')}</DownloadsDescription>
        </DownloadsHeader>
        <DownloadsGrid>
          <DownloadCard>
            {/* Beschriebenes Dokument Symbol */}
            <IconContainer>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </IconContainer>
            <DownloadTitle>{t('downloads.cv.title')}</DownloadTitle>
            <DownloadDescription>{t('downloads.cv.description')}</DownloadDescription>
            <DownloadButton 
              href={cvFile} 
              target="_blank" 
              rel="noopener noreferrer" 
              download="cv_alexander_doering_en.pdf"
              type="application/pdf"
            >
              <DownloadButtonIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 13L12 16L15 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 16V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </DownloadButtonIcon>
              {t('downloads.cv.button')}
            </DownloadButton>
          </DownloadCard>

          <DownloadCard>
            {/* Leeres Dokument Symbol */}
            <IconContainer>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </IconContainer>
            <DownloadTitle>{t('downloads.executiveSummary.title')}</DownloadTitle>
            <DownloadDescription>{t('downloads.executiveSummary.description')}</DownloadDescription>
            <DownloadButton 
              href={executiveSummaryFile} 
              target="_blank" 
              rel="noopener noreferrer" 
              download="executive_summary_alexander_doering.pdf"
              type="application/pdf"
            >
              <DownloadButtonIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 13L12 16L15 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 16V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </DownloadButtonIcon>
              {t('downloads.executiveSummary.button')}
            </DownloadButton>
          </DownloadCard>

          <DownloadCard>
            {/* Koffer Symbol */}
            <IconContainer>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </IconContainer>
            <DownloadTitle>{t('downloads.projectOverview.title')}</DownloadTitle>
            <DownloadDescription>{t('downloads.projectOverview.description')}</DownloadDescription>
            <DownloadButton 
              href={projectOverviewFile} 
              target="_blank" 
              rel="noopener noreferrer" 
              download="projects.pdf"
              type="application/pdf"
            >
              <DownloadButtonIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 13L12 16L15 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 16V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </DownloadButtonIcon>
              {t('downloads.projectOverview.button')}
            </DownloadButton>
          </DownloadCard>
        </DownloadsGrid>
      </DownloadsContainer>
    </DownloadsSection>
  );
};

export default DownloadsPage;
