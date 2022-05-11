import * as yup from 'yup'

//สร้าง Schema สำหรับ validate information
export const firstStepSchema = yup.object().shape({
    seq: yup.string().required('ต้องไม่เป็นค่าว่าง'),
    date: yup.string().required('ต้องไม่เป็นค่าว่าง'),
    applicant: yup.string().required('ต้องไม่เป็นค่าว่าง'),
    personId_0: yup.string().required('ต้องไม่เป็นค่าว่าง'),
    startDate: yup.date().required('ต้องกรอกข้อมูล'),
    endDate: yup.date().required('ต้องกรอกข้อมูล'),
});

export const secondStepSchema = yup.object().shape({
    to: yup.string().required('This field is required.'),
    carCode: yup.string().required('This field is required.'),
    driver: yup.string().required('This field is required.'),
});

//สร้าง Schema สำหรับ validate information
export const thirdStepSchema = yup.object().shape({
    to: yup.string().required('This field is required.'),
    writer: yup.string().required('This field is required.'),
    agency: yup.string().required('This field is required.'),
    writeDate: yup.date('ควรกรอกวันที่ ด้วย').required('This field is required.')
});

export const notInputSchema = yup.object().shape({})
