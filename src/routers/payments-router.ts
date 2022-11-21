import { Router } from "express";
import { getPayment, updatePaymentProcess } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayment)
  .post("/process", updatePaymentProcess);

export { paymentsRouter };
