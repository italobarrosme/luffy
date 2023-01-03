import { fetch } from "../axios";

export const getPurchaseRequests = async () => {
  return await fetch({
    method: "GET",
    path: `/api/purchase-request`
  })
}