import type { AreaOfInterest, DegreeProgram } from "@/types";

export const DEFAULT_RFI_HEADING =
  "Request Information About Our Degrees";

export const AREAS_OF_INTEREST: AreaOfInterest[] = [
  { label: "Business", value: "business" },
  { label: "Criminal Justice", value: "criminal_justice" },
  { label: "Education", value: "education" },
  { label: "Health Care", value: "health_care" },
  { label: "Information Technology", value: "information_technology" },
  { label: "Liberal Arts", value: "liberal_arts" },
  { label: "Social & Behavioral Science", value: "social_behavioral_science" },
  { label: "Undecided", value: "undecided" },
];

export const DEGREE_PROGRAMS: DegreeProgram[] = [
  {
    label: "Bachelor of Arts in Business Administration",
    value: "ba-business-admin",
    areaOfInterest: "business",
  },
  {
    label: "Master of Business Administration",
    value: "mba",
    areaOfInterest: "business",
  },
  {
    label: "Bachelor of Arts in Criminal Justice",
    value: "ba-criminal-justice",
    areaOfInterest: "criminal_justice",
  },
  {
    label: "Master of Science in Criminal Justice",
    value: "ms-criminal-justice",
    areaOfInterest: "criminal_justice",
  },
  {
    label: "Bachelor of Arts in Education Studies",
    value: "ba-education-studies",
    areaOfInterest: "education",
  },
  {
    label: "Master of Arts in Education",
    value: "ma-education",
    areaOfInterest: "education",
  },
  {
    label: "Bachelor of Arts in Health Care Administration",
    value: "ba-health-care-admin",
    areaOfInterest: "health_care",
  },
  {
    label: "Master of Public Health",
    value: "mph",
    areaOfInterest: "health_care",
  },
  {
    label: "Bachelor of Science in Information Technology",
    value: "bs-information-technology",
    areaOfInterest: "information_technology",
  },
  {
    label: "Master of Information Systems Management",
    value: "ms-information-systems",
    areaOfInterest: "information_technology",
  },
  {
    label: "Bachelor of Arts in Liberal Arts",
    value: "ba-liberal-arts",
    areaOfInterest: "liberal_arts",
  },
  {
    label: "Bachelor of Arts in Psychology",
    value: "ba-psychology",
    areaOfInterest: "social_behavioral_science",
  },
  {
    label: "Master of Arts in Psychology",
    value: "ma-psychology",
    areaOfInterest: "social_behavioral_science",
  },
  {
    label: "Explore Degree Options",
    value: "explore-degrees",
    areaOfInterest: "undecided",
  },
];

export const US_STATES: { label: string; value: string }[] = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "District of Columbia", value: "DC" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
  { label: "American Samoa", value: "AS" },
  { label: "Guam", value: "GU" },
  { label: "Northern Mariana Islands", value: "MP" },
  { label: "Puerto Rico", value: "PR" },
  { label: "U.S. Virgin Islands", value: "VI" },
];

export const TCPA_CONSENT_TEXT =
  "By checking this box and clicking submit, I provide my signature expressly consenting to contact from University of Arizona Global Campus (UAGC) at the telephone number(s) I provided, including my wireless number if applicable, to receive marketing and/or informational calls using an automatic telephone dialing system or an artificial or prerecorded voice. I understand that consent is not a condition of purchase.";
