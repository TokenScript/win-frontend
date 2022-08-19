import { Text, Image } from 'grommet';
import styled from 'styled-components';
import { FacilityDetailImages } from './FacilityDetailImages';
import type { Photo, Accommodation } from '@windingtree/glider-types/types/derbysoft';
import { useParams } from 'react-router-dom';
import { useAccommodationsAndOffers } from 'src/hooks/useAccommodationsAndOffers.tsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 720px;
  gap: 8px;

  ${({ theme }) => theme.breakpoints.large} {
    flex-direction: row;
    height: 500px;
  }
`;

const FacilityMainImage = styled(Image)`
  flex: 50%;
  overflow: hidden;
  object-fit: cover;
`;

const sortByLargestImage = (images: Photo[]) => {
  if (!images?.length) return [];

  const compareImages = (itemOne: Photo, itemTwo: Photo) => {
    return itemTwo.width - itemOne.width;
  };

  const sortedImages = images?.sort(compareImages);
  return sortedImages;
};

export const FacilityIntroduction = () => {
  const { getAccommodationById, accommodations } = useAccommodationsAndOffers();
  const { id } = useParams();
  const accommodation: Accommodation = getAccommodationById(accommodations, id);
  const sortedImages = sortByLargestImage(accommodation?.media);
  const [mainImage, ...rest] = sortedImages;

  return (
    <>
      <Text weight={500} size="2rem" margin={{ bottom: '8px' }}>
        {accommodation?.name}
      </Text>

      <Container>
        <FacilityMainImage src={mainImage?.url} />
        <FacilityDetailImages images={rest} />
      </Container>
    </>
  );
};