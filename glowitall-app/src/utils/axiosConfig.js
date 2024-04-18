export const base_url = "http://localhost:5000/api/";

const token = JSON.parse(localStorage.getItem("userToken"));

export const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
