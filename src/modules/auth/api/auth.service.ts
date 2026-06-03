import apiClient from "@/lib/api/client";
import type {
	JwtPayload,
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
} from "@/modules/auth/types";

export const authService = {
	async login(payload: LoginRequest): Promise<LoginResponse> {
		const response = await apiClient.post<LoginResponse>(
			"/auth/login",
			payload,
		);

		return response.data;
	},

	async signup(register: RegisterRequest): Promise<RegisterResponse> {
		const response = await apiClient.post<RegisterResponse>(
			"/auth/signup",
			register,
		);

		return response.data;
	},

	async logout(): Promise<void> {
		await apiClient.delete("/auth/logout");
	},

	async me(): Promise<JwtPayload> {
		const response = await apiClient.get<JwtPayload>("/auth/me")
		return response.data;
	}
};
