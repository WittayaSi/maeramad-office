import React from 'react'
import { useDispatch } from 'react-redux'

import { ListGroupItem, Badge, ButtonGroup, Button, Col, Row } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrashAlt,
    faEdit
} from '@fortawesome/free-solid-svg-icons'
import { deleteConfirm } from '../../../utillities/anotherFunctions'
import { removeCategory } from '../../../actions/settings/materialCategoryAction'

const EachCategory = ({ 
    category,
    update,
    onClickUpdateMaterialCategory
}) => {

    const dispatch = useDispatch()

    const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />
    const editIcon = <FontAwesomeIcon icon={faEdit} />

    const onDeleteClickHandle = (id) => {
        deleteConfirm(id, dispatch, removeCategory)
    }

    return (
        <div>
            <ListGroupItem className="justify-content-between">
                <Row>
                    <Col>
                        { category.name } <Badge pill variant="success"> วัสดุ : { category.materialCount } รายการ</Badge>
                    </Col>
                    <Col md="auto" >
                        <ButtonGroup size="sm">
                            <Button
                                onClick={() => onClickUpdateMaterialCategory(category)}
                                variant="info"
                                title="Edit"
                                disabled={update}
                            >
                                {editIcon}
                            </Button>
                            <Button
                                onClick={() => onDeleteClickHandle(category.id)}
                                variant="danger"
                                title="Delete"
                                disabled={update}
                            >
                                {deleteIcon}
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </ListGroupItem>
        </div>
    );
}

export default EachCategory;
