const { VITE_PROJECT_ID, VITE_ENDPOINT } = import.meta.env;

import { Client, Account, TablesDB, Storage } from 'appwrite';

const client = new Client();

client.setEndpoint(VITE_ENDPOINT).setProject(VITE_PROJECT_ID);

const account = new Account(client);
const tablesDB = new TablesDB(client);
const storage = new Storage(client);

export { client, account, tablesDB, storage };
