import React, { useEffect, useState } from 'react'

const thaiDateComponent = () => {

    const dateWithFormat = new Date().toISOString()
    const [date, setDate] = useState(dateWithFormat)

    useEffect(() => {

        $('.datepicker').datepicker()
        // console.log('Do thaiDateComponent')
        
    }, [date]);

    const onDateInputChange = (e) => {
        setDate(e.target.value)
    }
    return (
        <div>
            <input 
                type="text" 
                name="datepicker" 
                id="datepicker" 
                value={date}
                data-provide="datepicker" 
                data-date-language="th-th"
                onChange={onDateInputChange}
            />
        </div>
    )
}

export default thaiDateComponent
