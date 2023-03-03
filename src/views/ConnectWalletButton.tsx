import { FC } from "react";
import {connectWallet} from 'pix0-react2-arch-test';

export const ConnectWalletButton : FC = () =>{

    return <button style={{background:"#348",color:"white",width:"150px",
    padding:"10px",margin:"10px", borderRadius:"20px",border:"0px", cursor:"pointer"}}
    onClick={async (e)=>{

        e.preventDefault();
        try {
            let c = await connectWallet();
            console.log("Connected.wallet.params::",c);
    
        }
        catch(e : any){
            alert("Error.connect.wallet::"+ e);
            console.log("Error.connect.wallet::", e);
        }
    }}>    
    Connect Wallet
    </button>
}