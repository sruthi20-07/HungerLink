// -------------------- LOCATION --------------------

export interface Location {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

// -------------------- ADDRESS --------------------

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// -------------------- USER ROLES --------------------

export enum UserRole {
  FOOD_PROVIDER = "food_provider",
  FOOD_RECIPIENT = "food_recipient",
  ADMIN = "admin"
}

// -------------------- SURPLUS STATUS --------------------

export enum SurplusStatus {
  AVAILABLE = "available",
  CLAIMED = "claimed",
  COMPLETED = "completed",
  EXPIRED = "expired",
  CANCELLED = "cancelled"
}

// -------------------- NOTIFICATION TYPES --------------------

export enum NotificationType {
  SURPLUS_AVAILABLE = "surplus_available",
  PICKUP_CLAIMED = "pickup_claimed",
  PICKUP_COMPLETED = "pickup_completed",
  URGENT_REMINDER = "urgent_reminder",
  STATUS_UPDATE = "status_update"
}

// -------------------- GENERIC API RESPONSE --------------------

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
