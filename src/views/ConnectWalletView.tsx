import { FC, useState} from "react";
import { CommonAnimatedDiv } from "./components/CommonAnimatedDiv";
import { ConnectButton } from "pix0-react";
import useWalletState from "../hooks/useWalletState";
import { Popup} from 'reactjs-popup';
import { AiFillGithub } from "react-icons/ai";
import { BsFiletypeDoc } from "react-icons/bs";
import logo from '../images/pix0_logo1.png';


export const ConnectWalletView : FC = () =>{

    const [error, setError] = useState<Error>();

    const {setWalletConnected} = useWalletState();


    const connectAsMenu =  <Popup contentStyle={{background:"#222",minWidth:"240px"}} 
    arrowStyle={{display:"none"}}
    className="bg-gray-900 text-gray-300 w-64 p-4 m-4"
    trigger={<button className="bg-gray-500 hover:bg-cyan-900 rounded pl-2 pr-2 
    text-xs font-bold text-gray-100">Go to</button>} position="top center">
        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2 font-bold text-sm"
        onClick={(e)=>{
            e.preventDefault();
            document.location.href ="/creator";
        }}
        >Creator</div>
        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2 font-bold text-sm" onClick={async (e)=>{
            e.preventDefault();
            document.location.href ="/collector";
        }}>Collector</div>
        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2 font-bold text-sm" onClick={async (e)=>{
            e.preventDefault();
            document.location.href ="/market";
        }}>Marketplace</div>

  </Popup>


    return <CommonAnimatedDiv className="p-2 mt-20 w-3/5 h-3/5 rounded-3xl bg-gradient-to-b 
    from-gray-800 to-gray-600 mx-auto text-center"> 
    <CommonAnimatedDiv visible={error!==undefined} dismissAfterInSeconds={6}
    className="mx-auto bg-red-600 text-gray-100 rounded-3xl 
    p-2 w-11/12 m-2 font-bold">{error?.message}</CommonAnimatedDiv>
    <img src={logo} className="h-auto mx-auto mb-4 mt-10" style={{minWidth:"220px"}}/>
    <CommonAnimatedDiv className="mt-4 text-gray-100 text-sm font-bold w-3/5 mx-auto p-2"
    duration={2.5}>A mini decentralized social network built on the Archway blockchain that 
    connects NFT creators and collectors</CommonAnimatedDiv>
    <ConnectButton experimental={true}
    className="p-2 mt-4 mb-2 bg-gray-800 w-3/5 hover:bg-cyan-900 
    rounded-3xl mx-auto text-gray-100 font-bold"
    onError={(e)=>{
        setError(e);

        setTimeout(()=>{
            setError(undefined);
        },5000);
    }}
    connectedCallback={()=>{    
        setWalletConnected();
    }}/>
    <div className="mb-2 mt-2 text-sm">{connectAsMenu}</div>   
    <CommonAnimatedDiv className="mt-4 text-gray-100 text-sm font-bold"
    duration={4.5}>Now Live On Archway Testnet</CommonAnimatedDiv>
    <div className="mt-4 text-gray-100 text-xs"><a href="https://docs.pix0.xyz" 
    target="_blank" className="mr-4"><BsFiletypeDoc className="inline w-5 h-5"/></a>
    <a className="ml-4" href="https://github.com/pix0-labs" 
    target="_blank"><AiFillGithub className="inline w-5 h-5"/></a></div>
    </CommonAnimatedDiv>
}