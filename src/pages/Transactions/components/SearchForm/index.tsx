import { SearchFormContainer } from './styles'
import { useForm } from 'react-hook-form'
import { MagnifyingGlass } from 'phosphor-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const searchFormSchema = z.object({
    query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
    const fetchTransactiions = useContextSelector(
        TransactionContext,
        (context) => {
            return context.fetchTransactiions
        },
    )

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema),
    })

    async function handleSearchTransaction(data: SearchFormInputs) {
        await fetchTransactiions(data.query)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
            <input placeholder="Busque por transações" {...register('query')} />
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}
