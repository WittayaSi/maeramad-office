import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { Row, Col } from 'react-bootstrap'

import ReceiveFormModal from '../../components/materials/receives/ReceiveFormModal'
import ReceiveTable from '../../components/materials/receives/ReceiveTable'
import { getMaterialReceive, loadingMaterialReceive } from '../../actions/receiveMaterialAction'
import LoadingComponent from '../../components/utillities/LoadingComponent'

const ReceiveMaterialPage = () => {

    const blankReceiveItem = {
        materialId: '',
        date: moment().format('YYYY-MM-DD'),
        amount: 0,
        sellerId: ''
    }

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.material.receive)

    const [receiveItems, setReceiveItems] = useState([ blankReceiveItem ])
    const [modal, setModal] = useState(false)
    const [validated, setValidated] = useState(false)
    const [createUpdateCompleted, setCreateUpdateCompleted] = useState(false)
    const [errors, setErrors] = useState([])
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        loadingMaterialReceive(dispatch)
        getMaterialReceive(dispatch)
    }, [dispatch])

    const showModal = () => {
        setModal(true)
    }
    const hideModal = () => {
        setErrors([])
        setUpdate(false)
        setValidated(false)
        setCreateUpdateCompleted(false)
        setReceiveItems([{ ...blankReceiveItem }])
        setModal(false)
    }

    const onClickUpdateReceive = (receive) => {
        setUpdate(true)
        setReceiveItems([{...receive}])
        showModal()
    }

    const dataForForm = {
        blankReceiveItem,
        receiveItems,
        modal,
        validated,
        createUpdateCompleted,
        errors,
        update,
        setUpdate,
        showModal,
        hideModal,
        setValidated,
        setCreateUpdateCompleted,
        setErrors,
        setReceiveItems,
    }

    return (
        <>
            <hr className="bold-border"/>
            <Row>

                <Col className="text-left">
                    <h2>รายการรับเข้าวัสดุ</h2>
                </Col>

                <ReceiveFormModal 
                    data={dataForForm}
                />
                
            </Row>

            <hr />

            {
                loading ? 
                    <LoadingComponent />
                    :
                    <ReceiveTable 
                        onClickUpdateReceive={onClickUpdateReceive} 
                    />
            }
        </>
    )
}

export default ReceiveMaterialPage
