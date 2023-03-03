import { FC} from "react";
import {connectWallet} from 'pix0-react2-arch-test';

export const ConnectWalletButton : FC = () =>{


    return <div><button style={{background:"#348",color:"white",width:"150px",
    padding:"10px",margin:"10px", borderRadius:"20px",border:"0px", cursor:"pointer"}}
    onClick={async (e)=>{

        e.preventDefault();
        try {
            await connectWallet();
        }
        catch(e : any){
            alert("Error.connect.wallet::"+ e);
            console.log("Error.connect.wallet::", e);
        }
    }}>    
    Connect Wallet
    </button><br/>
    <button style={{background:"#375",color:"white",width:"250px",
    padding:"10px",margin:"10px", borderRadius:"20px",border:"0px", cursor:"pointer"}}
    onClick={async (e)=>{

        e.preventDefault();
        try {
            await connectWallet(true);
        }
        catch(e : any){
            alert("Error.connect.wallet::"+ e);
            console.log("Error.connect.wallet::", e);
        }
    }}>    
    Connect Wallet Experimental Chain
    </button>
    </div>
}