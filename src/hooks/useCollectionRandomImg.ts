import { useCallback, useState, useEffect } from "react";
import { Collection, randomNumber, LINK_TYPE_IMAGE_URL} from 'pix0-js';
import useCollectionContract from "pix0-react";


export function useCollectionRandomImg(collection : Collection )  {

    const {getItems} = useCollectionContract();

    const [img, setImg] = useState<string>();

    const fetchRandomImage = useCallback(async ()=>{

        let items = await getItems(collection.name, collection.symbol, collection.owner);
        let idx = randomNumber(0, items.length -1 );
        let image = items[idx].links.filter(l => {return l.link_type === LINK_TYPE_IMAGE_URL})[0]?.value;
        setImg(image);

    },[]);

    useEffect(()=>{
        fetchRandomImage();
    },[fetchRandomImage]);

    return {fetchRandomImage, img};
    
 }

 export default useCollectionRandomImg;
