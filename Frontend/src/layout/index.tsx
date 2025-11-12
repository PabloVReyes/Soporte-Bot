import { Box } from "@mantine/core"
import { Outlet } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Modal } from "./components/Modal"
import { SocketListener } from "./components/SocketListener"

export const Layout = () => {
    return (
        <Box
            style={{
                display: 'flex',
                position: 'relative',
                height: '100dvh',
                overflow: 'hidden'
            }}
        >
            <SocketListener/>
            <Modal />
            <Navbar />
            <Box
                style={{
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    overflow: 'auto',
                    position: 'relative'
                }}
            >
                <main style={{ flex: 1, display: 'block', position: 'relative' }}>
                    <Outlet />
                </main>
            </Box>
        </Box>
    )
}