import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for FachgebietDetailPage
const FachgebietDetailSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.white};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const FachgebietDetailContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.gold};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const FachgebietDetailHeader = styled.div`
  margin-bottom: 2rem;
`;

const FachgebietDetailTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FachgebietDetailSubtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 2rem;
`;

const FachgebietDetailImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const FachgebietDetailContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 2.5rem 0 1.5rem;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 2rem 0 1rem;
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  blockquote {
    border-left: 4px solid ${props => props.theme.colors.gold};
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
  }
`;

const PlaceholderMessage = styled.div`
  background-color: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;
`;

const ServicesList = styled.div`
  margin: 2rem 0;
`;

const ServiceItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const ServiceIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 1rem;
  color: ${props => props.theme.colors.gold};
  flex-shrink: 0;
`;

const ServiceText = styled.p`
  margin: 0;
`;

const FachgebietDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Sample fachgebiete data - in a real implementation, this would be fetched from an API or CMS
  const fachgebiete = [
    {
      id: 'einkauf',
      title: 'Einkauf & Beschaffung',
      subtitle: 'Strategische Neuausrichtung des Einkaufs, Kostenoptimierung und Lieferantenmanagement',
      image: './images/procurement.jpg',
      services: [
        'Entwicklung von Category-Strategien und Warengruppenmanagement',
        'Implementierung von strategischem Einkaufscontrolling',
        'Optimierung der Einkaufsorganisation und -prozesse',
        'Kostenstrukturanalyse und Identifikation von Einsparpotenzialen',
        'Professionelles Lieferantenmanagement und -entwicklung'
      ]
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain Management',
      subtitle: 'End-to-End Optimierung der Lieferkette, Bestandsreduktion und Prozessverbesserung',
      image: './images/supply_chain.jpg',
      services: [
        'End-to-End Supply Chain Optimierung',
        'Bestandsoptimierung und Working Capital Reduktion',
        'Implementierung von S2P und P2P Prozessen',
        'Supply Chain Visibility und Risikomanagement',
        'Digitalisierung der Supply Chain'
      ]
    },
    {
      id: 'operations',
      title: 'Operations',
      subtitle: 'Steigerung der operativen Effizienz, Lean Management und kontinuierliche Verbesserung',
      image: './images/operations.jpg',
      services: [
        'Lean Management und kontinuierliche Verbesserung',
        'Prozessoptimierung und Effizienzsteigerung',
        'Implementierung von Operational Excellence',
        'Produktivitätssteigerung und Kostensenkung',
        'Change Management und Mitarbeiterentwicklung'
      ]
    },
    {
      id: 'sourcing',
      title: 'Sourcing',
      subtitle: 'Strategische Beschaffung, Ausschreibungsmanagement und Vertragsverhandlungen',
      image: './images/sourcing.jpg',
      services: [
        'Strategische Beschaffung und Marktanalyse',
        'Professionelles Ausschreibungsmanagement (RFI, RFP, RFQ)',
        'Vertragsverhandlungen und -management',
        'Aufbau globaler Sourcing-Netzwerke',
        'Lieferantenauswahl und -bewertung'
      ]
    },
    {
      id: 'interim',
      title: 'Interim Executive',
      subtitle: 'Temporäre Führungsverantwortung in Schlüsselpositionen des Einkaufs und Supply Chain',
      image: './images/interim_executive.jpg',
      services: [
        'Temporäre Führungsverantwortung in Schlüsselpositionen',
        'Überbrückung von Vakanzen im Einkauf und Supply Chain',
        'Unterstützung in Transformationsphasen',
        'Krisenmanagement und Turnaround',
        'Aufbau und Entwicklung von Teams'
      ]
    },
    {
      id: 'digital',
      title: 'Digitale Transformation',
      subtitle: 'Digitalisierung von Einkaufs- und Supply-Chain-Prozessen',
      image: './images/digital_transformation.jpg',
      services: [
        'Digitalisierungsstrategie für Einkauf und Supply Chain',
        'Implementierung von E-Procurement-Lösungen',
        'Datenanalyse und Business Intelligence',
        'Automatisierung von Routineprozessen',
        'Integration von KI und Machine Learning'
      ]
    }
  ];
  
  const fachgebiet = fachgebiete.find(f => f.id === id);
  
  if (!fachgebiet) {
    return (
      <FachgebietDetailSection>
        <FachgebietDetailContainer>
          <BackLink to="/fachgebiete">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Zurück zur Fachgebiete-Übersicht
          </BackLink>
          <h1>Fachgebiet nicht gefunden</h1>
          <p>Das gesuchte Fachgebiet existiert nicht oder wurde entfernt.</p>
        </FachgebietDetailContainer>
      </FachgebietDetailSection>
    );
  }
  
  return (
    <FachgebietDetailSection>
      <FachgebietDetailContainer>
        <BackLink to="/fachgebiete">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Zurück zur Fachgebiete-Übersicht
        </BackLink>
        
        <FachgebietDetailHeader>
          <FachgebietDetailTitle>{fachgebiet.title}</FachgebietDetailTitle>
          <FachgebietDetailSubtitle>{fachgebiet.subtitle}</FachgebietDetailSubtitle>
        </FachgebietDetailHeader>
        
        <FachgebietDetailImage>
          <img src={fachgebiet.image} alt={fachgebiet.title} />
        </FachgebietDetailImage>
        
        <FachgebietDetailContent>
          <PlaceholderMessage>
            <h2>Platzhalter für Fachgebiet-Inhalt</h2>
            <p>Dieser Bereich ist ein Platzhalter für den vollständigen Inhalt des Fachgebiets. Hier können Sie Ihren eigenen Text einfügen.</p>
            <p>Um diesen Platzhalter zu bearbeiten, öffnen Sie die Datei:</p>
            <code>src/pages/fachgebiete/FachgebietDetailPage.tsx</code>
            <p>und ersetzen Sie den Platzhaltertext mit Ihrem eigenen Inhalt.</p>
          </PlaceholderMessage>
          
          <h2>Leistungen</h2>
          <ServicesList>
            {fachgebiet.services.map((service, index) => (
              <ServiceItem key={index}>
                <ServiceIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </ServiceIcon>
                <ServiceText>{service}</ServiceText>
              </ServiceItem>
            ))}
          </ServicesList>
          
          <h2>Überblick</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
          </p>
          
          <h2>Methodik</h2>
          <p>
            Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis.
          </p>
          
          <h3>Analyse</h3>
          <p>
            Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna. Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus.
          </p>
          
          <h3>Umsetzung</h3>
          <p>
            Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.
          </p>
          
          <blockquote>
            "Erfolgreiche Transformationen beginnen mit einer klaren Vision und werden durch konsequente Umsetzung und Change Management zum Erfolg geführt."
          </blockquote>
          
          <h2>Ihr Nutzen</h2>
          <p>
            Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          </p>
        </FachgebietDetailContent>
      </FachgebietDetailContainer>
    </FachgebietDetailSection>
  );
};

export default FachgebietDetailPage;
