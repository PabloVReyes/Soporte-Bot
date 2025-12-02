// store/UserStore.ts
import { getTechnicals, getTechnicalsSupportManager, getUsers, updateUser } from "@/api/users";
import { create } from "zustand";

export const useUserStore = create<any>((set) => ({
    users: [],
    technicals: [],
    technicalsSupportManager: [],
    loading: false,

    fetchUsers: async () => {
        set({ loading: true });
        const data = await getUsers();
        set({ users: data, loading: false });
    },

    updateUser: async (id: any, userData: any) => {
        await updateUser(id, userData);
    },

    fetchTechnicals: async () => {
        set({ loading: true });
        const data = await getTechnicals();
        set({ technicals: data, loading: false });
    },

    fetchTechnicalsSupportManager: async () => {
        set({ loading: true });
        const data = await getTechnicalsSupportManager();
        set({ technicalsSupportManager: data, loading: false });
    }
}));
