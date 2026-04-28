/**
 * MEDIA SEED SCRIPT
 * Run once: node scripts/seedMedia.js
 * This creates all named media slots in MongoDB.
 * After seeding, admin can change any photo from the admin panel.
 *
 * Photo URL format: /uploads/<filename>
 * (Copy all your Ladakh Photos into backend/uploads/ folder)
 */

require("dotenv").config();
const mongoose = require("mongoose");
const MediaConfig = require("../models/MediaConfig");

const BASE = "/uploads"; // Serve from backend /uploads/

const SEED_DATA = [
  // ═══════════════════════════════════════════════════════════
  // PAGE: Home
  // ═══════════════════════════════════════════════════════════

  // --- Section: Hero (Video + fallback image) ---
  {
    key: "home_hero_video",
    label: "Home Page — Hero Background Video",
    page: "Home",
    section: "Hero Section",
    url: "/__l5e/assets-v1/c29179ab-f679-46f1-b67f-4f345a6b077c/my-hero-video.mp4",
    mediaType: "video",
    alt: "Ladakh hero video",
    order: 1,
  },
  {
    key: "home_hero_poster",
    label: "Home Page — Hero Video Fallback / Poster Image",
    page: "Home",
    section: "Hero Section",
    url: `${BASE}/hero-ladakh.jpg`,
    mediaType: "image",
    alt: "Ladakh hero landscape",
    order: 2,
  },

  // --- Section: Group Trip Banner (large card at top of group section) ---
  {
    key: "home_group_banner",
    label: "Home Page — Group Trips Section Banner",
    page: "Home",
    section: "Group Trips Banner",
    url: `${BASE}/Landscape.jpg`,
    mediaType: "image",
    alt: "Group trips in Ladakh",
    order: 1,
  },

  // --- Section: Group Category Cards (4 cards) ---
  {
    key: "home_group_card_leh_leh",
    label: "Home Page — Group Card: Leh – Leh Route",
    page: "Home",
    section: "Group Category Cards",
    url: `${BASE}/Leh City 4.jpg`,
    mediaType: "image",
    alt: "Leh - Leh group trip",
    order: 1,
  },
  {
    key: "home_group_card_srinagar_leh_manali",
    label: "Home Page — Group Card: Srinagar – Leh – Manali Route",
    page: "Home",
    section: "Group Category Cards",
    url: `${BASE}/Landscape (5).jpg`,
    mediaType: "image",
    alt: "Srinagar – Leh – Manali group trip",
    order: 2,
  },
  {
    key: "home_group_card_manali_leh_srinagar",
    label: "Home Page — Group Card: Manali – Leh – Srinagar Route",
    page: "Home",
    section: "Group Category Cards",
    url: `${BASE}/Baralacha pass.jpg`,
    mediaType: "image",
    alt: "Manali – Leh – Srinagar group trip",
    order: 3,
  },
  {
    key: "home_group_card_manali_leh_manali",
    label: "Home Page — Group Card: Manali – Leh – Manali Route",
    page: "Home",
    section: "Group Category Cards",
    url: `${BASE}/Nubra Valley (2).jpg`,
    mediaType: "image",
    alt: "Manali – Leh – Manali group trip",
    order: 4,
  },

  // --- Section: Personalized Trips Banner ---
  {
    key: "home_personalized_banner",
    label: "Home Page — Personalized Trips Section Banner",
    page: "Home",
    section: "Personalized Banner",
    url: `${BASE}/Pangong (6).jpg`,
    mediaType: "image",
    alt: "Personalized trips Ladakh",
    order: 1,
  },

  // --- Section: Personalized Trip Cards (8 visible cards) ---
  {
    key: "home_personalized_card_1",
    label: "Home Page — Personalized Card 1: Honeymoon Ladakh Escape",
    page: "Home",
    section: "Personalized Trip Cards",
    url: `${BASE}/Pangong (2).jpg`,
    mediaType: "image",
    alt: "Honeymoon Ladakh Escape",
    order: 1,
  },
  {
    key: "home_personalized_card_2",
    label: "Home Page — Personalized Card 2: Solo Backpacker Special",
    page: "Home",
    section: "Personalized Trip Cards",
    url: `${BASE}/Landscape (9).jpg`,
    mediaType: "image",
    alt: "Solo Backpacker Special",
    order: 2,
  },
  {
    key: "home_personalized_card_3",
    label: "Home Page — Personalized Card 3: Couple's Pangong Retreat",
    page: "Home",
    section: "Personalized Trip Cards",
    url: `${BASE}/Pangong (7).jpg`,
    mediaType: "image",
    alt: "Couple Pangong Retreat",
    order: 3,
  },
  {
    key: "home_personalized_card_4",
    label: "Home Page — Personalized Card 4: Family Heritage Tour",
    page: "Home",
    section: "Personalized Trip Cards",
    url: `${BASE}/Thiksey Monastry (2).jpg`,
    mediaType: "image",
    alt: "Family Heritage Tour",
    order: 4,
  },
  {
    key: "home_personalized_card_5",
    label: "Home Page — Personalized Card 5: Photographer's Paradise",
    page: "Home",
    section: "Personalized Trip Cards",
    url: `${BASE}/Landscape (11).jpg`,
    mediaType: "image",
    alt: "Photographer Paradise Ladakh",
    order: 5,
  },
  {
    key: "home_personalized_card_6",
    label: "Home Page — Personalized Card 6: Spiritual Monastery Trail",
    page: "Home",
    section: "Personalized Trip Cards",
    url: `${BASE}/Chemrey Monastery.jpg`,
    mediaType: "image",
    alt: "Spiritual Monastery Trail",
    order: 6,
  },
  {
    key: "home_personalized_card_7",
    label: "Home Page — Personalized Card 7: Adventure Biking Special",
    page: "Home",
    section: "Personalized Trip Cards",
    url: `${BASE}/Khardungla.jpg`,
    mediaType: "image",
    alt: "Adventure Biking Ladakh",
    order: 7,
  },
  {
    key: "home_personalized_card_8",
    label: "Home Page — Personalized Card 8: Luxury Leh Stay",
    page: "Home",
    section: "Personalized Trip Cards",
    url: `${BASE}/Leh Palace (2).jpg`,
    mediaType: "image",
    alt: "Luxury Leh Stay",
    order: 8,
  },

  // --- Section: Customized Trip Banner ---
  {
    key: "home_customized_banner",
    label: "Home Page — Customized Trip Section Banner",
    page: "Home",
    section: "Customized Trip Banner",
    url: `${BASE}/Zanskar Valley.jpg`,
    mediaType: "image",
    alt: "Customized trip Ladakh",
    order: 1,
  },

  // --- Section: Journey in Frames (gallery scrollbar) — 8 photos ---
  {
    key: "home_gallery_frame_1",
    label: "Home Page — Gallery Scroll Photo 1",
    page: "Home",
    section: "Journey in Frames Gallery",
    url: `${BASE}/Landscape.jpg`,
    mediaType: "image",
    alt: "Ladakh landscape",
    order: 1,
  },
  {
    key: "home_gallery_frame_2",
    label: "Home Page — Gallery Scroll Photo 2",
    page: "Home",
    section: "Journey in Frames Gallery",
    url: `${BASE}/Pangong (6).jpg`,
    mediaType: "image",
    alt: "Pangong Tso",
    order: 2,
  },
  {
    key: "home_gallery_frame_3",
    label: "Home Page — Gallery Scroll Photo 3",
    page: "Home",
    section: "Journey in Frames Gallery",
    url: `${BASE}/Nubra Valley (2).jpg`,
    mediaType: "image",
    alt: "Nubra Valley",
    order: 3,
  },
  {
    key: "home_gallery_frame_4",
    label: "Home Page — Gallery Scroll Photo 4",
    page: "Home",
    section: "Journey in Frames Gallery",
    url: `${BASE}/Landscape (5).jpg`,
    mediaType: "image",
    alt: "Ladakh landscape",
    order: 4,
  },
  {
    key: "home_gallery_frame_5",
    label: "Home Page — Gallery Scroll Photo 5",
    page: "Home",
    section: "Journey in Frames Gallery",
    url: `${BASE}/Leh City 4.jpg`,
    mediaType: "image",
    alt: "Leh City",
    order: 5,
  },
  {
    key: "home_gallery_frame_6",
    label: "Home Page — Gallery Scroll Photo 6",
    page: "Home",
    section: "Journey in Frames Gallery",
    url: `${BASE}/Tso Moriri Lake.jpg`,
    mediaType: "image",
    alt: "Tso Moriri Lake",
    order: 6,
  },
  {
    key: "home_gallery_frame_7",
    label: "Home Page — Gallery Scroll Photo 7",
    page: "Home",
    section: "Journey in Frames Gallery",
    url: `${BASE}/Hunder (3).jpg`,
    mediaType: "image",
    alt: "Hunder Nubra",
    order: 7,
  },
  {
    key: "home_gallery_frame_8",
    label: "Home Page — Gallery Scroll Photo 8",
    page: "Home",
    section: "Journey in Frames Gallery",
    url: `${BASE}/Thiksey Monastry (4).jpg`,
    mediaType: "image",
    alt: "Thiksey Monastery",
    order: 8,
  },

  // ═══════════════════════════════════════════════════════════
  // PAGE: Ladakh (Package listing page)
  // ═══════════════════════════════════════════════════════════

  // --- Section: Top Banner Carousel (3 slides) ---
  {
    key: "ladakh_banner_slide_1",
    label: "Ladakh Page — Top Banner Carousel Slide 1",
    page: "Ladakh",
    section: "Top Banner Carousel",
    url: `${BASE}/Landscape (10).jpg`,
    mediaType: "image",
    alt: "Discover Ladakh banner 1",
    order: 1,
  },
  {
    key: "ladakh_banner_slide_2",
    label: "Ladakh Page — Top Banner Carousel Slide 2",
    page: "Ladakh",
    section: "Top Banner Carousel",
    url: `${BASE}/Pangong (11).jpg`,
    mediaType: "image",
    alt: "Discover Ladakh banner 2",
    order: 2,
  },
  {
    key: "ladakh_banner_slide_3",
    label: "Ladakh Page — Top Banner Carousel Slide 3",
    page: "Ladakh",
    section: "Top Banner Carousel",
    url: `${BASE}/Hunder (7).jpg`,
    mediaType: "image",
    alt: "Discover Ladakh banner 3",
    order: 3,
  },

  // --- Section: Itinerary Package Cards ---
  {
    key: "ladakh_card_ll1",
    label: "Ladakh Page — Package Card: Leh Sightseeing & Pangong Express (6N/7D)",
    page: "Ladakh",
    section: "Package Cards",
    url: `${BASE}/Leh City (9).jpg`,
    mediaType: "image",
    alt: "Leh Sightseeing & Pangong Express",
    order: 1,
  },
  {
    key: "ladakh_card_ll2",
    label: "Ladakh Page — Package Card: Leh – Turtuk – Hanle Adventure (9N/10D)",
    page: "Ladakh",
    section: "Package Cards",
    url: `${BASE}/Tso Moriri Lake.jpg`,
    mediaType: "image",
    alt: "Leh Turtuk Hanle Adventure",
    order: 2,
  },
  {
    key: "ladakh_card_ll3",
    label: "Ladakh Page — Package Card: Ladakh Grand Circuit (8N/9D)",
    page: "Ladakh",
    section: "Package Cards",
    url: `${BASE}/Pangong (13).jpg`,
    mediaType: "image",
    alt: "Ladakh Grand Circuit",
    order: 3,
  },
  {
    key: "ladakh_card_slm1",
    label: "Ladakh Page — Package Card: Srinagar – Leh – Manali Cross Country (10N/11D)",
    page: "Ladakh",
    section: "Package Cards",
    url: `${BASE}/Landscape (6).jpg`,
    mediaType: "image",
    alt: "Srinagar Leh Manali Cross Country",
    order: 4,
  },
  {
    key: "ladakh_card_dmls1",
    label: "Ladakh Page — Package Card: Delhi – Manali – Leh – Srinagar Expedition (11N/12D)",
    page: "Ladakh",
    section: "Package Cards",
    url: `${BASE}/Baralacha pass.jpg`,
    mediaType: "image",
    alt: "Delhi Manali Leh Srinagar Expedition",
    order: 5,
  },
  {
    key: "ladakh_card_dmlmd1",
    label: "Ladakh Page — Package Card: Delhi – Manali – Leh – Manali Round Trip (9N/10D)",
    page: "Ladakh",
    section: "Package Cards",
    url: `${BASE}/Nubra Valley (2).jpg`,
    mediaType: "image",
    alt: "Delhi Manali Leh Manali Round Trip",
    order: 6,
  },

  // ═══════════════════════════════════════════════════════════
  // PAGE: About
  // ═══════════════════════════════════════════════════════════
  {
    key: "about_banner",
    label: "About Page — Top Hero Banner Image",
    page: "About",
    section: "Hero Banner",
    url: `${BASE}/Shanti Stupa (2).jpg`,
    mediaType: "image",
    alt: "About Travel Fond",
    order: 1,
  },

  // ═══════════════════════════════════════════════════════════
  // PAGE: Why Travel Fond
  // ═══════════════════════════════════════════════════════════
  {
    key: "why_banner",
    label: "Why Travel Fond Page — Top Banner",
    page: "Why Travel Fond",
    section: "Hero Banner",
    url: `${BASE}/Landscape (15).jpg`,
    mediaType: "image",
    alt: "Why Travel Fond",
    order: 1,
  },

  // ═══════════════════════════════════════════════════════════
  // PAGE: Contact
  // ═══════════════════════════════════════════════════════════
  {
    key: "contact_banner",
    label: "Contact Page — Top Banner",
    page: "Contact",
    section: "Hero Banner",
    url: `${BASE}/Leh Market (5).jpg`,
    mediaType: "image",
    alt: "Contact Travel Fond",
    order: 1,
  },

  // ═══════════════════════════════════════════════════════════
  // PAGE: Customized Trip Builder
  // ═══════════════════════════════════════════════════════════
  {
    key: "customized_banner",
    label: "Customized Trip Page — Top Banner",
    page: "Customized",
    section: "Hero Banner",
    url: `${BASE}/Zanskar Valley.jpg`,
    mediaType: "image",
    alt: "Build your custom Ladakh trip",
    order: 1,
  },

  // ═══════════════════════════════════════════════════════════
  // PAGE: Personalized Trips
  // ═══════════════════════════════════════════════════════════
  {
    key: "personalized_banner",
    label: "Personalized Page — Top Banner",
    page: "Personalized",
    section: "Hero Banner",
    url: `${BASE}/Pangong (10).jpg`,
    mediaType: "image",
    alt: "Personalized Ladakh trips",
    order: 1,
  },

  // ═══════════════════════════════════════════════════════════
  // LOCATION DESTINATION CARDS — used across multiple pages
  // ═══════════════════════════════════════════════════════════
  {
    key: "dest_pangong",
    label: "Destination Card — Pangong Tso",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Pangong (6).jpg`,
    mediaType: "image",
    alt: "Pangong Tso Lake",
    order: 1,
  },
  {
    key: "dest_nubra",
    label: "Destination Card — Nubra Valley",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Hunder (5).jpg`,
    mediaType: "image",
    alt: "Nubra Valley Hunder Dunes",
    order: 2,
  },
  {
    key: "dest_leh",
    label: "Destination Card — Leh City",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Leh City (8).jpg`,
    mediaType: "image",
    alt: "Leh City",
    order: 3,
  },
  {
    key: "dest_tso_moriri",
    label: "Destination Card — Tso Moriri Lake",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Tso Moriri.jpg`,
    mediaType: "image",
    alt: "Tso Moriri Lake",
    order: 4,
  },
  {
    key: "dest_manali",
    label: "Destination Card — Manali (Baralacha Pass)",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Baralacha pass.jpg`,
    mediaType: "image",
    alt: "Manali Baralacha Pass",
    order: 5,
  },
  {
    key: "dest_srinagar",
    label: "Destination Card — Srinagar",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Landscape (8).jpg`,
    mediaType: "image",
    alt: "Srinagar Kashmir",
    order: 6,
  },
  {
    key: "dest_khardung_la",
    label: "Destination Card — Khardung La Pass",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Khardungla.jpg`,
    mediaType: "image",
    alt: "Khardung La High Pass",
    order: 7,
  },
  {
    key: "dest_shanti_stupa",
    label: "Destination Card — Shanti Stupa",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Shanti Stupa (2).jpg`,
    mediaType: "image",
    alt: "Shanti Stupa Leh",
    order: 8,
  },
  {
    key: "dest_thiksey",
    label: "Destination Card — Thiksey Monastery",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Thiksey Monastry (2).jpg`,
    mediaType: "image",
    alt: "Thiksey Monastery",
    order: 9,
  },
  {
    key: "dest_diskit",
    label: "Destination Card — Diskit Monastery (Nubra)",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Diskit Monastery.jpg`,
    mediaType: "image",
    alt: "Diskit Monastery Nubra Valley",
    order: 10,
  },
  {
    key: "dest_tsemo",
    label: "Destination Card — Tsemo Monastery",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Tsemo Monastery.jpg`,
    mediaType: "image",
    alt: "Tsemo Monastery Leh",
    order: 11,
  },
  {
    key: "dest_zanskar",
    label: "Destination Card — Zanskar Valley",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Zanskar Valley.jpg`,
    mediaType: "image",
    alt: "Zanskar Valley",
    order: 12,
  },
  {
    key: "dest_sangam",
    label: "Destination Card — Sangam (Indus & Zanskar Confluence)",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Sangam (2).jpg`,
    mediaType: "image",
    alt: "Sangam Indus Zanskar confluence",
    order: 13,
  },
  {
    key: "dest_lamayuru",
    label: "Destination Card — Lamayuru Moonland",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Lamayuru (2).jpg`,
    mediaType: "image",
    alt: "Lamayuru Moonland",
    order: 14,
  },
  {
    key: "dest_turtuk",
    label: "Destination Card — Turtuk Village",
    page: "Destinations",
    section: "Destination Cards",
    url: `${BASE}/Turtuk.jpg`,
    mediaType: "image",
    alt: "Turtuk Village",
    order: 15,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  let created = 0, updated = 0;
  for (const item of SEED_DATA) {
    const result = await MediaConfig.findOneAndUpdate({ key: item.key }, item, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    if (result.createdAt.getTime() === result.updatedAt.getTime()) created++;
    else updated++;
    console.log(`  [${item.key}] ✓`);
  }

  console.log(`\nDone! Created: ${created}, Updated: ${updated}, Total: ${SEED_DATA.length}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
