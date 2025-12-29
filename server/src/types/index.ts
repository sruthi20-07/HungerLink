export interface Location {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export enum UserRole {
  FOOD_PROVIDER = 'food_provider',
  FOOD_RECIPIENT = 'food_recipient',
  ADMIN = 'admin'
}

export enum SurplusStatus {
  AVAILABLE = 'available',
  CLAIMED = 'claimed',
  COMPLETED = 'completed',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}

export enum PickupStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum NotificationType {
  SURPLUS_AVAILABLE = 'surplus_available',
  PICKUP_CLAIMED = 'pickup_claimed',
  PICKUP_COMPLETED = 'pickup_completed',
  URGENT_REMINDER = 'urgent_reminder',
  STATUS_UPDATE = 'status_update'
}

export enum NotificationChannel {
  WEBSOCKET = 'websocket',
  PUSH = 'push',
  EMAIL = 'email'
}

export interface OperatingHours {
  [key: string]: {
    open: string;
    close: string;
    isOpen: boolean;
  };
}

export interface CapacityInfo {
  maxPickupWeight: number; // in kg
  vehicleType: string;
  storageCapacity: number;
  servingCapacity: number; // people served per day
}

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

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface GeographicQuery extends PaginationQuery {
  latitude?: number;
  longitude?: number;
  radius?: number; // in kilometers
}

export interface NotificationPayload {
  title: string;
  body: string;
  data?: Record<string, any>;
  urgency?: 'low' | 'normal' | 'high';
}