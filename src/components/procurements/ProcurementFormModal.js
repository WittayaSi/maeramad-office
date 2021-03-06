import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    Button, Modal, Form, Alert, Row, Col
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlusCircle
} from '@fortawesome/free-solid-svg-icons'

import ProcurementItemFormComponent from './ProcurementItemForm'

import { createProcurement, updateProcurement } from '../../actions/procurementAction'
import { thaiDate } from '../../utillities/anotherFunctions'

const ProcurementFormModal = ({
    initialProcurement,
    blankItem,
    procurement,
    update,
    updateId,
    modal,
    validated,
    createUpdateCompleted,
    errors,
    newMaterials,
    materials,
    checker,
    setModal,
    setProcurement,
    setUpdate,
    showModal,
    hideModal,
    setCreateUpdateCompleted,
    setValidated,
    setErrors,
    setNewMaterials,
    setChecker
}) => {

    const dispatch = useDispatch()
    const { categories, sellers, personnels } = useSelector( state => state.app )
    
    const onChangeHandle = e =>{
        if( e.target.name === 'categoryId' ){
            let changedMaterials = materials.filter( m => m.categoryId===e.target.value )
            setNewMaterials(changedMaterials)
        }
        setProcurement({
            ...procurement,
            [e.target.name]: e.target.value
        })
    }

    const onChangeProcurementItemHandle = e => {
        const updatedProcurementItem = [...procurement.procurementItems]
        updatedProcurementItem[e.target.dataset.idx][e.target.dataset.name] = e.target.value
        setProcurement({
            ...procurement,
            procurementItems: updatedProcurementItem
        })
    }

    const addProcurementItem = () => {
        setProcurement({
            ...procurement,
            procurementItems: [...procurement.procurementItems, blankItem]
        })
    }

    const removeProcurementItem = e => {
        // console.log(e.target.dataset.idx)
        const idx = parseInt(e.target.dataset.idx)
        const removedProcurementItem = procurement.procurementItems.filter( (material, index) => (index!==idx))
        // console.log(removedProcurementItem)
        setProcurement({
            ...procurement,
            procurementItems: removedProcurementItem
        })
    }

    const onSubmitHandle = e => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            // console.log('checkValidity')
            setValidated(true)
        } else {
            ( update ? updateProcurement(procurement) : createProcurement(procurement) )
                    .then( result => {
                        // // console.log(result)
                        setCreateUpdateCompleted(true)
                        setTimeout(() => { 
                            setModal(false)
                            dispatch(result)
                            setCreateUpdateCompleted(false)
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
                    } )
        }
    }

    return (
        <>
        
            <Button variant="primary" block 
                onClick={showModal}
            >
                ????????????????????????????????? ?????????????????????-?????????????????????
            </Button>


            <Modal
                size="lg"
                show={modal} 
                onHide={hideModal}
                // backdrop="static"
                // keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        ???????????????/??????????????? ????????????????????????????????????????????????-?????????????????????
                    </Modal.Title>
                </Modal.Header>

                <Form 
                    noValidate 
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
                            <Form.Group as={Col} sm={12} md={2} lg={2}>
                                <Form.Label as="legend">??????????????????????????????????????????</Form.Label>
                                {/* <Form.Row> */}
                                    <Form.Check
                                        value='1'
                                        type="radio"
                                        label="1 ??????"
                                        name="checker"
                                        id="checker1"
                                        onChange={ () => {
                                            setChecker('1')
                                            setProcurement({
                                                ...procurement,
                                                personnelId2: "",
                                                personnelId3: ""
                                            })
                                        }}
                                        checked={ checker==='1' }
                                    />
                                    <Form.Check
                                        value='2'
                                        type="radio"
                                        label="3 ??????"
                                        name="checker"
                                        id="checker3"
                                        checked={ checker==='3' }
                                        onChange={ () => setChecker('3') }
                                        style={{ marginLeft: 10 }}
                                    />
                                {/* </Form.Row> */}
                            </Form.Group>

                            <Form.Group as={Col} sm={12} md={3} lg={3}>
                                <Form.Label htmlFor="code">???????????????????????????????????????</Form.Label>
                                <Form.Control type="text" name="code" placeholder="???????????????????????????????????????????????????" 
                                    value={ procurement.code }
                                    onChange={ onChangeHandle }
                                    required
                                    style={ errors.some(e => e.param==="code") ? { borderColor: 'red' } : {}}
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="code") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="code")) ? (errors.filter(e => e.param==="code"))[0].msg : '????????????????????????????????????????????? ???????????????????????????????????????' }
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm={12} md={4} lg={4}>
                                <Form.Label htmlFor="date">?????????????????? ???????????????/?????????/??????</Form.Label>
                                <Form.Control type="date" name="date" placeholder="??????????????????????????????" 
                                    value={ procurement.date }
                                    onChange={ onChangeHandle }
                                    required
                                    style={ errors.some(e => e.param==="date") ? { borderColor: 'red' } : {}}
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="date") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="date")) ? (errors.filter(e => e.param==="date"))[0].msg : '????????????????????????????????????????????? ??????????????????' }
                                </Form.Control.Feedback>
                                <Form.Control.Feedback style={ procurement.date !=="" ?  { display: 'block' } : {}}>
                                    { thaiDate(procurement.date) }
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm={12} md={3} lg={3}>
                                <Form.Label htmlFor="processDays">???????????????????????????????????????????????????</Form.Label>
                                <Form.Control type="text" name="processDays" placeholder="????????????????????????????????????????????????" 
                                    value={ procurement.processDays }
                                    onChange={ onChangeHandle }
                                    required
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="processDays") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="processDays")) ? (errors.filter(e => e.param==="processDays"))[0].msg : '????????????????????????????????????????????? ???????????????????????????????????????????????????' }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Col sm={12} md={6} lg={6}>
                                <Form.Group>
                                    <Form.Label htmlFor="categoryId">?????????????????????????????????</Form.Label>
                                    <Form.Control
                                        as="select"
                                        data-live-search="true"
                                        name="categoryId" 
                                        id="categoryId"
                                        value={procurement.categoryId} 
                                        onChange={onChangeHandle}
                                        required
                                    >
                                        <option value="">---????????????????????????????????????????????????---</option>
                                        {
                                            
                                            categories.map(category => (
                                                <option 
                                                    key={category.id} 
                                                    value={category.id}
                                                >{ category.name }</option>
                                            ))
                                        }
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="categoryId") ? { display: 'block' } : {}}>
                                        { (errors.some(e => e.param==="categoryId")) ? (errors.filter(e => e.param==="categoryId"))[0].msg : '???????????????????????????????????????????????????????????????' }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <Form.Group>
                                    <Form.Label htmlFor="useFor">???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ???????????????</Form.Label>
                                    <Form.Control as="textarea" rows="3" 
                                        name="useFor"
                                        value={ procurement.useFor }
                                        onChange={ onChangeHandle }
                                    > ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</Form.Control>
                                    <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="useFor") ? { display: 'block' } : {}}>
                                        { (errors.some(e => e.param==="useFor")) ? (errors.filter(e => e.param==="useFor"))[0].msg : '????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ' }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} sm={12} md={6} lg={6}>
                                <Form.Label htmlFor="moneySource">????????????????????????????????????</Form.Label>
                                <Form.Control type="text" name="moneySource" placeholder="????????????????????????????????????????????????" 
                                    value={ procurement.moneySource }
                                    onChange={ onChangeHandle }
                                    required
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="moneySource") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="moneySource")) ? (errors.filter(e => e.param==="moneySource"))[0].msg : '????????????????????????????????????????????? ????????????????????????????????????' }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} sm={12} md={6} lg={6}>
                                <Form.Label htmlFor="sellerId">??????????????????????????????????????????</Form.Label>
                                <Form.Control
                                    as="select"
                                    data-live-search="true"
                                    name="sellerId" 
                                    id="sellerId"
                                    value={procurement.sellerId} 
                                    onChange={onChangeHandle}
                                    required
                                >
                                    <option value="">---?????????????????????????????????????????????????????????---</option>
                                    {
                                        
                                        sellers.map(seller => (
                                            <option 
                                                key={seller.id} 
                                                value={seller.id}
                                            >{ seller.name }</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="sellerId") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="sellerId")) ? (errors.filter(e => e.param==="sellerId"))[0].msg : '????????????????????????????????????????????????????????????????????????' }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} sm={12} md={6} lg={4}>
                                <Form.Label htmlFor="personnelId">?????????????????????????????????????????????</Form.Label>
                                <Form.Control
                                    as="select"
                                    data-live-search="true"
                                    name="personnelId" 
                                    id="personnelId"
                                    value={procurement.personnelId} 
                                    onChange={onChangeHandle}
                                    required
                                >
                                    <option value="">---????????????????????????????????????????????????????????????---</option>
                                    {
                                        
                                        personnels.map(personnel => (
                                            <option 
                                                key={personnel.id} 
                                                value={personnel.id}
                                            >{ `${personnel.Prename.shortName}${personnel.fname} ${personnel.lname}` }</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="personnelId") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="personnelId")) ? (errors.filter(e => e.param==="personnelId"))[0].msg : '???????????????????????????????????????????????????????????????????????????' }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} sm={12} md={6} lg={4}>
                                <Form.Label htmlFor="personnelId2">?????????????????????????????????????????????</Form.Label>
                                <Form.Control
                                    as="select"
                                    data-live-search="true"
                                    name="personnelId2" 
                                    id="personnelId2"
                                    value={procurement.personnelId2} 
                                    onChange={onChangeHandle}
                                    disabled={ checker === '1' }
                                    //required
                                >
                                    <option value="">---????????????????????????????????????????????????????????????---</option>
                                    {
                                        
                                        personnels.map(personnel => (
                                            <option 
                                                key={personnel.id} 
                                                value={personnel.id}
                                            >{ `${personnel.Prename.shortName}${personnel.fname} ${personnel.lname}` }</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="personnelId2") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="personnelId2")) ? (errors.filter(e => e.param==="personnelId2"))[0].msg : '???????????????????????????????????????????????????????????????????????????' }
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm={12} md={6} lg={4}>
                                <Form.Label htmlFor="personnelId3">?????????????????????????????????????????????</Form.Label>
                                <Form.Control
                                    as="select"
                                    data-live-search="true"
                                    name="personnelId3" 
                                    id="personnelId3"
                                    value={procurement.personnelId3} 
                                    onChange={onChangeHandle}
                                    disabled={ checker === '1' }
                                    //required
                                >
                                    <option value="">---????????????????????????????????????????????????????????????---</option>
                                    {
                                        
                                        personnels.map(personnel => (
                                            <option 
                                                key={personnel.id} 
                                                value={personnel.id}
                                            >{ `${personnel.Prename.shortName}${personnel.fname} ${personnel.lname}` }</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="personnelId3") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="personnelId3")) ? (errors.filter(e => e.param==="personnelId3"))[0].msg : '???????????????????????????????????????????????????????????????????????????' }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <hr/>

                        <Form.Row style={{textAlign: 'center'}}>
                            <Col md={{span:6}}>
                                ?????????????????????????????????
                            </Col>
                            <Col md={{span:1, offset: 3}}>
                                <Button variant="info" block size="sm"
                                    onClick={ addProcurementItem }
                                    title="?????????????????????????????????"
                                ><FontAwesomeIcon icon={faPlusCircle} /></Button>
                            </Col>
                        </Form.Row>
                        
                        <hr/>
                        
                        {/* list header */}
                        <Form.Row>
                            <Col md={{span: 1, offset: 1}}>
                                #
                            </Col>
                            <Col md={6}>
                                ???????????????
                            </Col>
                            <Col md={2}>
                                ???????????????
                            </Col>
                        </Form.Row>

                        {/* list body */}
                    
                        { 
                            procurement.procurementItems.map( (material, idx) => 
                            <ProcurementItemFormComponent 
                                material={material}
                                materials={newMaterials}
                                removeProcurementItem={removeProcurementItem} 
                                idx={idx} 
                                key={idx} 
                                onChangeProcurementItemHandle={onChangeProcurementItemHandle}    
                            /> ) 
                        }

                        
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type="submit" variant="success">??????????????????</Button>
                        <Button variant="danger" onClick={hideModal} >??????????????????</Button>
                    </Modal.Footer>

                </Form>
            </Modal>
        </>
    )
}

export default ProcurementFormModal
