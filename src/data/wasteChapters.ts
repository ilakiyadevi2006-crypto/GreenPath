import { CourseChapter } from '../types';

export const WASTE_MANAGEMENT_CHAPTERS: CourseChapter[] = [
  {
    id: 'wm-ch1',
    chapterNumber: 1,
    title: 'Chapter 1: Waste Characterization & ASTM Auditing Methodologies',
    description: 'Learn standardized waste sampling and physical characterization under ASTM D5231, mass-balance flow analysis, and material stream segregation.',
    durationMinutes: 45,
    learningObjectives: [
      'Master the standard test method for waste composition auditing under ASTM D5231',
      'Execute sample size determination, stratified random sampling, and manual sorting',
      'Establish mass-balance waste flow matrices across facility generation points',
      'Calculate statistical confidence intervals (90% CI) for material categories'
    ],
    lessonContent: [
      'You cannot manage what you do not measure. In solid waste engineering and circular economy strategy, an accurate physical waste characterization audit is the essential first step toward eliminating landfill disposal. Without empirical data on what a facility actually throws away, waste reduction programs rely on guesswork and generic assumptions.',
      'The international benchmark for determining the composition of unprocessed solid waste is ASTM D5231 (Standard Test Method for Determination of the Composition of Unprocessed Municipal Solid Waste). This protocol specifies rigorous procedures for collecting, quartering, and manually sorting representative waste samples into distinct material categories (such as corrugated cardboard, high-density polyethylene plastics, mixed paper, organic compostables, ferrous metals, and non-recyclable residuals).',
      'Under ASTM D5231, a reliable audit requires statistically significant sampling. For a typical commercial or institutional facility, auditors collect between 20 and 30 sample batches (each weighing approximately 200 to 300 pounds / 90 to 135 kg) over a representative multi-day operating cycle. Auditors manually sort each batch on sorting tables into labeled bins, weigh each fraction using calibrated digital scales, and calculate the mean percentage composition along with 90% confidence intervals.',
      'Conducting a characterization audit also includes mapping "waste generation touchpoints" within the facility. By identifying whether contamination originates in food service concessions, loading dock shipping areas, or office copy rooms, organizations can deploy targeted upstream interventions rather than relying on downstream sorting.'
    ],
    practicalExamples: [
      {
        title: 'University Campus 5-Day Waste Characterization Study',
        description: 'A major university campus with 25,000 students conducted an ASTM D5231 audit, manually sorting 4,200 pounds of campus waste over five days. The audit revealed that 48% of waste sent to landfills was compostable food organics and napkins, while 26% was clean corrugated cardboard discarded by dorm move-in. Deploying post-consumer composting and targeted cardboard balers cut campus landfill hauling fees by 62%.'
      },
      {
        title: 'International Airport Concessions Sorting Protocol',
        description: 'An international airport terminal audited 180 concessions vendors. Finding that disposable single-use coffee cups and food packaging contaminated dry recycling streams, the airport instituted a unified front-of-house sorting station standard with color-coded apertures and pictograms, boosting uncontaminated material recovery by 44%.'
      }
    ],
    activityTask: {
      title: 'Facility Waste Stream Audit Protocol Design',
      instruction: 'Design a 1-day waste characterization sorting plan for an office building, school, or retail store. Identify the five primary material categories you will sort (e.g., corrugated cardboard, flexible film plastics, compostable organics, clean aluminum cans, and non-recyclable trash). Describe how you will safely collect samples and what equipment you will need (scales, PPE, sorting table).',
      prompt: 'List your five sorting categories and specify the safety PPE and weighing equipment you will use.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video on ASTM D5231 waste characterization in preparation'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'wm-ch1-q1',
          questionText: 'What is the standard ASTM test method for the physical characterization of solid waste through manual sorting?',
          options: [
            'ASTM D5231',
            'ASTM C150',
            'ASTM E84',
            'ASTM A36'
          ],
          correctAnswerIndex: 0,
          explanation: 'ASTM D5231 provides the definitive methodology for manual sorting and physical characterization of unprocessed municipal and commercial solid waste.'
        },
        {
          id: 'wm-ch1-q2',
          questionText: 'In waste characterization audits, why is a single 10-pound sample insufficient to establish a facility waste profile?',
          options: [
            'Solid waste is highly heterogeneous; a small sample cannot provide statistical confidence across diverse generation points',
            'Because scales cannot measure weights below 50 pounds',
            'Because state law requires all samples to weigh exactly 1,000 pounds',
            'Because single samples are automatically classified as hazardous waste'
          ],
          correctAnswerIndex: 0,
          explanation: 'Waste varies significantly across days and departments. Standard protocols require multiple 200-300 lb sample batches to reach a 90% confidence level.'
        },
        {
          id: 'wm-ch1-q3',
          questionText: 'What is the primary objective of mapping waste generation touchpoints inside a facility?',
          options: [
            'To identify where contamination originates so upstream redesign and behavioral changes can occur at the source',
            'To fine individual employees directly for each discarded item',
            'To eliminate all trash receptacles from the property permanently',
            'To replace all janitorial personnel with automated shredders'
          ],
          correctAnswerIndex: 0,
          explanation: 'Mapping generation touchpoints targets root causes upstream—preventing waste creation and contamination before materials enter the waste stream.'
        }
      ]
    }
  },
  {
    id: 'wm-ch2',
    chapterNumber: 2,
    title: 'Chapter 2: Diversion Rate Calculations & TRUE Zero Waste Certification',
    description: 'Master the zero-waste diversion formula, understand GBCI TRUE Zero Waste certification credits, and eliminate non-compliant landfill contamination.',
    durationMinutes: 45,
    learningObjectives: [
      'Calculate facility diversion rates using the zero-waste mass equation',
      'Examine the GBCI TRUE Zero Waste certification standard requirements (90%+ diversion)',
      'Distinguish between genuine circular diversion (reuse, recycling, composting) and thermal incineration',
      'Audit monthly waste hauling manifests and optimize waste service contracts'
    ],
    lessonContent: [
      'The term "Zero Waste" is often misunderstood as meaning that a facility produces literally zero ounces of discard. In professional environmental engineering, Zero Waste is defined by the Zero Waste International Alliance (ZWIA) and Green Business Certification Inc. (GBCI) as achieving and maintaining at least a 90% overall diversion of non-hazardous solid waste from landfills, incinerators, and the environment over a minimum of 12 consecutive months.',
      'The fundamental equation for calculating a facility\'s Diversion Rate is: Diversion Rate (%) = [(Weight of Reused Materials + Weight of Recycled Materials + Weight of Composted Materials) / Total Weight of Discarded Materials Generated] × 100. For example, if a facility generates 100 tons of total waste in a month, and diverts 50 tons to recycling, 30 tons to organic composting, and 10 tons to reusable pallet exchange, while sending 10 tons to a municipal landfill, its diversion rate is (50 + 30 + 10) / 100 = 90%—meeting the TRUE Zero Waste baseline.',
      'Crucially, standard zero-waste frameworks reject "Waste-to-Energy" (mass-burn municipal incineration) as genuine diversion. Burning recyclable plastics or paper destroys the embodied energy and material resources, creating greenhouse emissions and toxic fly ash. Genuine diversion prioritizes upstream redesign, vendor take-back packaging, repair, and biological/mechanical recycling.',
      'To verify diversion figures, facilities must audit their monthly commercial waste hauling manifests and weigh tickets. Many waste contracts charge facilities for pull fees on partially empty dumpsters while failing to provide contamination reports. Renegotiating hauling contracts to include verified weight tickets and right-sizing dumpster frequency provides immediate operational cost savings.'
    ],
    practicalExamples: [
      {
        title: 'Toyota North America Zero Waste Manufacturing Certification',
        description: 'Toyota North America automotive assembly facilities implemented TRUE Zero Waste standards across manufacturing plants. By working with suppliers to replace cardboard packaging with durable reusable plastic totes and recycling metal stamping offcuts, plants diverted 99.2% of all waste from landfills, saving millions in procurement and disposal costs.'
      },
      {
        title: 'Sierra Nevada Brewing TRUE Platinum Zero Waste Brewery',
        description: 'Sierra Nevada Brewing achieved TRUE Platinum Zero Waste certification by diverting 99.8% of solid waste. The brewery spent grain is routed to local cattle ranchers as high-protein livestock feed, wastewater sludge is digested on-site for biogas fuel, and spent packaging straps are baled and sold to plastics recyclers.'
      }
    ],
    activityTask: {
      title: 'Facility Diversion Rate Calculation',
      instruction: 'A manufacturing distribution center recorded the following monthly waste hauling weights: 18 tons of corrugated cardboard recycled; 12 tons of wooden pallets repaired and reused; 8 tons of food scraps composted; 2 tons of scrap stretch wrap recycled; and 10 tons of mixed trash sent to a landfill. Calculate: (1) Total waste generated; (2) Total waste diverted; and (3) The overall facility diversion rate percentage.',
      prompt: 'Show the calculation and state whether this facility meets the 90% TRUE Zero Waste threshold.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video on TRUE zero waste certification in preparation'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'wm-ch2-q1',
          questionText: 'Under the GBCI TRUE Zero Waste standard, what minimum diversion rate must a facility maintain for at least 12 consecutive months to achieve certification?',
          options: [
            'At least 90% overall diversion from landfills, incinerators, and the environment',
            'At least 50% diversion',
            '100% elimination of all plastics only',
            '75% diversion of hazardous waste only'
          ],
          correctAnswerIndex: 0,
          explanation: 'The TRUE Zero Waste standard requires a minimum 90% diversion rate of non-hazardous solid waste from landfills and thermal incineration.'
        },
        {
          id: 'wm-ch2-q2',
          questionText: 'Why do verified zero-waste standards explicitly exclude mass-burn thermal incineration ("waste-to-energy") from qualifying as true diversion?',
          options: [
            'Incineration destroys valuable embodied materials and encourages continued waste generation rather than circular recovery',
            'Because incineration is strictly illegal in all countries',
            'Because burning materials produces zero heat energy',
            'Because incinerators only accept clean drinking water'
          ],
          correctAnswerIndex: 0,
          explanation: 'Incineration treats resources as single-use disposables, generating greenhouse gases and hazardous ash while discouraging circular reduction.'
        },
        {
          id: 'wm-ch2-q3',
          questionText: 'What is the formula for calculating facility waste diversion rate?',
          options: [
            '(Reused + Recycled + Composted Weight) / Total Generated Weight × 100',
            'Total Landfill Weight / Total Facility Area × 100',
            'Recycled Weight × Total Water Consumption',
            'Dumpster Volume / Monthly Revenue'
          ],
          correctAnswerIndex: 0,
          explanation: 'The diversion rate is the proportion of total generated material diverted from landfills through reuse, recycling, and composting, expressed as a percentage.'
        }
      ]
    }
  },
  {
    id: 'wm-ch3',
    chapterNumber: 3,
    title: 'Chapter 3: Organics Diversion & Anaerobic Digestion Engineering',
    description: 'Understand methane abatement from organic waste, optimize aerobic composting C:N ratios (25:1 to 30:1), and evaluate commercial anaerobic digesters.',
    durationMinutes: 45,
    learningObjectives: [
      'Examine the biological mechanisms of organic decomposition in anaerobic landfills versus aerobic composting',
      'Quantify methane emissions avoided using the EPA Waste Reduction Model (WARM)',
      'Calculate optimal Carbon-to-Nitrogen (C:N) ratios for aerobic composting systems',
      'Analyze the engineering operation of commercial thermophilic anaerobic digestion for biogas generation'
    ],
    lessonContent: [
      'Food waste and organic discards represent the single largest component of municipal solid waste sent to landfills, comprising over 24% of all municipal discards. When organic materials (food scraps, yard trimmings, agricultural residues, and soiled paper) are buried in an oxygen-depleted landfill, anaerobic bacteria decompose the matter, producing landfill gas: approximately 50% methane (CH4) and 50% carbon dioxide (CO2).',
      'Methane is a potent short-lived climate pollutant with a Global Warming Potential (GWP100) roughly 28 to 30 times greater than carbon dioxide over a 100-year timescale, and over 80 times greater over a 20-year timescale. Landfills represent the third-largest source of human-related methane emissions globally. Diverting organics from landfills directly eliminates this massive fugitive methane source.',
      'The primary alternative to landfilling is aerobic composting. In an aerobic composting system (such as aerated static piles, turned windrows, or in-vessel drums), aerobic microorganisms break down organic compounds in the presence of oxygen, producing stable, nutrient-dense humus (soil amendment), water, and biogenic carbon dioxide—with zero methane formation.',
      'Successful commercial composting depends on biological balance. The fundamental parameter is the Carbon-to-Nitrogen (C:N) ratio. Microorganisms require carbon for energy and structure, and nitrogen for protein synthesis. The optimal initial C:N ratio is between 25:1 and 30:1. "Browns" (dry leaves, straw, wood chips, shredded cardboard) supply high carbon, while "Greens" (food waste, grass clippings, coffee grounds) supply high nitrogen. If carbon is too high, decomposition stalls; if nitrogen is too high, excess nitrogen converts to foul-smelling ammonia gas.'
    ],
    practicalExamples: [
      {
        title: 'City of San Francisco Mandatory Municipal Organics Collection',
        description: 'San Francisco became the first major US city to mandate citywide composting for all commercial businesses and residents. Collecting over 650 tons of food scraps and yard waste daily, the city processes the organics at an industrial aerated composting facility, producing organic certified compost sold to local Napa Valley vineyards to improve soil water retention.'
      },
      {
        title: 'Commercial Anaerobic Digestion at Large-Scale Dairy Operations',
        description: 'A commercial dairy farm processing waste from 3,000 dairy cows installed a continuous-feed anaerobic digester. The digester captures 100% of biogas emissions, scrubbing the biomethane to pipeline grade to fuel regional compressed natural gas (CNG) municipal transit buses while generating high-grade organic fertilizer.'
      }
    ],
    activityTask: {
      title: 'Compost Pile Carbon-to-Nitrogen Balancing',
      instruction: 'A corporate cafeteria generates 200 kg of fresh food scraps daily (an average C:N ratio of approximately 15:1). To achieve an optimal composting ratio of 30:1, cafeteria staff must mix the food scraps with "browns" such as dry shredded cardboard or wood chips (C:N ratio of roughly 100:1 to 300:1). Explain in 2-3 sentences why adding dry carbon-rich materials prevents foul odors and accelerates aerobic breakdown.',
      prompt: 'Explain the microbial role of adding carbon-rich browns to nitrogen-rich food scraps.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video on organics composting and anaerobic digestion in preparation'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'wm-ch3-q1',
          questionText: 'What greenhouse gas is predominantly emitted when food and yard waste decomposes anaerobically in unmanaged municipal landfills?',
          options: [
            'Methane (CH4), which has a global warming potential 28 to 30 times higher than CO2',
            'Pure oxygen (O2)',
            'Argon (Ar)',
            'Helium (He)'
          ],
          correctAnswerIndex: 0,
          explanation: 'Landfill bacteria decompose organic matter in the absence of oxygen, generating large quantities of methane, a potent climate-forcing gas.'
        },
        {
          id: 'wm-ch3-q2',
          questionText: 'What is the optimal initial Carbon-to-Nitrogen (C:N) ratio for rapid, aerobic commercial composting?',
          options: [
            'Between 25:1 and 30:1',
            'Exactly 1:1',
            'Over 500:1',
            '1000:1'
          ],
          correctAnswerIndex: 0,
          explanation: 'A 25:1 to 30:1 ratio provides microbes with the ideal balance of carbon for energy and nitrogen for cellular protein synthesis.'
        },
        {
          id: 'wm-ch3-q3',
          questionText: 'In commercial composting terminology, which materials are classified as "Browns"?',
          options: [
            'Dry carbon-rich materials such as dry leaves, wood chips, straw, and shredded cardboard',
            'Wet nitrogen-rich materials like fresh vegetable peels and grass clippings',
            'Synthetic plastic bags and polystyrene foam',
            'Heavy industrial metals like copper and lead'
          ],
          correctAnswerIndex: 0,
          explanation: 'Browns are carbon-rich dry plant and wood fibers that provide structure and energy for composting microorganisms.'
        }
      ]
    }
  },
  {
    id: 'wm-ch4',
    chapterNumber: 4,
    title: 'Chapter 4: Hazardous Waste Minimization & Industrial Symbiosis',
    description: 'Explore RCRA compliance, closed-loop chemical substitution, on-site solvent vacuum recovery, and circular industrial symbiosis networks.',
    durationMinutes: 45,
    learningObjectives: [
      'Understand hazardous waste classifications under the Resource Conservation and Recovery Act (RCRA)',
      'Apply toxic use reduction (TUR) and green chemistry chemical substitution principles',
      'Evaluate on-site closed-loop solvent distillation recovery systems',
      'Design an Industrial Symbiosis material exchange network where byproducts become raw inputs'
    ],
    lessonContent: [
      'While municipal solid waste encompasses paper, plastic, and food, industrial operations frequently generate hazardous waste streams containing toxic, reactive, ignitable, or corrosive substances. Under environmental regulations such as the US Resource Conservation and Recovery Act (RCRA) and the European Union REACH and WEEE directives, industrial facilities carry strict "cradle-to-grave" legal liability for all hazardous wastes they generate.',
      'The most effective and cost-efficient hazardous waste strategy is Toxic Use Reduction (TUR). Rather than managing toxic waste after it has already been generated, green chemistry engineers reformulate industrial processes to eliminate hazardous chemicals at the source. Examples include replacing halogenated hydrocarbon solvents with aqueous citrus-based bio-degreasers, replacing heavy metal pigments with organic mineral compounds, and converting solvent-based paints to waterborne powder coatings.',
      'Where solvent use cannot be entirely eliminated, facilities implement on-site closed-loop recovery. In precision parts cleaning, electronics fabrication, and pharmaceutical processing, spent solvents (such as isopropyl alcohol, acetone, or toluene) are traditionally barreled and sent to high-temperature incinerators. Installing automated vacuum distillation units allows facilities to boil, condense, and purify spent solvent on-site, recovering 85% to 95% of the solvent for reuse with an operational payback of under one year.',
      'At a broader systemic level, forward-thinking industrial parks practice Industrial Symbiosis. Pioneered in Kalundborg, Denmark, industrial symbiosis connects traditionally separate enterprises into a collaborative circular ecosystem. The waste, steam, surplus heat, or chemical byproducts of one company become the raw manufacturing inputs for a neighboring facility, eliminating waste disposal while cutting raw material procurement costs.'
    ],
    practicalExamples: [
      {
        title: 'Kalundborg Eco-Industrial Park (Denmark)',
        description: 'The world\'s flagship industrial symbiosis network connects an energy plant, an oil refinery, a pharmaceutical manufacturer, a gypsum plasterboard factory, and local agricultural farms. Surplus steam from the energy plant powers the refinery; sulfur scrubbed from flue gases is converted into gypsum for wallboards; and biomass fermentation sludge fertilizes surrounding farmland.'
      },
      {
        title: 'Closed-Loop On-Site Solvent Vacuum Distillation Unit',
        description: 'A precision electronics manufacturing facility consumed 4,000 gallons of isopropyl alcohol (IPA) annually for circuit board degreasing. By installing an on-site explosion-proof vacuum distillation recycling system, the plant recovered 92% of all spent IPA at 99.5% purity, reducing hazardous waste hauling manifest by 32 drums per year.'
      }
    ],
    activityTask: {
      title: 'Industrial Symbiosis Byproduct Matching',
      instruction: 'Select two distinct industrial or commercial facilities located near each other (for example: a craft brewery and an urban mushroom farm; or a commercial sawmill and a composite decking manufacturer). Identify one specific waste or byproduct from Facility A and explain how it could serve as a valuable raw material input for Facility B.',
      prompt: 'Name your two facilities, the specific byproduct exchanged, and the resulting economic/environmental benefit.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video on industrial symbiosis and hazardous waste minimization in preparation'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'wm-ch4-q1',
          questionText: 'What is the definition of "Industrial Symbiosis" in environmental engineering?',
          options: [
            'A collaborative network where waste, surplus energy, or byproducts of one facility become raw material inputs for another',
            'Two companies merging their legal corporations',
            'Planting trees along corporate office walkways',
            'Outsourcing hazardous waste hauling to offshore vendors'
          ],
          correctAnswerIndex: 0,
          explanation: 'Industrial symbiosis mimics natural ecosystems: output wastes from one organism or company become nutrient inputs for another.'
        },
        {
          id: 'wm-ch4-q2',
          questionText: 'What does "Toxic Use Reduction" (TUR) prioritize in industrial pollution prevention?',
          options: [
            'Eliminating or substituting hazardous chemicals at the design source rather than treating toxic waste after it is generated',
            'Diluting toxic chemicals with river water before disposal',
            'Burying hazardous waste deeper underground in remote areas',
            'Exporting toxic drums to developing nations'
          ],
          correctAnswerIndex: 0,
          explanation: 'TUR addresses pollution at its root by reformulating processes with non-toxic chemical alternatives so hazardous waste is never created.'
        },
        {
          id: 'wm-ch4-q3',
          questionText: 'Under the US Resource Conservation and Recovery Act (RCRA), what concept defines a company continuous legal liability for hazardous waste?',
          options: [
            '"Cradle-to-grave" liability from initial generation through ultimate disposal',
            'Caveat emptor (buyer beware)',
            'Limited 30-day liability only',
            'Zero liability if waste is transferred to a licensed truck'
          ],
          correctAnswerIndex: 0,
          explanation: 'RCRA enforces cradle-to-grave accountability: generators remain legally liable for hazardous wastes from the moment of creation through transport, treatment, and permanent disposal.'
        }
      ]
    }
  }
];
