/**
 * NIMORAI landing page — single source of truth for ALL copy.
 * Text is kept 100% identical to the original design. Do not edit wording here
 * unless the source design changes. Sections only read from this file.
 */

export type ProductId = "token" | "nft" | "coin";

export const site = {
  meta: {
    title: "Build with NIMORAI",
    description:
      "Explore NIMORAI tools for token, NFT and coin projects, plus a dedicated blockchain development IDE.",
  },

  brand: "NIMORAI",

  notice: {
    text: "This application action is currently unavailable.",
    dismiss: "Dismiss",
    dismissAria: "Dismiss message",
  },

  nav: {
    aria: "Primary navigation",
    mobileAria: "Mobile navigation",
    links: [
      { label: "Products", href: "#products" },
      { label: "Platform", href: "#platform" },
      { label: "IDE", href: "#ide" },
      { label: "Chain", href: "#chain" },
      { label: "About", href: "#about" },
      { label: "Affiliate", href: "#affiliate" },
      { label: "FAQ", href: "#faq" },
    ],
    signIn: "Sign In",
    signUp: "Sign Up",
    signInUnavailable: "Sign In — currently unavailable",
    signUpUnavailable: "Sign Up — currently unavailable",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
  },

  hero: {
    eyebrow: "BUILD WITH NIMORAI",
    headlineLines: ["Bring your", "blockchain"],
    headlineAccent: "ideas to life.",
    description:
      "Explore tools for token, NFT and coin projects, and discover a dedicated IDE for blockchain development.",
    primary: { label: "Explore Products", href: "#products" },
    secondary: { label: "Discover the IDE", href: "#ide" },
    sceneAria:
      "Illustration of NIMORAI token, NFT and coin creation tools orbiting a luminous core",
    chips: [
      { kind: "token" as ProductId, label: "Token", detail: "Shape your project" },
      { kind: "nft" as ProductId, label: "NFT", detail: "Create a collection" },
      { kind: "coin" as ProductId, label: "Coin", detail: "Plan your network" },
    ],
    sceneLabel: ["Create", "Build", "Explore"],
  },

  products: {
    eyebrow: "Product explorer",
    title: "Start with what you want to create.",
    description: "Explore token, NFT and coin project options in one place.",
    tabsAria: "Product options",
    overviewCta: "View project overview",
    overviewText:
      "Review these planning topics while direct product access is unavailable.",
    briefLabel: "Project brief",
    briefSuffix: " configuration",
    artAria: (id: ProductId) =>
      `Concept illustration for the NIMORAI ${id} project option`,
    items: [
      {
        id: "token" as ProductId,
        label: "Token",
        title: "Shape your token project.",
        description: "Define your token identity and prepare its configuration.",
        topics: [
          "Name, symbol and visual identity.",
          "Network and configuration choices.",
          "Review and order preparation.",
        ],
        image: { src: "/assets/nimorai-art/product-token.png", width: 1536, height: 1024 },
      },
      {
        id: "nft" as ProductId,
        label: "NFT",
        title: "Bring your NFT collection together.",
        description:
          "Prepare your collection identity, artwork and project requirements.",
        topics: [
          "Collection identity.",
          "Artwork and metadata requirements.",
          "Review and order preparation.",
        ],
        image: { src: "/assets/nimorai-art/product-nft.png", width: 1536, height: 1024 },
      },
      {
        id: "coin" as ProductId,
        label: "Coin",
        title: "Plan your coin project.",
        description: "Organise your coin concept and technical requirements.",
        topics: [
          "Project identity.",
          "Network and technical requirements.",
          "Review and order preparation.",
        ],
        image: { src: "/assets/nimorai-art/product-coin.png", width: 1330, height: 1182 },
      },
    ],
  },

  workflow: {
    eyebrow: "Platform & workflow",
    title: "From your idea to a clear project brief.",
    description:
      "Choose a project, organise the details and continue in your NIMORAI workspace.",
    steps: [
      { number: "01", title: "Choose", text: "Select a token, NFT or coin project." },
      {
        number: "02",
        title: "Configure",
        text: "Add the identity and requirements relevant to your project.",
      },
      {
        number: "03",
        title: "Review",
        text: "Check the details before continuing to your order.",
      },
    ],
    preview: {
      title: "Illustrative workspace preview",
      projectType: "Project type",
      projectConfig: "Project configuration",
      identity: "Identity",
      requirements: "Requirements",
      reviewLabel: "Review summary",
      reviewValue: "Details ready for your review",
    },
    cta: "Explore the Workspace",
    closeCta: "Close Workspace Preview",
    note: "Decorative interface for project-planning context, not live account activity.",
  },

  ide: {
    eyebrow: "IDE ACCESS",
    title: "A dedicated workspace for blockchain development.",
    description: "Discover the NIMORAI IDE and purchase access through your account.",
    price: "$700",
    priceValue: 700,
    priceNote: "USD · One-time license purchase",
    facts: [
      "A dedicated IDE for blockchain development.",
      "Access instructions delivered by email after confirmed payment and successful provisioning.",
    ],
    primary: "View Purchase Details",
    secondary: "How Access Works",
    process: ["Purchase", "Payment confirmation", "Access provisioning", "Email instructions"],
    art: {
      aria: "Decorative concept illustration representing the NIMORAI IDE",
      windowLabel: "NIMORAI IDE · concept",
      file: "project.config",
    },
    dialog: {
      title: "NIMORAI IDE purchase details",
      body: "IDE access is offered for USD $700 as a one-time license purchase. Payment must be confirmed before access is provisioned. Instructions are then delivered by email.",
      close: "×",
      closeAria: "Close purchase details",
    },
  },

  chain: {
    eyebrow: "NIMORAI CHAIN",
    title: "Part of the NIMORAI ecosystem.",
    description: "Explore how NIMORAI Chain fits into the wider platform vision.",
    note: "Verified technical information will be added when available.",
    link: { label: "About NIMORAI", href: "#about" },
    aria: "Concept illustration of NIMORAI Chain within the wider platform ecosystem",
  },

  about: {
    eyebrow: "ABOUT NIMORAI",
    title: "A clearer starting point for blockchain ideas.",
    body: "NIMORAI brings project preparation and development access into one connected experience. Explore token, NFT and coin project options, organise your requirements and discover a dedicated IDE for blockchain development.",
    principlesAria: "NIMORAI product principles",
    principles: [
      { number: "01", label: "Clear project preparation" },
      { number: "02", label: "Connected development tools" },
      { number: "03", label: "Thoughtful user experience" },
    ],
  },

  team: {
    eyebrow: "Concept team · fictional profiles",
    title: "People behind the design direction.",
    note: "Illustrative profiles for design review.",
    tag: "Fictional concept profile",
    altPrefix: "AI-generated fictional concept portrait of ",
    members: [
      {
        name: "Arian Vale",
        role: "Product & Vision",
        portrait: "/assets/nimorai-art/team-arian-vale.png",
        width: 1312,
        height: 1199,
      },
      {
        name: "Maya Sen",
        role: "Design & Experience",
        portrait: "/assets/nimorai-art/team-maya-sen.png",
        width: 1312,
        height: 1199,
      },
      {
        name: "Elias Noor",
        role: "Engineering",
        portrait: "/assets/nimorai-art/team-elias-noor.png",
        width: 1374,
        height: 1145,
      },
    ],
  },

  affiliate: {
    eyebrow: "AFFILIATE PROGRAMME",
    title: "Create content. Share your code.",
    description:
      "Introduce NIMORAI to your audience with a company-assigned coupon code and guidance for creating YouTube content.",
    cta: "How the Programme Works",
    details:
      "Programme rates, eligibility and payout terms will be shown only when verified programme information is available.",
    artAria:
      "Concept illustration representing content creation and a company-assigned coupon code",
    coupon: { label: "ASSIGNED CODE", code: "NIMORAI", note: "Programme attribution" },
    steps: [
      {
        number: "01",
        title: "Get your code",
        description: "Receive your assigned coupon code through the affiliate programme.",
      },
      {
        number: "02",
        title: "Create and share",
        description: "Use the available guidance to introduce NIMORAI in your content.",
      },
      {
        number: "03",
        title: "Customer places an order",
        description: "The customer applies your code during checkout.",
      },
      {
        number: "04",
        title: "Eligible commission is recorded",
        description:
          "Commission is calculated for qualifying paid orders under the programme's configured rules.",
      },
    ],
    support: {
      title: "Content support",
      text: "Get guidance for planning YouTube videos and presenting your coupon code clearly.",
    },
  },

  faq: {
    eyebrow: "FAQ",
    title: "A few things to know.",
    description: "Practical answers about projects, IDE access and the programme.",
    items: [
      {
        question: "What can I explore with NIMORAI?",
        answer:
          "Token, NFT and coin project options, project preparation tools and access to a dedicated blockchain development IDE.",
      },
      {
        question: "Do I need to know every technical detail before starting?",
        answer:
          "You can begin by organising your project identity and requirements. The details needed depend on the project and the options available in its builder.",
      },
      {
        question: "How much does IDE access cost?",
        answer:
          "The IDE is offered at USD $700 as a one-time license purchase. Review the applicable license terms before purchasing.",
      },
      {
        question: "How do I receive IDE access?",
        answer:
          "After payment is confirmed and access is successfully provisioned, instructions are sent to the email associated with the purchase.",
      },
      {
        question: "How does the affiliate programme work?",
        answer:
          "Affiliates use company-assigned coupon codes. Qualifying paid orders using a code can generate commission under the programme's configured rules.",
      },
      {
        question: "Where can I find NIMORAI Chain technical information?",
        answer:
          "This page introduces NIMORAI Chain within the ecosystem. Use verified technical documentation when it is made available.",
      },
    ],
  },

  cta: {
    eyebrow: "CREATE · BUILD · EXPLORE",
    title: "Your next idea starts here.",
    description: "Explore your project options or discover the NIMORAI IDE.",
    primary: { label: "Explore Products", href: "#products" },
    secondary: { label: "Discover the IDE", href: "#ide" },
  },

  footer: {
    tagline: "Project preparation and development tools for blockchain ideas.",
    navAria: "Footer navigation",
    groups: [
      {
        label: "Explore",
        links: [
          { label: "Products", href: "#products" },
          { label: "Platform", href: "#platform" },
          { label: "IDE", href: "#ide" },
          { label: "Chain", href: "#chain" },
        ],
      },
      {
        label: "NIMORAI",
        links: [
          { label: "About", href: "#about" },
          { label: "Affiliate", href: "#affiliate" },
          { label: "FAQ", href: "#faq" },
        ],
      },
    ],
    copyright: "© 2026 NIMORAI",
    backToTop: "Back to top",
  },
} as const;

export type SiteContent = typeof site;

