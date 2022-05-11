import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    Table, Button, ButtonGroup
} from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt,faEdit, faSort } from '@fortawesome/free-solid-svg-icons'
import CustomPagination from "../../utillities/CustomPagination"
import { deleteMaterialReceive } from '../../../actions/receiveMaterialAction'
import { 
    deleteConfirm, 
    thaiDate, 
    sortByAttributeSubName, 
    sortByAttributeName 
} from '../../../utillities/anotherFunctions'
import { getAllSettingData } from '../../../actions/appSettingAction';


const ReceiveTable = ({ onClickUpdateReceive }) => {

    const dispatch = useDispatch()
    const { receives } = useSelector(state => state.material.receive)
    
    const [pageOfItems, setPageOfItems] = useState([])
    const [pageOption, setPageOption] = useState({
        currentPage: 0,
        pageSize: 0
    })

    const [sortedStatus, setSortedStatus] = useState(false)
    const thCenter = {
        textAlign: "center"
    }
    const thRight = {
        textAlign: "right"
    }
    const tdRight = {
        textAlign: "right"
    }
    const tdCenter = {
        textAlign: "center"
    }

    const sortData = {
        items: receives, dispatch, sortedStatus, setSortedStatus
    }

    const getNewCodeAfterDelete = async () => {
        await getAllSettingData(dispatch)
    }

    const handlePageChange = (poi) => {
        //console.log(poi);
        setPageOption({
            currentPage: poi.currentPage,
            pageSize: poi.pageSize
        })
        setPageOfItems(poi.pageOfItems)
    }


    return (
        <>
            
            <Table hover size="sm" responsive className="scrollAbleTable">
                <thead>
                    <tr>
                        <th style={{...thCenter, width: '5%'}} onClick={ () => console.log('index') }> # </th>
                        <th style={{ width: '35%'}}>
                            รายการ &nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon 
                                icon={faSort} 
                                className="pointer justify-content-end" 
                                onClick={() => sortByAttributeSubName({...sortData, mainAttribute: 'material', attribute: 'name'})}
                            />
                        </th>
                        <th style={{ width: '15%'}}>
                            วันที่ &nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon 
                                icon={faSort} 
                                className="pointer justify-content-end" 
                                onClick={() => sortByAttributeName({...sortData, attribute: 'date'})}
                            />
                        </th>
                        <th style={{...thCenter, width: '8%'}} >
                            จำนวน &nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon 
                                icon={faSort} 
                                className="pointer justify-content-end" 
                                onClick={() => sortByAttributeName({...sortData, attribute: 'amount'})}
                            />
                        </th>
                        <th>
                            รับจาก &nbsp;&nbsp;&nbsp;
                            <FontAwesomeIcon 
                                icon={faSort} 
                                className="pointer justify-content-end" 
                                onClick={() => sortByAttributeSubName({...sortData, mainAttribute: 'seller', attribute: 'name'})}
                            />
                        </th>
                        <th style={thRight}>ตัวเลือก</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        receives.length > 0 ? (
                        pageOfItems.map( (receive, index) => {
                            return (
                            <tr key={receive.id}>
                                <td style={{...tdCenter, width: '5%'}}>{ (pageOption.pageSize * (pageOption.currentPage-1)) + (++index) }</td>
                                <td style={{ width: '35%' }}>{ receive.material.name }</td>
                                <td style={{ width: '15%' }}>{ thaiDate(receive.date) }</td>
                                <td style={{ ...tdCenter, width: '8%' }}>{ receive.amount }</td>
                                <td style={{wordBreak: 'break-all'}}>{ receive.seller.name }</td>
                                <td style={tdRight}>
                                    <ButtonGroup size="sm">
                                        <Button
                                            onClick={() => onClickUpdateReceive(receive)}
                                            variant="info"
                                            title="Edit"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button
                                            onClick={() => deleteConfirm(receive.id, dispatch, deleteMaterialReceive, getNewCodeAfterDelete)}
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
            

            <CustomPagination 
                items={receives}
                onChangePage={handlePageChange}
                pageSize={10}
                sortedStatus={sortedStatus}
            />
        </>
    )
}

export default ReceiveTable
