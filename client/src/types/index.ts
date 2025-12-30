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

export enum NotificationType {
  SURPLUS_AVAILABLE = 'surplus_available',
  PICKUP_CLAIMED = 'pickup_claimed',
  PICKUP_COMPLETED = 'pickup_completed',
  URGENT_REMINDER = 'urgent_reminder',
  STATUS_UPDATE = 'status_update'
}

export interface OperatingHours {
  [key: string]: {
    open: string;
    close: string;
    isOpen: boolean;
  };
}

export interface CapacityInfo {
  maxPickupWeight: number;
  vehicleType: string;
  storageCapacity: number;
  servingCapacity: number;
}

export interface User {
  _id: string;
  email: string;
  role: UserRole;
  organizationName: string;
  contactPhone?: string;
  location: Location;
  address: Address;
  operatingHours?: OperatingHours;
  capacityInfo?: CapacityInfo;
  reliabilityScore: number;
  isActive: boolean;
  notificationPreferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SurplusReport {
  _id: string;
  providerId: User | string;
  foodType: string;
  description?: string;
  estimatedQuantity: string;
  pickupLocation: Location;
  pickupAddress: Address;
  availableFrom: string;
  availableUntil: string;
  status: SurplusStatus;
  specialInstructions?: string;
  actualQuantityCollected?: string;
  claimedBy?: User | string;
  claimedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  timeRemaining?: number;
  urgencyLevel?: 'low' | 'medium' | 'high';
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
  radius?: number;
}

export interface SurplusFilters extends GeographicQuery {
  status?: SurplusStatus;
  foodType?: string;
}

export interface NotificationPayload {
  title: string;
  body: string;
  data?: Record<string, any>;
  urgency?: 'low' | 'normal' | 'high';
}

export interface SocketEvent {
  type: string;
  payload: any;
  timestamp: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  organizationName: string;
  contactPhone?: string;
  address: Address;
  coordinates: [number, number];
  operatingHours?: OperatingHours;
  capacityInfo?: CapacityInfo;
}

export interface SurplusForm {
  foodType: string;
  description?: string;
  estimatedQuantity: string;
  pickupAddress: Address;
  coordinates: [number, number];
  availableFrom: string;
  availableUntil: string;
  specialInstructions?: string;
}

export interface ProfileUpdateForm {
  organizationName?: string;
  contactPhone?: string;
  address?: Address;
  coordinates?: [number, number];
  operatingHours?: OperatingHours;
  capacityInfo?: CapacityInfo;
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}
