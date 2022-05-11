import React from 'react'
import { Table } from 'react-bootstrap'

const testTable = () => {
    return (
        <Table hover size="sm" responsive id="seller-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>รายการผู้ขาย</th>
                    <th>ที่อยู่</th>
                    <th>เบอร์โทร</th>
                    <th>เบอร์แฟกซ์</th>
                    <th>ตัวเลือก</th>
                </tr>
            </thead>
            <tbody>
                <tr> 
                    <td colSpan="6" className="text-center" style={{color: "red"}}>
                        ไม่มีข้อมูล
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}

export default testTable
