import { IDirectory } from '@/types';
import { createStore } from './createStore';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_CATEGORIES_COLLECTION_ID;

const useCategoryStore = createStore<IDirectory>(DATABASE_ID, COLLECTION_ID);

export default useCategoryStore;
