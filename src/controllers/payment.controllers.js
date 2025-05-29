// payment.controllers.js

import * as paymentModel from "../models/payment.models.js";

export const getPayments = async (req, res) => {
  try {
    const payments = await paymentModel.getAllPayments();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving payments" });
  }
};

export const getPaymentById = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payments = await paymentModel.getPaymentByIdFromDB(paymentId);
    if (payments.length === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving the payment" });
  }
};

export const insertPayment = async (req, res) => {
  const {
    amount,
    payment_date: paymentDate,
    status = "Pending",
    status_p: statusP = true,
    id_treasurer: idTreasurer,
    details,
  } = req.body;

  if (!amount || !paymentDate || !idTreasurer) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const paymentData = { amount, paymentDate, status, statusP, idTreasurer };
    const newPayment = await paymentModel.createPayment(paymentData, details);
    res.status(201).json(newPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating the payment" });
  }
};

export const deletePayment = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const { rows, rowCount } = await paymentModel.deletePaymentById(paymentId);
    if (rowCount === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({ message: "Payment deleted successfully", payment: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting the payment" });
  }
};
export const updatePayment = async (req, res) => {
  const { paymentId } = req.params;
  const { amount, paymentDate, status, statusP, idTreasurer, details } =
    req.body;

  // Validación de campos requeridos
  if (!amount || !paymentDate || !idTreasurer) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validación del monto
  if (typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount must be a positive number" });
  }

  try {
    const { updatedPayment, historyRows } = await paymentModel.updatePayment(
      paymentId,
      { amount, paymentDate, status, statusP, idTreasurer },
      details
    );

    res.status(200).json({
      message: "Payment updated successfully",
      payment: updatedPayment,
      history: historyRows,
    });
  } catch (error) {
    console.error("Error updating payment:", error.message);

    if (error.message.includes("superior al monto total esperado")) {
      return res
        .status(400)
        .json({ message: "Validation error: " + error.message });
    }

    res
      .status(500)
      .json({ message: "Error updating payment", error: error.message });
  }
};
