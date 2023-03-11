import { Popup} from 'reactjs-popup';
import { FiInfo } from 'react-icons/fi';
import { PopupPosition } from 'reactjs-popup/dist/types';
import 'reactjs-popup/dist/index.css';

const InfoButton = () =>{

    return <button  className="bg-transparent">
    <FiInfo className="inline m-2"/></button>
}

export const Tooltip = (info? : string, arrowPosition?: PopupPosition|PopupPosition[]) => {
    return <Popup contentStyle={{background:"#222",minWidth:"300px"}} 
    arrowStyle={{color:"#222", border:"1px"}}
    className="bg-gray-800 text-gray-100 w-64 p-4 m-4"
    trigger={InfoButton()} position= {arrowPosition ?? "left center"}>
    <div className="bg-transparent text-gray-100 p-2">{info ?? "Some info here..."}</div>
    </Popup>
}