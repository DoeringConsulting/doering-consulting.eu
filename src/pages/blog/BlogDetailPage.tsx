import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for BlogDetailPage
const BlogDetailSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.white};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const BlogDetailContainer = styled.div`
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

const BlogDetailHeader = styled.div`
  margin-bottom: 2rem;
`;

const BlogDetailCategory = styled.span`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary}10;
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const BlogDetailTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BlogDetailMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
`;

const BlogDetailDate = styled.span`
  margin-right: 1.5rem;
`;

const BlogDetailAuthor = styled.span``;

const BlogDetailImage = styled.div`
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

const BlogDetailContent = styled.div`
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

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Sample blog post data - in a real implementation, this would be fetched from an API or CMS
  const blogPosts = [
    {
      id: 1,
      title: 'Strategische Einkaufsoptimierung in volatilen Märkten',
      category: 'Einkauf',
      date: '15. Mai 2025',
      author: 'Alexander Döring',
      image: './images/procurement.jpg'
    },
    {
      id: 2,
      title: 'Supply Chain Resilienz: Lehren aus globalen Krisen',
      category: 'Supply Chain',
      date: '28. April 2025',
      author: 'Alexander Döring',
      image: './images/supply_chain.jpg'
    },
    {
      id: 3,
      title: 'Digitalisierung im Einkauf: Mehr als nur E-Procurement',
      category: 'Digitalisierung',
      date: '10. April 2025',
      author: 'Alexander Döring',
      image: './images/consulting_meeting.jpg'
    },
    {
      id: 4,
      title: 'Nachhaltigkeit in der Beschaffung: Strategien und Best Practices',
      category: 'Nachhaltigkeit',
      date: '2. April 2025',
      author: 'Alexander Döring',
      image: './images/procurement.jpg'
    },
    {
      id: 5,
      title: 'Effektives Lieferantenmanagement in komplexen Märkten',
      category: 'Sourcing',
      date: '18. März 2025',
      author: 'Alexander Döring',
      image: './images/supply_chain.jpg'
    },
    {
      id: 6,
      title: 'Interim Management: Erfolgsfaktoren für temporäre Führungsrollen',
      category: 'Interim Management',
      date: '5. März 2025',
      author: 'Alexander Döring',
      image: './images/interim_executive.jpg'
    }
  ];
  
  const post = blogPosts.find(post => post.id === Number(id));
  
  if (!post) {
    return (
      <BlogDetailSection>
        <BlogDetailContainer>
          <BackLink to="/blog">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Zurück zur Blog-Übersicht
          </BackLink>
          <h1>Artikel nicht gefunden</h1>
          <p>Der gesuchte Artikel existiert nicht oder wurde entfernt.</p>
        </BlogDetailContainer>
      </BlogDetailSection>
    );
  }
  
  return (
    <BlogDetailSection>
      <BlogDetailContainer>
        <BackLink to="/blog">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Zurück zur Blog-Übersicht
        </BackLink>
        
        <BlogDetailHeader>
          <BlogDetailCategory>{post.category}</BlogDetailCategory>
          <BlogDetailTitle>{post.title}</BlogDetailTitle>
          <BlogDetailMeta>
            <BlogDetailDate>{post.date}</BlogDetailDate>
            <BlogDetailAuthor>Von {post.author}</BlogDetailAuthor>
          </BlogDetailMeta>
        </BlogDetailHeader>
        
        <BlogDetailImage>
          <img src={post.image} alt={post.title} />
        </BlogDetailImage>
        
        <BlogDetailContent>
          <PlaceholderMessage>
            <h2>Platzhalter für Blog-Inhalt</h2>
            <p>Dieser Bereich ist ein Platzhalter für den vollständigen Inhalt des Blog-Artikels. Hier können Sie Ihren eigenen Text einfügen.</p>
            <p>Um diesen Platzhalter zu bearbeiten, öffnen Sie die Datei:</p>
            <code>src/pages/blog/BlogDetailPage.tsx</code>
            <p>und ersetzen Sie den Platzhaltertext mit Ihrem eigenen Inhalt.</p>
          </PlaceholderMessage>
          
          <h2>Einleitung</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
          </p>
          
          <h2>Hauptteil</h2>
          <p>
            Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis.
          </p>
          
          <h3>Unterpunkt 1</h3>
          <p>
            Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna. Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus.
          </p>
          
          <h3>Unterpunkt 2</h3>
          <p>
            Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.
          </p>
          
          <blockquote>
            "Erfolgreiche Strategien im Einkauf basieren auf einer Kombination aus analytischem Denken, Marktkenntnis und der Fähigkeit, langfristige Partnerschaften aufzubauen."
          </blockquote>
          
          <h2>Fazit</h2>
          <p>
            Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          </p>
        </BlogDetailContent>
      </BlogDetailContainer>
    </BlogDetailSection>
  );
};

export default BlogDetailPage;
