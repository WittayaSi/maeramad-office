import React from 'react'

import { Page, Text, View, StyleSheet} from "@react-pdf/renderer"
import THBText from 'thai-baht-text'

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
    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid", 
        borderWidth: 2, 
        borderRightWidth: 0, 
        borderBottomWidth: 0,
        marginTop: 20
    },
    tableHeaderCol: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingTop: 10,
        paddingBottom: 15,
        borderStyle: "solid", 
        borderWidth: 2, 
        borderLeftWidth: 0, 
        borderTopWidth: 0     
    },
})

const page2 = ({
    allowanceCost: [{
        travelCost,
        restCost,
        vehicleCost,
        otherCost,
        writerData,
    }]
}) => {

    const totalCost = travelCost + restCost + vehicleCost + otherCost

    return (
        <Page style={styles.page} size="A4">

            <View style={styles.table}>
                {/* table header */}
                <View style={styles.row}>
                    
                    <View style={[styles.tableHeaderCol, {width: '50%'}]}>
                        <View>
                            <Text>
                                ได้ตรวจสอบหลักฐานการเบิกจ่ายที่แนบถูกต้อง
                            </Text>
                            <Text>
                                เห็นควรอนุมัติให้เบิกจ่ายได้
                            </Text>
                        </View>

                        <View style={{textAlign: "center", marginTop: 60}}>
                            <View>
                                <Text>
                                    ลงชื่อ                                                          {'\n'}
                                </Text>
                                <Text style={{marginTop: -12, paddingLeft: 10}}>......................................................................</Text>
                            </View>

                            <View>
                                <Text>
                                    (                                                            )
                                </Text>
                                <Text style={{marginTop: -15}}>
                                    {`    `}
                                </Text>
                                <Text style={{marginTop: -12}}>...........................................................................</Text>
                            </View>

                            <View>
                                <View style={[styles.row, {textAlign: 'left'}]}>
                                    <Text>ตำแหน่ง </Text>
                                </View>

                                <View style={{textAlign: 'center', paddingLeft: 20}}>
                                    <View style={{...styles.row, marginTop: -16}}>
                                        <Text>{` `}</Text>
                                    </View>
                                    
                                    <View style={{ ...styles.row, marginTop: -12 }}>
                                        <Text>....................................................................................</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={[styles.row, {textAlign: 'left'}]}>
                                    <Text>วันที่ </Text>
                                </View>

                                <View style={{textAlign: 'center', paddingLeft: 5}}>
                                    <View style={{...styles.row, marginTop: -16}}>
                                        <Text>{` `}</Text>
                                    </View>
                                    
                                    <View style={{ ...styles.row, marginTop: -12 }}>
                                        <Text>....................................................................................</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        
                    </View>
                    
                    <View style={[styles.tableHeaderCol, {width: '50%'}]}>
                        <View>
                            <Text>
                                อนุมัติให้จ่ายได้
                            </Text>
                            <Text>
                                {'  '}
                            </Text>
                        </View>

                        <View style={{textAlign: "center", marginTop: 60}}>
                            <View>
                                <Text>
                                    ลงชื่อ                                                          {'\n'}
                                </Text>
                                <Text style={{marginTop: -12, paddingLeft: 10}}>......................................................................</Text>
                            </View>

                            <View>
                                <Text>
                                    (                                                            )
                                </Text>
                                <Text style={{marginTop: -15}}>
                                    {`     `}
                                </Text>
                                <Text style={{marginTop: -12}}>...........................................................................</Text>
                            </View>

                            <View>
                                <View style={[styles.row, {textAlign: 'left'}]}>
                                    <Text>ตำแหน่ง </Text>
                                </View>

                                <View style={{textAlign: 'center', paddingLeft: 20}}>
                                    <View style={{...styles.row, marginTop: -16}}>
                                        <Text>{` `}</Text>
                                    </View>
                                    
                                    <View style={{ ...styles.row, marginTop: -12 }}>
                                        <Text>....................................................................................</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={[styles.row, {textAlign: 'left'}]}>
                                    <Text>วันที่ </Text>
                                </View>

                                <View style={{textAlign: 'center', paddingLeft: 5}}>
                                    <View style={{...styles.row, marginTop: -16}}>
                                        <Text>{` `}</Text>
                                    </View>
                                    
                                    <View style={{ ...styles.row, marginTop: -12 }}>
                                        <Text>....................................................................................</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={[styles.tableHeaderCol, {width: '100%'}]}>

                        <View style={[styles.row, {paddingTop: 1, paddingLeft: 55}]}>
                            <View style={styles.row}>
                                <Text>ได้รับเงินค่าใช้จ่ายในการเดินทางไปราชการ จำนวน                               บาท</Text>
                            </View>
                            <View style={{textAlign: 'center', marginLeft: -530}}>
                                <View style={{...styles.row}}>
                                    <Text>{ totalCost > 0 && `${totalCost.toLocaleString()}` } </Text>
                                </View>
                                
                                <View style={{ ...styles.row, marginTop: -11 }}>
                                    <Text>....................................</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.row, {paddingTop: 1, paddingLeft: 10}]}>
                            
                            <View style={{textAlign: 'center', width: '40%'}}>
                                <Text>
                                    (                                                            )
                                </Text>
                                <Text style={{marginTop: -15}}>
                                    { THBText(totalCost) }
                                </Text>
                                <Text style={{marginTop: -12}}>...........................................................................</Text>
                            </View>

                            <View style={{width: '50%', paddingLeft: 20}}>
                                <Text>  ไว้เป็นการถูกต้องแล้ว</Text>
                            </View>
                        </View>

                        <View style={[styles.row , { marginTop: 50}]}>

                            <View style={{textAlign: "center", width: '50%'}}>
                                <View>
                                    <Text>
                                        ลงชื่อ                                                  ผู้รับเงิน {'\n'}
                                    </Text>
                                    <Text style={{marginTop: -12, paddingRight: 10}}>.................................................................</Text>
                                </View>

                                <View>
                                    <Text>
                                        (                                                            )
                                    </Text>
                                    <Text style={{marginTop: -15}}>
                                        {
                                            writerData !== null ? 
                                            `${writerData.fullName}` 
                                            : 
                                            ` `
                                        }
                                    </Text>
                                    <Text style={{marginTop: -12}}>...........................................................................</Text>
                                </View>

                                <View>
                                    <View style={[styles.row, {textAlign: 'left', paddingLeft: 10}]}>
                                        <Text>ตำแหน่ง </Text>
                                    </View>

                                    <View style={{textAlign: 'center', paddingLeft: 30}}>
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
                                <View>
                                    <View style={[styles.row, {textAlign: 'left', paddingLeft: 10}]}>
                                        <Text>วันที่ </Text>
                                    </View>

                                    <View style={{textAlign: 'center', paddingLeft: 15}}>
                                        <View style={{...styles.row, marginTop: -16}}>
                                            <Text>{` `}</Text>
                                        </View>
                                        
                                        <View style={{ ...styles.row, marginTop: -12 }}>
                                            <Text>....................................................................................</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{textAlign: "center", width: '50%'}}>
                                <View>
                                    <Text>
                                        ลงชื่อ                                                  ผู้จ่ายเงิน{'\n'}
                                    </Text>
                                    <Text style={{marginTop: -12, paddingRight: 10}}>.................................................................</Text>
                                </View>

                                <View>
                                    <Text>
                                        (                                                            )
                                    </Text>
                                    <Text style={{marginTop: -15}}>
                                        {`  นางสาวนิตยา เขื่อนแก้ว  `}
                                    </Text>
                                    <Text style={{marginTop: -12}}>...........................................................................</Text>
                                </View>

                                <View>
                                    <View style={[styles.row, {textAlign: 'left', paddingLeft: 10}]}>
                                        <Text>ตำแหน่ง </Text>
                                    </View>

                                    <View style={{textAlign: 'center', paddingLeft: 30}}>
                                        <View style={{...styles.row, marginTop: -16}}>
                                            <Text>{`เจ้าพนักงานการเงินและบัญชี`}</Text>
                                        </View>
                                        
                                        <View style={{ ...styles.row, marginTop: -12 }}>
                                            <Text>....................................................................................</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={[styles.row, {textAlign: 'left', paddingLeft: 10}]}>
                                        <Text>วันที่ </Text>
                                    </View>

                                    <View style={{textAlign: 'center', paddingLeft: 15}}>
                                        <View style={{...styles.row, marginTop: -16}}>
                                            <Text>{` `}</Text>
                                        </View>
                                        
                                        <View style={{ ...styles.row, marginTop: -12 }}>
                                            <Text>....................................................................................</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            
                        </View>
                        
                    </View>
                </View>


                <View style={styles.row}>
                    <View style={[styles.tableHeaderCol, {width: '100%'}]}>
                        <View style={styles.row}>
                            <Text>หมายเหตุ </Text>
                        </View>
                        <Text style={{ textIndent: 40, marginTop: -12 }}>............................................................................................................................................................................................................ {`\n`}
                    </Text>
                        <View style={styles.row}>
                            <View>
                                <Text style={{paddingTop: 1}}>
                                ...............................................................................................................................................................................................................................
                                {'\n'}
                                </Text>
                                <Text style={{paddingTop: 1}}>
                                ...............................................................................................................................................................................................................................
                                {'\n'}
                                </Text>
                                <Text style={{paddingTop: 1}}>
                                ...............................................................................................................................................................................................................................
                                {'\n'}
                                </Text>
                                <Text style={{paddingTop: 1}}>
                                ...............................................................................................................................................................................................................................
                                {'\n'}
                                </Text>
                                <Text style={{paddingTop: 1}}>
                                ...............................................................................................................................................................................................................................
                                {'\n'}
                                </Text>
                                <Text style={{paddingTop: 1}}>
                                ...............................................................................................................................................................................................................................
                                {'\n'}
                                </Text>
                                <Text style={{paddingTop: 1}}>
                                ...............................................................................................................................................................................................................................
                                {'\n'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>


                <View style={styles.row}>
                    <View style={[styles.tableHeaderCol, {width: '100%'}]}>
                        <View style={styles.row}>
                            <Text>คำชี้แจง </Text>
                        </View>
                        <Text style={{ textIndent: 45, marginTop: -15 }}>
                            1. กรณีเดินทางเป็นหมู่คณะและจัดทำใบเบิกค่าใช้จ่ายรวมฉบับเดียวกัน หากระยะเวลาในการเริ่มต้นและสิ้นสุดการ{`\n`}
                        </Text>
                        <Text style={{textIndent: 45, paddingTop: 1}}>
                        เดินทางของแต่ละบุคคลแตกต่างกัน ให้แสดงรายละเอียดของวันเวลาที่แตกต่างกันของบุคคลนั้นในช่องหมายเหตุ
                        {'\n'}
                        </Text>
                        <Text style={{textIndent: 45, paddingTop: 1}}>
                        2. กรณียื่นขอเบิกค่าใช้จ่ายรายบุคคล ให้ผู้ขอรับเงินเป็นผู้ลงลายมือชื่อผู้รับเงินและวันเดือนปีที่รับเงิน กรณีที่การยืมเงิน
                        {'\n'}
                        </Text>
                        <Text style={{textIndent: 45, paddingTop: 1}}>
                        ให้ระบุวันที่ที่ได้รับเงิน เลขที่สัญญายืมและวันที่อนุมัติเงินยืมด้วย
                        {'\n'}
                        </Text>
                        <Text style={{textIndent: 45, paddingTop: 1}}>
                        3. กรณีที่ยื่นขอเบิกค่าใช้จ่ายรวมเป็นหมู่คณะ ผู้ขอรับเงินมิต้องลงลายมือชื่อในช่องผู้รับเงิน ทั้งนี้ ให้ผู้มีสิทธิ์แต่ละคน
                        {'\n'}
                        </Text>
                        <Text style={{textIndent: 45, paddingTop: 1}}>
                        ลงลายมือชื่อผู้รับเงินในหลักฐานการจ่ายเงิน (ส่วนที่ 2)
                        {'\n'}
                        </Text>
                    </View>
                </View>


            </View>
            
        </Page>
    )
}

export default page2
