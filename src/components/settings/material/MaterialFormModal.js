import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Modal, Row, Col, Form, Alert } from 'react-bootstrap'

import { createMaterial, updateMaterial } from '../../../actions/settings/materialAction'

const MaterialFormModal = ({ 
    material,
    setMaterial,
    modal,
    showModal,
    hideModal,
    update,
    setUpdate
}) => {

    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.app)
    
    const [validated, setValidated] = useState(false)
    const [createSuccess, setCreateSuccess] = useState(false)
    const [errors, setErrors] = useState([])

    const onSubmitHandle = async (event) => {
        event.preventDefault()
        const form = event.currentTarget

        if (form.checkValidity() === false) {
            // console.log('checkValidity')
            setValidated(true)
        } else{
            try{
                const newMaterial = {
                    categoryId: material.categoryId,
                    name: material.name,
                    unit: material.unit,
                    price: material.price,
                    status: material.status
                }
                let raw = await ( update ? updateMaterial(material.id, newMaterial) : createMaterial(material) )
                setCreateSuccess(true)
                setTimeout(() => {
                    dispatch(raw)
                    // getAllSettingData(dispatch)
                    setCreateSuccess(false)
                    hideModal()
                }, 4000)
    
            } catch (err) {
                setErrors(err)
                setTimeout(() => {
                    setErrors([])
                }, 2000)
            }
        }
        
    };

    const onChangeHandle = event => {
        setMaterial({
            ...material,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>

            <Row style={{marginBottom: '1rem'}}>
                <Col>
                    <Button variant="primary" onClick={showModal} block >??????????????????????????????????????????</Button>
                </Col>
            </Row>


            <Modal 
                show={modal}
                onHide={hideModal}
                //backdrop="static"
                //keyboard
            >
                <Modal.Header>
                    <Modal.Title>{ update ? '????????????????????????????????????????????????' : '??????????????????????????????????????????' }</Modal.Title>
                </Modal.Header>

                <Form noValidate validated={validated} onSubmit={onSubmitHandle}>
                    <Modal.Body>

                        { ((errors.length > 0) || (createSuccess === true)) 
                            && 
                            <Alert variant={ !createSuccess ? "danger" : "success" } >
                                { createSuccess ? "Insert || Update Sucessfully" : 'Errors Something' }
                            </Alert>
                        }

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="categoryId">????????????????????????????????? <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control as="select" name="categoryId" required
                                    onChange={ onChangeHandle }
                                    value={ material.categoryId }
                                >
                                    <option value="">????????????????????????????????????????????????</option>
                                    {
                                        
                                        categories.map(category => (
                                            <option key={category.id} value={category.id}>{ category.name }</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    ???????????????????????????????????????????????????????????????
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="name">??????????????????????????? <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control type="text" name="name" placeholder="???????????????????????????" required
                                    value={ material.name }
                                    onChange={ onChangeHandle }
                                />
                                <Form.Control.Feedback type="invalid">
                                    ????????????????????????????????????????????? ???????????????????????????
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="desc">??????????????????????????????????????????????????????????????????</Form.Label>
                                <Form.Control as="textarea" rows="3" 
                                    name="desc"
                                    value={ material.desc }
                                    onChange={ onChangeHandle }
                                    placeholder='??????????????????????????????????????????????????????????????????????????????'
                                >{}</Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="unit">???????????????????????? <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control type="text" name="unit" placeholder="????????????????????????" required
                                    value={ material.unit }
                                    onChange={ onChangeHandle }
                                />
                                <Form.Control.Feedback type="invalid">
                                    ????????????????????????????????????????????? ????????????????????????
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="price">????????????????????????????????????(?????????) <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control type="Number" name="price" min="0" step="0.05" placeholder="????????????????????????????????????" required
                                    value={ parseFloat(material.price).toFixed(2) }
                                    onChange={ onChangeHandle }
                                />
                                <Form.Control.Feedback type="invalid">
                                    ?????????????????????????????????????????????
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        
                        { 
                            update && 
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label htmlFor="status">??????????????? </Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="status"
                                        value={material.status} 
                                        onChange={onChangeHandle}
                                        style={ material.status === '1' ? {color: 'green'} : {color: 'red'}}
                                    >
                                        <option value="0" style={{color: 'red'}}>inactive</option>
                                        <option value="1" style={{color: 'green'}}>active</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        }
                        

                        {/* {
                            updateStatus && 
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label htmlFor="materialStatus">?????????????????????????????????</Form.Label>
                                    <Form.Control as="select" name="materialStatus" required
                                        onChange={ onChangeHandle }
                                        value={ material.itemStatus }
                                    >
                                        <option value="">??????????????????????????????</option>
                                        <option value={true}>active</option>
                                        <option value={false}>inactive</option>   
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        } */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">??????????????????</Button>{' '}
                        <Button variant="danger" onClick={hideModal}>??????????????????</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default MaterialFormModal;
