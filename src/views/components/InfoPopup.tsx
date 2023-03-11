import { Popup} from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FcInfo } from 'react-icons/fc';

const InfoButton = () =>{

    return <button onClick={(e)=>{
        e.preventDefault();
    }} className="bg-transparent">
    <FcInfo className="inline m-2"/></button>
}

export const Tooltip = (info? : string) => {
    return <Popup contentStyle={{background:"#222",minWidth:"300px"}} 
    arrowStyle={{color:"#222", border:"1px"}}
    className="bg-gray-900 text-gray-100 w-64 p-4 m-4"
    trigger={InfoButton()} position="left center">
    <div className="bg-gray-900 text-gray-100">{info}</div>
    </Popup>
}