const Joi = require('joi');

module.exports = {
  register(req, res) {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,16}$')),
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email',
          });
          break;
        case 'password':
          res.status(400).send({
            error: '[a-zA-Z0-9]{8,16}',
          });
          break;
        default:
          res.status(400).send({
            error: 'Invalid registeration information',
          });
      }
    }
  },
};
