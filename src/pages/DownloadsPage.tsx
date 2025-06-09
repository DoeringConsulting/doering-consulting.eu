
import React from 'react';
import { useTranslation } from 'react-i18next';

const DownloadsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const cvFile = currentLanguage === 'en'
    ? './downloads/cv_alexander_doering_en.pdf'
    : './downloads/cv_alexander_doering_de.pdf';
  const executiveSummaryFile = './downloads/executive_summary_alexander_doering.pdf';
  const projectOverviewFile = './downloads/projects_2025.pdf';

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{t('downloads.title')}</h1>
      <ul>
        <li>
          <a href={cvFile} download>{t('downloads.cv.button')}</a>
        </li>
        <li>
          <a href={executiveSummaryFile} download>{t('downloads.executiveSummary.button')}</a>
        </li>
        <li>
          <a href={projectOverviewFile} download>{t('downloads.projectOverview.button')}</a>
        </li>
      </ul>
    </div>
  );
};

export default DownloadsPage;
