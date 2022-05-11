import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingComponent from '../../components/utillities/LoadingComponent'
import DepartmentFormModalComponent from '../../components/settings/department/DepartmentFormModalComponent'
import DepartmentTableComponent from '../../components/settings/department/DepartmentTableComponent'
import { getDepartment, loadingDepartment } from '../../actions/settings/departmentAction'

const DepartmentPage = () => {
    
    const initDepartment = {
        name: '',
        code: '',
        chiefName: '',
        chiefPosition: '',
    }
    const dispatch = useDispatch() 
    const { loading } = useSelector(state => state.app)

    useEffect(() => {
        loadingDepartment(dispatch)
        getDepartment(dispatch)
    }, [])

    const [modal, setModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [department, setDepartment] = useState(initDepartment)
    const [oldName, setOldName] = useState('')

    const showModal = () => {
        setModal(true)
    }

    const hideModal = () => {
        setModal(false)
        setUpdate(false)
        setDepartment(initDepartment)
        setOldName('')
    }

    const onClickUpdateDepartment = (department) => {
        showModal()
        setUpdate(true)
        setDepartment({...department})
        setOldName(department.name)
    }

    return (
        <>

            <hr className="bold-border"/>
            <h2 className="text-left">ข้อมูล แผนก/ฝ่าย/กลุ่มงาน</h2>

            <hr/>

            {
                loading ? 
                    <LoadingComponent />
                    : 
                    <>
                        <DepartmentFormModalComponent 
                            modal={modal} 
                            update={update}
                            department={department}
                            oldName={oldName}
                            showModal={showModal} 
                            hideModal={hideModal}
                            setDepartment={setDepartment}
                        />
                        <DepartmentTableComponent 
                            onClickUpdateDepartment={onClickUpdateDepartment}  
                        />
                    </>
            }
        </>
    )
}

export default DepartmentPage
