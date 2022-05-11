import React from 'react'

import {
    Form, Button, Col
} from 'react-bootstrap'

const SelectPersonComponent = ({
    register,
    personnels,
    person, 
    idx,
    errors,
    removeAllowancePerson,
    onChangeAllowancePersonHandle
}) => {

    const personId = `personId_${idx}`
    
    return (
        <Form.Row>
            <Form.Group
                as={Col}
                md={{ span: 1, offset: 1 }}
                style={{ paddingTop: "0.5rem" }}
            >
                <div>{idx + 1}</div>
            </Form.Group>

            <Form.Group as={Col} md={8}>
                <Form.Control
                    as="select"
                    ref={register}
                    //data-live-search="true"
                    name={personId}
                    id={personId}
                    data-idx={idx}
                    data-name="personId"
                    onChange={ onChangeAllowancePersonHandle }
                    value={ person.personId }
                    isInvalid={!!errors.personId_0}
                >
                    <option value="">---เลือกผู้ไปราชการ---</option>
                    {personnels.map((personnel) => (
                        <option
                            key={personnel.id}
                            value={personnel.id}
                        >{`${personnel.Prename.shortName}${personnel.fname} ${personnel.lname} - ${personnel.position}`}</option>
                    ))}
                </Form.Control>
            </Form.Group>

            {/* <Form.Group as={Col} md={2}>
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
            </Form.Group> */}

            <Form.Group>
                {idx > 0 && (
                    <div className="col-md-1 text-center">
                        <Button
                            variant="danger"
                            data-idx={idx}
                            onClick={ removeAllowancePerson }
                            size="sm"
                            title="ลบรายการ"
                        >
                            x
                        </Button>
                    </div>
                )}
            </Form.Group>
        </Form.Row>
    )
}

export default SelectPersonComponent
