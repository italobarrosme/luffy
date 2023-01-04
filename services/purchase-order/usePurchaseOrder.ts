import { fetch } from "../axios";

export const getPurchaseRequests = async () => {
  return await fetch({
    method: "GET",
    path: `/api/purchase-order`
  })
}

export const getEmployees = async () => {
  return await fetch({
    method: "GET",
    path: `/api/purchase-order/employees`
  })
}

export const getAffiliate = async () => {
  return await fetch({
    method: "GET",
    path: `/api/purchase-order/affiliate`
  })
}