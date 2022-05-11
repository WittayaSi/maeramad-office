import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import OfficeFormModal from '../../components/settings/office/OfficeFormModal'
import OfficeDataComponent from '../../components/settings/office/OfficeDataComponent'
import { getOffice, loadingOffice } from '../../actions/settings/officeAction'
import LoadingComponent from '../../components/utillities/LoadingComponent'

const OfficePage = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.app)

    // useEffect(() => {
    //     loadingOffice(dispatch)
    //     getOffice(dispatch)
    // }, [])

    return (
        <>

            <hr className="bold-border"/>
            <h2 className="text-center mb-4">ข้อมูลหน่วยงาน</h2>

            {
                loading ?
                    <LoadingComponent />
                    : 
                    <>
                        <OfficeFormModal />
                        <OfficeDataComponent />
                    </>
            }

        </>
    )
}

export default OfficePage
