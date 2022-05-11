import React, { Fragment, useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Form, Row, Col, Card, Button } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlusCircle
} from '@fortawesome/free-solid-svg-icons'

import { thaiDate } from '../../../utillities/anotherFunctions'

import SelectPersonComponent from './SelectPerson'

const GeneralAllowanceFormComponent = ({ 
    formProps: { register, errors }, 
    update,
    generalStepData, 
    setGeneralStepData,
    setCarStepData,
    addAllowancePerson,
    removeAllowancePerson
}) => {

    const { personnels, provinces, cars } = useSelector(state => state.app)
    
    const dateRef = useRef()
    const othersDetialsRef = useRef()

    //const [enableInput, setEnableInput] = useState(generalStepData.government)
    //const [enableOthersDetialsInput, setEnableOthersDetialsInput] = useState(generalStepData.others)
    
    const [amphures, setAmphures] = useState([])

    useEffect(() => {
        provinces.filter( (p) => {
            if(p.code === generalStepData.province){
                setAmphures(p.amphures)
            }
        })
    }, [])
    // const [dateValue, setDateValue] = useState(generalStepData.date)

    const calculateDays = (e) =>{
        const { startDate, startTime, endDate, endTime } = generalStepData
        // // console.log(startDate, endDate);
        if((startDate !== '') && (endDate !== '')){
            const startDateTime = new Date(`${startDate} ${startTime}`)
            const endDateTime = new Date(`${endDate} ${endTime}`)
            setGeneralStepData({
                ...generalStepData,
                noDays: Math.round((endDateTime-startDateTime)/(1000*60*60*24)),
            })
            // console.log(~~(((endDateTime-startDateTime)/(1000*60*60))/24))
            // console.log((((endDateTime-startDateTime)/(1000*60*60))%24))
        }
    }

    const handleOnChange = (e) => {
        const {name, value} = e.target
        // console.log(name, value)
        setGeneralStepData({
            ...generalStepData,
            [name]: value
        })
        if(name==="province") {
            provinces.filter( p => {
                if(p.code === value){
                    setAmphures(p.amphures)
                }
            })
        }
    }

    const handleRadioOnChange = (e) => {
        const { name, value } = e.target
        let distValue = ""

        setGeneralStepData({
            ...generalStepData,
            [name]: value
        })

        if(name==="inOrOutPro"){
            value === "in" ? distValue="out" : distValue="out" 
            setGeneralStepData( prev => ({
                ...prev,
                inOrOutDist: distValue
            }))
        }

        if(name==="vehicle" && value!=="4"){
            setGeneralStepData( prev => ({
                ...prev,
                carCode: "",
                driver: ""
            }))
            setCarStepData( prev => ({
                ...prev,
                carCode: "",
                driver: ""
            }))
        }

    }

    const handleCheckBoxOnChange = (name, value) => {
        let localValue = !value
        // console.log(typeof(localValue), localValue)
        setGeneralStepData( prev => ({
            ...prev,
            [name]: localValue
        }))

        if(name==="others" && localValue === true){
            // console.log(`othersDetialsRef.current.focus()`);
            othersDetialsRef.current.focus()
        }
        if(name==="others" && localValue === false){
            setGeneralStepData( prev => ({
                ...prev,
                othersDetials: ""
            }))
        }
    }

    const onDateTimeChange = e => {
        const {name, value} = e.target
        setGeneralStepData({
            ...generalStepData,
            [name]: value
        })
        // setDateValue(e.target.value)
    }


    const onChangeAllowancePersonHandle = e => {
        const updatedAllowancePerson = [ ...generalStepData.persons ]
        updatedAllowancePerson[e.target.dataset.idx][e.target.dataset.name] = e.target.value
        setGeneralStepData({
            ...generalStepData,
            persons: updatedAllowancePerson
        })
    }

    return (
        <Fragment>

            <Card body>
                <Form.Row>
                    <Form.Group as={Col} sm={6} md={2} lg={2}>
                        <Form.Label htmlFor="seq">ลำดับที่ <span style={{color: 'red'}} >*</span></Form.Label>
                        <Form.Control 
                            type="text" 
                            name="seq" 
                            placeholder="ลำดับที่"
                            onChange={handleOnChange}
                            value={ generalStepData.seq }
                            ref={register}
                            isInvalid={!!errors.seq}
                            readOnly={update}
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.seq && errors.seq.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} sm={6} md={4} lg={4}>
                        <Form.Label htmlFor="date">วันที่ เดือน/วัน/ปี <span style={{color: 'red'}} >*</span></Form.Label>
                        <Form.Control 
                            type="date" 
                            name="date" 
                            onChange={handleOnChange}
                            value={ generalStepData.date }
                            ref={(e) => {
                                register(e)
                                dateRef.current = e
                            }}
                            isInvalid={ !!errors.date }

                        />
                        <Form.Control.Feedback type="invalid">
                            { errors.date && errors.date.message }
                        </Form.Control.Feedback>
                        <Form.Control.Feedback style={ generalStepData.date ?  { display: 'block' } : {}}>
                            { (generalStepData.date) && thaiDate(generalStepData.date) }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} sm={12} md={6} lg={6}>
                        <Form.Label htmlFor="applicant">ผู้ขอ <span style={{color: 'red'}} >*</span></Form.Label>
                        <Form.Control 
                            as="select" 
                            name="applicant" 
                            onChange={handleOnChange}
                            value={ generalStepData.applicant }
                            ref={register}
                            isInvalid={ !!errors.applicant }
                        >
                            <option value="">---เลือกชื่อผู้ขอ---</option>
                            {
                                personnels.map( p => (
                                    <option value={p.id} key={p.id}> {`${p.Prename.shortName}${p.fname} ${p.lname}`} </option>
                                ) )
                            }
                        </Form.Control>
                        
                        <Form.Control.Feedback type="invalid">
                            { errors.applicant && errors.applicant.message }
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

            </Card>


            <div className="mt-4" style={{fontWeight: 'bold'}}>คำชี้แจงการเดินทางไปราชการ</div>
            <Card body >
                <Form.Group as={Row}>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="นอกจังหวัด" 
                            name="inOrOutPro"
                            onChange={handleRadioOnChange}
                            value='out'
                            checked={ generalStepData.inOrOutPro === "out" }
                            ref={register}
                            isInvalid={ !!errors.inOrOutPro }
                        />
                    </Col>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="ในจังหวัด" 
                            name="inOrOutPro"
                            onChange={handleRadioOnChange}
                            ref={register}
                            value='in'
                            checked={ generalStepData.inOrOutPro === "in" }
                            isInvalid={ !!errors.inOrOutPro }
                            //isInvalid={ !!errors.inPro }
                            //feedback={ errors.inPro && errors.inPro.message }
                        />
                    </Col>

                    {
                        (generalStepData.inOrOutPro === "in") && (
                            <>
                                <Col>
                                    <Form.Check 
                                        type="radio" 
                                        label="ในอำเภอ" 
                                        name="inOrOutDist"
                                        onChange={handleRadioOnChange}
                                        value="in"
                                        checked={ generalStepData.inOrOutDist === "in" }
                                        ref={register} 
                                    />
                                </Col>
                                <Col>
                                    <Form.Check 
                                        type="radio" 
                                        label="นอกอำเภอ" 
                                        name="inOrOutDist"
                                        onChange={handleRadioOnChange}
                                        value="out"
                                        checked={ generalStepData.inOrOutDist === "out" }
                                        ref={register} />
                                </Col>
                            </>
                        )
                    }
                    
                    <Col>
                        <Form.Check 
                            type="checkbox" 
                            label="แผนเร่งด่วน" 
                            name="urgentPlan"
                            onChange={ e => handleCheckBoxOnChange(e.target.name, !!(generalStepData.urgentPlan)) }
                            ref={register}
                            value={ generalStepData.urgentPlan }
                            checked={ generalStepData.urgentPlan }
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="งบผู้จัด" 
                            name="budget"
                            onChange={handleRadioOnChange}
                            ref={register}
                            value='1'
                            defaultChecked={ generalStepData.budget === '1' } />
                    </Col>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="งบกลางสสจ.ตาก" 
                            name="budget" 
                            onChange={handleRadioOnChange}
                            ref={register}
                            value='2'
                            defaultChecked={ generalStepData.budget === '2' } />
                    </Col>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="เงินบำรุง" 
                            name="budget" 
                            onChange={handleRadioOnChange}
                            ref={register}
                            value='3'
                            defaultChecked={ generalStepData.budget === '3' } />
                    </Col>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="งบโครงการฝ่าย" 
                            name="budget" 
                            ref={register}
                            onChange={handleRadioOnChange}
                            value='4'
                            defaultChecked={ generalStepData.budget === '4' } />
                    </Col>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="ไม่เบิก" 
                            name="budget" 
                            ref={register}
                            onChange={handleRadioOnChange}
                            value='99'
                            defaultChecked={ generalStepData.budget === '99' } />
                    </Col>
                </Form.Group>
            </Card>

            <div className="mt-4" style={{fontWeight: 'bold'}}>พาหนะ</div>
            <Card body >
                <Form.Group as={Row}>
                    <Col>
                        <Form.Check 
                            inline 
                            type="radio" 
                            label="ประจำทาง" 
                            style={{paddingRight: 20}} 
                            name="vehicle"
                            onChange={handleRadioOnChange} 
                            ref={register}
                            value='1'
                            checked={ generalStepData.vehicle==="1" }
                        />
                    </Col>
                    <Col>
                        <Form.Check 
                            inline 
                            type="radio" 
                            label="รับจ้าง" 
                            style={{paddingRight: 20}} 
                            name="vehicle"
                            onChange={handleRadioOnChange} 
                            ref={register}
                            value="2"
                            checked={ generalStepData.vehicle==="2" }
                        />
                    </Col>
                    <Col>
                        <Form.Check 
                            inline 
                            type="radio" 
                            label="รถยนต์ส่วนตัว" 
                            name="vehicle"
                            onChange={handleRadioOnChange}
                            ref={register}
                            value="3"
                            checked={ generalStepData.vehicle==="3" }
                        />
                    </Col>
                    <Col>
                        <Form.Check 
                            inline 
                            type="radio" 
                            label="รถยนต์ราชการ" 
                            name="vehicle"
                            onChange={handleRadioOnChange}
                            ref={register}
                            value="4"
                            checked={ generalStepData.vehicle === "4" }
                        />
                    </Col>
                </Form.Group>
                {
                    (generalStepData.vehicle === "4") && (
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="carCode">ทะเบียนรถยนต์ราชการ</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    name="carCode"
                                    onChange={handleOnChange}
                                    value={ generalStepData.carCode } 
                                    ref={register}
                                    //disabled={ !enableInput }
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
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="driver">พนักงานขับรถ</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    name="driver"
                                    onChange={handleOnChange}
                                    value={ generalStepData.driver }
                                    ref={register}
                                    isInvalid={ !!errors.driver }
                                >
                                    <option value="">---เลือกพนักงานขับรถ---</option>
                                    {
                                        personnels.map( p => (
                                            <option value={p.id} key={p.id}> {`${p.Prename.shortName}${p.fname} ${p.lname}`} </option>
                                        ) )
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                    )
                }
            </Card>

            <div className="mt-4" style={{fontWeight: 'bold'}}>การเบิก</div>
            <Card body >
                <Form.Group as={Row} >
                    <Col>
                        <Form.Check 
                            inline 
                            type="radio" 
                            label="พักค้างคืน" 
                            style={{paddingRight: 20}} 
                            name="overnight"
                            ref={register}
                            onChange={handleRadioOnChange}
                            value="Y"
                            checked={ generalStepData.overnight==="Y" } />
                        <Form.Check 
                            inline 
                            type="radio" 
                            label="ไม่พักค้างคืน" 
                            style={{paddingRight: 20}} 
                            name="overnight"
                            ref={register}
                            onChange={handleRadioOnChange}
                            value="N"
                            checked={ generalStepData.overnight==="N" } />
                        <Form.Check 
                            inline 
                            type="checkbox" 
                            label="เบี้ยเลี้ยง" 
                            style={{paddingRight: 20}} 
                            name="allowance"
                            onChange={ e => handleCheckBoxOnChange(e.target.name, (generalStepData.allowance)) }
                            ref={register}
                            value={ generalStepData.allowance }
                            checked={ generalStepData.allowance } />
                        <Form.Check 
                            inline 
                            type="checkbox" 
                            label="ค่าพาหนะ" 
                            style={{paddingRight: 20}} 
                            name="busFee"
                            onChange={ e => handleCheckBoxOnChange(e.target.name, (generalStepData.busFee)) }
                            ref={register}
                            value={ generalStepData.busFee }
                            checked={ generalStepData.busFee } />
                        <Form.Check 
                            inline 
                            type="checkbox" 
                            label="ค่าเช่าที่พัก" 
                            name="accomRent"
                            onChange={ e => handleCheckBoxOnChange(e.target.name, (generalStepData.accomRent)) }
                            ref={register}
                            value={ generalStepData.accomRent }
                            checked={ generalStepData.accomRent } />
                    </Col>
                </Form.Group>
                <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Check 
                                inline 
                                type="checkbox" 
                                label="อื่นๆ" 
                                name="others"
                                ref={register}
                                onChange={ e => handleCheckBoxOnChange(e.target.name, (generalStepData.others)) }
                                value={ generalStepData.others }
                                checked={ generalStepData.others }
                            />
                            <Form.Control 
                                style={{marginTop: 4}}
                                type="text" 
                                name="othersDetials" 
                                placeholder="รายละเอียด อื่นๆ" 
                                ref={(e) => {
                                    register(e)
                                    othersDetialsRef.current = e
                                }}
                                onChange={handleOnChange}
                                value={ generalStepData.othersDetials }
                                disabled={ !generalStepData.others }
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="fuelCostFrom">เบิกค่าน้ำมันเชื้อเพลิงจากงบ</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="fuelCostFrom" 
                                ref={register}
                                onChange={handleOnChange}
                                value={ generalStepData.fuelCostFrom }
                                placeholder="เบิกค่าน้ำมันเชื้อเพลิงจากงบ..."/>
                        </Form.Group>
                </Form.Row>
            </Card>

            <div className="mt-4" style={{fontWeight: 'bold'}}>เรื่อง / งานที่ไปราชการ</div>
            <Card body className="mb-5">
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="name">เรื่อง/งานที่ไปราชการ</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={5} 
                            name="name"
                            ref={register}
                            onChange={handleOnChange}
                            value={ generalStepData.name }
                        ></Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Group as={Row}>
                    <Form.Label column htmlFor="place">สถานที่ </Form.Label>
                    <Col sm="10">
                        <Form.Control 
                            type="text" 
                            name="place" 
                            placeholder="กรอกสถานที่ "
                            ref={register}
                            onChange={handleOnChange}
                            value={ generalStepData.place }
                        />
                    </Col>
                </Form.Group>
                

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="province">จังหวัด</Form.Label>
                        <Form.Control 
                            as="select" 
                            name="province" 
                            placeholder="จังหวัด"
                            ref={register}
                            onChange={handleOnChange}
                            value={ generalStepData.province }
                        >
                            <option value="">---เลือกจังหวัด---</option>
                            {
                                provinces.map( p => (
                                    <option value={p.code} key={p.id}> { `${p.nameTh}` } </option>
                                ) )
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="district">อำเภอ</Form.Label>
                        <Form.Control 
                            as="select" 
                            name="district" 
                            placeholder="อำเภอ"
                            ref={register}
                            onChange={handleOnChange}
                            value={ generalStepData.district }    
                        >
                            <option value="">---เลือกอำเภอ---</option>
                            {
                                amphures.map( p => (
                                    <option value={p.code} key={p.id}> { `${p.nameTh}` } </option>
                                ) )
                            }
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="startDate">ไปตั้งแต่วันที่ <span style={{color: 'red'}} >*</span></Form.Label>
                        <Form.Control 
                            type="date" 
                            name="startDate"
                            onChange={onDateTimeChange}
                            ref={register}
                            value={ generalStepData.startDate }
                            isInvalid={!!errors.startDate}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="startDate">เวลา</Form.Label>
                        <Form.Control 
                            type="time" 
                            name="startTime"
                            onChange={onDateTimeChange}
                            ref={register}
                            value={ generalStepData.startTime }
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="endDate">กลับถึงวันที่ <span style={{color: 'red'}} >*</span></Form.Label>
                        <Form.Control 
                            type="date" 
                            name="endDate"
                            min={ generalStepData.startDate }
                            onChange={onDateTimeChange}
                            ref={register}
                            value={ generalStepData.endDate }
                            isInvalid={!!errors.endDate}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="endDate">เวลา</Form.Label>
                        <Form.Control 
                            type="time" 
                            name="endTime"
                            onChange={onDateTimeChange}
                            ref={register}
                            value={ generalStepData.endTime }
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="1">
                        <Form.Label htmlFor="noDays">รวมวัน</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="noDays" 
                            placeholder="จำนวนวัน"
                            onFocus={ calculateDays }
                            ref={register}
                            value={ generalStepData.noDays }
                            readOnly
                        />
                    </Form.Group>
                </Form.Row>

            </Card>


            <div className="mt-4" style={{fontWeight: 'bold'}}>ผู้เดินทางไปราชการ</div>
            <Card body className="mb-5">
                <Form.Row style={{textAlign: 'center'}}>
                    <Col md={{span:6}}>
                        รายชื่อผู้เดินทางไปราชการ
                    </Col>
                    <Col md={{span:1, offset: 5}}>
                        <Button variant="info" block size="sm"
                            onClick={ addAllowancePerson }
                            title="เพิ่มรายการ"
                        ><FontAwesomeIcon icon={faPlusCircle} /></Button>
                    </Col>
                </Form.Row>
                {
                    generalStepData.persons.map( (person, idx) => 
                        <SelectPersonComponent
                            register={register}
                            person={person} 
                            personnels={personnels}
                            removeAllowancePerson={removeAllowancePerson}
                            onChangeAllowancePersonHandle={onChangeAllowancePersonHandle}
                            idx={idx} 
                            key={idx}
                            errors={errors}
                        />
                    )
                }
                

            </Card>

        </Fragment>
    )
}

export default GeneralAllowanceFormComponent
