"use server";

import agent from "@/api/agent";
import { Nanny } from "@/model/nany";

export async function getLocation() {
  const req = await agent.Location.getLocations();
  return req?.data;
}
export async function getLanguages() {
  const req = await agent.Language.getLanguage();
  return req?.data;
}
export async function addNuresProfile(profile: Nanny) {
  const req = await agent.Nurse.addNurseProfile(profile);
  console.log("AddNurseProfileReq", req);
  return req?.data;
}
export async function getNuresList(value: string) {
  const req = await agent.Nurse.getNurseList(value);
  return req?.data;
}
export async function getNuresById(id: number) {
  const req = await agent.Nurse.getNurseById(id);
  return req?.data;
}
export async function getNuresByUserId() {
  const req = await agent.Nurse.getNurseByUserId();

  return req?.data;
}

export async function updateNuresProfile(id: number, profile: Nanny) {
  const req = await agent.Nurse.updateNurseProfile(profile);

  return req?.data;
}
