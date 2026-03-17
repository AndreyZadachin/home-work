import db from "../models/index.js";

const User = db.User;

class UserRepository {
  findByUsername(username) {
    return User.findOne({ username });
  }

  findById(id) {
    return User.findById(id);
  }

  findByUsernameOrEmail(username, email) {
    return User.findOne({
      $or: [{ username }, { email }],
    });
  }

  create(userData) {
    const user = new User(userData);
    return user.save();
  }

  save(user) {
    return user.save();
  }
}

export default new UserRepository();
