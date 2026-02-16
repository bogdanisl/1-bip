import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'; // optional: survives app restart
import type { Bip } from '@/src/types/Bip';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SelectedBipState = {
  selectedBip: Bip | null;
  setSelectedBip: (bip: Bip|null) => void;
};

export const useSelectedBipStore = create<SelectedBipState>()(
  persist( 
    (set) => ({
      selectedBip: null,
      setSelectedBip: (bip) => set({ selectedBip: bip }),
    }),
    {
      name: 'selected-bip-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);