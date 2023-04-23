import { FC } from "react";

type props = {

    size? : {w?: number, h?: number },

    x? : { direction? : string, margin?: number },
    
    y? : { direction? : string, margin?: number },

    onClick? : () =>void, 
    
}

export const ToggleButton : FC <props> = ({
    size, x, y, onClick
}) =>{

    return  <button style={{marginTop:"6px", minWidth:"24px",
    minHeight:"24px", marginLeft:"220px"}} className={`fixed ${x?.direction ?? "top"}-${x?.margin ?? 10} 
    ${y?.direction ?? "left"}-${y?.margin ?? 20} ml-2 p-2 bg-gray-800 
    text-white rounded`}
    onClick={(e)=>{
        e.preventDefault();
        if ( onClick)onClick();
    }}>
        <svg className={`h-${size?.w ?? 4} w-${size?.w ?? 4}`} viewBox="0 0 20 20" fill="white">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h8a1 1 0 
        110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
    </button>

}