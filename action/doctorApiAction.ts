// action/doctorApiAction.ts
"use server";

import agent from "@/api/agent";
import { Doctor } from "@/model/doctor";

export async function getLocation() {
  const req = await agent.Location.getLocations();
  return req?.data;
}

export async function getLanguages() {
  const req = await agent.Language.getLanguage();
  return req?.data;
}

export async function addDoctorProfile(profile: Doctor) {
  const req = await agent.DoctorApi.addDoctorProfile(profile);
  return req?.data;
}

export async function getDoctorList(value: string) {
  const req = await agent.DoctorApi.getDoctorList(value);
  return req?.data;
}

export async function updateDoctorProfile(id: number, data: Doctor) {
  const req = await agent.DoctorApi.updateDoctorProfile(data);
  return req?.data;
}

export async function getDoctorProfile(id: number) {
  const req = await agent.DoctorApi.getDoctorProfile(id);
  return req?.data;
}

export async function getDoctorByUserId() {
  const req = await agent.DoctorApi.getDoctorByUserId();
  return req?.data;
}
