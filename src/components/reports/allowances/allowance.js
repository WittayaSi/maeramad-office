import React from 'react'

import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer"

import fontIt9 from '../../../assets/fonts/thsarabunit9.ttf'
import fontIt9Bold from '../../../assets/fonts/thsarabunit9_bold.ttf'
import { thaiDate, thaiDateWithSeperator } from '../../../utillities/anotherFunctions'
import _ from 'lodash'

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

const allowance = ({
    seq,
    date,
    applicantData,
    driverData,
    startDate,
    endDate,
    noDays,
    budget,
    vehicle,
    overnight,
    name,
    place,
    districtData,
    provinceData,
    inOrOutPro,
    fullName,
    othersDetials,
    allowancePersons,
    accomRent,
    allowance, 
    busFee,
    others,
    allowanceCarUse
}) => {

    return (
        <Document title={`ใบขออนุญาตไปราชการเลขที่ ${seq}`} fileName={`ใบขออนุญาตไปราชการเลขที่ ${seq}`}>

            <Page style={styles.page} size="A4">

                <View style={styles.row}>
                    <Text style={{position: 'absolute', right: '2cm'}}>{`ลำดับที่   ${seq}`}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={{...styles.title, paddingTop: 15}}>ใบขออนุญาตเดินทางไปราชการ</Text>
                </View>

                <View style={styles.row}>
                    <Text style={{ textIndent: 120, paddingTop: 7 }}>หน่วยงาน</Text>
                </View>

                <View style={{...styles.row, marginTop: -12}}>
                    <Text style={{ textIndent: 170 }}>..............................................................................................</Text>
                </View>

                <View style={{...styles.row, marginTop: -19}}>
                    <Text style={{ textIndent: 190 }}> { fullName }</Text>
                </View>

                <View style={{...styles.row, paddingTop: 3}}>
                    <Text style={{textAlign: 'center'}}>
                        คำชี้แจงการเดินทางไปราชการ
                    </Text>
                </View>

                <View style={styles.row}>
                    <View style={{width: '50%', textAlign: 'center'}}>
                        <Text style={{textAlign: 'center'}}>
                            (   { inOrOutPro==='in' ? '√' : ' ' }   )   ไปราชการในจังหวัด
                        </Text>
                    </View>

                    <View style={{width: '50%', textAlign: 'center'}}>
                        <Text style={{textAlign: 'center'}}>
                            (   { inOrOutPro==='out' ? '√' : ' ' }   )   ไปราชการนอกจังหวัด
                        </Text>
                    </View>
                    {/* <Text style={{textAlign: 'center'}}>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   ไปราชการในจังหวัด                                                     (   { inOrOutPro==='out' ? '√' : ' ' }   )   ไปราชการนอกจังหวัด
                    </Text> */}
                </View>

                <View style={[styles.row, {paddingTop: 3}]}>
                    <Text style={{width: '22%'}}>
                        (   { budget==='1' ? '√' : ' ' }   )   เบิกงบผู้จัด
                    </Text>
                    <Text style={{width: '30%'}}>
                        (   { budget==='2' ? '√' : ' ' }   )   เบิกงบกลาง สสจ.ตาก
                    </Text>
                    <Text style={{width: '22%'}}>
                        (   { budget==='3' ? '√' : ' ' }   )   เบิกเงินบำรุง
                    </Text>
                    <Text style={{width: '26%'}}>
                        (   { budget==='4' ? '√' : ' ' }   )   เบิกงบโครกงการของฝ่าย
                    </Text>
                </View>

                <View style={[styles.row, {paddingTop: 3}]}>
                    <Text style={{width: '20%'}}>
                        (   { budget==='99' ? '√' : ' ' }   )   ไม่ขอเบิก
                    </Text>

                    <View style={{width: '40%'}}>
                        <View style={styles.row}>
                            <Text>ไปราชการตั้งแต่วันที่ </Text>
                        </View>

                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text style={{ textIndent: 85 }}>..............................................................</Text>
                        </View>

                        <View style={{...styles.row, marginTop: -19}}>
                            <Text style={{ textIndent: 95 }}>{`${thaiDate(startDate)}`}</Text>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 30 }}>
                        <View style={styles.row}>
                            <Text>ถึงวันที่  </Text>
                        </View>

                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text style={{ textIndent: 35 }}>....................................................................</Text>
                        </View>

                        <View style={{...styles.row, marginTop: -19}}>
                            <Text style={{ textIndent: 45 }}>{`${thaiDate(endDate)}`}</Text>
                        </View>
                    </View>
                </View>


                <View style={[styles.row, {paddingTop: 3}]}>
                    <View>
                        <View style={styles.row}>
                            <Text>รวม            วัน         </Text>
                        </View>

                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text style={{ textIndent: 20 }}>............</Text>
                        </View>

                        <View style={{...styles.row, marginTop: -19}}>
                            <Text style={{ textIndent: 30 }}>{`${noDays}`}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Text>โดยพาหนะ    </Text>
                        <Text style={{width: '33%'}}>
                            (   { vehicle==="1" ? '√' : ' ' }   )   ยานพาหนะประจำทาง
                        </Text>
                        <Text style={{width: '25%'}}>
                            (   { vehicle==="2" ? '√' : ' ' }   )   พาหนะรับจ้าง
                        </Text>
                        <Text style={{width: '20%'}}>
                            (   { vehicle==="3" ? '√' : ' ' }   )   รถยนต์ส่วนตัว
                        </Text>
                    </View>
                </View>


                <View style={[styles.row, {paddingTop: 3}]}>
                    <Text>
                        (   { vehicle==="4" ? '√' : ' ' }   )   รถราชการทะเบียนรถ 
                    </Text>

                    <View>
                        <View style={styles.row}>
                            <Text> </Text>
                        </View>

                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text style={{ textIndent: 10 }}>................................................</Text>
                        </View>

                        <View style={{...styles.row, marginTop: -19}}>
                            <Text style={{ textIndent: 15 }}>{ allowanceCarUse.length > 0 ? `${  allowanceCarUse[0].car.carCode}`: '' }</Text>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 15 }}>
                        <View style={styles.row}>
                            <Text>พนักงานขับรถ  </Text>
                        </View>

                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text style={{ textIndent: 55 }}>..................................................................................................</Text>
                        </View>

                        <View style={{...styles.row, marginTop: -19}}>
                            <Text style={{ textIndent: 65 }}>
                                { driverData === null ? ` ` : `${driverData.fullName}` }
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.row, {paddingTop: 3}]}>
                    <Text style={{width: '28%'}}>
                        (       )   ขอใบสั่งจ่ายน้ำมัน
                    </Text>
                    <Text style={{width: '30%'}}>
                        (       )   ไม่ขอใบสั่งจ่ายน้ำมัน
                    </Text>
                    <Text style={{width: '22%'}}>
                        (   { overnight==='Y' ? '√' : ' ' }   )   พักค้างคืน
                    </Text>
                    <Text style={{width: '18%'}}>
                        (   { overnight==='N' ? '√' : ' ' }   )   ไม่พักค้างคืน
                    </Text>
                </View>

                <View style={[styles.row, {paddingTop: 3}]}>
                    <Text style={{width: '8%'}}>ขอเบิก  </Text>

                    <Text style={{width: '17%'}}>
                        (   { allowance ? '√' : ' ' }   )   เบี้ยเลี้ยง
                    </Text>
                    <Text style={{width: '19%'}}>
                        (   { busFee ? '√' : ' ' }   )   ค่าพาหนะ
                    </Text>
                    <Text style={{width: '20%'}}>
                        (   { accomRent ? '√' : ' ' }   )   ค่าเช่าที่พัก
                    </Text>

                    <View>
                        <Text>
                            (   { others ? '√' : ' ' }   )   อื่น ๆ
                        </Text>
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text style={{ textIndent: 60 }}>.............................................................</Text>
                        </View>

                        <View style={{...styles.row, marginTop: -19}}>
                            <Text style={{ textIndent: 65 }}>{`${othersDetials}`}</Text>
                        </View>
                    </View>
                </View>


                <View style={{ paddingTop: 7 }}>
                    <View style={styles.row}>
                        <Text>เรื่อง/งานที่ไปราชการ  </Text>
                    </View>

                    <View style={ {marginTop: -12} }>
                        <Text style={{ textIndent: 80 }}>......................................................................................................................................................................................................... {`\n`}
                        </Text>
                        <Text>
                        ...............................................................................................................................................................................................................................................
                        {'\n'}
                        </Text>
                        <Text>
                        ...............................................................................................................................................................................................................................................
                        {'\n'}
                        </Text>
                        <Text>
                        ...............................................................................................................................................................................................................................................
                        {'\n'}
                        </Text>
                    </View>
                    
                </View>


                <View style={{ paddingTop: 5}}>
                    <View >
                        <Text>สถานที่  </Text>
                    </View>

                    <View style={{marginTop: -12 }}>
                        <Text style={{ textIndent: 40 }}>............................................................................................................................................................................................................................
                        </Text>
                    </View>

                    <View style={{marginTop: -19}}>
                        <Text style={{ textIndent: 45 }}> 
                            { `${place !== "" ? place : " "}` }
                        </Text>
                    </View>
                </View>

                <View style={{...styles.row, paddingBottom: 3, paddingTop: 3}}>
                    <Text>
                        อำเภอ    
                    </Text>

                    <View>
                        <View style={styles.row}>
                            <Text> </Text>
                        </View>

                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text style={{ textIndent: 10 }}>................................................</Text>
                        </View>

                        <View style={{...styles.row, marginTop: -19}}>
                            <Text style={{ textIndent: 15 }}>{`${districtData.nameTh}`}</Text>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 15 }}>
                        <View style={styles.row}>
                            <Text>จังหวัด  </Text>
                        </View>

                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text style={{ textIndent: 30 }}>.................................................................</Text>
                        </View>

                        <View style={{...styles.row, marginTop: -19}}>
                            <Text style={{ textIndent: 45 }}>{`${provinceData.nameTh}`}</Text>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 35 }}>
                        <View style={styles.row}>
                            <Text>จำนวนวผู้เดินทางไปราชการ           คน  ดังนี้  </Text>
                        </View>

                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text style={{ textIndent: 105 }}>.........</Text>
                        </View>

                        <View style={{...styles.row, marginTop: -19}}>
                            <Text style={{ textIndent: 112 }}>{ allowancePersons.length > 0 && allowancePersons.length  }</Text>
                        </View>
                    </View>
                </View>


                { allowancePersons.map( (person, index) => (
                    <View style={{...styles.row, paddingTop: 2}} key={index}>
                        <Text>
                            {++index}    
                        </Text>

                        <View>
                            <View style={styles.row}>
                                <Text> </Text>
                            </View>

                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text style={{ textIndent: 15 }}>....................................................................................</Text>
                            </View>

                            <View style={{...styles.row, marginTop: -19}}>
                                <Text style={{ textIndent: 17 }}>{`${person.person.Prename.shortName}${person.person.fname} ${person.person.lname}`}</Text>
                            </View>
                        </View>

                        <View style={{ paddingLeft: 15 }}>
                            <View style={styles.row}>
                                <Text>ตำแหน่ง  </Text>
                            </View>

                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text style={{ textIndent: 32 }}>..................................................................................................................</Text>
                            </View>

                            <View style={{...styles.row, marginTop: -19}}>
                                <Text style={{ textIndent: 45 }}>{`${person.person.position}`}</Text>
                            </View>
                        </View>
                    </View>
                )) }

                { _.times( (10 - (allowancePersons.length)), (index) => (
                    <View style={{...styles.row, paddingTop: 2}} key={index+ allowancePersons.length}>
                        <Text>
                            { ++index + allowancePersons.length }    
                        </Text>

                        <View>
                            <View style={styles.row}>
                                <Text> </Text>
                            </View>

                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text style={ ((index+1) + allowancePersons.length ) > 10 ? { textIndent: 9 } : { textIndent: 15 }}>....................................................................................</Text>
                            </View>

                            <View style={{...styles.row, marginTop: -19}}>
                                <Text style={((index+1) + allowancePersons.length ) > 10 ? { textIndent: 11 } : { textIndent: 17 }}>{``}</Text>
                            </View>
                        </View>

                        <View style={((index+1) + allowancePersons.length ) > 10 ? { paddingLeft: 9 } : { paddingLeft: 15 }}>
                            <View style={styles.row}>
                                <Text>ตำแหน่ง  </Text>
                            </View>

                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text style={{ textIndent: 32 }}>..................................................................................................................</Text>
                            </View>

                            <View style={{...styles.row, marginTop: -19}}>
                                <Text style={{ textIndent: 45 }}>{``}</Text>
                            </View>
                        </View>
                    </View>
                ) ) }

                {/* <View style={{ paddingLeft: 35 }}>
                    <View style={styles.row}>
                        <Text>จำนวนวผู้เดินทางไปราชการ           คน  ดังนี้  </Text>
                    </View>

                    <View style={{ ...styles.row, marginTop: -12 }}>
                        <Text style={{ textIndent: 105 }}>.........</Text>
                    </View>

                    <View style={{...styles.row, marginTop: -19}}>
                        <Text style={{ textIndent: 112 }}>{ allowancePersons.length }</Text>
                    </View>
                </View> */}

                {/* เจ้าหน้าที่ */}
                <View style={[styles.row, {paddingTop: 20}]}>
                    <View style={{width: "50%", textAlign: "center"}}>
                        <Text>
                            ลงชื่อ                                                  ผู้ขออนุญาต  {'\n'}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -30 }}>............................................................</Text>

                        <Text style={{marginLeft: -30 }}>
                            (                                                )
                        </Text>
                        <Text style={{marginLeft: -30, marginTop: -15}}>
                            {`${applicantData.fullName}`}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -30 }}>............................................................</Text>

                        <Text style={{marginLeft: -30 }}>
                            {`${ thaiDateWithSeperator(date)}`}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -30 }}>..........................................................................</Text>
                    </View>

                    <View style={{ width: "50%", textAlign: "center", ...styles.row }}>
                        <Text style={{paddingTop: 18}}>
                            (      )  อนุญาต            (      )  ไม่อนุญาต
                        </Text>
                    </View>
                </View>

                {/* เจ้าหน้าที่ */}
                <View style={[styles.row, {paddingTop: 20}]}>
                    <View style={{width: "50%", textAlign: "center"}}>
                        <Text>
                            ลงชื่อ                                                  ผู้ตรวจสอบ  {'\n'}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -30 }}>............................................................</Text>

                        <Text style={{marginLeft: -30 }}>
                            (                                                )
                        </Text>
                        <Text style={{marginLeft: -30, marginTop: -15}}>
                            {`    `}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -30 }}>............................................................</Text>

                        <Text style={{marginLeft: -30 }}>
                            {`         /                          /         `}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -30 }}>..........................................................................</Text>
                    </View>

                    <View style={{width: "50%", textAlign: "center"}}>
                        <Text>
                            ลงชื่อ                                                  ผู้อนุญาต  {'\n'}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -30 }}>............................................................</Text>

                        <Text style={{marginLeft: -30 }}>
                            (                                                )
                        </Text>
                        <Text style={{marginLeft: -30, marginTop: -15}}>
                            {`    `}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -30 }}>............................................................</Text>

                        <Text style={{marginLeft: -30 }}>
                            {`         /                          /         `}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -30 }}>..........................................................................</Text>
                    </View>
                </View>

                {/* เจ้าหน้าที่ */}
                <View style={[styles.row, {paddingTop: 20}]}>
                    <View style={{width: "60%", textAlign: "center"}}>
                        <Text>
                            ลงชื่อ                                                  สาธารณสุขอำเภอแม่ระมาด  {'\n'}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -90 }}>............................................................</Text>

                        <Text style={{marginLeft: -90 }}>
                            (                                                )
                        </Text>
                        <Text style={{marginLeft: -90, marginTop: -15}}>
                            {`    `}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -90 }}>............................................................</Text>

                        <Text style={{marginLeft: -90 }}>
                            {`         /                          /         `}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -90 }}>..........................................................................</Text>
                    </View>
                </View>

                
                <View style={[{marginTop: -505}, styles.row]}>
                    <Text style={{ textIndent: 85 }}> 
                        { `${name}` }
                    </Text>
                </View>
                

            </Page>
        </Document>
    )
}

export default allowance
