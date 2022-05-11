import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import RegisteredDurablesTable from '../components/durables/RegisteredDurablesTable'
import RegisterDurableFormModal from '../components/durables/RegisterDurableFormModal'
import LoadingComponent from '../components/utillities/LoadingComponent'

import { deleteRegisteredDurable, getRegisteredDurables, loadingRegisteredDurables } from '../actions/registerDurableAction'
import { deleteConfirm } from '../utillities/anotherFunctions'

const RegisteredDurablePage = () => {

    const initRegDurable = {
        type: '01',
        fiscalYear: 2563,
        date: null,
        durableCategoryId: '',
        style: 'D',
        durableId: '',
        seq: '',
        price: 0.00,
        source: '',
        moneySource: '',
        serialNo: '',
        brand: '',
        model: '',
        attribute: '',
        invoiceNo: '',
        sellerId: '',
        usePlace: '',
        paymentDoc: '',
        responsibility: '',
        status: '1',
        dischargeDate: null,
        dischargeType: '',
        note: '',
        evidence: '',
        images: [],
        vehicleNo: '',
        renewDate: null,
        expireDate: null
    }
    
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.durable)

    const [modal, setModal] = useState(false)
    const [regDurable, setRegDurable] = useState(initRegDurable)
    const [update, setUpdate] = useState(false)
    const [validated, setValidated] = useState(false)
    const [createUpdateCompleted, setCreateUpdateCompleted] = useState(false)
    const [errors, setErrors] = useState([])
    const [showVehicleForm, setShowVehicleForm] = useState(false)


    const fiscalYear = 2563

    const showModal = () => {
        setModal(true)
    }

    const hideModal = () => {
        setErrors([])
        setValidated(false)
        setRegDurable(initRegDurable)
        setUpdate(false)
        setCreateUpdateCompleted(false)
        setShowVehicleForm(false)
        setModal(false)
    }

    useEffect(() => {
        loadingRegisteredDurables(dispatch)
        getRegisteredDurables(dispatch, fiscalYear)
    }, [dispatch])
    


    const onDeleteClickHandle = (id) => {
        deleteConfirm(id, dispatch, deleteRegisteredDurable)
    }

    return (
        <>
            <hr className="bold-border"/>
            <h2 className="mb-4">ทะเบียนครุภัณฑ์</h2>

            <hr />
            
            <RegisterDurableFormModal
                modal={modal}
                showModal={showModal}
                hideModal={hideModal}
                errors={errors}
                setErrors={setErrors}
                regDurable={regDurable} 
                setRegDurable={setRegDurable}
                update={update}
                setUpdate={setUpdate}
                validated={validated}
                setValidated={setValidated}
                showVehicleForm={showVehicleForm}
                setShowVehicleForm={setShowVehicleForm}
                createUpdateCompleted={createUpdateCompleted}
                setCreateUpdateCompleted={setCreateUpdateCompleted}
            />

            {
                loading ?
                    <LoadingComponent/> 
                    :
                    <RegisteredDurablesTable 
                        showModal={showModal} 
                        setUpdate={setUpdate}
                        setRegDurable={setRegDurable}
                        onDeleteClickHandle={onDeleteClickHandle}
                    />
            }
        </>
    )
}

export default RegisteredDurablePage
