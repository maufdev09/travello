/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export async function loginUser(
  _currentState: any,
  formData: FormData
): Promise<any> {
  // Login logic here

  try {
    const loginDtata = {
    
        email: formData.get("email") as string,
         password: formData.get("password") as string,

    };


    const res = await fetch("http://localhost:5000/api/v1/auth/login",
        {
            method: "POST",
            body: JSON.stringify(loginDtata),
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => res.json());

    return res;
   

  } catch (error) {
    console.error("Registration failed:", error);
    return { success: false, message: "Registration failed" };
  
  }
}
