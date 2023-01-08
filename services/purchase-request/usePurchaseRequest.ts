import { fetch } from "../axios";

export const getPurchaseRequests = async () => {
  return await fetch({
    method: "GET",
    path: `/api/purchase-request`
  })
}

export const getPurchaseRequestsDetails = async (id: any) => {
  return await fetch({
    method: "GET",
    path: `/api/purchase-request/details`,
    params: {
      id
    } 
  })
}

export const postPurchaseRequestsCancel = async (id: any) => {
  return await fetch({
    method: "POST",
    path: `/api/purchase-request/cancel`,
    params: {
      id
    } 
  })
}

export const getEmployees = async () => {
  return await fetch({
    method: "GET",
    path: `/api/purchase-request/employees`
  })
}

export const getAffiliate = async () => {
  return await fetch({
    method: "GET",
    path: `/api/purchase-request/affiliate`
  })
}

export const getItemsList = async () => {
  return await fetch({
    method: "GET",
    path: `/api/purchase-request/items`
  })
}

export const getProfitCenters = async () => {
  return await fetch({
    method: "GET",
    path: `/api/purchase-request/profitCenters`
  })
}

export const getProjects = async () => {
  return await fetch({
    method: "GET",
    path: `/api/purchase-request/projects`
  })
}

export const getDepartments = async (id: any) => {
  return await fetch({
    method: "GET",
    path: '/api/purchase-request/departaments',
    params: {
      id
    } 
  })
}