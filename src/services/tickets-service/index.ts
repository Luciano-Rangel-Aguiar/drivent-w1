import { TicketType } from "@/protocols";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository"; "@/repositories/enrollment-repository";

async function getTicketTypes(): Promise<TicketType[]> {
  const result = await ticketRepository.findTicketTypes();

  return result;
}

async function getTickets(userId: number) {
  const tickets = await ticketRepository.findTicketWithEnrollmentById(userId);

  return tickets;
}

async function getTicketTypeById(ticketTypeId: number) {
  const ticketType = await ticketRepository.findTicketTypeById(ticketTypeId);

  return ticketType;
}

async function getEnrollmentById(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  return enrollment;
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  const ticket = await ticketRepository.createTicket({ ticketTypeId, enrollmentId });

  return ticket;
}

async function getTicketById(ticketId: number) {
  const ticket = await ticketRepository.findTicketById(ticketId);

  return ticket;
}

const ticketsService = {
  getTicketTypes,
  getTickets,
  getTicketTypeById,
  getEnrollmentById,
  createTicket,
  getTicketById
};

export default ticketsService;
