import React from 'react'

import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer"

import fontIt9 from '../../../assets/fonts/thsarabunit9.ttf'
import fontIt9Bold from '../../../assets/fonts/thsarabunit9_bold.ttf'
import THBText from 'thai-baht-text'
import { thaiDate } from '../../../anotherFunctions'
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
        fontSize: 15
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
    rowName1: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5
    },
    colWidth: [
        { width: "5%"},
        { width: "38%"},
        { width: "12%"},
        { width: "30%"},
        { width: "15%"}
    ]
})

const allowance = ({
    seq,
    startDate,
    endDate,
    noDays,
    carCode,
    driver,
    name,
    place,
    district,
    province,
    inOrOutPro,
    fullName,
    allowancePersons
}) => {

    return (
        <Document title={`ใบเบิกเลขที่ ${seq}`}>

            <Page style={styles.page} size="A4">

                

                <View style={styles.row}>
                    <Text style={{position: 'absolute', right: '2cm'}}>{`ลำดับที่   ${seq}`}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={{textAlign: 'center', paddingTop: 15}}>ใบขออนุญาตเดินทางไปราชการ</Text>
                </View>
                
                <View>
                    <View style={styles.row}>
                        <Text style={{ textIndent: 120, paddingTop: 7 }}>หน่วยงาน</Text>
                    </View>

                    <View style={{...styles.row, marginTop: -12}}>
                        <Text style={{ textIndent: 170 }}>..............................................................................................</Text>
                    </View>

                    <View style={{...styles.row, marginTop: -19}}>
                        <Text style={{ textIndent: 190 }}> { fullName }</Text>
                    </View>
                </View>
                

                <View style={{...styles.row, paddingTop: 3}}>
                    <Text style={{textAlign: 'center'}}>
                        คำชี้แจงการเดินทางไปราชการ
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={{textAlign: 'center'}}>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   ไปราชการในจังหวัด                                                     (   { inOrOutPro==='out' ? '√' : ' ' }   )   ไปราชการนอกจังหวัด
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={{width: '22%'}}>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   เบิกงบผู้จัด
                    </Text>
                    <Text style={{width: '30%'}}>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   เบิกงบกลาง สสจ.ตาก
                    </Text>
                    <Text style={{width: '22%'}}>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   เบิกเงินบำรุง
                    </Text>
                    <Text style={{width: '26%'}}>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   เบิกงบโครกงการของฝ่าย
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={{width: '20%'}}>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   ไม่ขอเบิก
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


                <View style={{...styles.row}}>
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
                            (   { inOrOutPro==='in' ? '√' : ' ' }   )   ยานพาหนะประจำทาง
                        </Text>
                        <Text style={{width: '25%'}}>
                            (   { inOrOutPro==='in' ? '√' : ' ' }   )   พาหนะรับจ้าง
                        </Text>
                        <Text style={{width: '20%'}}>
                            (   { inOrOutPro==='in' ? '√' : ' ' }   )   รถยนต์ส่วนตัว
                        </Text>
                    </View>
                </View>


                <View style={{...styles.row}}>
                    <Text>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   รถราชการทะเบียนรถ 
                    </Text>

                    <View>
                        <View style={styles.row}>
                            <Text> </Text>
                        </View>

                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text style={{ textIndent: 10 }}>................................................</Text>
                        </View>

                        <View style={{...styles.row, marginTop: -19}}>
                            <Text style={{ textIndent: 15 }}>{`${carCode}`}</Text>
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
                            <Text style={{ textIndent: 65 }}>{`${driver}`}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={{width: '28%'}}>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   ขอใบสั่งจ่ายน้ำมัน
                    </Text>
                    <Text style={{width: '30%'}}>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   ไม่ขอใบสั่งจ่ายน้ำมัน
                    </Text>
                    <Text style={{width: '22%'}}>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   พักค้างคืน
                    </Text>
                    <Text style={{width: '18%'}}>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   ไม่พักค้างคืน
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={{width: '8%'}}>ขอเบิก  </Text>

                    <Text style={{width: '17%'}}>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   เบี้ยเลี้ยง
                    </Text>
                    <Text style={{width: '19%'}}>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   ค่าพาหนะ
                    </Text>
                    <Text style={{width: '20%'}}>
                        (   { inOrOutPro==='in' ? '√' : ' ' }   )   ค่าเช่าที่พัก
                    </Text>

                    <View>
                        <Text>
                            (   { inOrOutPro==='in' ? '√' : ' ' }   )   อื่น ๆ
                        </Text>
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text style={{ textIndent: 60 }}>.............................................................</Text>
                        </View>

                        <View style={{...styles.row, marginTop: -19}}>
                            <Text style={{ textIndent: 65 }}>{`-`}</Text>
                        </View>
                    </View>
                </View>


                <View style={{ paddingTop: 7 }}>
                    <View style={styles.row}>
                        <Text>เรื่อง/งานที่ไปราชการ  </Text>
                    </View>

                    <View style={{marginTop: -12}}>
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

                    <View style={{marginTop: -65}}>
                        <Text style={{ textIndent: 85 }}> 
                            { `${name}` }
                        </Text>
                    </View>
                </View>

                <View style={{ paddingTop: 18 }}>
                    <View style={styles.row}>
                        <Text>สถานที่  </Text>
                    </View>

                    <View style={{marginTop: -12}}>
                        <Text style={{ textIndent: 40 }}>............................................................................................................................................................................................................................
                        </Text>
                    </View>

                    <View style={{marginTop: -19}}>
                        <Text style={{ textIndent: 45 }}> 
                            { `${place}` }
                        </Text>
                    </View>
                </View>

                <View style={{...styles.row, paddingBottom: 5}}>
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
                            <Text style={{ textIndent: 15 }}>{`${district}`}</Text>
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
                            <Text style={{ textIndent: 45 }}>{`${province}`}</Text>
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
                            <Text style={{ textIndent: 112 }}>{ allowancePersons.length }</Text>
                        </View>
                    </View>
                </View>


                { allowancePersons.map( (person, index) => (
                    <View style={{...styles.row}} key={index}>
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
                    <View style={{...styles.row}} key={index+ allowancePersons.length}>
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
                

            </Page>
        </Document>
    )
}

export default allowance
