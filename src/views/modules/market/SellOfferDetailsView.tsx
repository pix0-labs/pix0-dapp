import { FC, useState } from "react";
import { SellOffer} from 'pix0-js';
import { useNftLoader } from "../../../hooks/useNftLoader";
import { TxHashDiv } from "../../components/TxHashDiv";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { TfiClose} from 'react-icons/tfi';
import { PulseLoader as Loader } from "react-spinners";
import { TokenImageView } from "../../components/TokenImageView";
import '../../css/Img.css';

type props = {
    offer : SellOffer, 

    backToList?: () => void, 
}

export const SellOfferDetailsView : FC <props> = ({
    offer, backToList 
}) =>{

    const {image, token, getCollectionName, loading} = useNftLoader(offer.token_id);

    const [txHash, setTxHash] = useState<Error|string>();


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
      
   </CommonAnimatedDiv>
}