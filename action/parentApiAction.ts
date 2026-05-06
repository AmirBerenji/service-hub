"use server";

import agent from "@/api/agent";
import { ChildFormData } from "@/model/child";

export async function checkChildId(childId: string) {
  const req = await agent.ChildApi.checkChildId(childId);
  return req?.data;
}

export async function getchildByToken(childId: string) {
  const req = await agent.ChildApi.getchildByToken(childId);
  return req?.data;
}

export async function addChildProfile(profile: FormData) {
  const req = await agent.ChildApi.addChildProfile(profile);
  return req;
}

export async function getChildrenByUser() {
  const req = await agent.ChildApi.getchildByuser();
  return req?.data;
}

export async function updateChildProfile(childId: number, profile: FormData) {
  console.log("Updating child profile with ID:", childId);
  console.log("Profile data being sent:", profile);

  const req = await agent.ChildApi.updateChildProfile(childId, profile);
  return req;
}

export async function getChildById(childId: number) {
  const req = await agent.ChildApi.getchildById(childId);
  return req?.data;
}
