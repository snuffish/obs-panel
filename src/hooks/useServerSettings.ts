import { useLocalStorage } from "./useLocalStorage"

export const useServerSettings = () => {
    const [host, setHost] = useLocalStorage('host', 'localhost')
    const [port, setPort] = useLocalStorage('port', '4455')

    return {
        settings: {
            host, port
        },
        setHost, setPort
    }
}
