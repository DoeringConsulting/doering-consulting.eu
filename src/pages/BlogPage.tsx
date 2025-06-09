import { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled components for BlogPage
const BlogSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.white};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BlogSubtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  color: ${props => props.theme.colors.text};
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
`;

const BlogCardImage = styled.div`
  height: 200px;
  background-color: ${props => props.theme.colors.lightGray};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${BlogCard}:hover & img {
    transform: scale(1.05);
  }
`;

const BlogCardContent = styled.div`
  padding: 1.5rem;
`;

const BlogCardCategory = styled.span`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary}10;
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const BlogCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const BlogCardExcerpt = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
`;

const BlogCardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
`;

const BlogCardDate = styled.span``;

const BlogCardReadMore = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.gold};
  }
`;

const BlogPage: FC = () => {
  // Updated blog posts data with local images
  const blogPosts = [
    {
      id: 1,
      title: 'Strategische Einkaufsoptimierung in volatilen Märkten',
      excerpt: 'Wie Unternehmen ihre Einkaufsstrategie an sich schnell verändernde Marktbedingungen anpassen können, um Wettbewerbsvorteile zu sichern.',
      category: 'Einkauf',
      date: '15. Mai 2025',
      image: './images/procurement.jpg'
    },
    {
      id: 2,
      title: 'Supply Chain Resilienz: Lehren aus globalen Krisen',
      excerpt: 'Praktische Ansätze zur Stärkung der Widerstandsfähigkeit von Lieferketten basierend auf Erfahrungen aus vergangenen globalen Disruptionen.',
      category: 'Supply Chain',
      date: '28. April 2025',
      image: './images/supply_chain.jpg'
    },
    {
      id: 3,
      title: 'Digitalisierung im Einkauf: Mehr als nur E-Procurement',
      excerpt: 'Wie fortschrittliche digitale Technologien den strategischen Einkauf transformieren und welche Implementierungsstrategien erfolgversprechend sind.',
      category: 'Digitalisierung',
      date: '10. April 2025',
      image: './images/consulting_meeting.jpg'
    },
    {
      id: 4,
      title: 'Nachhaltigkeit in der Beschaffung: Strategien und Best Practices',
      excerpt: 'Wie Unternehmen Nachhaltigkeitskriterien erfolgreich in ihre Beschaffungsprozesse integrieren können, ohne Kompromisse bei Kosten und Qualität einzugehen.',
      category: 'Nachhaltigkeit',
      date: '2. April 2025',
      image: './images/procurement.jpg'
    },
    {
      id: 5,
      title: 'Effektives Lieferantenmanagement in komplexen Märkten',
      excerpt: 'Strategien zur Identifikation, Bewertung und Entwicklung von Lieferanten in einem zunehmend komplexen und globalisierten Geschäftsumfeld.',
      category: 'Sourcing',
      date: '18. März 2025',
      image: './images/supply_chain.jpg'
    },
    {
      id: 6,
      title: 'Interim Management: Erfolgsfaktoren für temporäre Führungsrollen',
      excerpt: 'Wie Interim Manager schnell Wirkung erzielen können und welche Kompetenzen für den Erfolg in temporären Führungspositionen entscheidend sind.',
      category: 'Interim Management',
      date: '5. März 2025',
      image: './images/interim_executive.jpg'
    }
  ];

  return (
    <BlogSection>
      <BlogContainer>
        <BlogHeader>
          <BlogTitle>Fachbeiträge</BlogTitle>
          <BlogSubtitle>
            Aktuelle Einblicke, Trends und Best Practices aus den Bereichen Einkauf, Supply Chain Management und Operations.
          </BlogSubtitle>
        </BlogHeader>
        
        <BlogGrid>
          {blogPosts.map(post => (
            <BlogCard key={post.id}>
              <BlogCardImage>
                <img src={post.image} alt={post.title} />
              </BlogCardImage>
              <BlogCardContent>
                <BlogCardCategory>{post.category}</BlogCardCategory>
                <BlogCardTitle>{post.title}</BlogCardTitle>
                <BlogCardExcerpt>{post.excerpt}</BlogCardExcerpt>
                <BlogCardMeta>
                  <BlogCardDate>{post.date}</BlogCardDate>
                  <BlogCardReadMore to={`/blog/${post.id}`}>Weiterlesen</BlogCardReadMore>
                </BlogCardMeta>
              </BlogCardContent>
            </BlogCard>
          ))}
        </BlogGrid>
      </BlogContainer>
    </BlogSection>
  );
};

export default BlogPage;
