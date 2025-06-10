
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
  const projectOverviewFile = './downloads/projects.pdf';

  return (
    <DownloadsSection>
      <DownloadsContainer>
        <DownloadsHeader>
          <DownloadsTitle>{t('downloads.title')}</DownloadsTitle>
          <DownloadsDescription>{t('downloads.description')}</DownloadsDescription>
        </DownloadsHeader>
        <DownloadsGrid>
          <DownloadCard>
            <DownloadIcon>📄</DownloadIcon>
            <DownloadTitle>{t('downloads.cv.title')}</DownloadTitle>
            <DownloadDescription>{t('downloads.cv.description')}</DownloadDescription>
            <DownloadButton href={cvFile} target="_blank" rel="noopener noreferrer">
              <DownloadButtonIcon>⬇</DownloadButtonIcon>
              {t('downloads.cv.button')}
            </DownloadButton>
          </DownloadCard>

          <DownloadCard>
            <DownloadIcon>📄</DownloadIcon>
            <DownloadTitle>{t('downloads.executiveSummary.title')}</DownloadTitle>
            <DownloadDescription>{t('downloads.executiveSummary.description')}</DownloadDescription>
            <DownloadButton href={executiveSummaryFile} target="_blank" rel="noopener noreferrer">
              <DownloadButtonIcon>⬇</DownloadButtonIcon>
              {t('downloads.executiveSummary.button')}
            </DownloadButton>
          </DownloadCard>

          <DownloadCard>
            <DownloadIcon>📄</DownloadIcon>
            <DownloadTitle>{t('downloads.projectOverview.title')}</DownloadTitle>
            <DownloadDescription>{t('downloads.projectOverview.description')}</DownloadDescription>
            <DownloadButton href={projectOverviewFile} target="_blank" rel="noopener noreferrer">
              <DownloadButtonIcon>⬇</DownloadButtonIcon>
              {t('downloads.projectOverview.button')}
            </DownloadButton>
          </DownloadCard>
        </DownloadsGrid>
      </DownloadsContainer>
    </DownloadsSection>
  );
};

export default DownloadsPage;
