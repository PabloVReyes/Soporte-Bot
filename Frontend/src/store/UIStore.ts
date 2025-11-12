import { create } from 'zustand';
import type { ModalStore } from './type';

export const useModalStore = create<ModalStore>((set) => ({
    opened: false,
    modal: null,
    openModal: (data) => set({ opened: true, modal: data }),
    closeModal: () => set({ opened: false, modal: null })
}));