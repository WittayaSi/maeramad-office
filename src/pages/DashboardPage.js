import React from 'react'
import { useSelector } from 'react-redux'

import UserDashboard from '../components/UserDashboard'
import LoadingComponent from '../components/utillities/LoadingComponent'



const Dashboard = () => {

    // const { orders } = useSelector( state => state.orders )
    // const { receives } = useSelector( state => state.receives )

    const { loading, summarize } = useSelector(state => state.app)
    

    return (
        loading ? 
            <LoadingComponent />
            :
            <UserDashboard 
                orderCount={summarize.orderMaterialNo} 
                recieveCount={summarize.recieveMaterialNo}
                registeredDurableCount={summarize.registeredDurableNo}
                procurementCount={summarize.procurementNo}
                allowanceCount={summarize.allowanceNo}
            />
    )
}

export default Dashboard;
