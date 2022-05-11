import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft,faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

const CustomPagination = ({ items, onChangePage, sortedStatus, pageSize=10 }) => {
    
    const [pagination, setPagination] = useState({
        items,
        currentPage: 1,
        pageSize: pageSize,
        totalItems: items.length,
        totalPages: 1,
        startPage: 0,
        endPage: 0,
        startIndex: 0,
        endIndex: 0,
        pages: []
    })

    useEffect(() => {
        if( items.length > 0 ){
            setPage(pagination.currentPage)
        }
        
    }, [items, sortedStatus])

    const setPage = (currentPage, pageSize=pagination.pageSize) => {
        // setPagination({ ...pagination, pageSize })
        setPagination( Object.assign({pageSize}, pagination) )
        if (currentPage < 1 || currentPage > pagination.totalPages) {
            return;
        }
        const pagers = getPager(items.length, currentPage, pageSize)
        //console.log(pagers);
        setPagination({...pagers})
        //setPagination(Object.assign({}, pagers))
        let pageOfItems = items.slice(pagers.startIndex, pagers.endIndex + 1)
        onChangePage({pageOfItems, ...pagers})
        //onChangePage( Object.assign({pageOfItems}, pagers) )
    }

    const getPager = (totalItems, currentPage=1, pageSize) => {
        let totalPages = Math.ceil(totalItems/pageSize)
        let startPage, endPage

        if (totalPages <= 5) {
            // less than 5 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 5 total pages so calculate start and end pages
            if(currentPage <= 3) {
                startPage = 1
                endPage = 5
            } else if (currentPage >= (totalPages-2)) {
                startPage = totalPages - 4
                endPage = totalPages
            } else {
                startPage = currentPage - 2
                endPage = currentPage + 2
            }
        }
        let startIndex = (currentPage -1) * pageSize
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)
        //console.log([...Array((endPage+1) - startPage).keys()]);
        let pages = [...Array((endPage+1) - startPage).keys()].map(i => startPage + i)

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        }
    }

    const onShowChange = (e) => {
        // console.log(e.target.value)
        setPage(1, parseInt(e.target.value))
    }

    return (
        <div>
        {
            (items.length) < 1 ? (
                null
            ) : (
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group row justify-content-start">
                            <label className="col-sm-4 col-md-4 col-lg-4 col-form-label" style={{textAlign: 'left', paddingLeft: '2rem'}}>แสดง</label>
                            <select 
                                className="form-control col-sm-4 col-md-4 col-lg-4"
                                onChange={onShowChange}
                                value={pagination.pageSize}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={items.length}>ทั้งหมด</option>
                            </select>
                            <div className="col-sm-4 col-md-4 col-lg-4" style={{paddingTop: '0.5rem'}}> 
                                รายการ
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3" style={{paddingTop: '0.5rem'}}>
                        <div>
                            กำลังแสดง { ((pagination.currentPage -1 ) * pagination.pageSize) + 1 } ถึง { (pagination.currentPage * pagination.pageSize) > items.length ? items.length : (pagination.currentPage * pagination.pageSize) } จาก {items.length} รายการ
                        </div>
                        
                    </div>

                    <div className="col-md-6">
                        <nav aria-label="" className="nav justify-content-end">
                            <ul className="pagination">
                                <li className={`${pagination.currentPage === 1 ? 'disabled' : ''} page-item`}>
                                    <a className="page-link" href="#" onClick={() => setPage(1)}><FontAwesomeIcon icon={faAngleDoubleLeft} /></a>
                                </li>

                                <li className={`${pagination.currentPage === 1 ? 'disabled' : ''} page-item`}>
                                    <a className="page-link" href="#" onClick={() => setPage(pagination.currentPage - 1)}><FontAwesomeIcon icon={faAngleLeft} /></a>
                                </li>

                                {
                                    (pagination.pages).map((page, index) => (
                                        <li key={index} className={`${pagination.currentPage === page ? 'active' : ''} page-item`}>
                                            <a className="page-link" href="#" onClick={() => setPage(page)}>{page}</a>
                                        </li>
                                    ))
                                }

                                <li className={`${pagination.currentPage === pagination.totalPages ? 'disabled' : ''} page-item`}>
                                    <a className="page-link" href="#" onClick={() => setPage(pagination.currentPage + 1)}><FontAwesomeIcon icon={faAngleRight} /></a>
                                </li>

                                <li className={`${pagination.currentPage === pagination.totalPages ? 'disabled' : ''} page-item `}>
                                    <a className="page-link" href="#" onClick={() => setPage(pagination.totalPages)}><FontAwesomeIcon icon={faAngleDoubleRight} /></a>
                                </li>

                            </ul>
                        </nav>
                    </div>
                </div>   
            )
        }
        </div>
    )
}

CustomPagination.propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired
}

export default CustomPagination
