// POST /auth/login
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
}

// POST /auth/register
export interface RegisterRequest {
  // Organization
  name: string
  ruc: string
  dv: string
  contact_email: string
  // User
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
  organization: Organization
  user: User
}

// POST /auth/refresh — refresh_token viaja por cookie httpOnly, no body
export interface RefreshTokenResponse {
  message: string
}

// DELETE /auth/logout — refresh_token viaja por cookie httpOnly
export interface LogoutResponse {
  message: string
}

// Shared entities
export interface Organization {
  id: string
  name: string
  ruc: string
  dv: string
  contact_email: string
  is_active: boolean
  created_at: string
}

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  is_active: boolean
  created_at: string
}

// JWT access token payload (decoded)
export interface JwtPayload {
  userId: string
  organizationId: string
  email: string
  firstName: string
  lastName: string
  isActive: boolean
  role: string
}
