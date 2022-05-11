import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Modal, Form, Col, Button, Alert } from 'react-bootstrap'
import { createDepartment, updateDepartment } from '../../../actions/settings/departmentAction'

const DepartmentFormModalComponent = ({ 
    modal,
    update,
    department,
    setDepartment,
    oldName,
    showModal,
    hideModal
}) => {

    const dispatch = useDispatch()

    const [validated, setValidated] = useState(false)
    const [createUpdateCompleted, setCreateUpdateCompleted] = useState(false)
    const [errors, setErrors] = useState([])

    const onHideModal = () => {
        hideModal()
        setErrors([])
        setValidated(false)
        setCreateUpdateCompleted(false)
    }

    const onChangeHandle = event => {
        setDepartment({
            ...department,
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
                const result = await (update === true ? updateDepartment(department, oldName) : createDepartment(department))
                setCreateUpdateCompleted(true)
                setTimeout(() => { 
                    hideModal()
                    dispatch(result)
                    setCreateUpdateCompleted(false)
                }, 3000)
            } catch (error) {
                setErrors(error.response.data.errors)
            }
        }
    }

    return (
        <>
        
            <Button variant="primary" block 
                onClick={showModal}
            >
                เพิ่มข้อมูล แผนก/ฝ่าย/กลุ่มงาน
            </Button>

            <Modal
                size="md"
                show={modal} 
                onHide={onHideModal}
                //backdrop="static"
                //keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        เพิ่ม / แก้ไข ข้อมูล แผนก/ฝ่าย/กลุ่มงาน
                    </Modal.Title>
                </Modal.Header>

                <Form noValidate 
                    validated={validated} 
                    onSubmit={onSubmitHandle}
                >

                    <Modal.Body>
                        

                        { 
                            ((errors.length > 0) || (createUpdateCompleted === true)) &&  
                            <Alert 
                                variant={createUpdateCompleted ? 'success': 'danger'} 
                                className='text-center'
                            >
                                {
                                    createUpdateCompleted === true ? 
                                    'Update || Create Completed.' 
                                    : 
                                    'Update || Create Incomplete !!!'
                                }
                            </Alert>
                        }
                        
                        
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="name">ชื่อแผนก <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control type="text" name="name" placeholder="e.g. ฝ่าย.. / กลุ่มงาน..." 
                                    value={ department.name }
                                    onChange={ onChangeHandle }
                                    required
                                    isInvalid={errors.some(e => e.param==="name")}
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="name") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="name")) ? (errors.filter(e => e.param==="name"))[0].msg : 'กรุณากรอกข้อมูล ชื่อแผนก' }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="code">รหัสแผนก</Form.Label>
                                <Form.Control type="text" name="code" placeholder="e.g. บค. บท. วช. ฯลฯ"
                                    value={ department.code }
                                    onChange={ onChangeHandle }
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="chiefName">ชื่อ-สกุล หัวหน้าแผนก <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control type="text" name="chiefName" placeholder="กรอก ชื่อ-สกุล หัวหน้าแผนก" 
                                    value={ department.chiefName }
                                    onChange={ onChangeHandle }
                                    required
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="chiefName") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="chiefName")) ? (errors.filter(e => e.param==="chiefName"))[0].msg : 'กรุณากรอกข้อมูล ชื่อ-สกุล หัวหน้าแผนก' }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="chiefPosition">ตำแหน่ง <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control type="text" name="chiefPosition" placeholder="กรอกตำแหน่งหัวหน้าแผนก" 
                                    value={ department.chiefPosition }
                                    onChange={ onChangeHandle }
                                    required
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="chiefPosition") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="chiefPosition")) ? (errors.filter(e => e.param==="chiefPosition"))[0].msg : 'กรุณากรอกข้อมูล ตำแหน่งหัวหน้าแผนก' }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button type="submit" variant="success">บันทึก</Button>
                        <Button variant="danger" onClick={onHideModal} >ยกเลิก</Button>
                    </Modal.Footer>

                </Form>
            </Modal>
        </>
    )
}

export default DepartmentFormModalComponent
