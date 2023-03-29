import { FC } from "react";


export const TopMenu : FC = () =>{

    return <div className="bg-gray-700 p-2 text-left w-3/5 shadow-md rounded-3xl ml-2">
    <div className="inline-block p-2 rounded-3xl bg-gray-500 mx-2">Your Collectibles</div>
    <div className="inline-block p-2 rounded-3xl bg-gray-800 mx-2">Mint NFTs from Neighborhood</div>
    <div className="inline-block p-2 rounded-3xl bg-gray-800 mx-2">Simple Mint</div>
   </div>

}