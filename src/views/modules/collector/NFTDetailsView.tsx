import { FC, useState } from "react";
import { TxHashDiv } from "../../components/TxHashDiv";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { useNftLoader } from "../../../hooks/useNftLoader";
import { TfiClose} from 'react-icons/tfi';
import { PulseLoader as Loader } from "react-spinners";
import placeholder from '../../../images/placeholder2.png';

type props = {

    tokenId: string ,

    backToList?: () => void, 
}


export const NFTDetailsView : FC <props>= ({
    tokenId, backToList
}) =>{

    const {token,loading} = useNftLoader(tokenId);

    const [txHash, setTxHash] = useState<Error|string>();

    const imgView = token?.extension.image ? <a href={token.extension.image}
    target="_blank"><img className="mx-auto rounded" src={token.extension.image} 
    style={{height:"200px",width:"200px",display:"block",border:"10px solid rgba(240,240,250,.35)"}}  
    placeholder={placeholder}/></a> :
    <img src={placeholder} className="mx-auto rounded-full" style={{height:"200px",width:"200px",display:"block"}} 
    placeholder={placeholder}/>;


    return <CommonAnimatedDiv className="w-4/5 text-left pt-2 bg-gray-900 text-center rounded-3xl p-4 mt-4 ml-2">
          {txHash && <TxHashDiv txHash={txHash}/>}
        <div className="p-2 rounded-3xl bg-gray-700 text-gray-200 mb-4">
            {token?.extension.name} {backToList && <button className="float-right"
            onClick={(e)=>{
                e.preventDefault();
                backToList();
            }}><TfiClose className="mr-4"/></button>}

            {loading && <Loader color="white" size="10"/>}

        </div>
        <div className="mb-4">
            {imgView}
        </div>
        {token?.extension.description && 
        <div className="pl-10 p-2 text-gray-200 mb-4 mx-auto w-3/5 text-center">
            {token.extension.description}
        </div>}

   </CommonAnimatedDiv>
}