let Domain = require('../domain')

export const BASE_API = Domain.API_SERVER;
export const BASE_API_FLOOD = Domain.API_SERVER_FLOOD;
export const token = BASE_API + '/token'
export const district = BASE_API_FLOOD + 'flood/area/districts'
export const chaWard = BASE_API_FLOOD + 'flood/area/wards?district_id='
export const list_flood_reports = BASE_API_FLOOD + 'flood/reports?status=APPROVED'
export const create_reports = BASE_API_FLOOD + 'flood/reports'
export const get_flood_report_detail = BASE_API_FLOOD + 'flood/reports/'
export const create_reports_sos = BASE_API_FLOOD + 'flood/reports-sos'
export const street = BASE_API_FLOOD + 'flood/area/streets'
export const up_image = BASE_API_FLOOD+'flood/upload'