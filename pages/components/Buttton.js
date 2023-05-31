function Button({type,children, onClick}) {
    return (
        <button 
        type={type}
        onClick={onClick}
        className="bg-green-800 text-gray-100 rounded px-4 py-4 hover:bg-green-700 my-4">
            {children}
        </button>
    )
}

export default Button;