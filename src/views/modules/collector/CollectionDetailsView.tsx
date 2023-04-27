import { FC, useState } from "react";
import useCollectionRandomImg from "../../../hooks/useCollectionRandomImg";
import { Collection } from "pix0-js";
import { TxHashDiv } from "../../components/TxHashDiv";
import { TfiClose} from 'react-icons/tfi';
import { TokenImageView } from "../../components/TokenImageView";
import useTxHash from "../../../hooks/useTxHash";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { useCollectionInfo } from "../../../hooks/useCollectionInfo";
import useCollectionContract from "pix0-react";
import {useBalanceQuerier} from "../../../hooks/useBalanceQuerier";
import { UserViewPopup} from "../user/UserViewPopup";
import { PulseLoader as Loader  } from "react-spinners";
import {toCoinStr} from 'pix0-js';
import { FcInfo } from "react-icons/fc";

type props = {

    collection: Collection,

    backToList?: () => void, 
}

export const CollectionDetailsView : FC <props> = ({
    collection, backToList
}) =>{


    const {img} = useCollectionRandomImg(collection);

    const {totalFee,adminFee} = useCollectionInfo(collection);

    const {txHash, setTxHash, setError} = useTxHash();

    const {mintItem} = useCollectionContract();

    const [processing, setProcessing] = useState(false);

    const {fetchBalance} = useBalanceQuerier({});

    const mintNow = async () =>{

        let bal = await fetchBalance("uconst", 6);
        
        let balv = (bal?.balance ?? 0) * Math.pow(10,6);
        let tot =  parseFloat(totalFee().amount);

        if (balv < tot){

            setError(`Insufficient funds! Required ${toCoinStr(tot)} 
            CONST but has only ${toCoinStr(balv)} CONST`);

            return; 
        }

        setProcessing(true);

        let tx = await mintItem({
            collection_name : collection.name,
            collection_symbol : collection.symbol,
            collection_owner : collection.owner ?? "",
        });

        setTxHash(tx);

        setProcessing(false);

    }


    
    return <CommonAnimatedDiv style={{width:"99%"}}
    className="w-full text-left pt-2 bg-gray-900 text-center rounded-md p-4 mt-4 mr-4">
         {txHash && <TxHashDiv txHash={txHash}/>}
        <div className="p-2 rounded-3xl bg-gray-700 text-gray-200 mb-4">
            {collection.name} {backToList && <button className="float-right"
            onClick={(e)=>{
                e.preventDefault();
                backToList();
            }}><TfiClose className="mr-4"/></button>}
        </div>
        <div className="mb-4">
            <TokenImageView image={img}/>
        </div>

        {collection.owner &&
        <div className="mb-4 items-start">
        <div className="font-bold mb-1 text-sm">Creator:</div><UserViewPopup address={collection.owner}/>
        </div>}

        {collection.description && 
        <div className="pt-2 pb-2 text-gray-200 mb-4 mx-auto w-3/5 text-center">
            {collection.description}
        </div>}

        <div className="border-t-8 border-b-8 border-double border-gray-500 p-4 w-64 mx-auto mb-4">
            Price :<span className="ml-2 font-bold">{toCoinStr(parseInt(totalFee().amount), 4)} CONST</span>
            <div className="text-xs">+ Admin Fee :<span className="ml-2 font-bold">
            ≈{toCoinStr(parseInt(adminFee?.amount ?? "0"), 5)} CONST   
            </span></div>
        </div>
       
        <div className="p-2 mb-4">
            <button className="rounded-3xl bg-green-900 font-bold p-2 text-gray-200 w-64"
            disabled={processing} onClick={async (e)=>{
                e.preventDefault();
                await mintNow();
            }}>
             {processing ? <Loader size={"10"} color="white"/> :<>Mint NFT</>}
            </button>
            <p className="text-xs mt-4"><FcInfo className="mr-2 inline w-4 h-4 mb-1"/>You'll randomly mint any item from this collection</p>
        </div>
    </CommonAnimatedDiv>
}