import React from 'react'
import {
    Page,
    Text,
    View,
    StyleSheet
} from "@react-pdf/renderer"
import THBText from 'thai-baht-text'
import { thaiDate } from '../../../utillities/anotherFunctions'

const styles = StyleSheet.create({
    page: {
        fontFamily: 'THSarabunIt9',
        paddingTop: '2cm',
        paddingLeft: '3cm',
        paddingBottom: '2cm',
        paddingRight: '2cm',
        fontSize: 16
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
        marginTop: 20
    },
    tableHeaderRow: {
        flexDirection: "row",
        fontFamily: "THSarabunIt9Bold",
        fontSize: 15
    },
    tableBodyRow: {
        flexDirection: "row",
        fontFamily: "THSarabunIt9",
        fontSize: 12
    },
    tableHeaderCol: {
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0     
    },
    tableHeaderCell: { 
        textAlign: "center",
        marginTop: "auto",
        marginBottom: "auto"
    },
    tableBodyCell: {
        marginLeft: 5,
        marginRight: 5,
        padding: 2, 
        verticalAlign: 'middle'
    },
    colWidth: [
        { width: "5%"},
        { width: "20%"},
        { width: "38%"},
        { width: "10%"},
        { width: "12%"},
        { width: "15%"}
    ]
})

const page2 = ({
    reportData: {
        code,
        date,
        processDays,
        category,
        useFor,
        moneySource,
        seller,
        personnel,
        personnel2,
        personnel3,
        procurementItems
    }, 
    office: { 
        fullName, 
        address, 
        telNo,
        officeChiefName,
        officeChiefPosition,
        inventoryChiefName,
        inventoryChiefPosition,
        inventoryStaffName,
        inventoryStaffPosition
    }
}) => {

    const sumPrice = procurementItems.reduce( (sum, data ) => (sum + (data.amount * data.material.price)), 0)
    
    return (
        // รายละเอียดของพัสดุและคุณลักษณะเฉพาะพัสดุที่จะขอซื้อ/จ้าง
        <Page style={styles.page} size="A4">
            <View>
                {/* title */}
                <View style={styles.row}>
                    <Text style={styles.title}>
                        รายละเอียดของพัสดุและคุณลักษณะเฉพาะพัสดุที่จะขอซื้อ/จ้าง
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.title}>
                        ตามรายงานขอซื้อ/จ้าง เลขที่ { code } ลงวันที่ {thaiDate(date)}
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
                                รายการวัสดุ
                            </Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.colWidth[2]]}>
                            <Text style={styles.tableHeaderCell}>
                                คุณลักษณะเฉพาะของพัสดุ / ขอบเขตของงานจ้าง
                            </Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.colWidth[3]]}>
                            <Text style={styles.tableHeaderCell}>
                                จำนวน
                            </Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.colWidth[4]]}>
                            <Text style={styles.tableHeaderCell}>
                                ราคา มาตรฐาน/ ราคากลาง (บาท)
                            </Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.colWidth[5]]}>
                            <Text style={styles.tableHeaderCell}>
                            จำนวนเงิน ที่ขอซื้อ/จ้าง (บาท)
                            </Text>
                        </View>
                    </View>

                    {/* table body */}

                    {
                        procurementItems.map( (item, index) => (
                            <View style={styles.tableBodyRow} key={item.id}>
                                <View style={[styles.tableHeaderCol, styles.colWidth[0]]}>
                                    <Text style={[styles.tableBodyCell, {textAlign: "center"}]} >
                                        { ++index }
                                    </Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.colWidth[1]]}>
                                    <Text style={[styles.tableBodyCell]}>
                                        { item.material.name }
                                    </Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.colWidth[2]]} wrap={false}>
                                    <Text style={styles.tableBodyCell}>
                                        { item.material.desc }
                                    </Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.colWidth[3]]}>
                                    <Text style={[styles.tableBodyCell, {textAlign: "center"}]}>
                                        { `${item.amount} ${item.material.unit}` }
                                    </Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.colWidth[4]]}>
                                    <Text style={[styles.tableBodyCell, {textAlign: "center"}]}>
                                        { (item.material.price).toLocaleString() }
                                    </Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.colWidth[5]]}>
                                    <Text style={[styles.tableBodyCell, {textAlign: "center"}]}>
                                        { (item.material.price * item.amount).toLocaleString() }
                                    </Text>
                                </View>
                            </View>
                        ) )
                    }

                    {/* table footer */}
                    <View style={styles.tableBodyRow}>
                        <View style={[styles.tableHeaderCol, {width: "85%"}]}>
                            <Text style={styles.tableBodyCell}>
                                <Text style={{fontFamily: "THSarabunIt9Bold"}}>
                                    รวมเป็นจำนวนเงินทั้งสิ้น
                                </Text>  ( {
                                    THBText(sumPrice)
                                } )
                            </Text>
                        </View>
                        <View style={[styles.tableHeaderCol, {width: "15%"}]}>
                            <Text style={[styles.tableBodyCell, {textAlign: "center"}]}>
                                {
                                    sumPrice.toLocaleString()
                                }
                            </Text>
                        </View>
                    </View>
                </View>

                {/* staff */}
                <View style={[styles.row, {marginTop: 20}]}>
                        <Text style={{textAlign: "center"}}>
                            ลงชื่อ...........................................เจ้าหน้าที่
                        </Text>
                    </View>
                    <View style={{textAlign: "center"}}>
                        <Text>
                            ({inventoryStaffName})
                        </Text>
                    </View>

            </View>
        </Page>
    )
}

export default page2
