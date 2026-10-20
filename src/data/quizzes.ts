import { CourseQuiz } from '../types';

export const COURSE_QUIZZES: Record<string, CourseQuiz> = {
  'sustainability-fundamentals': {
    courseId: 'sustainability-fundamentals',
    title: 'Foundations of Corporate Sustainability & ESG Assessment',
    passingScorePercent: 80,
    questions: [
      {
        id: 'sf-q1',
        questionText: 'What is the core definition of "Double Materiality" established under the EU Corporate Sustainability Reporting Directive (CSRD)?',
        options: [
          'Assessing both impact materiality (inside-out impact on society and environment) and financial materiality (outside-in ESG risks to company enterprise value)',
          'Auditing financial tax statements twice by independent accountants',
          'Reporting Scope 1 and Scope 2 emissions on separate corporate ledgers',
          'Measuring consumer sentiment alongside executive stock options'
        ],
        correctAnswerIndex: 0,
        explanation: 'Double materiality requires organizations to report on how their business activities affect people and the planet (impact materiality) and how environmental and social issues create financial risks or opportunities (financial materiality).'
      },
      {
        id: 'sf-q2',
        questionText: 'Under the Stockholm Resilience Centre framework, how many planetary boundaries define the safe operating space for humanity?',
        options: [
          '9 planetary boundaries',
          '3 atmospheric boundaries',
          '17 sustainable boundaries',
          '5 oceanic boundaries'
        ],
        correctAnswerIndex: 0,
        explanation: 'The framework identifies 9 planetary boundaries: climate change, biosphere integrity, land-system change, freshwater use, biogeochemical flows, ocean acidification, atmospheric aerosol loading, stratospheric ozone depletion, and novel entities.'
      },
      {
        id: 'sf-q3',
        questionText: 'Which international disclosure framework focuses primarily on multi-stakeholder reporting of a company positive and negative impacts on the economy, environment, and people?',
        options: [
          'GRI (Global Reporting Initiative)',
          'SASB (now part of IFRS Sustainability Standards)',
          'SEC Form 10-K only',
          'GAAP Accounting Principles'
        ],
        correctAnswerIndex: 0,
        explanation: 'GRI Standards provide the global benchmark for multi-stakeholder impact reporting, while SASB/ISSB focus predominantly on enterprise value creation for investors.'
      },
      {
        id: 'sf-q4',
        questionText: 'Under the Science Based Targets initiative (SBTi) Corporate Net-Zero Standard, what is the maximum percentage of base year emissions that can be neutralized via carbon removals at net-zero?',
        options: [
          'A maximum of 10% (at least 90% must come from direct internal abatement across Scopes 1, 2, and 3)',
          'Up to 50% through carbon offsets',
          '100% through unbundled renewable energy credits',
          'There is no limit on carbon removals'
        ],
        correctAnswerIndex: 0,
        explanation: 'The SBTi Net-Zero Standard requires companies to decarbonize 90% or more of their total value chain emissions before the residual 10% or less can be permanently neutralized with carbon removals.'
      },
      {
        id: 'sf-q5',
        questionText: 'Which EU directive mandates standardized ESG disclosures and third-party limited assurance for over 50,000 companies operating in Europe?',
        options: [
          'CSRD (Corporate Sustainability Reporting Directive)',
          'GDPR (General Data Protection Regulation)',
          'EU RoHS Directive',
          'MiFID II'
        ],
        correctAnswerIndex: 0,
        explanation: 'The Corporate Sustainability Reporting Directive (CSRD) replaces the NFRD, introducing standardized European Sustainability Reporting Standards (ESRS) and mandatory audit assurance.'
      }
    ]
  },
  'green-it': {
    courseId: 'green-it',
    title: 'Green IT Fundamentals Comprehensive Assessment',
    passingScorePercent: 80,
    questions: [
      {
        id: 'git-q1',
        questionText: 'What is the formula for the Software Carbon Intensity (SCI) specification established by the Green Software Foundation?',
        options: [
          'SCI = ((E * I) + M) / R',
          'SCI = (PUE * WUE) / Servers',
          'SCI = CPU * RAM * Bandwidth',
          'SCI = Total Cost / Kilowatt Hours'
        ],
        correctAnswerIndex: 0,
        explanation: 'The SCI equation calculates the carbon intensity per functional unit R: E (energy consumed in kWh) multiplied by I (marginal carbon intensity of the grid) plus M (embodied carbon of the hardware), divided by R.'
      },
      {
        id: 'git-q2',
        questionText: 'In data center engineering, how is Power Usage Effectiveness (PUE) calculated?',
        options: [
          'Total Facility Energy / IT Equipment Energy',
          'IT Equipment Energy / Cooling Energy',
          'Renewable Energy / Total Electrical Grid Energy',
          'Server Count / Total Facility Area'
        ],
        correctAnswerIndex: 0,
        explanation: 'PUE is the ratio of total energy entering the data center facility divided by the energy consumed directly by IT equipment (servers, storage, network switches). An ideal PUE is 1.0.'
      },
      {
        id: 'git-q3',
        questionText: 'What is "carbon-aware computing"?',
        options: [
          'Running computational workloads when and where the electrical grid is powered by clean renewable energy',
          'Purchasing tree-planting certificates after running GPU training clusters',
          'Writing software exclusively in compiled assembly language',
          'Shutting down servers during company holidays only'
        ],
        correctAnswerIndex: 0,
        explanation: 'Carbon-aware computing uses real-time marginal carbon intensity data from electricity grids to temporally shift batch jobs to clean hours or spatially migrate compute to lower-carbon geographic regions.'
      },
      {
        id: 'git-q4',
        questionText: 'What is "embodied carbon" in server hardware?',
        options: [
          'The greenhouse gas emissions produced during mineral extraction, silicon manufacturing, assembly, shipping, and end-of-life recycling',
          'The heat emitted by the CPU during code execution',
          'The electricity used by the cooling fans inside the server chassis',
          'The carbon footprint of the software developer writing the code'
        ],
        correctAnswerIndex: 0,
        explanation: 'Embodied carbon encompasses the entire cradle-to-gate and end-of-life emissions embedded in the physical physical hardware components before operational power is consumed.'
      },
      {
        id: 'git-q5',
        questionText: 'Why does marginal carbon intensity matter more for green software scheduling than average grid carbon intensity?',
        options: [
          'Because turning on additional compute load causes the grid to dispatch the next marginal generator on the margin, which is often fossil-fueled',
          'Because marginal intensity is always lower than average intensity',
          'Because average intensity is illegal to measure under ISO standards',
          'Because marginal intensity only applies to nuclear power plants'
        ],
        correctAnswerIndex: 0,
        explanation: 'Marginal operating emissions rates (MOER) reflect the specific power plant that responds to a change in electrical demand. Adding load during high-demand hours spins up peaking fossil turbines.'
      }
    ]
  },
  'energy-efficiency': {
    courseId: 'energy-efficiency',
    title: 'Industrial Energy Auditing & ISO 50001 Assessment',
    passingScorePercent: 80,
    questions: [
      {
        id: 'ee-q1',
        questionText: 'Under the fan and pump Affinity Laws, how does power consumption vary with rotational shaft speed?',
        options: [
          'Power varies with the cube of the speed (P ∝ N³)',
          'Power is directly proportional to speed (P ∝ N)',
          'Power varies with the square of the speed (P ∝ N²)',
          'Power is independent of shaft speed'
        ],
        correctAnswerIndex: 0,
        explanation: 'The Affinity Laws state that flow is proportional to speed (Q ∝ N), pressure is proportional to speed squared (H ∝ N²), and power is proportional to speed cubed (P ∝ N³). A 20% speed reduction drops power by ~49%.'
      },
      {
        id: 'ee-q2',
        questionText: 'Which ASHRAE audit level is classified as an "Investment-Grade Energy Audit" providing capital expenditure and life cycle cost analysis suitable for project financing?',
        options: [
          'ASHRAE Level 3 (Detailed Analysis of Capital-Intensive Modifications)',
          'ASHRAE Level 1 (Walk-Through Analysis)',
          'ASHRAE Level 2 (Energy Survey and Engineering Analysis)',
          'Preliminary Utility Benchmark Screening'
        ],
        correctAnswerIndex: 0,
        explanation: 'ASHRAE Level 3 expands on Level 2 with rigorous data logging, dynamic energy modeling, and investment-grade financial engineering to back commercial financing.'
      },
      {
        id: 'ee-q3',
        questionText: 'What is the primary management standard for organizations establishing, implementing, maintaining, and improving an Energy Management System (EnMS)?',
        options: [
          'ISO 50001:2018',
          'ISO 9001:2015',
          'ISO 27001',
          'LEED v4 Interior Design'
        ],
        correctAnswerIndex: 0,
        explanation: 'ISO 50001:2018 is the international standard specifying requirements for establishing and improving an Energy Management System to achieve systematic energy performance improvements.'
      },
      {
        id: 'ee-q4',
        questionText: 'In compressed air systems, what proportion of electrical input energy is typically lost as low-grade reject heat rather than useful mechanical work?',
        options: [
          '80% to 90%',
          '10% to 15%',
          'Zero percent (100% efficient)',
          'Exactly 50%'
        ],
        correctAnswerIndex: 0,
        explanation: 'Compressing air is thermally inefficient: approximately 85% to 90% of electrical energy fed into an industrial compressor is converted into heat, making waste heat recovery and leak management essential.'
      },
      {
        id: 'ee-q5',
        questionText: 'What tool or parameter is used to normalize energy consumption against fluctuating weather conditions?',
        options: [
          'Heating Degree Days (HDD) and Cooling Degree Days (CDD) with regression modeling',
          'Simple arithmetic averages of unadjusted monthly utility bills',
          'Total square footage multiplied by constant 10 kWh',
          'Nominal nameplate capacity ratings'
        ],
        correctAnswerIndex: 0,
        explanation: 'Degree days (HDD/CDD) quantify the demand for heating and cooling based on outdoor ambient temperatures, enabling weather-normalized energy performance indicator (EnPI) modeling.'
      }
    ]
  },
  'waste-management': {
    courseId: 'waste-management',
    title: 'Circular Waste Management & Zero-Waste Systems Assessment',
    passingScorePercent: 80,
    questions: [
      {
        id: 'wm-q1',
        questionText: 'To achieve TRUE Zero Waste certification by Green Business Certification Inc. (GBCI), what minimum diversion rate must a facility achieve and maintain for a minimum of 12 months?',
        options: [
          'At least 90% overall diversion from landfill, incineration, and the environment',
          'At least 50% diversion',
          '100% elimination of all plastics only',
          '75% diversion of hazardous waste only'
        ],
        correctAnswerIndex: 0,
        explanation: 'The TRUE Zero Waste standard requires a minimum 90% diversion rate of non-hazardous solid waste from landfills and thermal incineration processes across 12 consecutive months.'
      },
      {
        id: 'wm-q2',
        questionText: 'What greenhouse gas is predominantly emitted when organic food and yard waste decomposes anaerobically inside traditional landfills?',
        options: [
          'Methane (CH4), which has a GWP100 of 28 to 30 times that of CO2',
          'Oxygen (O2)',
          'Argon (Ar)',
          'Ozone (O3)'
        ],
        correctAnswerIndex: 0,
        explanation: 'Landfills are one of the largest anthropogenic sources of methane. Diverting organics to aerobic composting or anaerobic digestion with biogas capture abates these potent emissions.'
      },
      {
        id: 'wm-q3',
        questionText: 'What standard test method is published by ASTM for the determination of the composition of unprocessed municipal solid waste through manual sorting?',
        options: [
          'ASTM D5231',
          'ASTM C150',
          'ASTM E84',
          'ASTM A36'
        ],
        correctAnswerIndex: 0,
        explanation: 'ASTM D5231 provides the standard test method for determining the composition of unprocessed municipal solid waste by manual sorting of representative sample batches.'
      },
      {
        id: 'wm-q4',
        questionText: 'In industrial ecology, what is "Industrial Symbiosis"?',
        options: [
          'An association where waste or by-products of an industrial facility become the raw materials for another facility',
          'Two companies merging their corporate boards',
          'Planting trees along factory borders',
          'Outsourcing manufacturing to international contractors'
        ],
        correctAnswerIndex: 0,
        explanation: 'Industrial symbiosis engages traditionally separate industries in a collective approach to competitive advantage involving physical exchange of materials, energy, water, and by-products (such as the Kalundborg eco-industrial park).'
      },
      {
        id: 'wm-q5',
        questionText: 'What is the optimal Carbon-to-Nitrogen (C:N) ratio for rapid, aerobic commercial composting systems?',
        options: [
          '25:1 to 30:1',
          '5:1 to 10:1',
          '100:1 to 200:1',
          '1:1'
        ],
        correctAnswerIndex: 0,
        explanation: 'A C:N ratio between 25:1 and 30:1 provides microorganisms with the ideal balance of carbon for energy and cellular synthesis and nitrogen for protein formation without releasing excess ammonia odor.'
      }
    ]
  },
  'climate-awareness': {
    courseId: 'climate-awareness',
    title: 'Climate Science & GHG Protocol Corporate Assessment',
    passingScorePercent: 80,
    questions: [
      {
        id: 'ca-q1',
        questionText: 'Under the GHG Protocol Corporate Standard, which category represents direct emissions from company-owned or controlled boilers, furnaces, and vehicle fleets?',
        options: [
          'Scope 1 (Direct GHG Emissions)',
          'Scope 2 (Market-Based Electricity Emissions)',
          'Scope 3 Category 1 (Purchased Goods)',
          'Scope 3 Category 4 (Upstream Freight)'
        ],
        correctAnswerIndex: 0,
        explanation: 'Scope 1 emissions are direct emissions from operations owned or controlled by the reporting organization, such as boilers and owned fleet vehicles.'
      },
      {
        id: 'ca-q2',
        questionText: 'Under the GHG Protocol Scope 2 Guidance, what dual-reporting requirement must organizations follow in markets with contractual instruments?',
        options: [
          'Dual reporting using both the Location-Based method and the Market-Based method',
          'Reporting only Location-Based grid average factors',
          'Reporting Scope 2 only if renewable certificates are retired',
          'Combining Scope 1 and Scope 2 into a single line item'
        ],
        correctAnswerIndex: 0,
        explanation: 'Dual reporting requires companies to quantify Scope 2 emissions using both the location-based method (grid average) and the market-based method (supplier contracts and EACs).'
      },
      {
        id: 'ca-q3',
        questionText: 'How many distinct Scope 3 categories are established by the GHG Protocol Corporate Value Chain Standard?',
        options: [
          '15 categories (8 upstream and 7 downstream)',
          '5 categories',
          '10 categories',
          '3 categories'
        ],
        correctAnswerIndex: 0,
        explanation: 'The GHG Protocol Scope 3 Standard classifies value chain emissions into 15 categories: Categories 1-8 are upstream and Categories 9-15 are downstream.'
      },
      {
        id: 'ca-q4',
        questionText: 'What metric represents the cumulative radiative forcing of a greenhouse gas relative to carbon dioxide over a 100-year horizon in IPCC reports?',
        options: [
          'GWP100 (Global Warming Potential 100-year)',
          'LCOE (Levelized Cost of Energy)',
          'Albedo Reflectance Ratio',
          'EEIO spend-to-weight index'
        ],
        correctAnswerIndex: 0,
        explanation: 'GWP100 standardizes the warming impact of different greenhouse gases over 100 years relative to CO2, which has a baseline GWP of 1.'
      },
      {
        id: 'ca-q5',
        questionText: 'Under the Science Based Targets initiative (SBTi), what is required if Scope 3 emissions represent 40% or more of an enterprise total carbon footprint?',
        options: [
          'The company MUST establish a validated near-term Scope 3 target',
          'Scope 3 can be ignored until 2050',
          'The company must purchase 100% voluntary carbon offsets immediately',
          'The company is exempt from SBTi validation'
        ],
        correctAnswerIndex: 0,
        explanation: 'If Scope 3 represents 40% or more of total emissions (Scopes 1, 2, and 3), SBTi mandates setting an ambitious, science-based near-term Scope 3 target covering at least two-thirds of Scope 3 emissions.'
      }
    ]
  }
};

COURSE_QUIZZES['green-it-fundamentals'] = COURSE_QUIZZES['green-it'];
