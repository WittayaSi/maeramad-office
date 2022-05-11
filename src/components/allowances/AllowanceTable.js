import React from 'react'
import { useSelector } from 'react-redux'

import { Table, Button, ButtonGroup }  from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrashAlt,
    faEdit
} from '@fortawesome/free-solid-svg-icons'
import { deleteConfirm, thaiDate } from '../../utillities/anotherFunctions'

import AllowanceViewModal from './AllowanceViewModal'
import { deleteAllowance } from '../../actions/allowanceAction'

const AllowanceTable = ({
    data: { onClickUpdateAllowance }
}) => {

    const { allowances, dispatch } = useSelector(state => state.allowance)

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
    return (
        <Table hover size="sm" responsive id="seller-table" className="mt-3">
            <thead>
                <tr>
                    <th style={thCenter}>#</th>
                    <th>ลำดับที่</th>
                    <th>วันที่</th>
                    <th>ผู้ขอ</th>
                    <th>เรื่อง</th>
                    <th>สถานที่</th>
                    <th style={thRight} >ตัวเลือก</th>
                </tr>
            </thead>
            <tbody>
                {
                    allowances.length > 0 ? (
                        allowances.map( (allowance, index) => {
                            const { fullName, position} = allowance.applicantData
                        return (
                        <tr key={allowance.id}>
                            <td style={tdCenter}>{ ++index }</td>
                            <td >{ allowance.seq }</td>
                            <td style={{width: '14%'}}>{ thaiDate(allowance.date) }</td>
                            <td>{ `${fullName}` }</td>
                            <td style={{width: '35%'}}>{ allowance.name }</td>
                            <td style={{width: '15%'}}>{ allowance.place}</td>
                            <td style={tdRight}>
                                <ButtonGroup size="sm">
                                    <Button
                                        onClick={ () => onClickUpdateAllowance(allowance) }
                                        variant="primary"
                                        title="แก้ไขข้อมูล"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button
                                        onClick={ () => deleteConfirm(allowance.id, dispatch, deleteAllowance) }
                                        variant="danger"
                                        title={`ลบข้อมูล ${allowance.id}`}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </Button>
                                    
                                    <AllowanceViewModal allowance={allowance} />

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

export default AllowanceTable
