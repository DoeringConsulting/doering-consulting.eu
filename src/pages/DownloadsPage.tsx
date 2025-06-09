
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// Styled components for DownloadsPage
const DownloadsSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.white};

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const DownloadsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DownloadsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const DownloadsTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
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

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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

const DownloadIcon = styled.div`
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

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const DownloadButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DownloadsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const cvFile = currentLanguage === 'en'
    ? './downloads/cv_alexander_doering_en.pdf'
    : './downloads/cv_alexander_doering_de.pdf';
  const executiveSummaryFile = './downloads/executive_summary_alexander_doering.pdf';
  const projectOverviewFile = './downloads/projects_2025.pdf';

  return (
    <DownloadsSection>
      <DownloadsContainer>
        <DownloadsHeader>
          <DownloadsTitle>{t('downloads.title')}</DownloadsTitle>
          <DownloadsDescription>
            {t('downloads.description')}
          </DownloadsDescription>
        </DownloadsHeader>

        <DownloadsGrid>
          <DownloadCard>
            <DownloadIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </DownloadIcon>
            <DownloadTitle>{t('downloads.cv.title')}</DownloadTitle>
            <DownloadDescription>{t('downloads.cv.description')}</DownloadDescription>
            <DownloadButton href={cvFile} target="_blank" rel="noopener noreferrer">
              <DownloadButtonIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </DownloadButtonIcon>
              {t('downloads.cv.button')}
            </DownloadButton>
          </DownloadCard>

          <DownloadCard>
            <DownloadIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
            </DownloadIcon>
            <DownloadTitle>{t('downloads.executiveSummary.title')}</DownloadTitle>
            <DownloadDescription>{t('downloads.executiveSummary.description')}</DownloadDescription>
            <DownloadButton href={executiveSummaryFile} target="_blank" rel="noopener noreferrer">
              <DownloadButtonIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </DownloadButtonIcon>
              {t('downloads.executiveSummary.button')}
            </DownloadButton>
          </DownloadCard>

          <DownloadCard>
            <DownloadIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </DownloadIcon>
            <DownloadTitle>{t('downloads.projectOverview.title')}</DownloadTitle>
            <DownloadDescription>{t('downloads.projectOverview.description')}</DownloadDescription>
            <DownloadButton href={projectOverviewFile} target="_blank" rel="noopener noreferrer">
              <DownloadButtonIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
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
