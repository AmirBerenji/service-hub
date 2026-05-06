import { updateProfile } from "@/action/apiAction";
import CookieConfig from "@/lib/cookieconfig";
import {
  Login,
  Profile,
  Register,
  UpdateProfile,
  UpdateProfileImage,
} from "@/model/auth";
import { Child, ChildFormData } from "@/model/child";
import { Doctor, DoctorDetails, DoctorResponse } from "@/model/doctor";
import { ApiResponse } from "@/model/general";
import { Languages } from "@/model/language";
import { Nanny } from "@/model/nany";
import {
  ReviewResponse,
  ReviewsResponse,
  ReviewSubmission,
} from "@/model/review";

import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://zippy.elrincondsabor.com/api/";
//axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

axios.interceptors.request.use(
  async (config) => {
    const _cookieConfig = new CookieConfig();
    const cookie = await _cookieConfig.getToken("jwt");

    config.headers["Authorization"] = `Bearer ${cookie}`;
    config.headers["Accept"] = "application/json";

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    } else {
      delete config.headers["Content-Type"];
    }
    // ==========================================

    console.log("🔵 Request Config:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data instanceof FormData ? "[FormData]" : config.data,
      baseURL: config.baseURL,
      isFormData: config.data instanceof FormData,
    });

    // Debug FormData contents
    if (config.data instanceof FormData) {
      console.log("📎 FormData Contents:");
      for (const [key, value] of config.data.entries()) {
        if (value instanceof File) {
          console.log(
            `  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`,
          );
        } else {
          console.log(`  ${key}:`, value);
        }
      }
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    console.log("🟢 Response Success:", response.data);
    return response;
  },
  (error) => {
    console.log("🔴 Response Error:", {
      url: error.config?.url,
      data: error.config?.data,
      response: error.response?.data,
      status: error.response?.status,
    });
    return Promise.reject(error);
  },
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) =>
    axios
      .get<T, AxiosResponse<T>>(url)
      .then(responseBody)
      .catch((error) => error.response?.data),

  getbyvalue: <T>(url: string, value: string) =>
    axios
      .get<T>(url + "?" + value)
      .then(responseBody)
      .catch((error) => error.response?.data),

  getWithParams: <T>(url: string, params: Record<string, string | number>) =>
    axios
      .get<T, AxiosResponse<T>>(url, { params })
      .then(responseBody)
      .catch((error) => {
        console.error("GET with params Error:", error);
        throw error.response?.data || error;
      }),

  post: <T>(url: string, body: object) =>
    axios
      .post<T, AxiosResponse<T>>(url, body)
      .then(responseBody)
      .catch((error) => error.response?.data),

  postForm: <T>(url: string, formData: FormData) =>
    axios
      .post<T, AxiosResponse<T>>(url, formData)
      .then(responseBody)
      .catch((error) => error.response?.data),

  put: <T>(url: string, body: object) =>
    axios
      .put<T, AxiosResponse<T>>(url, body)
      .then(responseBody)
      .catch((error) => error.response?.data),

  putForm: <T>(url: string, formData: FormData | object) =>
    axios
      .put<T, AxiosResponse<T>>(url, formData)
      .then(responseBody)
      .catch((error) => {
        console.log("Error", error);
        return error.response?.data;
      }),
};

const Account = {
  login: (user: Login) => requests.post<Profile>("user/login", user),
  register: (register: Register) =>
    requests.post<Profile>("user/register", register),
  getProfile: () => requests.get<Profile>("user/profile"),
  updateProfile: (profile: UpdateProfile) =>
    requests.put<Profile>("user/update", profile),
  updateProfileImage: (image: FormData) =>
    requests.postForm<Profile>("user/photo", image),
  forgotPassword: (formdata: FormData) =>
    requests.post("user/forgot-password", formdata),
  resetpassword: (formdata: FormData) =>
    requests.post("user/reset-password", formdata),
  changePassword: (formdata: FormData) =>
    requests.post("user/change-password", formdata),
};

const Location = {
  getLocations: () => requests.get<Location>("locations"),
};

const Language = {
  getLanguage: () => requests.get<Languages>("languages"),
};

const Nurse = {
  addNurseProfile: (profile: Nanny) => requests.post<Nanny>("nannies", profile),
  getNurseProfile: (value: string) =>
    requests.getbyvalue<Profile>("nannies", value),
  getNurseList: (value: string) =>
    requests.getbyvalue<Nanny[]>("nannies", value),
  getNurseById: (id: number) => requests.get<Nanny>(`nannies/${id}`),
  getNurseByUserId: () => requests.get<Nanny>(`nannies/user/info`),
  updateNurseProfile: (profile: Nanny) =>
    requests.put<Nanny>("nannies/update", profile),
};

const Reviews = {
  addReview: (review: ReviewSubmission) =>
    requests.post<ReviewResponse>("reviews", review),
  getReviews: (type: string, reviewable_id: string) =>
    requests.getWithParams<ReviewsResponse>("reviews", {
      type,
      reviewable_id,
    }),
  updateReview: (id: number, review: any) =>
    requests.put<any>(`reviews/${id}`, review),
  deleteReview: (id: number) => requests.put<any>(`reviews/${id}/delete`, {}),
};

const DoctorApi = {
  addDoctorProfile: (profile: Doctor) =>
    requests.post<DoctorResponse>("doctors", profile),
  getDoctorList: (value: string) =>
    requests.getbyvalue<ApiResponse<DoctorDetails[]>>("doctors", value),

  getDoctorProfile: (id: number) => requests.get<Profile>(`doctors/${id}`),

  getDoctorById: (id: number) => requests.get<Doctor>(`doctors/${id}`),
  getDoctorByUserId: () => requests.get<Doctor>(`doctors/user/info`),
  updateDoctorProfile: (profile: Doctor) =>
    requests.put<Doctor>(`doctors/${profile.id}`, profile),
};

const ChildApi = {
  checkChildId: (childId: string) =>
    requests.get<boolean>(`childes/checkregister/${childId}`),
  getchildByToken: (childId: string) =>
    requests.get<Child>(`childes/getchildbytoken/${childId}`),
  addChildProfile: (profile: FormData) =>
    requests.post<ChildFormData>("childes", profile),
  getchildByuser: () => requests.get<Child[]>(`childes`),
  getchildById: (id: number) => requests.get<Child>(`childes/${id}`),
  updateChildProfile: (childId: number, profile: FormData) =>
    requests.post<Child>(`childes/${childId}`, profile),
};

const agent = {
  Account,
  Location,
  Language,
  Nurse,
  Reviews,
  DoctorApi,
  ChildApi,
};

export default agent;
