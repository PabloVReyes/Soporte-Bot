import { Server as IOServer } from "socket.io";
import http from "http";

let io: IOServer;

export function initSocket(server: http.Server) {
    io = new IOServer(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("🟢 Cliente conectado:", socket.id);

        socket.on("disconnect", () => {
            console.log("🔴 Cliente desconectado:", socket.id);
        });
    });

    return io;
}

export { io };
