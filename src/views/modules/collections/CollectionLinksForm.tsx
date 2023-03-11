import { FC, useState } from "react";
import { Collection } from "pix0-js-arch-test";
import { TextField, commonTextfieldClassName } from "../../components/TextField";

interface Link {
    
    attribute_name : string,
    
    display_name : string,
    
    info : string, 
}

const LINKS  : Link[] = [
    {attribute_name : "WEBSITE", display_name : "Website",
    info : `This can be the external website of the NFT artist or creator, 
    a gallery or museum where the NFT is being exhibited, or any other 
    website that provides more information about the NFT`},

    {attribute_name : "YOUTUBE_URL", display_name : "Youtube URL",
    info : `This is the YouTube Video URL that is related to this NFT collection,
    you can also add on each item, if it's not provided in each item then this will
    be used as the general YouTubde about this NFT collection`},
]


export const setCollectionAttribute = (name : string, value : string,
    collection : Collection, setCollection : (coll : Collection) =>void ) =>  {

    let attbs = collection.attributes;

    if ( attbs === undefined || attbs === null) {
        attbs = [{
            name : name,
            value :value, 
        }];

        setCollection({...collection, attributes : attbs});

    }
    else {

        const filtered = attbs.filter((w)=>{
            return w.name === name;
        });

        
        const indexes = filtered.map(item => attbs?.indexOf(item));
       
       
        if ( indexes[0] !== undefined) {

            attbs[indexes[0]] = {
                name : name,
                value : value 
            }
        }   
        else {

            attbs.push ({
                name : "WEBSITE",
                value : value,        
            });
        }

        setCollection({...collection, attributes : attbs});

    }
}


export const collectionAttributeValue = (name : string, collection : Collection) : string =>{

    let filtered = collection.attributes?.filter(a => {return a.name === name});

    return (filtered !== undefined && filtered?.length > 0) ? filtered[0].value : "";
}



type props = {

    collection : Collection,

    setCollection: (collection : Collection) => void, 
}

export const CollectionLinksForm : FC <props> = ({
    collection, setCollection
}) =>{

    const [links, setLinks] = useState<Link[]>();

    const addLink = () =>{

        if (links === undefined) {

            setLinks([LINKS[0]]);
        }
        else {

            if (links.length < LINKS.length) {

                setLinks([...links, LINKS[1]]);
            }
        }
    }

    return <div className="p-1">
    <button 
    style={{minWidth:"160px"}}
    className="bg-gray-700 text-gray-100 rounded-3xl py-2 px-4"
    onClick={(e)=>{
        e.preventDefault();
        addLink();
    }}>Add Links/Websites</button>

        { (links  && links.length > 0) && 
    <table className="table-auto mt-4 w-3/5"> 
        <tbody> 
            {
                links.map (l=>{

                    return <tr>
                        <td className="px-4 py-2 text-left"><b>{l.display_name}</b></td>
                        <td className="px-4 py-2 text-left"><TextField labelInline={true} id={l.display_name} type="text" 
                        labelRightMargin={"4px"} placeholder={l.display_name}  
                        className={commonTextfieldClassName("w-3/4 inline-block")}
                        onChange={(e)=>{

                            setCollectionAttribute(l.attribute_name,e.target.value, collection, setCollection);

                        }} value={collectionAttributeValue(l.attribute_name, collection)}/>
                        </td>
                    </tr>
                })
            } 
        </tbody>
    </table>}
    </div>
}