import { FC } from "react";
import { useWalletConnection } from "pix0-react2-arch-test";
import { ItemsView, CollectionView } from 'pix0-react2-arch-test';
import { MintButton, ConnectButton, BalanceView} from 'pix0-react2-arch-test';
import copyIcon from '../images/copy.png';


export const View : FC = () =>{

    const {connected} = useWalletConnection();

    return <>
    { connected ? <>
        <ConnectButton experimental={true}/>
      <p>&nbsp;</p>
      <BalanceView displayDecimals={3} copyIcon={<img src={copyIcon} 
      style={{marginLeft:"4px",width:"20px",height:"20px"}}/>}/>
     
    </> : <>  <CollectionView owner="archway12pcytur9del2t5wm93t8kuqakvf9yk9wzt4w0x"/>
      <p>Collection View 2::<br/>
      <CollectionView owner="archway12pcytur9del2t5wm93t8kuqakvf9yk9wzt4w0x"/>
      </p>

      <MintButton/>
      <p>Items::</p>
      { <ItemsView owner="archway12pcytur9del2t5wm93t8kuqakvf9yk9wzt4w0x" collection_name='Test NFT Collection 2'
      collection_symbol='TNFT2'/>  }
    </>}
    </>
}