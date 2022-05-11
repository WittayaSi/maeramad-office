import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { Row, Col } from 'react-bootstrap'

import OrderFormModal from '../../components/materials/orders/OrderFormModal'
import OrderTable from '../../components/materials/orders/OrderTable'
import LoadingComponent from '../../components/utillities/LoadingComponent'
import { getMaterialOrders, loadingMaterialOrders } from '../../actions/orderMaterialAction'

const OrderMaterialPage = () => {

    const dispatch = useDispatch()
    const { isAdmin, user, accessToken } = useSelector(state => state.auth)
    const { personnels } = useSelector(state => state.app)
    const { loading, orders } = useSelector(state => state.material.order)

    const initMaterial = {
        materialId: '',
        amount: 0,
        balance: 0
    }
    const initOrder = {
        date: moment().format('YYYY-MM-DD'),
        personnelId: user.personnel.id || '',
        orderMaterials: [ initMaterial ]
    }

    const [modal, setModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [order, setOrder] = useState(initOrder)
    const [defaultPersonValue, setDefaultPersonValue] = useState([])
    const [filteredPersonnels, setFilteredPersonnels] = useState([])

    const setPersonnels = () => {
        if (isAdmin) {
            console.log('isAdmin')
            setFilteredPersonnels(personnels)
        } else if (user.roles.includes('ROLE_MODERATOR')) {
            const personByDepartment = personnels.filter(person => (person.departmentId===user.personnel.departmentId))
            setFilteredPersonnels(personByDepartment)
        } else {
            const person = personnels.filter(person => (person.id===user.personnel.id))
            setFilteredPersonnels(person)
            setDefaultPersonValue(person)
        }
    }

    useEffect(() => {
        loadingMaterialOrders(dispatch)
        getMaterialOrders(dispatch, accessToken)
    }, [dispatch, accessToken])

    const showModal = () => {
        setModal(true)
        setPersonnels()
    }
    const hideModal = () => {
        setUpdate(false)
        setOrder({...initOrder})
        setDefaultPersonValue([])
        setModal(false)
    }

    const onClickUpdateHandle = async ({id, ...rest}) => {
        try{
            // const orderMaterials = await getMaterialOrderById(id)
            const [order] = await orders.filter( order => (order.id===id))
            const person = await personnels.filter(person => (person.id===order.personnelId))
            setDefaultPersonValue(person)
            const items = await order.orderMaterials.map( pro => ( {
                amount: pro.amount,
                id: pro.id,
                material: pro.material,
                materialId: pro.materialId,
                balance: 0
            } ) )
            setOrder({
                ...rest,
                id,
                orderMaterials: items
            })
            showModal()
            setUpdate(true)
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <>
            <hr className="bold-border"/>
            <Row>
                <Col className="text-left">
                    <h2>รายการเบิกวัสดุ</h2>
                </Col>
                <OrderFormModal 
                    accessToken={accessToken}
                    modal={modal}
                    update={update}
                    order={order}
                    setOrder={setOrder}
                    showModal={showModal}
                    hideModal={hideModal}
                    initMaterial={initMaterial}
                    initOrder={initOrder}
                    defaultPersonValue={defaultPersonValue}
                    filteredPersonnels={filteredPersonnels}
                />
            </Row>

            <hr />

            {
                loading ? 
                    <LoadingComponent />
                    :
                    <OrderTable 
                        onClickUpdateHandle={onClickUpdateHandle}
                        accessToken={accessToken}
                    />
            }

        </>
    )
}

export default OrderMaterialPage
