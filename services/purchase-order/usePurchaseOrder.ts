import { fetch } from "../axios";

export const getPurchaseRequests = async () => {
  return fetch({
    method: "GET",
    path: `/api/purchase-order`
  });
}