import { FC, useState, useCallback, useEffect } from "react";
import useCollectionContract from "pix0-react";
import { PulseLoader as Loader} from 'react-spinners';
import { SmNftView } from "./SmNftView";
import { AiFillCloseCircle, AiFillInfoCircle } from "react-icons/ai";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";

export const SelNftForSo : FC = () =>{

    const [tokens, setTokens] = useState<string[]>();

    const [contractAddr, setContractAddr] = useState<string>();

    const [showContractAddr, setShowContractAddr] = useState(false);

    const [loading, setLoading] = useState(false);
    
    const {getMintedTokensByOwner, getTokens} = useCollectionContract();

    const showOrHideContractAddr = () =>{
        setShowContractAddr(!showContractAddr);
    }
   
    const fetchDefaultTokens = async () =>{
        let nfts = await getMintedTokensByOwner({});
        setTokens(nfts);
    }

    const fetchTokens = useCallback (async () =>{
        fetchDefaultTokens();
    }, [fetchDefaultTokens]);

    const retrieveTokens = async () =>{

        if (contractAddr && contractAddr.trim() !== "") {
            setLoading(true);
            setTokens([]);
            let toks = await getTokens({}, contractAddr);
            setTokens(toks);

            setLoading(false);
        }
        else {
            window.alert('Invalid contract address!');
        }
    }


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
        {!showContractAddr && <div className="text-sm text-gray-100 ml-1 text-left">
        <AiFillInfoCircle className="mr-1 w-4 h-4 text-gray-100 inline"/>Please be aware that we can only display the NFTs you own through our COLLECTION CONTRACT. 
        If you own NFTs from a different contract, please click <a href="#" onClick={()=>{
            showOrHideContractAddr();
        }}>here</a> to specify the contract address and retrieve them.</div>}
        {showContractAddr && <div className="p-2 text-left">
        <TextField label={<div className="text-xs font-bold">NFT Contract Address:</div>} id="contract_addr" type="text" 
        placeholder="NFT Contract Address" className={commonTextfieldClassName("w-9/12 inline-block")}
        onChange={(e)=>{
            setContractAddr(e.target.value);
        }} value={contractAddr}/> 
        <button className="ml-2 rounded-3xl pl-2 pr-2 font-bold 
        text-sm text-gray-100 inline bg-gray-500"
        onClick={async (e)=>{
            e.preventDefault();
            await retrieveTokens();
        }}
        >{loading ? <Loader color="white" size={6}/> : <>Retrieve</>}</button>
         <button className="ml-2" onClick={async (e)=>{
            e.preventDefault();
            showOrHideContractAddr();   
            await fetchDefaultTokens();
        }}><AiFillCloseCircle className="inline w-5 h-5 text-gray-100"/></button>
        
        </div>}
        <div className="flex flex-wrap items-stretch">
        {
            tokens?.map((t, _i)=>{
                return <SmNftView key={`Nft_${_i}`} tokenId={t} index={_i} contract_addr={contractAddr}/>
            })
        }</div></>
        
        : <CommonMessageDiv className="text-gray-100">You do NOT have any collectibles yet. Go Mint or Buy some NFTs</CommonMessageDiv>
    }

    </CommonAnimatedDiv>

}
