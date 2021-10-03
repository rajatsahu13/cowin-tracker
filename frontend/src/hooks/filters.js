export function vaccineFilter(arr,filters) {
    return arr.filter(arr => arr.vaccine === filters.vaccine)
}

export function feeFilter(arr,filters) {
    return arr.filter(arr => arr.fee_type === filters.fee)
}

export function doseFilter(arr,filters) {
    if(filters.dose === 'dose1') return arr.filter(arr => arr.available_capacity_dose1 > 0)
    else if(filters.dose === 'dose2') return arr.filter(arr => arr.available_capacity_dose2 > 0)
}

export function ageFilter(arr,filters) {
    return arr.filter(arr => arr.min_age_limit === parseInt(filters.age))
}