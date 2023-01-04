import { fetch } from "../axios";

export const getPurchaseRequests = async () => {
  return await fetch({
    method: "GET",
    path: `/api/purchase-request`
  })
}

export const getEmployees = async () => {
  return await fetch({
    method: "GET",
    path: `/api/purchase-order/employees`
  })
}