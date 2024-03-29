import axios from "axios";
const googleBaseUrl = "https://www.googleapis.com";

export function getUserProfile(user) {
  return axios.get(
    `${googleBaseUrl}/oauth2/v1/userinfo?access_token=${user.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        Accept: "application/json",
      },
    }
  );
}
