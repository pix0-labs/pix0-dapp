import { ItemsView } from 'pix0-react2-arch-test';
import { CollectionView } from 'pix0-react2-arch-test';
import { MintButton} from 'pix0-react2-arch-test';
import { ConnectWalletButton } from './views/ConnectWalletButton';

import './App.css';

function App() {
  return (
    <div className="App" style={{textAlign:"left"}}>
      <ConnectWalletButton/>
      <p>&nbsp;</p>
      <CollectionView owner="archway12pcytur9del2t5wm93t8kuqakvf9yk9wzt4w0x"/>
      <p>Collection View 2::<br/>
      <CollectionView owner="archway12pcytur9del2t5wm93t8kuqakvf9yk9wzt4w0x"/>
      </p>

      <MintButton/>
      <p>Items::</p>
      { <ItemsView owner="archway12pcytur9del2t5wm93t8kuqakvf9yk9wzt4w0x" collection_name='Test NFT Collection 2'
      collection_symbol='TNFT2'/>  }
    </div>
  );
}

export default App;
