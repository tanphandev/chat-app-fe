import { API_ROUTES } from "@/configs/api-routes";

export const getRoomByUserId = async (userId: string) => {
  try {
    const res = await fetch(API_ROUTES.getRoomsByUserId + `/${userId}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      const error = await res.json();
      throw new Error(error?.message);
    }
  } catch (error) {
    throw error;
  }
};
