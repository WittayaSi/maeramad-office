import React from 'react'

import { Document, StyleSheet, Font } from "@react-pdf/renderer"

import fontIt9 from '../../../assets/fonts/thsarabunit9.ttf'
import fontIt9Bold from '../../../assets/fonts/thsarabunit9_bold.ttf'
// import { thaiDate, thaiDateWithSeperator } from '../../../anotherFunctions'
import Page1 from './allowanceCostPage/page1'
import Page2 from './allowanceCostPage/page2'

Font.register({ family: 'THSarabunIt9', src: fontIt9})
Font.register({ family: 'THSarabunIt9Bold', src: fontIt9Bold})

const styles = StyleSheet.create({
    page: {
        fontFamily: 'THSarabunIt9',
        paddingTop: '2cm',
        paddingLeft: '2cm',
        paddingBottom: '2cm',
        paddingRight: '2cm',
        fontSize: 13.5
    },
    row: {
        display: "flex",
        flexDirection: "row"
    },
    title: {
        fontSize: 14,
        textAlign: "center",
        fontFamily: 'THSarabunIt9Bold',
    },
})

const allowanceCost = ({ allowance, fullName }) => {
    return (
        <Document title="ใบเบิกค่าใช้จ่ายในการเดินทางไปราชการ">

            <Page1 styles={styles} {...allowance} officeFullName={fullName} />

            <Page2 {...allowance}/>
            
        </Document>
    )
}

export default allowanceCost
