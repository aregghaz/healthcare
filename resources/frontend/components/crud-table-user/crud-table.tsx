import React from 'react'
import TableHead from './table-head/table-head'
import TableBody from './table-body/table-body'
import s from './crud-table.module.scss'
import TableFoot from "./table-foot/table-foot";
import {IClientsData, ITitle} from '../../types/home-types';
import {ICount} from '../../types/admin';
import {IOption} from '../select/select';


const CrudTable: React.FC<ICrudTable> = (
    {
        data,
        titles,
        HandlerGetProducts,
        className,
        HandlerPagination,
        handlerGetclientData,
        paginated
    }) => {

    return (
        <>
            <table className={s.table}>
                <TableHead titles={titles}/>
                <TableBody
                    data={data}
                    titles={titles}
                    handlerGetclientData={handlerGetclientData}
                    HandlerGetProducts={HandlerGetProducts}
                />

            </table>

            {/* {
                paginated && <TableFoot
                    count={count}
                    last_page={last_page}
                    activeItem={activeItem}
                    handlerChangeItem={HandlerPagination}
                />

            } */}


        </>
    )
}

interface ICrudTable {
    ////FIXME SHOULD ADD TYPE DATA
    data: Array<any>
    titles: Array<IOption>
    paginated?: boolean
    count?: ICount
    className: string
    handlerGetclientData?: (event: any, data: number) => void
    HandlerGetProducts?: (id: number) => void
    HandlerPagination?: (event: any, id: number) => void

}

export default CrudTable
