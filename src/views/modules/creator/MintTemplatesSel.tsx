import { FC } from "react";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import placeholder from '../../../images/placeholder100.svg';

export interface Template {

    icon ? : string,

    name : string,

    id : number, 
}

type props ={

    selectTemplate? : (template : Template ) => void,
}

const templates : Template[] = [
    {name : "Template 1", id : 1}
]


export const getTemplate = (id : number) : Template|undefined =>{

    return templates.filter((t)=>{
        return t.id === id
    })[0];
}

export const MintTemplatesSel : FC<props> = ({
    selectTemplate
}) =>{

    return <CommonAnimatedDiv className="text-center w-full">
        <div className="table-responsive p-1 mt-1 overflow-y-auto overflow-x-hidden">
        <div className="text-gray-100 font-bold text-left text-sm">Choose A Template</div>
        <table className="text-left w-full mt-4 mr-4 border-collapse rounded-md" cellPadding={5} cellSpacing={3}>
        <tbody>
           
        {templates.map((p, i)=>{

            return <tr title="double click to select"
                className="bg-gray-700 hover:bg-gray-600 text-gray-100 cursor-pointer" 
                onClick={()=>{
                    if (selectTemplate){
                        selectTemplate(p);
                    }
                }}><td style={{width:"5%"}} className="text-sm">{(i+1)}.</td>
                <td style={{width:"20%"}}><img src={p.icon ?? placeholder} className="w-5 h-5"/></td>
                <td style={{width:"75%"}} className="text-sm">{p.name}</td></tr>
        })}
        </tbody>
        </table>
        <div className="text-xs text-gray-300 mt-4 text-left">Currently, we have only one template. More to come...</div>
        </div>
    
    </CommonAnimatedDiv>
}