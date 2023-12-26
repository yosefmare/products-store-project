import { useState } from 'react';
const NavBoard = (): JSX.Element => {

    const [underLine, setUnderLine] = useState(false);
    return (
        <div className="w-full p-3 ">
            <div className="flex justify-between mx-24">
                <button onClick={() => setUnderLine(true)} className={underLine ? "px-4 border-b-2 border-sky-600" : ""}>admin</button>
                <button onClick={() => setUnderLine(false)} className={!underLine ? "px-4 border-b-2 border-sky-600" : ""}>user</button>
            </div>
        </div>
    );
};

export default NavBoard;