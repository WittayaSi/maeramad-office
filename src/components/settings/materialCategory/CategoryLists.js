import React from 'react'
import { useSelector } from 'react-redux'

import { ListGroup, Alert } from 'react-bootstrap'

import EachCategory from "./EachCategory"

const CategoryLists = ({ onClickUpdateMaterialCategory }) => {

    const { categories } = useSelector(state => state.app)

    return (
        <section className="content">
        <ListGroup>
            { 
                (categories.length > 0 )
                ? 
                categories.map(category => (
                    <EachCategory category={category} key={category.id} onClickUpdateMaterialCategory={onClickUpdateMaterialCategory} />
                )) 
                : 
                <Alert variant="danger" style={{textAlign: 'center'}}> ไม่มีข้อมูล</Alert>
            }
        </ListGroup>
        </section>
    );
}

export default CategoryLists;

