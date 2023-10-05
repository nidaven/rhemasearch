import { create } from 'zustand';

interface PlayerStoreState {
    url: string;
    timestamp: number;
    image: string;
    title: string;
    loaded: boolean;
}

interface PlayerStoreActions {
    setAudioUrl: (url: string) => void;
    setTimestamp: (timestamp: number) => void;
    setImage: (image: string) => void;
    setTitle: (title: string) => void;
    setLoaded: (loaded: boolean) => void;
}

const usePlayerStore = create<PlayerStoreState & PlayerStoreActions >(set => ({
    url: '',
    timestamp: 0,
    image: '',
    title: '',
    loaded: false,
    setAudioUrl: (url) => set({ url }),
    setTimestamp: (timestamp) => set({ timestamp }),
    setImage: (image) => set({ image }),
    setTitle: (title) => set({ title }),
    setLoaded: (loaded) => set({ loaded }),
}));

export default usePlayerStore;