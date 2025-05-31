export const PageHeader = ({ title }: { title: string }) => {
    return (
        <div className="flex py-4 px-2 text-3xl font-bold bg-gradient-to-r from-violet-600 to-violet-950 text-transparent bg-clip-text">
            <div className="bg-gradient-to-r from-violet-600 to-purple-500  text-transparent bg-clip-text">
                {title}
            </div>
        </div>
    )
}