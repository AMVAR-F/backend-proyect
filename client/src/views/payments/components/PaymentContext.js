import React, { createContext, useState } from 'react';
import { tournamentFee, teams as initialTeams } from '../data';

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [teams] = useState(initialTeams);

  const insertPayment = (payment) => {
    const newPayment = {
      id: Date.now(),
      ...payment,
      amountPaid: payment.amount,
      history: [{ date: new Date().toLocaleDateString(), amountPaid: payment.amount, status: 'Pendiente' }]
    };

    if (newPayment.amountPaid >= tournamentFee) {
      newPayment.status = 'Pagado';
    }

    setPayments([...payments, newPayment]);
    setCurrentPayment(newPayment);
  };

  const updatePayment = (id, additionalPayment) => {
    setPayments((prevPayments) =>
      prevPayments.map((p) => {
        if (p.id === id) {
          const newAmountPaid = p.amountPaid + additionalPayment.amountPaid;
          const newStatus = newAmountPaid >= tournamentFee ? 'Pagado' : 'Pendiente';
          return {
            ...p,
            amountPaid: newAmountPaid,
            status: newStatus,
            history: [...p.history, { date: new Date().toLocaleDateString(), amountPaid: additionalPayment.amountPaid, status: newStatus }]
          };
        }
        return p;
      })
    );
  };

  return (
    <PaymentContext.Provider value={{ payments, insertPayment, updatePayment, currentPayment, setCurrentPayment, teams }}>
      {children}</PaymentContext.Provider>
  );
};
