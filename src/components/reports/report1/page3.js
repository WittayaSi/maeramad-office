import React from 'react'
import {
    Page,
    Text,
    View,
    StyleSheet,
    Image
} from "@react-pdf/renderer"
import THBText from 'thai-baht-text'
import { thaiDate } from '../../../utillities/anotherFunctions';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'THSarabunIt9',
        paddingTop: '2cm',
        paddingLeft: '3cm',
        paddingBottom: '2cm',
        paddingRight: '2cm'
    },
    title: {
        margin: 20,
        fontSize: 25,
        textAlign: "center",
        backgroundColor: "#e4e4e4",
        textTransform: "uppercase",
    },
    row: {
        display: "flex",
        flexDirection: "row"
    },
    rowName1: {
        display: "flex",
        flexDirection: "row",
        marginTop: 15
    },
    rowName2: {
        display: "flex",
        flexDirection: "row",
        marginTop: 15
    },
    rowName3: {
        display: "flex",
        flexDirection: "row",
        marginTop: 15
    },
    textHeader:{
        textAlign: "center",
        fontFamily: 'THSarabunIt9Bold',
        fontSize: 29,
        paddingTop: 15
    },
    textTitle:{
        fontFamily: 'THSarabunIt9Bold',
        fontSize: 20
    },
    textTitleDate:{
        fontFamily: 'THSarabunIt9Bold',
        fontSize: 20
    },
    textBody: { 
        textIndent: 65, 
        fontSize: 15,
        textAlign: "justify"
    },
    textBodyWithoutJustify: {
        textIndent: 65, 
        fontSize: 15
    },
    textRegular:{
        fontSize: 16,
        paddingLeft: 10,
        paddingTop: 3
    },
    textNormal:{
        fontSize: 16
    },
    textNormalPaddingLeft:{
        fontSize: 16,
        paddingLeft: 10
    },
    customImage: {
        position: "absolute",
        height: "1.5cm",
        width: "1.37cm"
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
        marginRight: 5
    },
    colWidth: [
        { width: "30%"},
        { width: "10%"},
        { width: "30%"},
        { width: "14%"},
        { width: "16%"}
    ]
});
const page3 = ({
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

    const addressArr = String(address).split(" ")
    const sumPrice = procurementItems.reduce( (sum, data ) => (sum + (data.amount * data.material.price)), 0)

    const datas = [
        {
            order: `๑. ค่า${category.name}`,
            orderNo: procurementItems.length,
            seller: seller.name,
            bidPrice: 0,
            agreePrice: sumPrice
        }
    ]

    return (
        // บันทึกข้อความ รายงานผลการพิจารณาและขออนุมัติสั่งซื้อ / จ้าง 
        <Page style={styles.page} size="A4">
            <View>
                {/* header */}
                <View style={styles.row}>
                    <Image
                        style={styles.customImage}
                        source="images/krut.jpg"
                    />
                    <Text style={styles.textHeader}>บันทึกข้อความ</Text>
                </View>

                {/* title */}
                <View style={styles.row}>
                    <Text style={styles.textTitle}>
                        ส่วนราชการ
                    </Text>
                    <Text style={styles.textRegular}>
                        {`${fullName} ${addressArr[addressArr.length - 2]} ${addressArr[addressArr.length - 1]} โทร ${telNo}`}
                    </Text>
                </View>
                <View style={styles.row}>
                    <View style={{width: "50%", flexDirection: "row"}}>
                        <Text style={styles.textTitle}>
                            ที่
                        </Text>
                        <Text style={styles.textRegular}>
                            {code}
                        </Text>
                    </View>

                    <Text style={styles.textTitleDate}>
                        วันที่
                    </Text>
                    <Text style={styles.textRegular}>
                        {thaiDate(date)}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textTitle}>
                        เรื่อง
                    </Text>
                    <Text style={styles.textRegular}>
                        รายงานผลการพิจารณาและขออนุมัติสั่งซื้อ / จ้าง { category.name }
                    </Text>
                </View>

                {/* เรียน */}
                <View style={styles.row}>
                    <Text style={styles.textNormal}>
                        เรียน
                    </Text>
                    <Text style={styles.textNormalPaddingLeft}>
                        ผู้ว่าราชการจังหวัดตาก
                    </Text>
                </View>

                {/* body */}
                <View style={[styles.row, {marginTop: 15}]}>
                    <Text style={styles.textBody}>
                        ขอรายงานผลการพิจารณาการซื้อ/จ้าง {category.name} เนื่องจาก { useFor }  รายละเอียดดังต่อไปนี้
                    </Text>
                </View>

                {/* table */}
                <View style={styles.table}>
                    {/* table header */}
                    <View style={styles.tableHeaderRow}>
                        <View style={[styles.tableHeaderCol, styles.colWidth[0]]}>
                            <Text style={styles.tableHeaderCell} >
                            รายการพิจารณา
                            </Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.colWidth[1]]}>
                            <Text style={styles.tableHeaderCell}>
                            จำนวน
                            </Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.colWidth[2]]}>
                            <Text style={styles.tableHeaderCell}>
                            รายชื่อผู้ยื่นข้อเสนอ
                            </Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.colWidth[3]]}>
                            <Text style={styles.tableHeaderCell}>
                            ราคาที่เสนอ
                            </Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.colWidth[4]]}>
                            <Text style={styles.tableHeaderCell}>
                            ราคาที่ตกลงซื้อ หรือจ้าง
                            </Text>
                        </View>
                    </View>

                    {/* table body */}

                    {
                        datas.map( (data, idx) => (
                            <View style={[styles.tableBodyRow, {fontSize: 15}]} key={idx}>
                                <View style={[styles.tableHeaderCol, styles.colWidth[0]]}>
                                    <Text style={styles.tableBodyCell} >
                                        {data.order}
                                    </Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.colWidth[1]]}>
                                    <Text style={[styles.tableBodyCell, {textAlign: "center"}]}>
                                        {`${data.orderNo} รายการ`}
                                    </Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.colWidth[2]]}>
                                    <Text style={styles.tableBodyCell}>
                                        {data.seller}
                                    </Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.colWidth[3]]}>
                                    <Text style={[styles.tableBodyCell, {textAlign: "center"}]}>
                                        { `${(data.bidPrice).toLocaleString()} บาท` }
                                    </Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.colWidth[4]]}>
                                    <Text style={[styles.tableBodyCell, {textAlign: "center"}]}>
                                        { `${(data.agreePrice).toLocaleString()} บาท` }
                                    </Text>
                                </View>
                            </View>
                        ) )
                    }

                    {/* table footer */}
                    <View style={[styles.tableBodyRow, {fontSize: 15}]}>
                        <View style={[styles.tableHeaderCol, {width: "84%"}]}>
                            <Text style={styles.tableBodyCell}>
                                รวมเป็นจำนวนเงินทั้งสิ้น  ( {
                                    THBText(sumPrice)
                                } )
                            </Text>
                        </View>
                        <View style={[styles.tableHeaderCol, {width: "16%"}]}>
                            <Text style={[styles.tableBodyCell, {textAlign: "center"}]}>
                                {
                                    (sumPrice).toLocaleString()
                                }
                            </Text>
                        </View>
                    </View>
                </View>

                {/* body */}
                <View style={[styles.row, {marginTop: 10}]}>
                    <Text style={styles.textBody}>
                        ในการนี้ เจ้าหน้าที่ได้เจรจาตกลงราคากับ {seller.name} แล้วปรากฏว่าเสนอราคา เป็นเงิน { sumPrice.toLocaleString() } บาท { `(${THBText(sumPrice)}) ` }
                        ดังนั้นเพื่อให้เป็น ไปตามระเบียบกระทรวงการคลังว่าด้วยการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. 2560 ข้อ 79 
                        จึงเห็นควรจัดซื้อ/จัดจ้าง จาก {seller.name} เป็นผู้ขาย/ผู้รับจ้าง ทำการจัดซื้อ/จัดจ้าง {seller.name} ในวงเงิน { sumPrice.toLocaleString() } บาท { `(${THBText(sumPrice)}) ` } 
                        กำหนดเวลาการส่งมอบพัสดุหรืองานจ้าง ภายใน { processDays } วัน
                    </Text>
                </View>

                {/* เจ้าหน้าที่ */}
                <View style={styles.rowName1}>
                    <Text style={{textIndent: 65, fontSize: 15, width: "50%"}}>
                        
                    </Text>
                    <View style={{textIndent: 65, fontSize: 15, width: "50%", textAlign: "center"}}>
                        <Text>
                            ลงชื่อ.............................................เจ้าหน้าที่
                        </Text>
                        <Text>
                            ({ inventoryStaffName })
                        </Text>
                    </View>
                </View>
                {/* เจ้าหน้าที่ */}
                <View style={styles.rowName2}>
                    <View style={{textIndent: 65, fontSize: 15, width: "50%", textAlign: "center"}}>
                        <Text>
                            ลงชื่อ.............................................หัวหน้าเจ้าหน้าที่
                        </Text>
                        <Text>
                            ({ inventoryChiefName })
                        </Text>
                    </View>
                </View>
                {/* เจ้าหน้าที่ */}
                <View style={styles.rowName3}>
                    <Text style={{textIndent: 65, fontSize: 15, width: "50%"}}>
                        
                    </Text>
                    <View style={{textIndent: 65, fontSize: 15, width: "50%", textAlign: "center"}}>
                        <Text style={{marginBottom: 20}}>
                            เห็นชอบ/อนุมัติ
                        </Text>
                        <Text>
                            ลงชื่อ.............................................ผู้มีอำนาจ
                        </Text>
                        <Text>
                            ({ officeChiefName })
                        </Text>
                        <Text>
                            {officeChiefPosition}
                        </Text>
                        <Text>
                            ปฏิบัติราชการแทนผู้ว่าราชการจังหวัดตาก
                        </Text>
                    </View>
                </View>
            </View>
        </Page>
    )
}

export default page3
