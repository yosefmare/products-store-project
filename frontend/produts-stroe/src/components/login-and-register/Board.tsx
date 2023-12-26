import { ReactNode } from "react";

type propsType = {
    children: ReactNode
}

const Board = ({ children }: propsType): JSX.Element => {
    return (
        <div className="flex items-center justify-center h-[100vh]">
            <div className="lg:w-96 h-96 flex flex-col  shadow-md rounded-md bg-gray-300">
                {children}
            </div>
        </div>
    );
};

export default Board;