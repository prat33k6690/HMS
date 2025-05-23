export const customSelectStyles = {
    control: (provided, state) => ({
        ...provided,
        minHeight: '16px',
        height: '35px',
        boxShadow: state.isFocused ? '0 0 5px var(--primaryColor)' : 'none',
        borderColor: state.isFocused ? 'var(--primaryColor)' : provided.borderColor,
        '&:hover': {
            borderColor: 'var(--primaryColor)',
        },
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: '30px',
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: '30px',
        padding: '0px 8px',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'rgb(161, 161, 161)',
        FontSize: "12px"
    }),
    input: (provided) => ({
        ...provided,
        margin: '-40px 0 -40px 0',
        padding: '0',
    }),
    singleValue: (provided) => ({
        ...provided,
        lineHeight: '30px',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'var(--primaryColor)' : '#f8f9fa',
        color: state.isFocused ? '#fff' : '#000',
        '&:hover': {
            backgroundColor: 'var(--primaryColor)',
        },
    }),
};




