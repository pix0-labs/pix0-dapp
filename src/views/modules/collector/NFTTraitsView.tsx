import {FC} from 'react';
import { Nft, Trait, SimpleCollectionInfo} from 'pix0-js';
import { FcNext} from 'react-icons/fc';


type props = {

    nft  : Nft, 
}

export const NFTTraitsView : FC <props> = ({
    nft 
}) =>{

    const traitName = (t : Trait) =>{

        return `${(t.display_type !== undefined && t.display_type.trim() !== "") ? t.display_type : t.trait_type}:`;
    }

    const traitValue = (t : Trait) =>{

        if (t.trait_type === "collection-info") {

            let sm = JSON.parse(t.value) as SimpleCollectionInfo;
            return `${sm.collection_name} (${sm.collection_symbol})`;
        }
        else {
            return t.value;
        }
    }

    const toggleMetadataDetails = () =>{

        const m = document.getElementById("MetadataDetails");

        if ( m !== null) {

            m.classList.toggle("hidden");
        }
    
        const mc = document.getElementById("MetadataExpandIcon");

        if ( mc !== null) {

            mc.classList.toggle("rotate-90");
        }
    }

    return <div><div className="p-2">
        Metadata<FcNext id="MetadataExpandIcon" className="ml-2 w-4 h-4 inline-block transform cursor-pointer"
        onClick={()=>{
            toggleMetadataDetails();
        }}/></div>
        <div className="hidden w-3/5 mx-auto text-left" id="MetadataDetails">
        {
            nft.extension.attributes?.sort((a, b) => a.trait_type.localeCompare(b.trait_type)).map((t,i) =>{

                return <div key={`Nft_trait_${i}`} className="border-b border-gray-500 p-2 hover:bg-gray-700 rounded">
                    <div className="inline-block font-bold mr-2">
                    {
                        traitName(t)
                    }
                </div>
                <div className="inline-block ml-2">
                    {
                        traitValue(t)
                    }
                </div>
                </div>
            })
        }
        </div>
    </div>
}