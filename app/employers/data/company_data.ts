export interface EmployerCompany {
  name: string
  industry: string
  teamSize: string
  location: string
  founded: string
  website: string
  about: string
  hiringFocus: string
  hiringContact: string
}

export const employerCompany: EmployerCompany = {
  name: "Northwind Analytics",
  industry: "B2B SaaS",
  teamSize: "24 people",
  location: "Remote · HQ in Denver",
  founded: "2022",
  website: "northwind.example.com",
  about:
    "Northwind builds embedded analytics for vertical SaaS teams. Small team, real ownership, async-first.",
  hiringFocus:
    "Engineering and data hires for our self-serve product surface.",
  hiringContact: "hiring@northwind.example.com",
}
