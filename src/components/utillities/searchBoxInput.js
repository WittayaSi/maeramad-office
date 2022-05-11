import React from 'react'
import { Form, Col } from 'react-bootstrap'

export const SearchBoxTextInput = ({name=''}) => {
    return (
        <div style={{paddingRight: '10px'}}>
            <Form.Control
                type="text"
                name={name}
            />
        </div>
    )
}

export const SearchBoxDateInput = ({name=''}) => {
    return (
        <div style={{paddingRight: '10px'}}>
            <Form.Control
                type="date"
                name={name}
            />
        </div>
    )
}
