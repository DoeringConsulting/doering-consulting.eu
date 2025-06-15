import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled components for ErfolgsgeschichtenPage
const ErfolgsgeschichtenSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.white};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const ErfolgsgeschichtenContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ErfolgsgeschichtenHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const ErfolgsgeschichtenTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ErfolgsgeschichtenSubtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  color: ${props => props.theme.colors.text};
`;

const ErfolgsgeschichtenCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  overflow: hidden;
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ErfolgsgeschichtenCardContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ErfolgsgeschichtenCardImage = styled.div`
  flex: 1 1 400px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ErfolgsgeschichtenCardText = styled.div`
  flex: 1 1 600px;
  padding: 2rem;
`;

const ErfolgsgeschichtenCardBadge = styled.span`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ErfolgsgeschichtenCardTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ErfolgsgeschichtenCardSection = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ErfolgsgeschichtenCardSectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
`;

const ErfolgsgeschichtenCardSectionText = styled.p`
  color: ${props => props.theme.colors.darkGray};
  line-height: 1.6;
`;

const ErfolgsgeschichtenCardList = styled.ul`
  padding-left: 1.5rem;
  color: ${props => props.theme.colors.darkGray};
  line-height: 1.6;
`;

const ErfolgsgeschichtenCardListItem = styled.li`
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TestimonialsSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.gray};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const TestimonialsTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
  position: relative;
  padding-bottom: 1rem;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: ${props => props.theme.colors.gold};
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  position: relative;
`;

const TestimonialQuote = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.gold}40;
  position: absolute;
  top: 1rem;
  left: 1.5rem;
`;

const TestimonialText = styled.p`
  color: ${props => props.theme.colors.darkGray};
  line-height: 1.6;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  padding-top: 2rem;
`;

const TestimonialAuthor = styled.div`
  border-top: 1px solid ${props => props.theme.colors.gray};
  padding-top: 1.5rem;
`;

const TestimonialName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.3rem;
`;

const TestimonialPosition = styled.p`
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
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

const CtaContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CtaTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const CtaText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CtaButton = styled(Link)`
  background-color: ${props => props.theme.colors.gold};
  color: ${props => props.theme.colors.white};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.gold}dd;
  }
`;

const ErfolgsgeschichtenPage: React.FC = () => {
  // Removed unused colors variable

  // Erfolgsgeschichten aus dem Executive Summary
  const erfolgsgeschichten = [
    {
      title: 'Strategische Einkaufstransformation bei internationalem Automobilzulieferer',
      branche: 'Automobilindustrie',
      herausforderung: 'Ein internationaler Automobilzulieferer stand vor der Herausforderung, seine Einkaufsprozesse zu optimieren und die Einkaufskosten signifikant zu reduzieren, um wettbewerbsfähig zu bleiben.',
      loesung: 'Implementierung einer umfassenden Einkaufstransformation mit Fokus auf strategische Beschaffung, Lieferantenkonsolidierung und digitale Prozessoptimierung. Einführung eines Category-Management-Ansatzes und Entwicklung einer globalen Sourcing-Strategie.',
      ergebnisse: [
        'Reduzierung der Einkaufskosten um 18% innerhalb von 12 Monaten',
        'Konsolidierung der Lieferantenbasis um 35%',
        'Implementierung eines digitalen Beschaffungssystems mit 95% Prozessabdeckung',
        'Verkürzung der Durchlaufzeiten im Einkauf um 40%'
      ],
      image: './images/procurement.jpg'
    },
    {
      title: 'Supply Chain Optimierung für globalen Elektronikkonzern',
      branche: 'Elektronikindustrie',
      herausforderung: 'Ein führender Elektronikkonzern kämpfte mit Ineffizienzen in der Lieferkette, langen Lieferzeiten und hohen Bestandskosten, was die Markteinführungszeit neuer Produkte verzögerte.',
      loesung: 'Entwicklung und Implementierung einer End-to-End Supply Chain Optimierungsstrategie mit Fokus auf Bestandsmanagement, Lieferantenintegration und Prozessautomatisierung. Einführung eines Sales & Operations Planning (S&OP) Prozesses und Implementierung eines Supply Chain Visibility Tools.',
      ergebnisse: [
        'Reduzierung der Bestände um 25% bei gleichzeitiger Verbesserung der Liefertreue auf 98%',
        'Verkürzung der Lieferzeiten um 30%',
        'Senkung der Logistikkosten um 15%',
        'Verbesserung der Prognosegenauigkeit um 40%'
      ],
      image: './images/supply_chain.jpg'
    },
    {
      title: 'Digitale Transformation der Beschaffungsprozesse bei Pharmaunternehmen',
      branche: 'Pharmazeutische Industrie',
      herausforderung: 'Ein mittelständisches Pharmaunternehmen arbeitete mit veralteten, manuellen Beschaffungsprozessen, die zu hohen Prozesskosten, langen Durchlaufzeiten und mangelnder Transparenz führten.',
      loesung: 'Konzeption und Implementierung einer digitalen Beschaffungsplattform mit automatisierten Workflows, integriertem Lieferantenmanagement und datengestützter Entscheidungsfindung. Schulung der Mitarbeiter und Change Management zur Sicherstellung einer erfolgreichen Adoption.',
      ergebnisse: [
        'Automatisierung von 85% der operativen Einkaufsprozesse',
        'Reduzierung der Prozesskosten um 60%',
        'Verkürzung der Durchlaufzeiten von Bestellungen um 70%',
        'Steigerung der Compliance-Rate auf 99%',
        'ROI innerhalb von 9 Monaten erreicht'
      ],
      image: './images/consulting_meeting.jpg'
    },
    {
      title: 'Kostenoptimierung durch strategisches Sourcing bei Maschinenbauunternehmen',
      branche: 'Maschinenbau',
      herausforderung: 'Ein führendes Maschinenbauunternehmen stand unter erheblichem Kostendruck und musste seine Einkaufskosten reduzieren, ohne die Qualität oder Liefersicherheit zu beeinträchtigen.',
      loesung: 'Entwicklung und Umsetzung einer strategischen Sourcing-Initiative mit Fokus auf Total Cost of Ownership (TCO), Value Engineering und globale Beschaffung. Implementierung eines strukturierten Verhandlungsprozesses und Aufbau strategischer Lieferantenpartnerschaften.',
      ergebnisse: [
        'Reduzierung der Materialkosten um 22% innerhalb von 18 Monaten',
        'Identifizierung und Realisierung von Design-to-Cost Potenzialen in Höhe von 3,5 Mio. EUR',
        'Verbesserung der Lieferantenqualität um 30%',
        'Aufbau eines globalen Lieferantennetzwerks mit 40% Anteil an Low-Cost-Country Sourcing'
      ],
      image: './images/operations.jpg'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      text: "Alexander Döring hat uns mit seiner tiefgreifenden Expertise im Bereich Supply Chain Management maßgeblich dabei unterstützt, unsere Lieferkette zu optimieren und widerstandsfähiger zu gestalten. Seine pragmatische Herangehensweise und sein Fokus auf messbare Ergebnisse haben zu signifikanten Verbesserungen in unseren Prozessen geführt.",
      name: "Dr. Michael Weber",
      position: "COO, Internationaler Elektronikkonzern"
    },
    {
      text: "Die Zusammenarbeit mit Herrn Döring im Rahmen unserer Einkaufstransformation war außerordentlich wertvoll. Seine strategische Denkweise, kombiniert mit einem tiefen Verständnis für operative Exzellenz, hat uns geholfen, unsere Einkaufskosten deutlich zu reduzieren und gleichzeitig die Qualität und Liefersicherheit zu verbessern.",
      name: "Sabine Müller",
      position: "Head of Procurement, Automobilzulieferer"
    },
    {
      text: "Als Interim Manager hat Alexander Döring in kürzester Zeit einen signifikanten Mehrwert für unser Unternehmen geschaffen. Seine Fähigkeit, komplexe Herausforderungen zu analysieren und pragmatische Lösungen zu entwickeln, ist beeindruckend. Besonders hervorzuheben ist sein Talent, Teams zu motivieren und Veränderungen erfolgreich zu implementieren.",
      name: "Thomas Schmidt",
      position: "CEO, Mittelständisches Maschinenbauunternehmen"
    }
  ];

  return (
    <>
      <ErfolgsgeschichtenSection>
        <ErfolgsgeschichtenContainer>
          <ErfolgsgeschichtenHeader>
            <ErfolgsgeschichtenTitle>Erfolgsgeschichten</ErfolgsgeschichtenTitle>
            <ErfolgsgeschichtenSubtitle>
              Entdecken Sie, wie ich Unternehmen dabei geholfen habe, ihre Einkaufs- und Supply Chain Prozesse zu optimieren und messbare Ergebnisse zu erzielen. Die folgenden Fallstudien geben Einblick in konkrete Herausforderungen, Lösungsansätze und erzielte Erfolge.
            </ErfolgsgeschichtenSubtitle>
          </ErfolgsgeschichtenHeader>
          
          {erfolgsgeschichten.map((erfolg, index) => (
            <ErfolgsgeschichtenCard key={index}>
              <ErfolgsgeschichtenCardContent>
                <ErfolgsgeschichtenCardImage>
                  <img src={erfolg.image} alt={erfolg.title} />
                </ErfolgsgeschichtenCardImage>
                <ErfolgsgeschichtenCardText>
                  <ErfolgsgeschichtenCardBadge>{erfolg.branche}</ErfolgsgeschichtenCardBadge>
                  <ErfolgsgeschichtenCardTitle>{erfolg.title}</ErfolgsgeschichtenCardTitle>
                  
                  <ErfolgsgeschichtenCardSection>
                    <ErfolgsgeschichtenCardSectionTitle>Herausforderung</ErfolgsgeschichtenCardSectionTitle>
                    <ErfolgsgeschichtenCardSectionText>{erfolg.herausforderung}</ErfolgsgeschichtenCardSectionText>
                  </ErfolgsgeschichtenCardSection>
                  
                  <ErfolgsgeschichtenCardSection>
                    <ErfolgsgeschichtenCardSectionTitle>Lösung</ErfolgsgeschichtenCardSectionTitle>
                    <ErfolgsgeschichtenCardSectionText>{erfolg.loesung}</ErfolgsgeschichtenCardSectionText>
                  </ErfolgsgeschichtenCardSection>
                  
                  <ErfolgsgeschichtenCardSection>
                    <ErfolgsgeschichtenCardSectionTitle>Ergebnisse</ErfolgsgeschichtenCardSectionTitle>
                    <ErfolgsgeschichtenCardList>
                      {erfolg.ergebnisse.map((ergebnis, ergebnisIndex) => (
                        <ErfolgsgeschichtenCardListItem key={ergebnisIndex}>
                          {ergebnis}
                        </ErfolgsgeschichtenCardListItem>
                      ))}
                    </ErfolgsgeschichtenCardList>
                  </ErfolgsgeschichtenCardSection>
                </ErfolgsgeschichtenCardText>
              </ErfolgsgeschichtenCardContent>
            </ErfolgsgeschichtenCard>
          ))}
        </ErfolgsgeschichtenContainer>
      </ErfolgsgeschichtenSection>
      
      <TestimonialsSection>
        <TestimonialsContainer>
          <TestimonialsHeader>
            <TestimonialsTitle>Kundenstimmen</TestimonialsTitle>
          </TestimonialsHeader>
          
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <TestimonialQuote>"</TestimonialQuote>
                <TestimonialText>{testimonial.text}</TestimonialText>
                <TestimonialAuthor>
                  <TestimonialName>{testimonial.name}</TestimonialName>
                  <TestimonialPosition>{testimonial.position}</TestimonialPosition>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </TestimonialsContainer>
      </TestimonialsSection>
      
      <CtaSection>
        <CtaContainer>
          <CtaTitle>Bereit für Ihren Erfolg?</CtaTitle>
          <CtaText>
            Lassen Sie uns gemeinsam an Ihren Herausforderungen arbeiten und messbare Ergebnisse erzielen. Kontaktieren Sie mich für ein unverbindliches Gespräch über Ihre spezifischen Anforderungen.
          </CtaText>
          <CtaButton to="/kontakt">
            Kontakt aufnehmen
          </CtaButton>
        </CtaContainer>
      </CtaSection>
    </>
  );
};

export default ErfolgsgeschichtenPage;
