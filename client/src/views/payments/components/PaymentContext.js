import React, { createContext, useState, useEffect } from 'react';

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [currentPayment, setCurrentPayment] = useState(null);

  const API_URL = 'http://localhost:5000/payments';

  // Cargar pagos desde JSON Server
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((error) => console.error('Error cargando pagos:', error));
  }, []);

  // Insertar un pago
  const insertPayment = async (payment) => {
    const newPayment = { id: Date.now(), ...payment, history: [] };
    
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPayment),
      });

      if (res.ok) {
        setPayments([...payments, newPayment]);
        setCurrentPayment(newPayment);
      }
    } catch (error) {
      console.error('Error al insertar el pago:', error);
    }
  };

  // Actualizar un pago
  const updatePayment = async (id, updatedPayment) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayment),
      });

      if (res.ok) {
        setPayments(payments.map((p) => (p.id === id ? updatedPayment : p)));
      }
    } catch (error) {
      console.error('Error al actualizar el pago:', error);
    }
  };

  return (
    <PaymentContext.Provider
      value={{ payments, insertPayment, updatePayment, currentPayment, setCurrentPayment }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
