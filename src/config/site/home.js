/**
 * Fixed content of the home page, from the PHP site's views/pages/index.php
 * and views/templates/footer.php. Links: `path` is a page of the PHP site,
 * `term` is searched in the city, `url` is another website. Images are in
 * public/assets (copied from the PHP site's assets folder).
 */

export const HERO = {
  title: ['Connect with the right', 'Service Experts'],
  subtitle: ['Find B2B & B2C businesses contact addresses, phone numbers,', 'user ratings and reviews.'],
};

/** Shown in an ad slot while no paid ad (ads_with_us) is running there. */
export const HOUSE_ADS = {
  hero: { url: 'https://learnageoverseas.com/', image: '/assets/advertise/study-mbbs1.jpg', title: 'Learnage Overseas' },
  services: { url: 'https://redback.in/', image: '/assets/advertise/red2.png', title: 'Redback IT Solutions' },
  cities: { url: 'https://redback.in/', image: '/assets/advertise/red2.png', title: 'Redback IT Solutions' },
  trending: { url: 'https://redbackstudios.in/', image: '/assets/advertise/red3.png', title: 'Redback Studios' },
};

export const POPULAR_SERVICES = [
  { label: 'Hotel Bookings', image: '/assets/images/20.webp', term: 'Hotels/95', bar: 'green' },
  { label: 'Job', image: '/assets/images/icon/job_search1.jpg', path: 'job', bar: 'green' },
  { label: 'Real Estate', image: '/assets/images/p1.webp', term: 'Real-Estate-Agency/10', bar: 'blue' },
  { label: 'Cab Booking', image: '/assets/images/ser5.webp', term: 'Travel', bar: 'green' },
  { label: 'Online Shopping', image: '/assets/images/online-shopping.webp', path: 'product/all_product', bar: 'red' },
];

export const APP_LINKS = [
  { label: 'Prime video', image: '/assets/images/prime_video.webp', url: 'https://www.primevideo.com/' },
  { label: 'Netflix', image: '/assets/images/netflex.webp', url: 'https://www.netflix.com/in/' },
  { label: 'Hotstar', image: '/assets/images/hotstar.webp', url: 'https://www.hotstar.com/in' },
  { label: 'CNN Videos', image: '/assets/images/cnn.webp', url: 'https://edition.cnn.com/videos' },
  { label: 'Zee5', image: '/assets/images/zee5.webp', url: 'https://www.zee5.com/' },
  { label: 'Sunnxt', image: '/assets/images/sunnxt.webp', url: 'https://www.sunnxt.com/' },
  { label: 'Amazon', image: '/assets/images/amazon.webp', url: 'https://www.amazon.in/' },
  { label: 'Facebook', image: '/assets/images/facebook.webp', url: 'https://www.facebook.com/' },
  { label: 'Google', image: '/assets/images/google_icon.webp', url: 'https://www.google.com/' },
];

export const PRODUCTS = [
  {
    title: 'Sugarlif LOW GI Diet Sugar',
    price: '250.00',
    image: '/assets/images/sugarlif.jpg',
    url: 'https://nutrishyam.com/products/details/sugarlif-low-gi-diet-sugar-orignal-product-of-dr-c-k-nandagopalan-diabetic-friendly-herbal-cane-sugar-free-from-chemicals-artificial-sweetener-substitute-low-glycemic-index-gi-1-kg-1',
  },
  { title: 'India that is Bharat', price: '280.00', image: '/assets/images/pro02.webp', url: 'https://velloreads.com/shopping/' },
  { title: 'Masks and faceshields', price: '230.00', image: '/assets/images/pro03.webp', url: 'https://velloreads.com/shopping/' },
  { title: 'Baby Gear', price: '4300.00', image: '/assets/images/pro04.webp', url: 'https://velloreads.com/shopping/' },
  { title: 'Fujifilm Instax Mini', price: '5,990.00', image: '/assets/images/pro05.webp', url: 'https://velloreads.com/shopping/' },
  { title: 'Masks and faceshields', price: '230.00', image: '/assets/images/pro03.webp', url: 'https://velloreads.com/shopping/' },
];

/** "Find your Services": `count` is a key of api/home.php's serviceCounts. */
export const FIND_SERVICES = [
  { label: 'Hotels & Resorts', image: '/assets/images/services/15.webp', term: 'Hotel', count: 'hotels' },
  { label: 'Hospitals', image: '/assets/images/services/13.webp', term: 'Hospital', count: 'hospitals' },
  { label: 'Transportation', image: '/assets/images/services/9.webp', term: 'Transportation', count: 'transport' },
  { label: 'Property', image: '/assets/images/services/12.webp', term: 'Property', count: 'property' },
  { label: 'Automobiles', image: '/assets/images/services/2.webp', term: 'Automobile', count: 'automobiles' },
  { label: 'Electronics', image: '/assets/images/services/6.webp', term: 'Electronics', count: 'electronics' },
  { label: 'Education', image: '/assets/images/services/16.webp', term: 'Education', count: 'education' },
  { label: 'Sports', image: '/assets/images/services/8.webp', term: 'Sport', count: 'sports' },
];

/** "Explore your City Listings": the sister sites. The first one is shown large. */
export const CITY_SITES = [
  { name: 'Chennai Ads', stats: '18 Cities . 2454 Listings', image: '/assets/images/listing/chennai1.webp', url: 'https://chennaiads.net' },
  { name: 'Arani Ads', stats: '18 Cities . 2454 Listings', image: '/assets/images/listing/arani.webp', url: 'https://araniads.com/' },
  { name: 'Gudiyatham Ads', stats: '14 Cities . 6000 Listings', image: '/assets/images/listing/gudiyatham_ads.webp', url: 'https://gudiyathamads.in/' },
  { name: 'Chittoor Ads', stats: '12 Cities . 4152 Listings', image: '/assets/images/listing/Chittoor.webp', url: 'https://chittoorads.com/' },
  { name: 'Kanchipuram Ads', stats: '24 Cities . 1152 Listings', image: '/assets/images/listing/Kanchipuram.webp', url: 'https://kanchipuramads.com/' },
];

export const QUICK_REQUEST_STEPS = [
  {
    icon: '/assets/images/icon/7.webp',
    title: 'Tell us more about your requirements',
    text: 'Imagine you have made your presence online through a local online directory, but your competitors have..',
  },
  {
    icon: '/assets/images/icon/5.webp',
    title: 'We connect with right service provider',
    text: 'Advertising your business to area specific has many advantages. For local businessmen, it is an opportunity..',
  },
  {
    icon: '/assets/images/icon/6.webp',
    title: 'Happy with our service',
    text: 'Your local business too needs brand management and image making. As you know the local market..',
  },
];

/** "Explore More Ads": pictures of other districts (the PHP page does not link them). */
export const MORE_CITIES = [
  ['Kodaikanal', 'kodaikanal'],
  ['Kumbakonam', 'kumbakonam'],
  ['Madurai', 'madurai'],
  ['Nagercoil', 'nagercoil'],
  ['Nagapattinam', 'Nagapattinam'],
  ['Namakkal', 'namakkal'],
  ['Ooty', 'ooty'],
  ['Pollachi', 'pollachi'],
  ['Pondicherry', 'pondicherry'],
  ['Pudukottai', 'pudukottai'],
  ['Ramanathapuram', 'ramanathapuram'],
  ['Salem', 'salem'],
  ['Tiruvannamalai', 'sattur'],
  ['Sirkali', 'sirkali'],
  ['Sivagangai', 'sivagangai'],
  ['Tenkasi', 'tenkasi'],
  ['Thanjavur', 'thanjavur'],
  ['Thiruvarur', 'thiruvarur'],
  ['Tirunelveli', 'tirunelveli'],
].map(([name, file]) => ({ name, image: `/assets/images/scoll-image/${file}.png` }));

export const GET_APP = {
  features: ['Find nearby listings', 'Easy service enquiry', 'Listing reviews and ratings', 'Manage your listing, enquiry and reviews'],
  playStore: 'https://play.google.com/store/apps/details?id=in.redback.groups.apps.velloreads',
};
