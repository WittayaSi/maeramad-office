import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileExcel,
    faFileCsv,
} from '@fortawesome/free-solid-svg-icons'

import { downloadExcelFile } from '../../../actions/excelAction'

const MaterialExport = () => {
    return (
        <div className="dropdown">
            <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Export Data
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="#" onClick={() => downloadExcelFile('csv')}>
                    <FontAwesomeIcon
                        icon={faFileCsv} 
                        style={{ cursor: 'pointer' }}
                        color="green"
                    /> CSV
                </a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#" onClick={() => downloadExcelFile('xls')}>
                    <FontAwesomeIcon
                        icon={faFileExcel} 
                        style={{ cursor: 'pointer' }}
                        color="green"
                    /> XLS
                </a></li>
                <li><a className="dropdown-item" href="#" onClick={() => downloadExcelFile('xlsx')}>
                    <FontAwesomeIcon
                        icon={faFileExcel} 
                        style={{ cursor: 'pointer' }}
                        color="green"
                    /> XLSX
                </a></li>
            </ul>
        </div>

    )
}

export default MaterialExport
