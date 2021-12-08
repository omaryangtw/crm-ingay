const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');

function jwtSignUser(user) {
  const EIGHT_HOURS = 60 * 60 * 8;
  return jwt.sign(user.toJSON(), config.authentication.jwtSecret, {
    expiresIn: EIGHT_HOURS,
  });
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      res.send(user);
    } catch (err) {
      res.status(400).send({
        error: 'Account in Use.',
      });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(403).send({
          error: 'Login Failed -- wrong email',
        });
      }
      const isPasswordValid = user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Login Failed -- invalid password',
        });
      }
      res.send({
        user: user.toJSON(),
        token: jwtSignUser(user),
      });
    } catch (err) {
      res.status(500).send({
        error: 'Login Failed -- Server',
      });
    }
  },
};
