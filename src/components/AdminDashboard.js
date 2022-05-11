import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faArchive } from '@fortawesome/free-solid-svg-icons'
import { faAvianex, faBtc } from '@fortawesome/free-brands-svg-icons'

import { MaterialOrderContext } from '../contexts/materials/MaterialOrderContext'
import { RegisterDurableContext } from '../contexts/RegisterDurableContext'
import { ProcurementContext } from '../contexts/ProcurementContext'
import { AllowanceContext } from '../contexts/AllowanceContext'
import AuthContext from '../contexts/AuthContext'

const Dashboard = () => {
    const { orders, fetchMaterialOrderData } = useContext(MaterialOrderContext)
    const { registeredDurables } = useContext(RegisterDurableContext)
    const { procurements } = useContext(ProcurementContext)
    const { allowances } = useContext(AllowanceContext)

    const [waitMaterials, setWaitMaterials] = useState([])
    const [prepareMaterials, setPrepareMaterials] = useState([])

    useEffect(() => {
        // console.log('Dashboard useEffect')
        fetchMaterialOrderData()
        const wait = orders.filter( order => (order.status === 'w') )
        setWaitMaterials(wait)
        const prepare = orders.filter( order => (order.status === 'p') )
        setPrepareMaterials(prepare)
    }, [])
    
    return (
        <>
            <hr className="bold-border" />

            <Container>

                <div className="row">
                    <div className="col-md-8 col-xl-8">
                        <div className="row">
                            <div className="col-md-6 col-xl-6">
                                <div className="card widget-card-1">
                                    <div className="card-block-small">
                                        <FontAwesomeIcon icon={faArchive} className="bg-c-blue card1-icon" style={{padding: '25px', width: '40%', height: '85%'}} />
                                        <h3 style={{fontWeight: '600'}}>{orders.length} รายการ</h3>
                                        <span className="text-c-blue f-w-600">รายการเบิกวัสดุ</span>
                                        <div className="mt-5">
                                            <Link to="/orders" className="f-rigth m-t-10 text-muted" style={{ textDecoration: 'none' }}>
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
                                        <h3 style={{fontWeight: '600'}}>{registeredDurables.length} รายการ</h3>
                                        <span className="text-c-green f-w-600">ทะเบียนครุภัณฑ์</span>
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
                                        <h3 style={{fontWeight: '600'}}>{procurements.length} รายการ</h3>
                                        <span className="text-c-pink f-w-600">จัดซื้อ / จัดจ้าง</span>
                                        <div className="mt-5">
                                            <Link to="#" className="f-rigth m-t-10 text-muted" style={{ textDecoration: 'none' }}>
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
                                        <h3 style={{fontWeight: '600'}}>{allowances.length} รายการ</h3>
                                        <span className="text-c-green-gray f-w-600">ประชุม / อบรม</span>
                                        <div className="mt-5">
                                            <Link to="#" className="f-rigth m-t-10 text-muted" style={{ textDecoration: 'none' }}>
                                                รายละเอียด
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-4 col-xl-4">
                        <div className="card widget-card-1 bg-c-red">
                            <div className="card-block-small">
                                <h4 style={{fontWeight: '600'}}> วัสดุ</h4>
                                <Link to='/orders' style={{textDecoration: 'none'}} disabled >
                                    <span className="text-c-pink f-w-600"> รอจัดวัสดุ {waitMaterials.length} รายการ</span> <br />
                                </Link>
                                <span className="text-c-yellow f-w-600"> พร้อมจ่าย {prepareMaterials.length} รายการ</span>
                            </div>
                            <hr/>
                            <div className="card-block-small">
                                <h4 style={{fontWeight: '600'}}> จัดซื้อ / จัดจ้าง</h4>
                                <span className="text-c-green-gray f-w-600"> {allowances.length} รายการ</span>
                            </div>
                        </div>
                    </div>
                </div>


            </Container>

        </>
    );
}

export default Dashboard;
