import type {
  WinAccommodation,
  Offer,
  WinPricedOffer,
  BookingsAuthResponse,
  OrganizerInformation,
  OfferIdAndQuantity
} from '@windingtree/glider-types/dist/win';
import type { NetworkInfo, CryptoAsset } from '@windingtree/win-commons/dist/types';
import type {
  Web3ModalProvider,
  Web3ModalSignInFunction,
  Web3ModalSignOutFunction
} from '../hooks/useWeb3Modal';

export interface GenericStateRecord {
  id: string;
  [key: string]: unknown;
}

export type OfferRecord = Offer & GenericStateRecord;
export type FacilityRecord = WinAccommodation & GenericStateRecord;

export interface Address {
  addressLine: string[];
  country: string;
  city: string;
  state: string;
  postalCode: string;
  premise: string;
}

export interface Phone {
  areaCityCode: string;
  countryAccessCode: string;
  phoneNumber: string;
}

export interface Amenity {
  name: string;
  description: string;
  otaCode: string;
}

export interface MaximumOccupancy {
  adults: number;
  children: number;
}

export interface RoomCustomData {
  roomId: string;
  rateId: string;
  rateName: string;
  rateDescription: string;
  roomName: string;
}

export interface Policies {
  [key: string]: string;
}

export interface CheckInOutPolicy {
  checkOutTime: `${number}:${number}:${number}`;
  checkInTime: `${number}:${number}:${number}`;
}
export interface PersonalInfo {
  firstname: string;
  lastname: string;
  birthdate: Date | null;
  email: string;
  phone: string;
}

export interface CheckOut extends WinPricedOffer {
  personalInfo?: PersonalInfo;
  facilityId: string;
}

export interface SearchParams {
  place: string;
  arrival: string;
  departure: string;
  roomCount: number;
  children: number;
  adults: number;
}

export interface BookingInfoType {
  invoice?: boolean;
  facilityId?: string;
  date?: {
    arrival: Date;
    departure: Date;
  };
  offers?: OfferIdAndQuantity[];
  guestCount?: number;
}

export interface State {
  isConnecting: boolean;
  provider?: Web3ModalProvider;
  signIn?: Web3ModalSignInFunction;
  signOut?: Web3ModalSignOutFunction;
  account?: string;
  facilities: FacilityRecord[];
  offers: OfferRecord[];
  authentication: {
    token?: string;
    timestamp: number;
  };
  organizerInfo?: OrganizerInformation;
  bookingInfo?: BookingInfoType;
  checkout?: CheckOut;
  selectedNetwork?: NetworkInfo;
  selectedAsset?: CryptoAsset;
  searchParams?: SearchParams;
  selectedFacilityId?: string;
  walletAuth?: BookingsAuthResponse;
  [key: string]: unknown | GenericStateRecord[];
}
