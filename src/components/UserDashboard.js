import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faArchive } from '@fortawesome/free-solid-svg-icons'
import { faAvianex, faBtc } from '@fortawesome/free-brands-svg-icons'

const Dashboard = ({
    orderCount,
    recieveCount,
    registeredDurableCount,
    procurementCount,
    allowanceCount
}) => {
    
    return (
        <>
            <hr className="bold-border" />

            <Container>

                <div className="row">
                    <div className="col-md-12 col-xl-12">
                        <div className="row">
                            <div className="col-md-6 col-xl-6">
                                <div className="card widget-card-1">
                                    <div className="card-block-small">
                                        <FontAwesomeIcon icon={faArchive} className="bg-c-blue card1-icon" style={{padding: '25px', width: '40%', height: '85%'}} />
                                        <h3 style={{fontWeight: '600'}}>{orderCount.toLocaleString()} / {recieveCount.toLocaleString()}  รายการ</h3>
                                        <span className="text-c-blue f-w-600">เบิกวัสดุ / รับวัสดุ</span>
                                        <div className="mt-5">
                                            <Link to="/order" className="f-rigth m-t-10 text-muted" style={{ textDecoration: 'none' }}>
                                                รายละเอียด
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-6">
                                <div className="card widget-card-1">
                                    <div className="card-block-small">
                                        <FontAwesomeIcon icon={faImages} className="bg-c-green card1-icon" style={{padding: '25px', width: '40%', height: '85%'}} />
                                        <h3 style={{fontWeight: '600'}}>{registeredDurableCount.toLocaleString()} รายการ</h3>
                                        <span className="text-c-green f-w-600">รายการทะเบียนครุภัณฑ์</span> <br/>
                                        <span className="text-c-green-dark f-w-600"> $</span> / <span className="text-c-pink f-w-600"> $</span> <br/> 
                                        <span className="text-c-green-dark f-w-600">ใช้งานอยู่</span> / <span className="text-c-pink f-w-600">จำหน่ายแล้ว</span>
                                        <div className="mt-5">
                                            <Link to="/registered-durable" className="f-rigth m-t-10 text-muted" style={{ textDecoration: 'none' }}>
                                                รายละเอียด
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-xl-6">
                                <div className="card widget-card-1">
                                    <div className="card-block-small">
                                        <FontAwesomeIcon icon={faBtc} className="bg-c-pink card1-icon" style={{padding: '25px', width: '40%', height: '85%'}} />
                                        <h3 style={{fontWeight: '600'}}>{ procurementCount.toLocaleString() } รายการ</h3>
                                        <span className="text-c-pink f-w-600"> ขอซื้อ ขอจ้าง</span> 
                                        <br/>
                                        <span className="text-c-pink f-w-600 f-s-"> -</span> /
                                        <span className="text-c-yellow f-w-600"> -</span> /
                                        <span className="text-c-green-dark f-w-600"> -</span>
                                        <br/> 
                                        <span className="text-c-pink f-w-600">รอตรวจสอบ</span> / 
                                        <span className="text-c-yellow f-w-600"> ต้องแก้ไข</span> / 
                                        <span className="text-c-green-dark f-w-600"> อนุมัติ</span>
                                        <div className="mt-5">
                                            <Link to="/procurement" className="f-rigth m-t-10 text-muted" style={{ textDecoration: 'none' }}>
                                                รายละเอียด
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-6">
                                <div className="card widget-card-1">
                                    <div className="card-block-small">
                                        <FontAwesomeIcon icon={faAvianex} className="bg-c-green-gray card1-icon" style={{padding: '25px', width: '40%', height: '85%'}} />
                                        <h3 style={{fontWeight: '600'}}>{ allowanceCount.toLocaleString() } รายการ</h3>
                                        <span className="text-c-green-gray f-w-600">ประชุม อบรม</span>
                                        <br/>
                                        <span className="text-c-pink f-w-600"> -</span> /
                                        <span className="text-c-yellow f-w-600"> -</span> /
                                        <span className="text-c-green-dark f-w-600"> -</span>
                                        <br/> 
                                        <span className="text-c-pink f-w-600">รอตรวจสอบ</span> / 
                                        <span className="text-c-yellow f-w-600"> ต้องแก้ไข</span> / 
                                        <span className="text-c-green-dark f-w-600"> อนุมัติ</span>
                                        <div className="mt-5">
                                            <Link to="/allowance" className="f-rigth m-t-10 text-muted" style={{ textDecoration: 'none' }}>
                                                รายละเอียด
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Dashboard;
