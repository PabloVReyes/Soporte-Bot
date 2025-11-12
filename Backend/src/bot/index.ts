import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason,
    makeCacheableSignalKeyStore,
    fetchLatestBaileysVersion,
    WASocket
} from "@whiskeysockets/baileys";
import fs from "fs";
import pino from "pino";
import qrcode from "qrcode-terminal";
import { getUserDataByMatriculaQuery, getUserDataQuery, updateUserDataQuery, updateUserRol } from "./helpers/users.query";
import { UserProps } from "./types";
import { Messages } from "./messages";
import { newService } from "./commands/functions/services";
import { detectCommand } from "./utils/detect-commands";


export const bot = async () => {
    const AUTH_DIR = `${process.env.AUTH_DIR}`
    const RECONNECT_DELAY = Number(process.env.RECONNECT_DELAY)

    console.log("🚀 Iniciando bot de WhatsApp...");

    if (!fs.existsSync(AUTH_DIR)) fs.mkdirSync(AUTH_DIR);

    const { version } = await fetchLatestBaileysVersion();
    console.log("📱 Versión de WhatsApp soportada:", version);

    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR)

    const sock: WASocket = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        browser: ["Bot", "Baileys", "1.0"],
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
        }
    })

    sock.ev.on("connection.update", async (update) => {
        const { connection, qr, lastDisconnect } = update;

        if (qr) {
            console.clear();
            console.log("🔐 Escanea este QR para iniciar sesión:\n");
            qrcode.generate(qr, { small: true });
        }

        if (connection === "open") {
            console.log("✅ Bot conectado correctamente a WhatsApp");
        }

        if (connection === "close") {
            const code = (lastDisconnect?.error as any)?.output?.statusCode;
            console.log(`❌ Conexión cerrada. Código: ${code}`);

            if (code === DisconnectReason.loggedOut || code === 405 || code === 440) {
                console.log("🧹 Eliminando carpeta auth...");
                fs.rmSync(AUTH_DIR, { recursive: true, force: true });
                console.log("✅ Carpeta auth eliminada. Se regenerará al reiniciar.");
            }

            console.log(`♻️ Reintentando en ${RECONNECT_DELAY / 1000}s...`);
            setTimeout(() => bot(), RECONNECT_DELAY);
        }
    })

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const phone: any = msg.key.remoteJid;
        const message = msg.message.conversation || msg.message.extendedTextMessage?.text;
        if (!message || phone === "status@broadcast") return;

        console.log(`📩 Mensaje recibido de ${phone}: ${message}`);

        // Obtener datos del usuario
        const User: UserProps | any = await getUserDataQuery(phone)

        if (User.rol.name === "NEW") {
            const step = User.register_step | 0

            switch (step) {
                case 0: {
                    await sock.sendMessage(phone, {
                        text: Messages.welcome.welcome
                    });
                    await updateUserDataQuery(phone, { register_step: 1 })
                }

                case 1: {
                    const match = message.match(/\d{4}/)
                    if (!match) {
                        await sock.sendMessage(phone, {
                            text: Messages.matricula.ask
                        })
                        return;
                    }

                    if(await getUserDataByMatriculaQuery(match[0])) {
                        await sock.sendMessage(phone, {
                            text: Messages.matricula.error(match[0])
                        })
                        return;
                    }

                    await updateUserDataQuery(phone, { matricula: match[0], register_step: 2 })
                    await sock.sendMessage(phone, {
                        text: Messages.matricula.success(match[0])
                    })
                    return
                }

                case 2: {
                    if (message.length < 3) {
                        await sock.sendMessage(phone, {
                            text: Messages.area.error,
                        });
                        return;
                    }

                    await updateUserDataQuery(phone, { area: message.trim(), register_step: 3 });
                    await sock.sendMessage(phone, {
                        text: Messages.area.success(message.trim())
                    });
                    return;
                }

                case 3: {
                    const match = message.match(/^\d{4}$/);
                    if (!match) {
                        await sock.sendMessage(phone, {
                            text: Messages.ext.error,
                        });
                        return;
                    }

                    await updateUserDataQuery(phone, { ext: match[0], register_step: 4 });
                    await sock.sendMessage(phone, {
                        text: Messages.ext.success(match[0])
                    });
                    return;
                }

                case 4: {
                    const regex =
                        /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
                    if (!regex.test(message)) {
                        await sock.sendMessage(phone, {
                            text: Messages.ip.error,
                        });
                        return;
                    }

                    await updateUserDataQuery(phone, { ip: message, register_step: 0 });
                    await updateUserRol(phone, "USER");

                    await sock.sendMessage(phone, {
                        text: Messages.ip.success,
                    });
                    return;
                }
            }
        }

        if(User.conversationStep === 'awaiting_service_description') {
            const response = await newService({message: message, phone: phone, sock: sock})
            await sock.sendMessage(phone, {
                text: response
            })
            return;
        }

        const command = await detectCommand(User.rol.name, message)
        if(command) {
            const response = await command.responseFunction({rol: User.rol.name, phone: phone, sock: sock})
            await sock.sendMessage(phone, {
                text: response
            })
            return
        }

        await sock.sendMessage(phone, {
            text: Messages.error[Math.floor(Math.random() * Messages.error.length)]
        })

        return;
    });
}