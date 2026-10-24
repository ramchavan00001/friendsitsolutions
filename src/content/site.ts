/**
 * Central business details. Every value marked REPLACE is a placeholder —
 * update it here once and it flows through the whole site, schema markup and emails.
 */
export const site = {
  name: "FriendsITSolutions",
  shortName: "FriendsIT",
  tagline: "Your Trusted Technology Partner",
  // Alternative taglines to consider:
  //   "Technology Made Friendly"
  //   "Smart IT. Real Friends."
  //   "Building Your Digital Future, Together"
  description:
    "FriendsITSolutions is a full-service IT company offering software, web and mobile development, cloud, cybersecurity, managed IT, AI automation and digital marketing for businesses in India and worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.friendsitsolutions.com",

  // REPLACE: location
  city: "Pune",
  state: "Maharashtra",
  country: "India",
  postalCode: "411001",
  streetAddress: "Office 401, Example Business Park, FC Road",
  geo: { lat: 18.5204, lng: 73.8567 },

  // REPLACE: contact details
  phone: "+91 98765 43210",
  phoneHref: "+919876543210",
  whatsapp: "919876543210",
  email: "hello@friendsitsolutions.com",
  supportEmail: "support@friendsitsolutions.com",
  careersEmail: "careers@friendsitsolutions.com",

  // REPLACE: company facts
  founded: 2016,
  teamSize: 45,
  projectsDelivered: 500,
  clientsServed: 250,
  countriesServed: 12,

  hours: [
    { days: "Monday – Friday", time: "9:30 AM – 7:00 PM" },
    { days: "Saturday", time: "10:00 AM – 4:00 PM" },
    { days: "Sunday", time: "Closed (24/7 support for AMC clients)" },
  ],

  // REPLACE: social links
  social: {
    linkedin: "https://www.linkedin.com/company/friendsitsolutions",
    facebook: "https://www.facebook.com/friendsitsolutions",
    instagram: "https://www.instagram.com/friendsitsolutions",
    x: "https://x.com/friendsitsol",
    youtube: "https://www.youtube.com/@friendsitsolutions",
  },

  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "friendsitsolutions/30min",
  mapEmbedUrl:
    "https://www.google.com/maps?q=FC+Road+Pune&output=embed", // REPLACE with your Google Maps embed URL
} as const;

export const yearsInBusiness = new Date().getFullYear() - site.founded;

export const whatsappLink = (text = "Hi FriendsITSolutions! I'd like to discuss a project.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
