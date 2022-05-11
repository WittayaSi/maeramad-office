import React from 'react'

import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer"

import fontIt9 from '../../../assets/fonts/thsarabunit9.ttf'
import fontIt9Bold from '../../../assets/fonts/thsarabunit9_bold.ttf'
import { thaiDate, thaiDateWithSeperator, thaiDateObject } from '../../../utillities/anotherFunctions'
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

const allowanceCar = ({
    startDate,
    endDate,
    inOrOutPro,
    inOrOutDist,
    urgentPlan,
    driverData,
    applicantData,
    date,
    name,
    place,
    districtData,
    provinceData,
    overnight,
    allowancePersons,
    allowanceCarUse
}) => {

    const [{ to, selfDrive, selfNameData, fuelOrderBook, fuelOrderNo, amount, carNo, car }] = allowanceCarUse
    // console.log(allowanceCarUse);
    const { days, months, years } = thaiDateObject(date)
    const newStartDate = new Date(startDate)
    // console.log(newStartDate);
    const startTime = `${newStartDate.getHours() < 10 ? '0'+newStartDate.getHours() : newStartDate.getHours()}.${(newStartDate.getMinutes())< 10 ? '0'+newStartDate.getMinutes() : newStartDate.getMinutes()}`

    return (
        <Document title="ใบขออนุญาตใช้รถยนต์ราชการ/รถส่วนกลางไปราชการ">

            <Page style={styles.page} size="A4">

                {/* <View style={styles.row}>
                    <Text style={{position: 'absolute', right: '2cm'}}>{`ลำดับที่   ${seq}`}</Text>
                </View> */}

                <View style={styles.row}>
                    <Text style={styles.title}>ใบขออนุญาตใช้รถยนต์ราชการ/รถส่วนกลางไปราชการ</Text>
                </View>

                <View style={[styles.row, {paddingTop: 5}]}>
                    <Text style={{width: '21%'}}>
                        (   { inOrOutDist==='in' ? '√' : ' ' }   )   ในอำเภอ
                    </Text>
                    <Text style={{width: '21%'}}>
                        (   { inOrOutDist==='out' ? '√' : ' ' }   )   นอกอำเภอ
                    </Text>
                    <Text style={{width: '21%'}}>
                        (   { inOrOutPro==="in" ? '√' : ' ' }   )   ในจังหวัด
                    </Text>
                    <Text style={{width: '22%'}}>
                        (   { inOrOutPro==="out" ? '√' : ' ' }   )   นอกจังหวัด
                    </Text>
                    <Text style={{width: '16%'}}>
                        (   { urgentPlan ? '√' : ' ' }   )   แผนเร่งด่วน
                    </Text>
                </View>


                <View style={[styles.row, {paddingTop: 20, paddingLeft: 280}]}>
                    <View>
                        <View style={styles.row}>
                            <Text>วันที่ </Text>
                        </View>

                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text style={{ textIndent: 19 }}>...........</Text>
                        </View>

                        <View style={{...styles.row, marginTop: -19}}>
                            <Text style={{ textIndent: 25 }}>{`${days}`}</Text>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 23 }}>
                        <View style={styles.row}>
                            <Text>เดือน </Text>
                        </View>

                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text style={{ textIndent: 23 }}>........................................</Text>
                        </View>

                        <View style={{...styles.row, marginTop: -19}}>
                            <Text style={{ textIndent: 45 }}>
                                { `${months}` }
                            </Text>
                        </View>
                    </View>
                    <View style={{ paddingLeft: 23 }}>
                        <View style={styles.row}>
                            <Text>พ.ศ.</Text>
                        </View>

                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text style={{ textIndent: 18 }}>..................</Text>
                        </View>

                        <View style={{...styles.row, marginTop: -19}}>
                            <Text style={{ textIndent: 25 }}>
                                { `${years}` }
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{...styles.row, paddingTop: 5}}>
                    <View>
                        <Text>เรียน    </Text>
                    </View>

                    <View>
                        <Text> { `${to}` }</Text>
                    </View>
                </View>

                <View style={[styles.row, {paddingTop: 2, paddingLeft: 25}]}>
                    <View>
                        <View style={styles.row}>
                            <Text>ข้าพเจ้า </Text>
                        </View>
                        <View style={{textAlign: 'center', marginLeft: -200}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{`${applicantData.fullName}`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11 }}>
                                <Text>.........................................................................................</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 200 }}>
                        <View style={styles.row}>
                            <Text>ตำแหน่ง </Text>
                        </View>
                        
                        <View style={{textAlign: 'center'}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{`${applicantData.position}`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11, marginLeft: 21}}>
                                <Text>...................................................................................................</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>

                <View style={{ paddingTop: 2 }}>
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


                <View style={[styles.row, {paddingTop: 2}]}>
                    <View>
                        <View style={styles.row}>
                            <Text>อำเภอ </Text>
                        </View>
                        <View style={{textAlign: 'center', marginLeft: -310}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{`${districtData.nameTh}`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11 }}>
                                <Text>......................................................</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 125 }}>
                        <View style={styles.row}>
                            <Text>จังหวัด </Text>
                        </View>
                        
                        <View style={{textAlign: 'center', marginLeft: -190}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{`${provinceData.nameTh}`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11, marginLeft: 15}}>
                                <Text>...........................................................</Text>
                            </View>
                        </View>
                        
                    </View>

                    <View style={{ paddingLeft: 130 }}>
                        <View style={styles.row}>
                            <Text>วันที่ </Text>
                        </View>
                        
                        <View style={{textAlign: 'center', marginLeft: -150}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{`${thaiDate(startDate)}`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11, marginLeft: 15}}>
                                <Text>..............................................................................</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>


                <View style={[styles.row, {paddingTop: 2}]}>
                    <View>
                        <View style={styles.row}>
                            <Text>รถออกจาก สำนักงาน เวลา </Text>
                        </View>
                        <View style={{textAlign: 'center', marginLeft: -235}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{`${(startTime)}`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11 }}>
                                <Text>..................</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 50 }}>
                        <View style={styles.row}>
                            <Text> น. ถึงวันที่ </Text>
                        </View>
                        
                        <View style={{textAlign: 'center', marginLeft: -240}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{`${thaiDate(endDate)}`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11, marginLeft: 15}}>
                                <Text>...........................................................</Text>
                            </View>
                        </View>
                        
                    </View>

                    <View style={{ ...styles.row, paddingLeft: 135 }}>
                        <Text>
                            (   { overnight==='Y' ? '√' : ' ' }   )   พักค้างคืน
                        </Text>
                        <Text style={{paddingLeft: 20}}>
                            (   { overnight==='N' ? '√' : ' ' }   )   ไม่พักค้างคืน
                        </Text>
                    </View>

                </View>

                <View style={[styles.row, {paddingTop: 2}]}>
                    <View>
                        <View style={styles.row}>
                            <Text>เบิกค่าน้ำมันเชื้อเพลิงจากงบ </Text>
                        </View>
                        <View style={{textAlign: 'center', marginLeft: -120}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{`-`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11 }}>
                                <Text>.......................................................................</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 160 }}>
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

                
                {/* คนที่ไปราชการ */}
                
                    <View style={{ ...styles.row, paddingTop: 2}} >
                        <View style={{width: '50%'}}>
                            <View style={styles.row}>
                                <Text>1   </Text>
                            </View>

                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text style={{ textIndent: 15 }}>.....................................................................................................</Text>
                            </View>

                            <View style={{...styles.row, marginTop: -19}}>
                                <Text style={{ textIndent: 17 }}>
                                { allowancePersons.length > 0 ? `${allowancePersons[0].person.Prename.shortName}${allowancePersons[0].person.fname} ${allowancePersons[0].person.lname}` : `   `}
                                </Text>
                            </View>
                            
                        </View>
                        <View style={{width: '50%'}}>
                            <View style={styles.row}>
                                <Text>2   </Text>
                            </View>

                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text style={{ textIndent: 15 }}>.........................................................................................................</Text>
                            </View>

                            <View style={{...styles.row, marginTop: -19}}>
                                <Text style={{ textIndent: 17 }}>
                                {allowancePersons.length > 1 ? `${allowancePersons[1].person.Prename.shortName}${allowancePersons[1].person.fname} ${allowancePersons[1].person.lname}` : `   `}
                                </Text>
                            </View>
                            
                        </View>
                    </View>

                    <View style={{ ...styles.row, paddingTop: 2}} >
                        <View style={{width: '50%'}}>
                            <View style={styles.row}>
                                <Text>3   </Text>
                            </View>

                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text style={{ textIndent: 15 }}>......................................................................................................</Text>
                            </View>

                            <View style={{...styles.row, marginTop: -19}}>
                                <Text style={{ textIndent: 17 }}>
                                { allowancePersons.length > 2 ? `${allowancePersons[2].person.Prename.shortName}${allowancePersons[2].person.fname} ${allowancePersons[2].person.lname}` : `   `}
                                </Text>
                            </View>
                            
                        </View>
                        <View style={{width: '50%'}}>
                            <View style={styles.row}>
                                <Text>4   </Text>
                            </View>

                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text style={{ textIndent: 15 }}>.........................................................................................................</Text>
                            </View>

                            <View style={{...styles.row, marginTop: -19}}>
                                <Text style={{ textIndent: 17 }}>
                                {allowancePersons.length > 3 ? `${allowancePersons[3].person.Prename.shortName}${allowancePersons[3].person.fname} ${allowancePersons[3].person.lname}` : `   `}
                                </Text>
                            </View>
                            
                        </View>
                    </View>

                    <View style={{ ...styles.row, paddingTop: 2}} >
                        <View style={{width: '50%'}}>
                            <View style={styles.row}>
                                <Text>5   </Text>
                            </View>

                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text style={{ textIndent: 15 }}>......................................................................................................</Text>
                            </View>

                            <View style={{...styles.row, marginTop: -19}}>
                                <Text style={{ textIndent: 17 }}>
                                { allowancePersons.length > 4 ? `${allowancePersons[4].person.Prename.shortName}${allowancePersons[4].person.fname} ${allowancePersons[4].person.lname}` : `   `}
                                </Text>
                            </View>
                            
                        </View>
                        <View style={{width: '50%'}}>
                            <View style={styles.row}>
                                <Text>6   </Text>
                            </View>

                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text style={{ textIndent: 15 }}>.........................................................................................................</Text>
                            </View>

                            <View style={{...styles.row, marginTop: -19}}>
                                <Text style={{ textIndent: 17 }}>
                                {allowancePersons.length > 5 ? `${allowancePersons[5].person.Prename.shortName}${allowancePersons[5].person.fname} ${allowancePersons[5].person.lname}` : `   `}
                                </Text>
                            </View>
                            
                        </View>
                    </View>

                    <View style={{ ...styles.row, paddingTop: 2}} >
                        <View style={{width: '50%'}}>
                            <View style={styles.row}>
                                <Text>7   </Text>
                            </View>

                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text style={{ textIndent: 15 }}>......................................................................................................</Text>
                            </View>

                            <View style={{...styles.row, marginTop: -19}}>
                                <Text style={{ textIndent: 17 }}>
                                { allowancePersons.length > 6 ? `${allowancePersons[6].person.Prename.shortName}${allowancePersons[6].person.fname} ${allowancePersons[6].person.lname}` : `   `}
                                </Text>
                            </View>
                            
                        </View>
                        <View style={{width: '50%'}}>
                            <View style={styles.row}>
                                <Text>8   </Text>
                            </View>

                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text style={{ textIndent: 15 }}>.........................................................................................................</Text>
                            </View>

                            <View style={{...styles.row, marginTop: -19}}>
                                <Text style={{ textIndent: 17 }}>
                                {allowancePersons.length > 7 ? `${allowancePersons[7].person.Prename.shortName}${allowancePersons[7].person.fname} ${allowancePersons[7].person.lname}` : `   `}
                                </Text>
                            </View>
                            
                        </View>
                    </View>

                    <View style={{ ...styles.row, paddingTop: 2}} >
                        <View style={{width: '50%'}}>
                            <View style={styles.row}>
                                <Text>9   </Text>
                            </View>

                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text style={{ textIndent: 15 }}>......................................................................................................</Text>
                            </View>

                            <View style={{...styles.row, marginTop: -19}}>
                                <Text style={{ textIndent: 17 }}>
                                { allowancePersons.length > 8 ? `${allowancePersons[8].person.Prename.shortName}${allowancePersons[8].person.fname} ${allowancePersons[8].person.lname}` : `   `}
                                </Text>
                            </View>
                            
                        </View>
                        <View style={{width: '50%'}}>
                            <View style={styles.row}>
                                <Text>10   </Text>
                            </View>

                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text style={{ textIndent: 15 }}>.........................................................................................................</Text>
                            </View>

                            <View style={{...styles.row, marginTop: -19}}>
                                <Text style={{ textIndent: 17 }}>
                                {allowancePersons.length > 9 ? `${allowancePersons[9].person.Prename.shortName}${allowancePersons[9].person.fname} ${allowancePersons[9].person.lname}` : `   `}
                                </Text>
                            </View>
                            
                        </View>
                    </View>
                
                {/* คนที่ไปราชการ */}


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

                    <View style={{width: "50%", textAlign: "center", marginTop: -19}}>
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
                            {`    `}
                        </Text>
                        <Text style={{marginLeft: -30, marginTop: -15}}>
                            {`    `}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -30 }}>ตำแหน่ง .........................................................................</Text>


                        <Text style={{marginLeft: -30 }}>
                            {`         /                          /         `}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -30 }}>..........................................................................</Text>
                    </View>
                </View>

                
                <View style={[styles.row, {paddingTop: 30}]}>
                    <View>
                        <View style={styles.row}>
                            <Text>หมายเหตุ      - ขออนุญาตใช้รถยนต์ราชการหมายเลขทะเบียน </Text>
                        </View>
                        <View style={{textAlign: 'center', paddingLeft: 90}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{`${car.carCode}`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11 }}>
                                <Text>..........................................................</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 130 }}>
                        <View style={styles.row}>
                            <Text>เบอร์                       โดยมี </Text>
                        </View>

                        <View style={{textAlign: 'center', marginLeft: -250}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{`${carNo ? amount : '-'}`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11 }}>
                                <Text>...........................</Text>
                            </View>
                        </View>

                    </View>

                </View>

                <View style={[styles.row]}>
                    <View>
                        <View style={styles.row}>
                            <Text>พนักงานขับรถ </Text>
                        </View>
                        <View style={{textAlign: 'center', marginLeft: -165}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{`${driverData.fullName}`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11 }}>
                                <Text>...............................................................................................</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 215 }}>
                        <View style={styles.row}>
                            <Text>ใบสั่งน้ำมันเชื้อเพลิง เลขที่ </Text>
                        </View>

                        <View style={{textAlign: 'center', marginLeft: 10}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{`${fuelOrderNo ? amount : '-'}`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11 }}>
                                <Text>.........................................</Text>
                            </View>
                        </View>

                    </View>

                </View>

                <View style={[styles.row, {paddingTop: 2}]}>
                    <View>
                        <View style={styles.row}>
                            <Text>เล่มที่ </Text>
                        </View>
                        <View style={{textAlign: 'center', marginLeft: -350}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{`${ fuelOrderBook ? amount : '-'}`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11 }}>
                                <Text>.........................................</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 90 }}>
                        <View style={styles.row}>
                            <Text>จำนวนเงิน                      บาท </Text>
                        </View>

                        <View style={{textAlign: 'center', marginLeft: -250}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{`${ amount > 0 ? amount : '-' }`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11 }}>
                                <Text>...........................</Text>
                            </View>
                        </View>

                    </View>
                </View>

                <View style={[styles.row, {paddingTop: 2}]}>
                    <View>
                        <View style={styles.row}>
                            <Text>(   { selfDrive ? '√' : ' ' }   )   กรณีประสงค์ขับรถเอง ชื่อผู้ขับรถ  </Text>
                        </View>
                        <View style={{textAlign: 'center', paddingLeft: 30}}>
                        
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>{ selfNameData!==null && `${ selfNameData.fullName}`}</Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -11 }}>
                                <Text>...........................................................................................</Text>
                            </View>
                        </View>
                    </View>
                </View>


                
                <View style={[{marginTop: -491}, styles.row]}>
                    <Text style={{ textIndent: 85 }}> 
                        { `${name}` }
                    </Text>
                </View>
                

            </Page>
            
        </Document>
            
    )
}

export default allowanceCar
