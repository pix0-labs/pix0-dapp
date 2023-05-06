import { FC, useCallback, useEffect, useState } from "react";
import { TxHashDiv } from "../../components/TxHashDiv";
import useTxHash from "../../../hooks/useTxHash";
import {useUserContract} from "pix0-react";
import { TfiGift } from "react-icons/tfi";
import { PulseLoader as Loader } from "react-spinners";
import { Coin, toCoinStr} from 'pix0-js';


type props = {

    closeModal? : () =>void, 
}

export const RewardsView : FC <props> = ({
    closeModal
}) =>{

    const [totalRewards, setTotalRewards] = useState<Coin>();

    const [processing, setProcessing] = useState(false);

    const { getOutstandingRewards, withdrawRewards, withdrawTokenRewards } = useUserContract();

    const [initiated, setInitiated] = useState(false);

    const [claimed, setClaimed] = useState(false);

    const {txHash , setTxHash} = useTxHash();

    const initRewards = async () =>{

        setProcessing(true);

        let tx = await withdrawRewards(true, 220_000);

        //console.log("tx:::", tx);

        setTxHash(tx);

        setProcessing(false);

        if ( !(tx instanceof Error)){

            setInitiated(true);
        }
        
    }

    const claimRewards = async () =>{

        setProcessing(true);

        let tx = await withdrawTokenRewards();

        setTxHash(tx);

        setProcessing(false);

        setInitiated(false);

        setClaimed(true);
            
    }


    const fetchRewards = useCallback(async ()=>{

        let rws = await getOutstandingRewards();
        if ( rws.rewards_balance.length > 0){
            setTotalRewards( rws.rewards_balance[0]);
        }

    },[]);

    useEffect(()=>{
        fetchRewards();
    },[fetchRewards]);


    return <div className="p-2 text-gray-100 bg-gray-800 rounded w-full text-center">
        {txHash && <TxHashDiv txHash={txHash}/>}
        {closeModal && <a className="close float-right mr-2 cursor-pointer" onClick={closeModal}>
            &times;
        </a>}
        <div className="mb-6 mx-auto">
            <TfiGift className="w-24 h-24 mx-auto"/>
        </div>
        {totalRewards ? <div className="p-2 mt-4 text-lg">
            Available Rewards In Pool:<div className="mt-1 font-bold">{toCoinStr(
                parseInt(totalRewards?.amount ?? "0"),4)} CONST</div>
            <div className="text-xs text-gray-300 mt-2">You'll be able to claim up to 5% daily of the total available rewards</div>
        </div> : <Loader color="white" size={6}/>}
        
        {totalRewards && <button disabled={processing || claimed} 
        onClick={async (e)=>{
            e.preventDefault();

            if ( !initiated){
                await initRewards();
            }
            else {

                await claimRewards();
            }
        }}
        className="mt-4 font-bold mb-4 bg-green-800 text-gray-100 p-2 rounded-3xl cursor-pointer"
        style={{minWidth:"120px"}}>{processing ? <Loader size={6} color="white"/> : 
        <>{initiated ? `Claim${claimed ? "ed" :""}` : "Initiate"}</>}</button>}
    </div>

}