const { VITE_PROJECT_ID, VITE_ENDPOINT } = import.meta.env;

import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client.setEndpoint(VITE_ENDPOINT).setProject(VITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };