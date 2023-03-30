import { FC } from "react";
import { PulseLoader } from "react-spinners";
import { FcCancel } from "react-icons/fc";

type props = {

    processing? : boolean,

    proceedButtonText? : string, 

    proceedAction?: () =>void,

    cancelAction? : () => void, 
}

export const ProceedOrCancerButtons : FC <props> = ({
    processing, proceedAction, cancelAction, proceedButtonText, 
}) =>{

    return   <div className="mb-4 bg-gray-700 p-2 rounded">
    <button className="mr-2 bg-blue-900 rounded-3xl p-2 inline-block" 
    style={{width:"150px"}} disabled={processing}
    onClick={async (e)=>{
        e.preventDefault();
        if ( proceedAction) proceedAction();

    }}>{processing ? <PulseLoader color="#eee" margin={2}/> 
    : <>{proceedButtonText ?? "Proceed"}</>}</button>

    <button className="ml-2 bg-gray-600 rounded-3xl p-2 inline-block" 
    style={{width:"150px"}} disabled={processing}
    onClick={(e)=>{
        e.preventDefault();

        if (cancelAction)cancelAction();

    }}><FcCancel className="inline mb-1"/> Close</button>
    </div>

}