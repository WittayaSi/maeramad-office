import React, { useState, useContext } from 'react'

import { useDispatch } from 'react-redux'
import { Col, Row, Alert, Form } from 'react-bootstrap'
import { createCategory, updateCategory } from '../../../actions/settings/materialCategoryAction'

const CategoryForm = ({
    update, 
    setUpdate, 
    categoryId,
    setCategoryId,
    categoryName, 
    setCategoryName
}) => {

    const dispatch = useDispatch()
    
    const [error, setError] = useState('')
    const [btnStatus, setBtnStatus] = useState(false)
    const [insertSuccess, setInsertSuccess] = useState(false)
    const [validated, setValidated] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        
        if (form.checkValidity() === false) {
            setValidated(true)
        } else {
            setBtnStatus(true)
            
            try {
                const result =await (update ? updateCategory(categoryId, categoryName) : createCategory(categoryName))
                setInsertSuccess(true)
                setTimeout(() => {
                    setInsertSuccess(false)
                    setBtnStatus(false)
                    setValidated(false)
                    setCategoryName('')
                    dispatch(result)
                    setError('')
                    setUpdate(false)
                }, 3000)
            } catch (e) {
                let errorMsg = e.response.data.message
                setError(errorMsg)
                setValidated(true)
                setTimeout(() => {
                    setError('')
                    setBtnStatus(false)
                }, 3000)
            }
        }
        
    }

    return (
        <div>  
            {
                (
                    ((error !== '') || (insertSuccess === true)) 
                        && 
                    <Alert variant={ !insertSuccess ?  "danger" : "success" } className="text-center">
                        { insertSuccess ? "บันทึกสำเร็จ" : error}
                    </Alert> 
                )
            }
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form noValidate validated={validated} onSubmit={onSubmit} >
                        <div className="form-group">
                            <label htmlFor="categoryName">ชื่อประเภทวัสดุ <i style={{color: 'red'}}>*</i></label>
                            <input
                                type="text"
                                name="categoryName"
                                className="form-control"
                                placeholder="กรอกชื่อประเภทวัสดุ"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>
                        { !update ? 
                            <button type="submit" className="btn btn-primary btn-block" disabled={btnStatus}>บันทึก</button>
                            :
                            <Row>
                                <Col>
                                    <button type="submit" className="btn btn-success btn-block" disabled={btnStatus}>บันทึก</button>
                                </Col>
                                <Col>
                                    <button className='btn btn-danger btn-block'
                                        onClick={()=>{
                                            setUpdate(false)
                                            setCategoryId('')
                                            setCategoryName('')
                                            setValidated(false)
                                        }}
                                        disabled={btnStatus}
                                    >ยกเลิก</button>
                                </Col>
                            </Row>
                        }
                        
                    </Form>
                </Col>
            </Row>

        </div>
    );
}

export default CategoryForm;
