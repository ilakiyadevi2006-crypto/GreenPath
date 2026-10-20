import { LearningPath } from '../types';
import { GREEN_IT_CHAPTERS } from './greenItChapters';
import { SUSTAINABILITY_CHAPTERS } from './sustainabilityChapters';
import { ENERGY_EFFICIENCY_CHAPTERS } from './energyChapters';
import { WASTE_MANAGEMENT_CHAPTERS } from './wasteChapters';

export const ASSETS = {
  hero: '/assets/images/hero_green_tech_1791730814882.jpg',
  renewableGrid: '/assets/images/course_renewable_grid_1791730828567.jpg',
  carbonAnalytics: '/assets/images/course_carbon_analytics_1791730838934.jpg',
  circularDesign: '/assets/images/course_circular_design_1791730849377.jpg',
  ecoMentorWorkspace: '/assets/images/ecomentor_workspace_1791730860421.jpg',
};

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'sustainability-fundamentals',
    title: 'Sustainability Fundamentals',
    tagline: 'Understand corporate sustainability principles, double materiality, and international ESG reporting frameworks.',
    category: 'Sustainability Fundamentals',
    level: 'Beginner',
    durationHours: 4,
    moduleCount: 4,
    featured: true,
    isAvailable: true,
    image: ASSETS.hero,
    imageAlt: 'Sustainable corporate research campus with green roof and solar arrays',
    summary: 'Understand corporate sustainability principles, double materiality, and international ESG reporting frameworks. Learn how organizations assess and reduce their ecological footprint.',
    standardAlignment: 'CSRD ESRS General Requirements & GRI Universal Standards',
    learningObjectives: [
      'Understand the triple bottom line and double materiality principles',
      'Identify key international disclosure frameworks (CSRD, GRI, SASB, TCFD)',
      'Map value chain environmental impacts across operational boundaries',
      'Formulate actionable sustainability policies and governance mechanisms'
    ],
    outcomes: [
      'Conduct a double-materiality matrix assessment for an enterprise',
      'Formulate an ESG governance policy compliant with EU CSRD directives',
      'Evaluate supply chain sustainability risks across Tier 1-3 vendors'
    ],
    toolsAndStandards: [
      'GRI Standards',
      'CSRD ESRS Framework',
      'UN Sustainable Development Goals (SDGs)',
      'Double Materiality Assessment Matrix'
    ],
    targetRoles: [
      'Sustainability Analyst',
      'ESG Strategy Consultant',
      'Corporate Governance Specialist'
    ],
    learningMaterials: [
      'GRI Universal Standards 2021 Reference Compendium',
      'EFRAG Double Materiality Implementation Guidelines',
      'Enterprise ESG Risk Mapping Worksheet (Spreadsheet Template)'
    ],
    finalAssessmentRequirements: [
      'Complete all 4 module chapters and interactive reading workbooks',
      'Score 80% or higher on the comprehensive 5-question final assessment quiz',
      'Submit the double materiality matrix practical defense'
    ],
    chapters: SUSTAINABILITY_CHAPTERS,
    syllabus: SUSTAINABILITY_CHAPTERS.map(ch => ({
      id: ch.id,
      moduleNumber: ch.chapterNumber,
      title: ch.title,
      description: ch.description,
      durationHours: Math.round((ch.durationMinutes / 60) * 10) / 10,
      practicalProject: ch.activityTask.instruction,
      lessons: [
        {
          id: ch.id,
          title: ch.title,
          durationMinutes: ch.durationMinutes,
          format: 'Lecture' as const,
          videoStatus: 'interactive_lab' as const,
          content: {
            summary: ch.lessonContent[0],
            keyStandards: ['CSRD ESRS General Requirements', 'GRI Universal Standards'],
            technicalPoints: ch.learningObjectives,
            practicalExercise: ch.activityTask.instruction
          }
        }
      ]
    }))
  },
  {
    id: 'green-it',
    title: 'Green IT Fundamentals',
    tagline: 'Learn how to use, manage, and develop information technology more sustainably.',
    category: 'Green IT',
    level: 'Beginner',
    durationHours: 4,
    moduleCount: 6,
    featured: true,
    isAvailable: true,
    image: ASSETS.ecoMentorWorkspace,
    imageAlt: 'Modern green technology workspace with clean computing instrumentation',
    summary: 'Learn how to use, manage, and develop information technology more sustainably. Master hardware lifecycles, power management, electronic waste handling, sustainable cloud data centers, green software engineering, and mindful everyday digital habits.',
    standardAlignment: 'Green Software Foundation SCI Specification, Energy Star 8.0 & ISO/IEC Standards',
    learningObjectives: [
      'Understand the global carbon footprint of the digital world and device lifecycles',
      'Configure operating system power management and eliminate workstation vampire power',
      'Navigate electronic waste management, the right to repair, and certified e-Stewards recycling',
      'Calculate Power Usage Effectiveness (PUE) and analyze green data center cooling',
      'Apply the Software Carbon Intensity (SCI) metric and carbon-aware computing principles',
      'Implement digital decluttering and sustainable everyday personal computing habits'
    ],
    outcomes: [
      'Audit personal and organizational digital hardware for maximum operating longevity',
      'Calculate data center PUE and evaluate cooling efficiency improvements',
      'Apply carbon-aware compute scheduling and front-end optimization techniques',
      'Build an actionable workplace and home Green IT sustainability protocol'
    ],
    toolsAndStandards: [
      'Green Software Foundation SCI',
      'Energy Star 8.0 & EPEAT Gold',
      'R2v3 & e-Stewards E-Waste Standards',
      'The Green Grid PUE Standard',
      'WattTime & Electricity Maps APIs'
    ],
    targetRoles: [
      'Green IT Coordinator',
      'IT Support Specialist',
      'Junior Software Developer',
      'Sustainability Champion'
    ],
    learningMaterials: [
      'Green IT Fundamentals Complete Study Handbook (Chapters 1-6)',
      'Energy Star Workstation Configuration Checklist',
      'Green Software Foundation SCI Specification Guide'
    ],
    finalAssessmentRequirements: [
      'Complete all 6 Green IT Fundamentals chapters, reading sections, and exercises',
      'Pass each chapter quiz with 80% or higher to unlock sequential chapter progression',
      'Pass the comprehensive course final assessment (60 marks) with at least 80% (minimum 48/60 marks) to earn the accredited credential'
    ],
    chapters: GREEN_IT_CHAPTERS,
    syllabus: GREEN_IT_CHAPTERS.map(ch => ({
      id: ch.id,
      moduleNumber: ch.chapterNumber,
      title: ch.title,
      description: ch.description,
      durationHours: Math.round((ch.durationMinutes / 60) * 10) / 10,
      practicalProject: ch.activityTask.instruction,
      lessons: [
        {
          id: ch.id,
          title: ch.title,
          durationMinutes: ch.durationMinutes,
          format: 'Lecture' as const,
          videoStatus: 'interactive_lab' as const,
          content: {
            summary: ch.lessonContent[0],
            keyStandards: [ch.title],
            technicalPoints: ch.learningObjectives,
            practicalExercise: ch.activityTask.instruction
          }
        }
      ]
    }))
  },
  {
    id: 'energy-efficiency',
    title: 'Energy Efficiency',
    tagline: 'Discover energy auditing standards, motor systems, waste heat recovery, and ISO 50001 energy conservation protocols.',
    category: 'Energy Efficiency',
    level: 'Beginner',
    durationHours: 4,
    moduleCount: 4,
    featured: true,
    isAvailable: true,
    image: ASSETS.renewableGrid,
    imageAlt: 'Industrial engineer auditing high-efficiency energy systems and electrical distribution',
    summary: 'A rigorous engineering track covering ASHRAE Level 1-3 energy audits, industrial motor systems, steam traps, compressed air leaks, waste heat recovery, and ISO 50001 Energy Management Systems (EnMS).',
    standardAlignment: 'ISO 50001:2018 Energy Management & ASHRAE Standard 211',
    learningObjectives: [
      'Conduct ASHRAE Level 2 and Level 3 investment-grade energy audits',
      'Calculate energy performance indicators (EnPIs) and normalized consumption baselines',
      'Diagnose thermal energy losses in boilers, steam distribution, and compressed air loops',
      'Design waste heat recovery exchanger systems with positive payback periods'
    ],
    outcomes: [
      'Structure an ISO 50001 Energy Management System (EnMS) implementation plan',
      'Perform compressed air leak surveys calculating annual cost and carbon savings',
      'Design heat exchanger retrofits for flue gas and cooling loop heat recovery'
    ],
    toolsAndStandards: [
      'ISO 50001:2018',
      'ASHRAE Standard 211',
      'DOE MEASUR Tool Suite',
      'Pinch Analysis Heat Exchanger Engine'
    ],
    targetRoles: [
      'Certified Energy Manager (CEM)',
      'Plant Energy Auditor',
      'Industrial Systems Engineer'
    ],
    learningMaterials: [
      'ISO 50001:2018 Step-by-Step Implementation Guide',
      'ASHRAE Standard 211 Investment-Grade Energy Audit Protocol',
      'US Department of Energy MEASUR Software Manual'
    ],
    finalAssessmentRequirements: [
      'Complete all 4 Energy Efficiency modules and audit lab calculations',
      'Pass the 5-question energy engineering assessment quiz with 80% or higher',
      'Submit an energy audit report for a 50,000 sq ft manufacturing plant'
    ],
    chapters: ENERGY_EFFICIENCY_CHAPTERS,
    syllabus: ENERGY_EFFICIENCY_CHAPTERS.map(ch => ({
      id: ch.id,
      moduleNumber: ch.chapterNumber,
      title: ch.title,
      description: ch.description,
      durationHours: Math.round((ch.durationMinutes / 60) * 10) / 10,
      practicalProject: ch.activityTask.instruction,
      lessons: [
        {
          id: ch.id,
          title: ch.title,
          durationMinutes: ch.durationMinutes,
          format: 'Lecture' as const,
          videoStatus: 'interactive_lab' as const,
          content: {
            summary: ch.lessonContent[0],
            keyStandards: ['ISO 50001:2018', 'ASHRAE Standard 211'],
            technicalPoints: ch.learningObjectives,
            practicalExercise: ch.activityTask.instruction
          }
        }
      ]
    }))
  },
  {
    id: 'waste-management',
    title: 'Waste Management',
    tagline: 'Explore modern circular economy principles, facility waste characterization audits, and zero-waste diversion techniques.',
    category: 'Waste Management',
    level: 'Beginner',
    durationHours: 4,
    moduleCount: 4,
    featured: true,
    isAvailable: true,
    image: ASSETS.circularDesign,
    imageAlt: 'Sustainable industrial facility testing zero-waste bio-composites and recycling streams',
    summary: 'Explore modern circular economy principles, facility waste characterization audits, and zero-waste diversion techniques. Learn waste hierarchies, material diversion, composting, and zero-waste facility standards.',
    standardAlignment: 'TRUE Zero Waste (GBCI) & EPA Waste Reduction Model (WARM)',
    learningObjectives: [
      'Conduct solid waste composition audits and mass-balance flow analysis',
      'Calculate facility waste diversion rates complying with GBCI standards',
      'Implement organic composting and commercial anaerobic digestion systems',
      'Eliminate single-use hazardous industrial waste through chemical substitution'
    ],
    outcomes: [
      'Execute an institutional waste characterization audit for a facility',
      'Design a Zero Waste to Landfill program achieving >90% diversion rate',
      'Calculate avoided greenhouse gas emissions using the EPA WARM model'
    ],
    toolsAndStandards: [
      'TRUE Zero Waste Standard',
      'EPA WARM Emission Model',
      'ISO 14001 Waste Guidelines',
      'ASTM D5231 Solid Waste Sorting Standard'
    ],
    targetRoles: [
      'Zero Waste Coordinator',
      'Environmental Health & Safety (EHS) Lead',
      'Circular Materials Specialist'
    ],
    learningMaterials: [
      'GBCI TRUE Zero Waste Rating System Technical Guide',
      'EPA Waste Reduction Model (WARM) User Documentation',
      'ASTM D5231 Standard Test Method for Waste Composition Auditing'
    ],
    finalAssessmentRequirements: [
      'Complete all 4 Waste Management modules',
      'Pass the 5-question technical assessment quiz with 80% or higher',
      'Submit a diversion rate calculation workbook with verifiable audit proof'
    ],
    chapters: WASTE_MANAGEMENT_CHAPTERS,
    syllabus: WASTE_MANAGEMENT_CHAPTERS.map(ch => ({
      id: ch.id,
      moduleNumber: ch.chapterNumber,
      title: ch.title,
      description: ch.description,
      durationHours: Math.round((ch.durationMinutes / 60) * 10) / 10,
      practicalProject: ch.activityTask.instruction,
      lessons: [
        {
          id: ch.id,
          title: ch.title,
          durationMinutes: ch.durationMinutes,
          format: 'Lecture' as const,
          videoStatus: 'interactive_lab' as const,
          content: {
            summary: ch.lessonContent[0],
            keyStandards: ['TRUE Zero Waste Standard', 'ASTM D5231'],
            technicalPoints: ch.learningObjectives,
            practicalExercise: ch.activityTask.instruction
          }
        }
      ]
    }))
  },
  {
    id: 'climate-awareness',
    title: 'Climate Science, Carbon Accounting & Greenhouse Gas Protocol',
    tagline: 'Quantify corporate Scope 1, 2, and 3 emissions using the international GHG Protocol standard.',
    category: 'Climate Awareness',
    level: 'Beginner',
    durationHours: 28,
    moduleCount: 4,
    featured: true,
    isAvailable: true,
    image: ASSETS.carbonAnalytics,
    imageAlt: 'Climate data analyst evaluating greenhouse gas emission inventories on dual monitors',
    summary: 'A foundational and rigorous climate accounting track. Learn the physical climate science underpinning the carbon cycle, calculate Scope 1 direct, Scope 2 indirect, and Scope 3 supply chain inventories.',
    standardAlignment: 'GHG Protocol Corporate Standard & ISO 14064-1:2018',
    learningObjectives: [
      'Understand the greenhouse effect, atmospheric CO2 concentrations, and IPCC emission trajectories',
      'Calculate Scope 1 direct combustions from mobile and stationary equipment',
      'Compute Scope 2 emissions using both Location-Based and Market-Based methods',
      'Map Scope 3 categories across upstream supply chains and downstream product use'
    ],
    outcomes: [
      'Calculate complete Scope 1, 2, and 3 GHG inventories using emission factor databases',
      'Build Science Based Targets initiative (SBTi) 1.5°C abatement pathways',
      'Prepare auditable ESG disclosure documentation ready for limited assurance'
    ],
    toolsAndStandards: [
      'GHG Protocol Corporate Standard',
      'IPCC AR6 Emission Factors',
      'EPA eGRID Database',
      'SBTi Target Setting Tool'
    ],
    targetRoles: [
      'Carbon Accounting Specialist',
      'ESG Reporting Lead',
      'Climate Risk Consultant'
    ],
    learningMaterials: [
      'GHG Protocol Corporate Accounting and Reporting Standard (Revised Edition)',
      'GHG Protocol Scope 2 Guidance Document',
      'Scope 3 Corporate Value Chain (Scope 3) Standard'
    ],
    finalAssessmentRequirements: [
      'Complete all 4 Climate Awareness modules',
      'Pass the 5-question technical carbon accounting quiz with 80% or higher',
      'Submit a dual-method Scope 2 reconciliation worksheet'
    ],
    syllabus: [
      {
        id: 'mod-ca1',
        moduleNumber: 1,
        title: 'Physical Climate Science & The Carbon Cycle',
        description: 'Atmospheric chemistry, radiative forcing, carbon reservoirs, and IPCC AR6 global warming potentials.',
        durationHours: 7,
        practicalProject: 'Calculate cumulative radiative forcing for mixed industrial gas releases.',
        lessons: [
          {
            id: 'ca-l1',
            title: 'Greenhouse Gases & GWP100 Equivalencies',
            durationMinutes: 45,
            format: 'Lecture',
            videoStatus: 'interactive_lab',
            content: {
              summary: 'Atmospheric residence times and radiative efficiency of CO2, CH4, N2O, and fluorinated gases.',
              keyStandards: ['IPCC Sixth Assessment Report (AR6)', 'UNFCCC Kyoto Protocol Annex A'],
              technicalPoints: ['GWP values: CO2 = 1, CH4 = 28, N2O = 273, SF6 = 25,200', 'Radiative forcing equation: ΔF = 5.35 * ln(C/C0)'],
              practicalExercise: 'Convert 45 kg of fugitive R-410A refrigerant leakage into equivalent metric tons of CO2e.'
            }
          }
        ]
      },
      {
        id: 'mod-ca2',
        moduleNumber: 2,
        title: 'Scope 1 Direct Emissions Calculation',
        description: 'Fuel heating values (HHV vs LHV), mobile vehicle fleet consumption, and process emissions.',
        durationHours: 7,
        practicalProject: 'Calculate Scope 1 inventory for an industrial facility with 4 boilers and 25 fleet trucks.',
        lessons: [
          {
            id: 'ca-l2',
            title: 'Stationary & Mobile Combustion Equations',
            durationMinutes: 50,
            format: 'Interactive Lab',
            videoStatus: 'interactive_lab',
            content: {
              summary: 'Applying fuel-specific carbon oxidation factors, heat content coefficients, and density calculations.',
              keyStandards: ['GHG Protocol Stationary Combustion Tool', 'EPA GHG Emission Factors Hub'],
              technicalPoints: ['Activity Data * Fuel Heat Content * Carbon Emission Factor * Oxidation Factor', 'Default vs supplier-measured heating values'],
              practicalExercise: 'Compute annual emissions from 120,000 therms of natural gas consumption.'
            }
          }
        ]
      },
      {
        id: 'mod-ca3',
        moduleNumber: 3,
        title: 'Scope 2 Dual Reporting: Location vs Market Method',
        description: 'Subgrid eGRID emission factors, Energy Attribute Certificates (EACs), Guarantees of Origin, and residual mix.',
        durationHours: 7,
        practicalProject: 'Perform dual-method Scope 2 calculations across 3 regional manufacturing facilities.',
        lessons: [
          {
            id: 'ca-l3',
            title: 'Market-Based Method & Contractual Instruments',
            durationMinutes: 60,
            format: 'Case Study',
            videoStatus: 'interactive_lab',
            content: {
              summary: 'The Scope 2 Quality Criteria: contractual instruments, retired EAC certificates, and residual mix adjustments.',
              keyStandards: ['GHG Protocol Scope 2 Guidance', 'RE100 Technical Criteria'],
              technicalPoints: ['Location-based grid average factors vs market-based supplier tariffs', 'Double counting prevention and residual mix'],
              practicalExercise: 'Reconcile Scope 2 disclosures where 60% of power was purchased via a certified green tariff.'
            }
          }
        ]
      },
      {
        id: 'mod-ca4',
        moduleNumber: 4,
        title: 'Scope 3 Supply Chain Categories 1-15',
        description: 'Spend-based EEIO screening transitioning to primary supplier data surveys for Category 1 and Category 11.',
        durationHours: 7,
        practicalProject: 'Formulate an EEIO spend-based emissions model for purchased goods.',
        lessons: [
          {
            id: 'ca-l4',
            title: 'Scope 3 Upstream & Downstream Category Mapping',
            durationMinutes: 60,
            format: 'Data Simulation',
            videoStatus: 'interactive_lab',
            content: {
              summary: 'Structuring the 15 Scope 3 categories: purchased goods, capital goods, fuel upstream, freight, travel, and end-of-life.',
              keyStandards: ['GHG Protocol Scope 3 Calculation Guidance', 'CDP Supply Chain Program Criteria'],
              technicalPoints: ['Spend-based vs hybrid vs supplier-specific calculation methods', 'Primary data collection surveys'],
              practicalExercise: 'Identify top 5 emission hotspots from a $50M procurement spend ledger.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'water-conservation',
    title: 'Industrial Water Stewardship & Watershed Risk Modeling',
    tagline: 'Quantify corporate water footprint, assess basin scarcity, and implement closed-loop wastewater recycling.',
    category: 'Water Conservation',
    level: 'Intermediate',
    durationHours: 24,
    moduleCount: 4,
    featured: false,
    isAvailable: false,
    comingSoonMessage: 'Curriculum in active peer-review with hydrologists and industrial water engineers. Enrollment opens next term.',
    image: ASSETS.hero,
    imageAlt: 'Ecological water filtration wetlands and industrial water management facility',
    summary: 'This curriculum will cover corporate water footprinting (ISO 14046), basin water scarcity index modeling (WRI Aqueduct), industrial reverse osmosis recycling, and Alliance for Water Stewardship (AWS) standards.',
    standardAlignment: 'Alliance for Water Stewardship (AWS) Standard & ISO 14046',
    learningObjectives: [
      'Assess watershed water risk using the WRI Aqueduct tool',
      'Compute facility water withdrawal, consumption, and discharge balances',
      'Evaluate membrane bioreactor and reverse osmosis closed-loop recycling loops'
    ],
    outcomes: [
      'Develop a site-level water stewardship plan compliant with the AWS standard',
      'Identify water risk exposure across Tier 1 agricultural and manufacturing suppliers'
    ],
    toolsAndStandards: ['WRI Aqueduct', 'ISO 14046', 'AWS Standard v2.0'],
    targetRoles: ['Water Stewardship Manager', 'Environmental Compliance Engineer'],
    learningMaterials: ['AWS Standard Implementation Manual', 'WRI Aqueduct Technical Methodology'],
    finalAssessmentRequirements: ['Available upon course release'],
    syllabus: []
  },
  {
    id: 'sustainable-transportation',
    title: 'Fleet Electrification & Clean Logistics Architecture',
    tagline: 'Plan commercial fleet transitions to electric vehicles, optimize megawatt charging depot infrastructure, and lower freight emissions.',
    category: 'Sustainable Transportation',
    level: 'Advanced',
    durationHours: 28,
    moduleCount: 4,
    featured: false,
    isAvailable: false,
    comingSoonMessage: 'Course curriculum in production with clean transit engineers and fleet operators. Enrollment opens next term.',
    image: ASSETS.renewableGrid,
    imageAlt: 'Commercial fleet electrification charging station and renewable grid integration',
    summary: 'This curriculum will cover total cost of ownership (TCO) fleet conversion modeling, depot peak electrical demand sizing, Smart Charging (ISO 15118), and SmartWay freight logistics optimization.',
    standardAlignment: 'SmartWay Freight Logistics & ISO 15118 EV Charging Communication',
    learningObjectives: [
      'Model commercial EV route battery range and duty cycle requirements',
      'Size utility service connections and peak demand management for megawatt depots',
      'Implement telematics-driven charging schedule optimization'
    ],
    outcomes: [
      'Build a 5-year capital transition plan for a 150-vehicle commercial delivery fleet'
    ],
    toolsAndStandards: ['NREL Fleet DNA', 'ISO 15118', 'SmartWay Freight Tool'],
    targetRoles: ['Fleet Electrification Manager', 'Logistics Infrastructure Director'],
    learningMaterials: ['Fleet Electrification Blueprint Manual'],
    finalAssessmentRequirements: ['Available upon course release'],
    syllabus: []
  },
  {
    id: 'sustainable-agriculture',
    title: 'Regenerative Agriculture & Soil Carbon Sequestration',
    tagline: 'Measure soil organic carbon stock changes, reduce synthetic nitrogen emissions, and implement regenerative farm practices.',
    category: 'Sustainable Agriculture',
    level: 'Intermediate',
    durationHours: 26,
    moduleCount: 4,
    featured: false,
    isAvailable: false,
    comingSoonMessage: 'Curriculum in development with agronomists and soil carbon researchers. Enrollment opens next term.',
    image: ASSETS.hero,
    imageAlt: 'Regenerative organic farm with soil monitoring sensor array',
    summary: 'This curriculum will cover IPCC Tier 1-3 agricultural emission models, direct soil organic carbon sampling (Dry Combustion ASTM D2974), cover crop biological nitrogen fixation, and verified carbon credit methodology.',
    standardAlignment: 'Verra VM0042 Soil Carbon Standard & IPCC Agriculture Guidelines',
    learningObjectives: [
      'Calculate nitrous oxide emissions from synthetic nitrogen fertilizer application',
      'Model soil organic carbon sequestration dynamics using RothC and DNDC engines',
      'Design rotational grazing and cover cropping protocols for soil health'
    ],
    outcomes: [
      'Formulate a regenerative farm management plan with verifiable soil carbon measurement'
    ],
    toolsAndStandards: ['IPCC Agriculture Guidelines', 'Verra VM0042', 'COMET-Farm'],
    targetRoles: ['Regenerative Agronomist', 'Agricultural Carbon Project Manager'],
    learningMaterials: ['IPCC 2019 Refinement to National GHG Inventories: Agriculture'],
    finalAssessmentRequirements: ['Available upon course release'],
    syllabus: []
  }
];

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  deliverable: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: '01',
    title: 'Select Verified Learning Path',
    description: 'Choose from authentic green skill curricula spanning corporate ESG, clean energy transition, green cloud architecture, and circular design.',
    deliverable: 'Audited Curriculum & Syllabus'
  },
  {
    step: '02',
    title: 'Interactive Chapter Study',
    description: 'Work through rigorous technical lessons, standard references (GHG Protocol, ISO 14064, IEEE 1547), and practical calculation exercises.',
    deliverable: 'Real-time Lesson Completion Tracking'
  },
  {
    step: '03',
    title: 'EcoMentor AI Assistance',
    description: 'Consult our conversational AI assistant for instant technical explanations, carbon equation breakdowns, and standards clarification.',
    deliverable: 'Context-Aware Technical Explanations'
  },
  {
    step: '04',
    title: 'Defendable Assessment & Credential',
    description: 'Complete the rigorous course quiz (80% pass requirement) to earn an authentic, cryptographically signed digital credential registered on GreenPath.',
    deliverable: 'Cryptographically Verifiable Certificate'
  }
];

