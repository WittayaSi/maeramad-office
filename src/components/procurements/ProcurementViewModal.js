import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'

import {
    Modal,
    Button
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch
} from '@fortawesome/free-solid-svg-icons'

import { PDFViewer } from "@react-pdf/renderer"
import CustomReport from '../reports/report1/CustomReport'

const ProcurementViewModal = ({
    modal,
    procurement,
    showModal,
    hideModal
}) => {

    const { office } = useSelector( state => state.app )

    const [reportData, setReportData] = useState(procurement)

    return (
        <Fragment>
            <Button
                variant="info"
                title="View"
                onClick={showModal}
                
            >
                <FontAwesomeIcon icon={faSearch} />
            </Button>


            <Modal
                size="xl"
                show={modal}
                onHide={hideModal}
                //backdrop="static"
                //keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        ตัวอย่าง
                    </Modal.Title>
                </Modal.Header>

                    <Modal.Body>
                        
                        <PDFViewer style={{width: "100%", height: "70vh"}}>
                            <CustomReport reportData={reportData} office={office} />
                        </PDFViewer>
                        
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={hideModal} >ปิด</Button>
                    </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default ProcurementViewModal
