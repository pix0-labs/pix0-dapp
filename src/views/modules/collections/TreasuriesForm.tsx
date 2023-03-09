import { FC } from "react";
import { Collection, Treasury } from "pix0-js-arch-test";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import {FcDeleteRow} from 'react-icons/fc';

type props = {

    collection : Collection,

    setCollection: (collection : Collection) => void, 
}

export const TreasuriesForm : FC <props> = ({
    collection, setCollection
}) =>{


    const currentTotalPercentage = () : number  =>{

        let treasuries = collection.treasuries;
        if (treasuries !== undefined) {

            let total = 0;

            for (var r=0; r < treasuries.length; r++){

                total = +treasuries[r].percentage + +total;
            }

            return total;
        }
        else {

            return 0;
        }
    }

    const addTreasury = () => {

        let treasuries = collection.treasuries;

        if (treasuries === undefined || treasuries.length === 0 ){
            treasuries = [];
            let ro : Treasury = {
                wallet : "",
                percentage : 100,    
            };

            
            treasuries.push(ro);

        }
        else {

            let tot = currentTotalPercentage();
            let nv = 100 - tot;
            treasuries.push({
                wallet:"",
                percentage:nv,
            });

        }

        setCollection({...collection, treasuries :treasuries});
    }


    const removeTreasuryAt = (index? : number) => {

        let treasuries = collection.treasuries;
      
        if (index !== undefined && treasuries && treasuries[index] !== undefined ) {

            treasuries.splice(index, 1);

        }
        setCollection({...collection, treasuries :treasuries});  
    }

    const setTreasuryWalletAt = ( index : number, wallet : string  ) =>{

        let treasuries = collection.treasuries;
        if (treasuries !== undefined) {

            treasuries[index].wallet = wallet;
            setCollection({...collection, treasuries :treasuries});  
        }

    }

    const setTreasuryPercentageAt = ( index : number, percentage : number   ) =>{

        let treasuries = collection.treasuries;
        if (treasuries !== undefined) {

            treasuries[index].percentage = percentage;
            setCollection({...collection, treasuries :treasuries});  
        }

    }


    const validPercentage = (index : number, currentValue : number ) : boolean =>{

        let treasuries = collection.treasuries;

        if (treasuries !== undefined) {

            let total : number = 0; 

            for (var r= 0; r < treasuries.length; r++){

                if (r !== index) {

                    total = +total + +treasuries[r].percentage;
                }
            }

            total = +total + +currentValue;

            return (total <= 100);
        }
        else {

            return false; 
        }
    }


    return <div className="p2">
    <button className="bg-gray-700 text-gray-100 rounded-3xl py-2 px-4"
    onClick={(e)=>{

        e.preventDefault();
        addTreasury();

    }}>
        Add Treasuries</button>
    { (collection.treasuries && collection.treasuries.length > 0) && 
    <table className="table-auto mt-4 w-3/5">
        <thead>
            <tr className="bg-gray-700">    
                <th className="px-4 py-2 text-left">Wallet</th>
                <th className="px-4 py-2">Percentage %</th>
                <th className="px-4 py-2">&nbsp;</th>
            </tr>
        </thead> 
        <tbody>  
        {collection.treasuries.map((r, i)=>{

            return <tr className="bg-gray-800 hover:bg-gray-600 hover:cursor-pointer">    
                <td className="px-4 py-2 text-left">
                <TextField id={`wallet_${i}`} type="text" placeholder="Wallet"
                className={commonTextfieldClassName("w-64 block mb-2")}
                onChange={(e)=>{
                    setTreasuryWalletAt(i,e.target.value);
                }} value={r.wallet ?? ""}/>
                </td>
                <td className="px-4 py-2">
                <TextField id={`perc_${i}`} type="number" placeholder="Percentage"
                className={commonTextfieldClassName("w-32 block mb-2")}
                onChange={(e)=>{
                    let v = parseFloat(e.target.value);
                    if (validPercentage(i, v)) {
                        setTreasuryPercentageAt(i,e.target.value);
                    }
                }} value={`${r.percentage ?? 0}`}/>
                </td>

                <td className="px-4 py-2">
                    <FcDeleteRow className="mb-2" onClick={(e)=>{
                        e.preventDefault();
                        removeTreasuryAt(i);
                    }}/>
                </td>
            </tr>
        })} 
        </tbody>
    </table>}

    </div>
}