import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Table, ButtonGroup, Button, Badge, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrashAlt,
    faEdit,
    faSort,
    faFileExcel
} from '@fortawesome/free-solid-svg-icons'

import CustomPagination from '../../utillities/CustomPagination'

import { 
    sortByAttributeSubName, 
    sortByAttributeName,
    deleteConfirm
} from '../../../utillities/anotherFunctions'
import { removeMaterial } from '../../../actions/settings/materialAction'


const ItemTable = ({ 
    onUpdateStatusHandle, 
    onUpdateClickHandle 
}) => {

    const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />
    const editIcon = <FontAwesomeIcon icon={faEdit} />

    const thCenter = {
        textAlign: "center"
    }
    const thRight = {
        textAlign: "right"
    }
    const tdCenter = {
        textAlign: "center",
        verticalAlign: "middle"
    }
    const tdRight = {
        textAlign: "right",
        verticalAlign: "middle"
    }
    
    const dispatch = useDispatch()
    const { materials } = useSelector(state => state.app)
    
    const [pageOfItems, setPageOfItems] = useState([])
    const [pageOption, setPageOption] = useState({
        currentPage: 0,
        pageSize: 0
    })
    const [sortedStatus, setSortedStatus] = useState(false)
    
    const handlePageChange = (poi) => {
        setPageOption({
            currentPage: poi.currentPage,
            pageSize: poi.pageSize
        })
        setPageOfItems(poi.pageOfItems)
    }

    const onDeleteClickHandle = id => {
        deleteConfirm(id, dispatch, removeMaterial)
    }
    
    const sortData = {
        items: materials, dispatch, sortedStatus, setSortedStatus
    }

    return (
        <>
            <Table hover size="sm" responsive className="scrollAbleTable">
                <thead>
                    <tr>
                        <th style={{...thCenter, width: '5%'}}>#</th>
                        <th style={{ width: '20%' }}>
                            ประเภทวัสดุ &nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon 
                                icon={faSort} 
                                className="pointer justify-content-end" 
                                onClick={() => sortByAttributeName({...sortData, attribute: 'catName'})}
                            />
                        </th>
                        <th style={{ width: '28%' }}>
                            ชนิดวัสดุ &nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon 
                                icon={faSort} 
                                className="pointer justify-content-end" 
                                onClick={() => sortByAttributeName({...sortData, attribute: 'name'})}
                            />
                        </th>
                        <th style={{ width: '10%' }}>หน่วยนับ</th>
                        <th style={{ ...thCenter, width: '10%' }}>
                            ราคา &nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon 
                                icon={faSort} 
                                className="pointer justify-content-end" 
                                onClick={() => sortByAttributeName({...sortData, attribute: 'price'})}
                            />
                        </th>
                        <th style={{ ...thCenter, width: '10%' }}>คงเหลือ</th>
                        <th style={{ width: '10%' }}>สถานะ</th>
                        <th style={thRight} >ตัวเลือก</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        materials.length > 0 ? (
                        pageOfItems.map( (material, index) => {
                            return (
                            <tr key={material.id}>
                                <td style={{ ...tdCenter, width: '5%' }}>{ (pageOption.pageSize * (pageOption.currentPage-1)) + (++index) }</td>
                                <td style={{ width: '20%' }}>{ material.catName }</td>
                                <td style={{ width: '28%' }}>{ material.name }</td>
                                <td style={{ width: '10%' }}>{ material.unit }</td>
                                <td style={{ ...tdRight, width: '10%', paddingRight: '2.5rem' }}>{ parseFloat(material.price).toFixed(2) }</td>
                                <td style={{ ...tdCenter, width: '10%' }}>{ material.balance }</td>
                                <td style={{ width: '10%' }}>
                                    <Badge variant={ material.status === '1' ? "success" : "danger" }>
                                        { material.status === '1' ? 'active' : 'inactive' }
                                    </Badge>
                                </td>
                                <td style={tdRight}>
                                    <ButtonGroup size="sm">
                                        <Button
                                            onClick={() => onUpdateClickHandle(material)}
                                            variant="info"
                                            title="Edit"
                                        >
                                            {editIcon}
                                        </Button>
                                        <Button
                                            onClick={() => onDeleteClickHandle(material.id)}
                                            variant="danger"
                                            title="Delete"
                                        >
                                            {deleteIcon}
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )})
                        )
                        : (
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
            items={materials}
            onChangePage={handlePageChange}
            pageSize={5}
            sortedStatus={sortedStatus}
        />

        </>
    );
}

export default ItemTable;
