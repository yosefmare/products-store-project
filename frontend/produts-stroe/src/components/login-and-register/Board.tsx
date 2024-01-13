import { ReactNode } from "react";

type propsType = {
    children: ReactNode
}

const Board = ({ children }: propsType): JSX.Element => {
    return (
        <div className="flex items-center justify-center w-[100wv] h-[100vh]">
            <div className=" max-h-[32rem] w-96 flex flex-col  shadow-md rounded-md bg-gray-300">
                {children}
            </div>
        </div>
    );
};

export default Board;