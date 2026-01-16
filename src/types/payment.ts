import { Key, ReactNode } from "react";

export type PaymentStatus =
  | "NOT_STARTED"
  | "SUBMITTED"
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface PaymentRecord {
  paymentId: Key | null | undefined;
  transactionId: ReactNode;
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  txnId: string;
  screenshot: string;
  status: PaymentStatus;
  createdAt: string;
}
