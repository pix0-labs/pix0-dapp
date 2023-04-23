import { FC, useState, useCallback, useEffect } from "react";
import useCollectionContract from "pix0-react";
import { PulseLoader as Loader} from 'react-spinners';
import { SmNftView } from "./SmNftView";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";

export const SelNftForSo : FC = () =>{

    const [tokens, setTokens] = useState<string[]>();

    const [contractAddr, setContractAddr] = useState<string>();

    
    const {getMintedTokensByOwner} = useCollectionContract();


    const showOrHideContractAddr = () =>{
        const e = document.getElementById("nft_contract_addr_id");

        e?.classList.toggle("hidden");
    }
   
    const fetchTokens = useCallback (async () =>{
        
       let nfts = await getMintedTokensByOwner({});
        setTokens(nfts);
    }, []);


    useEffect(()=>{
        fetchTokens();
    },[fetchTokens]);

    return <CommonAnimatedDiv 
    style={{maxHeight:"450px"}}
    className="p-1 items-center text-center mx-auto bg-gray-700 rounded overflow-y-auto">
     {

        tokens === undefined ?

        <div className="text-left p-2"><Loader color="#eee"/></div>
        :
        tokens.length > 0 ?
        <>
        <div className="ml-1 rounded text-gray-100 p-2 font-bold bg-gray-900">Your Collectibales</div>    
        <div className="text-sm text-gray-100 ml-1 text-left">Please be aware that we can only display the NFTs you own through our COLLECTION CONTRACT. 
        If you own NFTs from a different contract, please click <a href="#" onClick={()=>{
            showOrHideContractAddr();
        }}>here</a> to specify the contract address and retrieve them.</div>
        <div className="hidden p-2 text-left" id="nft_contract_addr_id">
        <TextField label={<div className="text-xs font-bold">NFT Contract Address:</div>} id="contract_addr" type="text" 
        placeholder="NFT Contract Address" className={commonTextfieldClassName("w-9/12 inline-block")}
        onChange={(e)=>{
            setContractAddr(e.target.value);
        }} value={contractAddr}/> 
        <button className="ml-2 rounded-3xl pl-2 pr-2 font-bold text-sm text-gray-100 inline bg-gray-500">Fetch</button>
        </div>
        <div className="flex flex-wrap items-stretch">
        {
            tokens?.map((t, _i)=>{
                return <SmNftView key={`Nft_${_i}`} tokenId={t} index={_i}/>
            })
        }</div></>
        
        : <CommonMessageDiv className="text-gray-100">You do NOT have any collectibles yet. Go Mint or Buy some NFTs</CommonMessageDiv>
    }

    </CommonAnimatedDiv>

}
