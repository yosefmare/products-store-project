
type propsType = {
    children: JSX.Element
}

const Board = ({ children }: propsType):JSX.Element => {
    return (
        <>
            {children}
        </>
    );
};

export default Board;