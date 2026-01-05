"use server";

import { serverFetch } from "@/lib/serverfetch";
import { zodValidator } from "@/lib/zodValidator";
import {
  createListingZodSchema,
  updateListingZodSchema,
} from "@/zod/ListingValidationSchema";
import { getUserInfo } from "../auth/getUserInfo";

/* -------------------------------------------------------------------------- */
/*                               CREATE LISTING                                */
/* -------------------------------------------------------------------------- */
export async function createListing(
  _currentState: any,
  formData: FormData
) {
  try {

        const getUser= await getUserInfo()
    
        console.log(getUser?.guide?.id);
        
    // 🔥 THIS IS THE KEY FIX
    
    const payload = JSON.parse(formData.get("data") as string);

    console.log("SERVER PAYLOAD 👉", payload);

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(payload));

    const file = formData.get("file");
    if (file instanceof Blob) {
      newFormData.append("file", file);
    }

    const res = await serverFetch.post(
      `/listing/create-listing/${getUser?.guide?.id}`,
      { body: newFormData }
    );

    return await res.json();
  } catch (error: any) {
    console.error("Create listing failed:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                               UPDATE LISTING                                */
/* -------------------------------------------------------------------------- */
export async function updateListing(
  id: string,
  _prevState: any,
  formData: FormData
) {
  try {
    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      itinerary: formData.get("itinerary"),
      price: formData.get("price") ? Number(formData.get("price")) : undefined,
      durationHours: formData.get("durationHours")
        ? Number(formData.get("durationHours"))
        : undefined,
      meetingPoint: formData.get("meetingPoint"),
      maxGroupSize: formData.get("maxGroupSize")
        ? Number(formData.get("maxGroupSize"))
        : undefined,
      city: formData.get("city"),
      category: formData.get("category"),
    };

    const validation = zodValidator(payload, updateListingZodSchema);
    if (validation.success === false) {
      return validation;
    }

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validation.data));

    const files = formData.getAll("file");
    files.forEach((file) => {
      if (file instanceof Blob) {
        newFormData.append("files", file);
      }
    });

    const res = await serverFetch.patch(`/listing/${id}`, {
      body: newFormData,
    });

    return await res.json();
  } catch (error: any) {
    console.error("Update listing failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update listing",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                               DELETE LISTING                                */
/* -------------------------------------------------------------------------- */
export async function deleteListing(id: string) {
  try {
    const res = await serverFetch.delete(`/listing/${id}`);
    return await res.json();
  } catch (error: any) {
    console.error("Delete listing failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete listing",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                               GET ALL LISTINGS                              */
/* -------------------------------------------------------------------------- */
export async function getAllListings(queryString?: string) {
  try {
    const res = await serverFetch.get(
      `/listing${queryString ? `?${queryString}` : ""}`,
      {
        next: { tags: ["listings"] },
      }
    );

    return await res.json();
  } catch (error: any) {
    console.error("Fetch listings failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to load listings",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                            GET ALL PUBLIC LISTINGS                          */
/* -------------------------------------------------------------------------- */
export async function getAllListingsPublic(queryString?: string) {
  try {
    const res = await serverFetch.get(
      `/listing/public${queryString ? `?${queryString}` : ""}`,
      {
        next: { tags: ["public-listings"] },
      }
    );

    return await res.json();
  } catch (error: any) {
    console.error("Fetch public listings failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to load public listings",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                            LISTING AI SUGGESTION                            */
/* -------------------------------------------------------------------------- */
export async function getListingSuggestion(suggestion: string) {
  try {
    const res = await serverFetch.post("/listing/suggestion", {
      body: JSON.stringify({ suggestion }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  } catch (error: any) {
    console.error("Listing suggestion failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to get suggestions",
    };
  }
}
