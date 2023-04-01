import { useCallback, useState, useEffect } from "react";
import { Collection, randomNumber, LINK_TYPE_IMAGE_URL} from 'pix0-js';
import { Coin } from 'pix0-js';
import useCollectionContract from "pix0-react";


export function useCollectionInfo(collection : Collection )  {

    const [price, setPrice] = useState<Coin>();

    const [adminFee, setAdminFee] = useState<Coin>();

    const [itemsCount, setItemsCount] = useState(0);

    const {getItemsCount, getCollectionMintingPrice, getMintingFee} = useCollectionContract();

    const fetchItemsCount = useCallback(async ()=>{
        let c = await getItemsCount(collection.name, collection.symbol, collection.owner);
        setItemsCount(c);
    },[collection]);

    const fetchMintingAdminFee = useCallback( async () =>{
        let a = await getMintingFee();
        setAdminFee(a);    
    },[]);


    const totalFee = () : Coin => {

        let t = parseInt(price?.amount ?? "0")
        + parseInt(adminFee?.amount ?? "0");

        return {amount : `${t}`, denom : price?.denom ?? "uconst"};
    }

    useEffect(()=>{
        fetchItemsCount();

        fetchMintingAdminFee();

        let p = getCollectionMintingPrice(collection);
        if (p) setPrice(p.value);
        
    },[fetchItemsCount, fetchMintingAdminFee]);

    return {itemsCount, price, adminFee, totalFee}

}
