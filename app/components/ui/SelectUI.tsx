"use client"
import dynamic from 'next/dynamic'
const Select = dynamic(() => import('react-select'), {
    ssr: false
})

interface IProps {
    options: { value: string, label: string }[],
    selectedOption: { value: string | undefined, label: string },
    selectOption: (option: any) => void
}

export default function SelectUI({ options, selectedOption, selectOption }: IProps) {

    return (
        <Select
            options={options}
            value={selectedOption}
            onChange={selectOption}
            isSearchable={false}
            styles={{
                control: (styles, state) => ({
                    ...styles,
                    background: "#e9e8e8",
                }),
                option: (styles) => ({
                    ...styles,
                    ":active": {
                        background: "#343a40",
                        color: "white",
                    },
                    cursor: 'pointer',
                    background: "e9e8e8",
                })
            }}
        />
    )
}