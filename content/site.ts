/**
 * Personal profile, navigation, social and contact configuration.
 * Facts here were verified from Kamesh Kamble's public Instagram and Facebook
 * profiles on 19 Nov 2026 (see docs/RESEARCH.md). Fields marked TODO need client input.
 */

export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kameshkamble.in').replace(/\/$/, ''), // TODO: confirm domain
  name: 'Kamesh Kamble',
  locale: 'en_IN',
  defaultDescription:
    'Kamesh Kamble (आपला कामेश) of Khed, Satara: Zilla Parishad Member, Standing Committee member and founder of Vijaya Construction. His story, public work and moments with the community.',
};

export const profile = {
  name: 'Kamesh Kamble',
  nameMarathi: 'कामेश विजया दिलीप कांबळे',
  shortMarathi: 'आपला कामेश',
  brand: 'Voice of Khed',
  base: 'Khed, Satara, Maharashtra',
  roles: [
    { title: 'Zilla Parishad Member', org: 'Satara', detail: 'Standing Committee Member' },
    { title: 'Owner & CEO', org: 'Vijaya Construction', detail: 'Since March 2023' },
  ],
  /** His own published slogan (Instagram bio). */
  motto: 'For the People · With the People',
  /** Proposed brand line. Awaiting client approval (docs/RESEARCH.md §5). */
  tagline: 'Building Khed. Serving Satara.',
  education: [
    { institution: 'D. Y. Patil College of Engineering and Technology, Kolhapur', note: 'School year 2009' },
    { institution: 'Maharaja Sayajirao Vidyalaya', note: 'School year 2006' },
  ],
  portrait: {
    src: '/assets/profile/kamesh-kamble-portrait-1055.webp' as string | undefined,
    srcSet:
      '/assets/profile/kamesh-kamble-portrait-480.webp 480w, /assets/profile/kamesh-kamble-portrait-768.webp 768w, /assets/profile/kamesh-kamble-portrait-1055.webp 1055w',
    width: 1055,
    height: 1491,
    position: 'center 14%',
    alt: 'Kamesh Kamble in a white cap and rust-brown shirt',
    placeholderLabel: 'Approved portrait goes here',
  },
  aboutPortrait: {
    src: undefined as string | undefined,
    alt: 'Kamesh Kamble meeting citizens',
    placeholderLabel: 'Candid photo · citizen outreach',
  },
  /** Values reflected in his own posts. Wording is ours and should be reviewed with the client. */
  /** In his voice. Draft for approval. */
  values: [
    { title: 'Listen first', text: 'I go to people before I ask them to come to me. Problems are clearer when you see them yourself.' },
    { title: 'Education changes everything', text: 'Dr. Babasaheb Ambedkar showed us that education is the strongest tool for change. Every child deserves that chance.' },
    { title: 'Work, not promises', text: 'People don’t need more assurances. They need the road fixed, the drain cleared, the light working.' },
    { title: 'Room for everyone to rise', text: 'Young people, sportspersons and women entrepreneurs: when they grow, the whole community grows.' },
  ],
};

export const nav = [
  { href: '/about/', label: 'My Story' },
  { href: '/public-life/', label: 'In the Community' },
  { href: '/ventures/', label: 'Enterprise' },
  { href: '/gallery/', label: 'Moments' },
  { href: '/media/', label: 'Media' },
];

/**
 * Story copy, written in Kamesh Kamble's own voice (first person).
 * DRAFT: every line below is based on verified facts, but the wording must be
 * read and approved by Kamesh sir before launch. Edit freely; the design adapts.
 */
export const story = {
  greeting: 'नमस्कार, मी कामेश.',
  heroRoles: ['Representative', 'Builder', 'Neighbour'],
  heroLine: 'I serve the people of Satara on the Zilla Parishad, and I build for a living. Both start with the same thing: showing up.',
  statement:
    'I grew up in Khed. Today I carry its questions into the Zilla Parishad and turn its needs into work you can see on the ground.',
  statementEmphasis: ['Khed', 'ground'],
  roles: [
    {
      kicker: 'In public office',
      title: 'The Representative',
      text: 'As a member of the Satara Zilla Parishad and its Standing Committee, I take what I hear in our villages and neighbourhoods to the table where decisions are made, and I follow up until it moves.',
      href: '/public-life/',
      cta: 'See my public work',
    },
    {
      kicker: 'In enterprise',
      title: 'The Builder',
      text: 'In March 2023 I started Vijaya Construction in Khed. We work as government contractors, builders and developers, because I believe development should be built by people who live with the results.',
      href: '/ventures/vijaya-construction/',
      cta: 'About Vijaya Construction',
    },
    {
      kicker: 'In the community',
      title: 'The Neighbour',
      text: 'Students on Student Day, young cricketers on a turf at night, families in an apartment complex with a drainage problem: the best part of this work is the people I meet doing it.',
      href: '/gallery/',
      cta: 'See the moments',
    },
  ],
  closing: 'Let’s build Khed together.',
};

export const social = {
  instagram: {
    label: 'Instagram',
    handle: '@kamesh_kamble_voice_of_khed',
    url: 'https://www.instagram.com/kamesh_kamble_voice_of_khed/',
  },
  facebook: {
    label: 'Facebook',
    handle: 'Kamesh Kamble',
    url: 'https://www.facebook.com/kamesh.kamble.58',
  },
};

export const contact = {
  email: undefined as string | undefined, // TODO: official email
  phone: undefined as string | undefined, // TODO: official phone, E.164 e.g. '+9198XXXXXXXX'
  whatsapp: undefined as string | undefined, // TODO: official WhatsApp Business number, digits only
  officeAddress: undefined as string | undefined, // TODO: confirmed office address
  region: 'Khed, Satara, Maharashtra',
  enquiryTypes: ['General enquiry', 'Vijaya Construction · project enquiry', 'Collaboration', 'Citizen concern', 'Media'],
};

/** Verified milestones only (Facebook / Instagram). Add more once confirmed. */
export const milestones = [
  { year: '2006', title: 'School years', text: 'Finished school at Maharaja Sayajirao Vidyalaya.' },
  { year: '2009', title: 'Engineering college', text: 'D. Y. Patil College of Engineering and Technology, Kolhapur.' },
  { year: '2023', title: 'Started Vijaya Construction', text: 'Founded my own firm in Khed: government contracts, building and development.' },
  { year: 'Today', title: 'Zilla Parishad, Satara', text: 'Serving as a ZP member and on the Standing Committee.' },
];

/**
 * "Where my attention goes" — the pinned horizontal-scroll section.
 * Each area is grounded in his own posts or roles (see docs/RESEARCH.md).
 * Set `photo.src` when approved photos arrive. Wording is a draft in his voice.
 */
export const focusAreas = [
  {
    title: 'Education',
    line: 'Every child deserves the start that education gives. I back our schools and students.',
    href: 'https://www.instagram.com/kamesh_kamble_voice_of_khed/reel/DfcUWEWzgGB/',
    photo: { alt: 'Student Day at Pratapsinh High School', placeholderLabel: 'Student Day · Satara' },
  },
  {
    title: 'Civic Basics',
    line: 'Drains, roads, street lights, a bench to sit on. Small things that decide how a neighbourhood lives.',
    href: 'https://www.instagram.com/kamesh_kamble_voice_of_khed/p/Df06BbJkz-a/',
    photo: { alt: 'Meeting residents at Vikasnagar', placeholderLabel: 'Vikasnagar visit' },
  },
  {
    title: 'Youth & Sport',
    line: 'Give young people a ground and a goal, and they will surprise you.',
    href: 'https://www.instagram.com/kamesh_kamble_voice_of_khed/reel/DZl6aokCcr9/',
    photo: { alt: 'Turf cricket night tournament final', placeholderLabel: 'Turf cricket night' },
  },
  {
    title: 'Women in Enterprise',
    line: 'When women build businesses, whole families and villages move forward.',
    href: 'https://www.instagram.com/kamesh_kamble_voice_of_khed/p/Df5bo9dtPSO/',
    photo: { alt: 'Women entrepreneurs of Satara', placeholderLabel: 'Women’s enterprise' },
  },
  {
    title: 'Co-operative Strength',
    line: 'Satara’s co-operatives belong to its people. I take part and I stay involved.',
    href: 'https://www.instagram.com/kamesh_kamble_voice_of_khed/reel/DfMz0AmtcGV/',
    photo: { alt: 'Satara District Central Co-operative Bank election', placeholderLabel: 'Co-operative bank election' },
  },
  {
    title: 'Building Khed',
    line: 'Through Vijaya Construction, I build the kind of work I want to see in my own town.',
    href: '/ventures/vijaya-construction/',
    photo: { alt: 'Vijaya Construction work site', placeholderLabel: 'Vijaya Construction site' },
  },
];
