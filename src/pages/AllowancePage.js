import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AllowanceFormModal from '../components/allowances/AllowanceFormModal'
import AllowanceTable from '../components/allowances/AllowanceTable'
import Loading from '../components/utillities/LoadingComponent'

import { generalInitialData, carInitialData, costInitialData } from '../components/allowances/initialState'
import { getAllowances, loadingAllowances } from '../actions/allowanceAction'

const AllowancePage = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.allowance)

    const [generalStepData, setGeneralStepData] = useState(generalInitialData)
    const [carStepData, setCarStepData] = useState(carInitialData)
    const [costStepData, setCostStepData] = useState(costInitialData)

    const [modal, setModal] = useState(false)
    const [update, setUpdate] = useState(false)

    const [oldAllowanceData] = useState({})

    useEffect(() => {
        loadingAllowances(dispatch)
        getAllowances(dispatch)
    }, [dispatch])

    const showModal = () => {
        setModal(true)
    }
    const hideModal = () => {
        setGeneralStepData(generalInitialData)
        setCarStepData(carInitialData)
        // setCostStepData(costInitialData)
        setUpdate(false)
        //setCreateUpdateCompleted(false)
        setModal(false)
    }

    const onClickUpdateAllowance = allowance => {
        console.log(allowance)
        const { 
            startDate, endDate, allowanceCarUse, allowanceCost, allowancePersons, applicantData, driverData, ...generalSameInitWithData 
        } = allowance
        if(allowanceCarUse.length !== 0) {
            const {
                selfNameData, ...carSameInitWithData
            } = allowanceCarUse[0]
            // console.log(carSameInitWithData)
            setCarStepData( prev => ({
                ...prev,
                ...carSameInitWithData
            }))

        }
        // if(allowanceCost !== null){
        //     const {
        //         borrowerData, writerData, ...costSameInitWithData
        //     } = allowanceCost[0]
        //     setCostStepData({
        //         ...costSameInitWithData
        //     })
        // }
        const persons = allowancePersons.map( pro => ({personId: pro.personId}) )
        const newStartDate = new Date(startDate)
        const newEndDate = new Date(endDate)

        const startDateOnly = `${newStartDate.getFullYear()}-${('0'+(newStartDate.getMonth() + 1)).slice(-2)}-${('0'+newStartDate.getDate()).slice(-2)}`

        const endDateOnly = `${newEndDate.getFullYear()}-${('0'+(newEndDate.getMonth() + 1)).slice(-2)}-${('0'+newEndDate.getDate()).slice(-2)}`

        const startTime = `${newStartDate.getHours() < 10 ? '0' + newStartDate.getHours() : newStartDate.getHours()}:${newStartDate.getMinutes() < 10 ? '0' + newStartDate.getMinutes() : newStartDate.getMinutes()}`
        const endTime = `${newEndDate.getHours() < 10 ? '0' + newEndDate.getHours() : newEndDate.getHours()}:${newEndDate.getMinutes() < 10 ? '0' + newEndDate.getMinutes() : newEndDate.getMinutes()}`

        setGeneralStepData({
            ...generalSameInitWithData,
            startDate: startDateOnly,
            endDate: endDateOnly,
            startTime,
            endTime,
            persons
        })

        setUpdate(true)
        showModal()

        // setOldAllowanceData({
        //     generalStepData: generalSameInitWithData,
        //     carStepData: carSameInitWithData,
        //     costStepData: costSameInitWithData
        // })
        // let changedMaterials = materials.filter( m => m.categoryId===procurement.categoryId )
        // setNewMaterials(changedMaterials)
        // let checker = ( procurement.personnelId2 !== "" && procurement.personnelId3 !== "" ) ? '3' : '1'
        // setChecker(checker)
    }


    const dataForTable = {
        onClickUpdateAllowance
    }

    const dataForForm = {
        showModal,
        hideModal,
        update,
        setUpdate,
        modal,
        setModal,
        generalStepData,
        setGeneralStepData,
        carStepData, 
        setCarStepData,
        // costStepData,
        setCostStepData,
        generalInitialData, 
        carInitialData, 
        // costInitialData,
    }

    return (
        <>
            <hr className="bold-border"/>
            <h2 className="mb-4">ขออนุญาตไปราชการ</h2>

            <AllowanceFormModal data={dataForForm} />

            {
                loading ? 
                    <Loading />
                    :
                    <AllowanceTable data={dataForTable} />
            }
        </>
    )
}

export default AllowancePage
