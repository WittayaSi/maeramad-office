import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SellerFormModal from '../../components/settings/seller/SellerFormModal'
import SellerTable from '../../components/settings/seller/SellerTable'
import LoadingComponent from '../../components/utillities/LoadingComponent'

import { getSeller, loadingSeller } from '../../actions/settings/sellerAction'

const SellerPage = () => {

    const initSeller = {
        name: '',
        address: '',
        telNo: '',
        faxNo: ''
    }

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.app)
    const [modal, setModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [seller, setSeller] = useState(initSeller)

    useEffect(() => {
        loadingSeller(dispatch)
        getSeller(dispatch)
    }, [])

    const showModal = () => {
        setModal(true)
    }

    const hideModal = () => {
        setModal(false)
        setUpdate(false)
        setSeller(initSeller)
    }

    const onClickUpdateHandle = (seller) => {
        setUpdate(true)
        setSeller({...seller})
        showModal()
    }

    return (
        <>
            <hr className="bold-border"/>
            <h2 className="text-center mb-4">รายชื่อผู้ขาย</h2>

            {
                loading ? 
                    <LoadingComponent />
                    : 
                    <>
                        <SellerFormModal
                            modal={modal}
                            update={update}
                            seller={seller}
                            setSeller={setSeller}
                            showModal={showModal}
                            hideModal={hideModal}
                        />

                        <SellerTable
                            onClickUpdateHandle={onClickUpdateHandle}
                        />
                    </>
            }
        </>
    )
}

export default SellerPage
