export const SkeletonTransCard = () => {
    return (
        <div className=" rounded-xl bg-violet-200 my-2 mx-4 p-2 ">
            <div className="animate-pulse flex justify-between items-center">
                <div className="flex items-center justify-center ">
                    <div className="px-2 py-4 mx-2 rounded-full w-12 h-12 bg-violet-400">
                    </div>
                    <div className="pl-2">
                        <div className="flex">
                            <div className="p-2 mb-2 rounded-xl w-12 bg-violet-400">
                            </div>
                        </div>
                        <div className="p-2 rounded-xl w-24 bg-violet-400">
                        </div>
                    </div>
                </div>
                <div className="p-2 rounded-xl w-24 bg-violet-400 ">
                </div>
            </div>

        </div>
    )
}