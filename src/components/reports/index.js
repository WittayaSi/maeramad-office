import React from "react"
import moment from 'moment'

import fontIt9 from '../../assets/fonts/thsarabunit9.ttf'
import fontIt9Bold from '../../assets/fonts/thsarabunit9_bold.ttf'
import {
    Font
} from "@react-pdf/renderer"

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import CustomReport from './report1/CustomReport'

// Font.register({ family: 'THSarabunNew', src: font})
// Font.register({ family: 'THSarabunNewBold', src: fontBold})

Font.register({ family: 'THSarabunIt9', src: fontIt9})
Font.register({ family: 'THSarabunIt9Bold', src: fontIt9Bold})

const MovieComponent = () => {
    const datas = [
        { data: 'res.data.results'},
        { data: 'res.data.results'},
        { data: 'res.data.results'},
        { data: 'res.data.results'}
    ]
    return (
        <div className="container">
            <PDFViewer style={{width: "100%", height: "80vh"}}>
                <CustomReport />
            </PDFViewer>
            <br />
            {/* <PDFDownloadLink
                document={
                    <CustomReport />
                }
                fileName={ 
                    `best-movies_${moment().format()}.pdf` 
                }
                style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#4a4a4a",
                    backgroundColor: "#f2f2f2",
                    border: "1px solid #4a4a4a"
                }}
            >
                {
                    ({ blob, url, loading, error }) => 
                    loading ? "Loading document..." : "Download Pdf"
                }
            </PDFDownloadLink> */}
        </div>
    );
}

export default MovieComponent