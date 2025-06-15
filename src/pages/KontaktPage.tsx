import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// Styled components for KontaktPage
const ContactSection = styled.section`
  padding: 5rem 1rem;
  background-color: ${props => props.theme.colors.white};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div``;

const ContactTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContactText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
`;

const ContactDetails = styled.div`
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ContactItemContent = styled.div``;

const ContactItemTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
`;

const ContactItemText = styled.p`
  margin: 0;
  line-height: 1.6;
`;

const ContactItemLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.gold};
  }
`;

const ContactForm = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  padding: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FormButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}dd;
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.gray};
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const KontaktPage: React.FC = () => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = React.useState({
    submitting: false,
    success: false,
    error: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: false });
    
    // Simulate form submission
    setTimeout(() => {
      // In a real implementation, this would be an API call
      console.log('Form submitted:', formData);
      setFormStatus({ submitting: false, success: true, error: false });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <ContactSection>
      <ContactContainer>
        <ContactInfo>
          <ContactTitle>{t('contact.title')}</ContactTitle>
          <ContactText>
            {t('contact.description')}
          </ContactText>
          
          <ContactDetails>
            <ContactItem>
              <ContactIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </ContactIcon>
              <ContactItemContent>
                <ContactItemTitle>{t('contact.info.phone')}</ContactItemTitle>
                <ContactItemText>
                  <ContactItemLink href="tel:+4915127266372">+49 151 27266372</ContactItemLink>
                </ContactItemText>
              </ContactItemContent>
            </ContactItem>
            
            <ContactItem>
              <ContactIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </ContactIcon>
              <ContactItemContent>
                <ContactItemTitle>{t('contact.info.email')}</ContactItemTitle>
                <ContactItemText>
                  <ContactItemLink href="mailto:office@doering-consulting.eu">office@doering-consulting.eu</ContactItemLink>
                </ContactItemText>
              </ContactItemContent>
            </ContactItem>
            
            <ContactItem>
              <ContactIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </ContactIcon>
              <ContactItemContent>
                <ContactItemTitle>{t('contact.info.address')}</ContactItemTitle>
                <ContactItemText>
                  DÖRING Consulting<br />
                  <a href="https://maps.google.com/?q=50.2592628,19.1867242" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    ul. Gen. Leopolda Okulickiego 4<br />
                    41-208 Sosnowiec<br />
                    POLAND
                  </a>
                </ContactItemText>
              </ContactItemContent>
            </ContactItem>
          </ContactDetails>
        </ContactInfo>
        
        <ContactForm>
          <FormTitle>{t('contact.form.title', 'Kontaktformular')}</FormTitle>
          
          {formStatus.success && (
            <SuccessMessage>
              {t('contact.form.success')}
            </SuccessMessage>
          )}
          
          {formStatus.error && (
            <ErrorMessage>
              {t('contact.form.error')}
            </ErrorMessage>
          )}
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="name">{t('contact.form.name')} *</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="email">{t('contact.form.email')} *</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="phone">{t('contact.form.phone')}</FormLabel>
              <FormInput
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="subject">{t('contact.form.company', 'Unternehmen')}</FormLabel>
              <FormInput
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="message">{t('contact.form.message')} *</FormLabel>
              <FormTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormButton type="submit" disabled={formStatus.submitting}>
              {formStatus.submitting ? t('contact.form.submitting', 'Wird gesendet...') : t('contact.form.submit')}
            </FormButton>
          </form>
        </ContactForm>
      </ContactContainer>
    </ContactSection>
  );
};

export default KontaktPage;
