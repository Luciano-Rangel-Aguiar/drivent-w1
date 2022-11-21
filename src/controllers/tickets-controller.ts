import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import ticketsService from "@/services/tickets-service";
import httpStatus from "http-status";
export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  const ticketTypes = await ticketsService.getTicketTypes();

  return res.status(httpStatus.OK).send(ticketTypes);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const result = await ticketsService.getTickets(userId);

  if(result === null || result.Ticket.length === 0) {
    return res.status(httpStatus.NOT_FOUND).send(httpStatus["404_MESSAGE"]);
  }

  const ticket = { ...result.Ticket[0] };

  return res.status(httpStatus.OK).send(ticket);
}

export async function createTickets(req: AuthenticatedRequest, res: Response) {
  // need to use the userId to get the informations
  const { userId } = req;
  const { ticketTypeId } = req.body;

  if(!ticketTypeId) {
    return res.status(httpStatus.BAD_REQUEST).send(httpStatus["400_MESSAGE"]);
  }

  const ticketType = await ticketsService.getTicketTypeById(ticketTypeId);
  const enrollment = await ticketsService.getEnrollmentById(userId);

  if(!enrollment) {
    return res.status(httpStatus.NOT_FOUND).send(httpStatus["404_MESSAGE"]);
  }

  const ticket = await ticketsService.createTicket(ticketType.id, enrollment.id);

  const ticketResponse = {
    ...ticket,
    TicketType: {
      ...ticketType
    }
  };

  return res.status(httpStatus.CREATED).send(ticketResponse);
}
