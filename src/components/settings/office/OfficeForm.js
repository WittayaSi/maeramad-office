import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col } from 'react-bootstrap'
import InputMask from "react-input-mask"


const OfficeForm = ({ values: { initOffice, onChangeHandle } }) => {

    return (
        <>
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>

                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                ชื่อเต็ม <i style={{color: 'red'}}>*</i>
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    placeholder="กรอกชื่อเต็มหน่วยงาน"
                                    value={initOffice.fullName}
                                    onChange={onChangeHandle}
                                    required
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                ชื่อย่อ <i style={{color: 'red'}}>*</i>
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    name="shortName"
                                    placeholder="กรอกชื่อย่อหน่วยงาน"
                                    value={initOffice.shortName}
                                    onChange={onChangeHandle}
                                    required
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                ที่อยู่ <i style={{color: 'red'}}>*</i>
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    name="address"
                                    placeholder="กรอกที่อยู่"
                                    value={initOffice.address}
                                    onChange={onChangeHandle}
                                    required
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                เบอร์โทรศัพท์
                            </Form.Label>
                            <Col sm="9">
                                <InputMask
                                    mask="9 9999 9999"
                                    className="form-control"
                                    name="telNo"
                                    placeholder="กรอกเบอร์โทรศัพท์"
                                    value={initOffice.telNo}
                                    onChange={onChangeHandle}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                เบอร์แฟกซ์
                            </Form.Label>
                            <Col sm="9">
                                <InputMask
                                    mask="9 9999 9999"
                                    className="form-control"
                                    name="faxNo"
                                    placeholder="กรอกเบอร์แฟกซ์"
                                    value={initOffice.faxNo}
                                    onChange={onChangeHandle}
                                />
                            </Col>
                        </Form.Group>

                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md={{span:5, offset: 1}}>
                        <Form.Group >
                            <Form.Label>
                                ชื่อ-สกุล หัวหน้าหน่วยงาน <i style={{color: 'red'}}>*</i>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="officeChiefName"
                                placeholder="ชื่อ-สกุล หัวหน้าหน่วยงาน"
                                value={initOffice.officeChiefName}
                                onChange={onChangeHandle}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label>
                                ตำแหน่ง <i style={{color: 'red'}}>*</i>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="officeChiefPosition"
                                placeholder="ตำแหน่งหัวหน้าหน่วยงาน"
                                value={initOffice.officeChiefPosition}
                                onChange={onChangeHandle}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{span:5, offset: 1}}>
                        <Form.Group >
                            <Form.Label>
                                ชื่อ-สกุล หัวหน้างานพัสดุ <i style={{color: 'red'}}>*</i>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="inventoryChiefName"
                                placeholder="ชื่อ-สกุล หัวหน้างานพัสดุ"
                                value={initOffice.inventoryChiefName}
                                onChange={onChangeHandle}
                                
                            />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label>
                                ตำแหน่ง <i style={{color: 'red'}}>*</i>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="inventoryChiefPosition"
                                placeholder="ตำแหน่งหัวหน้างานพัสดุ"
                                value={initOffice.inventoryChiefPosition}
                                onChange={onChangeHandle}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{span:5, offset: 1}}>
                        <Form.Group >
                            <Form.Label>
                                ชื่อ-สกุล เจ้าหน้าที่งานพัสดุ <i style={{color: 'red'}}>*</i>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="inventoryStaffName"
                                placeholder="ชื่อ-สกุล เจ้าหน้าที่งานพัสดุ"
                                value={initOffice.inventoryStaffName}
                                onChange={onChangeHandle}
                                
                            />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label>
                                ตำแหน่ง <i style={{color: 'red'}}>*</i>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="inventoryStaffPosition"
                                placeholder="ตำแหน่งเจ้าหน้าที่งานพัสดุ"
                                value={initOffice.inventoryStaffPosition}
                                onChange={onChangeHandle}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{span:5, offset: 1}}>
                        <Form.Group >
                            <Form.Label>
                                ชื่อ-สกุล เจ้าหน้าที่การเงิน <i style={{color: 'red'}}>*</i>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="financeOfficerName"
                                placeholder="ชื่อ-สกุล เจ้าหน้าที่การเงิน"
                                value={initOffice.financeOfficerName}
                                onChange={onChangeHandle}
                                
                            />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label>
                                ตำแหน่ง <i style={{color: 'red'}}>*</i>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="financeOfficerPosition"
                                placeholder="ตำแหน่งเจ้าหน้าที่การเงิน"
                                value={initOffice.financeOfficerPosition}
                                onChange={onChangeHandle}
                            />
                        </Form.Group>
                    </Col>
                </Row>
        </>
    )
}

OfficeForm.propTypes = {
    values: PropTypes.object.isRequired,
}

export default OfficeForm
