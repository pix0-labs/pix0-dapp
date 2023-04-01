import { useCallback, useState, useEffect } from "react";
import { Collection, randomNumber, LINK_TYPE_IMAGE_URL} from 'pix0-js';
import { Coin } from 'pix0-js';
import useCollectionContract from "pix0-react";


export function useCollectionInfo(collection : Collection )  {

    const [price, setPrice] = useState<Coin>();

    const [adminFee, setAdminFee] = useState<Coin>();

    const [itemsCount, setItemsCount] = useState(0);

    const {getItemsCount, getCollectionMintingPrice} = useCollectionContract();

    const fetchItemsCount = useCallback(async ()=>{
        let c = await getItemsCount(collection.name, collection.symbol, collection.owner);
        setItemsCount(c);
    },[collection]);

    useEffect(()=>{
        fetchItemsCount();

        let p = getCollectionMintingPrice(collection);
        if (p) setPrice(p.value);

    },[fetchItemsCount]);

    return {itemsCount, price}

}
