import { FC, useState } from "react";
import { SellOffer} from 'pix0-js';
import { useNftLoader } from "../../../hooks/useNftLoader";
import useUserContract from "../../../hooks/useUserContract";
import { useMarketContract } from "pix0-react";
import { TxHashDiv } from "../../components/TxHashDiv";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { TfiClose} from 'react-icons/tfi';
import { PulseLoader as Loader } from "react-spinners";
import { TokenImageView } from "../../components/TokenImageView";
import { NFTTraitsView } from "../collector/NFTTraitsView";
import '../../css/Img.css';

type props = {
    offer : SellOffer, 

    backToList?: () => void, 
}

export const SellOfferDetailsView : FC <props> = ({
    offer, backToList 
}) =>{

    const {token, getCollectionName, loading} = useNftLoader(offer.token_id);

    const [txHash, setTxHash] = useState<Error|string>();

    const [processing, setProcessing] = useState(false);

    const {isConnectedWallet} = useUserContract();

    const {cancelSellOffer} = useMarketContract();

    const cancelSellOfferNow = async () =>{

        setProcessing(true);
        let tx = await cancelSellOffer(offer.token_id);
        setTxHash(tx);
        setProcessing(false);
    }


    return <CommonAnimatedDiv style={{width:"100%"}}
    className="w-full text-left pt-2 bg-gray-900 text-center rounded-md p-4 mt-4">
          {txHash && <TxHashDiv txHash={txHash}/>}
        <div className="p-2 rounded-3xl bg-gray-700 text-gray-200 mb-4" style={{minHeight:"40px"}}>
            {backToList && <button style={{minWidth:"70px",border:"1px solid #ccc"}} 
            className="float-right rounded-3xl ml-2 text-sm" onClick={(e)=>{
                e.preventDefault();
                backToList();
            }}><TfiClose className="mr-2 inline h-3 w-3"/>Close</button>}

            {loading && <Loader color="white" size="10"/>}

        </div>
        <div className="mb-1">
            <TokenImageView image={token?.extension.image}/>
        </div>
        {token?.extension.name && <div className="mb-1 font-bold">{token?.extension.name}</div>}
       
        <div className="pl-10 p-2 text-gray-200 mb-1 mx-auto w-3/5 text-center font-bold">
            {getCollectionName()}
        </div>

        {token && <div className="mb-1">
            <NFTTraitsView nft={token}/>
        </div>}

        {isConnectedWallet(offer.owner) && <div className="mt-4 mb-1">
            <button className="rounded-3xl p-2 bg-red-600 text-gray-100 font-bold" style={{minWidth:"120px"}}
            disabled={processing} onClick={async (e)=>{
                e.preventDefault();
                await cancelSellOfferNow();
            }}>
            {processing ? <Loader size="8" color="white"/> : <>Cancel This Sell Offer</>}
            </button>    
        </div>}

      
   </CommonAnimatedDiv>
}