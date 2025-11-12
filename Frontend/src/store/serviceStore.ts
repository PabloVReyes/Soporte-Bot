import { create } from "zustand";
import type { ServiceStore } from "./type";

export const useServiceStore = create<ServiceStore>((set, get) => ({
    page: 1,
    limit: 10,
    totalItems: 0,
    search: "",

    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit, page: 1 }),
    setTotalItems: (totalItems) => set({ totalItems }),
    setSearch: (search: any) => set({ search, page: 1 }),

    totalPages: () => Math.ceil(get().totalItems / get().limit),
    firstItem: () => (get().page - 1) * get().limit + 1,
    lastItem: () => Math.min(get().page * get().limit, get().totalItems),
    shouldReload: false,
    dashboardReload: false,
    setDashboardReload: (value) => set({ dashboardReload: value }),
    setShouldReload: (value) => set({ shouldReload: value }),

}));
