import { WalletConnectionStorage } from 'pix0-react';

export const isValidUrl = (url: string): boolean =>{
    try 
    {
      new URL(url);
      return true;
    } 
    catch (e) {
      return false;
    }
}


export const isHttpOrHttpsUrl= (url: string): boolean =>{
    try 
    {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } 
    catch (e) {
      return false;
    }
}

  /**
   * A function used to check if the owner is the connected wallet
   * @param owner 
   */
export const isConnectedWallet = (owner : string ) : boolean =>{

    let w = WalletConnectionStorage.get();

    if (w !== undefined){
        return w.accounts[0].address === owner;
    }

    return false; 
}

export const connectedWallet = () : string |undefined =>{

  let w = WalletConnectionStorage.get();

  if (w !== undefined){
      return w.accounts[0].address ;
  }

}


export const range = (start : number, end : number ) => {
  
  let length = end - start + 1;
   return Array.from({ length }, (_, idx) => idx + start);
};