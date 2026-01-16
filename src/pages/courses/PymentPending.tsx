import { motion } from "framer-motion";

export const PaymentPending = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <motion.div
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="text-xl font-semibold"
    >
      Verifying Payment…
    </motion.div>
    <p className="text-gray-500 mt-2">
      Access will unlock after admin approval
    </p>
  </div>
);
