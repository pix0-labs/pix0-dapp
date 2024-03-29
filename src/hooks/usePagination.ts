import { useMemo, useState } from "react";
import { range } from "../utils";


export interface PageParam {

    totalCount : number ,
    pageSize : number,
    siblingCount : number,
    currentPage : number, 

}

export const DEFAULT_PAGE_PARAM : PageParam  = {
    totalCount : 0,
    pageSize : 10,
    siblingCount : 1,
    currentPage : 1, 
}


export const DOTS : string  = "...";

export const usePagination = ( pageParam : PageParam) => {

    const [total, setTotal] = useState(0);

    const [start, setStart] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);

    const [isPaginationAction, setIsPaginationAction] = useState(false);


    const onPageChange = (pg : number) => {
        setCurrentPage(pg);
        let st = (pg - 1) * pageParam.pageSize;
        setStart(st);
        setIsPaginationAction(true);
    }

    const paginationRange = useMemo(() => {

        const totalPageCount = Math.ceil(pageParam.totalCount / pageParam.pageSize);
    
        // Pages count is determined as pageParam.siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = pageParam.siblingCount + 5;
    
        /*
            Case 1:
            If the number of pages is less than the page numbers we want to show in our
            paginationComponent, we return the range [1..totalPageCount]
        */
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }
        
        /*
            Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
        */
        const leftSiblingIndex = Math.max(pageParam.currentPage - pageParam.siblingCount, 1);
        const rightSiblingIndex = Math.min(
            pageParam.currentPage + pageParam.siblingCount,
            totalPageCount
        );
    
        /*
            We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
        */
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
    
        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;
    
        /*
            Case 2: No left dots to show, but rights dots to be shown
        */
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * pageParam.siblingCount;
            let leftRange = range(1, leftItemCount);
    
            return [...leftRange, DOTS, totalPageCount];
        }
    
        /*
            Case 3: No right dots to show, but left dots to be shown
        */
        if (shouldShowLeftDots && !shouldShowRightDots) {
            
            let rightItemCount = 3 + 2 * pageParam.siblingCount;
            let rightRange = range(
            totalPageCount - rightItemCount + 1,
            totalPageCount
            );
            return [firstPageIndex, DOTS, ...rightRange];
        }
        
        /*
            Case 4: Both left and right dots to be shown
        */
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [pageParam.totalCount, pageParam.pageSize, pageParam.siblingCount, pageParam.currentPage]);
  
    return {paginationRange, onPageChange, total, currentPage, 
        start, setTotal,isPaginationAction, setIsPaginationAction};
};