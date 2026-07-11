// User
export const USER_ROLES = [
  "fieldEngineer",
  "manager",
  "admin",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const USER_STATUSES = [
  "active",
  "suspended",
] as const;

export type UserStatus = (typeof USER_STATUSES)[number];


// Sample
export const LAB_STATUSES = [
  "pending",
  "completed",
] as const;

export type LabStatus = (typeof LAB_STATUSES)[number];

export const LITHOLOGIES = [
  "Sandstone",
  "Limestone",
  "Shale",
  "Dolomite",
  "Siltstone",
  "Coal",
  "Basalt",
  "Granite",
] as const;

export type Lithology = (typeof LITHOLOGIES)[number];


// Well
export const SITE_TYPES = [
  "onshore",
  "offshore",
] as const;

export type SiteType = (typeof SITE_TYPES)[number];

export const WELL_STATUSES = [
  "drilling",
  "completed",
  "suspended",
  "abandoned",
] as const;

export type WellStatus = (typeof WELL_STATUSES)[number];