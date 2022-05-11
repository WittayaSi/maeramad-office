import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { useHistory } from 'react-router-dom'
import {    
    Table, 
    ButtonGroup, 
    Button,
    Badge,
    Dropdown
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faSearch, faSort, faListAlt } from '@fortawesome/free-solid-svg-icons'

import OrderViewModal from './OrderViewModal'
import OrderMaterialPayModal from './OrderMaterialPayModal'

import { thaiDate, deleteConfirm, sortByAttributeName, sortByAttributeSubName } from '../../../utillities/anotherFunctions'
import { deleteMaterialOrder, updateOrderStatusById, updateOrderStatusByIdAndPaid } from '../../../actions/orderMaterialAction'
import { reloadMaterialData } from '../../../actions/appSettingAction'

//import { PDFViewer } from '@react-pdf/renderer'
//import OrderReport from '../../reports/orderReports/orderReport'
import CustomPagination from '../../utillities/CustomPagination'
// import { SearchBoxTextInput, SearchBoxDateInput } from '../../utillities/searchBoxInput'

const OrderTable = ({ 
    onClickUpdateHandle, 
    accessToken 
}) => {

    const colCenter = {
        textAlign: "center"
    }
    const colRight = {
        textAlign: "right"
    }
    const dispatch = useDispatch()
    // const { orders, dispatch } = useContext(MaterialOrderContext)
    const { orders } = useSelector(state => state.material.order)
    const { isAdmin, user } = useSelector(state => state.auth)

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

    const reloadNewCode = async () => {
        await reloadMaterialData(dispatch)
    }

    const onClickDeleteHandle = async (orderId) => {
        await deleteConfirm(orderId, dispatch, deleteMaterialOrder, reloadNewCode, accessToken)
    }

    const changeOrderStatus = async (orderId, status) => {
        try {
            const result = await updateOrderStatusById(orderId, status, accessToken)
            dispatch(result)
            reloadNewCode()
        } catch (error) {
            console.error(error)
        }
    }

    const changeOrderStatusAndPaid = async (orderId, status) => {
        try {
            const result = await updateOrderStatusByIdAndPaid(orderId, status, accessToken)
            dispatch(result)
            reloadNewCode()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>

            <Table hover size="sm" responsive className="scrollAbleTable">
                <thead>
                    <tr>
                        <th style={{...colCenter, width: '5%'}}>#</th>
                        <th style={{...colCenter, width: '10%'}}>
                            เลขที่ใบเบิก
                        </th>
                        <th style={{width: '20%'}}>ฝ่าย/กลุ่มงาน</th>
                        <th style={{width: '15%'}}>ผู้ขอเบิก</th>
                        <th style={{width: '12%'}}>วันที่</th>
                        <th style={{...colCenter, width: '10%'}} >จำนวน(รายการ)</th>
                        <th style={{...colCenter, width: '10%'}} >สถานะ</th>
                        <th style={colRight}>จัดการ</th>
                    </tr>
                    {/* <tr>
                        <th style={{...colCenter, width: '5%'}}> </th>
                        <th style={{width: '15%'}}>
                            <SearchBoxTextInput name='orderSeq' />
                        </th>
                        <th style={{width: '25%'}}>
                            <SearchBoxTextInput name='department' />
                        </th>
                        <th style={{width: '20%'}}>
                            <SearchBoxDateInput name='date' />
                        </th>
                        <th style={{...colCenter, width: '15%'}} ></th>
                        <th style={colRight}> &nbsp;</th>
                    </tr> */}
                </thead>
                <tbody>
                    {
                        orders.length > 0 ? (
                        pageOfItems.map( (order, index) => {
                            const {  personnel } = order
                            
                            return (

                            <tr key={order.id}>
                                <td style={{...colCenter, width: '5%'}}>{ (pageOption.pageSize * (pageOption.currentPage-1)) + (++index) }</td>
                                <td style={{...colCenter, width: '10%'}}>{ `${order.orderSeq}/${(order.fiscalYears)+543}` }</td>
                                <td style={{width: '20%'}}>{ order.department!==null ? order.department.name : personnel.departmentId }</td>
                                <td style={{width: '15%'}}>{ order.personnel!==null ? `${personnel.fname} ${personnel.lname}` : '' }</td>
                                <td style={{width: '12%'}}>{ thaiDate(order.date) }</td>
                                <td style={{width: '10%', ...colCenter}}>{ order.orderMaterials.length }</td>
                                <td style={{width: '10%', ...colCenter}}>
                                    { 
                                        order.status === 'w' ? 
                                        <Badge variant="danger">
                                            รอจัดวัสดุ
                                        </Badge>  : 
                                        order.status==='p' ? 
                                        <Badge variant="warning">
                                            พร้อมจ่าย
                                        </Badge> : 
                                        <Badge variant="success">
                                            จ่ายแล้ว
                                        </Badge>
                                    }
                                </td>
                                <td style={colRight}>

                                {
                                    isAdmin ? (
                                        <ButtonGroup size="sm">
                                            <Dropdown>
                                                <Dropdown.Toggle 
                                                    variant="info" 
                                                    id="dropdown-basic" 
                                                    className="btn" 
                                                    disabled={order.status==='c'}
                                                >
                                                    <FontAwesomeIcon icon={faListAlt} />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item 
                                                        href="#/status='w'" 
                                                        onClick={()=>changeOrderStatus(order.id, 'w')}
                                                        disabled={order.status==='c' || order.status==='w' }
                                                    >
                                                        รอจัดวัสดุ
                                                    </Dropdown.Item>
                                                    {/* <Dropdown.Item 
                                                        href="#/status='p'" 
                                                        onClick={()=>changeOrderStatus(order.id, 'p')}
                                                        disabled={ order.status==='c' || order.status==='p' }
                                                    >
                                                        พร้อมจ่าย
                                                    </Dropdown.Item> */}
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item 
                                                        href="#/status='c/paid'"
                                                        onClick={()=>changeOrderStatus(order.id, 'c', user.id)}
                                                        disabled={order.status==='c' }
                                                    >
                                                        จ่ายตามจำนวนขอเบิก
                                                    </Dropdown.Item>

                                                    <OrderMaterialPayModal order={order} accessToken={accessToken} />
                                                    
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Button
                                                onClick={() => onClickUpdateHandle(order)}
                                                variant="warning"
                                                title="แก้ไขข้อมูล"
                                                disabled={order.status==='c' || order.status==='p' }
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                            <Button
                                                onClick={ () => onClickDeleteHandle(order.id) }
                                                variant="danger"
                                                title="Delete"
                                                disabled={order.status==='c' || order.status==='p' }
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </Button>

                                            <OrderViewModal order={order} accessToken={accessToken} />

                                        </ButtonGroup>
                                    ) : (
                                        <ButtonGroup size="sm">
                                            {
                                                order.status==='w' && (
                                                    <Button
                                                        onClick={() => onClickUpdateHandle(order)}
                                                        variant="warning"
                                                        title="แก้ไขข้อมูล"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                )
                                            }

                                            <OrderViewModal order={order} accessToken={accessToken} />
                                            
                                        </ButtonGroup>
                                    )

                                }
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
                items={orders}
                onChangePage={handlePageChange}
                pageSize={10}
                sortedStatus={sortedStatus}
            />

        </>
        
    )
}

export default OrderTable
