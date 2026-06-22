"use server";

import agent from "@/api/agent";
import { BusinessApiResponse } from "@/model/service";

type BusinessActionResponse = {
  success: boolean;
  message: string;
  data?: unknown;
  errors?: Record<string, string[]>;
};

function getErrorMessage(response: BusinessApiResponse | undefined) {
  if (response?.message) {
    return response.message;
  }

  const firstError = Object.values(response?.errors ?? {})[0]?.[0];

  return firstError ?? "Unable to add business.";
}

export async function addBusiness(
  formData: FormData,
): Promise<BusinessActionResponse> {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const address = formData.get("address");
  const lat = formData.get("lat");
  const lng = formData.get("lng");
  const firstServiceId = formData.get("services[0][id]");

  if (!name || !phone || !email || !address || !lat || !lng || !firstServiceId) {
    return {
      success: false,
      message: "Please fill company details, address, and at least one service.",
    };
  }

  const response = await agent.Business.addBusiness(formData);

  if (response?.success === false || response?.errors) {
    return {
      success: false,
      message: getErrorMessage(response),
      errors: response?.errors,
    };
  }

  return {
    success: true,
    message: response?.message ?? "Business added successfully.",
    data: response?.data,
  };
}
