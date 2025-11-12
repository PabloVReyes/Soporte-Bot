import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core'
import { mantineTheme } from './theme'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { SocketProvider } from './context/SocketContext';
import { Notifications } from '@mantine/notifications';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider theme={mantineTheme} defaultColorScheme="auto">
            <SocketProvider>
                <BrowserRouter>
                    <Notifications />
                    <App />
                </BrowserRouter>
            </SocketProvider>
        </MantineProvider>
    </StrictMode >,
)
