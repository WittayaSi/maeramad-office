import React, { Fragment } from 'react'
import { Row, Col, ListGroup, ListGroupItem, Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const OfficeDataComponent = () => {

    const { office } = useSelector(state => state.app)

    return (
        <>
        { 
            office && Object.keys(office).length > 0 ? 
            <Fragment>
                <ListGroup>
                    <ListGroupItem>
                        <Row>
                            <Col md={5} style={{textAlign: 'right'}}>
                                <b>ชื่อเต็มหน่วยงาน</b>
                            </Col>
                            <Col md={{ span: 5, offset: 1 }}>
                                { office.fullName }
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col md={5} style={{textAlign: 'right'}}>
                                <b>ชื่อย่อหน่วยงาน</b>
                            </Col>
                            <Col md={{ span: 5, offset: 1 }}>
                                { office.shortName }
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col md={5} style={{textAlign: 'right'}}>
                                <b>ที่อยู่</b>
                            </Col>
                            <Col md={{ span: 5, offset: 1 }}>
                                { office.address }
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col md={5} style={{textAlign: 'right'}}>
                                <b>เบอร์ โทรศัพท์ / แฟกซ์</b>
                            </Col>
                            <Col md={{ span: 5, offset: 1 }}>
                                { `${office.telNo} / ${ office.faxNo }` }
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col md={5} style={{textAlign: 'right'}}>
                                <b>หัวหน้าหน่วยงาน</b>
                            </Col>
                            <Col md={{ span: 5, offset: 1 }}>
                                { `${office.officeChiefName} ตำแหน่ง: ${office.officeChiefPosition}` }
                            </Col>
                        </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Row>
                            <Col md={5} style={{textAlign: 'right'}}>
                                <b>หัวหน้างานพัสดุ</b>
                            </Col>
                            <Col md={{ span: 5, offset: 1 }}>
                                { `${office.inventoryChiefName} ตำแหน่ง: ${office.inventoryChiefPosition}` }
                            </Col>
                        </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Row>
                            <Col md={5} style={{textAlign: 'right'}}>
                                <b>เจ้าหน้าที่งานพัสดุ</b>
                            </Col>
                            <Col md={{ span: 5, offset: 1 }}>
                                { `${office.inventoryStaffName} ตำแหน่ง: ${office.inventoryStaffPosition}` }
                            </Col>
                        </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Row>
                            <Col md={5} style={{textAlign: 'right'}}>
                                <b>เจ้าหน้าที่การเงิน</b>
                            </Col>
                            <Col md={{ span: 5, offset: 1 }}>
                                { `${office.financeOfficerName} ตำแหน่ง: ${office.financeOfficerPosition}` }
                            </Col>
                        </Row>
                    </ListGroupItem>
                    
                </ListGroup>
            </Fragment>
            : 
            <Alert variant="danger" className="text-center">
                ยังไม่ได้เพิ่มข้อมูล หน่วยงาน
            </Alert>
        }
        </>
        
    )
}

export default OfficeDataComponent
