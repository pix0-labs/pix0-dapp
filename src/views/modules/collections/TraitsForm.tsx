import { FC } from "react";
import { Item, Trait } from "pix0-js-arch-test";
import { Tooltip } from "../../components/InfoPopup";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { FiPlus, FiMinusCircle } from "react-icons/fi";

type props = {

    item : Item,

    setItem: (item : Item) => void, 
}

export const TraitsForm : FC <props> = ({
    item, setItem
}) =>{


   
    const addTrait = () => {

        let traits = item.traits;

        if (traits === undefined || (traits?.length ?? 0) === 0 ){
            traits = [];
            let ro : Trait = {
                trait_type : "",
                value : "", 
                display_type : "",   
            };

            
            traits.push(ro);

        }
        else {

            traits.push ({
                trait_type : "",
                value : "", 
                display_type : "",   
            });
        }

        setItem({...item, traits :traits});
    }


    const removeTraitAt = (index? : number) => {

        let traits = item.traits;
      
        if (index !== undefined && traits && traits[index] !== undefined ) {

            traits.splice(index, 1);

        }
        setItem({...item, traits :traits});  
    }



    const setTraitAt = ( index : number, 
        prm : {trait_type?  : string, value? : string, display_type? : string  }  ) =>{

        let traits = item.traits;

        if (traits !== undefined) {

            if (prm.trait_type !== undefined) {

                traits[index].trait_type = prm.trait_type;
            }

            if (prm.display_type !== undefined) {
                traits[index].display_type = prm.display_type;
            }
            
            if (prm.value !== undefined) {
                traits[index].value = prm.value;
            }
            
            setItem({...item, traits : traits});  
        }

    }



    return <div className="p-1">
    <div className="bg-gray-700 text-gray-100 rounded-3xl py-2 px-4 cursor-pointer"
     style={{minWidth:"160px", maxWidth:"180px"}}
    onClick={(e)=>{

        e.preventDefault();
        addTrait();

    }}>
    <FiPlus className="inline mr-2"/>Add Traits
    {Tooltip(`These are the traits of your item`, "right center")}</div>
    { (item.traits && item.traits.length > 0) && 
    <table className="table-auto mt-4 w-3/5">
        <thead>
            <tr className="bg-gray-700"> 
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2 text-left">Trait Type</th>
                <th className="px-4 py-2">Value</th>
                <th className="px-4 py-2">&nbsp;</th>
            </tr>
        </thead> 
        <tbody>  
        {item.traits.map((t, i)=>{

            return <tr className="bg-gray-800 hover:bg-gray-600 hover:cursor-pointer">    
                <td className="px-4 py-2">{(i+1)}.</td>
                <td className="px-4 py-2 text-left">
                <TextField id={`trait_type_${i}`} type="text" placeholder="Trait Type"
                className={commonTextfieldClassName("w-96 block mb-2")}
                onChange={(e)=>{

                    setTraitAt(i,{trait_type : e.target.value});
                    
                }} value={t.trait_type ?? ""}/>
                </td>
                <td className="px-4 py-2">
                <TextField id={`perc_${i}`} type="number" placeholder="Value"
                className={commonTextfieldClassName("w-32 block mb-2")}
                onChange={(e)=>{
                    setTraitAt(i,{value : e.target.value});
                }} value={t.value}/>
                </td>

                <td className="px-4 py-2">
                    <FiMinusCircle className="mb-2" title="Remove this row!" onClick={(e)=>{
                        e.preventDefault();
                        removeTraitAt(i);
                    }}/>
                </td>
            </tr>
        })} 
        </tbody>
    </table>}

    </div>
}