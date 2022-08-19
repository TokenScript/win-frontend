import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchAccommodationsAndOffers } from './api';
import {
  getAccommodationById,
  getActiveAccommodations,
  normalizeAccommodations,
  normalizeOffers,
  getOffersById
} from './helpers';

export interface SearchType {
  location: string;
  date: [string, string];
  roomCount: number;
  adultCount: number;
  childrenCount: number;
}

export const useAccommodationsAndOffers = (props: SearchType | void) => {
  const { data, refetch, error, isLoading, isFetching } = useQuery(
    ['search-accommodations'],
    async () => {
      if (!props) {
        return;
      }
      return await fetchAccommodationsAndOffers(props);
    },
    { enabled: false }
  );

  const accommodations = useMemo(
    () => normalizeAccommodations(data?.accommodations),
    [data]
  );

  const offers = useMemo(
    () => (data?.offers && normalizeOffers(data.offers)) || [],
    [data]
  );

  return {
    getOffersById,
    getAccommodationById,
    accommodations,
    activeAccommodations: getActiveAccommodations(accommodations, offers),
    coordinates: data?.coordinates,
    offers,
    refetch,
    data,
    error,
    isLoading,
    isFetching
  };
};