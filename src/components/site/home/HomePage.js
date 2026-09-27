'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePublicSite from '@/hooks/usePublicSite';
import { fetchHome, selectHome } from '@/store/reducers/homeSlice';
import { HOUSE_ADS } from '@/config/site/home';
import { Container } from '@/components/site/ui';
import { Alert } from '@/components/ui';
import AdSlot from './AdSlot';
import AppLinks from './AppLinks';
import Attractions from './Attractions';
import CategoryStrip from './CategoryStrip';
import CityListings from './CityListings';
import FindServices from './FindServices';
import Headlines from './Headlines';
import HeroSection from './HeroSection';
import MoreCities from './MoreCities';
import PopularServices from './PopularServices';
import Products from './Products';
import QuickRequest from './QuickRequest';
import Theatres from './Theatres';
import TopTrending from './TopTrending';
import TrendingNews from './TrendingNews';
import VideoAds from './VideoAds';

/** The home page (PHP site: views/pages/index.php), section by section. */
export default function HomePage() {
  const dispatch = useDispatch();
  const { site, links } = usePublicSite();
  const { data, error } = useSelector(selectHome);
  const city = data?.city ?? site?.city ?? '';
  const ads = data?.ads ?? [];

  useEffect(() => {
    dispatch(fetchHome());
  }, [dispatch]);

  return (
    <>
      {site?.showHeadlines && <Headlines items={data?.headlines} links={links} />}
      <HeroSection site={site} links={links} ads={ads} />
      {error && (
        <Container className="mt-6">
          <Alert tone="error">Some of this page could not be loaded: {error}</Alert>
        </Container>
      )}
      <CategoryStrip links={links} />
      <PopularServices links={links} />
      <AppLinks />
      <Theatres city={city} cinemas={data?.cinemas} />
      <TrendingNews news={data?.news} />
      <Products />
      <Container className="pt-[50px] pb-5">
        <AdSlot ads={ads} fallback={HOUSE_ADS.services} />
      </Container>
      <FindServices links={links} counts={data?.serviceCounts} />
      <Container className="pt-[100px] pb-5">
        <AdSlot ads={ads} fallback={HOUSE_ADS.cities} />
      </Container>
      <CityListings />
      <QuickRequest />
      <Container className="pt-[85px] pb-5">
        <AdSlot ads={ads} fallback={HOUSE_ADS.trending} />
      </Container>
      <TopTrending listings={data?.trending} city={city} />
      <VideoAds videos={data?.videos} />
      <Attractions city={city} attractions={data?.attractions} />
      <MoreCities />
    </>
  );
}
