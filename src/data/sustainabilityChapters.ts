import { CourseChapter } from '../types';

export const SUSTAINABILITY_CHAPTERS: CourseChapter[] = [
  {
    id: 'sf-ch1',
    chapterNumber: 1,
    title: 'Chapter 1: Corporate Sustainability & The Triple Bottom Line',
    description: 'Understand the foundational principles of corporate sustainability, the 9 planetary boundaries, and the shift from shareholder primacy to multi-stakeholder value.',
    durationMinutes: 45,
    learningObjectives: [
      'Define corporate sustainability and the Triple Bottom Line (People, Planet, Profit)',
      'Examine the Stockholm Resilience Centre 9 planetary boundaries framework',
      'Identify critical ecological thresholds and corporate accountability boundaries',
      'Evaluate how modern organizations balance economic value creation with biosphere integrity'
    ],
    lessonContent: [
      'Corporate sustainability is a strategic business approach that creates long-term stakeholder value by balancing ecological, social, and economic dimensions. Traditionally, corporate management operated strictly under the Friedman doctrine of shareholder primacy, measuring performance solely by short-term financial quarterly earnings. However, the accelerating crises of climate instability, resource depletion, and biodiversity collapse have forced organizations to recognize that a business cannot thrive in a failing biosphere.',
      'The foundational framework of modern sustainability is the Triple Bottom Line (TBL), introduced by John Elkington. Rather than evaluating success by financial profit alone, TBL requires accounting across three interconnected pillars: Environmental Quality (Planet), Social Equity (People), and Economic Prosperity (Profit). Under this model, an enterprise that records record profits while dumping untreated effluents or exhausting worker health is running an unsustainable deficit.',
      'To provide scientific boundaries for human activity, researchers led by Johan Rockström and Will Steffen at the Stockholm Resilience Centre established the Nine Planetary Boundaries framework. These boundaries identify the biological and geophysical thresholds within which humanity can safely develop. They include climate change, biosphere integrity, stratospheric ozone depletion, ocean acidification, biogeochemical flows (nitrogen and phosphorus cycles), freshwater use, land-system change, novel entities (synthetic chemicals and plastics), and atmospheric aerosol loading.',
      'Alarmingly, scientific assessments show that human activity has transgressed at least six of these nine boundaries. For organizations, this means sustainability is no longer merely a public relations exercise or optional philanthropy. It is an existential risk management discipline. Forward-looking enterprises must map their operational dependencies and externalities against these boundaries, transforming compliance into innovation.'
    ],
    practicalExamples: [
      {
        title: 'Interface Inc. Mission Zero & Climate Take Back',
        description: 'Under late founder Ray Anderson, commercial flooring manufacturer Interface pivoted from an oil-intensive petroleum model to closed-loop carpet tiles made from 100% recycled nylon sourced from discarded fishing nets. Interface reduced greenhouse emissions by 96% and landfill waste by 91% while expanding global operating margins.'
      },
      {
        title: 'Stockholm Resilience Centre Corporate Biosphere Stewardship',
        description: 'Leading global food and agribusiness conglomerates engaged in the Keystone Dialogues to align their global supply chains with biosphere boundaries. By eliminating deforestation in soy and palm oil sourcing, participating companies demonstrated measurable reductions in biodiversity loss.'
      }
    ],
    activityTask: {
      title: 'Planetary Boundary Impact Mapping',
      instruction: 'Select an organization or industry you are familiar with (e.g., retail clothing, software, food services, or healthcare). Choose two of the nine planetary boundaries (e.g., freshwater use and land-system change). Identify one direct way this organization impacts each boundary and describe a tangible operational change that would reduce its pressure on that threshold.',
      prompt: 'Which two planetary boundaries did you choose, and what concrete operational interventions did you formulate?'
    },
    video: {
      status: 'verified',
      url: 'https://www.youtube.com/embed/V93aw7C3fl8',
      title: 'Johan Rockström: The 9 Planetary Boundaries Explained',
      duration: '18 mins',
      sourceNote: 'Stockholm Resilience Centre / TED Global'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'sf-ch1-q1',
          questionText: 'What are the three pillars of the Triple Bottom Line framework?',
          options: [
            'People, Planet, and Profit (Social, Environmental, and Economic)',
            'Price, Product, and Promotion',
            'Procurement, Production, and Packaging',
            'Policy, Patents, and Performance'
          ],
          correctAnswerIndex: 0,
          explanation: 'The Triple Bottom Line framework requires companies to measure their social, environmental, and economic impacts rather than focusing solely on financial profits.'
        },
        {
          id: 'sf-ch1-q2',
          questionText: 'According to the Stockholm Resilience Centre, how many planetary boundaries define the safe operating threshold for humanity?',
          options: [
            '9 planetary boundaries',
            '3 atmospheric boundaries',
            '17 sustainable boundaries',
            '5 oceanic boundaries'
          ],
          correctAnswerIndex: 0,
          explanation: 'The framework identifies nine planetary boundaries that regulate the stability and resilience of the Earth system.'
        },
        {
          id: 'sf-ch1-q3',
          questionText: 'Why is corporate sustainability considered an essential risk-management discipline rather than mere philanthropy?',
          options: [
            'Transgressing ecological boundaries causes supply chain disruptions, regulatory penalties, and stranded asset risks',
            'Philanthropic donations are legally prohibited for listed corporations',
            'Environmental regulations only apply to non-profit organizations',
            'Shareholders do not care about long-term operational survival'
          ],
          correctAnswerIndex: 0,
          explanation: 'Severe climate events, resource scarcity, and tightening regulations directly threaten corporate enterprise value and business continuity.'
        }
      ]
    }
  },
  {
    id: 'sf-ch2',
    chapterNumber: 2,
    title: 'Chapter 2: Double Materiality & International ESG Frameworks',
    description: 'Master the concept of double materiality, evaluate the differences between impact and financial perspectives, and explore CSRD, GRI, SASB, and ISSB frameworks.',
    durationMinutes: 50,
    learningObjectives: [
      'Understand the principle of Double Materiality established under the EU CSRD directive',
      'Distinguish between impact materiality (inside-out) and financial materiality (outside-in)',
      'Compare international disclosure standards: GRI, SASB/ISSB, and TCFD',
      'Construct a double materiality matrix to prioritize corporate sustainability topics'
    ],
    lessonContent: [
      'In traditional financial accounting, an item is considered "material" if its omission or misstatement could influence the economic decisions of investors. In sustainability accounting, this definition has undergone a profound revolution known as "Double Materiality". Codified under the European Union Corporate Sustainability Reporting Directive (CSRD) and the European Sustainability Reporting Standards (ESRS), double materiality requires companies to assess their business through two distinct lenses.',
      'The first lens is Impact Materiality (the "inside-out" perspective). This evaluates how the company\'s operations, products, and supply chains affect people, human rights, and the environment over short, medium, and long terms. For instance, if a manufacturing plant emits nitrogen oxides or consumes significant municipal water, this is material from an impact perspective regardless of whether it immediately hurts corporate profits.',
      'The second lens is Financial Materiality (the "outside-in" perspective). This evaluates how environmental, social, and governance issues generate financial risks or opportunities that affect the company\'s development, cash flows, and enterprise value. For example, severe drought threatening a semiconductor fabrication plant\'s water supply is financially material because water shortages can halt chip production.',
      'A topic is deemed material if it meets either the impact threshold, the financial threshold, or both. International frameworks reflect these perspectives: the Global Reporting Initiative (GRI) focuses predominantly on multi-stakeholder impact reporting, while the International Sustainability Standards Board (ISSB, building on SASB and TCFD) focuses primarily on enterprise value and investor-relevant financial risks.'
    ],
    practicalExamples: [
      {
        title: 'Danone Double Materiality Matrix Implementation',
        description: 'Multinational food producer Danone conducted a comprehensive double materiality assessment across 24 sustainability topics. Topics like regenerative agriculture, water stewardship, and plastic packaging circularity scored highest on both environmental impact and long-term financial resilience.'
      },
      {
        title: 'Automotive Sector Transition Under CSRD',
        description: 'European automotive manufacturers subject to CSRD expanded their disclosure from tailpipe fleet emissions to include raw material human rights audits in lithium and cobalt mining, alongside physical climate risks to assembly plants in flood plains.'
      }
    ],
    activityTask: {
      title: 'Double Materiality Topic Classification',
      instruction: 'Select a corporate business sector (such as beverage production, consumer technology, or commercial banking). Choose three sustainability topics (e.g., packaging waste, water scarcity, and executive pay equity). For each topic, evaluate whether it represents primarily Impact Materiality, Financial Materiality, or Double Materiality, and provide a 1-2 sentence justification.',
      prompt: 'Which sector did you analyze, and how did you categorize your three sustainability topics?'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified EFRAG CSRD double materiality educational lecture module in preparation'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'sf-ch2-q1',
          questionText: 'What is the definition of "Double Materiality"?',
          options: [
            'Evaluating both inside-out impacts on people/planet and outside-in ESG risks to enterprise financial value',
            'Filing financial tax reports with two independent governmental bodies',
            'Auditing Scope 1 and Scope 2 emissions on separate ledgers',
            'Measuring profits twice per fiscal quarter'
          ],
          correctAnswerIndex: 0,
          explanation: 'Double materiality combines impact materiality (the company impact on the world) and financial materiality (the world impact on the company).'
        },
        {
          id: 'sf-ch2-q2',
          questionText: 'Which international disclosure framework focuses primarily on multi-stakeholder impact reporting on the economy, environment, and society?',
          options: [
            'GRI (Global Reporting Initiative)',
            'SEC Form 10-K',
            'GAAP Standard Only',
            'US Patent Office Registry'
          ],
          correctAnswerIndex: 0,
          explanation: 'GRI Standards provide the global benchmark for multi-stakeholder impact reporting, whereas ISSB/SASB focus on financial materiality for capital markets.'
        },
        {
          id: 'sf-ch2-q3',
          questionText: 'Under the EU CSRD, when must a sustainability topic be included in mandatory corporate disclosures?',
          options: [
            'If it is material from either an impact perspective, a financial perspective, or both',
            'Only if it reduces short-term operating costs by more than 10%',
            'Only if all competitors agree to report it simultaneously',
            'Only when mandated by a court order'
          ],
          correctAnswerIndex: 0,
          explanation: 'Under CSRD, a topic is material if it satisfies either the impact criterion or the financial criterion, ensuring comprehensive accountability.'
        }
      ]
    }
  },
  {
    id: 'sf-ch3',
    chapterNumber: 3,
    title: 'Chapter 3: Value Chain Mapping & Scope Boundaries',
    description: 'Map operational and supply chain boundaries, understand upstream and downstream value chain impacts, and establish accountability across Tier 1, 2, and 3 suppliers.',
    durationMinutes: 45,
    learningObjectives: [
      'Understand how organizational boundaries and operational control are established',
      'Distinguish between upstream, operational, and downstream value chain stages',
      'Identify supply chain environmental hotspots and primary emission drivers',
      'Structure vendor engagement programs to gather auditable primary sustainability data'
    ],
    lessonContent: [
      'To manage and reduce environmental impacts effectively, an organization must delineate where its responsibility begins and ends. The Greenhouse Gas (GHG) Protocol and ISO 14064 establish two distinct methods for setting organizational boundaries: the Equity Share approach (where an organization accounts for emissions according to its percentage of equity in an operation) and the Control approach (accounting for 100% of emissions from operations over which it has financial or operational control).',
      'Once the organizational boundary is established, the organization must map its entire value chain across three continuous phases: Upstream, Direct Operations, and Downstream. Upstream activities include raw material extraction, Tier 1 direct supplier manufacturing, Tier 2 component fabrication, capital goods acquisition, and inbound freight logistics. Direct operations encompass the facilities, offices, and fleet vehicles directly operated by the company.',
      'Downstream activities encompass the distribution, retail display, customer use, and end-of-life disposal or recycling of the products sold. For most non-industrial service and technology organizations, over 80% of their total environmental footprint lies outside their own four walls—embedded upstream in vendor supply chains and downstream in customer product energy consumption.',
      'Conducting an effective value chain hotspot analysis allows organizations to identify the "vital few" areas where sustainability interventions yield the highest return. By prioritizing Tier 1 and Tier 2 vendor engagement, mandating primary activity data collection, and co-investing in clean energy or circular feedstock, organizations transform their entire ecosystem.'
    ],
    practicalExamples: [
      {
        title: 'Apple Clean Energy Supplier Program',
        description: 'Apple determined that 70% of its comprehensive carbon footprint was generated by its overseas manufacturing partners. Rather than leaving suppliers to solve this individually, Apple launched its Clean Energy Program, transitioning over 300 manufacturing suppliers to 100% renewable electricity and abating over 23 million metric tons of emissions.'
      },
      {
        title: 'IKEA Circular Supply Chain & Bio-Based Glues',
        description: 'Retail home furnishings giant IKEA identified that particle board adhesives in furniture accounted for 5% of its entire global climate footprint. IKEA partnered with upstream chemical suppliers to replace petroleum-based resins with bio-based glues derived from agricultural starch, decoupling material production from fossil fuels.'
      }
    ],
    activityTask: {
      title: 'Supply Chain Tier Diagramming',
      instruction: 'Select a physical everyday product (such as a cotton T-shirt, a stainless steel water bottle, or a box of cereal). Diagram its value chain across three tiers: Tier 1 (final assembly/packaging), Tier 2 (material processing, such as spinning yarn or refining steel), and Tier 3 (raw agricultural or mineral extraction). Note down where the greatest environmental impact is likely concentrated.',
      prompt: 'What product did you choose, and which tier represents the primary environmental hotspot?'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video on value chain GHG mapping in preparation'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'sf-ch3-q1',
          questionText: 'For most consumer and technology enterprises, where is the majority (often 80%+) of their environmental footprint located?',
          options: [
            'Outside direct operations, embedded in upstream supply chains and downstream product use',
            'Exclusively in headquarter office lighting and air conditioning',
            'In paper printing in corporate conference rooms',
            'In executive business travel only'
          ],
          correctAnswerIndex: 0,
          explanation: 'Supply chains (upstream) and consumer product use/disposal (downstream) typically dominate the total environmental lifecycle impact.'
        },
        {
          id: 'sf-ch3-q2',
          questionText: 'In supply chain terminology, what is a "Tier 1" supplier?',
          options: [
            'A direct vendor that sells products, parts, or services directly to the reporting company',
            'A raw material mining company at the base of the earth',
            'The end consumer who buys the product in a retail store',
            'An external financial auditing accounting firm'
          ],
          correctAnswerIndex: 0,
          explanation: 'Tier 1 suppliers are direct partners that conduct business and invoice the reporting company directly.'
        },
        {
          id: 'sf-ch3-q3',
          questionText: 'Under the GHG Protocol, what are the two main approaches for setting organizational boundary consolidated accounts?',
          options: [
            'The Equity Share approach and the Control approach (Operational or Financial)',
            'The Cash Accounting approach and Accrual approach',
            'The National boundary approach and Global boundary approach',
            'The Voluntary approach and Mandatory approach'
          ],
          correctAnswerIndex: 0,
          explanation: 'The GHG Protocol allows organizations to consolidate emissions either based on their financial/operational control or by their equity share in operations.'
        }
      ]
    }
  },
  {
    id: 'sf-ch4',
    chapterNumber: 4,
    title: 'Chapter 4: Governance, Strategy & Policy Formulation',
    description: 'Learn how to establish board-level sustainability governance, link executive remuneration to verified ESG targets, and draft an enforceable corporate sustainability policy.',
    durationMinutes: 50,
    learningObjectives: [
      'Structure board-level oversight and executive committee sustainability governance',
      'Integrate Science Based Targets (SBTi) into enterprise strategy',
      'Link executive compensation to audited decarbonization and safety milestones',
      'Formulate and write a compliant corporate sustainability charter and policy statement'
    ],
    lessonContent: [
      'Without effective governance and executive alignment, corporate sustainability initiatives quickly stall into fragmented, superficial efforts. Robust sustainability governance establishes clear oversight, strategic accountability, and rigorous internal controls from the Board of Directors down to operational business units.',
      'Under modern governance standards (such as the UK Corporate Governance Code and EU CSRD Pillar G1), the Board of Directors is directly responsible for overseeing environmental and social risks, approving decarbonization roadmaps, and ensuring disclosure integrity. High-performing organizations establish a dedicated Board Sustainability Committee or assign explicit ESG risk mandates to the Audit and Risk Committee.',
      'To ensure strategic alignment, leading enterprises tie executive compensation and long-term incentive plans (LTIPs) directly to verified sustainability metrics. For example, rather than basing executive bonuses 100% on EBITDA and stock price, forward-thinking corporations allocate 15% to 25% of annual variable compensation to meeting verified Science Based Targets initiative (SBTi) milestones, reducing packaging intensity, or achieving zero workplace safety incidents.',
      'Finally, an organization must codify its commitments into a formal, binding Corporate Sustainability Policy. A high-quality policy outlines the organization\'s core principles, scopes operational boundaries, specifies measurable target deadlines, assigns departmental ownership, and defines annual third-party audit requirements.'
    ],
    practicalExamples: [
      {
        title: 'Microsoft Internal Carbon Fee Governance',
        description: 'Microsoft established an internal fee on carbon emissions charged directly to each business division\'s operating budget. By putting an actual price on carbon across Scopes 1, 2, and 3, divisional leaders were financially incentivized to choose low-carbon cloud suppliers, efficient hardware, and sustainable air travel.'
      },
      {
        title: 'Unilever Executive Compensation ESG Integration',
        description: 'Consumer goods company Unilever linked performance shares for senior leadership to progress on environmental benchmarks, including 100% renewable electricity in manufacturing, deforestation-free palm oil sourcing, and post-consumer recycled plastic packaging targets.'
      }
    ],
    activityTask: {
      title: 'Sustainability Governance Charter Drafting',
      instruction: 'Draft a concise 1-page Corporate Sustainability Policy Statement for an organization. Include: (1) An executive commitment statement; (2) Three quantifiable goals (e.g., 50% absolute emissions reduction by 2030, zero waste to landfill by 2028); (3) Internal governance roles (who oversees progress); and (4) Verification mechanisms (annual third-party audit).',
      prompt: 'Share the core commitment statement and the three quantifiable goals you formulated.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video on corporate sustainability governance in preparation'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'sf-ch4-q1',
          questionText: 'Under modern corporate governance frameworks, where does ultimate fiduciary accountability for sustainability risk oversight reside?',
          options: [
            'With the Board of Directors and executive leadership',
            'Exclusively with entry-level volunteer green teams',
            'With external social media influencers',
            'Solely with the facility janitorial staff'
          ],
          correctAnswerIndex: 0,
          explanation: 'Boards of Directors hold the ultimate fiduciary duty to oversee material risks, including climate disruption, regulatory non-compliance, and transition risks.'
        },
        {
          id: 'sf-ch4-q2',
          questionText: 'Under the Science Based Targets initiative (SBTi) Net-Zero Standard, what minimum percentage of value chain emissions must be reduced through direct abatement before residual emissions can be neutralized?',
          options: [
            'At least 90% direct reduction across Scopes 1, 2, and 3',
            'At least 20%',
            'Zero percent (100% can be carbon credits)',
            'Exactly 50%'
          ],
          correctAnswerIndex: 0,
          explanation: 'The SBTi Corporate Net-Zero Standard requires companies to decarbonize at least 90% of their baseline emissions, allowing residual neutralization only for the remaining 10% or less.'
        },
        {
          id: 'sf-ch4-q3',
          questionText: 'Why do organizations incorporate ESG key performance indicators (KPIs) into executive variable compensation packages?',
          options: [
            'To ensure corporate strategy actively translates into operational priorities rather than remaining a marketing claim',
            'Because executive salaries are legally required to be paid in carbon offsets',
            'To avoid paying cash bonuses under any circumstances',
            'To prevent company employees from forming committees'
          ],
          correctAnswerIndex: 0,
          explanation: 'Linking executive bonuses and stock vesting to audited environmental milestones aligns executive incentives with long-term planetary stewardship and corporate resilience.'
        }
      ]
    }
  }
];
