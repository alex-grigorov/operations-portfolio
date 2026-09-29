export type ExperienceEntry = {
  role: string;
  /** Company · location · dates — shown under the role title */
  meta?: string;
  highlights: string[];
};

export type ShowcasePlatform = "web" | "mobile";

export type ShowcaseScreenshot = {
  id: string;
  src: string;
  alt: string;
  platform: ShowcasePlatform;
  /** Shown under the enlarged image in the lightbox */
  description: string;
};

export type ProjectShowcaseChannel = {
  platform: ShowcasePlatform;
  title: string;
  /** One line under the hero preview */
  caption: string;
  heroScreenshotId: string;
};

export type ProjectShowcase = {
  summary: string;
  screenshots: ShowcaseScreenshot[];
  channels: ProjectShowcaseChannel[];
  /** Bold feature pills below the summary */
  featureHighlights?: string[];
  techStackLine?: string;
  integrationsLine?: string;
};

export type SnapSection = {
  id: string;
  label: string;
  title: string;
  tagline?: string;
  /** Shown above the main title (e.g. home hero) */
  supertitle?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  titleOnly?: boolean;
  paragraphs?: string[];
  experiences?: ExperienceEntry[];
  /** Full-width row below the 2×2 grid (horizontal rule only) */
  experienceSpotlight?: ExperienceEntry;
  projectShowcase?: ProjectShowcase;
};

export const snapSections: SnapSection[] = [
  {
    id: "home",
    label: "Home",
    supertitle: "Personal Portfolio",
    title: "Alex Grigorov",
    tagline: "Operations · Client Success · Systems",
  },
  {
    id: "introduction",
    label: "Introduction",
    title: "Introduction",
    paragraphs: [
      "I'm Alex Grigorov, based near Sofia, Bulgaria (remote-ready, fluent English). My background is high-volume operations and client-facing coordination—three years as a dispatch specialist managing live accounts, status updates, escalations, and multi-channel communication with partners and field teams under time pressure.",
      "Beyond operations, I designed and built our team's internal web platform—developing dashboards, driver workflows, and API-driven data views using Cursor and ChatGPT. I structured it with CRM principles in mind: clear records, status pipelines, automated handoffs, and instant visibility into priority tasks.",
      "I leverage HubSpot and CRM workflows to bridge operations and client retention, and I thrive in high-touch remote environments across logistics, account management, customer success, and RevOps coordination—including crypto and trading-adjacent teams that prefer Telegram and fast response times.",
    ],
  },
  {
    id: "experience",
    label: "Experience",
    title: "Professional Experience",
    experiences: [
      {
        role: "Dispatch Specialist · Operations Coordinator",
        meta: "Dispatch On Demand · Hybrid · Jun 2023 – Sep 2026 · Pernik, Bulgaria",
        highlights: [
          "Managed end-to-end account coordination and dispatch workflows for Geo Logistics LLC (US-based freight hauling operation).",
          "Primary point of contact for live accounts—status updates, schedule changes, route issues.",
          "Real-time tracking and dashboard reporting; kept account records accurate and current.",
          "High-touch phone, email, and messaging with clients, brokers, and field operators.",
          "Booked freight, negotiated rates, and closed the loop through delivery.",
        ],
      },
      {
        role: "Public Relations Coordinator",
        meta: "Workhour Ltd. · Remote · Jan 2023 – Apr 2023 · Toronto, Canada",
        highlights: [
          "Managed client-facing communication assets, campaign metrics, and stakeholder reporting.",
          "Press releases and promotional materials—accuracy and presentation mattered.",
          "Targeted distribution and deliverables aligned to client communication strategy.",
        ],
      },
      {
        role: "Gas Station Sales & Operations",
        meta: "Largo International · On-site · Mar 2018 – May 2022 · Pernik, Bulgaria",
        highlights: [
          "High-volume front-line service—POS, cash/card flows, and daily customer contact.",
          "Resolved on-site complaints calmly; kept service standards under rush periods.",
          "Inventory, forecourt safety, and accurate shift handoffs.",
        ],
      },
      {
        role: "Electrical Assembly Operator",
        meta: "AQ Electric AD · On-site · Jun 2022 – Nov 2022 · Pernik, Bulgaria",
        highlights: [
          "Precision workflows under QA standards and tight production deadlines.",
          "Cross-functional coordination to reduce line errors and bottlenecks.",
          "Accurate production and inventory logs in central tracking systems.",
        ],
      },
    ],
    experienceSpotlight: {
      role: "Systems & CRM-Adjacent Development · Operations Hub",
      highlights: [
        "Built internal platform (web + mobile) used daily—pipelines, alerts, and single source of truth for ops data.",
        "API integrations (TMS, GPS, ELD, maps)—same discipline as CRM hygiene and cross-tool sync.",
        "HubSpot CRM workflows—pipelines, lists, tasks, and automation—applied to bridge ops data and client follow-through.",
        "AI-assisted delivery (Cursor, ChatGPT)—from field requirements to production-ready tools.",
      ],
    },
  },
  {
    id: "fleet-hub",
    label: "Project",
    title: "Fleet Operations Hub Project Showcase",
    projectShowcase: {
      summary:
        "Full-stack operations platform built end-to-end. Same systems thinking applies to client ops, CRM, and remote account teams.",
      channels: [
        {
          platform: "web",
          title: "Web platform hub",
          caption: "Dispatch dashboard, live map telemetry, and ops workspace.",
          heroScreenshotId: "weekly-performance",
        },
        {
          platform: "mobile",
          title: "Mobile driver app",
          caption: "Step-by-step driver workflow—documents, arrivals, and navigation.",
          heroScreenshotId: "geo-driver-documents",
        },
      ],
      featureHighlights: [
        "Map telemetry",
        "Pipeline alerts",
        "Mobile workflow",
        "Sylectus, Samsara & pCloud integrations",
      ],
      techStackLine:
        "Tech: Next.js, React, TypeScript, REST & webhooks · Cursor & ChatGPT",
      integrationsLine:
        "APIs: Mapbox, Sylectus, Samsara, pCloud, telemetry & compliance",
      screenshots: [
        {
          id: "sign-in",
          src: "/projects/fleet-hub-sign-in.png",
          alt: "Fleet hub sign-in screen",
          platform: "web",
          description:
            "Authentication entry point with a live Mapbox map in the background, animating a route across the U.S. to give dispatch immediate geographic context. Three production-ready sign-in paths—one-time code, magic link, and password—each fully implemented and tested. Visual design aligns with company branding (logo, color, and typography) for a consistent operations-facing experience.",
        },
        {
          id: "operations-dashboard",
          src: "/projects/fleet-hub-dashboard.png",
          alt: "Operations workspace dashboard",
          platform: "web",
          description:
            "Operations workspace landing view: live fleet KPIs (total assets, availability, unassigned loads, trailer status), collaborative shift notes with @-mention tagging for handoffs between teams, maintenance alerts fed from Samsara (overdue service by asset), and integrated entry points to the work schedule and AI shift briefing—so dispatch starts from one consolidated screen.",
        },
        {
          id: "weekly-performance",
          src: "/projects/fleet-hub-weekly-performance.png",
          alt: "Weekly performance analytics",
          platform: "web",
          description:
            "Weekly performance module for completed load closeouts (Monday–Sunday, Eastern). Summary metrics for load count, loaded and deadhead miles, average closeout duration linked to Sylectus clearance-to-done workflow, and trailer tracking coverage. Includes unit-level load bars, loaded-versus-deadhead efficiency, multi-week trend comparison, and a trailer-level table for operational review.",
        },
        {
          id: "work-schedule",
          src: "/projects/fleet-hub-work-schedule-calendar.png",
          alt: "Work schedule calendar",
          platform: "web",
          description:
            "Full work-schedule calendar: week-by-week grids for 1st, 2nd, and 3rd shifts with assigned staff, absences and paid leave, active-shift indicator, and countdown to the next rotation. Supports copy from last week, PDF export, and in-app editing so dispatch coverage stays visible and maintainable over time.",
        },
        {
          id: "shift-briefing",
          src: "/projects/fleet-hub-shift-briefing.png",
          alt: "AI-generated shift briefing",
          platform: "web",
          description:
            "AI-assisted shift briefing panel summarizing fleet disposition (on load, on duty, off duty) with freshness status and regeneration when data is stale. Expandable sections cover weather and road conditions, fuel, Sylectus compliance dates, completed loads, trailer yard status, and external market intelligence—giving each shift a structured operational snapshot before work begins.",
        },
        {
          id: "fleet-map",
          src: "/projects/fleet-hub-fleet-map.png",
          alt: "Fleet Map operations view",
          platform: "web",
          description:
            "Fleet Map workspace over a live Mapbox basemap with real-time asset pins. Unit cards expose trip data (PRO/TO, references, origin and destination, appointments) and one-click actions for CDL/ID, phone, residence, turn-by-turn to the next stop, broker email drafts, and hours-of-service. Includes Active Fleet and Unassigned Loads tabs, Sylectus sync, working filters and search, a draggable/closable unit list, a custom planning sheet for dispatch sort order, and an MX tab for Mexican freight moved on partner carriers.",
        },
        {
          id: "map-layer-filters",
          src: "/projects/fleet-hub-map-layers.png",
          alt: "Fleet Map layer and status filters",
          platform: "web",
          description:
            "Map layer panel for toggling truck and trailer visibility by operational status—on load, on duty, available, planned, busy, off duty—and trailer states such as paired, not paired, reloaded, empty, and pending. Supports light map styling with live counts so dispatch can filter the map to the assets that matter for the current decision.",
        },
        {
          id: "map-overlays",
          src: "/projects/fleet-hub-map-overlays.png",
          alt: "Map style and overlay controls",
          platform: "web",
          description:
            "Map presentation controls: Light, Dark, and Satellite basemaps plus operational overlays. Optional route-and-weather context when opening a truck detail, and traffic layers including flow, incidents, truck stops, border crossings, and customer locations—configurable per dispatcher preference.",
        },
        {
          id: "map-search",
          src: "/projects/fleet-hub-map-search.png",
          alt: "Map location search",
          platform: "web",
          description:
            "Geographic search with autocomplete over the Mapbox map. Dispatch can jump to a city, address, or point of interest, then evaluate coverage from that location instead of panning manually across regions.",
        },
        {
          id: "nearest-units",
          src: "/projects/fleet-hub-nearest-units.png",
          alt: "Nearest units by status",
          platform: "web",
          description:
            "After choosing a location, the hub lists the closest units filtered by selected status (for example available trucks), with distance from the search point—supporting rapid assignment and coverage checks without leaving the map.",
        },
        {
          id: "unassigned-loads",
          src: "/projects/fleet-hub-unassigned-loads.png",
          alt: "Unassigned loads panel",
          platform: "web",
          description:
            "Unassigned Loads queue with origin/destination, appointment windows, mileage, service type, and availability versus planned status. Gives dispatch a dedicated lane to match open freight to fleet capacity from the same Fleet Map screen.",
        },
        {
          id: "completed-shipments",
          src: "/projects/fleet-hub-completed-shipments.png",
          alt: "Completed shipments closeout history",
          platform: "web",
          description:
            "Completed Shipments module for closeout history and follow-ups: searchable records by unit, PRO, driver, trailer, and customer; date-range filters; KPI counts (total, weekly, monthly); and trip metrics including deadhead versus loaded miles, transit time, duration, and accessorized status for post-delivery review.",
        },
        {
          id: "trailer-management",
          src: "/projects/fleet-hub-trailer-management.png",
          alt: "Trailer Management yard matrix",
          platform: "web",
          description:
            "Trailer Management view: yard and customer locations in a status matrix (reloaded, pending, empty, dropped, stale) with live counts, search and filters, export, yard-check upload with a working yard-report reader, custom trailer tracking, and drop-trailer workflows. Highlights trailers sitting too long and supports ping visibility for driver follow-up.",
        },
        {
          id: "trailer-driver-ping",
          src: "/projects/fleet-hub-trailer-actions.png",
          alt: "Trailer actions and driver ping menu",
          platform: "web",
          description:
            "Per-trailer actions: change status, update drop location, copy a maps link, edit notes, recover a trailer, and Ping to Geo Driver—pushing status, exact drop location, and assisted navigation to the driver mobile app so field teams get the same context dispatch sees on the desk.",
        },
        {
          id: "compliance-import",
          src: "/projects/fleet-hub-compliance-import.png",
          alt: "Sylectus compliance report import",
          platform: "web",
          description:
            "Compliance Import module: upload daily Sylectus compliance reports (CSV, XLSX, XLS) via drag-and-drop or file picker. Parsed data refreshes fleet compliance dates across the hub so asset and driver due dates stay aligned with TMS exports without manual re-entry.",
        },
        {
          id: "settings-display",
          src: "/projects/fleet-hub-settings-display.png",
          alt: "Settings display and navigation preferences",
          platform: "web",
          description:
            "Settings — display and navigation: timezone, 12/24-hour clock, seconds on timestamps, date format, cursor style, panel versus tab-bar navigation, default Fleet Map sidebar state, and Light/Dark map theme—saved per user for a consistent workspace.",
        },
        {
          id: "settings-fleet-map",
          src: "/projects/fleet-hub-settings-fleet-map.png",
          alt: "Settings fleet map and trailer preferences",
          platform: "web",
          description:
            "Settings — Fleet Map and trailers: North America map lock, trailer layer default, truck status filters, default sidebar card filters (including MX visibility), sidebar sort order (auto by status, custom drag order, or Sylectus appointment time), and Trailer Management layout (standard navigator versus spreadsheet grid).",
        },
        {
          id: "settings-admin",
          src: "/projects/fleet-hub-settings-admin.png",
          alt: "Settings notifications and administration",
          platform: "web",
          description:
            "Settings — notifications and administration: alert sounds with team sound library, desktop notifications, trailer view preferences, customer accessorial reference for Sylectus/Ascent entry, and Team & User Management for invites, roles, and access control across the platform.",
        },
        {
          id: "driver-app-control",
          src: "/projects/fleet-hub-driver-app-control.png",
          alt: "Geo Driver App control center",
          platform: "web",
          description:
            "Geo Driver App Control Center: review driver submissions from the mobile app—load documents, asset inspections, fuel receipts, and reports—with search and filters by driver, truck, PRO, type, and date. Access management ties field users to what they can upload; document retention and expiry are tracked for dispatch review.",
        },
        {
          id: "notifications-alerts",
          src: "/projects/fleet-hub-notifications.png",
          alt: "Notifications bell and ETA alerts",
          platform: "web",
          description:
            "In-app notification center: bell badge for unread alerts, ETA-late and operational events with unit, trailer, PRO/TO context, timestamps, mark-all-read and clear-all, plus history—so dispatch sees exceptions without refreshing every screen.",
        },
        {
          id: "geo-driver-sign-in",
          src: "/projects/geo-driver-sign-in-code.png",
          alt: "Geo Driver mobile sign-in",
          platform: "mobile",
          description:
            "Geo Driver (Android and iOS): passwordless sign-in with a one-time code sent to the driver’s email, branded login over a map backdrop—aligned with the same fleet identity as the dispatch hub.",
        },
        {
          id: "geo-driver-home",
          src: "/projects/geo-driver-home.png",
          alt: "Geo Driver home screen",
          platform: "mobile",
          description:
            "Driver home: welcome profile, current load PRO, assigned truck and trailer, and quick entry to Documents, Trailer Inspection, Trip Log, and Map—everything a driver needs from one screen.",
        },
        {
          id: "geo-driver-documents",
          src: "/projects/geo-driver-documents.png",
          alt: "Geo Driver document upload by stop",
          platform: "mobile",
          description:
            "Document upload flow: choose which stop or general load folder paperwork belongs to (pickup, delivery, or load-level), then upload from the device—so dispatch receives files tied to the correct PRO and stop.",
        },
        {
          id: "geo-driver-load-stops",
          src: "/projects/geo-driver-load-stops.png",
          alt: "Geo Driver load stops and arrive",
          platform: "mobile",
          description:
            "Load stops view for the active PRO: pickup and delivery sequence with Arrive actions that notify dispatch when the driver reaches a stop—closing the loop between field activity and the operations desk.",
        },
        {
          id: "geo-driver-inspection-front",
          src: "/projects/geo-driver-inspection-front.png",
          alt: "Geo Driver trailer inspection walkthrough front",
          platform: "mobile",
          description:
            "Guided trailer inspection (18-step walkthrough): step-by-step prompts, required photo capture, OK/Issue marking, and progress tracking—example step for baseline front photos and lights.",
        },
        {
          id: "geo-driver-inspection-rear",
          src: "/projects/geo-driver-inspection-rear.png",
          alt: "Geo Driver trailer inspection walkthrough rear",
          platform: "mobile",
          description:
            "Same inspection workflow for rear baseline photos—license plate and tail lights—with multi-photo support per stop and navigation between steps until the walkthrough is complete.",
        },
        {
          id: "geo-driver-map-search",
          src: "/projects/geo-driver-map-search.png",
          alt: "Geo Driver map search",
          platform: "mobile",
          description:
            "In-app map with live search and autocomplete (cities, addresses, POIs). Drivers can find destinations without leaving the app, with standard zoom and recenter controls.",
        },
        {
          id: "geo-driver-map-destination",
          src: "/projects/geo-driver-map-destination.png",
          alt: "Geo Driver destination and navigation launch",
          platform: "mobile",
          description:
            "After selecting a result, the destination sheet shows the full address with Navigate for in-app turn-by-turn or Open in Google Maps when the driver prefers an external navigator.",
        },
        {
          id: "geo-driver-navigation",
          src: "/projects/geo-driver-navigation.png",
          alt: "Geo Driver turn-by-turn navigation",
          platform: "mobile",
          description:
            "Active navigation: voice-ready turn instructions, distance to maneuver, route on map, ETA, remaining time and miles, and quick exit—built for over-the-road trips, not just short hops.",
        },
        {
          id: "geo-driver-navigation-menu",
          src: "/projects/geo-driver-navigation-menu.png",
          alt: "Geo Driver navigation options menu",
          platform: "mobile",
          description:
            "Navigation menu during a route: preview route, step-by-step directions, share trip, mute voice, hand off to Google Maps, navigation settings, and exit—giving drivers flexibility without losing trip context.",
        },
      ],
    },
  },
  {
    id: "contact",
    label: "Contact",
    title: "Contact Me",
  },
];
