import React, { useState } from 'react'
import { Form, Button, Table } from 'react-bootstrap'

const MaterialByMonth = () => {

    const colCenter = {
        textAlign: "center"
    }
    const colRight = {
        textAlign: "right"
    }

    const [yearMonth, setYearMonth] = useState({
        year: '',
        month: ''
    })

    const onInputChange = (e) => {
        console.log(e.target.name, e.target.value)
        setYearMonth({
            ...yearMonth,
            [e.target.name]: e.target.value
        })
    }

    const onMonthSubmit = (e) => {
        e.preventDefault()
        console.log(yearMonth)
    }

    return (
        <>
            <hr className="bold-border" />

            <h2>สรุปวัสดุรายเดือน</h2>

            <Form 
                onSubmit={onMonthSubmit}
                inline
            >
                {/* <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                    เลือกเดือน
                </Form.Label> */}
                <Form.Control
                    as="select"
                    name='year'
                    className="my-1 mr-sm-2 col-md-1 col-sm-1"
                    id="inlineFormCustomSelectPref"
                    onChange={onInputChange}
                    value={yearMonth.year}
                    custom
                >
                    <option value="">--เลือกปี--</option>
                    <option value="2020">2563</option>
                    <option value="2021">2564</option>
                </Form.Control>
                <Form.Control
                    as="select"
                    name='month'
                    className="my-1 mr-sm-2 col-md-2 col-sm-2"
                    id="inlineFormCustomSelectPref"
                    onChange={onInputChange}
                    value={yearMonth.month}
                    custom
                >
                    <option value="">-----เลือกเดือน-----</option>
                    <option value="01">มกราคม</option>
                    <option value="02">กุมภาพันธ์</option>
                    <option value="03">มีนาคม</option>
                    <option value="04">เมษายน</option>
                    <option value="05">พฤษภาคม</option>
                    <option value="06">มิถุนายน</option>
                    <option value="07">กรกฎาคม</option>
                    <option value="08">สิงหาคม</option>
                    <option value="09">กันยายน</option>
                    <option value="10">ตุลาคม</option>
                    <option value="11">พฤศจิกายน</option>
                    <option value="12">ธันวาคม</option>
                </Form.Control>
                <Button type="submit" className="my-1">
                    Submit
                </Button>
            </Form>

            <hr />

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
                    {/* {
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
                                                <Dropdown.Toggle variant="info" id="dropdown-basic" className="btn">
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
                                                    <Dropdown.Item 
                                                        href="#/status='p'" 
                                                        onClick={()=>changeOrderStatus(order.id, 'p')}
                                                        disabled={ order.status==='c' || order.status==='p'  }
                                                    >
                                                        พร้อมจ่าย
                                                    </Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item 
                                                        href="#/status='c/paid'"
                                                        onClick={()=>changeOrderStatus(order.id, 'c', user.id)}
                                                    >
                                                        จ่ายตามจำนวนขอเบิก
                                                    </Dropdown.Item>
                                                    <OrderMaterialPayModal order={order} accessToken={accessToken} />
                                                    
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Button
                                                onClick={() => onClickUpdateOrder(order)}
                                                variant="warning"
                                                title="แก้ไขข้อมูล"
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                            <Button
                                                onClick={ () => onOrderDelete(order.id) }
                                                variant="danger"
                                                title="Delete"
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </Button>
                                            <OrderViewModalComponent order={order} accessToken={accessToken} />
                                        </ButtonGroup>
                                    ) : (
                                        <ButtonGroup size="sm">
                                            {
                                                order.status==='w' && (
                                                    <Button
                                                        onClick={() => onClickUpdateOrder(order)}
                                                        variant="warning"
                                                        title="แก้ไขข้อมูล"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                )
                                            }
                                            <OrderViewModalComponent order={order} accessToken={accessToken} />
                                            
                                        </ButtonGroup>
                                    )
                                }
                                </td>
                            </tr>
                        )})
                        )
                        : */}
                            <tr> 
                                <td colSpan="6" className="text-center" style={{color: "red"}}>
                                    ไม่มีข้อมูล
                                </td>
                            </tr>
                    {/* } */}
                </tbody>
            </Table>
        </>
    );
}

export default MaterialByMonth