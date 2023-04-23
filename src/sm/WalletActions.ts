export const CONNECTION = "CONNECTION";

export const SET_CONNECTED = "SET_CONNECTED";

export const SET_DISCONNECTED = "SET_DISCONNECTED";

export type WalletAction = {

    type: string,

    dateUpdated? : Date, 
    
    connected? : boolean, 

}


export function setWalletConnection(connected : boolean) {

    const action: WalletAction = {
        type: CONNECTION,
        connected: connected, 
        dateUpdated : new Date(), 
    } 
  
    return action;
}

export function setWalletConnected() {

    const action: WalletAction = {
        type: SET_CONNECTED,
        connected: true, 
        dateUpdated : new Date(), 
    } 
  
    return action;
}


export function setWalletDisconnected() {

    const action: WalletAction = {
        type: SET_DISCONNECTED,
        connected: true, 
        dateUpdated : new Date(), 
    } 
  
    return action;
}

