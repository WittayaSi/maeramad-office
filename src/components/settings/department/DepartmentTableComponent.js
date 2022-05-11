import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Table, ButtonGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrashAlt,
    faEdit
} from '@fortawesome/free-solid-svg-icons'

import CustomPagination from '../../utillities/CustomPagination'
import { deleteConfirm } from '../../../utillities/anotherFunctions'
import { deleteDepartment } from '../../../actions/settings/departmentAction'

const DepartmentTableComponent = ({ onClickUpdateDepartment }) => {

    const dispatch = useDispatch()
    const { departments } = useSelector(state => state.app)

    const [pageOfItems, setPageOfItems] = useState([])
    const [pageOption, setPageOption] = useState({
        currentPage: 0,
        pageSize: 0
    })

    const handlePageChange = (poi) => {
        setPageOption({
            currentPage: poi.currentPage,
            pageSize: poi.pageSize
        })
        setPageOfItems(poi.pageOfItems)
    }

    const [sortedStatus] = useState(false)

    const colRight = {
        textAlign: "right"
    }
    const colCenter = {
        textAlign: 'center'
    }

    return (
        <>
        <Table hover size="sm" responsive className="mt-3 scrollAbleTable">
            <thead>
                <tr>
                    <th style={{...colCenter, width: '5%'}}>#</th>
                    <th style={{ width: '20%'}}>ชื่อแผนก</th>
                    <th style={{ width: '10%'}}>รหัสแผนก</th>
                    <th style={{ width: '25%'}}>ชื่อหัวหน้าแผนก</th>
                    <th style={{ width: '25%'}}>ตำแหน่งหัวหน้าแผนก</th>
                    <th style={colRight}>ตัวเลือก</th>
                </tr>
            </thead>
            <tbody>
                {
                    departments && departments.length > 0 ? (
                    pageOfItems.map( (department, index) => {
                        return (
                        <tr key={department.id}>
                            <td style={{...colCenter, width: '5%'}}>{ (pageOption.pageSize * (pageOption.currentPage-1)) + (++index) }</td>
                            <td style={{ width: '20%'}}>{ department.name }</td>
                            <td style={{ width: '10%'}}>{ department.code }</td>
                            <td style={{ width: '25%'}}>{ department.chiefName }</td>
                            <td style={{ width: '25%'}}>{ department.chiefPosition }</td>
                            <td style={colRight}>
                                <ButtonGroup size="sm">
                                    <Button
                                        onClick={() => onClickUpdateDepartment(department)}
                                        variant="info"
                                        title="Edit"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button
                                        onClick={() => deleteConfirm(department.id, dispatch, deleteDepartment)}
                                        variant="danger"
                                        title="Delete"
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    )})
                    )
                    :
                    (
                        <tr> 
                            <td colSpan="6" className="text-center" style={{color: "red"}}>
                                ไม่มีข้อมูล
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </Table>

        
        {
            departments 
            &&
            <CustomPagination 
                items={departments}
                onChangePage={handlePageChange}
                pageSize={10}
                sortedStatus={sortedStatus}
            />
        }

        </>
        
    )
}

export default DepartmentTableComponent
