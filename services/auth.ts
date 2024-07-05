// import { redirect } from "next/dist/server/api-utils";
// import { useRouter } from "next/navigation";
// export async function signInUser(email: string, password: string) {
//   try {
//     const response = await fetch("http://localhost:5000/api/v1/auth/signin", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//       credentials: "include",
//     });

//     const { message, user } = await response.json();

//     if (response.ok) {
//       console.log(message); // Handle success
//       console.log("User Info:", user);
//     } else {
//       throw new Error("Error signin in");
//     }
//   } catch (error) {
//     throw new Error("Invalid credentials");
//   }
// }

// export const signUpUser = async (
//   email: string,
//   password: string
// ): Promise<void> => {
//   try {
//     const response = await fetch("http://localhost:5000/api/v1/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//       credentials: "include",
//     });

//     const result = await response.json();

//     if (response.ok) {
//       console.log(result.message); // Handle success
//       // Return the redirect URL from the result
//       return result.redirectUrl || "/";
//     } else {
//       console.error("Sign-up failed:", result.error);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
