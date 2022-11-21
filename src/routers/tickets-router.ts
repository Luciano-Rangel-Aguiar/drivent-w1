import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketsTypes, getTickets, createTickets } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .post("/", createTickets)
  .get("/types", getTicketsTypes);

export { ticketsRouter };
