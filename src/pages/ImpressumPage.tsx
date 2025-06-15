import React from 'react';
import { useTheme } from '../lib/theme-context';

const ImpressumPage: React.FC = () => {
  const { colors } = useTheme();

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}dd 100%)`,
        color: colors.white,
        padding: '6rem 1rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            lineHeight: 1.2,
            textAlign: 'center'
          }}>
            Impressum
          </h1>
        </div>
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '0',
          transform: 'translateY(-50%)',
          width: '300px',
          height: '300px',
          background: `linear-gradient(135deg, ${colors.gold}33 0%, ${colors.gold}11 100%)`,
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 1
        }}></div>
      </section>

      {/* Impressum Content */}
      <section style={{
        padding: '5rem 1rem',
        backgroundColor: colors.white
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            backgroundColor: colors.gray,
            borderRadius: '8px',
            padding: '2.5rem',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 600,
              marginBottom: '2rem',
              color: colors.primary,
              position: 'relative',
              paddingBottom: '1rem'
            }}>
              Informacje o firmie
              <span style={{
                display: 'block',
                width: '80px',
                height: '4px',
                backgroundColor: colors.gold,
                position: 'absolute',
                bottom: 0,
                left: 0
              }}></span>
            </h2>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: colors.primary
              }}>
                Unternehmen
              </h3>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '0.5rem'
              }}>
                DÖRING Consulting
              </p>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '0.5rem'
              }}>
                Alexander Döring
              </p>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '0.5rem'
              }}>
                ul. Gen. Leopolda Okulickiego 4
              </p>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '0.5rem'
              }}>
                41-208 Sosnowiec
              </p>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '0.5rem'
              }}>
                POLAND
              </p>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '0.5rem'
              }}>
                NIP: 6443357891
              </p>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '0.5rem'
              }}>
                EU-VAT-ID: PL6443357891
              </p>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '0.5rem'
              }}>
                Regon: 52149716
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: colors.primary
              }}>
                Kontakt
              </h3>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '0.5rem'
              }}>
                Telefon: <a href="tel:+4915127266372" style={{ color: colors.primary, textDecoration: 'none' }}>+49 151 27266372</a>
              </p>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '0.5rem'
              }}>
                E-Mail: <a href="mailto:office@doering-consulting.eu" style={{ color: colors.primary, textDecoration: 'none' }}>office@doering-consulting.eu</a>
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: colors.gray,
            borderRadius: '8px',
            padding: '2.5rem'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 600,
              marginBottom: '2rem',
              color: colors.primary,
              position: 'relative',
              paddingBottom: '1rem'
            }}>
              Informacje prawne
              <span style={{
                display: 'block',
                width: '80px',
                height: '4px',
                backgroundColor: colors.gold,
                position: 'absolute',
                bottom: 0,
                left: 0
              }}></span>
            </h2>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: colors.primary
              }}>
                Wyłączenie odpowiedzialności
              </h3>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '1rem'
              }}>
                Treści tej strony internetowej zostały stworzone z najwyższą starannością. Nie możemy jednak zagwarantować poprawności, kompletności i aktualności zawartych informacji. Jako usługodawca jesteśmy odpowiedzialni za własne treści na tych stronach zgodnie z ogólnymi przepisami prawa polskiego. Nie jesteśmy jednak zobowiązani do monitorowania przekazywanych lub przechowywanych informacji osób trzecich ani do badania okoliczności wskazujących na nielegalną działalność.
              </p>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6
              }}>
                Obowiązki dotyczące usuwania lub blokowania korzystania z informacji zgodnie z ogólnymi przepisami prawa pozostają nienaruszone. Odpowiedzialność w tym zakresie jest jednak możliwa dopiero od momentu uzyskania wiedzy o konkretnym naruszeniu prawa. Po uzyskaniu informacji o odpowiednich naruszeniach prawa niezwłocznie usuniemy takie treści.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: colors.primary
              }}>
                Prawa autorskie
              </h3>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6
              }}>
                Treści i utwory stworzone przez operatorów strony podlegają polskiemu prawu autorskiemu. Powielanie, przetwarzanie, rozpowszechnianie i wszelkiego rodzaju wykorzystanie wykraczające poza zakres prawa autorskiego wymaga pisemnej zgody odpowiedniego autora lub twórcy. Pobieranie i kopiowanie tej strony jest dozwolone tylko do użytku prywatnego, niekomercyjnego.
              </p>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: colors.primary
              }}>
                Ochrona danych
              </h3>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '1rem'
              }}>
                Weitere Informationen zum Datenschutz finden Sie in unserer <a href="/#/datenschutz" style={{ color: colors.primary, textDecoration: 'none' }}>Datenschutzerklärung</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImpressumPage;
