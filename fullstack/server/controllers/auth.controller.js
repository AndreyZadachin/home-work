import authService from "../services/auth.service.js";
import STATUS_CODES from "../constants/status-codes.js";

export const signin = async (req, res) => {
  try {
    const result = await authService.signin(req.body);
    return res.status(result.status).json(result.body);
  } catch (err) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
