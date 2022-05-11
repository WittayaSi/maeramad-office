import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Modal, Button, Col, Row, Form, Alert } from 'react-bootstrap'
import { getAllSettingData } from '../../../actions/appSettingAction'

import { createSeller, updateSeller } from '../../../actions/settings/sellerAction'

const SellerFormModal = ({ 
    modal, 
    showModal,
    hideModal, 
    update,
    seller,
    setSeller
}) => {

    

    const dispatch = useDispatch()
    // const { sellers } = useSelector(state => state.app.seller)

    const [validated, setValidated] = useState(false)
    const [createUpdateCompleted, setCreateUpdateCompleted] = useState(false)
    const [errors, setErrors] = useState([])

    const onChangeHandle = e => {
        setSeller({
            ...seller,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandle = async (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            setValidated(true)
        } else {
            try {
                const result = await (update ? updateSeller(seller) : createSeller(seller))
                setCreateUpdateCompleted(true)
                setTimeout(() => { 
                    // getAllSettingData(dispatch)
                    hideModal()
                    dispatch(result)
                    setCreateUpdateCompleted(false)
                }, 2000)
            } catch (error) {
                setErrors(error.response.data.errors)
            }
        }
    }

    return (
        <div>
            <Row>
                <Col>
                    <Button variant="primary" onClick={showModal} block >เพิ่มข้อมูลผู้ขาย</Button>
                </Col>
            </Row>


            <Modal 
                show={modal} 
                onHide={hideModal}
                // backdrop="static"
                // keyboard
            >
                <Modal.Header>
                    <Modal.Title>เพิ่มข้อมูลผู้ขาย</Modal.Title>
                </Modal.Header>

                <Form noValidate 
                    validated={validated}  
                    onSubmit={onSubmitHandle}
                >
                    <Modal.Body>

                        {   
                            (createUpdateCompleted === true) 
                            && 
                            <Alert variant={ !createUpdateCompleted ? "danger" : "success" } className="text-center" >
                                { 
                                    createUpdateCompleted ? 
                                    "Create / Update Seller Completed." 
                                    : 
                                    "Create / Update Seller Incomplete!!!" 
                                }
                            </Alert>
                        }

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="name">ชื่อผู้ขาย</Form.Label>
                                <Form.Control type="text" name="name" 
                                    placeholder="กรอกชื่อผู้ขาย" 
                                    required
                                    value={ seller.name }
                                    onChange={ onChangeHandle }
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="name") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="name")) ? (errors.filter(e => e.param==="name"))[0].msg : 'กรุณากรอกข้อมูล ชื่อผู้ขาย' }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="address">ที่อยู่</Form.Label>
                                <Form.Control as="textarea" rows="3" name="address"
                                    value={ seller.address }
                                    onChange={ onChangeHandle }
                                > กรอกที่อยู่</Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกข้อมูล ตำแหน่ง
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="telNo">เบอร์โทร</Form.Label>
                                <Form.Control type="text" name="telNo" placeholder="กรอกเบอร์โทร"
                                    value={ seller.telNo }
                                    onChange={ onChangeHandle }
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกข้อมูล เบอร์โทร
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="faxNo">เบอร์แฟกซ์</Form.Label>
                                <Form.Control type="text" name="faxNo" placeholder="กรอกเบอร์แฟกซ์"
                                    value={ seller.faxNo }
                                    onChange={ onChangeHandle }
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกข้อมูล เบอร์แฟกซ์
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">บันทึก</Button>{' '}
                        <Button variant="danger" onClick={hideModal}>ยกเลิก</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default SellerFormModal
