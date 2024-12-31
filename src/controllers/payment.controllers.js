import { pool } from '../database/conection.js';

// Obtener todos los pagos
export const getPayments = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public.payment');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving payments' });
  }
};

// Obtener un pago por ID
export const getPaymentById = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM public.payment WHERE payment_id = $1', [paymentId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving the payment' });
  }
};

// Insertar un nuevo pago
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
    const result = await pool.query(
      `INSERT INTO public.payment (amount, payment_date, payment_method, status, reservation_id, status_p) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [amount, paymentDate, paymentMethod, status, reservationId, statusP]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating the payment' });
  }
};

// Eliminar un pago por ID
export const deletePayment = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const { rows, rowCount } = await pool.query('DELETE FROM public.payment WHERE payment_id = $1 RETURNING *', [paymentId]);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully', payment: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting the payment' });
  }
};

// Actualizar un pago por ID
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
    const { rows } = await pool.query(
      `UPDATE public.payment 
       SET amount = $1, payment_date = $2, payment_method = $3, status = $4, reservation_id = $5, status_p = $6 
       WHERE payment_id = $7 RETURNING *`,
      [amount, paymentDate, paymentMethod, status, reservationId, statusP, paymentId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating the payment' });
  }
};
