import React, { useContext, useState } from 'react'

import { Table, Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrashAlt,
    faEdit
} from '@fortawesome/free-solid-svg-icons'
import { deletePersonnel } from '../../../actions/settings/personnelAction'
import { deleteConfirm } from '../../../utillities/anotherFunctions'

import CustomPagination from '../../utillities/CustomPagination'
import { useDispatch, useSelector } from 'react-redux'

const PersonnelTable = ({ onClickUpdateHandle }) => {

    const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />
    const editIcon = <FontAwesomeIcon icon={faEdit} />
    const thCenter = {
        textAlign: "center"
    }
    const tdCenter = {
        textAlign: "center"
    }
    const colRight = {
        textAlign: 'right'
    }

    const dispatch = useDispatch()
    const { personnels } = useSelector(state => state.app)

    const [pageOfItems, setPageOfItems] = useState([])
    const [pageOption, setPageOption] = useState({
        currentPage: 0,
        pageSize: 0
    })
    const [sortedStatus, setSortedStatus] = useState(false)

    const onClickDeleteHandle = (id) => {
        deleteConfirm(id, dispatch, deletePersonnel)
    }

    const handlePageChange = (poi) => {
        setPageOption({
            currentPage: poi.currentPage,
            pageSize: poi.pageSize
        })
        setPageOfItems(poi.pageOfItems)
    }

    return (
        <>
        <Table hover size="sm" responsive className="mt-3 scrollAbleTable">
            <thead>
                <tr>
                    <th style={{...thCenter, width: '5%'}}>#</th>
                    <th style={{ width: '30%' }}>ชื่อ-สกุล</th>
                    <th style={{ width: '35%' }}>ตำแหน่ง</th>
                    <th style={{ width: '20%' }}>ฝ่าย/แผนก/กลุ่มงาน</th>
                    <th style={colRight} >ตัวเลือก</th>
                </tr>
            </thead>
            <tbody>
                {
                    personnels.length > 0 ? (
                    pageOfItems.map( (person, index) => {
                        return (
                        <tr key={person.id}>
                            <td style={{...thCenter, width: '5%'}}>{ (pageOption.pageSize * (pageOption.currentPage-1)) + (++index) }</td>
                            <td style={{ width: '30%' }}>{ `${person.Prename.shortName}${person.fname} ${person.lname}` }</td>
                            <td style={{ width: '35%' }}>{ person.position }</td>
                            <td style={{ width: '20%' }}>{ person.department.name }</td>
                            <td style={colRight}>
                                <ButtonGroup size="sm">
                                    <Button
                                        onClick={() => onClickUpdateHandle(person)}
                                        variant="info"
                                        title="Edit"
                                    >
                                        {editIcon}
                                    </Button>
                                    <Button
                                        onClick={ () => onClickDeleteHandle(person.id) }
                                        variant="danger"
                                        title="Delete"
                                    >
                                        {deleteIcon}
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    )}))
                    : 
                    (
                        <tr> 
                            <td colSpan="5" className="text-center" style={{color: "red"}}>
                                ไม่มีข้อมูล
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </Table>

        <CustomPagination 
            items={personnels}
            onChangePage={handlePageChange}
            pageSize={5}
            sortedStatus={sortedStatus}
        />

        </>
    )
}

export default PersonnelTable
