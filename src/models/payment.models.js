// payment.models.js

import { pool } from '../database/conection.js';

export const getAllPayments = async () => {
  const { rows } = await pool.query(
    `SELECT p.*, pd.amount_paid, pd.total
     FROM public.payment p
     LEFT JOIN public.payment_details pd ON p.payment_id = pd.payment_id`
  );
  return rows;
};

export const getPaymentByIdFromDB = async (paymentId) => {
  const { rows } = await pool.query(
    `SELECT p.*, pd.amount_paid, pd.total
     FROM public.payment p
     LEFT JOIN public.payment_details pd ON p.payment_id = pd.payment_id
     WHERE p.payment_id = $1`,
    [paymentId]
  );
  return rows;
};

export const createPayment = async (paymentData, paymentDetails) => {
  const { amount, paymentDate, status, statusP, idTreasurer } = paymentData;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      `INSERT INTO public.payment (amount, payment_date, status, status_p, id_treasurer)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [amount, paymentDate, status, statusP, idTreasurer]
    );

    const newPayment = rows[0];

    if (paymentDetails && paymentDetails.length > 0) {
      for (const detail of paymentDetails) {
        const { amountPaid, total } = detail;
        await client.query(
          `INSERT INTO public.payment_details (payment_id, amount_paid, total)
           VALUES ($1, $2, $3)`,
          [newPayment.payment_id, amountPaid, total]
        );
      }
    }

    await client.query('COMMIT');
    return newPayment;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const deletePaymentById = async (paymentId) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      'DELETE FROM public.payment_details WHERE payment_id = $1',
      [paymentId]
    );

    const { rows, rowCount } = await client.query(
      'DELETE FROM public.payment WHERE payment_id = $1 RETURNING *',
      [paymentId]
    );

    await client.query('COMMIT');
    return { rows, rowCount };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const updatePayment = async (paymentId, { amount, paymentDate, status, statusP, idTreasurer }, details) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Obtener el monto total pagado actualmente
    const { rows: paymentRows } = await client.query(
      `SELECT SUM(amount_paid) AS total_paid
       FROM public.payment_details
       WHERE payment_id = $1`,
      [paymentId]
    );

    const totalPaid = parseFloat(paymentRows[0]?.total_paid || 0);

    // Validar que el nuevo monto no exceda el total permitido
    if (totalPaid > amount) {
      throw new Error('El monto ingresado es superior al monto total esperado.');
    }

    // Determinar el nuevo estado del pago
    let newStatus = status || 'Pending';
    if (totalPaid === amount) {
      newStatus = 'Completed';
    }

    // Actualizar la tabla de pagos
    const { rows } = await client.query(
      `UPDATE public.payment
       SET amount = $1, payment_date = $2, status = $3, status_p = $4, id_treasurer = $5
       WHERE payment_id = $6 RETURNING *`,
      [amount, paymentDate, newStatus, statusP, idTreasurer, paymentId]
    );

    if (!rows.length) {
      throw new Error('Payment not found');
    }

    const updatedPayment = rows[0];

    // Procesar los detalles de los pagos
    if (details && details.length > 0) {
      for (const detail of details) {
        const { amountPaid, total } = detail;
        if (!amountPaid || !total) {
          throw new Error('Invalid payment detail');
        }

        const existingDetail = await client.query(
          `SELECT * FROM public.payment_details
           WHERE payment_id = $1 AND total = $2`,
          [paymentId, total]
        );

        if (existingDetail.rows.length > 0) {
          await client.query(
            `UPDATE public.payment_details
             SET amount_paid = amount_paid + $1
             WHERE payment_id = $2 AND total = $3`,
            [amountPaid, paymentId, total]
          );
        } else {
          await client.query(
            `INSERT INTO public.payment_details (payment_id, amount_paid, total)
             VALUES ($1, $2, $3)`,
            [paymentId, amountPaid, total]
          );
        }
      }
    }

    // Obtener historial de pagos
    const { rows: historyRows } = await client.query(
      `SELECT * FROM public.payment_details
       WHERE payment_id = $1`,
      [paymentId]
    );

    await client.query('COMMIT');

    return { updatedPayment, historyRows };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

