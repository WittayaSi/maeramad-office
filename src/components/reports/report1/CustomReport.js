import React from "react"
import { Document, Font } from "@react-pdf/renderer"
// import moment from "moment"
import Page1 from "./page1"
import Page2 from "./page2"
import Page3 from "./page3"
import Page4 from './page4'
import Page5 from './page5'
import Page6 from './page6'
import Page7 from './page7'

import fontIt9 from '../../../assets/fonts/thsarabunit9.ttf'
import fontIt9Bold from '../../../assets/fonts/thsarabunit9_bold.ttf'

Font.register({ family: 'THSarabunIt9', src: fontIt9})
Font.register({ family: 'THSarabunIt9Bold', src: fontIt9Bold})

const CustomReport = ({ reportData, office }) => {

    // const widthCharCount = (txt) => {
    //     if (!txt) return 0;
    //     // var thaiFullWidthCharRegex = /[^\u0E31\u0E34-\u0E3E\u0E47-\u0E4E]/g;
    //     var thaiFullWidthCharRegex = /.{1,43}/g;
    //     console.log(txt.match(thaiFullWidthCharRegex));
    //     return txt.match(thaiFullWidthCharRegex).length;
    // }

    // const wrapThaiText = (segThaiTxt, maxLength=43, linebreak) => {
    //     linebreak = linebreak || "\n";
        
    //     segThaiTxt = segThaiTxt.replace(/\n/g, "^")
    //     //thai word segmentation with '|'
    //     var words = segThaiTxt.split(" ");
    //     console.log('words', words.length);
    //     var txt = "";
    //     //loop from start words
    //     for (var i = 0, line = "", linewlength = 0; i < words.length; i++) {
    //         var wlen = segThaiTxt.length;
    //         if (linewlength + wlen <= maxLength) {
    //             line = line + words[i];
    //             console.log(line);
    //             linewlength += wlen;
    //         } else {
    //             //word exceed line length
    //             //add line to txt
    //             txt = txt + (line + linebreak);
    //             //move the word to new line
    //             line = words[i];
    //             linewlength = wlen;
    //         }
    //     }
    //     if (linewlength > 0) {
    //         txt = txt + line;
    //         console.log(txt);
    //     }
    //     return txt;
    // }

    // useEffect(() => {
    //     let text = "ขจัดคราบไขมัน อาหารแห้งกรัง และกลิ่นคาวบนจานชามหรือภาชนะพลาสติกทำความสะอาดได้ง่ายและรวดเร็วถึง ขนาด 500 ml"
    //     // text = text.replace(/\n/g, "^")
    //     // text = text.replace(/\^/g, "\n")
    //     let newText = widthCharCount(text)
    //     console.log(newText);
    // }, [])

    return (
        <Document title="test report pdf">
            <Page1 reportData={reportData} office={office} />
            <Page2 reportData={reportData} office={office} />
            <Page3 reportData={reportData} office={office} />
            <Page4 reportData={reportData} office={office} />
            <Page5 reportData={reportData} office={office} />
            <Page6 reportData={reportData} office={office} />
            <Page7 reportData={reportData} office={office} />
        </Document>
    );
};

export default CustomReport;
