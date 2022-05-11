import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProcurement, loadingProcurement } from '../actions/procurementAction'

import ProcurementFormModal from '../components/procurements/ProcurementFormModal'
import ProcurementTable from '../components/procurements/ProcurementTable'
import LoadingComponent from '../components/utillities/LoadingComponent'


const ProcurementPage = () => {

    const dispatch = useDispatch()

    const { loading } = useSelector(state => state.procurement)

    const {  materials } = useSelector(state => state.app)

    const blankItem = {
        materialId: '',
        amount: 0
    }
    const initialProcurement = {
        code: '',
        date: '',
        categoryId: '',
        useFor: '',
        moneySource: '',
        processDays: 0,
        sellerId: '',
        personnelId: '',
        personnelId2: '',
        personnelId3: '',               
        procurementItems: [ blankItem ]
    }
    const [procurement, setProcurement] = useState(initialProcurement)
    const [modal, setModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [validated, setValidated] = useState(false)
    const [createUpdateCompleted, setCreateUpdateCompleted] = useState(false)
    const [errors, setErrors] = useState([])

    const [newMaterials, setNewMaterials] = useState(materials)
    const [checker, setChecker] = useState('1')

    useEffect(() => {
        loadingProcurement(dispatch)
        getProcurement(dispatch)
    }, [dispatch])

    const showModal = () => {
        setModal(true)
    }

    const hideModal = () => {
        setModal(false)
        setChecker('1')
        setErrors([])
        setValidated(false)
        setProcurement(initialProcurement)
        setUpdate(false)
        setCreateUpdateCompleted(false)
    }

    const onClickUpdateProcurement = procurement => {
        showModal()
        setUpdate(true)
        const items = procurement.procurementItems.map( pro => ({...pro}) )
        setProcurement({
            ...procurement,
            procurementItems: items
        })

        let changedMaterials = materials.filter( m => m.categoryId===procurement.categoryId )
        setNewMaterials(changedMaterials)
        let checker = ( procurement.personnelId2 !== "" && procurement.personnelId3 !== "" ) ? '3' : '1'
        setChecker(checker)
    }

    const dataForTable = {
        onClickUpdateProcurement
    }
    const dataForForm = {
        initialProcurement,
        procurement,
        update,
        modal,
        validated,
        createUpdateCompleted,
        errors,
        blankItem,
        newMaterials,
        materials,
        checker,
        setModal,
        setProcurement,
        setUpdate,
        showModal,
        hideModal,
        setCreateUpdateCompleted,
        setValidated,
        setErrors,
        setNewMaterials,
        setChecker
    }

    return (
        <>
            <hr className="bold-border"/>
            <h2 className="mb-4">ขอซื้อ / ขอจ้าง</h2>

            <ProcurementFormModal {...dataForForm} />

            {
                loading ?
                    <LoadingComponent />
                    :
                    <ProcurementTable {...dataForTable} />
            }
        </>
    )
}

export default ProcurementPage
