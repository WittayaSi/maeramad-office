import React from "react";

import {
    Form, Button, Col, Row
} from 'react-bootstrap'

const ProcurementItemForm = ({ material, materials, idx, onChangeProcurementItemHandle, removeProcurementItem }) => {
    const materialId = `materialId-${idx}`
    const amount = `amount-${idx}`
    return (
        <Form.Row>
            <Form.Group
                as={Col}
                md={{ span: 1, offset: 1 }}
                style={{ paddingTop: "0.5rem" }}
            >
                <div>{idx + 1}</div>
            </Form.Group>

            <Form.Group as={Col} md={6}>
                <Form.Control
                    as="select"
                    data-live-search="true"
                    name={materialId}
                    id={materialId}
                    data-idx={idx}
                    data-name="materialId"
                    onChange={ onChangeProcurementItemHandle }
                    value={material.materialId}
                    required
                >
                    <option value="">---เลือกวัสดุ---</option>
                    {materials.map((material) => (
                        <option
                            key={material.id}
                            value={material.id}
                        >{`${material.name} - ${Number(
                            material.price
                        ).toFixed(2)}`}</option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group as={Col} md={2}>
                <Form.Control
                    type="number"
                    name={amount}
                    id={amount}
                    data-idx={idx}
                    data-name="amount"
                    value={material.amount}
                    required
                    min="1"
                    onChange={ onChangeProcurementItemHandle }
                />
            </Form.Group>

            <Form.Group>
                {idx > 0 && (
                    <div className="col-md-1 text-center">
                        <Button
                            variant="danger"
                            onClick={removeProcurementItem}
                            data-idx={idx}
                            size="sm"
                            title="ลบรายการ"
                        >
                            x
                        </Button>
                    </div>
                )}
            </Form.Group>
        </Form.Row>
    );
};

export default ProcurementItemForm
