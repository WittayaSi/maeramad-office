import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingComponent from '../../components/utillities/LoadingComponent'
import PersonnelFormModal from '../../components/settings/personnel/PersonnelFormModal'
import PersonnelTable from '../../components/settings/personnel/PersonnelTable'
import { getPersonnels, loadingPersonnel } from '../../actions/settings/personnelAction'

const PersonnelPage = () => {

    const initPerson = {
        prename: '',
        fname: '',
        lname: '',
        position: '',
        departmentId: ''
    }

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.app)

    const [modal, setModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [person, setPerson] = useState(initPerson)

    useEffect(() => {
        loadingPersonnel(dispatch)
        getPersonnels(dispatch)
    }, [])

    const showModal = () => {
        setModal(true)
    }
    const hideModal = () => {
        setModal(false)
        setUpdate(false)
        setPerson({...initPerson})
    }
    const onClickUpdateHandle = (person) => {
        setUpdate(true)
        setPerson({...person})
        showModal()
    }

    return (
        <>
            <hr className="bold-border"/>
            <h2>บุคลากร</h2>
            
            <hr/>
            {
                loading ?
                    <LoadingComponent />
                    : 
                    <>
                        <PersonnelFormModal
                            modal={modal}
                            update={update}
                            person={person}
                            setPerson={setPerson}
                            showModal={showModal}
                            hideModal={hideModal}
                        />
                        <PersonnelTable
                            onClickUpdateHandle={onClickUpdateHandle}
                        />
                    </>
            }
        </>
    )
}

export default PersonnelPage
