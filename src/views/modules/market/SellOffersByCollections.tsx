import { FC, useState, useCallback, useEffect } from "react";
import { useMarketContract } from 'pix0-react';
import { CollectionIndex} from 'pix0-js';
import { CollectionIndexView } from "./CollectionIndexView";
import { PulseLoader as Loader} from 'react-spinners';
import { CommonMessageDiv } from "../../components/CommonMessageDiv";


const getTestCollectionIndexes = () => {

    let indexes : CollectionIndex [] = [];

    for (var r=0; r < 10; r++){

        indexes.push ({
            collection_info : {
                owner : `Alice_${r}`,
                collection_name : `Alice Collection ${r}`,
                collection_symbol : `AC${r}`,


            },
            id : `A00${r}`,
            number_of_sell_offers : 10, 
        });
    }

    return indexes;
}



export const SellOffersByCollections : FC = () =>{

    const [indexes, setIndexes] = useState<CollectionIndex[]>(getTestCollectionIndexes());

    const [loading, setLoading] = useState(false);

    const {getCollectionIndexes} = useMarketContract();

    const fetchCollectionIndexes = useCallback(async () =>{

        try {

            setLoading(true);
            let c = await getCollectionIndexes (undefined,0,10);
            if (c.collection_indexes.length > 0 ){
                setIndexes(c.collection_indexes);
            }

            setLoading(false);
        }
        catch(e : any){

            setLoading(false);
        }
       
       
    }, []);


    useEffect(()=>{
        fetchCollectionIndexes();
    },[fetchCollectionIndexes]);

    return <div className="items-center p-2 overflow-x-hidden overflow-y-hidden" style={{maxHeight:"360px",maxWidth:"99%"}}>
    { loading ?

        <div className="text-left p-2"><Loader color="#eee"/></div>
        :
        indexes.length > 0 ?

        <div className="items-center">
        <div className="text-gray-100 font-bold">Available collections for sales</div>    
        {
            indexes?.map((c, _i)=>{
                return <CollectionIndexView key={`CollIdx_${_i}`} collectionIndex={c} index={_i}/>
            })
        }</div>

        : <CommonMessageDiv>No collection available for sales</CommonMessageDiv>
    }
    </div>

}