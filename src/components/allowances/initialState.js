export const generalInitialData = {
    seq: '',
    date: '',
    applicant: '',
    name: '',
    place: '',
    district: '',
    province: '',
    startDate: '',
    startTime: '08:00',
    endDate: '',
    endTime: '17:00',
    noDays: '',
    inOrOutPro: "out",
    inOrOutDist: "out",
    urgentPlan: false,
    budget: '3',
    vehicle: "1",
    carCode: '',
    driver: '',
    overnight: "Y",
    allowance: false,
    busFee: false,
    accomRent: false,
    others: false,
    othersDetials: '',
    fuelCostFrom: '',
    persons: [ { personId: '' } ]
}

export const carInitialData = {
    to: '',
    carId: '',
    carNo: '',
    driver: '',
    fuelOrderNo: '',
    fuelOrderBook: '',
    amount: (0.00).toFixed(2),
    selfDrive: false,
    selfName: ''    
}

export const costInitialData = {
    borrowNo: '',
    borrower: '',
    borrowDate: '',
    borrowAmount: 0.00,
    to: '',
    writer: '',
    agency: '',
    writeDate: '',
    followOrder: '',
    followDate: '',
    noDays: 0,
    noHours: 0,
    departFrom: 'H',
    arriveTo: 'H',
    meOrGroup: 'M',
    travelType: '',
    travelDays: 0,
    travelCost: 0.00,
    restType: '',
    restDays: 0,
    restCost: 0.00,
    vehicleType: '',
    vehicleDays: 0,
    vehicleCost: 0.00,
    otherType: '',
    otherDays: 0,
    otherCost: 0.00,
    attachmentNo: 0
}