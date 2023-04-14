export enum Page {

    Wallet,

    MintNFT, 

    CreateCollection,

    Market,

    Collectibles,

    UserProfile, 
}

export const SET_PAGE = "SET_PAGE";

export type PageAction = {

    type: string,

    page? : Page,

    param? : any, 

    param2? : any, 

    dateUpdated? : Date, 

}


export function setPage(page : Page, param? : any, param2?: any ) {

    const action: PageAction = {
        type: SET_PAGE,
        page: page,
        param : param, 
        param2 : param2, 
        dateUpdated : new Date(), 
    } 
    return action;
}