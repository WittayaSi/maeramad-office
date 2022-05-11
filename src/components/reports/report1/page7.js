import React from 'react'
import {
    Page,
    Text,
    View,
    StyleSheet
} from "@react-pdf/renderer"
// import THBText from 'thai-baht-text'

const styles = StyleSheet.create({
    page: {
        fontFamily: 'THSarabunIt9',
        paddingTop: '2cm',
        paddingLeft: '3cm',
        paddingBottom: '2cm',
        paddingRight: '2cm',
        fontSize: 15
    },
    row: {
        display: "flex",
        flexDirection: "row"
    },
    title: {
        textAlign: "center"
    },
    textBody: { 
        textIndent: 30,
        textAlign: "justify"
    }
});
const page7 = ({
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
    const threeChecker = personnel2 !== null && personnel3 !== null
    return (
        <Page style={styles.page} size="A4">
            <View>
                {/* title */}
                <View style={styles.row}>
                    <Text style={styles.title}>
                        แบบแสดงความบริสุทธิ์ใจในการจัดซื้อจัดจ้างของหน่วยงาน {'\n'}
                        ในการเปิดเผยข้อมูลความขัดแย้งทางผลประโยชน์ {'\n'}
                        ของหัวหน้าเจ้าหน้าที่ เจ้าหน้าที่และผู้ตรวจรับพัสดุ/งานจ้าง {'\n'}
                        ..................................................................
                    </Text>
                </View>

                {/* รายชื่อ */}
                <View style={[styles.row, {marginTop: 20}]}>
                    <Text style={{width: "30%", textAlign: "center"}}>
                        ข้าพเจ้า
                    </Text>
                    <Text style={{width: "40%"}}>
                        { inventoryChiefName }
                    </Text>
                    <Text style={{width: "30%"}}>
                        หัวหน้าเจ้าหน้าที่
                    </Text>
                </View>
                {/* รายชื่อ */}
                <View style={styles.row}>
                    <Text style={{width: "30%", textAlign: "center"}}>
                        ข้าพเจ้า
                    </Text>
                    <Text style={{width: "40%"}}>
                        { inventoryStaffName }
                    </Text>
                    <Text style={{width: "30%"}}>
                        เจ้าหน้าที่
                    </Text>
                </View>

                {/* รายชื่อ */}

                {
                    !threeChecker ? (
                        <View style={styles.row}>
                            <Text style={{width: "30%", textAlign: "center"}}>
                                ข้าพเจ้า
                            </Text>
                            <Text style={{width: "40%"}}>
                                {`${ personnel.Prename.shortName }${personnel.fname} ${personnel.lname}`}
                            </Text>
                            <Text style={{width: "30%"}}>
                                ผู้ตรวจรับพัสดุหรือจ้าง
                            </Text>
                        </View>
                    ) : (
                        <View>
                            <View style={styles.row}>
                                <Text style={{width: "30%", textAlign: "center"}}>
                                    ข้าพเจ้า
                                </Text>
                                <Text style={{width: "40%"}}>
                                    {`${ personnel.Prename.shortName }${personnel.fname} ${personnel.lname}`}
                                </Text>
                                <Text style={{width: "30%"}}>
                                    ประธานผู้ตรวจรับพัสดุหรือจ้าง
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={{width: "30%", textAlign: "center"}}>
                                    ข้าพเจ้า
                                </Text>
                                <Text style={{width: "40%"}}>
                                    {`${ personnel2.Prename.shortName }${personnel2.fname} ${personnel2.lname}`}
                                </Text>
                                <Text style={{width: "30%"}}>
                                    ผู้ตรวจรับพัสดุหรือจ้าง
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={{width: "30%", textAlign: "center"}}>
                                    ข้าพเจ้า
                                </Text>
                                <Text style={{width: "40%"}}>
                                    {`${ personnel3.Prename.shortName }${personnel3.fname} ${personnel3.lname}`}
                                </Text>
                                <Text style={{width: "30%"}}>
                                    ผู้ตรวจรับพัสดุหรือจ้าง
                                </Text>
                            </View>
                        </View>
                    )
                }
                



                {/* body */}
                <View style={[styles.row, {marginTop: 15}]}>
                    <Text style={styles.textBody}>
                    ขอให้คำรับรองว่าไม่มีความเกี่ยวข้องหรือมีส่วนได้ส่วนเสียไม่ว่าโดยตรงหรือโดยอ้อมหรือผลประโยชน์ใด ๆ ที่ 
                    ก่อให้เกิดความขัดแย้งทางผลประโยชน์กับผู้ขาย ผู้รับจ้าง ผู้เสนองาน หรือผู้ชนะประมูล หรือผู้มีส่วนเกี่ยวข้องที่เข้ามา 
                    มีนิติสัมพันธ์ และวางตัวเป็นกลางในการดำเนินการเกี่ยวกับการพัสดุ  ปฏิบัติหน้าที่ด้วยจิตสำนึก ด้วยความโปร่งใส 
                    สามารถให้มีผู้เกี่ยวข้องตรวจสอบได้ทุกเวลา มุ่งประโยชน์ส่วนรวมเป็นสำคัญตามที่ระบุไว้ในประกาศสำนักงาน 
                    ปลัดกระทรวงสาธารณสุขว่าด้วยแนวทางปฏิบัติงาน   เพื่อตรวจสอบบุคลากรในหน่วยงานด้านการจัดซื้อจัดจ้าง 
                    พ.ศ. 2560
                    </Text>
                </View>
                {/* body */}
                <View style={[styles.row, {marginTop: 5}]}>
                    <Text style={styles.textBody}>
                    หากปรากฏว่าเกิดความขัดแย้งทางผลประโยชน์ระหว่างข้าพเจ้ากับผู้ขาย ผู้รับจ้าง ผู้เสนองาน หรือผู้ชนะ 
                    ประมูล หรือผู้มีส่วนเกี่ยวข้องที่เข้ามามีนิติสัมพันธ์ ข้าพเจ้าจะรายงานให้ทราบโดยทันที
                    </Text>
                </View>

                {/* รายชื่อ ลงรายมือชื่อ */}
                <View style={[styles.row, {marginTop: 20}]}>
                    <Text style={{width: "22%", }} />
                    <Text>
                        ลงนาม......................................................หัวหน้าเจ้าหน้าที่
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={{width: "30%", }} />
                    <Text>
                        {`(${inventoryChiefName})`}
                    </Text>
                </View>
                {/* รายชื่อ ลงรายมือชื่อ */}
                <View style={[styles.row, {marginTop: 20}]}>
                    <Text style={{width: "22%", }} />
                    <Text>
                        ลงนาม......................................................เจ้าหน้าที่
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={{width: "30%", }} />
                    <Text>
                        {`(${inventoryStaffName})`}
                    </Text>
                </View>
                {/* รายชื่อ ลงรายมือชื่อ */}

                {
                    !threeChecker ? (
                        <View>
                            <View style={[styles.row, {marginTop: 20}]}>
                                <Text style={{width: "22%", }} />
                                <Text>
                                    ลงนาม......................................................ผู้ตรวจรับพัสดุ
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={{width: "30%", }} />
                                <Text>
                                    {`(${personnel.Prename.shortName}${personnel.fname} ${personnel.lname})`}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <View style={[styles.row, {marginTop: 20}]}>
                                <Text style={{width: "22%", }} />
                                <Text>
                                    ลงนาม......................................................ประธานผู้ตรวจรับพัสดุ
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={{width: "30%", }} />
                                <Text>
                                    {`(${personnel.Prename.shortName}${personnel.fname} ${personnel.lname})`}
                                </Text>
                            </View>
                            <View style={[styles.row, {marginTop: 20}]}>
                                <Text style={{width: "22%", }} />
                                <Text>
                                    ลงนาม......................................................ผู้ตรวจรับพัสดุ
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={{width: "30%", }} />
                                <Text>
                                    {`(${personnel2.Prename.shortName}${personnel2.fname} ${personnel2.lname})`}
                                </Text>
                            </View>
                            <View style={[styles.row, {marginTop: 20}]}>
                                <Text style={{width: "22%", }} />
                                <Text>
                                    ลงนาม......................................................ผู้ตรวจรับพัสดุ
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={{width: "30%", }} />
                                <Text>
                                    {`(${personnel3.Prename.shortName}${personnel3.fname} ${personnel3.lname})`}
                                </Text>
                            </View>
                        </View>
                    )
                }

            </View>
        </Page>
    )
}

export default page7
