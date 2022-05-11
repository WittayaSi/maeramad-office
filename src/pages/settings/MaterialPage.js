import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'react-bootstrap'

import MaterialExport from '../../components/settings/material/MaterialExport'
import MaterialLists from '../../components/settings/material/MaterialLists'
import LoadingComponent from '../../components/utillities/LoadingComponent'

import { getCategory } from '../../actions/settings/materialCategoryAction'
import { getMaterial, loadingMaterial } from '../../actions/settings/materialAction'

const MaterialPage = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.app)

    useEffect(() => {
        loadingMaterial(dispatch)
        getMaterial(dispatch)
        getCategory(dispatch)
    }, [])

    return (
        <>
            <hr className="bold-border"/>

            <Row>
                <Col>
                    <h2 className="text-left">ชนิดวัสดุ</h2>
                </Col>
                <Col className="text-right">
                    <MaterialExport />
                </Col>
            </Row>
            <hr/>

            {
                loading ? 
                    <LoadingComponent />
                    :
                    <MaterialLists />
            }
            
        </>
    )
}

export default MaterialPage
