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
        fontSize: 16,
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
    }
});
const page5 = ({
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
        // บันทึกข้อความ การขออนุมัติเบิกเงิน
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
                            { code }
                        </Text>
                    </View>

                    <Text style={styles.textTitleDate}>
                        วันที่
                    </Text>
                    <Text style={styles.textRegular}>
                        24 เมษายน 2563
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textTitle}>
                        เรื่อง
                    </Text>
                    <Text style={styles.textRegular}>
                        การขออนุมัติเบิกเงิน
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
                        งานพัสดุ ขอส่งเอกสารเพื่อเบิกจ่ายเงิน ตามที่ {`${ fullName }`} ได้ดำเนิน  
                        การสั่งซื้อ/สั่งจ้าง {`${category.name}`} กับ {`${seller.name}`} เป็นจำนวนเงิน
                        {` ${ sumPrice.toLocaleString() }`} บาท {`(${THBText(sumPrice)})`} ซึ่งได้รวมภาษีมูลค่าเพิ่มแล้ว ตามรายงานผลการ 
                        พิจารณาอนุมัติให้สั่งซื้อ ที่ {code} ลงวันที่ { thaiDate(date) } นั้น
                    </Text>
                </View>

                {/* body */}
                <View style={[styles.row, {marginTop: 10}]}>
                    <Text style={styles.textBody}>
                        คณะกรรมการตรวจรับพัสดุหรืองานจ้าง ได้ตรวจรับของหรืองานจ้างถูกต้องครบถ้วนแล้ว
                    </Text>
                </View>
                <View style={[styles.row, {marginTop: 10}]}>
                    <Text style={styles.textBody}>
                        จึงเรียนมาเพื่อโปรดดำเนินการเบิกจ่ายเงินให้ต่อไป
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
                            {`(${inventoryStaffName})`}
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
                            {`(${inventoryChiefName})`}
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
                            {`(${officeChiefName})`}
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

export default page5
