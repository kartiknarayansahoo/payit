export const ErrorCard = ({ errorMsg }: { errorMsg: string }) => {
    return (
        <div className="mx-4 my-2 p-4 font-semibold rounded-xl bg-red-100 text-red-700">
            Error: {errorMsg}
        </div>
    )
}