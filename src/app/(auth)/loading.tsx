function Loading() {
  return (
    <div>
        <h1 className="text-3xl font-bold text-center">Loading...</h1>
        <div className="flex justify-center items-center">
            <svg
            className="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                fill="none"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="none"
                d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
            />
            </svg>
        </div>
    </div>
  )
}

export default Loading
