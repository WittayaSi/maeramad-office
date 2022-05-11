import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import moment from 'moment'
import { Row, Col, Button, Modal, Alert, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlusCircle
} from '@fortawesome/free-solid-svg-icons'

import ReceiveForm from './ReceiveForm'
import { createMaterialReceive, updateMaterialReceive } from '../../../actions/receiveMaterialAction'
import { getAllSettingData } from '../../../actions/appSettingAction'

const ReceiveFormModal = ({
    data: {
        blankReceiveItem,
        receiveItems,
        modal,
        validated,
        createUpdateCompleted,
        errors,
        update,
        showModal,
        hideModal,
        setValidated,
        setCreateUpdateCompleted,
        setReceiveItems,
        setErrors,
        oldReceiveItems,
        setOldReceiveItems
    }
}) => {

    const dispatch = useDispatch()
    const { groupedCategories  } = useSelector(state => state.app)

    const onChangeHandle = e => {
        let updatedReceiveItems = [...receiveItems]
        updatedReceiveItems[e.target.dataset.idx][e.target.dataset.name] = e.target.value
        setReceiveItems(updatedReceiveItems)
    }

    const onOrderChangeHandleSelect = ([value], other) => {
        const name = other.split('-')[0]
        const idx = other.split('-')[1]

        console.log(value, other)

        const updatedReceiveItems = [...receiveItems]
        if ( value === undefined) {
            updatedReceiveItems[idx][name] = ''
        } else {
            updatedReceiveItems[idx][name] = value.value
        }

        setReceiveItems(updatedReceiveItems)
    }

    const onSubmitHandle = e => {
        e.preventDefault()
        const form = e.currentTarget
        
        if (form.checkValidity() === false) {
            setValidated(true)
        } else {
            ( update ? updateMaterialReceive(receiveItems) : createMaterialReceive(receiveItems))
                .then( result => {
                    // console.log(result)
                    setCreateUpdateCompleted(true)
                    setTimeout(() => { 
                        hideModal()
                        getAllSettingData(dispatch)
                        dispatch(result)
                    }, 4000)
                })
                .catch( err => {
                    // console.log(err)
                    if (err.status === 500) {
                        // console.log('err.status === 500', err.status);
                        setErrors([err.response.data])
                    } else {
                        // console.log('err.status !== 500', err.status);
                        setErrors(err.response.data.errors)
                    }
                })
        }
    }

    const addReceiveItem = () => {
        setReceiveItems([
            ...receiveItems,
            { ...blankReceiveItem }
        ])
    }

    const clearReceiveItem = () => {
        setReceiveItems([blankReceiveItem])
        setValidated(false)
    }

    const removeReceiveItem = e => {
        const idx = parseInt(e.target.dataset.idx)
        const removedReceives = receiveItems.filter( (receive, index) => index!==idx )
        // console.log(removedReceives)
        setReceiveItems( removedReceives )
    }

    return (
        <>
                <Col className="text-right" md={2}>
                    <Button variant="primary" block 
                        onClick={showModal}
                    >รับเข้าวัสดุ</Button>
                </Col>


            <Modal
                size="xl"
                show={modal}
                onHide={hideModal}
                // backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        { `${ update ? 'แก้ไข' : 'เพิ่ม' } ข้อมูลรับเข้าวัสดุ` }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col md={{span:2, offset: 10}}>

                        {
                            !update && (
                                <Button variant="info" block size="sm"
                                    onClick={ addReceiveItem }
                                    title="เพิ่มรายการ"
                                >
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </Button>
                            )
                        }
                            
                        </Col>
                        
                    </Row>

                    <br />
                    

                    { 
                        ((errors.length > 0) || (createUpdateCompleted === true)) &&  
                        <Alert variant={createUpdateCompleted ? 'success': 'danger'} className="text-center">
                            {
                                createUpdateCompleted === true ? 
                                `${update ? 'แก้ไข' : 'เพิ่ม' } ข้อมูลสำเร็จแล้ว`
                                : 
                                `${update ? 'แก้ไข' : 'เพิ่ม' } ข้อมูลไม่สำเร็จ`
                            }
                        </Alert>
                    }

                    <Form noValidate 
                        validated={validated} 
                        onSubmit={onSubmitHandle} 
                    >
                    
                        { 
                            receiveItems.map( (item, idx) => 
                            <ReceiveForm 
                                item={item}
                                removeReceiveItem={removeReceiveItem} 
                                idx={idx} 
                                key={idx} 
                                onChangeHandle={onChangeHandle}
                                onOrderChangeHandleSelect={onOrderChangeHandleSelect} 
                                groupedCategories={groupedCategories}
                            /> ) 
                        }

                        <Modal.Footer>
                            <Button type="submit" variant="success">บันทึก</Button>
                            <Button type="reset" variant="danger" onClick={clearReceiveItem} >ล้างข้อมูล</Button>
                        </Modal.Footer>

                    </Form>
                    

                </Modal.Body>
            </Modal>
        </>
    )
}

export default ReceiveFormModal
