import { FC, useState, useEffect, useCallback } from "react";
import { Collection } from "pix0-js-arch-test";
import { useCollectionContract } from "pix0-react2-arch-test";



type props = {
    owner? : string, 
}

export const CollectionView : FC <props> = ({
    owner
}) =>{

    const [collections, setCollections] = useState<Collection[]>();

    const {getCollections} = useCollectionContract();

    const fetchCollections = useCallback( async () => {

        let coll = await getCollections(owner ?? "");
        setCollections(coll);
    },[owner]);


    useEffect(()=>{
        fetchCollections();
    },[]);


    return <div>
        {

            collections?.map(c=>{

                return <div style={{textAlign:"justify",padding:"10px"}}>
                    <div>
                    Name: {c.name}
                    </div>
                    <div>
                    Symbol: {c.symbol}
                    </div>
                    <div>
                    Description: {c.description}
                    </div>
                    <div>
                    Owner: {c.owner}
                    </div>
                </div>
            })
        }

        <p></p>
    </div>
}