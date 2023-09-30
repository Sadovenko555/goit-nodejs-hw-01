const yargs = require('yargs');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts.js');

const { argv } = yargs
  .option('action', {
    alias: 'a',
    describe: 'Choose action',
    demandOption: true,
  })
  .option('id', {
    alias: 'i',
    describe: 'User id',
  })
  .option('name', {
    alias: 'n',
    describe: 'User name',
  })
  .option('email', {
    alias: 'e',
    describe: 'User email',
  })
  .option('phone', {
    alias: 'p',
    describe: 'User phone',
  });

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case 'list':
        const contacts = await listContacts();
        console.log('All contacts:');
        console.log(contacts);
        break;

      case 'get':
        const oneContact = await getContactById(id);
        console.log('Contact by ID:');
        console.log(oneContact);
        break;

      case 'add':
        const newContact = await addContact(name, email, phone);
        console.log('Added contact:');
        console.log(newContact);
        break;

      case 'remove':
        const removedContact = await removeContact(id);
        console.log('Removed contact:');
        console.log(removedContact);
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

invokeAction(argv);
