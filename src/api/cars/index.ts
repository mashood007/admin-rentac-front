
// export

import axiosClient from "../client";

interface Params {
  limit?: number;
  page?: number;
}

export const getCars = async (params: Params) => {
  const { data } = await axiosClient.get('cars', {
    params: {
      limit: params.limit,
    },
  })
  return data
}
