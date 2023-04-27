import { FC , useState, useEffect, useCallback} from "react";
import { MintPage, mintPageLogoUrl} from 'pix0-js';
import { TxHashDiv } from "../../../components/TxHashDiv";
import useTxHash from "../../../../hooks/useTxHash";
import { PulseLoader as Loader } from "react-spinners";
import { ConnectButton } from "pix0-react";
import {useBalanceQuerier} from "../../../../hooks/useBalanceQuerier";
import { useCollectionInfo } from "../../../../hooks/useCollectionInfo";
import { CommonAnimatedDiv } from "../../../components/CommonAnimatedDiv";
import useCollectionContract from "pix0-react";
import useWalletState from "../../../../hooks/useWalletState";
import {toCoinStr, Collection} from 'pix0-js';
import { FcInfo } from "react-icons/fc";

type props = {

    mintPage : MintPage,
}

export const Template1 : FC <props> = ({
    mintPage
}) =>{

    const {txHash, setError, setTxHash} = useTxHash();

    const [processing, setProcessing] = useState(false);

    const {fetchBalance} = useBalanceQuerier({});

    const {mintItem, getCollection} = useCollectionContract();

    const {setWalletConnected, walletConnected} = useWalletState();

    const [collection, setCollection] = useState<Collection>({
        owner : "", prices: [], symbol : "", name : "",
    });

    const fetchCollection = useCallback(async () =>{
        let c = await getCollection({
            owner : mintPage.owner ?? "",
            name : mintPage.collection_name,
            symbol : mintPage.collection_symbol, 
        });

        setCollection(c);
    },[mintPage]);

    const {totalFee, adminFee} = useCollectionInfo(collection);

    const mintOrConnButt = () =>{

        if (!walletConnected){

            return <ConnectButton experimental={true}
            className="p-2 mt-4 mb-2 bg-gray-800 w-3/5 hover:bg-cyan-900 
            rounded-3xl mx-auto text-gray-100 font-bold"
            onError={(e : Error)=>{
                setError(e);
            }}
            connectedCallback={()=>{    
                setWalletConnected();   
            }}/>
        }

        return <button className="rounded-3xl bg-green-900 font-bold p-2 text-gray-200 w-64"
        disabled={processing} onClick={async (e)=>{
            e.preventDefault();
            await mintNow();
        }}>
         {processing ? <Loader size={"10"} color="white"/> :<>Mint NFT</>}
        </button>
    }

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

    useEffect(()=>{
        fetchCollection();
    },[fetchCollection]);

    return <CommonAnimatedDiv className="rounded p-1 bg-gray-800 text-gray-100 m-2 mx-auto h-full w-4/5">

    <div className="p-2 mx-auto w-3/5 bg-gray-700 rounded m-10 mb-10">
        <div className="text-gray-100 text-sm font-bold mb-4 mx-auto text-center">{mintPage.collection_name}</div>
        <div className="text-gray-100 text-sm font-bold mb-4">
            <img src={mintPageLogoUrl(mintPage)} className="rounded-full mx-auto"
            style={{maxWidth:"300px",maxHeight:"200px"}}/>
        </div>
        <div className="text-gray-100 text-sm font-bold mb-4 mx-auto text-center truncate">{mintPage.description}</div>
        {txHash && <TxHashDiv txHash={txHash}/>}

        <div className="border-t-8 border-b-8 border-double border-gray-500 p-4 w-64 mx-auto mb-4">
            Price :<span className="ml-2 font-bold">{toCoinStr(parseInt(totalFee().amount), 4)} CONST</span>
            <div className="text-xs">+ Admin Fee :<span className="ml-2 font-bold">
            ≈{toCoinStr(parseInt(adminFee?.amount ?? "0"), 5)} CONST   
            </span></div>
        </div>
       
        <div className="text-gray-100 text-sm font-bold mb-4 mx-auto text-center">
        {mintOrConnButt()}
        </div>
        <div className="text-xs mt-10 mx-auto w-2/5 text-center"><FcInfo className="mr-2 inline w-4 h-4 mb-1"/>
        You'll randomly mint any item from this collection</div>

    </div>
    </CommonAnimatedDiv>
}