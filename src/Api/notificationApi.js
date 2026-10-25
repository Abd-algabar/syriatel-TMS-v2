    
import api from "./axios";

export async function registerNotificationTokenApi(token) {
  return api.post("notification/device-tokens", {
    token,
    platform: "web",
  });
}
