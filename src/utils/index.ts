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