import React from 'react'
import QRCode from 'qrcode.react'
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer"
import {
    Row, Col
} from 'react-bootstrap'
import moment from "moment"

const styles = StyleSheet.create({
    page: {
        fontFamily: 'THSarabunNew',
        backgroundColor: "#ffffff",
        padding: '2cm'
    }
})

const Reports2 = () => {
    return (
        <div>
            <QRCode 
                value="http://facebook.github.io/react/" 
                bgColor="#FFFFFF"
                fgColor="#526222"
                level="Q"
                style={{ width: 128 }}
                //value="some text"
            />
        </div>
    )
}

export default Reports2
