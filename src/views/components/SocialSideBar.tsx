import { escape } from 'querystring';
import { FC} from 'react';
import { SiTwitter, SiFacebook, SiReddit} from 'react-icons/si';

type props = {

    url?: string, 

    title? : string,

    iconSize? : {w : number, h: number},
}

export const SocialSideBar : FC<props> = ({
    url, iconSize, title, 
}) =>{

    const iconClassName = `inline-block w-${iconSize?.w ?? 4} h-${iconSize?.h ?? 4}`;

    const currentUrl = window.location.href;

    return <div id="social-share" className="fixed top-1/2 right-0 transform -translate-y-1/2">
        <a target="_blank" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url ?? currentUrl)}`} 
        className="block py-2 px-3 bg-blue-500 
        hover:bg-blue-600 rounded-md text-white mb-2">
            <SiTwitter className={iconClassName}/>
        </a>
        <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url ?? currentUrl)}`} 
        className="block py-2 px-3 bg-blue-700 hover:bg-blue-800 rounded-md text-white mb-2">
            <SiFacebook className={iconClassName}/>
        </a>
        <a target="_blank" 
        href={`https://www.reddit.com/submit?=url=${encodeURIComponent(url ?? currentUrl)}&title=${encodeURIComponent(title ?? "")}`} 
        className="block py-2 px-3 bg-gray-500 hover:bg-gray-600 rounded-md text-white mb-2">
            <SiReddit className={iconClassName}/>
        </a>

    </div>
}