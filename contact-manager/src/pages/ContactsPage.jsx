import { Container, Typography } from '@mui/material';

import ContactListView from '../components/ContactListView';

export default function ContactsPage() {
  return (
    <Container maxWidth="lg" className="py-8">
    
    
      <ContactListView />
     
    </Container>
  );
}