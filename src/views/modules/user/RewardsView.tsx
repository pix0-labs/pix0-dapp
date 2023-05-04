import { FC, useCallback, useEffect, useState } from "react";
import { TxHashDiv } from "../../components/TxHashDiv";
import useTxHash from "../../../hooks/useTxHash";
import {useUserContract} from "pix0-react";
import { TfiGift } from "react-icons/tfi";
import { PulseLoader as Loader } from "react-spinners";
import { Coin, toCoinStr} from 'pix0-js';

export const RewardsView : FC = () =>{

    const [totalRewards, setTotalRewards] = useState<Coin>();

    const [processing, setProcessing] = useState(false);

    const { getOutstandingRewards, withdrawRewards } = useUserContract();

    const {txHash , setTxHash} = useTxHash();

    const claimRewards = async () =>{

        setProcessing(false);

        let tx = await withdrawRewards();

        console.log("tx:::", tx);

        setTxHash(tx);

        setProcessing(false);
        
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
        <div className="mb-6 mx-auto">
            <TfiGift className="w-24 h-24 mx-auto"/>
        </div>
        {totalRewards ? <div className="p-2 mt-4 text-lg">
            Available Rewards:<span className="ml-2 font-bold">{toCoinStr(
                parseInt(totalRewards?.amount ?? "0"),4)} CONST</span>
        </div> : <Loader color="white" size={6}/>}
        
        {totalRewards && <div onClick={async (e)=>{
            await claimRewards();
        }}
        className="mt-4 font-bold mb-4 bg-green-800 text-gray-100 p-2 rounded-3xl cursor-pointer"
        style={{minWidth:"120px"}}>Claim</div>}
    </div>

}