import { create } from 'zustand';

interface PlayerStoreState {
    url: string;
    timestamp: number;
    image: string;
    title: string;
}

interface PlayerStoreActions {
    setAudioUrl: (url: string) => void;
    setTimestamp: (timestamp: number) => void;
    setImage: (image: string) => void;
    setTitle: (title: string) => void;
}

const usePlayerStore = create<PlayerStoreState & PlayerStoreActions >(set => ({
    url: '',
    timestamp: 0,
    image: '',
    title: '',
    setAudioUrl: (url) => set({ url }),
    setTimestamp: (timestamp) => set({ timestamp }),
    setImage: (image) => set({ image }),
    setTitle: (title) => set({ title }),
}));

export default usePlayerStore;