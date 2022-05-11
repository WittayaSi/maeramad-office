import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Table, ButtonGroup, Button, Badge, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrashAlt,
    faEdit,
    faSort,
    faFileExcel
} from '@fortawesome/free-solid-svg-icons'

import { 
    sortByAttributeSubName, 
    sortByAttributeName, 
    thaiDate
} from '../../utillities/anotherFunctions'


import CustomPagination from '../utillities/CustomPagination'

const RegisteredDurablesTable = ({
    showModal,
    setUpdate,
    setRegDurable,
    onDeleteClickHandle
}) => {

    const dispatch = useDispatch()

    const { registeredDurables } = useSelector(state => state.durable)

    const { isAdmin, user } = useSelector(state => state.auth)

    const [pageOfItems, setPageOfItems] = useState([])
    const [pageOption, setPageOption] = useState({
        currentPage: 0,
        pageSize: 0
    })
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
        // verticalAlign: "middle"
    }

    const tdRight = {
        textAlign: "right",
        verticalAlign: "middle"
    }

    const [sortedStatus, setSortedStatus] = useState(false)
    const sortData = {
        items: registeredDurables, dispatch, sortedStatus, setSortedStatus
    }

    const handlePageChange = (poi) => {
        setPageOption({
            currentPage: poi.currentPage,
            pageSize: poi.pageSize
        })
        setPageOfItems(poi.pageOfItems)
    }

    const onClickUpdateRegDurable = async durable => {
        showModal()
        setUpdate(true)
        // console.log(durable)
        await setRegDurable({
            ...durable
        })
    }

    return (
        <>
        <Table hover size="sm" responsive className="scrollAbleTable">
            <thead>
                <tr>
                    <th style={{...thCenter, width: '5%'}}>#</th>
                    {/* <th style={{ width: '10%' }}>
                        ประเภท &nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon 
                            icon={faSort} 
                            className="pointer justify-content-end" 
                            onClick={() => sortByAttributeSubName({...sortData, mainAttribute: 'durableCategory', attribute: 'code'})}
                        />
                    </th> */}
                    <th style={{ width: '18%' }}>หมวด</th>
                    <th style={{ width: '15%' }}>วันที่รับ</th>
                    <th style={{ width: '10%' }}>ลักษณะ</th>
                    <th style={{ width: '35%' }}>
                        ชื่อครุภัณฑ์ &nbsp;&nbsp;&nbsp;
                        {/* <FontAwesomeIcon 
                            icon={faSort} 
                            className="pointer justify-content-end" 
                            onClick={() => sortByAttributeName({...sortData, attribute: 'name'})}
                        /> */}
                    </th>
                    {/* <th style={{ ...tdCenter, width: '15%' }}>อื่นๆ</th> */}
                    {/* <th style={{ ...thCenter, width: '10%' }}>
                        ราคา &nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon 
                            icon={faSort} 
                            className="pointer justify-content-end" 
                            onClick={() => sortByAttributeName({...sortData, attribute: 'price'})}
                        />
                    </th> */}
                    <th style={{ width: '7%' }}>สถานะ</th>
                    <th style={thRight} >ตัวเลือก</th>
                </tr>
            </thead>
            <tbody>
                {
                    registeredDurables.length > 0 ? (
                    pageOfItems.map( (durable, index) => {
                        return (
                        <tr key={durable.id}>
                            <td style={{ ...tdCenter, width: '5%' }}>{ (pageOption.pageSize * (pageOption.currentPage-1)) + (++index) }</td>
                            {/* <td style={{ width: '10%' }}>{ `${durable.type}` }</td> */}
                            <td style={{ width: '18%' }}>{ durable.durableCategory.name }</td>
                            <td style={{ width: '15%' }}>{ thaiDate(durable.date) }</td>
                            <td style={{ width: '10%' }}>{ durable.styleName }</td>
                            <td style={{ width: '35%' }}>
                                {`${durable.durable.name}`}
                                <br/>
                                {`รหัส : ${durable.durable.code}-${("00" + durable.seq).slice(-2)}`}
                                
                            </td>
                            {/* <td style={{ ...tdCenter, width: '15%' }}>{ durable.attribute }</td> */}
                            <td style={{ width: '7%' }}>
                                <Badge variant={ durable.status === '1' ? "success" : "danger" }>
                                    { durable.status === '1' ? 'ใช้งานอยู่' : 'จำหน่ายแล้ว' }
                                </Badge>
                            </td>
                            <td style={tdRight}>
                                {
                                    isAdmin ? 
                                        <ButtonGroup size="sm">
                                            <Button
                                                onClick={() => onClickUpdateRegDurable(durable)}
                                                variant="info"
                                                title="Edit"
                                            >
                                                {editIcon}
                                            </Button>
                                            <Button
                                                onClick={() => onDeleteClickHandle(durable.id)}
                                                variant="danger"
                                                title="Delete"
                                            >
                                                {deleteIcon}
                                            </Button>
                                        </ButtonGroup>
                                    :
                                        <ButtonGroup size="sm">
                                            <Button
                                                onClick={() => onClickUpdateRegDurable(durable)}
                                                variant="info"
                                                title="Edit"
                                            >
                                                {editIcon}
                                            </Button>
                                        </ButtonGroup>

                                }
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
            items={registeredDurables}
            onChangePage={handlePageChange}
            pageSize={5}
            sortedStatus={sortedStatus}
        />
        </>
    )
}

export default RegisteredDurablesTable
