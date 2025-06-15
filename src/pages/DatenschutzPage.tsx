import React from 'react';
import { useTheme } from '../lib/theme-context';

const DatenschutzPage: React.FC = () => {
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
            Datenschutzerklärung
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

      {/* Datenschutz Content */}
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
              Allgemeine Informationen
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

            <p style={{
              color: colors.darkGray,
              lineHeight: 1.6,
              marginBottom: '1.5rem'
            }}>
              Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der geltenden Rechtsvorschriften (DSGVO, polnisches Datenschutzgesetz vom 10. Mai 2018). In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: colors.primary
              }}>
                Verantwortlicher
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
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6
              }}>
                E-Mail: <a href="mailto:office@doering-consulting.eu" style={{ color: colors.primary, textDecoration: 'none' }}>office@doering-consulting.eu</a>
              </p>
            </div>
          </div>

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
              Datenerfassung und -verarbeitung
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
                Kontaktformular
              </h3>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '1rem'
              }}>
                Wenn Sie das Kontaktformular auf unserer Website nutzen, werden die von Ihnen angegebenen Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6
              }}>
                Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: colors.primary
              }}>
                Newsletter
              </h3>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '1rem'
              }}>
                Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind.
              </p>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6
              }}>
                Die Verarbeitung der in das Newsletter-Anmeldeformular eingegebenen Daten erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Die erteilte Einwilligung zur Speicherung der Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters können Sie jederzeit widerrufen, etwa über den "Austragen"-Link im Newsletter.
              </p>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: colors.primary
              }}>
                Cookies
              </h3>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6,
                marginBottom: '1rem'
              }}>
                Unsere Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die mit Hilfe des Browsers auf Ihrem Endgerät abgelegt werden. Sie richten keinen Schaden an. Wir nutzen Cookies dazu, unser Angebot nutzerfreundlich zu gestalten.
              </p>
              <p style={{
                color: colors.darkGray,
                lineHeight: 1.6
              }}>
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
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
              Ihre Rechte
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

            <p style={{
              color: colors.darkGray,
              lineHeight: 1.6,
              marginBottom: '1.5rem'
            }}>
              Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei der polnischen Datenschutzbehörde (Urząd Ochrony Danych Osobowych) beschweren.
            </p>

            <div>
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
                lineHeight: 1.6
              }}>
                Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung oder Löschung von Daten wenden Sie sich bitte an: <a href="mailto:office@doering-consulting.eu" style={{ color: colors.primary, textDecoration: 'none' }}>office@doering-consulting.eu</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DatenschutzPage;
