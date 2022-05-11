import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CategoryForm from '../../components/settings/materialCategory/CategoryForm'
import CategoryLists from '../../components/settings/materialCategory/CategoryLists'

import { getCategory, loadingCategory } from '../../actions/settings/materialCategoryAction'
import LoadingComponent from '../../components/utillities/LoadingComponent'

const MaterialCategoryPage = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.app)

    const [update, setUpdate] = useState(false)
    const [categoryId, setCategoryId] = useState('')
    const [categoryName, setCategoryName] = useState('')

    useEffect(() => {
        loadingCategory(dispatch)
        getCategory(dispatch)
    }, [])

    const onClickUpdateMaterialCategory = (category) => {
        setUpdate(true)
        setCategoryId(category.id)
        setCategoryName(category.name)
    }

    return (
        <>
            <hr className="bold-border"/>
            <h2 className="text-left">ประเภทวัสดุ</h2>
            <hr />

            {
                loading ? 
                    <LoadingComponent />
                    :
                    <>
                        <CategoryForm 
                            update={update}
                            setUpdate={setUpdate}
                            categoryId={categoryId}
                            setCategoryId={setCategoryId}
                            categoryName={categoryName}
                            setCategoryName={setCategoryName}
                        />
                        <hr />
                        <CategoryLists 
                            update={update}
                            onClickUpdateMaterialCategory={onClickUpdateMaterialCategory}
                        />
                    </>
            }
        </>
    )
}

export default MaterialCategoryPage
