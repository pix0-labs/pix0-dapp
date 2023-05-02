import { FC } from "react";
import { usePagination, PageParam, DOTS } from "../../hooks/usePagination";
import './css/Pagi.css';

type props = {

    param : PageParam,

    onPageChange?: (page : number) => void, 
}

export const PaginationView : FC <props> = ({
    param, onPageChange
}) =>{

    const {paginationRange} = usePagination(param);

    const onNext = () => {
        if (onPageChange)
            onPageChange(param.currentPage + 1);
    };
    
    const onPrev = () => {
        if (onPageChange)
           onPageChange(param.currentPage - 1);
    };

    const onPgChange = (pg : string|number ) => {
        if (onPageChange) {
            if ( typeof pg === 'string') {
                onPageChange(parseInt(pg));
            }
            else {

                onPageChange(pg);
            }
        }
    };

    const lastPage = paginationRange ? paginationRange[paginationRange.length - 1] : 1;

    return (param.totalCount > param.pageSize) ? <div className="pagination-container text-gray-100">
         <button className="pagination-item" disabled ={param.currentPage === 1} onClick={onPrev}>
         &lt;
         </button>
        {paginationRange?.map(pageNumber => {
            if (pageNumber === DOTS) {
                return <div className="pagination-item dots">{DOTS}</div>;
            }

            return (
                <button className={pageNumber === param.currentPage ? "pagination-item-sel" : "pagination-item" }
                onClick={() => onPgChange(pageNumber)}>
                {(typeof pageNumber !== 'string' && pageNumber < 10) ? `0${pageNumber}` : pageNumber}
                </button>
            );
        })}
         <button className="pagination-item" disabled ={param.currentPage === lastPage } onClick={onNext}>
        &gt;
        </button>

    </div> : <></>;
}