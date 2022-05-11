import React, { useState } from 'react'
import {
    Form,
    Col,
    Button
} from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

const OrderMaterialPayForm = ({
    idx,
    material, 
    materialWithLabel,
    onPaidChangeHandle
}) => {
    const paid = `paid-${idx}`
    const [defaultValue, setDefaultValue] = useState([
        materialWithLabel.find( mat => (mat.id===material.materialId))
    ])

    return (
        <Form.Row>

            <Form.Group as={Col} md={1} lg={{ span: 1, offset: 2 }} style={{ paddingTop: '0.5rem' }}>
                <div>{idx + 1}</div>
            </Form.Group>

            <Form.Group as={Col} md={5} lg={5}>
                <Typeahead 
                    options={defaultValue[0] === undefined ? [] : defaultValue}
                    placeholder="ค้นหาหรือเลือกวัสดุ"
                    id='materialId'
                    defaultSelected={ defaultValue[0] === undefined ? [] : defaultValue }
                    emptyLabel='ไม่พบข้อมูล'
                    paginationText='แสดงข้อมูลเพิ่ม...'
                    maxResults={50}
                    disabled={true}
                />
            </Form.Group>
            <Form.Group as={Col} md={3} lg={1}>
                <Form.Control
                    type="number"
                    data-idx={idx}
                    data-name="amount"
                    value={material.amount}
                    className="text-center"
                    disabled={true}
                />
            </Form.Group>

            <Form.Group as={Col} md={2} lg={1}>
                <Form.Control
                    type='number'
                    name={paid}
                    id={paid}
                    data-idx={idx}
                    data-name="paid"
                    min='1'
                    max={ material.amount }
                    value={ material.paid }
                    onChange={onPaidChangeHandle}
                    className="text-center"
                    required={true}
                />
            </Form.Group>

        </Form.Row>
    )
}

export default OrderMaterialPayForm