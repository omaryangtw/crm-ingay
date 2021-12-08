const { or, like } = require('sequelize').Op;
const { Case, Client } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      let cases = null;
      const { search } = req.query;

      if (search) {
        cases = await Case.findAll({
          where: {
            [or]: ['name', 'note', 'handle'].map((key) => ({
              [key]: {
                [like]: `%${search}%`,
              },
            })),
          },
          include: [
            {
              model: Client,
            },
          ],
          order: [['updatedAt', 'DESC']],
        });
      } else {
        cases = await Case.findAll({ limit: 15, order: [['updatedAt', 'DESC']] });
      }

      res.send(cases);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to fetch cases',
      });
    }
  },
  async post(req, res) {
    try {
      const serviceCase = await Case.create(req.body.serviceCase);
      const client = await Client.findOne({ where: { id: req.body.clientId } });
      serviceCase.setClient(client);
      res.send(serviceCase);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to create a serviceCase',
      });
    }
  },
  async put(req, res) {
    try {
      const serviceCase = await Case.update(req.body, {
        where: {
          id: req.params.caseId,
        },
      });
      res.send(serviceCase);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to update a serviceCase',
      });
    }
  },
  async display(req, res) {
    try {
      const serviceCase = await Case.findOne({
        where: { id: req.params.caseId },
      });
      res.send(serviceCase);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to fetch cases',
      });
    }
  },
  async backup(req, res) {
    try {
      const cases = await Case.findAll();
      res.send(cases);
    } catch (err) {
      res.status(500).send({
        error: 'an error occured trying to fetch cases',
      });
    }
  },
  async byClient(req, res) {
    try {
      const client = await Client.findOne({
        where: { id: req.params.clientId },
        include: [{ model: Case }],
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
      const serviceCase = await Case.findOne({
        where: { id: req.params.caseId },
      });
      serviceCase.destroy();
      res.send(req.params.caseId);
    } catch {
      res.status(500).send({
        error: 'an error occured trying to delete a case',
      });
    }
  },
};
