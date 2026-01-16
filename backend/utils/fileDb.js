import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "payments.json");

export const readPayments = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

export const writePayments = (payments) => {
  fs.writeFileSync(filePath, JSON.stringify(payments, null, 2));
};
