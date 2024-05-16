const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const API_ROUTES = {
  getRoomsByUserId: `${baseUrl}/room/user`,
  createAblyRequestToken: `${baseUrl}/ably/auth`,
  createNewMessage: `${baseUrl}/message`
};
