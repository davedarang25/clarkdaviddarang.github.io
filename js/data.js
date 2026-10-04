/**
 * data.js — Central Intel & Tactical Briefing Repository
 * Edit this file to update site content, personal info, and battlefield parameters.
 */

/**
 * BriefingData — Tactical Briefing & Operative Intel
 * Maps 1:1 with [data-field] targets in the #briefing HTML HUD.
 */

const BriefingData = {
  // Identity & Imagery
  background: "assets/images/Battle_of_Coruscant.webp", // Path to background image
  
  fullName: "Clark David Darang",
  rank: "Five Star Supreme Admiral of the Republic Navy",
  codename: "Commander_CD",
  clearanceLevel: "LEVEL 3 — DEVELOPER",

  // Tactical Directives & Lore
  motto: "Serve the Republic — and the code must be ready.",
  designation_region: "Mid Core Region · Philippines",
  commandPost: "Lyceum Sector Base (LPU-C)",
  ship_class: "Venator-Code Class (B.S. CS)",
  gradYear: "2029",

  // Narrative Telemetry
  bio: "A Second Year B.S. Computer Science student at Lyceum of the Philippines University Cavite, serving the Republic to defend its democratic code against the dark side of syntax errors and unoptimized routines.",

  // Tactical Metadata
  status: "ACTIVE",
  sector: "Sector 4 — Remote-Capable"
};

// Central Portfolio Intel
const PortfolioData = {
  personalInfo: {
    profileImage: "./assets/images/profile-clark-darang.jpg",
    fullName: "Clark David Darang",
    codename: "commander_CD",
    age: 19,
    college: "Lyceum of the Philippines University - Cavite",
    degreeProgram: "B.S. Computer Science",
    gradYear: "2029",
    bio: "A Second Year B.S. Computer Science student at Lyceum of the Philippines University Cavite, serving the Republic to defend its democratic code with the help of the Java Order against the dark side of syntax errors and unoptimized routines.",
    location: "Sector 4, Remote-Capable",
    status: "ACTIVE",
    clearanceLevel: "LEVEL 3 — DEVELOPER",
    email: "davedarang2017@gmail.com",
    github: "https://github.com/davedarang25",
    linkedin: "https://www.linkedin.com/in/clark-david-darang/",
  },

  projects: [
    {
      title: "LFD CPA — LFD CPA Accounting Services Website",
      description:
        "A Family Business Website of LFD CPA Accounting where our potential clients can check services that we offer and book their appointments with us.",
      techStack: ["Python", "FastAPI", "WebSockets", "Redis"],
      githubLink: "https://github.com/davedarang25/sentinel",
      liveLink: "https://lfdcpa.com",
      imagePath: "assets/images/lfdcpa.png",
    },
  ],

  certifications: [
    {
      title: "Javascript Essentials 1 – CS101",
      issuer: "CISCO Networking Academy",
      issueDate: "27-JAN-2026",
      badgeIcon: "shield-check",
      badgeImage: "assets/images/badges/javascript-essentials-1.png",
      pdfLink: "assets/images/badges/JS-essentials-cert.pdf",
      links: "https://www.credly.com/badges/25d82ca1-1c58-4975-90b3-64229dd9310d/public_url",
    },
    {
      title: "Python Essentials 1",
      issuer: "CISCO Networking Academy",
      issueDate: "4-OCT-2026",
      badgeIcon: "shield-check",
      badgeImage: "assets/images/badges/python-essentials-1.1.png",
      pdfLink: "assets/images/badges/PythonEssentials1Update20261004-20-cj7iu.pdf",
      links: "https://www.credly.com/badges/6145defa-9d72-460f-9144-0d311644304a/public_url",
    },
  ],

  experiences: [
    {
      role: "Web Developer",
      organization: "LFDCPA Accounting Services",
      period: "November 2025 - present",
      location: "Remote Deployment",
      description:
        "Developed, build and deploy the website of LFDCPA Accounting Services.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "Bluehost"],
    },
  ],

  skills: {
    languages: ["Python", "Java", "C#", "SQL", "HTML", "CSS", "Javascript", "PHP"],
    frameworks: ["React", "Flutter", "Tailwind CSS"],
    developerTools: ["Git", "Figma", "Bluehost", "Unity"],
    coreFundamentals: [
      "Data Structures",
      "Algorithms",
      "Operating Systems",
      "Distributed Systems",
      "Database Design",
      "Networking",
    ],
  },
};

// Expose both objects to the global window context
window.BriefingData = BriefingData;
window.PortfolioData = PortfolioData;