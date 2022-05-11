import React, { useEffect, useContext, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import { Col, Button, Modal, Alert, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlusCircle
} from '@fortawesome/free-solid-svg-icons'

import { Typeahead } from 'react-bootstrap-typeahead'

import OrderMaterialForm from './OrderMaterialForm'

import { thaiDate } from '../../../utillities/anotherFunctions'
import { createMaterialOrder, getMaterialOrders, updateMaterialOrder } from '../../../actions/orderMaterialAction'
// import { getAllSettingData } from '../../../actions/appSettingAction'

const OrderFormModal = ({
    modal,
    update,
    order,
    initMaterial,
    initOrder,
    defaultPersonValue,
    setOrder,
    showModal,
    hideModal,
    filteredPersonnels,
    accessToken
}) => {

    const history = useHistory()

    const dispatch = useDispatch()
    const { materials, categories, groupedCategories, materialWithLabel  } = useSelector(state => state.app)

    
    const [filteredMaterials, setFilterdMaterials] = useState([])
    const [clickAddItem, setClickAddItem] = useState(false)
    const [createUpdateCompleted, setCreateUpdateCompleted] = useState(false)
    const [validated, setValidated] = useState(false)
    const [errors, setErrors] = useState([])
    
    useEffect(() => {
        setFilterdMaterials(materialWithLabel.filter(material => (material.balance>0)))
    }, [materialWithLabel])
    
    useEffect(() => {
        const transformOrder = (orderMats) => {
            let newMaterials =  orderMats.map( material => {
                let [result] =  materials.filter( m => ( m.id === material.materialId ) ).map( m => {
                    return {
                        amount: material.amount,
                        id: material.id,
                        material: material.material,
                        materialId: material.materialId,
                        balance: m.balance
                    }
                } )
                return result
            } )
            return newMaterials
        }
        if( update ) {
            let newMaterials = transformOrder(order.orderMaterials)
            setOrder({
                ...order,
                orderMaterials: newMaterials
            })
        }
    }, [update])

    const onChangeHandle = (e, from='') => {
        if (from==='typeahead') {
            const [person] = e
            // console.log(person)
            setOrder({
                ...order,
                personnelId: person===undefined ? '' : person.id,
                departmentId:  person===undefined ? '' : person.departmentId
            })
        } else {
            setOrder({
                ...order,
                [e.target.name]: e.target.value
            })
        }
    }

    const onOrderChangeHandle = (e, amount=0) => {
        // console.log(e.target.name, e.target.id)
        const updatedOrderMaterials = [...order.orderMaterials]
        updatedOrderMaterials[e.target.dataset.idx][e.target.dataset.name] = e.target.value
        if( (e.target.dataset.name === "materialId") && (e.target.value!=="") ){
            updatedOrderMaterials[e.target.dataset.idx]["balance"] = update ? materials.filter( m => m.id===e.target.value)[0].balance : materials.filter( m => m.id===e.target.value)[0].balance
        }else if( (e.target.dataset.name === "materialId") && (e.target.value==="") ){
            updatedOrderMaterials[e.target.dataset.idx]["balance"] = update ? amount : 0
        }
        setOrder({
            ...order,
            orderMaterials: updatedOrderMaterials
        })
    }

    const onOrderChangeHandleSelect = ([value], other, materialAmount) => {
        const name = other.split('-')[0]
        const idx = other.split('-')[1]

        const updatedOrderMaterials = [...order.orderMaterials]
        if (value !== undefined) {
            updatedOrderMaterials[idx][name] = value.value
            updatedOrderMaterials[idx]["balance"] = update ? (materialAmount + materials.filter( m => m.id===value.value)[0].balance) : materials.filter( m => m.id===value.value)[0].balance
        } else {
            updatedOrderMaterials[idx]["balance"] = 0
            updatedOrderMaterials[idx]["amount"] = 0
        }

        setOrder({
            ...order,
            orderMaterials: updatedOrderMaterials
        })
    }

    const onSubmitHandle = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            setValidated(true)
        } else {
            try {
                const result = await ( update ? updateMaterialOrder(order, accessToken) : createMaterialOrder(order, accessToken) )
                setCreateUpdateCompleted(true)
                // console.log(result)
                setTimeout(() => {
                    setCreateUpdateCompleted(false)
                    setErrors([])
                    setValidated(false)
                    dispatch(result)
                    getMaterialOrders(dispatch, accessToken)
                    // getAllSettingData(dispatch)
                    hideModal()
                    // history.go(0)
                }, 2000)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const addOrderMaterial = () => {
        setOrder({
            ...order,
            orderMaterials: [...order.orderMaterials, initMaterial]
        })
        setClickAddItem(true)
    }

    const resetOrder = () => {
        setOrder({
            ...initOrder
        })
        setValidated(false)
    }

    const removeOrderMaterial = e => {
        const idx = parseInt(e.target.dataset.idx)
        const removedOrderMaterial = order.orderMaterials.filter( (material, index) => index!==idx )

        setOrder( {
            ...order,
            orderMaterials: removedOrderMaterial
        } )
    }
    return (
        <>
            <Col className="text-right" md={3} lg={2}>
                <Button variant="primary" block 
                    onClick={showModal}
                > ทำรายการขอเบิก</Button>
            </Col>

            <Modal
                size="xl"
                show={modal} 
                onHide={hideModal}
                // backdrop="static"
                // keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        { update ? `แก้ไขรายการใบเบิกวัสดุ ใบเบิกเลขที่ ${order.orderSeq}/${(order.fiscalYears)+543}` : `ทำรายการใบเบิกวัสดุ` }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    

                    { 
                        ((errors.length > 0) || (createUpdateCompleted === true)) &&  
                        <Alert variant={createUpdateCompleted ? 'success': 'danger'} className="text-center">
                            {
                                createUpdateCompleted === true ? 
                                `${ update ? 'แก้ไข' : 'เพิ่ม' } ข้อมูลสำเร็จแล้ว` 
                                : 
                                `${ update ? 'แก้ไข' : 'เพิ่ม' } ข้อมูลไม่สำเร็จ!!!` 
                            }
                        </Alert>
                    }

                    <Form noValidate 
                        validated={validated} 
                        onSubmit={onSubmitHandle}
                    >

                        <Form.Row>
                            <Form.Group as={Col} md={6} lg={{span:2, offset: 3}}>
                                <Form.Label htmlFor="date">วันที่รับ(ด/ว/ป)</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name='date'
                                    id='date'
                                    max={moment().format('YYYY-MM-DD')}
                                    value={moment(order.date).format('YYYY-MM-DD')} 
                                    onChange={onChangeHandle} 
                                    required
                                />
                                <Form.Control.Feedback style={ order.date !=="" ?  { display: 'block' } : {}}>
                                    { thaiDate(order.date) }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md={6} lg={4}>
                                <Form.Label htmlFor="personnelId">ผู้ขอเบิก</Form.Label>
                                <Typeahead 
                                    options={filteredPersonnels}
                                    onChange={ (selected) => onChangeHandle(selected, 'typeahead') }
                                    name={'personnelId'} 
                                    id={'personnelId'}
                                    placeholder="เลือกผู้ขอเบิก"
                                    defaultSelected={ defaultPersonValue[0] === undefined ? [] : defaultPersonValue }
                                    emptyLabel='ไม่พบข้อมูล'
                                    paginationText='แสดงข้อมูลเพิ่ม...'
                                    maxResults={50}
                                    labelKey='fullName'
                                    inputProps={{ required: true }}
                                />
                            </Form.Group>
                        </Form.Row>

                        <hr/>

                        <Form.Row style={{textAlign: 'center'}}>
                            <Col md={{span:6}}>
                                รายการวัสดุ
                            </Col>
                            <Col md={{span:1, offset: 3}}>
                                <Button variant="info" block size="sm"
                                    onClick={ addOrderMaterial}
                                    title="เพิ่มรายการ"
                                ><FontAwesomeIcon icon={faPlusCircle} /></Button>
                            </Col>
                        </Form.Row>

                        <hr/>
                        
                        {/* list header */}
                        <Form.Row>
                            <Col md={1} lg={{span: 1, offset: 2}}>
                                #
                            </Col>
                            <Col md={5} lg={5}>
                                วัสดุ
                            </Col>
                            <Col md={3} lg={1}>
                                จำนวน
                            </Col>
                            <Col md={2} lg={1} style={{textAlign: 'center'}}>
                                คงเหลือ
                            </Col>
                        </Form.Row>

                        {/* list body */}
                    
                        { 
                            order.orderMaterials.map( (material, idx) => 
                            <OrderMaterialForm 
                                material={material}
                                materialWithLabel={materialWithLabel} 
                                categories={categories}
                                removeOrderMaterial={removeOrderMaterial} 
                                idx={idx} 
                                key={idx} 
                                onOrderChangeHandle={onOrderChangeHandle}  
                                groupedCategories={groupedCategories}  
                                onOrderChangeHandleSelect={onOrderChangeHandleSelect}
                                update={update}
                                clickAddItem={clickAddItem}
                                filteredMaterials={filteredMaterials}
                            /> ) 
                        }

                        <Modal.Footer>
                            <Button type="submit" variant="success">บันทึก</Button>
                            <Button type="reset" variant="danger" onClick={resetOrder} >ล้างข้อมูล</Button>
                        </Modal.Footer>

                    </Form>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default OrderFormModal
