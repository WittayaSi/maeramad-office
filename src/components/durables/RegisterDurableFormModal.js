import React, { Fragment, useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Modal, Button, Form, Col, Alert, Row } from 'react-bootstrap'

import { thaiDate } from '../../utillities/anotherFunctions'

import { types, styles, sources, moneySources, dischargeTypes } from '../../assets/dataCode.json'
// import ImageComponent from './ImagesComponent'

import { createRegisterDurable, updateRegisterDurable } from '../../actions/registerDurableAction'

const RegisterDurableFormModal = ({
    modal,
    hideModal,
    showModal,
    errors,
    setErrors,
    update,
    regDurable,
    setRegDurable,
    showVehicleForm,
    setShowVehicleForm,
    validated,
    setValidated,
    createUpdateCompleted,
    setCreateUpdateCompleted
}) => {
    
    const dispatch = useDispatch()
    const { 
        registeredDurables,
        registerDurableFormCode: {
            durableCategories,
            durableSellers,
            durableUsePlaces
        },
    } = useSelector( state => state.durable)
    const { isAdmin } = useSelector(state => state.auth)

    const durableCodeRef = useRef(null)
    const durableInputRef = useRef(null)
    const sellerAddressRef = useRef(null)
    const sellerTelNoRef = useRef(null)

    const [durableIsChanged, setDurableIsChanged] = useState([])
    const [showDurableInactiveForm, setShowDurableInactiveForm] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState(null)


    useEffect( () => {
        if (!isAdmin && modal===true) {
            const form = document.querySelector('form')
            var length = form.elements.length
            for (let i=0; i < length; i++) {
                form.elements[i].disabled = true;
            }
        }
        if(update) {
            setDurableArrayOnCategoryChange(regDurable.durableCategoryId)
            setDurableCodeOnDurableChange(regDurable.durableId)
            setOnSellerIsChange(regDurable.sellerId)
            setOnStatusChange(regDurable.status)
        }
    },[update])

    const setOnSellerIsChange = (value) => {
        const seller = durableSellers.find( ds => ds.id === value )
        sellerAddressRef.current.value = seller !== undefined ? seller.address : ""
        sellerTelNoRef.current.value = seller !== undefined ? seller.telephoneNo : ""
    }
    const setOnStatusChange = (value) => {
        if(value === '0'){
            setShowDurableInactiveForm(true)
        }else {
            setShowDurableInactiveForm(false)
            setRegDurable( prev => ({
                ...prev,
                dischargeDate: null,
                dischargeType: '',
                note: '',
                evidence: ''
            }))
        }
    }

    const setDurableArrayOnCategoryChange = (value) => {
        durableInputRef.current.value = (value === '') && ''
        durableCodeRef.current.value = ''
        const durableCategoryOnChange = durableCategories.find( category => category.id === value)
        let durableOnChange = durableCategoryOnChange ? durableCategoryOnChange.durables : []
        setDurableIsChanged([...durableOnChange])
        if( durableCategoryOnChange !== undefined && durableCategoryOnChange.code === '05'){
            setShowVehicleForm(true)
        }else {
            setShowVehicleForm(false)
            setRegDurable( prev => ({
                ...prev,
                vehicleNo: '',
                renewDate: null,
                expireDate: null
            }))
        }
    }

    const setDurableCodeOnDurableChange = (value) => {
        const lastRegDurable = registeredDurables.find( rd => rd.durableId===value)
        // console.log(lastRegDurable)
        // console.log(update);
        let nextSeqConcatWithZero = ''
        
        !update ? 
        nextSeqConcatWithZero = lastRegDurable !== undefined ? ('00' + (lastRegDurable.seq + 1)) : ('00' + 1)
        :
        nextSeqConcatWithZero = '00' + lastRegDurable.seq
        
        const nextSeq = nextSeqConcatWithZero.slice(-2)

        const fullCode =  !update ? (value !== "" ? (durableIsChanged.find( durable => durable.id===value).code) + '-' + nextSeq : "") 
        : 
        (lastRegDurable.durable.code + '-' + nextSeq)

        durableCodeRef.current.value = fullCode
        setRegDurable(prev => ({
            ...prev,
            seq: ~~(nextSeq)
        }))
    }

    const onChangeHandle = event => {
        const { name, value } = event.target
        name==='durableCategoryId' && setDurableArrayOnCategoryChange(value, durableInputRef)
        name==='durableId' && setDurableCodeOnDurableChange(value)
        name==='sellerId' && setOnSellerIsChange(value)      
        name==='status' && setOnStatusChange(value)
        setRegDurable( prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmitHandle = async event => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            // console.log('checkValidity')
            setValidated(true)
        } else {
            const { images, ...rest } = regDurable
            let formData = new FormData()
            // console.log(selectedFiles)
            if(selectedFiles) {
                for (const key of Object.keys(selectedFiles)) {
                    formData.append('images', selectedFiles[key])
                }
            }

            formData.append('data', JSON.stringify(rest))

            try {
                const result = await (!update ? createRegisterDurable(formData) : updateRegisterDurable(formData, rest.id))
                setCreateUpdateCompleted(true)
                setTimeout(() => { 
                    dispatch(result)
                    hideModal()
                }, 3000)
            } catch (err) {
                // console.log(err.response)
                setErrors(err.response.data.errors)
            }
            
        }
    }

    return (
        <Fragment>
            {
                isAdmin && (
                    <Button variant="primary" 
                        className="mb-3"
                        block 
                        onClick={showModal}
                    >
                        ลงทะเบียนครุภัณฑ์
                    </Button>
                )
            }

            <Modal
                size="xl"
                show={modal} 
                onHide={hideModal}
                // backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        เพิ่ม/แก้ไข ข้อมูลทะเบียนครุภัณฑ์
                    </Modal.Title>
                </Modal.Header>

                <Form 
                    noValidate 
                    validated={validated} 
                    onSubmit={onSubmitHandle}
                    encType="multipart/form-data"
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
                                    errors.map( err => (
                                        <li>{ `${err.param} : ${err.msg}` }</li>
                                    ))
                                }
                            </Alert>
                        }
                        
                        {/* <ImageComponent 
                            setSelectedFiles={ (files) => setSelectedFiles(files) }
                            selectedFiles={ selectedFiles }
                            images={ regDurable.images }
                            update={ update }
                        /> */}

                        {/* <ReactImageComponent /> */}
                        
                        <hr/>

                        <Form.Row>
                            <Form.Group as={Col} sm={12} md={2} lg={2}>
                                <Form.Label htmlFor="type">ประเภท <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control as="select" name="type"
                                    onChange={ onChangeHandle }
                                    value={ regDurable.type }
                                    required
                                    isInvalid={errors.some(e => e.param==="type")}
                                >
                                    <option value="">เลือกประเภท</option>
                                    {
                                        
                                        types.map(category => (
                                            <option key={category.code} value={category.code}>{ `${category.code}:${category.name}` }</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="type") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="type")) ? (errors.filter(e => e.param==="type"))[0].msg : 'กรุณากรอกข้อมูล' }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} sm={12} md={1} lg={1}>
                                <Form.Label htmlFor="fiscalYear">ปีงบ <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="fiscalYear" 
                                    placeholder="ปีงบ" 
                                    value={ regDurable.fiscalYear }
                                    onChange={ onChangeHandle }
                                    required
                                    isInvalid={errors.some(e => e.param==="fiscalYear")}
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="fiscalYear") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="fiscalYear")) ? (errors.filter(e => e.param==="fiscalYear"))[0].msg : 'กรุณากรอกข้อมูล' }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} sm={12} md={2} lg={2}>
                                <Form.Label htmlFor="date">วันที่ เดือน/วัน/ปี <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="date" 
                                    placeholder="กรอกวันที่" 
                                    value={ regDurable.date === null ? '' : regDurable.date }
                                    onChange={ onChangeHandle }
                                    required
                                    isInvalid={errors.some(e => e.param==="date")}
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="date") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="date")) ? (errors.filter(e => e.param==="date"))[0].msg : 'กรุณากรอกข้อมูล วันที่' }
                                </Form.Control.Feedback>
                                <Form.Control.Feedback style={ regDurable.date !== null ?  { display: 'block' } : {}}>
                                    { thaiDate(regDurable.date) }
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm={12} md={3} lg={3}>
                                <Form.Label htmlFor="style">คุณลักษณะ <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control as="select" name="style"
                                    onChange={ onChangeHandle }
                                    value={ regDurable.style }
                                    required
                                    isInvalid={errors.some(e => e.param==="style")}
                                >
                                    <option value="">คุณลักษณะ</option>
                                    {
                                        styles.map(style => (
                                            <option key={style.code} value={style.code}>{ `${style.code}:${style.name}` }</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="style") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="style")) ? (errors.filter(e => e.param==="style"))[0].msg : 'กรุณากรอกข้อมูล' }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} sm={12} md={4} lg={4}>
                                <Form.Label htmlFor="durableCategoryId">หมวดครุภัณฑ์ <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control as="select" name="durableCategoryId"
                                    onChange={ onChangeHandle }
                                    value={ regDurable.durableCategoryId }
                                    required
                                    isInvalid={errors.some(e => e.param==="durableCategoryId")}
                                >
                                    <option value="">เลือกหมวดครุภัณฑ์</option>
                                    {
                                        durableCategories.map(category => (
                                            <option key={category.id} value={category.id}>{ `${category.code}:${category.name} ( อายุใช้งาน ${category.life} ปี )` }</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="durableCategoryId") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="durableCategoryId")) ? (errors.filter(e => e.param==="durableCategoryId"))[0].msg : 'กรุณากรอกข้อมูล' }
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            
                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Col} sm={12} md={4} lg={4}>
                                <Form.Label htmlFor="durableId">ชนิดครุภัณฑ์ <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control as="select" name="durableId"
                                    onChange={ onChangeHandle }
                                    value={ regDurable.durableId }
                                    required
                                    isInvalid={errors.some(e => e.param==="durableId")}
                                    ref={durableInputRef}
                                    disabled={ regDurable.durableCategoryId === '' && true }
                                >
                                    <option value="">เลือกชนิดครุภัณฑ์</option>
                                    {
                                        
                                        durableIsChanged.map(durable => (
                                            <option key={durable.id} value={durable.id}>{ `${durable.name}` }</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="durableId") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="durableId")) ? (errors.filter(e => e.param==="durableId"))[0].msg : 'กรุณากรอกข้อมูล' }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} sm={12} md={2} lg={2}>
                                <Form.Label htmlFor="durableCode">รหัส</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    ref={durableCodeRef}
                                    placeholder="รหัส"
                                    readOnly
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label htmlFor="source">วิธีที่ได้มา <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control as="select" 
                                    name="source"
                                    onChange={ onChangeHandle }
                                    value={ regDurable.source }
                                    required
                                    isInvalid={errors.some(e => e.param==="source")}
                                >
                                    <option value="">เลือกวิธีที่ได้มา</option>
                                    {
                                        
                                        sources.map(source => (
                                            <option key={source.code} value={source.code}>{ `${source.code}:${source.name}` }</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="source") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="source")) ? (errors.filter(e => e.param==="source"))[0].msg : 'กรุณากรอกข้อมูล' }
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="moneySource">เงินที่จัดซื้อ <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control as="select" 
                                    name="moneySource"
                                    onChange={ onChangeHandle }
                                    value={ regDurable.moneySource }
                                    required
                                    isInvalid={errors.some(e => e.param==="moneySource")}
                                >
                                    <option value="">เลือกเงินที่จัดซื้อ</option>
                                    {
                                        
                                        moneySources.map(ms => (
                                            <option key={ms.code} value={ms.code}>{ `${ms.code}:${ms.name}` }</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="moneySource") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="moneySource")) ? (errors.filter(e => e.param==="moneySource"))[0].msg : 'กรุณากรอกข้อมูล' }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} sm={6} md={2} lg={2}>
                                <Form.Label htmlFor="price">ราคา/หน่วย <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control 
                                    type="number" 
                                    name="price" 
                                    placeholder="ราคา" 
                                    min='0'
                                    max='9999999'
                                    step="0.25"
                                    value={ regDurable.price }
                                    onChange={ onChangeHandle }
                                    onBlur={ event => { event.target.value = parseFloat(event.target.value).toFixed(2) }}
                                    required
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="price") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="price")) ? (errors.filter(e => e.param==="price"))[0].msg : 'กรุณากรอกข้อมูล' }
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Form.Row>
                        
                        {
                            showVehicleForm && 
                            (
                                <>
                                <hr/>
                                <Form.Row>

                                    <Form.Group as={Col} sm={12} md={{span: 2, offset: 2}} lg={{span: 2, offset: 2}}>
                                        <Form.Label htmlFor="vehicleNo">ทะเบียนรถ <i style={{color: 'red'}}>*</i></Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="vehicleNo" 
                                            placeholder="ทะเบียนรถ" 
                                            value={ regDurable.vehicleNo }
                                            onChange={ onChangeHandle }
                                            required
                                            isInvalid={errors.some(e => e.param==="vehicleNo")}
                                        />
                                        <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="vehicleNo") ? { display: 'block' } : {}}>
                                            { (errors.some(e => e.param==="vehicleNo")) ? (errors.filter(e => e.param==="vehicleNo"))[0].msg : 'กรุณากรอกข้อมูล วันที่' }
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} sm={12} md={3} lg={3}>
                                        <Form.Label htmlFor="renewDate">วันที่ ต่อทะเบียน</Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            name="renewDate" 
                                            placeholder="กรอกวันที่" 
                                            value={ regDurable.renewDate === null ? '' : regDurable.renewDate }
                                            onChange={ onChangeHandle }
                                        />
                                        <Form.Control.Feedback style={ regDurable.renewDate !== null ?  { display: 'block' } : {}}>
                                            { thaiDate(regDurable.renewDate) }
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} sm={12} md={3} lg={3}>
                                        <Form.Label htmlFor="expireDate">วันที่ หมดอายุ</Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            name="expireDate" 
                                            placeholder="กรอกวันที่" 
                                            value={ regDurable.expireDate === null ? '' : regDurable.expireDate }
                                            onChange={ onChangeHandle }
                                        />
                                        <Form.Control.Feedback style={ regDurable.expireDate !== null ?  { display: 'block' } : {}}>
                                            { thaiDate(regDurable.expireDate) }
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                </Form.Row> 
                                </>
                            )
                        }

                        <hr/>

                        <Form.Row>
                            <Form.Group as={Col} sm={6} md={3} lg={3}>
                                <Form.Label htmlFor="serialNo">เลขเครื่อง S/N หรือเลขราชพัสดุ <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="serialNo" 
                                    placeholder="เลขเครื่อง S/N หรือเลขราชพัสดุ" 
                                    value={ regDurable.serialNo }
                                    onChange={ onChangeHandle }
                                    required
                                    isInvalid={errors.some(e => e.param==="serialNo")}
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="serialNo") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="serialNo")) ? (errors.filter(e => e.param==="serialNo"))[0].msg : 'กรุณากรอกข้อมูล' }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} sm={6} md={2} lg={2}>
                                <Form.Label htmlFor="brand">ยี่ห้อ <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="brand" 
                                    placeholder="ยี่ห้อ" 
                                    value={ regDurable.brand }
                                    onChange={ onChangeHandle }
                                    required
                                    isInvalid={errors.some(e => e.param==="brand")}
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="brand") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="brand")) ? (errors.filter(e => e.param==="brand"))[0].msg : 'กรุณากรอกข้อมูล' }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} sm={6} md={2} lg={2}>
                                <Form.Label htmlFor="model">รุ่น Model <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="model" 
                                    placeholder="รุ่น Model" 
                                    value={ regDurable.model }
                                    onChange={ onChangeHandle }
                                    required
                                    isInvalid={errors.some(e => e.param==="model")}
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="model") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="model")) ? (errors.filter(e => e.param==="model"))[0].msg : 'กรุณากรอกข้อมูล' }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} sm={12} md={5} lg={5}>
                                <Form.Label htmlFor="attribute">คุณลักษณะครุภัณฑ์อื่นๆ</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="attribute" 
                                    placeholder="คุณลักษณะครุภํณฑ์อื่นๆ" 
                                    value={ regDurable.attribute }
                                    onChange={ onChangeHandle }
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Col} sm={6} md={2} lg={2}>
                                <Form.Label htmlFor="invoiceNo">เลขใบส่งของ</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="invoiceNo" 
                                    placeholder="เลขใบส่งของ" 
                                    value={ regDurable.invoiceNo }
                                    onChange={ onChangeHandle }
                                />
                            </Form.Group>

                            <Form.Group as={Col} sm={12} md={3} lg={3}>
                                <Form.Label htmlFor="sellerId">ผู้ขาย/ผู้บริจาค <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control 
                                    as="select" 
                                    name="sellerId"
                                    onChange={ onChangeHandle }
                                    value={ regDurable.sellerId }
                                    required
                                    isInvalid={errors.some(e => e.param==="sellerId")}
                                >
                                    <option value="">เลือกผู้ขาย/ผู้บริจาค</option>
                                    {
                                        
                                        durableSellers.map(seller => (
                                            <option key={seller.id} value={seller.id}>{ `${seller.name}` }</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="sellerId") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="sellerId")) ? (errors.filter(e => e.param==="sellerId"))[0].msg : 'กรุณากรอกข้อมูล' }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} sm={12} md={4} lg={4}>
                                <Form.Label htmlFor="sellerAddress">ที่อยู่</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    ref={sellerAddressRef} 
                                    placeholder="ที่อยู่"
                                    readOnly
                                />
                            </Form.Group>

                            <Form.Group as={Col} sm={12} md={3} lg={3}>
                                <Form.Label htmlFor="sellerTelNo">เบอร์โทร</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    ref={sellerTelNoRef} 
                                    placeholder="เบอร์โทร"
                                    readOnly
                                />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} sm={12} md={4} lg={4}>
                                <Form.Label htmlFor="usePlace">ใช้ประจำอยู่ที่ <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control 
                                    as="select" 
                                    name="usePlace"
                                    onChange={ onChangeHandle }
                                    value={ regDurable.usePlace }
                                    required
                                    isInvalid={errors.some(e => e.param==="usePlace")}
                                >
                                    <option value="">เลือกใช้ประจำอยู่ที่</option>
                                    {
                                        
                                        durableUsePlaces.map(useplace => (
                                            <option key={useplace.id} value={useplace.id}>{ `${useplace.place}` }</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="usePlace") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="usePlace")) ? (errors.filter(e => e.param==="usePlace"))[0].msg : 'กรุณากรอกข้อมูล' }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} sm={6} md={2} lg={2}>
                                <Form.Label htmlFor="paymentDoc">เลขที่ใบเบิก</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="paymentDoc" 
                                    placeholder="เลขที่ใบเบิก" 
                                    value={ regDurable.paymentDoc }
                                    onChange={ onChangeHandle }
                                />
                            </Form.Group>

                            <Form.Group as={Col} sm={6} md={3} lg={3}>
                                <Form.Label htmlFor="responsibility">ผู้รับผิดชอบ <i style={{color: 'red'}}>*</i></Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="responsibility" 
                                    placeholder="ผู้รับผิดชอบ" 
                                    value={ regDurable.responsibility }
                                    onChange={ onChangeHandle }
                                    required
                                    isInvalid={errors.some(e => e.param==="responsibility")}
                                />
                                <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="responsibility") ? { display: 'block' } : {}}>
                                    { (errors.some(e => e.param==="responsibility")) ? (errors.filter(e => e.param==="responsibility"))[0].msg : 'กรุณากรอกข้อมูล' }
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} sm={12} md={3} lg={3}>
                                <Form.Label htmlFor="status">สภาพครุภัณฑ์ </Form.Label>
                                <Form.Control 
                                    as="select" 
                                    name="status"
                                    onChange={ onChangeHandle }
                                    value={ regDurable.status }
                                    required
                                    isInvalid={errors.some(e => e.param==="status")}
                                >
                                    <option value="1">ใช้งานอยู่</option>
                                    <option value="0">จำหน่ายออกจากบัญชี</option>
                                    
                                </Form.Control>
                            </Form.Group>

                        </Form.Row>

                        {
                            showDurableInactiveForm && 
                            (
                                <>
                                <hr/>
                                <Form.Row>

                                    <Form.Group as={Col} sm={12} md={3} lg={3}>
                                        <Form.Label htmlFor="dischargeType">การเปลี่ยนแปลง <i style={{color: 'red'}}>*</i></Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="dischargeType"
                                            onChange={ onChangeHandle }
                                            value={ regDurable.dischargeType }
                                            required
                                            isInvalid={errors.some(e => e.param==="dischargeType")}
                                        >
                                            <option value="">เลือกการเปลี่ยนแปลง</option>
                                            {
                                                
                                                dischargeTypes.map(type => (
                                                    <option key={type.code} value={type.code}>{ `${type.code}:${type.name}` }</option>
                                                ))
                                            }
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid" style={ errors.some(e => e.param==="dischargeType") ? { display: 'block' } : {}}>
                                            { (errors.some(e => e.param==="dischargeType")) ? (errors.filter(e => e.param==="dischargeType"))[0].msg : 'กรุณากรอกข้อมูล' }
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} sm={12} md={2} lg={2}>
                                        <Form.Label htmlFor="dischargeDate">วันที่จำหน่าย <i style={{color: 'red'}}>*</i></Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            name="dischargeDate" 
                                            placeholder="วันที่จำหน่าย" 
                                            value={ regDurable.dischargeDate === null ? '' : regDurable.dischargeDate }
                                            onChange={ onChangeHandle }
                                            required
                                            isInvalid={errors.some(e => e.param==="dischargeDate")}
                                        />
                                        <Form.Control.Feedback style={ regDurable.dischargeDate !== null ?  { display: 'block' } : {}}>
                                            { thaiDate(regDurable.dischargeDate) }
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} sm={12} md={2} lg={2}>
                                        <Form.Label htmlFor="evidence">หลักฐานจำหน่าย</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="evidence" 
                                            placeholder="หลักฐานจำหน่าย" 
                                            value={ regDurable.evidence }
                                            onChange={ onChangeHandle }
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} sm={12} md={5} lg={5}>
                                        <Form.Label htmlFor="note">สาเหตุการเปลี่ยนแปลง</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="note" 
                                            placeholder="สาเหตุการเปลี่ยนแปลง" 
                                            value={ regDurable.note }
                                            onChange={ onChangeHandle }
                                        />
                                    </Form.Group>

                                </Form.Row> 
                                </>
                            )
                        }
                        
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type="submit" variant="success">บันทึก</Button>
                    </Modal.Footer>

                </Form>
            </Modal>
        </Fragment>
    )
}

export default RegisterDurableFormModal
