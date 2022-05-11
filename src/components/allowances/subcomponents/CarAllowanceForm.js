import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Card, Form, Col } from 'react-bootstrap'


const CarAllowanceFormComponent = ({
    formProps: { register, errors }, 
    carStepData,
    generalStepData,
    setCarStepData,
    setGeneralStepData
}) => {

    useEffect(() => {
        setCarStepData({
            ...carStepData,
            carCode: generalStepData.carCode,
            driver: generalStepData.driver
        })
    }, [])

    const { personnels, cars } = useSelector(state => state.app)

    const selfNameRef = useRef()

    const handleInputOnChange = e => {

        const { name, value } = e.target
        
        setCarStepData( {
            ...carStepData,
            [name]: value
        })

        if(name==="carCode"){
            setGeneralStepData({
                ...generalStepData,
                carCode: value
            })
        }
        if(name==="driver"){
            setGeneralStepData({
                ...generalStepData,
                driver: value
            })
        }

    }
    
    const handleCheckBoxOnChange = (name, value) => {
        let localValue = !value
        // console.log(name, value)
        setCarStepData( prev => ({
            ...prev,
            [name]: localValue,
            selfName: localValue === true ? carStepData.driver : ""

        }))
        // if(name==="selfDrive" && localValue === false){
        //     setCarStepData( prev => ({
        //         ...prev,
        //         selfName: ""
        //     }))
        // }
    }

    return (
        <section>
        
        <div className="mt-4" style={{fontWeight: 'bold'}}>ขออนุญาตใช้รถยนต์ราชการ</div>
        <Card body>
                <Form.Row>
                    <Form.Group as={Col} sm={12} md={6} lg={6}>
                        <Form.Label htmlFor="to">เรียน (ขอใช้รถยนต์) <span style={{color: 'red'}} >*</span></Form.Label>
                        <Form.Control 
                            type="text" 
                            name="to" 
                            placeholder="เรียน..." 
                            value={ carStepData.to }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.to}
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.to && errors.to.message }
                            </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm={6} md={6} lg={4}>
                        <Form.Label htmlFor="carId">ทะเบียนรถยนต์ราชการ <span style={{color: 'red'}} >*</span></Form.Label>
                        <Form.Control 
                            as="select" 
                            name="carId" 
                            value={ carStepData.carId }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={ !!errors.carId }
                        >
                            <option value="">---เลือกรถยนต์ราชการ---</option>
                            {/* <option value="กจ3437">กจ 3437 ตาก</option>
                            <option value="กจ1362">กจ 1362 ตาก</option>
                            <option value="กจ3418">กจ 3418 ตาก</option>
                            <option value="กฉ1176">กฉ 1176 ตาก</option> */}
                            {
                                cars.map( c => (
                                    <option value={c.id} key={c.id}> {`${c.carCode}`} </option>
                                ) )
                            }
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            { errors.carCode && errors.carCode.message }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm={6} md={4} lg={2}>
                        <Form.Label htmlFor="carNo">เบอร์</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="carNo" 
                            placeholder="เบอร์" 
                            value={ carStepData.carNo }
                            ref={register}
                            onChange={handleInputOnChange}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} sm={12} md={5} lg={5}>
                        <Form.Label htmlFor="driver">พนักงานขับรถ <span style={{color: 'red'}} >*</span></Form.Label>
                        <Form.Control 
                            as="select" 
                            name="driver" 
                            value={ carStepData.driver }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={ !!errors.driver }
                        >
                            <option value="">---เลือกชื่อพนักงานขับรถ---</option>
                            {
                                personnels.map( p => (
                                    <option value={p.id} key={p.id}> {`${p.Prename.shortName}${p.fname} ${p.lname}`} </option>
                                ) )
                            }
                        </Form.Control>
                        
                        <Form.Control.Feedback type="invalid">
                            { errors.driver && errors.driver.message }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="fuelOrderNo">ใบสั่งน้ำมันเลขที่</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="fuelOrderNo" 
                            placeholder="ใบสั่งน้ำมันเลขที่" 
                            value={ carStepData.fuelOrderNo }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.fuelOrderNo}
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.fuelOrderNo && errors.fuelOrderNo.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="fuelOrderBook">เล่มที่</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="fuelOrderBook" 
                            placeholder="เล่มที่" 
                            value={ carStepData.fuelOrderBook }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.fuelOrderBook}
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.fuelOrderBookNo && errors.fuelOrderBook.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="amount">จำนวนเงิน</Form.Label>
                        <Form.Control 
                            type="number"
                            name="amount" 
                            placeholder="0.00" 
                            value={ carStepData.amount }
                            step="0.25"
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.amount}
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.amount && errors.amount.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Check 
                            inline 
                            type="checkbox" 
                            label="กรณีประสงค์ขับรถเอง" 
                            name="selfDrive"
                            ref={register}
                            onChange={ e => handleCheckBoxOnChange(e.target.name, (carStepData.selfDrive)) }
                            value={ carStepData.selfDrive }
                            checked={ carStepData.selfDrive }
                        />
                        <Form.Control 
                            as="select" 
                            name="selfName" 
                            value={ carStepData.selfName }
                            onChange={handleInputOnChange}
                            ref={(e) => {
                                register(e)
                                selfNameRef.current = e
                            }}
                            isInvalid={ !!errors.selfName }
                            disabled={ !carStepData.selfDrive }
                        >
                            <option value="">---เลือกชื่อพนักงานขับรถ---</option>
                            {
                                personnels.map( p => (
                                    <option value={p.id} key={p.id}> {`${p.Prename.shortName}${p.fname} ${p.lname}`} </option>
                                ) )
                            }
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

            </Card>
        </section>
    )
}

export default CarAllowanceFormComponent
