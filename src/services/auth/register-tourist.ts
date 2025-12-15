/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export async function registerTourist(
  _currentState: any,
  formData: FormData
): Promise<any> {
  // Registration logic here

  try {
    const registerDtata = {
      password: formData.get("password") as string,
      data: {
        email: formData.get("email") as string,
        name: formData.get("name") as string,
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerDtata));

    const res = await fetch("http://localhost:5000/api/v1/user/create-tourist",
        {
            method: "POST",
            body: newFormData,
        }
    ).then((res) => res.json());

    return res;
   

  } catch (error) {
    console.error("Registration failed:", error);
    return { success: false, message: "Registration failed" };
  
  }
}
