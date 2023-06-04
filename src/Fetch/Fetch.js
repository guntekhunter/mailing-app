import axios from "axios";

let token = "";
let isLogin = false;

export const login = async (data) => {
  const res = await axios.post(
    `https://api-mailing-production-a9ee.up.railway.app/users/login`,
    data
  );
  token = res.data.accessToken;
  localStorage.setItem("isLogin", isLogin);
  localStorage.setItem("token", token);
  return res.data;
};

export const getAllMailing = async (page, limit) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error(`error for ${token}`);
  }
  try {
    const res = await axios.get(
      `https://api-mailing-production-a9ee.up.railway.app/mailings?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// fetch mailing
export const createMailing = async (data) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error(`error for ${token}`);
  }
  try {
    const res = await axios.post(
      `https://api-mailing-production-a9ee.up.railway.app/mailings/add`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const editMailing = async (data, id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error(`error for ${token}`);
  }
  try {
    const res = await axios.put(
      `https://api-mailing-production-a9ee.up.railway.app/mailings/${id}`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOneMailing = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error(`error for ${token}`);
  }
  try {
    const res = await axios.get(
      `https://api-mailing-production-a9ee.up.railway.app/mailings/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// fetch tujuan
export const getTujuan = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error(`error for ${token}`);
  }
  try {
    const res = await axios.get(
      `https://api-mailing-production-a9ee.up.railway.app/tujuans`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addTujuan = async (data) => {
  console.log(data);
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error(`error for ${token}`);
  }
  try {
    const res = await axios.post(
      `https://api-mailing-production-a9ee.up.railway.app/tujuans/add`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error(`error for ${token}`);
  }
  try {
    const res = await axios.get(
      `https://api-mailing-production-a9ee.up.railway.app/users`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// upload an image to cloudinary
export const uploadImage = async (data) => {
  // const token = localStorage.getItem("token");
  // if (token) {
  //   throw new Error(`error for ${token}`);
  // }
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/unm/image/upload",
      data
    );
    console.log(res.data.secure_url);
    return res.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};
