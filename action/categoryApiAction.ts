"use server";

import agent from "@/api/agent";
import { Category } from "@/model/service";

export async function getallCategory(): Promise<Category[]> {
  const res = await agent.Services.getCategory();
  console.log("Category retrieval response:", res);

  if (Array.isArray(res)) {
    return res;
  }

  if (Array.isArray(res?.data)) {
    return res.data;
  }

  return [];
}
