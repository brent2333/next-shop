function Input({type, required, value, onChange}) {
    return (
        <input type={type} value={value} required={required} onChange={onChange}
        className="border border-black rounded px-3 py-1 w-80" />
    )
}

export default Input;