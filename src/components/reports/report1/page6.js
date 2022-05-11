import React from 'react'
import {
    Page,
    Text,
    View,
    StyleSheet,
    Image
} from "@react-pdf/renderer"
import THBText from 'thai-baht-text'

const styles = StyleSheet.create({
    page: {
        fontFamily: 'THSarabunIt9',
        paddingTop: '2cm',
        paddingLeft: '3cm',
        paddingBottom: '2cm',
        paddingRight: '2cm',
        fontSize: 16
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
    rowName: {
        display: "flex",
        flexDirection: "row",
        marginTop: 70
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
        textIndent: 30
    },
    textBodyWithoutJustify: {
        textIndent: 65
    },
    textRegular:{
        paddingLeft: 10,
        paddingTop: 3
    },
    textNormalPaddingLeft:{
        paddingLeft: 10
    },
    customImage: {
        position: "absolute",
        height: "1.5cm",
        width: "1.37cm"
    }
});
const page6 = ({
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
    const otherPrice = 565

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
                            ตก 0432/288
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
                        ด้วย { fullName } ขออนุมัติเงิน งบประมาณประจำปี 2556 งบดำเนินงาน
                        หมวด ค่าตอบแทน ใช้สอยและวัสดุ  ดังนี้
                    </Text>
                </View>

                {/* body */}
                <View style={[styles.row, {marginTop: 10}]}>
                    <Text style={styles.textBody}>
                        1. ค่า {category.name} เป็นเงิน { sumPrice.toLocaleString() } บาท
                    </Text>
                </View>
                <View style={[styles.row, {marginTop: 10}]}>
                    <Text style={styles.textBody}>
                        รวม { procurementItems.length } รายการ  เป็นเงินทั้งสิ้น { sumPrice.toLocaleString() } บาท  { `(${THBText(sumPrice)})` }
                    </Text>
                </View>
                <View style={[styles.row, {marginTop: 10}]}>
                    <Text style={styles.textBody}>
                        หมายเหตุ  ขออนุมัติเบิกจ่ายเพียง  { otherPrice.toLocaleString() }  บาท  { `(${THBText(otherPrice)})` }
                    </Text>
                </View>
                <View style={[styles.row, {marginTop: 10}]}>
                    <Text style={styles.textBody}>
                        จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ
                    </Text>
                </View>

                {/* เจ้าหน้าที่ */}
                <View style={styles.rowName}>
                    <View style={{textAlign: "center"}}>
                        <Text>
                            {`(${officeChiefName})`}
                        </Text>
                        <Text>
                            { officeChiefPosition }
                        </Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={{fontFamily: "THSarabunIt9Bold", fontSize: 18, textAlign: "center", marginTop: 100}}>
                        อนุมัติ
                    </Text>
                </View>
            </View>
        </Page>
    )
}

export default page6
