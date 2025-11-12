export interface UserProps {
    id: string;
    name: string | null;
    matricula: string | null;
    area: string | null;
    ext: string | null;
    ip: string | null;
    roleId: string | null;
    createdAt: Date;
    updateAt: Date | null;
    rol: RolProps
    register_step: number;
}

interface RolProps {
    id: string;
    name: string;
    commandsId: number[]
}

export interface allCommandsProps {
    name: string;
    description: string;
    key: string[]
    rol: string[]
    responseFunction: any;
}

export interface saveUserDataQueryProps {
    phone: string;
    key: string;
    value: any;
}