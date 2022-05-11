import React from 'react'
import {
    Page,
    Text,
    View,
    StyleSheet,
    Image
} from "@react-pdf/renderer"
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
        marginTop: 10
    },
    rowName2: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10
    },
    rowName3: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10
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
    pageNumber: {
        position: 'absolute',
        fontSize: 16,
        top: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

const page1 = ({ 
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
    // const subject = "102,Object Oriented Programming: with Java (3),math|advance"
    // const regex = /([0-9]{3}),(.+)\(([0-9]{1})\),([a-z]+(\|[a-z]+)*)?/
    // console.log(regex.exec(subject))
    const sumPrice = procurementItems.reduce( (total, item) => {
        return total += (item.amount * item.material.price)
    }, 0)
    
    return (
        // บันทึกข้อความ รายงานขอจัดซื้อ / จ้าง 
        <Page style={styles.page} size="A4">

            {/* <Text style={styles.pageNumber} render={({pageNumber, totalPages}) => (
                `- ${pageNumber} -`
            )} fixed></Text> */}

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
                        { thaiDate(date) }
                    </Text>
                </View>
                
                <View style={styles.row}>
                    <Text style={styles.textTitle}>
                        เรื่อง
                    </Text>
                    <Text style={styles.textRegular}>
                        รายงานขอจัดซื้อ / จ้าง { category.name }
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
                <View style={styles.row}>
                    <Text style={styles.textBody}>
                        ด้วย {fullName} มีความจำเป็นที่จะต้อง    ( <Text style={{fontSize: 12}}></Text> )  ซื้อ    ( <Text style={{fontSize: 12}}></Text> )  จ้าง 
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={{ fontSize: 15, textAlign: "justify"}}>
                        {category.name} งานพัสดุได้ตรวจสอบแล้ว เห็นควรจัดจ้างตามที่เสนอและให้เป็นไปตามพระราชบัญญัติการจัดซื้อ
                        จัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. 2560 มาตรา 56 (2) (ข) และตามระเบียบกระทรวงการคลัง ว่าด้วยการจัด
                        ซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. 2560 ข้อ 22 ข้อ 79 ข้อ 25 (5) และกฎกระทรวง กำหนดวงเงินการ 
                        จัดซื้อจัดจ้างพัสดุโดยวิธีเฉพาะเจาะจง วงเงินการจัดซื้อจัดจ้างที่ไม่ต้องทำข้อตกลงเป็นหนังสือ และวงเงินการจัดซื้อ 
                        จัดจ้างในการแต่งตั้งผู้ตรวจรับพัสดุ พ.ศ. 2560 ข้อ 1 และข้อ 5 จึงทำรายงานขอจ้างซึ่ง มีรายละเอียดดังต่อไปนี้
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.textBodyWithoutJustify} wrap>
                        1. เหตุผลและความจำเป็นที่จะต้องซื้อหรือจ้าง เพื่อ {useFor}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textBodyWithoutJustify}>
                        2. รายละเอียดของพัสดุที่จะขอซื้อหรือจ้าง {category.name} ตามรายละเอียดที่แนบ
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textBodyWithoutJustify}>
                        3. ราคากลางของทางราชการ จากจากราคาที่เคยจ้างครั้งหลังสุด เป็นเงิน { sumPrice.toLocaleString() } บาท
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textBodyWithoutJustify}>
                        4. แหล่งของเงินและวงเงินที่จะซื้อหรือจ้างครั้งนี้ { moneySource }
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textBodyWithoutJustify}>
                        5. กำหนดเวลาที่ต้องใช้พัสดุหรือให้งานแล้วเสร็จภายใน { processDays } วัน นับจากวันสั่งซื้อ/จ้าง
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textBodyWithoutJustify}>
                        6. วิธีการจัดซื้อ/จัดจ้าง และเหตุผลที่ต้องจัดซื้อ/จัดจ้าง
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textBodyWithoutJustify}>
                        ดำเนินการจัดซื้อ/จัดจ้าง เนื่องจากการจัดซื้อจัดจ้างพัสดุที่มีการผลิต จำหน่าย ก่อสร้าง หรือให้บริการทั่วไปและมีวงเงินในการจัดซื้อจัดจ้างครั้งหนึ่งไม่เกินวงเงินตามที่กระทรวงกำหนดในกฎกระทรวง
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textBodyWithoutJustify}>
                        7. หลักเกณฑ์พิจารณาคัดเลือกข้อเสนอ โดยใช้ เกณฑ์ราคา/เกณฑ์คุณภาพ
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textBodyWithoutJustify}>
                        8. ขออนุมัติแต่งตั้งคณะกรรมการตรวจรับพัสดุ รายนามดังต่อไปนี้
                    </Text>
                </View>

                {
                    ( personnel2 !== null && personnel3 !==null ) ? (
                        <View style={{ fontSize: 14 }}>
                            <View style={styles.row}>
                                <Text style={styles.textBodyWithoutJustify}>
                                    1. {`${personnel.Prename.shortName}${personnel.fname} ${personnel.lname} `} 
                                    ตำแหน่ง {personnel.position} ประธานผู้ตรวจรับพัสดุหรืองานจ้าง
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.textBodyWithoutJustify}>
                                    2. {`${personnel2.Prename.shortName}${personnel2.fname} ${personnel2.lname} `} 
                                    ตำแหน่ง {personnel2.position} ผู้ตรวจรับพัสดุหรืองานจ้าง
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.textBodyWithoutJustify}>
                                    3. {`${personnel3.Prename.shortName}${personnel3.fname} ${personnel3.lname} `} 
                                    ตำแหน่ง {personnel3.position} ผู้ตรวจรับพัสดุหรืองานจ้าง
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View style={[styles.row, {fontSize: 14}]}>
                            <Text style={styles.textBodyWithoutJustify}>
                                1. {`${personnel.Prename.shortName}${personnel.fname} ${personnel.lname} `} 
                                    ตำแหน่ง {personnel.position} ผู้ตรวจรับพัสดุหรืองานจ้าง
                            </Text>
                        </View>
                    )
                }

                

                {/* จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ */}
                <View style={styles.row}>
                    <Text style={{textIndent: 65, fontSize: 15, marginTop: 20}}>
                        จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ
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
                        <Text style={{marginBottom: 15}}>
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

export default page1
