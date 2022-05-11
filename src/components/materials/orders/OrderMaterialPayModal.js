import React, { useState, useContext, useEffect } from 'react'
import moment from 'moment'
import {
    Modal,
    Form,
    Col,
    Button,
    Alert,
    Dropdown
} from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { thaiDate } from '../../../utillities/anotherFunctions'

import OrderMaterialPayForm from './OrderMaterialPayForm'

import { updateOrderStatusByIdAndPaid } from '../../../actions/orderMaterialAction'
import { useDispatch, useSelector } from 'react-redux'
// import { getAllSettingData } from '../../../actions/appSettingAction'

const OrderMaterialPayModal = ({
    order,
    accessToken
}) => {

    const dispatch = useDispatch()
    const { personnels, materialWithLabel } = useSelector(state => state.app)

    const [validated, setValidated] = useState(false)
    const [modal, setModal] = useState(false)
    const [errors, setErrors] = useState([])
    const [updateCompleted, setUpdateCompleted] = useState(false)
    const [defaultPersonValue, setDefaultPersonValue] = useState(personnels.filter(person => (person.id===order.personnelId)))
    const [localOrderMaterials, setLocalOrderMaterials] = useState(order.orderMaterials)

    const showModal = () => {
        setModal(true)
    }
    const hideModal = () => {
        setModal(false)
        setErrors([])
        setValidated(false)
        setUpdateCompleted(false)
    }

    const onPaidChangeHandle = (e) => {
        // console.log('onPaidChangeHandle')
        // console.log(e.target.name, e.target.id, e.target.value);
        const updatedOrderMaterials = [...localOrderMaterials]
        updatedOrderMaterials[e.target.dataset.idx][e.target.dataset.name] = ~~(e.target.value)

        setLocalOrderMaterials(updatedOrderMaterials)
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            setValidated(true)
        } else {
            try {
                const result = await updateOrderStatusByIdAndPaid(order.id, localOrderMaterials, accessToken)
                // console.log(result)
                setUpdateCompleted(true)
                setTimeout(() => {
                    dispatch(result)
                    // getAllSettingData(dispatch)
                    hideModal()
                    // history.go(0)
                }, 2000)
            } catch (error) {
                console.error(error)
                setErrors(error)
            }
        }
    }

    return (
        <>
            <Dropdown.Item 
                href="#/status='c/d'"
                onClick={showModal}
                disabled={order.status==='c'}
            >
                จ่ายระบุจำนวน
            </Dropdown.Item>

            <Modal
                size="xl"
                show={modal} 
                onHide={hideModal}
                // backdrop="static"
                // keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        { `จ่ายวัสดุ ใบเบิกเลขที่ ${order.orderSeq}/${(order.fiscalYears)+543}` }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    

                    { 
                        ((errors.length > 0) || (updateCompleted === true)) &&  
                        <Alert variant={updateCompleted ? 'success': 'danger'} className="text-center">
                            {
                                updateCompleted === true ? 
                                `แก้ไขข้อมูลสำเร็จแล้ว` 
                                : 
                                `แก้ไขข้อมูลไม่สำเร็จ!!!` 
                            }
                        </Alert>
                    }

                    <Form noValidate 
                        validated={validated} 
                        onSubmit={onSubmitForm}
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
                                    onChange={() => {}} 
                                    disabled={true}
                                />
                                <Form.Control.Feedback style={ order.date !=="" ?  { display: 'block' } : {}}>
                                    { thaiDate(order.date) }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md={6} lg={4}>
                                <Form.Label htmlFor="personnelId">ผู้ขอเบิก</Form.Label>
                                <Typeahead 
                                    options={defaultPersonValue[0] === undefined ? [] : defaultPersonValue}
                                    onChange={ (selected) => {} }
                                    name={'personnelId'} 
                                    id={'personnelId'}
                                    placeholder="เลือกผู้ขอเบิก"
                                    defaultSelected={ defaultPersonValue[0] === undefined ? [] : defaultPersonValue }
                                    emptyLabel='ไม่พบข้อมูล'
                                    paginationText='แสดงข้อมูลเพิ่ม...'
                                    maxResults={50}
                                    labelKey='fullName'
                                    // inputProps={{ disabled: true }}
                                    disabled={true}
                                />
                            </Form.Group>
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
                                ขอเบิก
                            </Col>
                            <Col md={2} lg={1} style={{textAlign: 'center'}}>
                                จ่าย
                            </Col>
                        </Form.Row>

                        {/* list body */}
                    
                        { 
                            localOrderMaterials.map( (material, idx) => 
                            <OrderMaterialPayForm
                                material={material}
                                materialWithLabel={materialWithLabel} 
                                // newCategories={newCategories}
                                // removeOrderMaterial={removeOrderMaterial} 
                                idx={idx} 
                                key={idx} 
                                onPaidChangeHandle={onPaidChangeHandle}  
                                // groupedCategories={groupedCategories}  
                                // onOrderChangeHandleSelect={onOrderChangeHandleSelect}
                                // update={update}
                                // clickAddItem={clickAddItem}
                                // filteredMaterials={filteredMaterials}
                            /> ) 
                        }

                        <Modal.Footer>
                            <Button type="submit" variant="success">บันทึก</Button>
                        </Modal.Footer>

                    </Form>
                    

                </Modal.Body>
            </Modal>
        </>
    )
}

export default OrderMaterialPayModal
