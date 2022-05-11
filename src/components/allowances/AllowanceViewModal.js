import React, { Fragment, useState }  from 'react'
import { useSelector } from 'react-redux'

import { Modal, Button, Alert, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch
} from '@fortawesome/free-solid-svg-icons'
import { PDFViewer } from "@react-pdf/renderer"

import AllowanceReport from '../reports/allowances/allowance'
import AllowanceCarReport from '../reports/allowances/allowanceCar'
import AllowanceCostReport from '../reports/allowances/allowanceCost'

const AllowanceViewModal = ({
    allowance
}) => {

    const initShow = {
        id1: false,
        id2: false,
        id3: false
    }

    const { allowanceCarUse, allowanceCost } = allowance

    const { office } = useSelector(state => state.app)
    const [modal, setModal] = useState(false)

    const [showContent, setShowContent] = useState(initShow)

    const showModal = () => {
        setModal(true)
    }
    const hideModal = () => {
        setModal(false)
        setShowContent(initShow)
    }

    const onClickShowItem = e => {
        const {name} = e.target
        setShowContent(initShow)
        setShowContent( prev => ({
            ...prev,
            [name]: !showContent[name]
        }))
    }

    return (
        <Fragment>
            <Button
                variant="info"
                title={`ดูข้อมูล เลขที่ ${allowance.seq}`}
                onClick={showModal}
            >
                <FontAwesomeIcon icon={faSearch} />
            </Button>


            <Modal
                size="xl"
                show={modal}
                onHide={hideModal}
                // backdrop="static"
                // keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        {`หนังสือขออนุญาตไปราชการ เลขที่ ${allowance.seq}`}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Fragment>

                        {/* <PDFViewer style={{width: "100%", height: "70vh"}}>
                            <AllowanceCarReport {...allowance} fullName={office.fullName} toggle={toggle} />
                        </PDFViewer> */}

                        <Alert variant='success' className="text-center">
                            <Row>
                                <Col>
                                    <h5>ใบขออนุญาตเดินทางไปราชการ </h5>   
                                    <section>
                                        <Alert.Link 
                                            href="#" 
                                            className='text-right'
                                            name='id1'
                                            onClick={onClickShowItem}
                                        >
                                            ดูใบขออนุญาตเดินทางไปราชการ
                                        </Alert.Link>
                                    </section>
                                </Col>
                                { allowanceCarUse.length !== 0 && (
                                    <Col>
                                        <h5>ใบขออนุญาตใช้รถยนต์ราชการ </h5>   
                                        <section>
                                            <Alert.Link 
                                                href="#" 
                                                className='text-right'
                                                name='id2'
                                                onClick={onClickShowItem}
                                            >
                                                ใบขออนุญาตใช้รถยนต์ราชการ
                                            </Alert.Link>
                                        </section>
                                    </Col>
                                ) }

                                { allowanceCost.length !== 0 && (
                                    <Col>
                                        <h5>ค่าใช้จ่ายในการเดินทางไปราชการ </h5>   
                                        <section>
                                            <Alert.Link 
                                                href="#" 
                                                className='text-right'
                                                name='id3'
                                                onClick={onClickShowItem}
                                            >
                                                ใบเบิกค่าใช้จ่ายในการเดินทางไปราชการ
                                            </Alert.Link>
                                        </section>
                                    </Col>
                                )}
                            </Row>
                        </Alert>

                            { showContent['id1'] && (
                                <PDFViewer style={{width: "100%", height: "60vh"}}>
                                    <AllowanceReport {...allowance} {...office} showModal={showModal} hideModal={hideModal} />
                                </PDFViewer>
                            )}

                            { showContent['id2'] && (
                                <PDFViewer style={{width: "100%", height: "60vh"}}>
                                    <AllowanceCarReport {...allowance} fullName={office.fullName} showModal={showModal} hideModal={hideModal} />
                                </PDFViewer>
                            )}

                            { showContent['id3'] && (
                                <PDFViewer style={{width: "100%", height: "60vh"}}>
                                    <AllowanceCostReport allowance={allowance} fullName={office.fullName} showModal={showModal} hideModal={hideModal} />
                                </PDFViewer>
                            )}
                            

                    </Fragment>
                    
                </Modal.Body>

                <Modal.Footer>
                    {/* <Button variant="success">ดาวน์โหลด</Button> */}
                    <Button variant="danger" onClick={hideModal} >ปิด</Button>
                </Modal.Footer>

                        
                    
            </Modal>
        </Fragment>
    )
}

export default AllowanceViewModal
