import { create } from "zustand";

type State = {
    title: string;
    section: string;
    setTitle: (title: string) => void;
    setSection: (section: string) => void;
};

const useHeaderStore = create<State>((set) => ({
    title: '',
    section: '',
    setTitle: (title) => set({ title }),
    setSection: (section) => set({ section }),
}));

export default useHeaderStore;