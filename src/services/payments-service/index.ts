import { Card, TicketType } from "@/protocols";
import paymentRepository from "@/repositories/payment-repository";
import { TicketStatus } from "@prisma/client";

async function getPayment(ticketId: number) {
  const payment = await paymentRepository.findPaymentByTicketId(ticketId);

  return payment;
}

async function createPayment(cardData: Card, ticketId: number, ticketType: TicketType) {
  const payment = await paymentRepository.createPayment(cardData, ticketId, ticketType);
  await paymentRepository.updateStatus(ticketId, TicketStatus.PAID);

  return payment;
}

const paymentsService = {
  getPayment,
  createPayment,
};

export default paymentsService;
