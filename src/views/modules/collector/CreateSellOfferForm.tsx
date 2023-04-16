import { FC, useState } from "react";
import { Nft,toUcoin} from 'pix0-js';
import { useMarketContract } from "pix0-react";
import { TxHashDiv } from "../../components/TxHashDiv";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import placeholder from '../../../images/placeholder2.png';


export type props = {

    token? : Nft,

    tokenId? : string, 
}


export const CreateSellOfferForm : FC <props> = ({
    token, tokenId
}) =>{

    const [price, setPrice] = useState<number>(1);

    const [allowedDirectBuy, setAllowedDirectBuy] = useState(true);

    const [txHash, setTxHash] = useState<Error|string>();

    const {createSellOfferFrom} = useMarketContract();

    const setError = (msg : string) =>{

        setTxHash( new Error(msg));
        setTimeout(()=>{
            setTxHash(undefined);
        }, 5000);
    }

    const createSellOffer = async () => {

        if (price === 0) {
            setError('Price must be greater than zero!');
            return; 
        }

        if (tokenId === undefined || token === undefined) {

            setError('Undefined token id or token!');
            return;
        }

        let tx = await createSellOfferFrom({
            token_id : tokenId, price : {
                amount : `${toUcoin(price)}`,
                denom : "uconst",
            }, allowed_direct_buy : allowedDirectBuy, nft : token
        });

        setTxHash(tx);
    }


    const imgView = token?.extension.image ? <a href={token.extension.image}
    target="_blank"><img className="rounded mx-auto" src={token.extension.image} 
    style={{height:"120px",width:"120px",display:"block",border:"5px solid rgba(240,240,250,.35)"}}  
    placeholder={placeholder}/></a> :
    <img src={placeholder} className="mx-auto rounded-full" style={{height:"200px",width:"200px",display:"block"}} 
    placeholder={placeholder}/>;


    return <div className="modal rounded bg-gray-800 w-full text-center text-gray-100 p-2">
    <div className="mb-2 header">Create Sell Offer For</div>
    {txHash && <div className="p-2"><TxHashDiv txHash={txHash}/></div>}
    <div className="content">
        <div className="mb-1">{imgView}</div>
        <div className="mb-6 font-bold text-sm">{token?.extension.name}</div>
        <div className="mb-6"><TextField label={<span className="mr-2 font-bold text-base">Price:</span>} 
        className={commonTextfieldClassName('w-2/12 text-base font-bold min-w-32')}
        type="number" labelInline={true} value={`${price}`} onChange={(e)=>{
            let v = parseFloat(e.target.value);
            if (!isNaN(v) && v >= 0 ){
                setPrice(v);
            }
        }}/><span className="ml-1 font-bold">CONST</span></div>    

        <div className="mb-6">
        <span className="font-bold mr-2">Allowed Direct Buy?</span>
        <input type="checkbox" checked={allowedDirectBuy} onChange={(e)=>{
            setAllowedDirectBuy(e.target.checked);}}/>
        </div> 

         <div className="mb-4"><button className="bg-green-900 p-2 text-base font-bold rounded-3xl text-gray-100"
         style={{minWidth:"120px"}} onClick={async (e)=>{

            await createSellOffer();

         }}>Create</button></div>
        
    </div>
    </div>;
}