import userService from "../services/user.service.js";

export const userBoard = (req, res) => {
  const userBoardData = userService.getUserBoard(req.user);
  return res.status(200).json(userBoardData);
};
