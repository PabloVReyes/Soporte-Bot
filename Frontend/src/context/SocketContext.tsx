import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/socket";

interface SocketContextProps {
    socket: typeof socket;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextProps>({
    socket,
    isConnected: false,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            console.log("🟢 Conectado al servidor WebSocket");
        }

        function onDisconnect() {
            setIsConnected(false);
            console.log("🔴 Desconectado del servidor WebSocket");
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);


        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
