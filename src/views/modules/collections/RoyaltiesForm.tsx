import { FC } from "react";
import { Collection, Royalty } from "pix0-js-arch-test";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import {FcDeleteRow} from 'react-icons/fc';

type props = {

    collection : Collection,

    setCollection: (collection : Collection) => void, 
}

export const RoyaltiesForm : FC <props> = ({
    collection, setCollection
}) =>{

    const addRoyalty = () => {

        let royalties = collection.royalties;

        if (royalties === undefined || royalties.length === 0 ){
            royalties = [];
            let ro : Royalty = {
                wallet : "",
                percentage : 100,    
            };

            
            royalties.push(ro);

        }
        else {

            royalties.push({
                wallet:"",
                percentage:100,
            });

        }

        setCollection({...collection, royalties :royalties});
    }


    const removeRoyaltyAt = (index? : number) => {

        let royalties = collection.royalties;
      
        if (index !== undefined && royalties && royalties[index] !== undefined ) {

            royalties.splice(index, 1);

        }
        setCollection({...collection, royalties :royalties});
       
    }

    return <div className="p2">
    <button className="bg-gray-700 text-gray-100 rounded-3xl py-2 px-4"
    onClick={(e)=>{

        e.preventDefault();
        addRoyalty();

    }}>
        Add Royalties</button>
    { (collection.royalties && collection.royalties.length > 0) && 
    <table className="table-auto mt-4 w-3/5">
        <thead>
            <tr className="bg-gray-700">    
                <th className="px-4 py-2 text-left">Wallet</th>
                <th className="px-4 py-2">Percentage</th>
                <th className="px-4 py-2">&nbsp;</th>
            </tr>
        </thead> 
        <tbody>  
        {collection.royalties.map((r, i)=>{

            return <tr className="bg-gray-800 hover:bg-gray-600 hover:cursor-pointer">    
                <td className="px-4 py-2 text-left">
                <TextField id={`wallet_${i}`} type="text" placeholder="Wallet"
                className={commonTextfieldClassName("w-64 block mb-2")}
                onChange={(e)=>{
                    setCollection({...collection, name : e.target.value});
                }} value={collection.name}/>
                </td>
                <td className="px-4 py-2">
                <TextField id={`perc_${i}`} type="text" placeholder="Percentage"
                className={commonTextfieldClassName("w-32 block mb-2")}
                onChange={(e)=>{
                    setCollection({...collection, name : e.target.value});
                }} value={collection.name}/>
                </td>

                <td className="px-4 py-2">
                    <FcDeleteRow className="mb-2" onClick={(e)=>{
                        e.preventDefault();
                        removeRoyaltyAt(i);
                    }}/>
                </td>
            </tr>
        })} 
        </tbody>
    </table>}

    </div>
}