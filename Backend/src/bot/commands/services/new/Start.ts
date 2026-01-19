import { updateUserDataQuery } from "@/bot/helpers/users.query"
import { SendMessageProps } from "../../types"
import { Messages } from "../../../messages"

export const Start = async ({ phone }: SendMessageProps) => {
    await updateUserDataQuery(phone, { conversationStep: "awaiting_service_description" })
    return Messages.service.new.ask[Math.floor(Math.random() * Messages.service.new.ask.length)]
}