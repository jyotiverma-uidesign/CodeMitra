export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // TEMP response (for testing)
  res.status(200).json({
    message: "Password reset link sent to email",
  });
};
s