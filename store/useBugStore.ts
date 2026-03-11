import { create } from 'zustand';

interface BugStore {
  errorText: string;
  explanation: string | null;
  setErrorText: (text: string) => void;
  setExplanation: (explanation: string) => void;
}

const useStore = create<BugStore>((set) => ({
  errorText: '',
  explanation: null,
  setErrorText: (text) => set({ errorText: text }),
  setExplanation: (data) => set({ explanation: data }),
}));

export default useStore;
