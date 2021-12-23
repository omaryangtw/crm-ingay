const { or, like } = require('sequelize').Op;
const { Contact, Client } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      let contacts = null;
      const { search } = req.query;

      if (search) {
        contacts = await Contact.findAll({
          where: {
            [or]: ['record'].map((key) => ({
              [key]: {
                [like]: `%${search}%`,
              },
            })),
          },
          include: [
            {
              model: Client,
              attributes: ['id', 'name'],
            },
          ],
          order: [['date', 'desc']],
        });
      } else {
        contacts = await Contact.findAll({
          include: [
            {
              model: Client,
              attributes: ['id', 'name'],
            },
          ],
          limit: 8,
          order: [['createdAt', 'desc']],
        });
      }
      res.send(contacts);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to fetch contacts',
      });
    }
  },
  async post(req, res) {
    try {
      const contact = await Contact.create(req.body.contact);
      const client = await Client.findOne({ where: { id: req.body.clientId } });
      contact.setClient(client);
      res.send(contact);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to create a contact record',
      });
    }
  },
  async delete(req, res) {
    try {
      Contact.findOne({ where: { id: req.params.contactId } }).then((u1) => {
        Client.findOne({ where: { id: req.params.clientId } }).then((u2) => {
          u2.removeContact(u1);
          u1.destroy();
        });
      });

      res.send(req.params);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to delete a contact record',
      });
    }
  },
  async update(req, res) {
    try {
      console.log('update');
      await Contact.update(req.body, {
        where: {
          id: req.params.contactId,
        },
      });
      res.send('updated');
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async backup(req, res) {
    try {
      const records = await Contact.findAll();
      res.send(records);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to get records',
      });
    }
  },

};
