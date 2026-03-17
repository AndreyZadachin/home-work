import userRepository from "../repositories/user.repository.js";

class UserService {
  findById(id) {
    return userRepository.findById(id);
  }

  getUserBoard(user) {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
    };
  }
}

export default new UserService();
