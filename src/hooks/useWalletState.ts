import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { useCallback, useEffect} from "react";
import { WalletState } from "../sm/WalletStateReducer";
import { isWalletConnected } from "pix0-react";
import { setWalletConnected as setWalletConn, setWalletDisconnected as setWalletDisconn} from "../sm/WalletActions";


export default function useWalletState() {

    const dispatch: Dispatch<any> = useDispatch();

    const setWalletConnected = useCallback(() => {
        dispatch(setWalletConn());
    },[dispatch]);

    const setWalletDisconnected = useCallback(() => {
        dispatch(setWalletDisconn());
    },[dispatch]);

    const walletState : WalletState =  useSelector(
        (_state: any) => {return _state.walletStateReducer;}, shallowEqual
    );

    const walletConnected : boolean|undefined = walletState.connected;

    useEffect(()=>{

      if (isWalletConnected()){
        setWalletConnected();
      }
      /*
      else {
        setWalletDisconnected();
      }*/

    },[isWalletConnected()]);
   
    return {walletConnected, setWalletConnected, setWalletDisconnected} as const;

}