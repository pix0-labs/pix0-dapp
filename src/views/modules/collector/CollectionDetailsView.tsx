import { FC, useState } from "react";
import useCollectionRandomImg from "../../../hooks/useCollectionRandomImg";
import { Collection } from "pix0-js";
import { TxHashDiv } from "../../components/TxHashDiv";
import { TfiClose} from 'react-icons/tfi';
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import placeholder from '../../../images/placeholder2.png';
import { useCollectionInfo } from "../../../hooks/useCollectionInfo";
import useCollectionContract from "pix0-react";
import { PulseLoader as Loader  } from "react-spinners";
import {toCoinStr} from 'pix0-js';

type props = {

    collection: Collection,

    backToList?: () => void, 
}

export const CollectionDetailsView : FC <props> = ({
    collection, backToList
}) =>{


    const {img} = useCollectionRandomImg(collection);

    const {price,adminFee} = useCollectionInfo(collection);

    const [txHash, setTxHash] = useState<Error|string>();

    const {mintItem} = useCollectionContract();

    const [processing, setProcessing] = useState(false);

    const setTxHashNow = (tx : Error|string) => {

        setTxHash(tx);
        if ( tx instanceof Error){

            setTimeout(()=>{
                setTxHash(undefined);
            },7000);
        
        }
    }

    const mintNow = async () =>{

        setProcessing(true);

        let tx = await mintItem({
            collection_name : collection.name,
            collection_symbol : collection.symbol,
            collection_owner : collection.owner ?? "",
        });

        setTxHashNow(tx);

        setProcessing(false);

    }


    const imgView = img ? <a href={img}
    target="_blank"><img className="mx-auto rounded-full" src={img} 
    style={{height:"200px",width:"200px",display:"block",border:"10px solid rgba(220,220,230,.45)"}}  
    placeholder={placeholder}/></a> :
    <img src={placeholder} className="mx-auto rounded-full" style={{height:"200px",width:"200px",display:"block"}} 
    placeholder={placeholder}/>;

    return <CommonAnimatedDiv className="w-4/5 text-left pt-2 bg-gray-900 text-center rounded-3xl p-4 mt-4 ml-2">
         {txHash && <TxHashDiv txHash={txHash}/>}
        <div className="p-2 rounded-3xl bg-gray-700 text-gray-200 mb-4">
            {collection.name} {backToList && <button className="float-right"
            onClick={(e)=>{
                e.preventDefault();
                backToList();
            }}><TfiClose className="mr-4"/></button>}
        </div>
        <div className="mb-4">
            {imgView}
        </div>

        {collection.description && 
        <div className="p-2 text-gray-200 mb-4 mx-auto w-3/5">
            {collection.description}
        </div>}

        <div className="border-t-8 border-b-8 border-double border-gray-500 p-4 w-64 mx-auto mb-4">
            Price :<span className="ml-2 font-bold">{toCoinStr(parseInt(price?.amount ?? "0")
            + parseInt(adminFee?.amount ?? "0"), 4)} CONST</span>
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
        </div>
    </CommonAnimatedDiv>
}