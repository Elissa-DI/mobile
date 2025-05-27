import apiClient from "@/lib/apiClient";
import { SignupData, User } from "@/types/user";

export const loginUser = async (username: string): Promise<User> => {
    try {
        const response = await apiClient.get<User[]>(`/users`, {
            params: { username },
        });

        if (response.data.length === 0) {
            throw new Error("User not found");
        }

        return response.data[0];
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || "Login failed");
    }
};

export async function signup(data: SignupData): Promise<void> {
  try {
    const response = await apiClient.post("/users", data);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Signup failed with status ${response.status}`);
    }
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Signup failed";
    throw new Error(message);
  }
}
