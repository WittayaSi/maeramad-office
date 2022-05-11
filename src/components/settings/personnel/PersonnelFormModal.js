import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Modal, Row, Col, Button, Form, Alert } from 'react-bootstrap'

import { createPersonnel, updatePersonnel } from '../../../actions/settings/personnelAction'

const PersonnelFormModal = ({ 
    modal, 
    update,
    person, 
    setPerson, 
    showModal,
    hideModal,
}) => {

    const dispatch = useDispatch()
    const { cprenames, departments } = useSelector(state => state.app)
    
    const [validated, setValidated] = useState(false)
    const [createdPersonnel, setCreatedPersonnel] = useState(false)

    const onChangeHandle = event => {
        setPerson({
            ...person,
            [event.target.name]: event.target.value
        })
    }
    const onSubmitHandle = async (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            setValidated(true)
        } else {
            try {
                const result = await (update ? updatePersonnel(person) : createPersonnel(person))
                setCreatedPersonnel(true)
                setTimeout(() => { 
                    dispatch(result)
                    setCreatedPersonnel(false)
                    hideModal()
                }, 2000)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <Row>
                <Col>
                    <Button variant="primary" onClick={showModal} block >เพิ่มข้อมูลบุคลากร</Button>
                </Col>
            </Row>


            <Modal 
                size="lg"
                show={modal} 
                onHide={hideModal}
                // backdrop="static"
                // keyboard
            >
                <Modal.Header>
                    <Modal.Title>เพิ่มข้อมูลบุคลากร</Modal.Title>
                </Modal.Header>

                <Form noValidate 
                    validated={validated}  
                    onSubmit={onSubmitHandle}
                >
                    <Modal.Body>

                        { ((createdPersonnel === true)) 
                            && 
                            <Alert variant={ !createdPersonnel ? "danger" : "success" } >
                                { createdPersonnel ? "Create Personnel Completed" : "Create Personnel Incompleted" }
                            </Alert>
                        }

                        <Form.Row>
                            <Form.Group as={Col} sm={12} lg={2} md={2}>
                                <Form.Label htmlFor="prename">คำนำหน้า</Form.Label>
                                {/* <Form.Control type="text" name="prename" placeholder="คำนำหน้า" required
                                    value={ person.prename }
                                    onChange={ onChangeHandle }
                                /> */}
                                <Form.Control
                                    as="select"
                                    data-live-search="true"
                                    name="prename" 
                                    id="prename"
                                    value={person.prename} 
                                    onChange={onChangeHandle}
                                    required
                                >
                                    <option value="">---เลือกคำนำหน้า---</option>
                                    {
                                        
                                        cprenames.map(cprename => (
                                            <option 
                                                key={cprename.id} 
                                                value={cprename.id}
                                            >{ cprename.shortName }</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกข้อมูล คำนำหน้า
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm={12} lg={5} md={5}>
                                <Form.Label htmlFor="fname">ชื่อ</Form.Label>
                                <Form.Control type="text" name="fname" placeholder="กรอกชื่อ" required
                                    value={ person.fname }
                                    onChange={ onChangeHandle }
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกข้อมูล ชื่อ
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm={12} lg={5} md={5}>
                                <Form.Label htmlFor="lname">นามสกุล</Form.Label>
                                <Form.Control type="text" name="lname" placeholder="กรอกนามสกุล" required
                                    value={ person.lname }
                                    onChange={ onChangeHandle }
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกข้อมูล นามสกุล
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="position">ตำแหน่ง</Form.Label>
                                <Form.Control type="text" name="position" placeholder="กรอกตำแหน่ง" required
                                    value={ person.position }
                                    onChange={ onChangeHandle }
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกข้อมูล ตำแหน่ง
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label htmlFor="departmentId">ฝ่าย</Form.Label>
                                <Form.Control
                                    as="select"
                                    data-live-search="true"
                                    name="departmentId" 
                                    id="departmentId"
                                    value={person.departmentId} 
                                    onChange={onChangeHandle}
                                    required
                                >
                                    <option value="">---เลือกฝ่าย---</option>
                                    {
                                        
                                        departments.map(department => (
                                            <option 
                                                key={department.id} 
                                                value={department.id}
                                            >{ department.name }</option>
                                        ))
                                    }
                                </Form.Control>
                                {/* <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="departmentId") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="departmentId")) ? (errors.filter(e => e.param==="departmentId"))[0].msg : 'กรุณากรอกข้อมูล ชื่อแผนก' }
                                </Form.Control.Feedback> */}
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกข้อมูล ฝ่าย
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

export default PersonnelFormModal
