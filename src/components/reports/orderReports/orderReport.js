import React, { useEffect } from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"

import fontIt9 from '../../../assets/fonts/thsarabunit9.ttf'
import fontIt9Bold from '../../../assets/fonts/thsarabunit9_bold.ttf'
import THBText from 'thai-baht-text'
import { thaiDate, integerWithCommaSeperate, changeDateFormate } from '../../../utillities/anotherFunctions'

Font.register({ family: 'THSarabunIt9', src: fontIt9})
Font.register({ family: 'THSarabunIt9Bold', src: fontIt9Bold})

const styles = StyleSheet.create({
    page: {
        fontFamily: 'THSarabunIt9',
        paddingTop: '1cm',
        paddingLeft: '1cm',
        paddingBottom: '1cm',
        paddingRight: '1cm',
        fontSize: 15
    },
    row: {
        display: "flex",
        flexDirection: "row"
    },
    title: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'THSarabunIt9Bold',
    },
    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid", 
        borderWidth: 1, 
        borderRightWidth: 0, 
        borderBottomWidth: 0,
        marginTop: 10
    },
    tableHeaderRow: {
        flexDirection: "row",
        fontFamily: "THSarabunIt9Bold",
        fontSize: 14
    },
    tableBodyRow: {
        flexDirection: "row",
        fontFamily: "THSarabunIt9",
        fontSize: 14.5
    },
    tableHeaderCol: {
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0,     
    },
    tableHeaderSubCol: {
        borderStyle: "solid",  
        borderRightWidth: 1     
    },
    tableHeaderCell: { 
        textAlign: "center",
        marginTop: "auto",
        marginBottom: "auto",
        padding: 1
    },
    tableBodyCell: {
        // marginLeft: 3,
        // marginRight: 5,
        padding: 2,
        verticalAlign: 'middle'
    },
    tableBodyCellName: {
        marginLeft: 4,
        marginRight: 5,
        padding: 2,
        verticalAlign: 'middle'
    },
    rowName1: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5
    },
    colWidth: [
        { width: "5%"},
        { width: "33%"},
        { width: "7%"},
        { width: "21%"},
        { width: "15%"},
        { width: "9%"},
        { width: "10%"}
    ]
})

const orderReport = ({
    orderSeq,
    fiscalYears,
    department,
    personnel,
    date,
    orderMaterials,
    inventoryStaffName,
    inventoryChiefName
}) => {

    let sumPrice = 0
    // console.log(personnel)
        // const qrCodeSvg = document.querySelector("svg#qrcodeSvg")
        // let qrCodeDataUri =`data:image/svg+xml;utf8,${qrCodeSvg}`
    sumPrice = orderMaterials.reduce( (sum, data ) => (sum + (data.paid * data.material.price)), 0.00)

    return (
        <Document title={`ใบเบิกเลขที่ ${orderSeq} / ${parseInt(fiscalYears) + 543}`}>
            <Page style={styles.page} size="A4">
                <View style={styles.row}>
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: "bold"}}>ใบเบิกวัสดุ</Text>
                    <Text style={{position: 'absolute', right: '3cm', top: 15, fontSize: 14}}>{`ใบเบิกเลขที่ ${orderSeq} / ${parseInt(fiscalYears) + 543}`}</Text>
                </View>

                {/* <View style={styles.row}>
                    
                    <Image height="160" width="160" style={{height: '128px', width: '128px'}}  
                        src={`${qrCodeSvg}`}
                    />
                </View> */}

                {/* เรียน */}
                <View style={[styles.row, {paddingTop: 20}]}>
                    <View style={{width: "50%", flexDirection: "row"}}>
                        <Text>
                            เรียน
                        </Text>
                        <Text style={{paddingLeft: 10}}>
                            หัวหน้าหน่วยพัสดุ
                        </Text>
                    </View>
                    <View style={{width: "50%", flexDirection: "row", textAlign: 'right'}}>
                        <Text>
                            {`วันที่ ${ thaiDate(date) }`}
                        </Text>
                    </View>
                </View>

                {/* ด้วย */}
                <View style={[styles.row, { paddingTop: 15 }]}>
                    <View style={{width: "50%", flexDirection: "row"}}>
                        {/* <Text style={{textIndent: 50}}>
                            {`ด้วยข้าพเจ้า ${ department!==null ? department.chiefName : personnel.department.chiefName }`} 
                        </Text> */}
                        <Text style={{textIndent: 50}}>
                            {`ด้วยข้าพเจ้า ${ personnel===null ? department.chiefName : `${personnel.Prename.shortName}${personnel.fname} ${personnel.lname}` }`} 
                        </Text>
                    </View>

                    <Text style={styles.textTitleDate}>
                        {`ตำแหน่ง ${ personnel===null ? department.chiefPosition : personnel.position}`} 
                    </Text>
                </View>


                <View style={styles.row}>
                    <Text>
                        {`หน่วยเบิก  ${ department!==null ? department.name : personnel.department.name}   มีความประสงค์ขอเบิกวัสดุ เพื่อใช้ในราชการ ดังรายการต่อไปนี้`}
                    </Text>
                </View>

                <View style={styles.table}>
                    {/* table header */}
                    <View style={styles.tableHeaderRow}>
                        <View style={[styles.tableHeaderCol, styles.colWidth[0]]}>
                            <Text style={styles.tableHeaderCell} >
                                ที่
                            </Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.colWidth[1]]}>
                            <Text style={styles.tableHeaderCell}>
                                รายการ
                            </Text>
                        </View>

                        <View style={[styles.tableHeaderCol, styles.colWidth[2]]}>
                            <Text style={styles.tableHeaderCell}>
                                หน่วยนับ
                            </Text>
                        </View>

                        <View style={[styles.tableHeaderCol, styles.colWidth[3]]}>
                            <View style={{
                                borderStyle: "solid", 
                                borderWidth: 1, 
                                borderLeftWidth: 0, 
                                borderTopWidth: 0,
                                borderRightWidth: 0
                            }}>
                                <Text style={styles.tableHeaderCell}>
                                    เบิกครั้งสุดท้าย
                                </Text>
                            </View>

                            <View style={styles.tableHeaderRow}>
                                <View style={{ 
                                    width: '60%', 
                                    borderStyle: "solid", 
                                    borderWidth: 1, 
                                    borderLeftWidth: 0, 
                                    borderTopWidth: 0,
                                    borderBottomWidth: 0
                                }}>
                                    <Text style={styles.tableHeaderCell}>
                                        ว/ด/ป
                                    </Text>
                                </View>
                                <View style={{ width: '40%'}}>
                                    <Text style={styles.tableHeaderCell}>
                                        จำนวน
                                    </Text>
                                </View>
                                {/* <View style={{ width: '24%'}}>
                                    <Text style={styles.tableHeaderCell}>
                                        คงเหลือ
                                    </Text>
                                </View> */}
                            </View>
                        </View>

                        <View style={[styles.tableHeaderCol, styles.colWidth[4]]}>
                            <View style={{
                                borderStyle: "solid", 
                                borderWidth: 1, 
                                borderLeftWidth: 0, 
                                borderTopWidth: 0,
                                borderRightWidth: 0
                            }}>
                                <Text style={styles.tableHeaderCell}>
                                    ขอเบิก
                                </Text>
                            </View>

                            <View style={styles.tableHeaderRow}>
                                <View style={{ 
                                    width: '50%', 
                                    borderStyle: "solid", 
                                    borderWidth: 1, 
                                    borderLeftWidth: 0, 
                                    borderTopWidth: 0,
                                    borderBottomWidth: 0
                                }}>
                                    <Text style={styles.tableHeaderCell}>
                                        เบิก
                                    </Text>
                                </View>
                                <View style={{ width: '50%'}}>
                                    <Text style={styles.tableHeaderCell}>
                                        จ่าย
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.tableHeaderCol, styles.colWidth[5]]}>
                            <Text style={styles.tableHeaderCell}>
                                ราคา
                            </Text>
                        </View>

                        <View style={[styles.tableHeaderCol, styles.colWidth[6]]}>
                            <Text style={styles.tableHeaderCell}>
                                ราคารวม
                            </Text>
                        </View>
                    </View>

                    {/* table body */}

                    {
                        orderMaterials.map( (item, index) => (
                            <View style={[styles.tableBodyRow]} key={item.id}>
                                <View style={[styles.tableHeaderCol, styles.colWidth[0]]}>
                                    <Text style={[styles.tableBodyCell, {textAlign: "center"}]} >
                                        { ++index }
                                    </Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.colWidth[1]]}>
                                    <Text style={[styles.tableBodyCellName]}>
                                        { item.material.name }
                                    </Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.colWidth[2]]}>
                                    <Text style={[styles.tableBodyCell, {textAlign: "center"}]}>
                                        { item.material.unit }
                                    </Text>
                                </View>

                                <View style={[styles.tableHeaderCol, styles.colWidth[3], styles.row]}>
                                    <View style={[styles.tableHeaderSubCol, {width: '60%'}]}>
                                        <Text style={[styles.tableBodyCell, {textAlign: "center"}]}>
                                            { item.lastDate !== null ? `${changeDateFormate(item.lastDate)}` : `-` }
                                        </Text>
                                    </View>
                                    <View style={[styles.tableHeaderSubCol, {width: '40%', borderRightWidth: 0}]}>
                                        <Text style={[styles.tableBodyCell, {textAlign: "center"}]}>
                                            { item.lastAmount !== null ? `${item.lastAmount}` : '-' }
                                        </Text>
                                    </View>
                                    {/* <View style={[styles.tableHeaderSubCol, {borderRightWidth: 0}, {width: '24%'}]}>
                                        <Text style={[styles.tableBodyCell, {textAlign: "center"}]}>
                                            { `0` }
                                        </Text>
                                    </View> */}
                                </View>

                                <View style={[styles.tableHeaderCol, styles.colWidth[4], styles.row]}>
                                    <View style={[styles.tableHeaderSubCol, {width: '50%'}]}>
                                        <Text style={[styles.tableBodyCell, {textAlign: "center"}]}>
                                            { `${item.amount}` }
                                        </Text>
                                    </View>
                                    <View style={[styles.tableHeaderSubCol, {borderRightWidth: 0}, {width: '50%'}]}>
                                        <Text style={[styles.tableBodyCell, {textAlign: "center"}]}>
                                            { `${item.paid}` }
                                        </Text>
                                    </View>
                                </View>

                                <View style={[styles.tableHeaderCol, styles.colWidth[5]]}>
                                    <Text style={[styles.tableBodyCell, {textAlign: "right"}]}>
                                        { integerWithCommaSeperate(item.material.price) }
                                    </Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.colWidth[6]]}>
                                    <Text style={[styles.tableBodyCell, {textAlign: "right"}]}>
                                        { integerWithCommaSeperate(item.material.price * item.paid)}
                                    </Text>
                                </View>
                            </View>
                        ) )
                    }

                    {/* table footer */}
                    <View style={styles.tableBodyRow}>
                        <View style={[styles.tableHeaderCol, {width: "90%"}]}>
                            <Text style={{...styles.tableBodyCell, textAlign: 'center'}}>
                                <Text style={{fontFamily: "THSarabunIt9Bold"}}>
                                    รวมเป็นจำนวนเงินทั้งสิ้น &nbsp;&nbsp;
                                </Text>  
                                    ( { sumPrice === 0 ? '-' : THBText(sumPrice) } )
                                </Text>
                        </View>
                        <View style={[styles.tableHeaderCol, {width: "10%"}]}>
                            <Text style={[styles.tableBodyCell, {textAlign: "right"}]}>
                                {
                                    integerWithCommaSeperate(sumPrice)
                                }
                            </Text>
                        </View>
                    </View>
                </View>


                {/* เจ้าหน้าที่ */}
                <View style={[styles.rowName1, {paddingTop: 15}]}>
                    <Text style={{fontSize: 15, width: "50%", textAlign: "center"}}>
                        <Text>
                            ลงชื่อ........................................................ผู้เบิก  {'\n'}
                        </Text>
                        <Text>
                            {`( ${ personnel===null ? department.chiefName : `${personnel.Prename.shortName}${personnel.fname} ${personnel.lname}` } )`}
                        </Text>
                    </Text>
                    <View style={{fontSize: 15, width: "50%", textAlign: "center"}}>
                        <Text>
                            ลงชื่อ........................................................ผู้ตรวจสอบ
                        </Text>
                        <Text>
                            {`( ${inventoryStaffName} )`} {'\n'}
                        </Text>
                        <Text>
                            เจ้าหน้าที่
                        </Text>
                    </View>
                </View>

                {/* เจ้าหน้าที่ */}
                <View style={[styles.rowName1, {paddingTop: 15}]}>
                    <Text style={{fontSize: 15, width: "50%", textAlign: "center"}}>
                        <Text>
                            ลงชื่อ........................................................ผู้รับ  {'\n'}
                        </Text>
                        <Text>
                            ได้รับตามจำนวนและรายการที่จ่ายเรียบร้อยแล้ว {'\n'}
                        </Text>
                        <Text>
                            วันที่........./.........................../............
                        </Text>
                    </Text>
                    <View style={{fontSize: 15, width: "50%", textAlign: "center"}}>
                        <Text>
                            ลงชื่อ........................................................ผู้อนุมัติ
                        </Text>
                        <Text>
                        {`( ${inventoryChiefName} )`} {'\n'}
                        </Text>
                        <Text>
                            หัวหน้าเจ้าหน้าที่
                        </Text>
                    </View>
                </View>

                {/* เจ้าหน้าที่ */}
                <View style={[styles.rowName1, {paddingTop: 15}]}>
                    <Text style={{fontSize: 15, width: "50%", textAlign: "center"}}>
                        
                    </Text>
                    <View style={{fontSize: 15, width: "50%", textAlign: "center"}}>
                        <Text>
                            ลงชื่อ........................................................ผู้จ่าย {'\n'}
                        </Text>
                        <Text>
                            (                                  ) {'\n'}
                        </Text>
                        <Text>
                            วันที่........./.........................../............
                        </Text>
                    </View>
                </View>

            </Page>
        </Document>
    )
}

// orderReport.propTypes = {
//     qrCodeDataUri: PropTypes.string.isRequired
// }

export default orderReport
