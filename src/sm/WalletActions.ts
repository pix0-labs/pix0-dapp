export const CONNECTED = "CONNECTED";

export const DISCONNECTED = "DISCONNECTED";

export type WalletAction = {

    type: string,

    dateUpdated? : Date, 
    
    connected? : boolean, 

}


export function setWalletConnected() {

    const action: WalletAction = {
        type: CONNECTED,
        connected: true, 
        dateUpdated : new Date(), 
    } 
  
    return action;
}



export function setWalletDisconnected() {

    const action: WalletAction = {
        type: DISCONNECTED,
        connected: false, 
        dateUpdated : new Date(), 
    } 
  
    return action;
}
