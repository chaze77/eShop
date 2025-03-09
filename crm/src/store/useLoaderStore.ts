import { create } from 'zustand';

interface LoaderStore {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const useLoaderStore = create<LoaderStore>((set) => ({
  loading: false,
  setLoading: (value: boolean) => set({ loading: value }),
}));

export default useLoaderStore;
