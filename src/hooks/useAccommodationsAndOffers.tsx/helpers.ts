import { Accommodation, Offer } from '@windingtree/glider-types/types/win';
import { OfferRecord } from 'src/store/types';

enum PassengerType {
  child = 'CHD',
  adult = 'ADT'
}

export interface AccommodationWithId extends Accommodation {
  id: string;
}

export const getActiveAccommodations = (
  accommodations: Accommodation[],
  offers: Offer[]
) => {
  if (!accommodations || !offers) return [];

  const idsActiveAccommodations = offers?.map((offer) => {
    const accommodationId = Object.keys(offer.pricePlansReferences)[0];
    return accommodationId;
  });

  const uniqueIdsActiveAccommodations = [...new Set(idsActiveAccommodations)];

  const activeAccommodations = accommodations.filter((accommodation) => {
    return uniqueIdsActiveAccommodations.includes(accommodation.id as string);
  });

  return activeAccommodations;
};

export const normalizeAccommodations = (accommodations: Record<string, Accommodation> | undefined): AccommodationWithId[] => {
  if (!accommodations) return [];

  const normalizedData = Object.entries(accommodations).map<AccommodationWithId>(([key, value]) => ({
    id: key,
    ...value
  }));

  return normalizedData;
};

export const normalizeOffers = (offers: Record<string, Offer>): OfferRecord[] => {
  if (!offers) return [];

  const normalizedData = Object.entries(offers).map<OfferRecord>(([key, value]) => ({
    id: key,
    ...value
  }));

  return normalizedData;
};

export const getPassengersBody = (adultCount: number, childrenCount: number) => {
  const adults = {
    type: PassengerType.adult,
    count: adultCount
  };
  const passengers = [adults];

  if (childrenCount && childrenCount != 0) {
    const children = {
      type: PassengerType.child,
      count: childrenCount,
      childrenAges: Array.from({ length: childrenCount }, () => 13)
    };
    passengers.push(children);
  }

  return passengers;
};

export const getOffersById = (offers: OfferRecord[], accommodationId: string): OfferRecord[] => {
  if (!accommodationId) return [];

  const matchedOffers = offers.filter(
    offer => {
      return accommodationId === Object.keys(offer.pricePlansReferences)[0];
    }
  );

  return matchedOffers;
};

export const getAccommodationById = (accommodations, id) => {
  if (!id) return null;

  const selectedAccommodation = accommodations?.find((accommodation) => accommodation.id);

  return selectedAccommodation;
};