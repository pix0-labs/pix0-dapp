import { FC } from "react";

export interface Item {

    value?: string,

    name? : string, 
}

type Props = {

    items?: Item[],

    firstItem? : Item,

    id? : string,

    defaultValue? : string,

    value? : string, 

    onChange? : (e : any ) => void, 

    className? : string, 
}


export const Select : FC <Props> = ({
    items, firstItem, id , onChange, defaultValue, value, className 
}) =>{

    const defaultClassName = `form-select appearance-none 
    inline-block w-32 px-3 py-1.5 text-base 
    font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300
    rounded transition ease-in-out m-0 mr-10 ml-2
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;


    return <select className={className ?? defaultClassName}
    defaultValue={defaultValue ?? firstItem?.value ?? ""}
    value = { value ?? firstItem?.value ?? ""}
    aria-label="Default select example" onChange={onChange}>
      {firstItem && <option key={`selOpt_${id}_0`} 
      value={firstItem?.value}>{firstItem?.name ?? "Please select"}</option>}
      {
        items?.map((e, i) =>{

            return <option key={`selOpt_${id}_${(i+1)}`} 
                value={e.value}>{e.name}</option>
        })
      }
  </select>
}