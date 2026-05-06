"use server";
import agent from "@/api/agent";
import { ReviewResponse, ReviewSubmission } from "@/model/review";

export async function addReview(
  review: ReviewSubmission
): Promise<ReviewResponse> {
  console.log("Submitting review:", review);
  const res = await agent.Reviews.addReview(review);
  console.log("Review submission response:", res);
  return res as ReviewResponse;
}

export async function checkReview(type: string, reviewable_id: string) {
  console.log(
    "Checking reviews for type:",
    type,
    "and reviewable_id:",
    reviewable_id
  );
  const req = await agent.Reviews.getReviews(type, reviewable_id);
  console.log("Fetched reviews:", req);
  return req;
}

export async function getReviews(type: string, reviewable_id: string) {
  console.log(
    "Get  reviews for type:",
    type,
    "and reviewable_id:",
    reviewable_id
  );
  const req = await agent.Reviews.getReviews(type, reviewable_id);
  console.log("Fetched list of reviews:", req);
  return req;
}

// export async function updateReview(id: Number, newReview: any) {
//   const req = await agent.Location.getLocations();
//   return req?.data;
// }

// export async function deleteReview(id: Number) {
//   const req = await agent.Location.getLocations();
//   return req?.data;
// }
