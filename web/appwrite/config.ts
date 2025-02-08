import { Client, Account, Databases } from 'appwrite';

const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID!;
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT!;

const client = new Client();

client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
