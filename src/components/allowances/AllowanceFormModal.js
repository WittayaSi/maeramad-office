import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useForm } from 'react-hook-form'
import {
    Modal, Button, Form, Alert
} from 'react-bootstrap'
import Stepper from 'react-stepper-horizontal'

import GeneralAllowanceForm from './subcomponents/GeneralAllowanceForm'
import CarAllowanceForm from './subcomponents/CarAllowanceForm'
import NotUseCar from './subcomponents/NotUseCar'

import { createAllowance, updateAllowance } from '../../actions/allowanceAction'
import { firstStepSchema, secondStepSchema, thirdStepSchema, notInputSchema } from './subcomponents/yupFormValidate'


const AllowanceFormModal = ({ data: {
    showModal,
    hideModal,
    modal,
    setModal,
    update,
    setUpdate,
    generalStepData,
    setGeneralStepData,
    carStepData, 
    setCarStepData,
    costStepData, 
    setCostStepData,
    generalInitialData, 
    carInitialData, 
    costInitialData,
    oldAllowanceData
} }) => {

    const blankPerson = {
        personId: ''
    }

    const dispatch = useDispatch()

    const [showCostForm, setShowCostForm] = useState('0')
    
    const [activeStep, setActiveStep] = useState(0)

    const [completed, setCompleted] = useState(false);
    const [errors, setErrors] = useState({});

    // const handleOnClickStep = (e) => {
    //     // console.log(e.target)
    // }
    const firstStepForm = useForm({
        validationSchema: firstStepSchema,
        //defaultValues: firstStepInitialData
    })
    const secondStepForm = useForm({
        validationSchema: secondStepSchema
    })
    const thirdStepForm = useForm({
        validationSchema: thirdStepSchema
    })
    const notValidate = useForm({
        validationSchema: notInputSchema
    })

    const onSubmit = data => {
        // // console.log(data)
        switch (activeStep) {
            case 0: 
                // console.log(generalStepData)
                break
            case 1: 
                // console.log(carStepData)
                break
            default:
                break
        }
        handleNextStep()
    }

    const addAllowancePerson = () => {
        setGeneralStepData({
            ...generalStepData,
            persons: [...generalStepData.persons, blankPerson]
        })
    }

    const removeAllowancePerson = (e) => {
        //// console.log(e.target.dataset.idx)
        const idx = parseInt(e.target.dataset.idx)
        let removedAllowancePerson = generalStepData.persons.filter( (person, index) => (index!==idx))
        // console.log(removedAllowancePerson)
        setGeneralStepData(prev => ({
            ...prev,
            persons: removedAllowancePerson
        }))
    }

    const steps = [
        {
            title: 'ขออนุญาตไปราชการ'
        }, 
        {
            title: 'ขออนุญาตใช้รถ'
        }, 
        // {
        //     title: 'ค่าใช้จ่ายในการเดินทาง'
        // }
    ]
    const getStepContent = active => {
        switch (active) {
            case 0:
                return <GeneralAllowanceForm 
                    formProps={firstStepForm} 
                    generalStepData={generalStepData}
                    update={update}
                    setGeneralStepData={setGeneralStepData}
                    carStepData= {carStepData}
                    setCarStepData={setCarStepData}
                    addAllowancePerson={addAllowancePerson}
                    removeAllowancePerson={removeAllowancePerson}
                />
            case 1:
                return generalStepData.vehicle === "4" ? 
                    <CarAllowanceForm 
                        formProps={secondStepForm}
                        carStepData= {carStepData}
                        setCarStepData={setCarStepData}
                        generalStepData={generalStepData}
                        setGeneralStepData={setGeneralStepData}
                    /> 
                    : 
                    <NotUseCar />
            // case 2: 
            //     return <CostAllowanceForm 
            //         formProps={thirdStepForm}
            //         costStepData={costStepData}
            //         generalStepData={generalStepData}
            //         setCostStepData={setCostStepData}
            //         showCostForm={showCostForm}
            //         setShowCostForm={setShowCostForm}
            //     />
            default:
                return 'Unknown Component'
        }
    }

    const handleNextStep = () => {
        if(activeStep < 1) {
            setActiveStep(prevActiveStep => prevActiveStep + 1)
        }
        if(activeStep === 1){

            ( update ? updateAllowance({generalStepData, carStepData, costStepData}, oldAllowanceData) : createAllowance({generalStepData, carStepData, costStepData}) ) 
            .then( allowance => {
                setCompleted(true)
                setTimeout(() => {
                    setModal( modal => !modal)
                    dispatch(allowance)
                    handleResetStep()
                }, 3000)
            }).catch(err => {
                setCompleted(false)
                setErrors(err)
            })
        }
        
    }

    const handleBackStep = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }
    
    const handleResetStep = () => {
        setGeneralStepData(generalInitialData)
        setCarStepData(carInitialData)
        // setCostStepData(costInitialData)
        setActiveStep(0)
    }

    return (
        <Fragment>
        
            <Button variant="primary" block 
                onClick={showModal}
            >
                เขียนขออนุญาตไปราชการ
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
                        เพิ่ม/แก้ไข ขออนุญาตไปราชการ
                    </Modal.Title>
                </Modal.Header>

                    <Modal.Body>
                        

                        { 
                            completed &&  
                            <Alert 
                                variant={completed ? 'success': 'danger'} 
                                className='text-center'
                            >
                                {
                                    completed ? 
                                    'Update || Create Completed.' 
                                    : 
                                    'Update || Create Incomplete !!!'
                                }
                            </Alert>
                        }
                        
                        <Form 
                            noValidate 
                            onSubmit={
                                activeStep === 0 ? 
                                    firstStepForm.handleSubmit(onSubmit)
                                    : 
                                    (
                                        activeStep === 1 ? 
                                            (
                                                generalStepData.vehicle === "4" ? 
                                                    secondStepForm.handleSubmit(onSubmit)
                                                    : 
                                                    notValidate.handleSubmit(onSubmit)
                                            )
                                            :
                                            (
                                                showCostForm === "1" ? 
                                                    thirdStepForm.handleSubmit(onSubmit)
                                                    :
                                                    notValidate.handleSubmit(onSubmit)
                                            )
                                            
                                    )
                            }
                        >
                        <Stepper steps={ steps } 
                            activeStep={ activeStep }
                            completeBarColor="#00BA75"
                            completeColor="#00BA75"
                            activeColor="#EE9102"
                        />
                        


                        <div style={{marginTop: '3rem'}}>
                            {(activeStep === steps.length) && completed ? (
                                <div style={{textAlign: 'center'}}>
                                    <h3>All steps completed</h3>
                                    <p>บันทึกข้อมูล</p>
                                </div>
                            ) : (
                            <div>
                                {/* สำหรับเรียกใช้ function getStepContent(พร้อมส่งindexไป)เพื่อเลือกcomponenet ตาม Switch case
                                ถ้าเอามาจาก material ui อย่าลืมเปลี่ยนจากTypography เป็น div ล่ะ */}

                                <div style={{ height: '50vh', overflowY: 'auto', border: '1px solid', borderRadius: '10px' }}> 
                                    <div style={{padding: 10}}>{ getStepContent(activeStep) }</div>
                                </div>

                                
                                <div className='row' style={{marginTop: '2rem'}}>
                                    <div className='col-md-6'>
                                        <Button
                                            onClick={handleBackStep}
                                            style={{
                                                    display: (activeStep === 0) ? 'none' : 'block'
                                                }}
                                        >
                                            ย้อนกลับ
                                        </Button>
                                    </div>
                                    <div className='col-md-6'>
                                        <nav className="nav justify-content-end">
                                            <Button 
                                                variant="primary"
                                                // onClick={handleNextStep}
                                                type="submit"
                                                // style={{
                                                //     display: (activeStep === steps.length) ? 'none' : 'block'
                                                // }}
                                            >
                                                {(activeStep === steps.length - 1 ) ? 'บันทึกข้อมูล' : 'ถัดไป' }
                                            </Button>
                                        </nav>
                                        
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                        </Form>

                        
                    </Modal.Body>

                    <Modal.Footer>
                        {/* <Button type="submit" variant="success" disabled={ !(activeStep === steps.length) }>บันทึกข้อมูล</Button> */}
                        <Button onClick={handleResetStep}>รีเซต</Button>
                        <Button variant="danger" onClick={hideModal} >X</Button>
                    </Modal.Footer>

                {/* </Form> */}
            </Modal>
        </Fragment>
    )
}

export default AllowanceFormModal
