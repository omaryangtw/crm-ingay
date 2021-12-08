const Promise = require('bluebird');
const {
  sequelize, Client, Case, Contact,
} = require('../models');
/* place following 4 files under the same directory
check models directory for schema */
const clients = require('./clients.json');
const cases = require('./cases.json');
const families = require('./families.json');
const contacts = require('./contacts.json');

sequelize.sync({ force: true }).then(async () => {
  await Promise.all(
    clients.map((client) => {
      Client.create(client);
    }),
  );
  await Promise.all(
    cases.map((singleCase) => {
      Case.create(singleCase);
    }),
  );
  await Promise.all(
    contacts.map((contact) => {
      Contact.create(contact);
    }),
  );
  await Promise.all(
    families.map((family) => {
      Client.findOne({ where: { id: family.ClientId } }).then((u2) => {
        Client.findOne({ where: { id: family.FamilyId } }).then((u1) => {
          u2.addFamily(u1, {
            through: { relationship: family.relationship },
          });
        });
      });
    }),
  );
});
