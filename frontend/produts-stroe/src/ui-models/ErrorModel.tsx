
type PropsTypes = {
    message: string;
    display: boolean
}

const ErrorModel = ({message, display}: PropsTypes) => {
    return (
        <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 ${display? "block": "hidden"}`} role="alert">
            <strong className="font-bold">Error! </strong>
            <br />
            <span className="block sm:inline">{message}</span>
        </div>

    )
}

export default ErrorModel
