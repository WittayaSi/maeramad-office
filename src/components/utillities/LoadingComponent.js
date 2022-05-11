import React from 'react'

import { Spinner } from 'react-bootstrap'

const LoadingComponent = () => {
    return (
        <>
            <Spinner 
                animation="border" 
                variant="success" 
                style={{
                    width: '5rem', 
                    height: '5rem'
                }}
                className='loading-center'
            />
        </>
    )
}

export default LoadingComponent
