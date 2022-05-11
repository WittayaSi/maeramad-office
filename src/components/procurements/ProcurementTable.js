import React, { useState }  from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    Table, 
    ButtonGroup, 
    Button,
    Badge
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrashAlt,
    faEdit
} from '@fortawesome/free-solid-svg-icons'

import ProcurementViewModal from './ProcurementViewModal'

import { deleteConfirm, thaiDate } from '../../utillities/anotherFunctions'
import { deleteProcurement } from '../../actions/procurementAction'

const ProcurementTable = ({ onClickUpdateProcurement }) => {
    const thCenter = {
        textAlign: "center"
    }
    const tdCenter = {
        textAlign: "center",
        // verticalAlign: "middle"
    }
    const thRight = {
        textAlign: "right"
    }
    const tdRight = {
        textAlign: "right"
    }

    const dispatch = useDispatch()
    const { procurements } = useSelector( state => state.procurement )
    const { isAdmin } = useSelector( state => state.auth )

    const [modal, setModal] = useState(false)

    const showModal = () => {
        setModal(true)
    }
    const hideModal = () => {
        setModal(false)
    }


    return (
        <Table hover size="sm" responsive id="seller-table" className="mt-3">
            <thead>
                <tr>
                    <th style={thCenter}>#</th>
                    <th>เลขที่หนังสือ</th>
                    <th>วันที่</th>
                    <th>วัสดุ</th>
                    <th>รายละเอียด</th>
                    <th>สถานะ</th>
                    <th style={thRight} >ตัวเลือก</th>
                </tr>
            </thead>
            <tbody>
                {
                    procurements.length > 0 ? (
                        procurements.map( (procurement, index) => {
                        return (
                        <tr key={procurement.id}>
                            <td style={tdCenter}>{ ++index }</td>
                            <td>{ procurement.code }</td>
                            <td>{ thaiDate(procurement.date) }</td>
                            <td>{ procurement.category.name }</td>
                            <td>{ `กรรมการผู้ตรวจ ${ ((procurement.personnelId2 !== "" && procurement.personnelId3 !== "")  ? '3' : '1') } คน, 
                                จำนวน ${ (procurement.procurementItems).length } รายการ` }
                            </td>
                            <td>
                                { 
                                    procurement.status === 'w' ? 
                                    <Badge variant="danger">
                                        รอตรวจสอบ
                                    </Badge>  : 
                                    procurement.status==='c' ? 
                                    <Badge variant="warning">
                                        ตรวจสอบแล้ว
                                    </Badge> : 
                                    <Badge variant="success">
                                        อนุมัติ
                                    </Badge>
                                }
                            </td>
                            <td style={tdRight}>
                                <ButtonGroup size="sm">
                                    <Button
                                        onClick={() => onClickUpdateProcurement(procurement)}
                                        variant="primary"
                                        title="Edit"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    {
                                        isAdmin && (
                                            <Button
                                                onClick={ () => deleteConfirm(procurement.id, dispatch, deleteProcurement) }
                                                variant="danger"
                                                title="Delete"
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </Button>
                                        )
                                    }
                                    
                                    <ProcurementViewModal 
                                        modal={modal}
                                        procurement={procurement}  
                                        showModal={showModal}
                                        hideModal={hideModal}
                                    />

                                </ButtonGroup>
                            </td>
                        </tr>
                    )}))
                    : (
                        <tr> 
                            <td colSpan="7" className="text-center" style={{color: "red"}}>
                                ไม่มีข้อมูล
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    )
}

export default ProcurementTable
