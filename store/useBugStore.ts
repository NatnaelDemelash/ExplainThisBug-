import { create } from "zustand";

interface BugStore {
  errorText: string;
  setErrorText: (text: string) => void;
}

const useStore = create<BugStore>((set) => ({
  errorText: "",
  setErrorText: (text) => set({ errorText: text }),
}));

export default useStore;
