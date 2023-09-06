const ErrorAlert = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-1 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{errorMessage}</span>
    </div>
  )
}

export default ErrorAlert
