import { prisma } from "@/config";
import { Card, TicketType } from "@/protocols";
import { TicketStatus } from "@prisma/client";

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}

async function createPayment(cardData: Card, ticketId: number, ticketType: TicketType) {
  return prisma.payment.create({
    data: {
      ticketId,
      value: ticketType.price,
      cardIssuer: cardData.issuer,
      cardLastDigits: String(cardData.number).slice(-4)
    }
  });
}

async function updateStatus(ticketId: number, status: TicketStatus) {
  return prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      status
    }
  });
}

const paymentRepository = {
  findPaymentByTicketId,
  createPayment,
  updateStatus,
};

export default paymentRepository;
