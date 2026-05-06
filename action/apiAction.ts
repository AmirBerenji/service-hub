"use server";

import agent from "@/api/agent";
import CookieConfig from "@/lib/cookieconfig";
import Validation from "@/lib/validation";
import {
  Login,
  Register,
  UpdateProfile,
  UpdateProfileImage,
} from "@/model/auth";
import { redirect } from "next/navigation";

export async function register(formdata: FormData) {
  const register: Register = {
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
    password_confirmation: formdata.get("confirmpassword") as string,
    name: formdata.get("fullname") as string,
    phone: formdata.get("phone") as string,
    role: formdata.get("role") as string,
  };

  if (
    (typeof register.email == "undefined" && !register.email) ||
    (typeof register.password == "undefined" && !register.password) ||
    (typeof register.password_confirmation == "undefined" &&
      !register.password_confirmation) ||
    (typeof register.name == "undefined" && !register.name)
  ) {
    return { message: "Please fill all data!!!", success: false };
  }

  if (register.password != register.password_confirmation) {
    return {
      message: "Password and Confirn Password is not same!!!",
      success: false,
    };
  }

  const result = new Validation().validateEmail(register.email);

  if (result) {
    const req = await agent.Account.register(register);
    if (req.success == false) {
      return { message: req.message, success: false };
    }
    new CookieConfig().setToken("jwt", req.data.token);
    if (
      req.data.user.roles.includes("nurse") ||
      req.data.user.roles.includes("doctor")
    ) {
      redirect("/user/profile");
    }
    redirect("/");
  }
  return { message: "Your email format is not true", success: false };
}

export async function parentregister(formdata: FormData) {
  const register: Register = {
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
    password_confirmation: formdata.get("confirmpassword") as string,
    name: formdata.get("fullname") as string,
    phone: formdata.get("phone") as string,
    role: formdata.get("role") as string,
  };

  if (
    (typeof register.email == "undefined" && !register.email) ||
    (typeof register.password == "undefined" && !register.password) ||
    (typeof register.password_confirmation == "undefined" &&
      !register.password_confirmation) ||
    (typeof register.name == "undefined" && !register.name)
  ) {
    return { message: "Please fill all data!!!", success: false };
  }

  if (register.password != register.password_confirmation) {
    return {
      message: "Password and Confirn Password is not same!!!",
      success: false,
    };
  }

  const result = new Validation().validateEmail(register.email);

  if (result) {
    const req = await agent.Account.register(register);
    if (req.success == false) {
      return { message: req.message, success: false };
    }
    new CookieConfig().setToken("jwt", req.data.token);

    redirect("/user/profile");
  }
  return { message: "Your email format is not true", success: false };
}

export async function login(formdata: FormData) {
  const login: Login = {
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
  };

  if (
    (typeof login.email == "undefined" && !login.email) ||
    (typeof login.password == "undefined" && !login.password)
  ) {
    return { message: "Please fill all data!!!", error: true };
  }

  const result = new Validation().validateEmail(login.email);

  if (result) {
    const req = await agent.Account.login(login);
    console.log("Login response:", req);
    if (!req.success) {
      return { message: req.message, error: true };
    }
    new CookieConfig().setToken("jwt", req.data.token);
    redirect("/");
  }
  return { message: "Your email format is not true", error: true };
}

export async function getProfile() {
  const req = await agent.Account.getProfile();
  return req?.data;
}

export async function signOut() {
  new CookieConfig().deleteCookie("jwt");
}

export async function updateProfile(formdata: FormData) {
  const update: UpdateProfile = {
    email: formdata.get("email") as string,
    name: formdata.get("fullname") as string,
    phone: formdata.get("phone") as string,
  };

  if (
    (typeof update.email == "undefined" && !update.email) ||
    (typeof update.name == "undefined" && !update.name)
  ) {
    return { message: "Please fill all data!!!", success: false };
  }
  if (typeof update.phone == "undefined" || update.phone == null) {
    update.phone = "";
  }

  const result = new Validation().validateEmail(update.email);

  if (result) {
    const req = await agent.Account.updateProfile(update);
    if (req.success == false) {
      return { message: req.message, success: false };
    }
    return { message: "Profile updated successfully", success: true };
  }
  return { message: "Your email format is not true", success: false };
}

export async function updateProfileImage(input: FormData | File) {
  try {
    let file: File;

    if (input instanceof FormData) {
      // Try both "image" and "photo" field names
      const fileFromFormData = input.get("image") || input.get("photo");
      if (!fileFromFormData || !(fileFromFormData instanceof File)) {
        throw new Error("No valid file found in FormData");
      }
      file = fileFromFormData;
    } else if (input instanceof File) {
      file = input;
    } else {
      throw new Error("Invalid input type. Expected FormData or File");
    }

    // Create FormData for API - use "photo" as Laravel expects it
    const formData = new FormData();
    formData.append("photo", file);

    // Debug the FormData

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(
          `  File details: ${value.name}, ${value.size} bytes, ${value.type}`,
        );
      }
    }

    const req = await agent.Account.updateProfileImage(formData);
    console.log("✅ Profile image updated successfully:", req);

    return req;
  } catch (error) {
    console.error("❌ updateProfileImage error:", error);
    throw error;
  }
}

export async function forgotPassword(formdata: FormData) {
  const email = formdata.get("email") as string;
  if (typeof email == "undefined" || !email) {
    return { message: "Please fill all data!!!", success: false };
  }
  const result = new Validation().validateEmail(email);

  if (result) {
    const req = await agent.Account.forgotPassword(formdata);
    if (req.success == false) {
      return { message: req.message, success: false };
    }
    redirect("/user/reset-password");
  }
  return { message: "Your email format is not true", success: false };
}

export async function resetPassword(formdata: FormData) {
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  const password_confirmation = formdata.get("password_confirmation") as string;
  if (
    (typeof email == "undefined" && !email) ||
    (typeof password == "undefined" && !password) ||
    (typeof password_confirmation == "undefined" && !password_confirmation)
  ) {
    return { message: "Please fill all data!!!", success: false };
  }
  if (password !== password_confirmation) {
    return {
      message: "Password and confirm password do not match!!!",
      success: false,
    };
  }
  const result = new Validation().validateEmail(email);

  if (result) {
    const req = await agent.Account.resetpassword(formdata);
    if (req.success == false) {
      return { message: req.message, success: false };
    }
    redirect("/user/login");
  }
  return { message: "Your email format is not true", success: false };
}

export async function changePassword(formdata: FormData) {
  const current_password = formdata.get("current_password") as string;
  const password = formdata.get("password") as string;
  const password_confirmation = formdata.get("password_confirmation") as string;
  if (
    (typeof current_password == "undefined" && !current_password) ||
    (typeof password == "undefined" && !password) ||
    (typeof password_confirmation == "undefined" && !password_confirmation)
  ) {
    return { message: "Please fill all data!!!", success: false };
  }
  if (password !== password_confirmation) {
    return {
      message: "New password and confirm new password do not match!!!",
      success: false,
    };
  }
  const req = await agent.Account.changePassword(formdata);
  if (req.success == false) {
    return { message: req.message, success: false };
  }
  redirect("/user/login");
}
