import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Card, Form, Col, Row } from 'react-bootstrap'

import { thaiDate } from '../../../utillities/anotherFunctions'
import CalculateAllowance from './CalculateAllowance'

const CostAllowanceFormComponent = ({
    formProps: {register, errors},
    costStepData,
    generalStepData,
    setCostStepData,
    showCostForm, 
    setShowCostForm
}) => {

    const { personnels } = useSelector(state => state.app)
    // const selfNameRef = useRef()
    const [daysData, setDaysData] = useState([])
    
    const [initData] = useState(costStepData)

    useEffect(() => {
        if(costStepData.length !== 0 ){
            setShowCostForm('1')
        }
        if(showCostForm === '1'){
            const { startDate, startTime, endDate, endTime } = generalStepData
            const startDateTime = new Date(`${startDate} ${startTime}`)
            const endDateTime = new Date(`${endDate} ${endTime}`)
            const noDays = ~~(((endDateTime-startDateTime)/(1000*60*60))/24)
            const noHours = (((endDateTime-startDateTime)/(1000*60*60))%24)
            setCostStepData({
                ...initData,
                belongTo: generalStepData.seq,
                belongToDate: generalStepData.date,
                noDays,
                noHours,
                travelDays: noDays
            })
        } else {
            setCostStepData({})
        }

    }, [])

    const handleInputOnChange = e => {
        const { name, value } = e.target
        setCostStepData({
            ...costStepData,
            [name]: value
        })
        if(name==="travelDays" && value==="0"){
            setDaysData([])
        }
    }

    const handleOnShowCostForm = (e) => {
        const { value } = e.target
        // console.log(name, value)
        setShowCostForm( value )
        if (value===0){
            setCostStepData({})
        } else {
            const { startDate, startTime, endDate, endTime } = generalStepData
            const startDateTime = new Date(`${startDate} ${startTime}`)
            const endDateTime = new Date(`${endDate} ${endTime}`)
            const noDays = ~~(((endDateTime-startDateTime)/(1000*60*60))/24)
            const noHours = (((endDateTime-startDateTime)/(1000*60*60))%24)
            setCostStepData({
                ...initData,
                belongTo: generalStepData.seq,
                belongToDate: generalStepData.date,
                noDays,
                noHours,
                travelDays: noDays
            })
        }
    }

    const handleRadioOnChange = (e) => {
        const { name, value } = e.target
        // console.log(name, value)
        setCostStepData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const calCostOnInputChange = e => {
        const { name, value } = e.target
        const found = daysData.findIndex( item => item.name===name )

        if( found === -1 ){
            setDaysData([...daysData, { name: name, value: value }])
        } else {
            setDaysData([...daysData].map( item => item.name===name ? {...item, value: value} : item ))
        }
    }

    const calculateTravelCost = () => {
        let total = daysData.reduce( (total, item) => ( parseFloat(total) + parseFloat(item.value) ), 0.00)
        // console.log(total, daysData)
        
        setCostStepData({
            ...costStepData,
            travelCost: total.toFixed(2)
        })
    }

    return (
        <>
            <Form.Group as={Row}>
                <Form.Label as="legend" column sm={{ span: 3, offset: 2 }}>
                    ?????????????????????????????????????????????????????????
                </Form.Label>
                <Col sm={5}>
                    <Form.Check
                        inline
                        type="radio" 
                        label="?????????????????????????????????" 
                        name="showCostForm"
                        onChange={handleOnShowCostForm}
                        value='0'
                        checked={ showCostForm === '0' }
                    />
                    <Form.Check
                        inline
                        type="radio" 
                        label="???????????????????????????" 
                        name="showCostForm" 
                        onChange={handleOnShowCostForm}
                        value='1'
                        ref={register}
                        checked={ showCostForm === '1' }
                    />
                </Col>
            </Form.Group>

        { showCostForm === '1' && 
        <>

        <div className="mt-4" style={{fontWeight: 'bold'}}>??????????????????????????????????????????????????????????????????????????????????????????</div>

        <Card body>

                {/* ???????????????????????????????????? */}
                <Form.Row>
                    <Form.Group as={Col} sm={4} md={2} lg={2}>
                        <Form.Label htmlFor="borrowNo">?????????????????????????????????</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="borrowNo" 
                            placeholder="??????????????????" 
                            value={ costStepData.borrowNo }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.borrowNo}
                        />
                        <Form.Control.Feedback type="invalid">
                            { errors.borrowNo && errors.borrowNo.message }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm={8} md={5} lg={5}>
                        <Form.Label htmlFor="borrower">????????????????????????????????????????????????</Form.Label>
                        <Form.Control 
                            as="select" 
                            name="borrower" 
                            value={ costStepData.borrower === null && "" }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={ !!errors.borrower }
                        >
                            <option value="">---???????????????????????????????????????????????????---</option>
                            {
                                personnels.map( p => (
                                    <option value={p.id} key={p.id}> {`${p.Prename.shortName}${p.fname} ${p.lname}`} </option>
                                ) )
                            }
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            { errors.borrower && errors.borrower.message }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} sm={8} md={3} lg={3}>
                        <Form.Label htmlFor="borrowDate">??????????????????</Form.Label>
                        <Form.Control 
                            type="date" 
                            name="borrowDate" 
                            // placeholder="??????????????????" 
                            value={ costStepData.borrowDate === null && "" }
                            ref={register}
                            onChange={handleInputOnChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm={4} md={2} lg={2}>
                        <Form.Label htmlFor="borrowAmount">???????????????????????????</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="borrowAmount" 
                            placeholder="???????????????????????????" 
                            value={ costStepData.borrowAmount }
                            ref={register}
                            onChange={handleInputOnChange}
                        />
                    </Form.Group>
                </Form.Row>

                <hr />

                <Form.Row>
                    <Form.Group as={Col} sm={12} md={6} lg={6}>
                        <Form.Label htmlFor="to">??????????????? <span style={{color: 'red'}} >*</span></Form.Label>
                        <Form.Control 
                            type="text" 
                            name="to" 
                            placeholder="????????????????????????..." 
                            value={ costStepData.to }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.to}
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.to && errors.to.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} sm={12} md={6} lg={6}>
                        <Form.Label htmlFor="writer">???????????????????????????????????? <span style={{color: 'red'}} >*</span></Form.Label>
                        <Form.Control 
                            as="select" 
                            name="writer" 
                            placeholder="????????????????????????????????????" 
                            value={ costStepData.writer }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.writer}
                        >
                            <option value="">---???????????????????????????????????????????????????---</option>
                            {
                                personnels.map( p => (
                                    <option value={p.id} key={p.id}> {`${p.Prename.shortName}${p.fname} ${p.lname}`} </option>
                                ) )
                            }
                        </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                { errors.writer && errors.writer.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="agency">?????????????????? <span style={{color: 'red'}} >*</span></Form.Label>
                        <Form.Control 
                            type="text" 
                            name="agency" 
                            placeholder="??????????????????" 
                            value={ costStepData.agency }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.agency}
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.agency && errors.agency.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="writeDate">????????????????????????????????? <span style={{color: 'red'}} >*</span></Form.Label>
                        <Form.Control 
                            type="date" 
                            name="writeDate" 
                            placeholder="?????????????????????????????????" 
                            value={ costStepData.writeDate }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.writeDate}
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.writeDate && errors.writeDate.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <hr />

                <Form.Row>
                    <Form.Group as={Col} sm={6} md={3} lg={3}>
                        <Form.Label htmlFor="belongTo">???????????????????????????/?????????????????? ?????????</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="belongTo" 
                            placeholder="??????????????????" 
                            value={ costStepData.belongTo }
                            //ref={register}
                            //onChange={handleInputOnChange}
                            //isInvalid={!!errors.belongTo}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group as={Col} sm={6} md={4} lg={4}>
                        <Form.Label htmlFor="belongToDate">????????????????????????</Form.Label>
                        <Form.Control 
                            type="date" 
                            name="belongToDate" 
                            placeholder="????????????????????????" 
                            value={ costStepData.belongToDate }
                            ref={register}
                            // onChange={handleInputOnChange}
                            isInvalid={!!errors.belongToDate}
                            readOnly
                        />
                            {/* <Form.Control.Feedback type="invalid">
                                { errors.belongToDate && errors.belongToDate.message }
                            </Form.Control.Feedback> */}
                            <Form.Control.Feedback style={ costStepData.belongToDate ?  { display: 'block' } : {}}>
                            { (costStepData.belongToDate) && thaiDate(costStepData.belongToDate) }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor="noDays">????????????????????????(?????????)</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="noDays" 
                            placeholder="????????????????????????" 
                            defaultValue={ costStepData.noDays }
                            ref={register}
                            // onChange={handleInputOnChange}
                            isInvalid={!!errors.noDays}
                            disabled
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.noDays && errors.noDays.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="noHours">(?????????????????????)</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="noHours" 
                            placeholder="????????????????????????????????????" 
                            value={ costStepData.noHours }
                            ref={register}
                            // onChange={handleInputOnChange}
                            isInvalid={!!errors.noHours}
                            disabled
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.noHours && errors.noHours.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>


                <Form.Row>
                    <Col>
                        <Form.Label htmlFor="noHours">???????????????????????????????????????</Form.Label>
                    </Col>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="?????????????????????" 
                            name="departFrom"
                            onChange={handleRadioOnChange}
                            ref={register}
                            value='H'
                            checked={ costStepData.departFrom === 'H' } />
                    </Col>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="????????????????????????" 
                            name="departFrom" 
                            onChange={handleRadioOnChange}
                            ref={register}
                            value='O'
                            checked={ costStepData.departFrom === 'O' } />
                    </Col>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="???????????????????????????" 
                            name="departFrom" 
                            onChange={handleRadioOnChange}
                            ref={register}
                            value='T'
                            checked={ costStepData.departFrom === 'T' } />
                    </Col>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="????????????????????????" 
                            name="meOrGroup" 
                            ref={register}
                            onChange={handleRadioOnChange}
                            value='M'
                            checked={ costStepData.meOrGroup === 'M' } />
                    </Col>
                </Form.Row>

                <Form.Row>
                    <Col>
                        <Form.Label htmlFor="noHours">??????????????????????????????????????????</Form.Label>
                    </Col>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="?????????????????????" 
                            name="arriveTo"
                            onChange={handleRadioOnChange}
                            ref={register}
                            value='H'
                            checked={ costStepData.arriveTo === 'H' } />
                    </Col>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="????????????????????????" 
                            name="arriveTo" 
                            onChange={handleRadioOnChange}
                            ref={register}
                            value='O'
                            checked={ costStepData.arriveTo === 'O' } />
                    </Col>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="???????????????????????????" 
                            name="arriveTo" 
                            onChange={handleRadioOnChange}
                            ref={register}
                            value='T'
                            checked={ costStepData.arriveTo === 'T' } />
                    </Col>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="??????????????????????????????" 
                            name="meOrGroup" 
                            ref={register}
                            onChange={handleRadioOnChange}
                            value='G'
                            checked={ costStepData.meOrGroup === 'G' } />
                    </Col>
                </Form.Row>

                <hr />

                {/* ????????????????????????????????????????????????????????????????????????????????? */}
                <Form.Row style={{fontSize: "small"}}>
                    <Form.Group as={Col} sm={12} md={7} lg={7}>
                        <Form.Label htmlFor="travelType">?????????????????????????????????????????????????????????????????????????????????</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="travelType" 
                            placeholder="?????????????????????????????????????????????????????????????????????????????????" 
                            value={ costStepData.travelType }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.travelType}
                            size="sm"
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.travelType && errors.travelType.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="travelDays">???????????????(?????????)</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="travelDays" 
                            placeholder="???????????????(?????????)" 
                            value={ costStepData.travelDays }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.travelDays}
                            min="0"
                            max="10"
                            size="sm"
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.travelDays && errors.travelDays.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="travelCost">????????? (?????????)</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="travelCost" 
                            placeholder="????????? (?????????)" 
                            value={ costStepData.travelCost }
                            ref={register}
                            onDoubleClick={calculateTravelCost}
                            isInvalid={!!errors.travelCost}
                            size="sm"
                            readOnly
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.travelCost && errors.travelCost.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                {/* ???????????????????????????????????????????????? */}
                {
                    costStepData.travelDays > 0 ? 
                    <CalculateAllowance 
                        days={costStepData.travelDays} 
                        daysData={daysData} 
                        setDaysData={setDaysData} 
                        calCostOnInputChange={calCostOnInputChange}
                    />
                    :
                    ""
                }

                {/* ????????????????????????????????????????????????????????? */}
                <Form.Row style={{fontSize: "small"}}>
                    <Form.Group as={Col} sm={12} md={7} lg={7}>
                        <Form.Label htmlFor="restType">?????????????????????????????????????????????????????????</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="restType" 
                            placeholder="?????????????????????????????????????????????????????????" 
                            value={ costStepData.restType }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.restType}
                            size="sm"
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.restType && errors.restType.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="restDays">???????????????(?????????)</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="restDays" 
                            placeholder="???????????????(?????????)" 
                            value={ costStepData.restDays }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.restDays}
                            size="sm"
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.restDays && errors.restDays.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="restCost">????????? (?????????)</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="restCost" 
                            placeholder="????????? (?????????)" 
                            value={ costStepData.restCost }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.restCost}
                            size="sm"
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.restCost && errors.restCost.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                {/* ??????????????????????????????????????????????????? */}
                <Form.Row style={{fontSize: "small"}}>
                    <Form.Group as={Col} sm={12} md={7} lg={7}>
                        <Form.Label htmlFor="vehicleType">???????????????????????????????????????????????????</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="vehicleType" 
                            placeholder="???????????????????????????????????????????????????" 
                            value={ costStepData.vehicleType }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.vehicleType}
                            size="sm"
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.vehicleType && errors.vehicleType.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="vehicleDays">???????????????(?????????)</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="vehicleDays" 
                            placeholder="???????????????(?????????)" 
                            value={ costStepData.vehicleDays }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.vehicleDays}
                            size="sm"
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.vehicleDays && errors.vehicleDays.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="vehicleCost">????????? (?????????)</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="vehicleCost" 
                            placeholder="????????? (?????????)" 
                            value={ costStepData.vehicleCost }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.vehicleCost}
                            size="sm"
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.vehicleCost && errors.vehicleCost.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                {/* ????????????????????????????????????????????? */}
                <Form.Row style={{fontSize: "small"}}>
                    <Form.Group as={Col} sm={12} md={7} lg={7}>
                        <Form.Label htmlFor="otherType">?????????????????????????????????????????????</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="otherType" 
                            placeholder="?????????????????????????????????????????????" 
                            value={ costStepData.otherType }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.otherType}
                            size="sm"
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.otherType && errors.otherType.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="otherDays">???????????????(?????????)</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="otherDays" 
                            placeholder="???????????????(?????????)" 
                            value={ costStepData.otherDays }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.otherDays}
                            size="sm"
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.otherDays && errors.otherDays.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="otherCost">????????? (?????????)</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="otherCost" 
                            placeholder="????????? (?????????)" 
                            value={ costStepData.otherCost }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.otherCost}
                            size="sm"
                        />
                            <Form.Control.Feedback type="invalid">
                                { errors.otherCost && errors.otherCost.message }
                            </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>


                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm={6} md={4} lg={4}>
                        ????????????????????????????????????????????????????????? (????????????)
                    </Form.Label>
                    <Col sm={6} md={2} lg={2}>
                        <Form.Control 
                            type="number" 
                            name="attachmentNo" 
                            placeholder="?????????????????????????????????" 
                            value={ costStepData.attachmentNo }
                            ref={register}
                            onChange={handleInputOnChange}
                            isInvalid={!!errors.attachmentNo}
                            size="sm"
                        />
                    </Col>
                </Form.Group>

            </Card>
            </>
            }
        </>
    )
}

export default CostAllowanceFormComponent