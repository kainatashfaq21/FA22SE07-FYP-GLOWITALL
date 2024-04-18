const userToken = JSON.parse(localStorage.getItem("userToken"));
export const config = {
  headers: {
    Authorization: `Bearer ${userToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
