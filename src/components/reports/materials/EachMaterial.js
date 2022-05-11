import React, { useState, useContext } from 'react'
import { Form, Button, Table, Col, Alert, Row } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

import { getEachMaterialReport } from '../../../actions/reportsAction'
import { thaiDate } from '../../../utillities/anotherFunctions'
import { useSelector } from 'react-redux'

const EachMaterial = () => {
    
    let balanceAmount = 0

    const colCenter = {
        textAlign: "center",
        verticalAlign: "middle"
    }
    const colRight = {
        textAlign: "right"
    }
    const { materialWithLabel } = useSelector(state => state.app)

    const [materialId, setMaterialId] = useState('')
    const [materialData, setmaterialData] = useState({})
    const [allMaterials, setAllMaterials] = useState([])

    const onInputChange = (materialArr) => {
        const [material] = materialArr
        const materialId = material ? material.id : ''
        setMaterialId(materialId)
    }

    const calculateReport = ({ material, allMaterial }) => {
        // setTimes( (data.orderMaterials.length > data.receiveMaterials.length) ? data.orderMaterials : data.receiveMaterials )
        setmaterialData(material)
        setAllMaterials(allMaterial)
        // setAllMaterials([...data.orderMaterials, ...data.receiveMaterials])
        // setOrderMaterials(data.orderMaterials)
        // setReceiveMaterials(data.receiveMaterials)
        // const accum = 0
        // const o = data.orderMaterials.reduce((accum, order)=>{
        //     return accum + order.paid
        // }, accum)
        // setOAmount(o)
        // const r = data.receiveMaterials.reduce((accum, receive)=>{
        //     return accum + receive.amount
        // }, accum)
        // setRAmount(r)
    }

    const onMonthSubmit = async (e) => {
        e.preventDefault()
        console.log(materialId)
        try {
            const data = await getEachMaterialReport(materialId)
            console.log(data)
            calculateReport(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <hr className="bold-border" />

            <h2>รายงานคุมวัสดุแยกรายการ</h2>

            <Form
                onSubmit={onMonthSubmit}
            >
                <Form.Row className="align-items-center">
                    <Col sm={4} md={4} xs='auto' className="my-1">
                        <Form.Label htmlFor="inlineFormInput" srOnly>
                            Name
                        </Form.Label>
                        <Typeahead
                            options={materialWithLabel}
                            onChange={onInputChange}
                            name='materialId'
                            id='materialId'
                            placeholder="ค้นหาหรือเลือกวัสดุ"
                            emptyLabel='ไม่พบข้อมูล'
                            paginationText='แสดงข้อมูลเพิ่ม...'
                            maxResults={50}
                            inputProps={{ required: true }}
                            clearButton
                        />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit" className="my-1">
                            ออกรายงาน
                        </Button>
                    </Col>
                </Form.Row>
            </Form>



            <hr />

            {
                Object.keys(materialData).length > 0 
                && 
                <Alert variant="success" style={{fontWeight: 600, fontSize: '16px'}}>
                    <Row>
                        <Col md={{ span: 2, offset: 2 }}>
                            { `ประเภทวัสดุ: ` }
                        </Col>
                        <Col md={5}>
                            { `${materialData.categoryName}` }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 2, offset: 2 }}>
                            { `ชื่อหรือชนิดวัสดุ: ` }
                        </Col>
                        <Col md={5}>
                            { `${materialData.name} # ราคา: ${(materialData.price).toFixed(2)} บาท` }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 2, offset: 2 }}>
                            { `หน่วยนับ: ` }
                        </Col>
                        <Col md={5}>
                            { `${materialData.unit}` }
                        </Col>
                    </Row>
                    
                    {/* <br/>
                    { `จำนวนรับเข้า: ${rAmount} ${reportData.unit} | จำนวนเบิก: ${oAmount} ${reportData.unit} | คงเหลือ: ${rAmount-oAmount} ${reportData.unit}` } */}
                </Alert>
            }

            <Table hover bordered size="sm" responsive className="scrollAbleTable">
                <thead>
                    <tr>
                        <th style={{ ...colCenter, width: '11%' }} rowSpan={2}>วัน เดือน ปี</th>
                        <th style={{ ...colCenter, width: '25%' }} rowSpan={2}>รับจาก/จ่ายให้</th>
                        <th style={{ ...colCenter, width: '9%' }} rowSpan={2}>เลขที่</th>
                        <th style={{ ...colCenter, width: '10%' }} rowSpan={2}>ราคาต่อ<br/>หน่วย(บาท)</th>
                        <th style={{ ...colCenter, width: '15%' }} colSpan={2}>รายการรับ</th>
                        <th style={{ ...colCenter, width: '15%' }} colSpan={2}>รายการเบิก</th>
                        <th style={{ ...colCenter, width: '15%' }} colSpan={2}>คงเหลือ</th>
                    </tr>
                    <tr>
                        <th style={{ ...colCenter, width: '7.5%' }}>จำนวน</th>
                        <th style={{ ...colCenter, width: '7.5%' }}>ราคา</th>
                        <th style={{ ...colCenter, width: '7.5%' }}>จำนวน</th>
                        <th style={{ ...colCenter, width: '7.5%' }}>ราคา</th>
                        <th style={{ ...colCenter, width: '7.5%' }}>จำนวน</th>
                        <th style={{ ...colCenter, width: '7.5%' }}>ราคา</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allMaterials.length > 0 ? (
                            allMaterials.map( (item, index) => {
                                const orderReceiveFrom = (item.sellerName && item.sellerName) || (item.departmentName && item.departmentName)
                                const price = (materialData.price).toFixed(2)
                                const rAmount = item.amount ? item.amount : '-'
                                const rCost = item.amount ? (item.amount * materialData.price).toFixed(2) : '-'
                                const oAmount = item.paid ? item.paid : '-'
                                const oCost = item.paid ? (item.paid * materialData.price).toFixed(2) : '-'

                                balanceAmount = item.paid ? (balanceAmount - item.paid) : (balanceAmount + item.amount)
                                const balanceCost = (balanceAmount * materialData.price).toFixed(2)

                                return (
                                    <tr key={index}>
                                        <td style={{width: '11%'}}>{ thaiDate(item.date) }</td>
                                        <td style={{width: '25%'}}>{ orderReceiveFrom }</td>
                                        <td style={{...colCenter, width: '9%'}}>{  }</td>
                                        <td style={{...colCenter, width: '10%'}}>{ price }</td>

                                        <td style={{...colCenter, width: '7.5%'}}>{ rAmount }</td>
                                        <td style={{...colCenter, width: '7.5%'}}>{ rCost }</td>
                                        <td style={{...colCenter, width: '7.5%'}}>{ oAmount }</td>
                                        <td style={{...colCenter, width: '7.5%'}}>{ oCost }</td>
                                        <td style={{...colCenter, width: '7.5%'}}>{ balanceAmount }</td>
                                        <td style={{...colCenter, width: '7.5%'}}>{ balanceCost }</td>
                                    </tr>
                                )
                            })
                        )
                        :
                        <tr>
                            <td colSpan="6" className="text-center" style={{ color: "red" }}>
                                ไม่มีข้อมูล
                            </td>
                        </tr>
                    }
                    {/* <tr>
                        <td colSpan="6" className="text-center" style={{ color: "red" }}>
                            ไม่มีข้อมูล
                        </td>
                    </tr> */}
                </tbody>
            </Table>
        </>
    );
}

export default EachMaterial