import { FC, useState, useCallback, useEffect } from "react";
import { useMarketContract } from 'pix0-react';
import { CollectionIndex} from 'pix0-js';
import { CollectionIndexRow } from "./CollectionIndexRow";
import { PulseLoader as Loader} from 'react-spinners';
import { PaginationView } from "../../components/PaginationView";
import { usePagination, PageParam } from "../../../hooks/usePagination";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";


const getTestCollectionIndexes = () => {

    let indexes : CollectionIndex [] = [];

    for (var r=0; r < 10; r++){

        indexes.push ({
            collection_info : {
                owner : `Alice_${r}`,
                collection_name : `Alice Collection 000000${r}`,
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

    const PAGE_PARAM : PageParam  = {
        totalCount : 0,
        pageSize : 5,
        siblingCount : 1,
        currentPage : 1, 
    }
    
   
    const {start, setTotal, isPaginationAction, currentPage, 
        setIsPaginationAction, onPageChange, total} = usePagination(PAGE_PARAM);


    const fetchCollectionIndexes = useCallback(async () =>{

        try {

            if ( !isPaginationAction)
                setLoading(true);

            let c = await getCollectionIndexes (undefined, 3 ,start ,PAGE_PARAM.pageSize);
            if (c.collection_indexes.length > 0 ){
                setIndexes(c.collection_indexes);
            }
            setTotal( c.total ?? 0);
            
            if ( !isPaginationAction)
                setLoading(false);
            else 
                setIsPaginationAction(false);
        }
        catch(e : any){

            setLoading(false);
        }
       
       
    }, [start]);


    useEffect(()=>{
        fetchCollectionIndexes();
    },[fetchCollectionIndexes]);

    return <div className="items-center pt-2 h-full">
    { loading ?

        <div className="text-left p-2"><Loader color="#eee"/></div>
        :
        indexes.length > 0 ?

        <div className="text-left rounded overflow-x-hidden overflow-y-auto w-full">
        <div className="text-gray-100 font-bold mb-2 mt-2">Newly listed collections</div>       
        <table className="text-left w-full mt-4 mr-4 border-collapse rounded-md" cellPadding={5} cellSpacing={3}>
        <thead>
            <tr className="bg-gray-800">
                <th className="sticky top-0" style={{width:"5%"}}>No.</th>
                <th className="sticky top-0" style={{width:"25%"}}>Collection</th>
                <th className="sticky top-0 text-center" style={{width:"25%"}}>Sell Offers</th>
                <th className="sticky top-0 text-center" style={{width:"10%"}}>Date</th> 
                <th className="sticky top-0" style={{width:"10%"}}>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
      
        {
            indexes?.map((c, _i)=>{
                return <CollectionIndexRow key={`CollIdx_${_i}`} collectionIndex={c} index={_i}/>
            })
        }
        </tbody>

        <tr>
            <td colSpan={5}>
                <PaginationView param={{totalCount : total, pageSize :PAGE_PARAM.pageSize, 
                currentPage:currentPage, siblingCount:1}}
                onPageChange={onPageChange}/>
            </td>
        </tr>
        </table>
        </div>

        : <CommonMessageDiv>No collection available for sales</CommonMessageDiv>
    }
    </div>

}