import type { ReactNode } from "react";

export interface ServiceStore {
    // Sockets
    shouldReload: boolean;
    dashboardReload: boolean;
    setDashboardReload: (value: boolean) => void;
    setShouldReload: (value: boolean) => void;

    // Paginación
    page: number;
    limit: number;
    totalItems: number;
    search: string;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setTotalItems: (total: number) => void;
    setSearch: (search: string) => void;
    totalPages: () => number;
    firstItem: () => number;
    lastItem: () => number;
}
///// Modal /////
interface ModalData {
    title?: string;
    subtitle?: string;
    content: ReactNode;
}

export interface ModalStore {
    opened: boolean
    modal: ModalData | null
    openModal: (data: ModalData) => void;
    closeModal: () => void;
};
