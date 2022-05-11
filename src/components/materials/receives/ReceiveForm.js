import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Form, Col, Button } from 'react-bootstrap'
import moment from 'moment'

import { thaiDate } from '../../../utillities/anotherFunctions'

const ReceiveForm = ({ 
    item, 
    idx, 
    removeReceiveItem,
    onChangeHandle,
    groupedCategories,
    onOrderChangeHandleSelect
}) => {

    const { sellers, materialWithLabel } = useSelector(state => state.app)

    const [defaultValue, setDefaultValue] = useState([
        materialWithLabel.find( mat => (mat.id===item.materialId))
    ])
        
    const materialId = `materialId-${idx}`
    const date = `date-${idx}`
    const amount = `amount-${idx}`
    const sellerId = `sellerId-${idx}`

    return (
            <Form.Row>

                <Form.Group as={Col} md={1} lg={1}>
                    <Form.Label>&nbsp;</Form.Label>
                    <div className="text-center">{idx+1}</div>
                </Form.Group>

                <Form.Group as={Col} md={5} lg={4}>
                    {
                        idx===0 && <Form.Label htmlFor={materialId}>วัสดุ</Form.Label>
                    }
                    <Typeahead 
                        options={materialWithLabel}
                        onChange={ (selected) => onOrderChangeHandleSelect(selected, materialId) }
                        name={materialId} 
                        id={materialId}
                        placeholder="ค้นหาหรือเลือกวัสดุ"
                        // defaultSelected={ defaultValue[0] === undefined ? [] : defaultValue }
                        emptyLabel='ไม่พบข้อมูล'
                        paginationText='แสดงข้อมูลเพิ่ม...'
                        maxResults={50}
                        inputProps={{ required: true }}
                        clearButton
                    />
                </Form.Group>

                <Form.Group as={Col} md={5} lg={2}>
                    {
                        idx===0 && <Form.Label htmlFor={date}>วันที่รับ(ด/ว/ป)</Form.Label>
                    }
                    
                    <Form.Control 
                        type="date" 
                        name={date} 
                        id={date} 
                        data-idx={idx} 
                        data-name="date" 
                        max={moment().format('YYYY-MM-DD')}
                        value={moment(item.date).format('YYYY-MM-DD')} 
                        onChange={onChangeHandle} 
                        required
                    />
                    <Form.Control.Feedback style={ item.date !=="" ?  { display: 'block' } : {}}>
                        { thaiDate(item.date) }
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md={{span: 5}} lg={1} >
                    {
                        idx===0 && <Form.Label htmlFor={amount}>จำนวน</Form.Label>
                    }
                    
                    <Form.Control 
                        type="number" 
                        name={amount} 
                        id={amount} 
                        data-idx={idx} 
                        data-name="amount" 
                        min="1" max="1000" 
                        value={item.amount} 
                        onChange={onChangeHandle} 
                        required
                    />
                </Form.Group>

                <Form.Group as={Col} md={5} lg={3}>
                    {
                        idx===0 && <Form.Label htmlFor={sellerId}>รับจาก</Form.Label>
                    }
                    
                    <Form.Control
                        as="select"
                        name={sellerId} 
                        id={sellerId} 
                        data-idx={idx} 
                        data-name="sellerId" 
                        value={item.sellerId} 
                        onChange={onChangeHandle} 
                        required
                    >
                        <option value="">---เลือกรับจาก---</option>
                        {
                            
                            sellers.map(seller => (
                                <option 
                                    key={seller.id} 
                                    value={seller.id}
                                >{ `${seller.name}` }</option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    
                    {
                        idx > 0 && 
                        <div className="col-md-1 text-center" style={{ paddingTop: '0.2rem' }}>
                            <Button 
                                variant="danger" 
                                onClick={removeReceiveItem} 
                                data-idx={idx} 
                                size="sm" 
                                title="ลบรายการ" 
                            >
                                x
                            </Button>
                        </div>
                    }
                </Form.Group>
                
            </Form.Row>
    )
}

// ReceiveForm.propTypes = {
//     receives: PropTypes.array,
//     idx: PropTypes.number,
//     onChangeHandle: PropTypes.func
// }

export default ReceiveForm
