import React from 'react'

import { Card, Form, Col } from 'react-bootstrap'

const CalculateAllowance = ( { days, calCostOnInputChange } ) => {

    let inputs = []
    for(let i=1; i<=days; i++){
        inputs.push(
            <Form.Group as={Col} md={2} key={i}>
                <Form.Label htmlFor="travelCost">วันที่ {i}</Form.Label>
                <Form.Control 
                    type="number" 
                    data-idx={i-1}
                    name={`dayNo${i}`} 
                    placeholder="จำนวนเงิน" 
                    // value={ costStepData.travelCost }
                    // ref={register}
                    onChange={calCostOnInputChange}
                    size="sm"
                />
            </Form.Group>
        )
    }

    return (
        <div style={{paddingBottom: "1rem", fontSize: 'small'}}>

            <div style={{fontWeight: 'bold'}}>คำนวนเบี้ยเลี้ยง</div>
            <Card body >
                <Form.Row>
                    {
                        inputs.map( input => (
                            input
                        ))
                    }
                </Form.Row>
            </Card>
        </div>
    )
}

export default CalculateAllowance
