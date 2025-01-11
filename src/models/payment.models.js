import { pool } from '../database/conection.js';

export const getAllPayments = async () => {
  const { rows } = await pool.query('SELECT * FROM public.payment');
  return rows;
};

export const getPaymentByIdFromDB = async (paymentId) => {
  const { rows } = await pool.query('SELECT * FROM public.payment WHERE payment_id = $1', [paymentId]);
  return rows;
};

export const createPayment = async (paymentData) => {
  const { amount, paymentDate, paymentMethod, status, reservationId, statusP } = paymentData;
  const { rows } = await pool.query(
    `INSERT INTO public.payment (amount, payment_date, payment_method, status, reservation_id, status_p) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [amount, paymentDate, paymentMethod, status, reservationId, statusP]
  );
  return rows[0];
};

export const deletePaymentById = async (paymentId) => {
  const { rows, rowCount } = await pool.query(
    'DELETE FROM public.payment WHERE payment_id = $1 RETURNING *',
    [paymentId]
  );
  return { rows, rowCount };
};

export const updatePaymentById = async (paymentId, paymentData) => {
  const { amount, paymentDate, paymentMethod, status, reservationId, statusP } = paymentData;
  const { rows } = await pool.query(
    `UPDATE public.payment 
     SET amount = $1, payment_date = $2, payment_method = $3, status = $4, reservation_id = $5, status_p = $6 
     WHERE payment_id = $7 RETURNING *`,
    [amount, paymentDate, paymentMethod, status, reservationId, statusP, paymentId]
  );
  return rows;
};
