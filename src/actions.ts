'use server'

export const getData = async(args: {
    something: number
}) => ({
    value: args.something * 2
})
