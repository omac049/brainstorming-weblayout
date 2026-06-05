export interface RFIFormData {
  firstname: string;
  lastname: string;
  state: string;
  phone: string;
  email: string;
  college_of_interest: string;
  clientdegreeid: string;
  military_status?: "yes" | "no";
  tcpa_checkbox: boolean;
}

export interface AreaOfInterest {
  label: string;
  value: string;
}

export interface DegreeProgram {
  label: string;
  value: string;
  areaOfInterest: string;
}

export interface HeroConfig {
  headline: string;
  subheadline?: string;
  backgroundImage: string;
  mobileBackgroundImage?: string;
  showForm: boolean;
  formVariant?: "mini" | "full";
}

export interface ValueProp {
  icon?: string;
  title: string;
  description: string;
}

export interface BulletPoint {
  title: string;
  description: string;
}

export interface TuitionInfo {
  label: string;
  href: string;
}

export interface TestimonialData {
  quote: string;
  name: string;
  credential: string;
  tag?: string;
}

export interface AccreditationBadge {
  name: string;
  image: string;
  alt: string;
}

export interface PageSection {
  id: string;
  component: string;
  props: Record<string, unknown>;
}

export interface PageConfig {
  slug: string;
  title: string;
  description: string;
  hero: HeroConfig;
  sections: PageSection[];
}
