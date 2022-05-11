import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CustomPagination from '../../utillities/CustomPagination'

import {
    Table,
    ButtonGroup,
    Button
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrashAlt,
    faEdit
} from '@fortawesome/free-solid-svg-icons'

import { deleteSeller } from '../../../actions/settings/sellerAction'
import { deleteConfirm } from '../../../utillities/anotherFunctions'

const SellerTable = ({ 
    onClickUpdateHandle 
}) => {

    const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />
    const editIcon = <FontAwesomeIcon icon={faEdit} />
    const colCenter = {
        textAlign: "center"
    }
    const colRight = {
        textAlign: "right"
    }

    const dispatch = useDispatch()
    const { sellers } = useSelector(state => state.app)

    const [pageOfItems, setPageOfItems] = useState([])
    const [pageOption, setPageOption] = useState({
        currentPage: 0,
        pageSize: 0
    })
    const [sortedStatus, setSortedStatus] = useState(false)
    

    const onClickDeleteHandle = (id) => {
        deleteConfirm(id, dispatch, deleteSeller)
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
        <Table hover size="sm" responsive id="seller-table" className="scrollAbleTable mt-3">
            <thead>
                <tr>
                    <th style={{ ...colCenter, width: '5%' }}>#</th>
                    <th style={{ width: '28%' }}>รายการผู้ขาย</th>
                    <th style={{ width: '35%' }}>ที่อยู่</th>
                    <th style={{ width: '11%' }}>เบอร์โทร</th>
                    <th style={{ width: '11%' }}>เบอร์แฟกซ์</th>
                    <th style={colRight} >ตัวเลือก</th>
                </tr>
            </thead>
            <tbody>
                {
                    sellers.length > 0 ? (
                    pageOfItems.map( (seller, index) => {
                        return (
                        <tr key={seller.id}>
                            <td style={{ ...colCenter, width: '5%' }}>{ (pageOption.pageSize * (pageOption.currentPage-1)) + (++index) }</td>
                            <td style={{ width: '28%' }}>{ seller.name }</td>
                            <td style={{ width: '35%' }}>{ seller.address }</td>
                            <td style={{ width: '11%' }}>{ seller.telNo }</td>
                            <td style={{ width: '11%' }}>{ seller.faxNo }</td>
                            <td style={colRight}>
                                <ButtonGroup size="sm">
                                    <Button
                                        onClick={() => onClickUpdateHandle(seller)}
                                        variant="info"
                                        title="Edit"
                                    >
                                        {editIcon}
                                    </Button>
                                    <Button
                                        onClick={ () => onClickDeleteHandle(seller.id) }
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
                            <td colSpan="6" className="text-center" style={{color: "red"}}>
                                ไม่มีข้อมูล
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </Table>

        <CustomPagination 
            items={sellers}
            onChangePage={handlePageChange}
            pageSize={5}
            sortedStatus={sortedStatus}
        />

        </>
    )
}

export default SellerTable
