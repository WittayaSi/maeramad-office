import React from 'react'

import { Page, Text, View } from "@react-pdf/renderer"
import THBText from 'thai-baht-text'
import { thaiDate } from '../../../../utillities/anotherFunctions'

const page1 = ({
    styles,
    officeFullName,
    name,
    startDate,
    endDate,
    allowancePersons,
    startTime,
    endTime,
    allowanceCost: [{
        borrowNo,
        borrower,
        borrowDate,
        borrowAmount,
        to,
        writer,
        agency,
        writeDate,
        belongTo,
        belongToDate,
        noDays,
        noHours,
        departFrom,
        arriveTo,
        meOrGroup,
        travelType,
        travelDays,
        travelCost,
        restType,
        restDays,
        restCost,
        vehicleType,
        vehicleDays,
        vehicleCost,
        otherType,
        otherDays,
        otherCost,
        attachmentNo,
        writerData,
        borrowerData
    }]
}) => {

    const personWithoutWriter = allowancePersons.filter( person => (person.personId !== writer)).map( 
        p => (`${p.person.Prename.shortName}${p.person.fname} ${p.person.lname}`)
    )
    const totalCost = travelCost + restCost + vehicleCost + otherCost;

    return (
        <Page style={styles.page} size="A4">

            {/* <View style={styles.row}>
                <Text style={{position: 'absolute', right: '2cm'}}>{`ลำดับที่   ${seq}`}</Text>
            </View> */}

            <View style={[styles.row, {paddingTop: 1}]}>
                <View style={{width: '50%'}}>
                    <View style={styles.row}>
                        <Text>สัญญายืมเงินเลขที่ </Text>
                    </View>
                    <View style={{textAlign: 'center', marginLeft: 65}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{`${borrowNo}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text>..............................................................................</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: '50%'}}>
                    <View style={[styles.row, {textAlign: 'right'}]}>
                        <Text>วันที่                                                                ส่วนที่ 1 </Text>
                    </View>
                    <View style={{textAlign: 'center', marginLeft: -10}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{ borrowDate !== null && `${thaiDate(borrowDate)}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text>.................................................................................</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.row, {paddingTop: 1}]}>
                <View style={{width: '50%'}}>
                    <View style={styles.row}>
                        <Text>ชื่อผู้ยืม </Text>
                    </View>
                    <View style={{textAlign: 'center', marginLeft: 30}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>
                                { 
                                    borrowerData !== null ? 
                                    `${borrowerData.fullName}` 
                                    : 
                                    `${` `}`
                                }
                            </Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text>.................................................................................................</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: '50%'}}>
                    <View style={[styles.row, {textAlign: 'right'}]}>
                        <Text>จำนวนเงิน                                                    บาท แบบ 8708 </Text>
                    </View>
                    <View style={{textAlign: 'center', marginLeft: -22}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{ borrowAmount > 0 && `${borrowAmount}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text>.............................................................</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.row, {paddingTop: 20}]}>
                <Text style={styles.title}>ใบเบิกค่าใช้จ่ายในการเดินทางไปราชการ</Text>
            </View>

            <View style={[styles.row, {textAlign: "right"}]}>
                <View>
                    <View style={{...styles.row, paddingRight: 170}}>
                        <Text>ที่ทำการ </Text>
                    </View>
                    <View style={{ ...styles.row, marginTop: -12 }}>
                        <Text>..........................................................................</Text>
                    </View>
                    <View style={{...styles.row, marginTop: -19, textAlign: "left"}}>
                        <Text style={{ paddingLeft: 325 }}>{`${officeFullName}`}</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.row, {textAlign: "right"}]}>
                <View>
                    <View style={{...styles.row, paddingRight: 170}}>
                        <Text>วันที่ </Text>
                    </View>
                    <View style={{ ...styles.row, marginTop: -12 }}>
                        <Text style={{ textIndent: 19 }}>..........................................................................</Text>
                    </View>
                    <View style={{...styles.row, marginTop: -19, textAlign: "left"}}>
                        <Text style={{ paddingLeft: 325 }}>{`${thaiDate(writeDate)}`}</Text>
                    </View>
                </View>
            </View>

            <View style={{...styles.row, paddingTop: 5}}>
                <View>
                    <Text>เรื่อง    </Text>
                </View>

                <View>
                    <Text> { `ขออนุมัติเบิกค่าใช้จ่ายในการเดินทางไปราชการ` }</Text>
                </View>
            </View>

            <View style={{...styles.row, paddingTop: 3}}>
                <View>
                    <Text>เรียน    </Text>
                </View>

                <View>
                    <Text> { `${to}` }</Text>
                </View>
            </View>


            <View style={[styles.row, {paddingTop: 2, paddingLeft: 35}]}>
                <View>
                    <View style={styles.row}>
                        <Text>ตามคำสั่ง/บันทึก ที่ </Text>
                    </View>

                    <View style={{textAlign: 'center', marginLeft: -170}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{`${belongTo}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text>.............................................................</Text>
                        </View>
                    </View>
                </View>

                <View style={{ paddingLeft: 140 }}>
                    <View style={styles.row}>
                        <Text>ลงวันที่                                                          ได้อนุมัติให้</Text>
                    </View>
                    
                    <View style={{textAlign: 'center', marginLeft: -90}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{`${thaiDate(belongToDate)}`}</Text>
                        </View>
                        <View style={{ ...styles.row, marginTop: -12}}>
                            <Text>..........................................................................</Text>
                        </View>
                    </View>
                    
                </View>
            </View>


            <View style={[styles.row, {paddingTop: 2}]}>
                <View>
                    <View style={styles.row}>
                        <Text>ข้าพเจ้า </Text>
                    </View>

                    <View style={{textAlign: 'center', marginLeft: -220}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>
                                { 
                                    writerData !== null ? 
                                    `${writerData.fullName}` 
                                    : 
                                    ` `
                                }
                            </Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text>............................................................................................</Text>
                        </View>
                    </View>
                </View>

                <View style={{ paddingLeft: 205 }}>
                    <View style={styles.row}>
                        <Text>ตำแหน่ง </Text>
                    </View>
                    
                    <View style={{textAlign: 'center', marginLeft: 5}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>
                                { 
                                    writerData !== null ? 
                                    `${writerData.position}` 
                                    : 
                                    ` `
                                }
                            </Text>
                        </View>
                        <View style={{ ...styles.row, marginTop: -12}}>
                            <Text>.................................................................................................</Text>
                        </View>
                    </View>
                    
                </View>
            </View>


            <View style={[styles.row, {paddingTop: 2}]}>
                <View>
                    <View style={styles.row}>
                        <Text>สังกัด </Text>
                    </View>

                    <View style={{textAlign: 'center', marginLeft: -225}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{`${agency}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text>...............................................................................................</Text>
                        </View>
                    </View>
                </View>

                <View style={{ paddingLeft: 210 }}>
                    <View style={styles.row}>
                        <Text>พร้อมด้วย </Text>
                    </View>
                    
                    <View style={{textAlign: 'center', marginLeft: 15}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>
                                { personWithoutWriter[0] }
                            </Text>
                        </View>
                        <View style={{ ...styles.row, marginTop: -12}}>
                            <Text>.................................................................................................</Text>
                        </View>
                    </View>
                    
                </View>
            </View>
            
            <View style={styles.row}>
                <View>
                    <Text style={{paddingTop: 1}}>
                    .....................................................................................................................................................................................................................................
                    {'\n'}
                    </Text>
                    <Text style={{paddingTop: 1}}>
                    .....................................................................................................................................................................................................................................
                    {'\n'}
                    </Text>
                    <Text style={{paddingTop: 1}}>
                    .....................................................................................................................................................................................................................................
                    {'\n'}
                    </Text>
                </View>
            </View>

            <View style={[{marginTop: -50}, styles.row]}>
                <View style={{width: '33%', textAlign: 'center'}}>
                    <Text> 
                        { personWithoutWriter[1] ? `${personWithoutWriter[1]}` : ' ' }
                    </Text>
                </View>
                <View style={{width: '33%', textAlign: 'center'}}>
                    <Text> 
                        { personWithoutWriter[2] ? `${personWithoutWriter[2]}` : ' ' }
                    </Text>
                </View>
                <View style={{width: '33%', textAlign: 'center'}}>
                    <Text> 
                        { personWithoutWriter[3] ? `${personWithoutWriter[3]}` : ' ' }
                    </Text>
                </View>
            </View>

            <View style={[styles.row, {paddingTop: 1}]}>
                <View style={{width: '33%', textAlign: 'center'}}>
                    <Text> 
                        { personWithoutWriter[4] ? `${personWithoutWriter[4]}` : ' ' }
                    </Text>
                </View>
                <View style={{width: '33%', textAlign: 'center'}}>
                    <Text> 
                        { personWithoutWriter[5] ? `${personWithoutWriter[5]}` : ' ' }
                    </Text>
                </View>
                <View style={{width: '33%', textAlign: 'center'}}>
                    <Text> 
                        { personWithoutWriter[6] ? `${personWithoutWriter[6]}` : ' ' }
                    </Text>
                </View>
            </View>

            <View style={[styles.row, {paddingTop: 1}]}>
                <View style={{width: '33%', textAlign: 'center'}}>
                    <Text> 
                        { personWithoutWriter[7] ? `${personWithoutWriter[7]}` : ' ' }
                    </Text>
                </View>
                <View style={{width: '33%', textAlign: 'center'}}>
                    <Text> 
                        { personWithoutWriter[8] ? `${personWithoutWriter[8]}` : ' ' }
                    </Text>
                </View>
                <View style={{width: '33%', textAlign: 'center'}}>
                    <Text> 
                        { personWithoutWriter[9] ? `${personWithoutWriter[9]}` : ' ' }
                    </Text>
                </View>
            </View>


            <View style={{ paddingTop: 3 }}>
                <View style={styles.row}>
                    <Text>เดินทางไปปฏิบัติราชการ </Text>
                </View>

                <View style={ {marginTop: -12} }>
                    <Text style={{ textIndent: 89 }}>........................................................................................................................................................................................... {`\n`}
                    </Text>
                    <Text>
                    .....................................................................................................................................................................................................................................
                    {'\n'}
                    </Text>
                    <Text>
                    .....................................................................................................................................................................................................................................
                    {'\n'}
                    </Text>
                    <Text>
                    .....................................................................................................................................................................................................................................
                    {'\n'}
                    </Text>
                </View>
            </View>

            <View style={[styles.row, {paddingTop: 1}]}>

                <Text style={{width: '17%'}}>โดยออกเดินทางจาก  </Text>

                <Text style={{width: '14%'}}>
                    (   { departFrom==="H" ? '√' : ' ' }   ) บ้านพัก
                </Text>
                <Text style={{width: '16%'}}>
                    (   { departFrom==="O" ? '√' : ' ' }   ) สำนักงาน
                </Text>
                <Text style={{width: '17%'}}>
                    (   { departFrom==="T" ? '√' : ' ' }   ) ประเทศไทย
                </Text>

                <View>
                    <View style={styles.row}>
                        <Text>ตั้งแต่วันที่ </Text>
                    </View>

                    <View style={{textAlign: 'center', marginLeft: -270}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{`${ thaiDate(startDate) }`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text>..............................................................</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.row, {paddingTop: 1}]}>
                <View style={{width: '14.5%'}}>
                    <View style={styles.row}>
                        <Text>เวลา              น.</Text>
                    </View>
                    <View style={{textAlign: 'center'}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{`${startTime}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12, paddingLeft: 3 }}>
                            <Text>..................</Text>
                        </View>
                    </View>
                </View>

                <Text style={{width: '9.5%'}}>และกลับถึง  </Text>

                <Text style={{width: '14%'}}>
                    (   { arriveTo==="H" ? '√' : ' ' }   ) บ้านพัก
                </Text>
                <Text style={{width: '16%'}}>
                    (   { arriveTo==="O" ? '√' : ' ' }   ) สำนักงาน
                </Text>
                <Text style={{width: '17%'}}>
                    (   { arriveTo==="T" ? '√' : ' ' }   ) ประเทศไทย
                </Text>

                <View>
                    <View style={styles.row}>
                        <Text>ตั้งแต่วันที่ </Text>
                    </View>

                    <View style={{textAlign: 'center', marginLeft: -305}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{`${ thaiDate(endDate) }`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text>...............................................</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.row, {paddingTop: 1}]}>
                <View style={{width: '14.5%'}}>
                    <View style={styles.row}>
                        <Text>เวลา              น.</Text>
                    </View>
                    <View style={{textAlign: 'center'}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{`${endTime}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12, paddingLeft: 3 }}>
                            <Text>..................</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <View style={styles.row}>
                        <Text>รวมเวลาไปราชการครั้งนี้                     วัน </Text>
                    </View>
                    <View style={{textAlign: 'center', marginLeft: -250}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{`${noDays}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12, paddingLeft: 3 }}>
                            <Text>.........................</Text>
                        </View>
                    </View>
                </View>

                <View style={{paddingLeft: 40}}>
                    <View style={styles.row}>
                        <Text>             ชั่วโมง</Text>
                    </View>
                    <View style={{textAlign: 'center', marginLeft: -485}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{`${noHours}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12, paddingLeft: 3 }}>
                            <Text>...................</Text>
                        </View>
                    </View>
                </View>
            </View>


            <View style={[styles.row, {paddingTop: 1, paddingLeft: 35}]}>

                <Text>ข้าพเจ้าขอเบิกค่าใช้จ่ายในการเดินทางไปราชการสำหรับ  </Text>

                <Text style={{paddingLeft: 20}}>
                    (   { meOrGroup==="M" ? '√' : ' ' }   ) ข้าพเจ้า
                </Text>
                <Text style={{paddingLeft: 20}}>
                    (   { meOrGroup==="G" ? '√' : ' ' }   ) คณะเดินทาง
                </Text>
                <Text style={{paddingLeft: 20}}> ดังนี้ </Text>
            </View>


            <View style={[styles.row, {paddingTop: 1}]}>
                <View style={{width: '57%'}}>
                    <View style={styles.row}>
                        <Text>ค่าเบี้ยเลี้ยงเดินทางประเภท </Text>
                    </View>
                    <View style={{textAlign: 'right'}}>
                        <View style={{...styles.row, marginTop: -16, paddingRight: 30}}>
                            <Text>{ travelType ? `${travelType}` : ' ' }</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text>.............................................................................</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: '18%'}}>
                    <View style={[styles.row, {textAlign: 'right'}]}>
                        <Text>จำนวน              วัน </Text>
                    </View>
                    <View style={{textAlign: 'center', marginLeft: 25}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{travelDays > 0 && `${travelDays}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12, paddingLeft: 3 }}>
                            <Text>.................</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: '25%'}}>
                    <View style={[styles.row, {textAlign: 'right'}]}>
                        <Text>รวม                           บาท </Text>
                    </View>
                    <View style={{textAlign: 'right', marginRight: 19}}>
                        <View style={{...styles.row, marginTop: -16, marginRight: 10}}>
                            <Text>{travelCost > 0 && `${travelCost.toLocaleString()}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12, paddingLeft: 3 }}>
                            <Text>..................................</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.row, {paddingTop: 1}]}>
                <View style={{width: '57%'}}>
                    <View style={styles.row}>
                        <Text>ค่าเช่าที่พักประเภท </Text>
                    </View>
                    <View style={{textAlign: 'right'}}>
                        <View style={{...styles.row, marginTop: -16, paddingRight: 30}}>
                            <Text>{ restType ? `${restType}` : ' ' }</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text>...........................................................................................</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: '18%'}}>
                    <View style={[styles.row, {textAlign: 'right'}]}>
                        <Text>จำนวน              วัน </Text>
                    </View>
                    <View style={{textAlign: 'center', marginLeft: 25}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{restDays > 0 && `${restDays}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12, paddingLeft: 3 }}>
                            <Text>.................</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: '25%'}}>
                    <View style={[styles.row, {textAlign: 'right'}]}>
                        <Text>รวม                           บาท </Text>
                    </View>
                    <View style={{textAlign: 'right', marginRight: 19}}>
                        <View style={{...styles.row, marginTop: -16, marginRight: 10}}>
                            <Text>{restCost > 0 && `${ restCost.toLocaleString()}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12, paddingLeft: 3 }}>
                            <Text>..................................</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.row, {paddingTop: 1}]}>
                <View style={{width: '57%'}}>
                    <View style={styles.row}>
                        <Text>ค่าพาหนะ </Text>
                    </View>
                    <View style={{textAlign: 'right'}}>
                        <View style={{...styles.row, marginTop: -16, paddingRight: 30}}>
                            <Text>{ vehicleType ? `${vehicleType}` : ' ' }</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text>.........................................................................................................</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: '18%'}}>
                    <View style={[styles.row, {textAlign: 'right'}]}>
                        <Text>จำนวน              วัน </Text>
                    </View>
                    <View style={{textAlign: 'center', marginLeft: 25}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{vehicleDays > 0 && `${vehicleDays}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12, paddingLeft: 3 }}>
                            <Text>.................</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: '25%'}}>
                    <View style={[styles.row, {textAlign: 'right'}]}>
                        <Text>รวม                           บาท </Text>
                    </View>
                    <View style={{textAlign: 'right', marginRight: 19}}>
                        <View style={{...styles.row, marginTop: -16, marginRight: 10}}>
                            <Text>{vehicleCost > 0 && `${vehicleCost.toLocaleString()}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12, paddingLeft: 3 }}>
                            <Text>..................................</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.row, {paddingTop: 1}]}>
                <View style={{width: '57%'}}>
                    <View style={styles.row}>
                        <Text>ค่าใช้จ่ายอื่นๆ </Text>
                    </View>
                    <View style={{textAlign: 'right'}}>
                        <View style={{...styles.row, marginTop: -16, paddingRight: 30}}>
                            <Text>{ otherType ? `${otherType}` : ' ' }</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12 }}>
                            <Text>.....................................................................................................</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: '18%'}}>
                    <View style={[styles.row, {textAlign: 'right'}]}>
                        <Text>จำนวน              วัน </Text>
                    </View>
                    <View style={{textAlign: 'center', marginLeft: 25}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{otherDays> 0 &&`${otherDays}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12, paddingLeft: 3 }}>
                            <Text>.................</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: '25%'}}>
                    <View style={[styles.row, {textAlign: 'right'}]}>
                        <Text>รวม                           บาท </Text>
                    </View>
                    <View style={{textAlign: 'right', marginRight: 19}}>
                        <View style={{...styles.row, marginTop: -16, marginRight: 10}}>
                            <Text>{otherCost > 0 && `${otherCost.toLocaleString()}`}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12, paddingLeft: 3 }}>
                            <Text>..................................</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.row, {paddingTop: 1}]}>
                <View>
                    <View style={[styles.row, {textAlign: 'right'}]}>
                        <Text>รวมเป็นเงินทั้งสิ้น                            บาท </Text>
                    </View>
                    <View style={{textAlign: 'right', marginRight: 19}}>
                        <View style={{...styles.row, marginTop: -16, marginRight: 10}}>
                            <Text>{ totalCost > 0 ? (totalCost.toLocaleString()) : ` `}</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12, paddingLeft: 3 }}>
                            <Text>..................................</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.row, {paddingTop: 1}]}>
                <View>
                    <View style={[styles.row]}>
                        <Text>จำนวนเงิน (ตัวอักษร)     (                                                                       )</Text>
                    </View>
                    <View style={{textAlign: 'center', marginRight: 90}}>
                        <View style={{...styles.row, marginTop: -16, marginRight: 10}}>
                            <Text>{ THBText(totalCost) }</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12, paddingLeft: 3 }}>
                            <Text>..............................................................................................</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.row, {paddingTop: 1, paddingLeft: 35}]}>
                <View style={{width: '75%'}}>
                    <View style={styles.row}>
                        <Text>ข้าพเจ้าขอรับรองว่ารายการที่กล่าวมาข้างต้นเป็นความจริง และหลักฐานการจ่ายที่ส่งมาด้วย </Text>
                    </View>
                </View>
                <View style={{width: '25%'}}>
                    <View style={[styles.row, {textAlign: 'right'}]}>
                        <Text>จำนวน                   ฉบับ </Text>
                    </View>
                    <View style={{textAlign: 'center', marginLeft: 23}}>
                        <View style={{...styles.row, marginTop: -16}}>
                            <Text>{ attachmentNo > 0 && `${attachmentNo}` }</Text>
                        </View>
                        
                        <View style={{ ...styles.row, marginTop: -12}}>
                            <Text>.......................</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.row, {paddingTop: 1}]}>
                <View style={{width: '75%'}}>
                    <View style={styles.row}>
                        <Text>รวมทั้งจำนวนเงินที่ขอเบิกถูกต้องตามกฏหมายทุกประการ </Text>
                    </View>
                </View>
            </View>


            {/* เจ้าหน้าที่ */}
            <View style={[styles.row, {paddingTop: 50}]}>
                <View style={{width: "50%", textAlign: "center"}}>

                </View>

                <View style={{width: "50%", textAlign: "center"}}>
                    <View>
                        <Text>
                            ลงชื่อ                                                         ผู้ขอรับเงิน  {'\n'}
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -28 }}>...........................................................................</Text>
                    </View>

                    <View>
                        <Text style={{marginLeft: -30 }}>
                            (                                                            )
                        </Text>
                        <Text style={{marginLeft: -30, marginTop: -15}}>
                            {
                                writerData !== null ? 
                                `${writerData.fullName}` 
                                : 
                                ` `
                            }
                        </Text>
                        <Text style={{marginTop: -12, marginLeft: -30 }}>...........................................................................</Text>
                    </View>

                    <View>
                        <View style={[styles.row, {textAlign: 'left'}]}>
                            <Text>ตำแหน่ง </Text>
                        </View>

                        <View style={{textAlign: 'center', paddingLeft: 10}}>
                            <View style={{...styles.row, marginTop: -16}}>
                                <Text>
                                    {
                                        writerData !== null ? 
                                        `${writerData.position}` 
                                        : 
                                        ` `
                                    }
                                </Text>
                            </View>
                            
                            <View style={{ ...styles.row, marginTop: -12 }}>
                                <Text>....................................................................................</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>



            <View style={[{marginTop: -389}, styles.row]}>
                <Text style={{ textIndent: 95 }}> 
                    { `${name}` }
                </Text>
            </View>
            
        </Page>
    )
}

export default page1
