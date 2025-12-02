import { getRoles } from "@/api/roles";
import { useModalStore } from "@/store/UIStore";
import { Button, Divider, Group, Select, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useMemo, useState } from "react";
import { CmpTechnicalEdit } from "../technicals/CmpTechnicalEdit";
import { useUserStore } from "@/store/userStore";
import { IconCircleCheck } from "@tabler/icons-react";

interface Props {
    id: string;
    phone: string;
    name: string;
    matricula: string;
    area: string;
    ext: string;
    ip: string;
    rol: string;
    WorkingHours: string[]
}



const rolName = (name: string) => {
    switch (name) {
        case "USER":
            return "Usuario"
        case "TECHNICAL":
            return "Personal de Soporte Técnico"
        case "TECHNICAL_SUPPORT_MANAGER":
            return "Encargado de Soporte Técnico"
        default:
            return name
    }
}

const daysOfWeek = [
    { es: "Lunes", en: "MONDAY" },
    { es: "Martes", en: "TUESDAY" },
    { es: "Miércoles", en: "WEDNESDAY" },
    { es: "Jueves", en: "THURSDAY" },
    { es: "Viernes", en: "FRIDAY" },
    { es: "Sábado", en: "SATURDAY" },
    { es: "Domingo", en: "SUNDAY" },
];

const isoToHHMM = (isoString?: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};

export const CmpUserEdit = (user: Props) => {
    const [roles, setRoles] = useState<any[]>([])
    const { updateUser, fetchUsers, fetchTechnicals, fetchTechnicalsSupportManager } = useUserStore()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { closeModal, openModal } = useModalStore()

    const isRole = (roleName: string) => {
        const roleObj = roles.find(r => r.id === form.values.rol);
        return roleObj?.name === roleName;
    };

    const initialWorkingHours = daysOfWeek.map((day) => {
        const wh: any = user.WorkingHours?.find((w: any) => w.dayOfWeek === day.en);
        return {
            dayEs: day.es,
            dayEn: day.en,
            checkIn: wh ? isoToHHMM(wh.checkInTime) : "",
            checkOut: wh ? isoToHHMM(wh.departureTime) : "",
        };
    });

    const form = useForm({
        initialValues: {
            name: user.name,
            phone: user.phone,
            workingHours: initialWorkingHours,
            rol: ""
        },
        validate: {
            name: (value) => {
                if (isRole("TECHNICAL") && !value.trim()) {
                    return "El nombre es obligatorio para este rol";
                }
                return null;
            },

            phone: (value) => {
                if (isRole("TECHNICAL") && !value.trim()) {
                    return "El teléfono es obligatorio para este rol";
                }
                return null;
            },

            rol: (value) => !value ? "Debes de seleccionar un rol para este usuario" : null
        }
    })

    useEffect(() => {
        getRoles().then((data) => {
            setRoles(data);

            const found: any = data.find((r: any) => r.name === user.rol);
            form.setFieldValue("rol", found?.id || "");
        });
    }, [])

    const rolesData = useMemo(() => {
        return roles
            .map((role) => ({
                value: role.id,
                label: rolName(role.name),
            }))
    }, [roles])

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setIsLoading(true)

            const payload = {
                ...values,
                workingHours: values.workingHours.map((w) => ({
                    dayOfWeek: w.dayEn, // En inglés
                    checkIn: w.checkIn,
                    checkOut: w.checkOut,
                })),
            };

            await updateUser(user.id, payload)

            setTimeout(() => {
                openModal({
                    title: "Cambios guardados",
                    subtitle: "El usuario fue actualizado correctamente",
                    content: (
                        <Stack align="center" p="xl">
                            <IconCircleCheck size={60} color="green" />
                            <Text ta="center">
                                La información ha sido actualizada exitosamente.
                            </Text>
                        </Stack>
                    )
                });

                fetchTechnicals()
                fetchUsers()
                fetchTechnicalsSupportManager()
                
                setTimeout(() => {
                    closeModal();
                }, 2500);

            }, 1000);

        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => setIsLoading(false), 1000);
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={"xs"}>
                <Select
                    withAsterisk
                    label="Rol"
                    description="Rol del usuario"
                    data={rolesData}
                    {...form.getInputProps("rol")}
                />

                <Divider />

                {(isRole("TECHNICAL") || isRole("TECHNICAL_SUPPORT_MANAGER")) && <CmpTechnicalEdit form={form} />}

                <Group justify="flex-end" gap={5}>
                    <Button
                        variant="outline"
                        onClick={closeModal}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        loading={isLoading}
                    >
                        Editar
                    </Button>

                </Group>
            </Stack>
        </form>
    )
}