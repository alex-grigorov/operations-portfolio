export type ExperienceEntry = {
  role: string;
  highlights: string[];
};

export type ShowcaseScreenshot = {
  id: string;
  src: string;
  alt: string;
  /** Shown under the enlarged image in the lightbox */
  description: string;
};

export type ProjectShowcase = {
  summary: string;
  screenshots: ShowcaseScreenshot[];
};

export type SnapSection = {
  id: string;
  label: string;
  title: string;
  tagline?: string;
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
    title: "Alex Grigorov",
    tagline: "Personal Portfolio",
  },
  {
    id: "introduction",
    label: "Introduction",
    title: "Introduction",
    paragraphs: [
      "I'm Alex Grigorov, based near Sofia, Bulgaria. I have three years of experience in truck dispatching and the full range of related fleet operations—coordinating loads and drivers, working with compliance and ELD workflows, and keeping day-to-day freight moving.",
      "In my recent role, I built an internal web operations hub myself—not as a side experiment, but as the system our team used every day. I developed it with AI-assisted tools including Cursor, ChatGPT, and others, and wired in API connections to our TMS (Sylectus), fleet GPS (Samsara), ELD logs, and additional sources so dispatch and management could access everything from one place.",
      "I'm open to remote roles in logistics and in other fields as well. I'm not tied to trucking-only work: I'm willing to learn new tools and industries and to show results quickly. I have a high school education, a strong work ethic, and I'm looking for a legitimate remote team where I can contribute and grow.",
    ],
  },
  {
    id: "experience",
    label: "Experience",
    title: "Professional Experience",
    experiences: [
      {
        role: "Gas Station Sales & Forecourt Associate",
        highlights: [
          "POS—cash, card, mobile—and drawer balancing.",
          "Forecourt fueling, pumps, and safety protocols.",
          "Inventory, restocking, and facility standards.",
        ],
      },
      {
        role: "Electrical Assembly Operator",
        highlights: [
          "High-/low-voltage cabinets and panels from schematics.",
          "Wiring, terminal blocks, breakers, and relay systems.",
          "ISO-aligned inspections; crimping and line machinery.",
        ],
      },
      {
        role: "Public Relations Coordinator",
        highlights: [
          "PR research, campaign metrics, and client reporting.",
          "Press releases and media materials for news, events, and products.",
          "Quality-checked visuals; distributed to targeted outlets.",
        ],
      },
      {
        role: "Truck Dispatcher & Fleet Operations",
        highlights: [
          "Three years coordinating loads, drivers, and day-to-day fleet operations.",
          "Daily use of Sylectus (TMS), Samsara GPS, and ELD workflows.",
          "Booked shipments, negotiated rates with carriers and brokers, and tracked freight through delivery.",
        ],
      },
    ],
    experienceSpotlight: {
      role: "AI-Assisted Development · Fleet Operations Hub",
      highlights: [
        "Self-built internal web platform that unified fleet, dispatch, and compliance data in one workspace.",
        "API integrations with Sylectus (TMS), Samsara (GPS), ELD logs, and additional operational systems.",
        "End-to-end delivery using AI-assisted development (Cursor, ChatGPT)—from requirements through deployment.",
        "Production-ready sign-in, structured data views, and workflows tailored to daily dispatch operations.",
      ],
    },
  },
  {
    id: "fleet-hub",
    label: "Project",
    title: "Fleet Operations Hub Project Showcase",
    projectShowcase: {
      summary:
        "Internal fleet and dispatch platform I built with AI-assisted development—API-connected data from Sylectus, Samsara, ELD, and other systems in one workspace. Select a preview to enlarge and read what each area does.",
      screenshots: [
        {
          id: "sign-in",
          src: "/projects/fleet-hub-sign-in.png",
          alt: "Fleet hub sign-in screen",
          description:
            "Authentication entry point with a live Mapbox map in the background, animating a route across the U.S. to give dispatch immediate geographic context. Three production-ready sign-in paths—one-time code, magic link, and password—each fully implemented and tested. Visual design aligns with company branding (logo, color, and typography) for a consistent operations-facing experience.",
        },
        {
          id: "operations-dashboard",
          src: "/projects/fleet-hub-dashboard.png",
          alt: "Operations workspace dashboard",
          description:
            "Operations workspace landing view: live fleet KPIs (total assets, availability, unassigned loads, trailer status), collaborative shift notes with @-mention tagging for handoffs between teams, maintenance alerts fed from Samsara (overdue service by asset), and integrated entry points to the work schedule and AI shift briefing—so dispatch starts from one consolidated screen.",
        },
        {
          id: "weekly-performance",
          src: "/projects/fleet-hub-weekly-performance.png",
          alt: "Weekly performance analytics",
          description:
            "Weekly performance module for completed load closeouts (Monday–Sunday, Eastern). Summary metrics for load count, loaded and deadhead miles, average closeout duration linked to Sylectus clearance-to-done workflow, and trailer tracking coverage. Includes unit-level load bars, loaded-versus-deadhead efficiency, multi-week trend comparison, and a trailer-level table for operational review.",
        },
        {
          id: "work-schedule",
          src: "/projects/fleet-hub-work-schedule-calendar.png",
          alt: "Work schedule calendar",
          description:
            "Full work-schedule calendar: week-by-week grids for 1st, 2nd, and 3rd shifts with assigned staff, absences and paid leave, active-shift indicator, and countdown to the next rotation. Supports copy from last week, PDF export, and in-app editing so dispatch coverage stays visible and maintainable over time.",
        },
        {
          id: "shift-briefing",
          src: "/projects/fleet-hub-shift-briefing.png",
          alt: "AI-generated shift briefing",
          description:
            "AI-assisted shift briefing panel summarizing fleet disposition (on load, on duty, off duty) with freshness status and regeneration when data is stale. Expandable sections cover weather and road conditions, fuel, Sylectus compliance dates, completed loads, trailer yard status, and external market intelligence—giving each shift a structured operational snapshot before work begins.",
        },
        {
          id: "fleet-map",
          src: "/projects/fleet-hub-fleet-map.png",
          alt: "Fleet Map operations view",
          description:
            "Fleet Map workspace over a live Mapbox basemap with real-time asset pins. Unit cards expose trip data (PRO/TO, references, origin and destination, appointments) and one-click actions for CDL/ID, phone, residence, turn-by-turn to the next stop, broker email drafts, and hours-of-service. Includes Active Fleet and Unassigned Loads tabs, Sylectus sync, working filters and search, a draggable/closable unit list, a custom planning sheet for dispatch sort order, and an MX tab for Mexican freight moved on partner carriers.",
        },
        {
          id: "map-layer-filters",
          src: "/projects/fleet-hub-map-layers.png",
          alt: "Fleet Map layer and status filters",
          description:
            "Map layer panel for toggling truck and trailer visibility by operational status—on load, on duty, available, planned, busy, off duty—and trailer states such as paired, not paired, reloaded, empty, and pending. Supports light map styling with live counts so dispatch can filter the map to the assets that matter for the current decision.",
        },
        {
          id: "map-overlays",
          src: "/projects/fleet-hub-map-overlays.png",
          alt: "Map style and overlay controls",
          description:
            "Map presentation controls: Light, Dark, and Satellite basemaps plus operational overlays. Optional route-and-weather context when opening a truck detail, and traffic layers including flow, incidents, truck stops, border crossings, and customer locations—configurable per dispatcher preference.",
        },
        {
          id: "map-search",
          src: "/projects/fleet-hub-map-search.png",
          alt: "Map location search",
          description:
            "Geographic search with autocomplete over the Mapbox map. Dispatch can jump to a city, address, or point of interest, then evaluate coverage from that location instead of panning manually across regions.",
        },
        {
          id: "nearest-units",
          src: "/projects/fleet-hub-nearest-units.png",
          alt: "Nearest units by status",
          description:
            "After choosing a location, the hub lists the closest units filtered by selected status (for example available trucks), with distance from the search point—supporting rapid assignment and coverage checks without leaving the map.",
        },
        {
          id: "unassigned-loads",
          src: "/projects/fleet-hub-unassigned-loads.png",
          alt: "Unassigned loads panel",
          description:
            "Unassigned Loads queue with origin/destination, appointment windows, mileage, service type, and availability versus planned status. Gives dispatch a dedicated lane to match open freight to fleet capacity from the same Fleet Map screen.",
        },
        {
          id: "completed-shipments",
          src: "/projects/fleet-hub-completed-shipments.png",
          alt: "Completed shipments closeout history",
          description:
            "Completed Shipments module for closeout history and follow-ups: searchable records by unit, PRO, driver, trailer, and customer; date-range filters; KPI counts (total, weekly, monthly); and trip metrics including deadhead versus loaded miles, transit time, duration, and accessorized status for post-delivery review.",
        },
        {
          id: "trailer-management",
          src: "/projects/fleet-hub-trailer-management.png",
          alt: "Trailer Management yard matrix",
          description:
            "Trailer Management view: yard and customer locations in a status matrix (reloaded, pending, empty, dropped, stale) with live counts, search and filters, export, yard-check upload with a working yard-report reader, custom trailer tracking, and drop-trailer workflows. Highlights trailers sitting too long and supports ping visibility for driver follow-up.",
        },
        {
          id: "trailer-driver-ping",
          src: "/projects/fleet-hub-trailer-actions.png",
          alt: "Trailer actions and driver ping menu",
          description:
            "Per-trailer actions: change status, update drop location, copy a maps link, edit notes, recover a trailer, and Ping to Geo Driver—pushing status, exact drop location, and assisted navigation to the driver mobile app so field teams get the same context dispatch sees on the desk.",
        },
        {
          id: "compliance-import",
          src: "/projects/fleet-hub-compliance-import.png",
          alt: "Sylectus compliance report import",
          description:
            "Compliance Import module: upload daily Sylectus compliance reports (CSV, XLSX, XLS) via drag-and-drop or file picker. Parsed data refreshes fleet compliance dates across the hub so asset and driver due dates stay aligned with TMS exports without manual re-entry.",
        },
        {
          id: "settings-display",
          src: "/projects/fleet-hub-settings-display.png",
          alt: "Settings display and navigation preferences",
          description:
            "Settings — display and navigation: timezone, 12/24-hour clock, seconds on timestamps, date format, cursor style, panel versus tab-bar navigation, default Fleet Map sidebar state, and Light/Dark map theme—saved per user for a consistent workspace.",
        },
        {
          id: "settings-fleet-map",
          src: "/projects/fleet-hub-settings-fleet-map.png",
          alt: "Settings fleet map and trailer preferences",
          description:
            "Settings — Fleet Map and trailers: North America map lock, trailer layer default, truck status filters, default sidebar card filters (including MX visibility), sidebar sort order (auto by status, custom drag order, or Sylectus appointment time), and Trailer Management layout (standard navigator versus spreadsheet grid).",
        },
        {
          id: "settings-admin",
          src: "/projects/fleet-hub-settings-admin.png",
          alt: "Settings notifications and administration",
          description:
            "Settings — notifications and administration: alert sounds with team sound library, desktop notifications, trailer view preferences, customer accessorial reference for Sylectus/Ascent entry, and Team & User Management for invites, roles, and access control across the platform.",
        },
        {
          id: "driver-app-control",
          src: "/projects/fleet-hub-driver-app-control.png",
          alt: "Geo Driver App control center",
          description:
            "Geo Driver App Control Center: review driver submissions from the mobile app—load documents, asset inspections, fuel receipts, and reports—with search and filters by driver, truck, PRO, type, and date. Access management ties field users to what they can upload; document retention and expiry are tracked for dispatch review.",
        },
        {
          id: "geo-driver-sign-in",
          src: "/projects/geo-driver-sign-in-code.png",
          alt: "Geo Driver mobile sign-in",
          description:
            "Geo Driver (Android and iOS): passwordless sign-in with a one-time code sent to the driver’s email, branded login over a map backdrop—aligned with the same fleet identity as the dispatch hub.",
        },
        {
          id: "geo-driver-home",
          src: "/projects/geo-driver-home.png",
          alt: "Geo Driver home screen",
          description:
            "Driver home: welcome profile, current load PRO, assigned truck and trailer, and quick entry to Documents, Trailer Inspection, Trip Log, and Map—everything a driver needs from one screen.",
        },
        {
          id: "geo-driver-documents",
          src: "/projects/geo-driver-documents.png",
          alt: "Geo Driver document upload by stop",
          description:
            "Document upload flow: choose which stop or general load folder paperwork belongs to (pickup, delivery, or load-level), then upload from the device—so dispatch receives files tied to the correct PRO and stop.",
        },
        {
          id: "geo-driver-load-stops",
          src: "/projects/geo-driver-load-stops.png",
          alt: "Geo Driver load stops and arrive",
          description:
            "Load stops view for the active PRO: pickup and delivery sequence with Arrive actions that notify dispatch when the driver reaches a stop—closing the loop between field activity and the operations desk.",
        },
        {
          id: "geo-driver-inspection-front",
          src: "/projects/geo-driver-inspection-front.png",
          alt: "Geo Driver trailer inspection walkthrough front",
          description:
            "Guided trailer inspection (18-step walkthrough): step-by-step prompts, required photo capture, OK/Issue marking, and progress tracking—example step for baseline front photos and lights.",
        },
        {
          id: "geo-driver-inspection-rear",
          src: "/projects/geo-driver-inspection-rear.png",
          alt: "Geo Driver trailer inspection walkthrough rear",
          description:
            "Same inspection workflow for rear baseline photos—license plate and tail lights—with multi-photo support per stop and navigation between steps until the walkthrough is complete.",
        },
        {
          id: "geo-driver-map-search",
          src: "/projects/geo-driver-map-search.png",
          alt: "Geo Driver map search",
          description:
            "In-app map with live search and autocomplete (cities, addresses, POIs). Drivers can find destinations without leaving the app, with standard zoom and recenter controls.",
        },
        {
          id: "geo-driver-map-destination",
          src: "/projects/geo-driver-map-destination.png",
          alt: "Geo Driver destination and navigation launch",
          description:
            "After selecting a result, the destination sheet shows the full address with **Navigate** for in-app turn-by-turn or **Open in Google Maps** when the driver prefers an external navigator.",
        },
        {
          id: "geo-driver-navigation",
          src: "/projects/geo-driver-navigation.png",
          alt: "Geo Driver turn-by-turn navigation",
          description:
            "Active navigation: voice-ready turn instructions, distance to maneuver, route on map, ETA, remaining time and miles, and quick exit—built for over-the-road trips, not just short hops.",
        },
        {
          id: "geo-driver-navigation-menu",
          src: "/projects/geo-driver-navigation-menu.png",
          alt: "Geo Driver navigation options menu",
          description:
            "Navigation menu during a route: preview route, step-by-step directions, share trip, mute voice, hand off to Google Maps, navigation settings, and exit—giving drivers flexibility without losing trip context.",
        },
      ],
    },
  },
  {
    id: "contact",
    label: "Contact",
    title: "Hello",
    subtitle: "Resume and contact details coming next",
  },
];
