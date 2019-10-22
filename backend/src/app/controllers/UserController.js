import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      throw new Error('User already exists');
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const { email, oldPassword, password, confirmPassword } = req.body;

    if (!oldPassword && (password || confirmPassword)) {
      throw new Error('Password is required');
    }

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        throw new Error('User already exists');
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      throw new Error('Password does not match');
    }

    const { id, name, email: userEmail } = await user.update(req.body);

    return res.json({ id, name, email: userEmail });
  }
}

export default new UserController();
