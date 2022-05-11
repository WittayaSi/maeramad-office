import React, { useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button, Row, Col, Alert, Form } from 'react-bootstrap'
import { useToasts } from 'react-toast-notifications'

import OfficeForm from './OfficeForm'
import { createOffice, updateOffice } from '../../../actions/settings/officeAction'


const OfficeFormModal = () => {

    const { addToast } = useToasts()

    const initData = {
        fullName: '',
        shortName: '',
        address: '',
        telNo: '',
        faxNo: '',
        officeChiefName: '',
        officeChiefPosition: '',
        inventoryChiefName: '',
        inventoryChiefPosition: '',
        inventoryStaffName: '',
        inventoryStaffPosition: '',
        financeOfficerName: '',
        financeOfficerPosition: ''
    }
    const dispatch = useDispatch()
    
    const { isAlreadyOffice, office } = useSelector(state => state.app)

    const [initOffice, setInitOffice] = useState(initData)
    const [validated, setValidated] = useState(false)
    const [modal, setModal] = useState(false)
    const [errors, setErrors] = useState([])
    const [completed, setCompleted] = useState(false)

    const toggle = (e) => {
        setModal(!modal)
        if(modal === false){
            setValidated(false)
            isAlreadyOffice ? setInitOffice(office) : setInitOffice(initData)
        }
    }

    const onChangeHandle = e => {
        setInitOffice({
            ...initOffice,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandle = async event => {
        event.preventDefault()
        const form = event.currentTarget
        

        if (form.checkValidity() === false) {
            setValidated(true)
        } else{ 

            try {
                const result = await ( isAlreadyOffice ? updateOffice(initOffice.id, initOffice) : createOffice(initOffice) )
                addToast(`${ isAlreadyOffice ? 'แก้ไขข้อมูล ' : 'แก้ไขข้อมูล ' } สำเร็จแล้ว!!!`, {
                    appearance: 'success',
                    autoDismiss: true,
                    autoDismissTimeout: 3000,
                })
                setTimeout(() => {
                    setErrors([])
                    dispatch(result)
                    setModal(false)
                }, 3000)
            } catch (err) {
                console.log(err.response.data.errors)
                addToast(`${ isAlreadyOffice ? 'แก้ไขข้อมูล ' : 'แก้ไขข้อมูล ' } ไม่สำเร็จแล้ว!!!`, {
                    appearance: 'danger',
                    autoDismiss: true,
                    autoDismissTimeout: 3000,
                })
            }            
        }
    }

    const values = {
        initOffice,
        setInitOffice,
        validated,
        onChangeHandle,
        onSubmitHandle
    }

    return (
        <Fragment>

            {
                isAlreadyOffice  ? 
                <Row className="mb-4">
                    <Col>
                        <Button variant="primary" value="edit" block 
                            onClick={toggle}
                        >แก้ไขข้อมูลหน่วยงาน</Button>
                    </Col>
                </Row>
                :
                <Row className="mb-4">
                    <Col>
                        <Button variant="success" block 
                            onClick={toggle}
                        >เพิ่มข้อมูลหน่วยงาน</Button>
                    </Col>
                </Row>
            }
            

            <Modal
                size="lg"
                show={modal} 
                onHide={toggle}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                keyboard={false}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        { isAlreadyOffice ? 'แก้ไข' : 'เพิ่ม' } ข้อมูลหน่วยงาน
                    </Modal.Title>
                </Modal.Header>

                <Form onSubmit={ onSubmitHandle } noValidate validated={validated}>

                <Modal.Body style={{maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden'}}>

                    <OfficeForm values={values} />

                </Modal.Body>

                <Modal.Footer>
                    <Button type="submit" variant="success">บันทึก</Button>
                </Modal.Footer>

                </Form>

            </Modal>
        </Fragment>
    )
}

export default OfficeFormModal
