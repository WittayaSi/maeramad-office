import React, { Fragment, useState } from 'react'
// import moment from 'moment'
import { useSelector } from 'react-redux'

import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch
} from '@fortawesome/free-solid-svg-icons'
import { PDFViewer } from "@react-pdf/renderer"

import OrderReport from '../../reports/orderReports/orderReport'
import { getMaterialOrderById } from '../../../actions/orderMaterialAction'

const OrderViewModalComponent = ({order, accessToken}) => {
    
    const { office } = useSelector(state => state.app)

    const [modal, setModal] = useState(false)
    const [reportData, setReportData] = useState({})

    const getOrMaterials = async () => {
        const orderMaterials = await getMaterialOrderById(order.id, accessToken)
        return orderMaterials
    }
    
    const showModal = async () => {
        const orderMaterials = await getOrMaterials()
        setReportData({
            ...order,
            orderMaterials: orderMaterials
        })
        setModal(true)
    }

    const hideModal = () => {
        // console.log('onHide Modal')
        setModal(false)
    }

    return (
        <Fragment>
            <Button
                variant="success"
                title="ดาวน์โหลด"
                onClick={showModal}
            >
                <FontAwesomeIcon icon={faSearch} />
            </Button>


            <Modal
                size="xl"
                show={modal}
                onHide={hideModal}
                // backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {`ตัวอย่างก่อนพิมพ์ ใบเบิกเลขที่ ${reportData.orderSeq} ปีงบประมาณ ${ reportData.fiscalYears + 543 }`}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {/* <QRCode value="http://facebook.github.io/react/" renderAs="svg" id="qrcodeSvg" /> */}
                    {
                        Object.keys(reportData).length > 0 && (
                            <PDFViewer style={{width: "100%", height: "70vh"}}>
                                <OrderReport {...reportData} {...office} />
                            </PDFViewer>
                        )
                    }
                    
                    

                </Modal.Body>

                <Modal.Footer>
                    
                    {/* <Button variant="success" >ดาวน์โหลด</Button> */}
                    {/* <Button variant="danger" onClick={toggle} >ปิด</Button> */}
                </Modal.Footer>

                        
                    
            </Modal>
        </Fragment>
    )
}

export default OrderViewModalComponent
