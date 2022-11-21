import { prisma } from "@/config";

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findTickets() {
  return prisma.ticket.findFirst({
    include: {
      TicketType: true
    }
  });
}

async function findTicketWithEnrollmentById(userId: number) {
  return prisma.enrollment.findUnique({
    where: {
      userId
    },
    include: {
      Ticket: {
        include: {
          TicketType: true
        }
      }
    }
  });
}

async function findTicketTypeById(ticketTypeId: number) {
  return prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId
    },
  });
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId
    }
  });
}

async function createTicket(ticket: { ticketTypeId: number, enrollmentId: number }) {
  return await prisma.ticket.create({
    data: {
      ...ticket,
      status: "RESERVED"
    }
  });
}

const ticketRepository = {
  findTicketTypes,
  findTickets,
  findTicketWithEnrollmentById,
  findTicketTypeById,
  createTicket,
  findTicketById
};

export default ticketRepository;
