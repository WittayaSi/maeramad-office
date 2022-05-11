import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Alert } from 'react-bootstrap'

import MaterialFormModal from './MaterialFormModal'
import MaterialTable from './MaterialTable'

import { updateMaterialStatus } from '../../../actions/settings/materialAction'

const MaterialLists = () => {

    const initMaterial = {
        categoryId: '',
        name: '',
        desc: '',
        unit: '',
        price: 0.00,
        status: '1'
    }

    const { materials } = useSelector(state => state.app)
    
    const [modal, setModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [material, setMaterial] = useState(initMaterial)

    const showModal = () => {
        setModal(true)
    }
    const hideModal = () => {
        setModal(false)
        setUpdate(false)
        setMaterial({...initMaterial})
    }

    const onUpdateClickHandle = (material) => {
        showModal()
        setUpdate(true)
        setMaterial({...material})
    }

    const onUpdateStatusHandle = (checked, id) => {
        updateMaterialStatus(checked, id)
    }

    return (
        <>  

            <MaterialFormModal 
                material={material}
                setMaterial={setMaterial}
                modal={modal}
                update={update}
                setUpdate={setUpdate}
                showModal={showModal}
                hideModal={hideModal}
            />
            
            {
                materials.length > 0 ?
                <MaterialTable 
                    onUpdateClickHandle={onUpdateClickHandle} 
                    onUpdateStatusHandle={onUpdateStatusHandle}
                />
                :
                <Alert variant="danger" className="text-center"> ไม่มีข้อมูล</Alert>
            }
            
        </>
    );
}

export default MaterialLists
