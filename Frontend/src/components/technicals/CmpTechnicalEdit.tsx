import { Divider, Table, Text, TextInput } from "@mantine/core"
import { TimeInput } from "@mantine/dates";
import { type UseFormReturnType } from "@mantine/form";

interface Props {
    form: UseFormReturnType<any>
}

export const CmpTechnicalEdit = ({ form }: Props) => {
    return (
        <>
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
                    {form.values.workingHours.map((item: any, index: number) => (
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
        </>
    )
}