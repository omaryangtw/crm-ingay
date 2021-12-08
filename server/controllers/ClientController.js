const { or, like, not } = require('sequelize').Op;
const { Client } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      let clients = null;
      const { search } = req.query;
      if (search) {
        clients = await Client.findAll({
          where: {
            [or]: [
              'name',
              'mobile',
              'mobileAlt',
              'mobileNote',
              'mobileAltNote',
              'phone',
              'phoneAlt',
              'phoneNote',
              'phoneAltNote',
              'dist',
              'distAlt',
              'vill',
              'villAlt',
              'addr',
              'addrAlt',
              'addrNote',
              'addrAltNote',
              'note',
            ].map((key) => ({
              [key]: {
                [like]: `%${search}%`,
              },
            })),
          },
          include: { all: true, nested: true },
        });
      } else {
        clients = await Client.findAll({
          limit: 8,
          order: [['updatedAt', 'DESC']],
        });
      }

      res.send(clients);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to fetch clients',
      });
    }
  },
  async indexAll(req, res) {
    try {
      let clients = null;
      clients = await Client.findAll({
        attributes: [
          'id',
          'sex',
          'name',
          'plainMountain',
          'group',
          'birthday',
          'IDN',
          'phone',
          'mobile',
          'canMail',
          'city',
          'dist',
          'vill',
          'addr',
          'isDead',
        ],
      });
      res.send(clients);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to fetch clients',
      });
    }
  },
  async backup(req, res) {
    try {
      let clients = null;
      clients = await Client.findAll();
      res.send(clients);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to fetch clients',
      });
    }
  },

  async householdadmin(req, res) {
    try {
      let clients = null;
      clients = await Client.findAll({
        where: {
          addr: { [not]: null },
          isDead: false,
          canMail: true,
          householdadmin: true,
        },
        attributes: ['name', 'dist', 'vill', 'addr'],
      });
      res.send(clients);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  async post(req, res) {
    try {
      const client = await Client.create(req.body);
      res.send(client);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to create a client',
      });
    }
  },
  async put(req, res) {
    try {
      const client = await Client.update(req.body, {
        where: {
          id: req.params.clientId,
        },
      });
      res.send(client);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to update a client',
      });
    }
  },
  async display(req, res) {
    try {
      const client = await Client.findOne({
        where: { id: req.params.clientId },
        include: [{ all: true, nested: true }],
      });
      res.send(client);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to fetch clients',
      });
    }
  },
  async delete(req, res) {
    try {
      const client = await Client.findOne({
        where: { id: req.params.clientId },
      });
      client.destroy();
      res.send(req.params.clientId);
    } catch {
      res.status(500).send({
        error: 'an error occured trying to delete a client',
      });
    }
  },
};
