
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const DownloadsWrapper = styled.section`
  padding: 4rem 2rem;
  background: #f9f9f9;
`;

const DownloadsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DownloadsTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const DownloadsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const DownloadCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DownloadTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const DownloadText = styled.p`
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
`;

const DownloadLink = styled.a`
  padding: 0.75rem 1.5rem;
  background: #0070f3;
  color: white;
  text-align: center;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
  &:hover {
    background: #005bb5;
  }
`;

const DownloadsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const cvFile = currentLanguage === 'en'
    ? './downloads/cv_alexander_doering_en.pdf'
    : './downloads/cv_alexander_doering_de.pdf';

  return (
    <DownloadsWrapper>
      <DownloadsContainer>
        <DownloadsTitle>{t('downloads.title')}</DownloadsTitle>
        <DownloadsGrid>

          <DownloadCard>
            <DownloadTitle>{t('downloads.cv.title')}</DownloadTitle>
            <DownloadText>{t('downloads.cv.description')}</DownloadText>
            <DownloadLink href={cvFile} download>
              {t('downloads.cv.button')}
            </DownloadLink>
          </DownloadCard>

          <DownloadCard>
            <DownloadTitle>{t('downloads.executiveSummary.title')}</DownloadTitle>
            <DownloadText>{t('downloads.executiveSummary.description')}</DownloadText>
            <DownloadLink href="./downloads/executive_summary_alexander_doering.pdf" download>
              {t('downloads.executiveSummary.button')}
            </DownloadLink>
          </DownloadCard>

          <DownloadCard>
            <DownloadTitle>{t('downloads.projectOverview.title')}</DownloadTitle>
            <DownloadText>{t('downloads.projectOverview.description')}</DownloadText>
            <DownloadLink href="./downloads/projects_2025.pdf" download>
              {t('downloads.projectOverview.button')}
            </DownloadLink>
          </DownloadCard>

        </DownloadsGrid>
      </DownloadsContainer>
    </DownloadsWrapper>
  );
};

export default DownloadsPage;
