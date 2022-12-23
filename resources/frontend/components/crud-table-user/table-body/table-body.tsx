import React from 'react'
import TableRow from '../table-row/table-row'
import TableData from '../table-data/table-data'
import TrashIcon from '-!svg-react-loader!../../../images/trash.svg'
import EditIcon from '-!svg-react-loader!../../../images/edit.svg'
import OrdersIcon from '-!svg-react-loader!../../../images/my-orders.svg'
import s from '../crud-table.module.scss'
import {IClientsData} from '../../../types/home-types'

interface ITableBody {
    data: Array<any>
    HandlerGetProducts?: (id: number) => void
    handlerGetclientData?: (data: number) => void
}

const TableBody: React.FC<ITableBody> = (
    {
        data,
        handlerGetclientData
    }) => {

    return (
        <tbody>
        {
            data
                .map((item, index) => {
                    const keys = Object.keys(item)
                
                    return  keys.length > 0 && (
                        <TableRow key={index} data-rowid={item['id']}>
                            {keys
                                .map((key: React.Key, index: number) => {
                                        // if (key === 'image') {
                                        //     return (
                                        //         <TableData key={key}>
                                        //             <img
                                        //                 src={item[key] ? item[key] : '/uploads/partners/avatar.png' }
                                        //                 alt={key}
                                        //                 className={s.img}
                                        //             />
                                        //         </TableData>
                                        //     )
                                        // }

                                        return  index !== 0 &&  (
                                            <TableData key={key} item={item} handlerGetclientData={handlerGetclientData}>
                                                {item[key]}
                                            </TableData>
                                            
                                        )
                                    }
                                )
                            }

                            {

                                // <TableData  item={item} handlerGetclientData={handlerGetclientData}>
                                //     <div className={s.iconsWrapper}>
                                //         <OrdersIcon className={s.editIcon} />

                                //     </div>
                                // </TableData>
                            }

                        </TableRow>
                    )
                })
        }
        </tbody>
    )
}


export default TableBody
