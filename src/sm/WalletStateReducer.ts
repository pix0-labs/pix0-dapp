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
        case WalletActions.SET_CONNECTED :
    
            let stat = {...state, connected : true, 
                dateUpdated : new Date() };
            //console.log("set.connected::", stat);
            
            return stat; 

        case WalletActions.SET_DISCONNECTED :
            return {...state, connected : false, 
            dateUpdated : new Date() };

        default :
        
            return state; 
    }
}