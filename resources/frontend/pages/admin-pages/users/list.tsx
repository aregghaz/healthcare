import React, {useEffect, useState} from 'react'
import {AdminApi} from '../../../api/admin-api/admin-api'
import List from '../../layouts/templates/list/list'
import {useNavigate} from '@reach/router'
import Button from "../../../components/button/button";
import s from "../../layouts/templates/list/list.module.scss";
import Select, {IOption, IOptionMultiselect} from '../../../components/select/select'
import {useTranslation} from 'react-i18next'
import Modal from 'react-modal'

interface Beneficiary {
    path: string
}

const Users: React.FC<Beneficiary> = () => {
    const crudKey = 'users'
    const [data, setData] = useState([])
    const [paginated, setPaginated] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [countPages, setCountPages] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [count, setCount] = useState([])
    const [activeItem, setActiveItem] = useState(null)
    const [tourOperator, setTourOperator] = useState([])
    const [countAdmin, setCountAdmin] = useState([])
    const [masterUsers, setMasterUsers] = useState([])
    const [callOperatorUsers, setCallOperator] = useState([])
    const [optionsSelect, setOptionsSelect] = useState([])

    const navigate = useNavigate()
    const {t} = useTranslation()
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.getAllData(crudKey)
                console.log(data)
                setData(data.users)
                setCount(data.data.count)

            }
        )()
    }, [])

    
    const titles: Array<string> = [
        'id',
        'fullName',
        'email',
        'address',
        'phone_number',
        'state',
        'birthday',
        'role',
        'image',
        'action',
    ]

    const handlerAddBeneficiaryItem = () => navigate(`/admin/adminBeneficiaries/create`)


    const handlerCloseModal = () => {
        setIsModalOpen(false)
    }
    const handlerDeleteModal = (id: number) => {
        setDeleteId(id)
        setIsModalOpen(true)
    }


    const handlerDeleteItem = () => {

        AdminApi.delete(crudKey, deleteId).then(data => {
            setData(data.data.beneficiaries)
            setIsModalOpen(false)
        })
    }
    const handlerEditBeneficiaryItem = (id: number) => navigate(`/admin/${crudKey}/${id}`)
    const HandlerGetProducts = (id: number) => navigate(`/admin/users-products/${id}`)

    const HandlerPagination = (activeItem: number) => {
        const role = localStorage.getItem('role');
        localStorage.setItem('page', activeItem.toString());
        // BeneficiaryItemAPI.getUserByRole(crudKey, role, activeItem).then((data) => {
        //     setCountPages(data.show)
        //     setActiveItem(data.page)
        //     setCountAdmin(data.data.adminUsers)
        //     setMasterUsers(data.data.masterUsers)
        //     setCallOperator(data.data.callOperatorUsers)
        //     setTourOperator(data.data.tourOperatorOperatorUsers)
        //     setData(data.data.beneficiaries)
        //     setCount(data.data.count)
        //     setData(data.data)
        //
        // })

    }

    const customStyles: ReactModal.Styles = {
        content: {
            position: 'fixed',
            border: 'none',
            overflowY: 'unset',
            outline: 'none',
            top: '50%',
            left: '50%',
            transform: 'translate(-50% , -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '290px'
        },
        overlay: {
            zIndex: 400,
            background: 'rgba(0, 0, 0, 0.35)',
            backdropFilter: 'blur(5px)'
        }
    }


    return (
        data &&
        <>
            <List
                data={data}
                titles={titles}
                isDelete
                isEdit
                paginated={false}
                isCreate
                isGetItems
                handlerAddItem={handlerAddBeneficiaryItem}
                handlerDeleteItem={handlerDeleteModal}
                handlerEditItem={handlerEditBeneficiaryItem}
                HandlerPagination={HandlerPagination}
                HandlerGetProducts={HandlerGetProducts}
                count={countPages}
                activeItem={activeItem}
                className={'pagination'}
            />
            <Modal
                isOpen={isModalOpen !== false}
                style={customStyles}
                onRequestClose={handlerCloseModal}
            >
                <div className={s.modalBody}>
                    <div className={s.iconWrapper}>
                        <i className='cancelicon-'
                           onClick={handlerCloseModal}
                        />
                    </div>

                    <i className={`binicon- ${s.icon}`}/>
                    <p className={s.text}>{t('do_you_want_to_delete')}</p>
                    <div className={s.buttons}>
                        <Button type={'green'} onClick={handlerDeleteItem}
                                className={s.button}>{t('yes')}</Button>
                        <Button type={'transparent'} onClick={handlerCloseModal} className={s.button}>{t('no')}</Button>
                    </div>
                </div>
            </Modal>

        </>
    )
}


export default Users
