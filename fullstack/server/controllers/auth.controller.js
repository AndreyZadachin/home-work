import authService from "../services/auth.service.js";

export const signin = async (req, res) => {
  try {
    const result = await authService.signin(req.body);
    return res.status(result.status).json(result.body);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
