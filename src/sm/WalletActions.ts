export const CONNECTION = "CONNECTIOM";

export type WalletAction = {

    type: string,

    dateUpdated? : Date, 
    
    connected? : boolean, 

}


export function setWalletConnected(connected : boolean) {

    const action: WalletAction = {
        type: CONNECTION,
        connected: connected, 
        dateUpdated : new Date(), 
    } 
  
    return action;
}

