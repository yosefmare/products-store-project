
const MessagePopup = ({ visibility, icon, message }: { visibility: boolean, icon: JSX.Element, message: string }) => {
    return (
        <div className={` w-[100vw] h-[100vh] ${visibility ? 'flex' : 'hidden'} items-center justify-center bg-white absolute`}>
            <div className="h-[300px] w-[600px] absolute flex flex-col items-center justify-center gap-2 bg-slate-300">
                <div>
                    {icon}
                </div>
                <div>
                    <h2 className="text-2xl">
                        {message}
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default MessagePopup
