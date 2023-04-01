import { useCallback, useState, useEffect } from "react";
import { Collection, randomNumber, LINK_TYPE_IMAGE_URL} from 'pix0-js';
import { Coin } from 'pix0-js';


export function useCollectionInfo(collection : Collection )  {

    const [price, setPrice] = useState<Coin>();

}
