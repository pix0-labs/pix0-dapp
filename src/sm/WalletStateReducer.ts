import * as WalletActions from './WalletActions';


export type WalletState = {

    connected? : boolean,

    dateUpdated? : Date, 

    lastError? : Error, 

}

const INIT_STATE : WalletState = {
    
    dateUpdated : new Date(), 
};


export const WalletReducer = (state : WalletState = INIT_STATE, 
    action : WalletActions.WalletAction ) : WalletState => {

  
    switch(action.type) {

        case WalletActions.CONNECTION :
        
            return {...state, connected : action.connected, 
                dateUpdated : new Date() };

        default :
        
            return state; 
    }
}