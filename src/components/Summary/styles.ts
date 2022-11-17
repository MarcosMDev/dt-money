import styled, { css } from 'styled-components'

export const SummaryContainer = styled.section`
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 1.5rem;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @media screen and (min-width: 200px) and (max-width: 640px) {
        overflow-y: scroll;
    }
    margin-top: -5rem;
`

interface SummaryCardProps {
    varianty?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`
    background: ${(props) => props.theme['gray-600']};
    border-radius: 6px;
    padding: 2rem;

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: ${(props) => props.theme['gray-300']};
    }

    strong {
        display: block;
        margin-top: 1rem;
        font-size: 2rem;
    }

    ${(props) =>
        props.varianty === 'green' &&
        css`
            background: ${(props) => props.theme['green-700']};
        `}
`
