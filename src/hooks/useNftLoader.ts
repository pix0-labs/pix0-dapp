import { useCallback, useState, useEffect } from "react";
import { Nft, SimpleCollectionInfo } from 'pix0-js';
import useCollectionContract from "pix0-react";
import placeholder from '../images/placeholder2.png';


export function useNftLoader (tokenId : string) {

    const [token, setToken] = useState<Nft>();

    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(placeholder);

    const {getNftTokenInfo} = useCollectionContract();


    const isImagePlaceHolder = () : boolean =>{

        return image === placeholder;
    }

    const getCollectionName = () =>{
        let sis =  token?.extension.attributes?.filter(a=>{return a.trait_type === "collection-info"});
        if (sis && sis.length  > 0 ){

            let sis0 = JSON.parse(sis[0].value) as SimpleCollectionInfo;
            return sis0.collection_name;
        }

        return "";
    }

    const fetchToken = useCallback(async ()=>{

        setImage(placeholder);
     
        try {
            setLoading(true);
            let tk = await getNftTokenInfo(tokenId);
            setToken(tk);
            
         
            setImage(tk.extension.image ?? placeholder);
            setLoading(false);

        }
        catch(e  : any) {

            setLoading(false);
        }
    },[tokenId]);

    useEffect(()=>{
        fetchToken();
    },[fetchToken]);

    return {token,fetchToken,loading, image, getCollectionName, isImagePlaceHolder};
} 
