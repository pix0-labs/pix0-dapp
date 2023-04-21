import { FC, useState } from "react";
import { TxHashDiv } from "../../components/TxHashDiv";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { useNftLoader } from "../../../hooks/useNftLoader";
import { NFTTraitsView } from "./NFTTraitsView";
import { TfiClose} from 'react-icons/tfi';
import { IoInformationCircle } from "react-icons/io5";
import { SellOfferFormPopup } from "./SellOfferFormPopup";
import { TxNftFormPopup } from "./TxNftFormPopup";
import { PulseLoader as Loader } from "react-spinners";
import useCollectionContract from "pix0-react";
import useUserContract from "../../../hooks/useUserContract";
import useTxHash from "../../../hooks/useTxHash";
import { TokenImageView } from "../../components/TokenImageView";
import '../../css/Img.css';

type props = {

    tokenId: string ,

    backToList?: () => void, 
}


export const NFTDetailsView : FC <props>= ({
    tokenId, backToList
}) =>{

    const {token,loading} = useNftLoader(tokenId);

    const {txHash, setTxHash} = useTxHash();

    const {burnNft} = useCollectionContract();

    const [processing, setProcessing] = useState(false);

    const {isProfileImageUsing} = useUserContract();

    const burn = async () =>{

        setProcessing(true);

        let tx = await burnNft(tokenId);

        setTxHash(tx);

        setProcessing(false);

        setTimeout(()=>{
            if ( backToList )
                backToList();
        }, 5000);

    }


    const actionButtons = !isProfileImageUsing(tokenId) ? 
    <>
    <div className="mb-4">
        <SellOfferFormPopup trigger={<button className="bg-blue-900 w-64 font-bold text-gray-200 p-2 rounded-3xl"
        disabled={loading}>Create Sell Offer</button>} token={token}
        tokenId={tokenId}/>
    </div>
    <div className="mb-4">
        <TxNftFormPopup trigger={ 
        <button className="bg-green-900 w-64 font-bold text-gray-200 p-2 rounded-3xl"
        disabled={loading}>Send</button>}
        token={token} tokenId={tokenId}
        />
    </div>
    <div className="mb-4">
        <button className="bg-red-900 w-64 font-bold 
        text-gray-200 p-2 rounded-3xl" 
        disabled={loading || processing}
        onClick={async (e)=>{
            e.preventDefault();
            await burn();
        }}>{processing ? <Loader size={8} color="white"/> : <>Burn</>}</button>
    </div>
    </> :
    <CommonAnimatedDiv className="text-gray-100 text-sm bg-red-900 p-2 rounded"><IoInformationCircle 
    className="mr-2 inline w-5 h-5"/>This NFT is being used as your profile image, therefore you are 
    unable to create a sell offer, transfer it, or burn it!</CommonAnimatedDiv>;

 
    return <CommonAnimatedDiv style={{width:"100%"}}
    className="w-full text-left pt-2 bg-gray-900 text-center rounded-md p-4 mt-4 mr-2">
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
            <TokenImageView image={token?.extension.image}/>
        </div>
        { token && 
        <div className="mb-4">
            <NFTTraitsView nft={token}/>
        </div>}
        {token?.extension.description && 
        <div className="pl-10 p-2 text-gray-200 mb-4 mx-auto w-3/5 text-center">
            {token.extension.description}
        </div>}
        {!loading && actionButtons}
      
   </CommonAnimatedDiv>
}