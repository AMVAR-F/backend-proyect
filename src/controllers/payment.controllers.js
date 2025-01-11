import * as paymentModel from '../models/payment.models.js';

export const getPayments = async (req, res) => {
  try {
    const payments = await paymentModel.getAllPayments();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving payments' });
  }
};

export const getPaymentById = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payments = await paymentModel.getPaymentByIdFromDB(paymentId);
    if (payments.length === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payments[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving the payment' });
  }
};

export const insertPayment = async (req, res) => {
  const {
    amount,
    payment_date: paymentDate,
    payment_method: paymentMethod,
    status = 'Pending',
    reservation_id: reservationId,
    status_p: statusP = true
  } = req.body;

  if (!amount || !paymentDate || !reservationId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const paymentData = { amount, paymentDate, paymentMethod, status, reservationId, statusP };
    const newPayment = await paymentModel.createPayment(paymentData);
    res.status(201).json(newPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating the payment' });
  }
};

export const deletePayment = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const { rows, rowCount } = await paymentModel.deletePaymentById(paymentId);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully', payment: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting the payment' });
  }
};

export const updatePayment = async (req, res) => {
  const { paymentId } = req.params;
  const {
    amount,
    payment_date: paymentDate,
    payment_method: paymentMethod,
    status = 'Pending',
    reservation_id: reservationId,
    status_p: statusP = true
  } = req.body;

  if (!amount || !paymentDate || !reservationId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const paymentData = { amount, paymentDate, paymentMethod, status, reservationId, statusP };
    const updatedPayments = await paymentModel.updatePaymentById(paymentId, paymentData);
    if (updatedPayments.length === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(updatedPayments[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating the payment' });
  }
};
