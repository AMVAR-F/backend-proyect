import React, { useState } from 'react';
import { PaymentProvider } from './components/PaymentContext';
import PaymentList from './components/PaymentList';
import InsertPaymentModal from './components/InsertPaymentModal';
import EditPaymentModal from './components/EditPaymentModal';
import ViewPaymentModal from './components/ViewPaymentModal';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isInsertModalOpen, setInsertModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);

  return (
    <PaymentProvider>
      <Container className="mt-5">
        <PaymentList 
          onInsert={() => setInsertModalOpen(true)}
          onView={() => setViewModalOpen(true)}
          onEdit={() => setEditModalOpen(true)}
        />
        {isInsertModalOpen && <InsertPaymentModal show={isInsertModalOpen} onHide={() => setInsertModalOpen(false)} />}
        {isEditModalOpen && <EditPaymentModal show={isEditModalOpen} onHide={() => setEditModalOpen(false)} />}
        {isViewModalOpen && <ViewPaymentModal show={isViewModalOpen} onHide={() => setViewModalOpen(false)} />}
      </Container>
    </PaymentProvider>
  );
};

export default App;
