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
        paddingRight: '2cm',
        fontSize: 16
    },
    row: {
        display: "flex",
        flexDirection: "row"
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "THSarabunIt9Bold"
    },
    textBody: {
        textIndent: 65,
        fontSize: 15
    },
    rowName1: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5
    },
    rowName2: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5
    },
    rowName3: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5
    },
    rowName4: {
        display: "flex",
        flexDirection: "row",
        marginTop: 4
    },
});
const page4 = ({
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

    return (
        // ใบตรวจรับการจัดซื้อ/จัดจ้าง
        <Page style={styles.page} size="A4">
            <View>
                {/* header */}
                <View style={styles.row}>
                    <Text style={styles.title}>ใบตรวจรับการจัดซื้อ/จัดจ้าง</Text>
                </View>

                {/* เขียนที่ */}
                <View style={styles.row}>
                    <View style={{width: "65%"}}>
                        <Text style={{textAlign: "right", fontFamily: "THSarabunIt9Bold", marginRight: 10}}>
                            เขียนที่
                        </Text>
                    </View>
                    <View>
                        <Text>
                            { fullName }
                        </Text>
                        <Text>
                            {`${addressArr[addressArr.length - 2]} ${addressArr[addressArr.length - 1]}`}
                        </Text>
                    </View>
                </View>
                {/* วันที่ */}
                <View style={styles.row}>
                    <View style={{width: "50%"}} />
                    <Text style={{marginTop: 15}}>
                        วันที่ 24 เมษายน 2563
                    </Text>
                </View>

                {/* body */}
                <View style={[styles.row, {marginTop: 8}]}>
                    <Text style={styles.textBody}>
                        ตาม ใบส่งของ/ใบกำกับภาษี เลขที่ 25 เล่มที่ 16 ลงวันที่ 24 เมษายน 2563 ตามรายงานขอ
                        อนุมัติจัดซื้อ ที่ {code}  วันที่ {thaiDate(date)}   <Text style={{fontSize: 12}}></Text> ซึ่งได้แต่งตั้ง ผู้ตรวจรับพัสดุ/จ้าง {'\n'}
                        <Text style={{fontSize: 12}}></Text> คณะกรรมการตรวจรับพัสดุในการซื้อ/จ้าง จาก { `${seller.name} ` } 
                        เป็นจำนวนเงินทั้งสิ้น { sumPrice.toLocaleString() } บาท  { `(${THBText(sumPrice)})` }  นั้น
                    </Text>
                </View>
                <View style={[styles.row, {marginTop: 8}]}>
                    <Text style={styles.textBody}>
                        ขอรายงานว่า ได้ตรวจรับพัสดุตามใบส่งของ/ใบเสร็จรับเงิน ข้างต้นแล้ว ผลปรากฏว่า
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textBody}>
                        ผลการตรวจรับ
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.textBody, {paddingLeft: 90, paddingTop: 5}]}>
                        <Text style={{fontSize: 14}}></Text> ถูกต้อง
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.textBody, {paddingLeft: 120, paddingTop: 5}]}>
                        <Text style={{fontSize: 14}}></Text> ครบถ้วนตามสัญญา {'\n'} เห็นสมควรจ่ายเงินตามสัญญาให้แก่คู่สัญญาต่อไป
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.textBody, {paddingLeft: 120, paddingTop: 5}]}>
                        <Text style={{fontSize: 14}}></Text> ไม่ครบถ้วนตามสัญญา
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.textBody, {paddingLeft: 90, paddingTop: 5}]}>
                        <Text style={{fontSize: 14}}></Text> ไม่ถูกต้อง
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.textBody, {paddingLeft: 20, paddingTop: 10}]}>
                        ค่าปรับ
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.textBody, {paddingLeft: 90, paddingTop: 5}]}>
                        <Text style={{fontSize: 14}}></Text> มีค่าปรับ
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.textBody, {paddingLeft: 90, paddingTop: 5}]}>
                        <Text style={{fontSize: 14}}></Text> ไม่มีค่าปรับ
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.textBody, {paddingTop: 10}]}>
                        จึงลายมือชื่อไว้เป็นหลักฐาน
                    </Text>
                </View>

                {/* ประธานผู้ตรวจรับพัสดุหรือจ้าง */}{/* ผู้ตรวจรับพัสดุหรือจ้าง */}
                {
                    ( personnel2 !== null && personnel3 !== null ) ? (
                        <View>
                            <View style={styles.rowName1}>
                                <View style={{fontSize: 15, textAlign: "center"}}>
                                    <Text>
                                        ลงชื่อ.............................................ประธานผู้ตรวจรับพัสดุ {'\n'} 
                                    </Text>
                                    <Text>
                                        ({`${personnel.Prename.shortName}${personnel.fname} ${personnel.lname}`})
                                    </Text>
                                </View>
                            </View>
                            
                            <View style={styles.rowName1}>
                                <Text style={{fontSize: 15, width: "50%", textAlign: "center"}}>
                                    <Text>
                                        ลงชื่อ.............................................ผู้ตรวจรับพัสดุ {'\n'}    
                                    </Text>
                                    <Text>
                                        ({`${personnel2.Prename.shortName}${personnel2.fname} ${personnel2.lname}`})
                                    </Text>
                                </Text>
                                <View style={{fontSize: 15, width: "50%", textAlign: "center"}}>  
                                    <Text>
                                        ลงชื่อ.............................................ผู้ตรวจรับพัสดุ {'\n'}
                                    </Text>
                                    <Text>
                                        ({`${personnel3.Prename.shortName}${personnel3.fname} ${personnel3.lname}`})
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.rowName1}>
                            <View style={{fontSize: 15, textAlign: "center"}}>
                                <Text>
                                    ลงชื่อ.............................................ผู้ตรวจรับพัสดุหรือจ้าง
                                </Text>
                                <Text>
                                    ({`${personnel.Prename.shortName}${personnel.fname} ${personnel.lname}`})
                                </Text>
                            </View>
                        </View>
                    )
                }
                
                


                {/* เรียน  ผู้ว่าราชการจังหวัดตาก */}
                <View style={[styles.row, {marginTop: 10}]}>
                    <Text style={{fontSize: 15}}>
                        เรียน  ผู้ว่าราชการจังหวัดตาก
                    </Text>
                </View>
                {/* จึงเรียนมาเพื่อโปรดทราบ */}
                <View style={[styles.row]}>
                    <Text style={styles.textBody}>
                        จึงเรียนมาเพื่อโปรดทราบ
                    </Text>
                </View>

                {/* เจ้าหน้าที่ */}
                <View style={styles.rowName1}>
                    <Text style={{fontSize: 15, width: "50%"}}>
                        
                    </Text>
                    <View style={{fontSize: 15, width: "50%", textAlign: "center"}}>
                        <Text>
                            ลงชื่อ.............................................เจ้าหน้าที่
                        </Text>
                        <Text>
                            ({inventoryStaffName})
                        </Text>
                    </View>
                </View>
                {/* เจ้าหน้าที่ */}
                <View style={styles.rowName2}>
                    <View style={{fontSize: 15, width: "50%", textAlign: "center"}}>
                        <Text>
                            ลงชื่อ.............................................หัวหน้าเจ้าหน้าที่
                        </Text>
                        <Text>
                            ({inventoryChiefName})
                        </Text>
                    </View>
                </View>
                {/* เจ้าหน้าที่ */}
                <View style={styles.rowName3}>
                    <Text style={{fontSize: 15, width: "50%"}}>
                        
                    </Text>
                    <View style={{fontSize: 15, width: "50%", textAlign: "center"}}>
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
                            { officeChiefPosition }
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

export default page4
