import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Trasaction {
    id: number
    description: string
    type: 'income' | 'outcome'
    price: number
    category: string
    createdAt: string
}

interface TransactionProviderProps {
    children: ReactNode
}

interface CreateTransactionInput {
    description: string
    price: number
    category: string
    type: 'income' | 'outcome'
}

interface TransactionContextType {
    transactions: Trasaction[]
    fetchTransactiions: (query?: string) => Promise<void>
    createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionContext = createContext<TransactionContextType>(
    {} as TransactionContextType,
)

export function TransactionProvider({ children }: TransactionProviderProps) {
    const [transactions, setTrasnactions] = useState<Trasaction[]>([])

    const fetchTransactiions = useCallback(async (query?: string) => {
        const response = await api.get('transactions', {
            params: {
                _sort: 'createdAt',
                _order: 'desc',
                q: query,
            },
        })

        setTrasnactions(response.data)
    }, [])

    const createTransaction = useCallback(
        async (data: CreateTransactionInput) => {
            const { description, price, category, type } = data

            const response = await api.post('transactions', {
                description,
                price,
                category,
                type,
                createdAt: new Date(),
            })

            setTrasnactions((state) => [response.data, ...state])
        },
        [],
    )

    useEffect(() => {
        fetchTransactiions()
    }, [fetchTransactiions])

    return (
        <TransactionContext.Provider
            value={{ transactions, fetchTransactiions, createTransaction }}
        >
            {children}
        </TransactionContext.Provider>
    )
}
