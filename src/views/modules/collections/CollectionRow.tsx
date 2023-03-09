import { FC } from "react";
import { Collection } from "pix0-js-arch-test";
import { statusText } from "./CollectionsListView";
import { AiOutlineMore} from 'react-icons/ai';

type props = {

    collection : Collection,

}



export const CollectionRow : FC <props> = ({
    collection
}) =>{

    return <tr className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer">
        <td className="px-4 py-2 text-left">{collection.name}</td>
        <td className="px-4 py-2">{collection.symbol}</td>
        <td className="px-4 py-2">{collection.description}</td>
        <td className="px-4 py-2">{"0"}</td>
        <td className="px-4 py-2">{statusText(collection.status ?? 0)}</td>
        <td className="px-4 py-2 text-center">
        <button className="bg-gray-600 hover:bg-cyan-900 rounded-3xl p-2">
        <AiOutlineMore/></button></td>
    </tr>
}