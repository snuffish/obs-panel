import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useLocalStorage = (key: string, _default = '') => {
    const queryClient = useQueryClient()

    const { data: item } = useQuery({
        queryKey: ['localStorage', key],
        queryFn: () => {
            const item = window.localStorage.getItem(key)

            return item ? item : _default
        }
    })

    const { mutate: setItem } = useMutation({
        mutationFn: async (value: string) => {
            window.localStorage.setItem(key, value)

            await queryClient.invalidateQueries(['localStorage', key])
        }
    })

    return { setItem, item }
}
