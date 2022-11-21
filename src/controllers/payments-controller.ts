import { Response } from "express";
import ticketsService from "@/services/tickets-service";
import paymentsService from "@/services/payments-service";
import enrollmentsService from "@/services/enrollments-service";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId);

  if(!ticketId) {
    return res.status(httpStatus.BAD_REQUEST).send(httpStatus["400_MESSAGE"]);
  }

  const ticket = await ticketsService.getTicketById(ticketId);

  if(!ticket) {
    return res.status(httpStatus.NOT_FOUND).send(httpStatus["404_MESSAGE"]);
  }

  const payment = await paymentsService.getPayment(ticketId);

  if(!payment) {
    res.status(httpStatus.UNAUTHORIZED).send(httpStatus["401_MESSAGE"]);
  }

  return res.status(httpStatus.OK).send(payment);
}

export async function updatePaymentProcess(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.body;
  const { cardData } = req.body;

  if(!ticketId || !cardData) {
    return res.status(httpStatus.BAD_REQUEST).send(httpStatus["400_MESSAGE"]);
  }

  const ticket = await ticketsService.getTicketById(ticketId);

  if(!ticket) {
    return res.status(httpStatus.NOT_FOUND).send(httpStatus["404_MESSAGE"]);
  }

  const enrollmentWithTicket = await enrollmentsService.getEnrollmentWithTicketByUserId(userId);

  if(enrollmentWithTicket.Ticket.length === 0) {
    return res.status(httpStatus.UNAUTHORIZED).send(httpStatus["401_MESSAGE"]);
  }

  const ticketType = enrollmentWithTicket.Ticket[0].TicketType;

  const paymentData = await paymentsService.createPayment(cardData, ticketId, ticketType);

  return res.status(httpStatus.OK).send(paymentData);
}
