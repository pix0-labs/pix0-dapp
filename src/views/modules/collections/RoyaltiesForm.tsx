import { FC } from "react";
import { Collection, Royalty } from "pix0-js-arch-test";
import { Tooltip } from "../../components/InfoPopup";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { FiMinusCircle, FiPlus } from "react-icons/fi";


type props = {

    collection : Collection,

    setCollection: (collection : Collection) => void, 
}

export const RoyaltiesForm : FC <props> = ({
    collection, setCollection
}) =>{


    const currentTotalPercentage = () : number  =>{

        let royalties = collection.royalties;
        if (royalties !== undefined) {

            let total = 0;

            for (var r=0; r < royalties.length; r++){

                total = +royalties[r].percentage + +total;
            }

            return total;
        }
        else {

            return 0;
        }
    }

    const addRoyalty = () => {

        let royalties = collection.royalties;

        if (royalties === undefined || (royalties?.length ?? 0) === 0 ){
            royalties = [];
            let ro : Royalty = {
                wallet : "",
                percentage : 100,    
            };

            
            royalties.push(ro);

        }
        else {

            let tot = currentTotalPercentage();
            let nv = 100 - tot;
            royalties.push({
                wallet:"",
                percentage:nv,
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

    const setRoyaltyWalletAt = ( index : number, wallet : string  ) =>{

        let royalties = collection.royalties;
        if (royalties !== undefined) {

            royalties[index].wallet = wallet;
            setCollection({...collection, royalties :royalties});  
        }

    }

    const setRoyaltyPercentageAt = ( index : number, percentage : number   ) =>{

        let royalties = collection.royalties;
        if (royalties !== undefined) {

            royalties[index].percentage = percentage;
            setCollection({...collection, royalties :royalties});  
        }

    }


    const validPercentage = (index : number, currentValue : number ) : boolean =>{

        let royalties = collection.royalties;

        if (royalties !== undefined) {

            let total : number = 0; 

            for (var r= 0; r < royalties.length; r++){

                if (r !== index) {

                    total = +total + +royalties[r].percentage;
                }
            }

            total = +total + +currentValue;

            return (total <= 100);
        }
        else {

            return false; 
        }
    }


    return <div className="p-1">
    <div style={{minWidth:"160px", maxWidth:"200px"}}
    className="bg-gray-700 text-gray-100 rounded-3xl py-2 px-4 cursor-pointer"
    onClick={(e)=>{

        e.preventDefault();
        addRoyalty();

    }}>
    <FiPlus className="inline mr-2"/> Add Royalties
    {Tooltip(`You can add a number of wallets here who will receive the percentage 
    of royalty accordingly upon an item sale on the marketplace!`, "right center")} 
    </div>
    { (collection.royalties && collection.royalties.length > 0) && 
    <table className="table-auto mt-4 w-3/5">
        <thead>
            <tr className="bg-gray-700">    
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2 text-left">Wallet</th>
                <th className="px-4 py-2">Percentage %</th>
                <th className="px-4 py-2">&nbsp;</th>
            </tr>
        </thead> 
        <tbody>  
        {collection.royalties.map((r, i)=>{

            return <tr className="bg-gray-800 hover:bg-gray-600 hover:cursor-pointer">   
                <td className="px-4 py-2">{(i+1)}.</td>
                <td className="px-4 py-2 text-left">
                <TextField id={`wallet_${i}`} type="text" placeholder="Wallet"
                className={commonTextfieldClassName("w-96 block mb-2")}
                onChange={(e)=>{
                    setRoyaltyWalletAt(i,e.target.value);
                }} value={r.wallet ?? ""}/>
                </td>
                <td className="px-4 py-2">
                <TextField id={`perc_${i}`} type="number" placeholder="Percentage"
                className={commonTextfieldClassName("w-32 block mb-2")}
                onChange={(e)=>{
                    let v = parseFloat(e.target.value);
                    if (validPercentage(i, v)) {
                        setRoyaltyPercentageAt(i,e.target.value);
                    }
                }} value={`${r.percentage ?? 0}`}/>
                </td>

                <td className="px-4 py-2">
                    <FiMinusCircle className="mb-2" 
                    title="Remove this row!" onClick={(e)=>{
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