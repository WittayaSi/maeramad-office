import React, { useEffect, useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import Select from 'react-select'
import {Typeahead} from 'react-bootstrap-typeahead'

const OrderMaterialForm = ({ 
    material, 
    materialWithLabel, 
    idx, 
    onOrderChangeHandle, 
    removeOrderMaterial,
    groupedCategories,
    onOrderChangeHandleSelect,
    update,
    clickAddItem,
    filteredMaterials
}) => {

    const materialId = `materialId-${idx}`
    const amount = `amount-${idx}`
    const balance = `balance-${idx}`

    const [defaultValue, setDefaultValue] = useState([
        materialWithLabel.find( mat => (mat.id===material.materialId))
    ])
    const [materialAmount, setMaterialAmount] = useState(material.amount)

    const onLocalItemChange = (selected, materialId, materialAmount) => {
        setMaterialAmount(0)
        onOrderChangeHandleSelect(selected, materialId, materialAmount)
    }

    useEffect(() => {
        setDefaultValue([
            materialWithLabel.find( mat => (mat.id===material.materialId))
        ])
    }, [])
    
    return (
        <Form.Row>

            <Form.Group as={Col} md={1} lg={{ span: 1, offset: 2 }} style={{ paddingTop: '0.5rem' }}>
                <div>{idx + 1}</div>
            </Form.Group>

            <Form.Group as={Col} md={5} lg={5}>
                <Typeahead 
                    options={filteredMaterials}
                    onChange={ (selected) => onLocalItemChange(selected, materialId, materialAmount) }
                    name={materialId} 
                    id={materialId}
                    placeholder="ค้นหาหรือเลือกวัสดุ"
                    defaultSelected={ defaultValue[0] === undefined ? [] : defaultValue }
                    emptyLabel='ไม่พบข้อมูล'
                    paginationText='แสดงข้อมูลเพิ่ม...'
                    maxResults={50}
                    inputProps={{ required: true }}
                    clearButton
                />
                
                {/* <Select
                    defaultValue={defaultValue}
                    options={groupedCategories}
                    formatGroupLabel={formatGroupLabel}
                    placeholder='เลือกวัสดุ'
                    onChange={ onOrderChangeHandleSelect }
                    required
                    name={materialId} 
                    id={materialId}
                /> */}
            </Form.Group>
            <Form.Group as={Col} md={3} lg={1}>
                <Form.Control
                    type="number"
                    name={amount}
                    id={amount}
                    data-idx={idx}
                    data-name="amount"
                    min="1" 
                    max={ ~~(material.balance) }
                    value={material.amount}
                    onChange={onOrderChangeHandle}
                    required />
            </Form.Group>

            <Form.Group as={Col} md={2} lg={1}>
                <Form.Control
                    plaintext readOnly
                    name={balance}
                    id={balance}
                    data-idx={idx}
                    data-name="balance"
                    value={ ~~(material.balance) }
                    className="text-center"
                    disabled={true}
                />
            </Form.Group>

            <Form.Group>

                {
                    idx > 0 &&
                    <div className="col-md-1 text-center">
                        <Button variant="danger"
                            onClick={removeOrderMaterial}
                            data-idx={idx}
                            size="sm"
                            title="ลบรายการ"
                        >
                            X
                            </Button>
                    </div>
                }
            </Form.Group>

        </Form.Row>
    )
}

// OrderMaterialForm.propTypes = {
//     idx: PropTypes.number,
//     onOrderChangeHandle: PropTypes.func,
//     onOrderMaterialChangeHandle: PropTypes.func
// }

export default OrderMaterialForm
