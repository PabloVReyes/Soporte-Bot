import { updateTechnical } from "@/api/technicals";
import { useModalStore } from "@/store/UIStore";
import { notify } from "@/utils/notify";
import { Button, Divider, Group, Stack, Table, Text, TextInput } from "@mantine/core"
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

interface Technical {
    id: string;
    name: string;
    phone: string;
    WorkingHours?: { dayOfWeek: string; checkInTime: string; departureTime: string }[];
}

interface Props {
    technical: Technical
    onUpdate?: () => void;
}

const isoToHHMM = (isoString?: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};

const daysOfWeek = [
    { es: "Lunes", en: "MONDAY" },
    { es: "Martes", en: "TUESDAY" },
    { es: "Miércoles", en: "WEDNESDAY" },
    { es: "Jueves", en: "THURSDAY" },
    { es: "Viernes", en: "FRIDAY" },
    { es: "Sábado", en: "SATURDAY" },
    { es: "Domingo", en: "SUNDAY" },
];


export const CmpTechnicalEdit = ({ technical, onUpdate }: Props) => {
    const { closeModal } = useModalStore()
    const initialWorkingHours = daysOfWeek.map((day) => {
        const wh = technical.WorkingHours?.find((w) => w.dayOfWeek === day.en);
        return {
            dayEs: day.es,
            dayEn: day.en,
            checkIn: wh ? isoToHHMM(wh.checkInTime) : "",
            checkOut: wh ? isoToHHMM(wh.departureTime) : "",
        };
    });

    const form = useForm({
        initialValues: {
            name: technical.name,
            phone: technical.phone,
            workingHours: initialWorkingHours
        },

        validate: {
            name: (value) => (value.trim().length < 3 ? "El nombre es demasiado corto" : null),
            phone: (value) =>
                !/^\d{10}$/.test(value) ? "Ingrese un número telefónico válido" : null,
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            const payload = {
                ...values,
                workingHours: values.workingHours.map((w) => ({
                    dayOfWeek: w.dayEn, // En inglés
                    checkIn: w.checkIn,
                    checkOut: w.checkOut,
                })),
            };
            await updateTechnical(technical.id, payload)

            notify({
                autoClose: 8000,
                type: "success",
                title: "Información del técnico editada",
                message: "La información ha sido editada correctamente"
            })

            onUpdate?.()
        } catch (error: any) {
            notify({
                autoClose: 8000,
                type: "error",
                title: "Información del tecnico no editada",
                message: error.message
            })
        }
        finally {
            closeModal()
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="xs">
                <TextInput
                    autoFocus
                    withAsterisk
                    label="Nombre"
                    placeholder="Nombre del técnico"
                    {...form.getInputProps("name")}
                    key={form.key("name")}
                />

                <Divider />

                <TextInput
                    withAsterisk
                    label="Número Telefónico"
                    placeholder="Número telefónico del técnico"
                    {...form.getInputProps("phone")}
                    key={form.key("phone")}
                />

                <Divider />

                <Text size="sm">
                    Horarios de trabajo
                </Text>

                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Día de la semana</Table.Th>
                            <Table.Th>Hora de entrada</Table.Th>
                            <Table.Th>Hora de salida</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {form.values.workingHours.map((item, index) => (
                            <Table.Tr key={index}>
                                <Table.Td>
                                    <Text size="sm" w={100}>{item.dayEs}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <TimeInput
                                        value={item.checkIn}
                                        onChange={(e) =>
                                            form.setFieldValue(`workingHours.${index}.checkIn`, e.currentTarget.value)
                                        }
                                    />
                                </Table.Td>
                                <Table.Td>
                                    <TimeInput
                                        value={item.checkOut}
                                        onChange={(e) =>
                                            form.setFieldValue(`workingHours.${index}.checkOut`, e.currentTarget.value)
                                        }
                                    />
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>

                <Group justify="flex-end">
                    <Button
                        variant="outline"
                        onClick={closeModal}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                    >
                        Editar
                    </Button>

                </Group>
            </Stack>
        </form>
    )
}