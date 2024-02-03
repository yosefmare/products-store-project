import { TailSpin } from "react-loader-spinner";

const Spinner = ({visibility}:{visibility:boolean}): JSX.Element => {
    return (
        <div className={`${!visibility? 'hidden': 'flex'} h-[100vh] w-[100vw] opacity-45 items-center justify-center z-50 absolute bg-slate-200`}>
            <TailSpin
                visible={visibility}
                height="80"
                width="80"
                color="#0284c7"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default Spinner;