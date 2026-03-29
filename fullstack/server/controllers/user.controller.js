import userService from "../services/user.service.js";
import STATUS_CODES from "../constants/status-codes.js";

export const userBoard = (req, res) => {
  const userBoardData = userService.getUserBoard(req.user);
  return res.status(STATUS_CODES.OK).json(userBoardData);
};
