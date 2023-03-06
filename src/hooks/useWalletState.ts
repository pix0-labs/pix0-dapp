import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { useCallback, useEffect} from "react";
import { WalletState } from "../sm/WalletStateReducer";
import { setWalletConnected as walletAsConnected, setWalletDisconnected as walletDisconnected} from "../sm/WalletActions";


export default function useWalletState() {

    const dispatch: Dispatch<any> = useDispatch();

    const setWalletConnected = useCallback(() => {
        dispatch(walletAsConnected);
    },[dispatch]);

    const setWalletDisonnected = useCallback(() => {
        dispatch(walletDisconnected);
    },[dispatch]);

    const walletState : WalletState =  useSelector(
        (_state: any) => {return _state.walletStateReducer;}, shallowEqual
    );

    const walletConnected : boolean|undefined = walletState.connected;


    return {walletConnected, setWalletConnected, setWalletDisonnected} as const;

}