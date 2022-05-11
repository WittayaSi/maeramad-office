import moment from 'moment'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { SORTED_ITEMS } from '../types/constantTypes'

export const deleteConfirm = (id, dispatch, action, changeCode, accessToken='') => {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
        title: 'Are you sure?',
        text: `You want to delete this id : ${id}!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ยืนยัน, ลบข้อมูล!',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.value) {
            // console.log(result)
            (accessToken !== '' ? action(id, accessToken) : action(id))
                .then((returnValue) =>{
                    console.log(returnValue)
                    dispatch(returnValue)
                    if(changeCode) {
                        changeCode(dispatch)
                    }
                    Swal.fire(
                        'Deleted!',
                        `Id : ${ id } has been deleted.`,
                        'success'
                    )
                        // .then(()=>{
                        //     if (history) {
                        //         history.go(0)
                        //     }
                        // })
                } )
                .catch( err => {
                    Swal.fire(
                        'Can not Delete!',
                        `${err}.`,
                        'error'
                    ) 
                })
                
        }
    })
}

export const thaiDate = (date) => {
    const monthNameThai = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"]
    const newDate = new Date(date)
    return `${newDate.getDate()} ${monthNameThai[newDate.getMonth()]} ${newDate.getFullYear() + 543}`
}

export const thaiDateWithSeperator = (date) => {
    const monthNameThai = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"]
    const newDate = new Date(date)
    // return { days: newDate.getDate(), months: monthNameThai[newDate.getMonth()], years: newDate.getFullYear() + 543 }
    return `${newDate.getDate()}    /        ${monthNameThai[newDate.getMonth()]}         /     ${newDate.getFullYear() + 543} `
}

export const thaiDateObject = (date) => {
    const monthNameThai = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"]
    const newDate = new Date(date)
    return { days: newDate.getDate(), months: monthNameThai[newDate.getMonth()], years: newDate.getFullYear() + 543 }
}

export const thaiNumber = (number) => {
    const numObj = {
        "1": "๑", 
        "2": "๒", 
        "3": "๓", 
        "4": "๔", 
        "5": "๕", 
        "6": "๖", 
        "7": "๗", 
        "8": "๘", 
        "9": "๙", 
        "0": "๐"
    }
    let numStr = number.toString()
    for(let value in numObj) {
        numStr = numStr.split(value).join(numObj[value])
    }
    return numStr
}

let DESC = true

export const sortByAttributeSubName = ({mainAttribute='', attribute, items, dispatch, sortedStatus, setSortedStatus}) => {
    DESC = !DESC
    let sortedReceives
    if(DESC){
        sortedReceives = items.sort( (a, b) => {
        let keyA = a[mainAttribute][attribute], keyB = b[mainAttribute][attribute]
            //// console.log(keyA, keyB)
            return (keyA < keyB) ? -1 : ((keyA > keyB) ? 1 : 0 )
        })
    } else {
        sortedReceives = items.sort( (b, a) => {
        let keyA = a[mainAttribute][attribute], keyB = b[mainAttribute][attribute]
            //// console.log(keyA, keyB)
            return (keyA < keyB) ? -1 : ((keyA > keyB) ? 1 : 0 )
        })
    }
    setSortedStatus(!sortedStatus)
    dispatch({
        type: SORTED_ITEMS,
        payload: sortedReceives
    })
}

export const sortByAttributeName = ({attribute, items, dispatch, sortedStatus, setSortedStatus}) => {
    DESC = !DESC
    let sortedReceives
    if(DESC){
        sortedReceives = items.sort( (a, b) => {
        let keyA = a[attribute], keyB = b[attribute]
            //// console.log(keyA, keyB)
            return (keyA < keyB) ? -1 : ((keyA > keyB) ? 1 : 0 )
        })
    } else {
        sortedReceives = items.sort( (b, a) => {
        let keyA = a[attribute], keyB = b[attribute]
            //// console.log(keyA, keyB)
            return (keyA < keyB) ? -1 : ((keyA > keyB) ? 1 : 0 )
        })
    }
    setSortedStatus(!sortedStatus)
    dispatch({
        type: SORTED_ITEMS,
        payload: sortedReceives
    })
}

export const integerWithCommaSeperate = (value) => {
    return value.toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ",")
}

export const changeDateFormate = date => {
    const newDate = new Date(date)
    // return { days: newDate.getDate(), months: monthNameThai[newDate.getMonth()], years: newDate.getFullYear() + 543 }
    return `${("0" + newDate.getDate()).slice(-2)}/${ ("0" + ~~(newDate.getMonth()+1)).slice(-2) }/${newDate.getFullYear() + 543} `
}
// export const calculateDays = (e) =>{
//     const { startDate, startTime, endDate, endTime } = generalStepData
//     // // console.log(startDate, endDate);
//     if((startDate !== '') && (endDate !== '')){
//         const startDateTime = new Date(`${startDate} ${startTime}`)
//         const endDateTime = new Date(`${endDate} ${endTime}`)
//         setGeneralStepData({
//             ...generalStepData,
//             noDays: Math.round((endDateTime-startDateTime)/(1000*60*60*24))
//         })
//         // console.log(~~(((endDateTime-startDateTime)/(1000*60*60))/24))
//         // console.log((((endDateTime-startDateTime)/(1000*60*60))%24))
//     }
// }

export const getCurrentFiscalYear = () => {
    return (moment() > moment( `${moment().year()}0930`)) ? moment().year() +1 : moment().year()
}