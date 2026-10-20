import { CourseChapter } from '../types';
import { GREEN_IT_CHAPTERS } from './greenItCourse';

export { GREEN_IT_CHAPTERS };

export const SUSTAINABILITY_CHAPTERS: CourseChapter[] = [
  {
    id: 'sf-ch1',
    chapterNumber: 1,
    title: 'Introduction to Corporate Sustainability & The Triple Bottom Line',
    description: 'Explore the evolution of corporate sustainability from regulatory compliance to core strategic value creation.',
    durationMinutes: 45,
    learningObjectives: [
      'Understand the Triple Bottom Line framework: People, Planet, and Profit.',
      'Explain how economic systems intersect with ecological planetary boundaries.',
      'Distinguish between corporate social responsibility (CSR) and integrated sustainability strategy.',
      'Identify key stakeholder expectations across customers, employees, and investors.'
    ],
    lessonContent: [
      'For decades, traditional business models focused almost exclusively on single-bottom-line financial metrics: revenue growth, operating margin, and shareholder return. Corporate sustainability fundamentally expands this paradigm through the "Triple Bottom Line" framework: People (social equity and human rights), Planet (environmental stewardship and ecological boundaries), and Profit (economic vitality).',
      'Operating within planetary boundaries is no longer an optional public relations exercise. Climate instability, resource depletion, and strict regulatory disclosure requirements mean that organizations must measure their inside-out impacts on ecosystems as well as outside-in financial risks from climate disruptions.',
      'A mature sustainability strategy moves beyond surface-level philanthropy. It embeds environmental stewardship directly into product design, procurement, supply chain logistics, and executive governance.'
    ],
    practicalExamples: [
      {
        title: 'Patagonia’s "Worn Wear" Business Model',
        description: 'Outdoor apparel manufacturer Patagonia established its Worn Wear program to repair, resell, and recycle used garments. By shifting from selling only new products to facilitating repair and resale, the company reduced its lifecycle footprint while creating an enduring brand loyalty.'
      },
      {
        title: 'Unilever’s Sustainable Living Brands',
        description: 'Unilever tracked brand performance across its portfolio and discovered that products with explicit sustainability missions grew 69% faster than the rest of the business and delivered 75% of overall corporate growth.'
      }
    ],
    activityTask: {
      title: 'Triple Bottom Line Stakeholder Mapping',
      instruction: 'Select an organization you are familiar with (your current employer, university, or a well-known brand). Identify at least two environmental impacts (Planet), two social impacts (People), and two economic indicators (Profit) associated with its operations.',
      prompt: 'Write down one operational area where reducing environmental waste directly saves financial costs for this organization.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'sf-q1-1',
          questionText: 'What are the three pillars of the "Triple Bottom Line" framework?',
          options: [
            'People, Planet, and Profit',
            'Purchasing, Production, and Promotion',
            'Policy, Patents, and Publicity',
            'Past, Present, and Prospects'
          ],
          correctAnswerIndex: 0,
          explanation: 'The Triple Bottom Line framework created by John Elkington balances social equity (People), environmental stewardship (Planet), and economic viability (Profit).'
        },
        {
          id: 'sf-q1-2',
          questionText: 'How does modern strategic corporate sustainability differ from traditional philanthropy?',
          options: [
            'Sustainability is embedded into core business operations, product design, and supply chains, rather than being just charitable donations',
            'Sustainability is only practiced by non-profit organizations',
            'Philanthropy requires mandatory government reporting whereas sustainability is secret',
            'There is no difference between the two terms'
          ],
          correctAnswerIndex: 0,
          explanation: 'Strategic sustainability integrates environmental and social considerations directly into operations, risk management, and governance.'
        },
        {
          id: 'sf-q1-3',
          questionText: 'Under the Stockholm Resilience Centre model, what do "planetary boundaries" represent?',
          options: [
            'National borders between neighboring countries on a political world map',
            'Nine scientific ecological thresholds within which humanity can safely develop and thrive',
            'The physical altitude limits of commercial passenger aircraft',
            'The speed at which the planet Earth rotates around the Sun'
          ],
          correctAnswerIndex: 1,
          explanation: 'Planetary boundaries define nine critical Earth system processes (like climate change, freshwater use, and biodiversity integrity) that must not be transgressed.'
        }
      ]
    }
  },
  {
    id: 'sf-ch2',
    chapterNumber: 2,
    title: 'Planetary Boundaries & Ecological Systems',
    description: 'Learn the nine scientific Earth system boundaries that regulate the stability and resilience of human civilization.',
    durationMinutes: 45,
    learningObjectives: [
      'Name and define the nine planetary boundaries established by the Stockholm Resilience Centre.',
      'Understand which ecological boundaries have already been transgressed by human activity.',
      'Explain the concept of ecological tipping points and positive feedback loops.',
      'Assess how corporate operations impact freshwater, biosphere integrity, and nitrogen-phosphorus cycles.'
    ],
    lessonContent: [
      'In 2009, an international group of 28 leading Earth system scientists, led by Johan Rockström, proposed the Planetary Boundaries framework. This framework identifies the nine biophysical systems that regulate the stability and resilience of the Earth system during the Holocene epoch—the 10,000-year period of stable climate that enabled the emergence of human agriculture and civilization.',
      'The nine boundaries are: 1) Climate Change, 2) Biosphere Integrity (biodiversity loss), 3) Land-System Change (deforestation), 4) Freshwater Change, 5) Biogeochemical Flows (nitrogen and phosphorus overloading from fertilizers), 6) Ocean Acidification, 7) Atmospheric Aerosol Loading, 8) Stratospheric Ozone Depletion, and 9) Novel Entities (synthetic chemicals, microplastics, and heavy metals).',
      'Scientists have warned that humanity has already transgressed six of these nine boundaries. Transgressing boundaries increases the risk of triggering irreversible tipping points—such as the collapse of Amazon rainforest moisture recycling or polar ice sheet disintegration.',
      'For business leaders and sustainability analysts, this scientific framework shifts environmental management from simple localized compliance to understanding systemic planetary risk across the entire supply chain.'
    ],
    practicalExamples: [
      {
        title: 'Science-Based Targets for Nature (SBTN)',
        description: 'Corporations in agriculture and consumer goods use SBTN guidance to set quantitative freshwater withdrawal caps and zero-deforestation targets aligned with local watershed replenishment thresholds.'
      },
      {
        title: 'Nutrient Runoff Mitigation in Agro-Industrial Supply Chains',
        description: 'Fertilizer runoff causes massive aquatic "dead zones" in coastal waters. Food manufacturing conglomerates now incentivize farmers to adopt precision nutrient injection and winter cover crops, cutting nitrogen runoff by over 40%.'
      }
    ],
    activityTask: {
      title: 'Planetary Boundary Risk Assessment',
      instruction: 'Review the 9 planetary boundaries. Choose any consumer product you use daily (e.g. coffee, sneakers, cotton t-shirt, smartphone).',
      prompt: 'Identify the top two planetary boundaries most affected by the production of that product (e.g., land-system change and freshwater use for cotton; novel entities and climate change for electronics). Explain why.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'sf-q2-1',
          questionText: 'How many planetary boundaries are defined in the Stockholm Resilience Centre framework?',
          options: ['9', '5', '12', '17'],
          correctAnswerIndex: 0,
          explanation: 'The framework identifies nine Earth system boundaries that regulate planetary stability.'
        },
        {
          id: 'sf-q2-2',
          questionText: 'What is an "ecological tipping point"?',
          options: [
            'A critical threshold where a small change triggers a massive, irreversible shift in an ecosystem',
            'The exact date when corporate tax returns are filed annually',
            'The point when a company switches from cash to digital banking',
            'When garbage dump trucks tip over their containers'
          ],
          correctAnswerIndex: 0,
          explanation: 'An ecological tipping point is a threshold beyond which internal feedback loops accelerate systemic change, often with irreversible consequences.'
        },
        {
          id: 'sf-q2-3',
          questionText: 'Which boundary is primarily impacted by excessive synthetic agricultural fertilizers running off into rivers and oceans?',
          options: [
            'Biogeochemical flows (nitrogen and phosphorus cycles)',
            'Stratospheric ozone layer',
            'Space satellite orbital density',
            'Atmospheric radio frequencies'
          ],
          correctAnswerIndex: 0,
          explanation: 'Synthetic nitrogen and phosphorus fertilizers overwhelm freshwater ecosystems, leading to eutrophication and oceanic dead zones.'
        }
      ]
    }
  },
  {
    id: 'sf-ch3',
    chapterNumber: 3,
    title: 'ESG Frameworks and Global Standards',
    description: 'Master the international standards governing sustainability disclosures: CSRD, GRI, SASB, and TCFD.',
    durationMinutes: 50,
    learningObjectives: [
      'Explain "Double Materiality" under the EU Corporate Sustainability Reporting Directive (CSRD).',
      'Distinguish between multi-stakeholder standards (GRI) and investor-focused standards (SASB / ISSB).',
      'Understand the four pillars of the Task Force on Climate-related Financial Disclosures (TCFD).',
      'Evaluate how ESG ratings and non-financial audit assurance function.'
    ],
    lessonContent: [
      'As sustainability has evolved into an essential corporate governance responsibility, global regulators and capital markets have established formal disclosure standards to eliminate greenwashing and ensure data transparency.',
      'A central innovation in modern ESG reporting is "Double Materiality", formalized in the European Union Corporate Sustainability Reporting Directive (CSRD). Double materiality states that companies must evaluate their business through two distinct lenses: 1) Impact Materiality (the inside-out perspective: how the company actions affect society, human rights, and ecosystems), and 2) Financial Materiality (the outside-in perspective: how environmental and social issues create financial risks or opportunities for the company bottom line).',
      'Different reporting standards serve different audiences: The Global Reporting Initiative (GRI) provides comprehensive standards for multi-stakeholder impact reporting (addressing citizens, workers, communities, and governments). The Sustainability Accounting Standards Board (SASB), now incorporated under the International Sustainability Standards Board (ISSB), focuses specifically on financially material information needed by institutional investors.',
      'Meanwhile, the TCFD framework organizes climate risks into four pillars: Governance (board oversight of climate risks), Strategy (impact of 1.5°C and 2°C transition scenarios), Risk Management (identification and mitigation), and Metrics & Targets (Scope 1, 2, and 3 emissions targets).'
    ],
    practicalExamples: [
      {
        title: 'Double Materiality Matrix in Manufacturing',
        description: 'An international automotive supplier conducted a double materiality assessment. It identified carbon emissions and cobalt supply chain human rights as high on both impact materiality (external harm) and financial materiality (regulatory penalties and supply disruption risk), prioritizing capital allocation toward clean supply chains.'
      },
      {
        title: 'TCFD Climate Scenario Analysis in Real Estate',
        description: 'A commercial property investment fund evaluated physical flood and extreme heat risks across 150 properties under a 2°C warming scenario. It installed flood barriers and reflective roof coatings, protecting portfolio property values and securing favorable insurance premiums.'
      }
    ],
    activityTask: {
      title: 'Analyze an ESG Materiality Topic',
      instruction: 'Select one material topic: either "Worker Health & Safety" or "Water Scarcity in Operations".',
      prompt: 'Explain how this topic is material from both perspectives: 1) Inside-out impact materiality (on people/environment), and 2) Outside-in financial materiality (on corporate costs/revenue).'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'sf-q3-1',
          questionText: 'What is the core definition of "Double Materiality"?',
          options: [
            'Assessing both impact materiality (inside-out impact on society) and financial materiality (outside-in risks to company enterprise value)',
            'Having financial statements audited twice by two separate accounting firms',
            'Printing sustainability reports on double-sided recycled paper',
            'Reporting Scope 1 and Scope 2 emissions on two different corporate websites'
          ],
          correctAnswerIndex: 0,
          explanation: 'Double materiality mandates reporting on how an organization affects people and the environment AND how sustainability issues affect the company financial performance.'
        },
        {
          id: 'sf-q3-2',
          questionText: 'Which international disclosure framework focuses primarily on multi-stakeholder impact reporting on the economy, environment, and people?',
          options: [
            'GRI (Global Reporting Initiative)',
            'GAAP (Generally Accepted Accounting Principles)',
            'SEC Form 10-K',
            'ISO 9001'
          ],
          correctAnswerIndex: 0,
          explanation: 'GRI Standards provide the global benchmark for multi-stakeholder reporting on environmental and social impacts.'
        },
        {
          id: 'sf-q3-3',
          questionText: 'What are the four pillars of the TCFD (Task Force on Climate-related Financial Disclosures) framework?',
          options: [
            'Governance, Strategy, Risk Management, and Metrics & Targets',
            'Planning, Purchasing, Producing, and Promoting',
            'Air, Water, Land, and Fire',
            'Compliance, Penalties, Taxes, and Subsidies'
          ],
          correctAnswerIndex: 0,
          explanation: 'TCFD organizes climate financial disclosure around Governance, Strategy, Risk Management, and Metrics & Targets.'
        }
      ]
    }
  },
  {
    id: 'sf-ch4',
    chapterNumber: 4,
    title: 'Corporate Climate Strategy & Action Planning',
    description: 'Learn how to calculate greenhouse gas inventories across Scope 1, 2, and 3, and build science-based net-zero roadmaps.',
    durationMinutes: 50,
    learningObjectives: [
      'Define and calculate Scope 1, Scope 2, and Scope 3 greenhouse gas emissions under the GHG Protocol.',
      'Explain the difference between location-based and market-based accounting for electricity emissions.',
      'Understand the Science Based Targets initiative (SBTi) Net-Zero Standard requirements.',
      'Design an enterprise carbon abatement hierarchy emphasizing absolute reduction over carbon offsets.'
    ],
    lessonContent: [
      'The Greenhouse Gas (GHG) Protocol Corporate Standard is the global accounting framework for measuring organizational carbon footprints. It divides emissions into three distinct "Scopes":',
      'Scope 1 (Direct Emissions): Greenhouse gases released directly from sources owned or controlled by the organization—such as burning natural gas in heating boilers, fuel consumed by corporate delivery trucks, and fugitive chemical refrigerant leaks from air conditioners.',
      'Scope 2 (Indirect Emissions from Purchased Energy): Emissions resulting from the generation of electricity, steam, heating, or cooling purchased and consumed by the company. Scope 2 is reported using two methods: Location-based (reflecting average grid emission intensity where power is consumed) and Market-based (reflecting specific electricity purchase contracts, green tariffs, and Energy Attribute Certificates).',
      'Scope 3 (Value Chain Indirect Emissions): All other indirect emissions occurring across the upstream supply chain (purchased goods, business travel, employee commuting, capital goods) and downstream product use (product energy consumption, end-of-life disposal). In most service and manufacturing industries, Scope 3 accounts for 75% to 90% of total corporate emissions.',
      'Under the Science Based Targets initiative (SBTi) Net-Zero Standard, genuine net-zero requires companies to reduce their absolute value-chain emissions by at least 90% before using permanent carbon removals to neutralize the remaining residual emissions (under 10%). Buying cheap unverified carbon offsets to claim "carbon neutrality" without deep internal reduction is explicitly rejected by modern standards.'
    ],
    practicalExamples: [
      {
        title: 'Supplier Engagement Programs for Scope 3 Reductions',
        description: 'Major technology companies like Microsoft and Apple require top tier-1 suppliers to transition to 100% renewable electricity for contract manufacturing, cutting millions of metric tons of Scope 3 emissions at the source.'
      },
      {
        title: 'Corporate Power Purchase Agreements (PPAs)',
        description: 'Large corporate electricity buyers enter long-term 10-15 year contracts directly with new wind and solar farm developers. This provides developers with guaranteed financing to build new renewable capacity on the grid, securing authentic market-based Scope 2 decarbonization.'
      }
    ],
    activityTask: {
      title: 'Classify Corporate Carbon Scopes',
      instruction: 'Classify each of the following 4 corporate activities into Scope 1, Scope 2, or Scope 3:',
      prompt: '1) Electricity used to run headquarters lights; 2) Diesel fuel burned by company delivery vans; 3) Manufacturing emissions from purchased computer chips; 4) Natural gas burned in factory heating furnace.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'sf-q4-1',
          questionText: 'Under the GHG Protocol, what are Scope 1 emissions?',
          options: [
            'Direct greenhouse gas emissions from owned or controlled sources (e.g. boilers, company vehicles)',
            'Emissions from employee personal vacations on airplanes',
            'Emissions from electricity purchased from the utility grid',
            'Estimated emissions from competitors in the same industry'
          ],
          correctAnswerIndex: 0,
          explanation: 'Scope 1 covers direct emissions from operations owned or controlled by the reporting organization.'
        },
        {
          id: 'sf-q4-2',
          questionText: 'Which emission scope typically represents between 75% and 90% of a company total carbon footprint?',
          options: [
            'Scope 3 (Upstream supply chain and downstream product use)',
            'Scope 1 (Direct fuel combustion in boilers)',
            'Scope 2 (Electricity consumed in company offices)',
            'All scopes are always identical in size'
          ],
          correctAnswerIndex: 0,
          explanation: 'For most corporations, Scope 3 supply chain and product lifecycle emissions vastly outweigh direct Scope 1 and 2 emissions.'
        },
        {
          id: 'sf-q4-3',
          questionText: 'Under the Science Based Targets initiative (SBTi) Net-Zero Standard, what percentage of emissions must be directly reduced before carbon removals can neutralize the residual?',
          options: [
            'At least 90% absolute emissions reduction across Scopes 1, 2, and 3',
            'Only 10% reduction, with 90% allowed through carbon offsets',
            'Zero reduction required if trees are planted',
            'Exactly 50% reduction in all sectors'
          ],
          correctAnswerIndex: 0,
          explanation: 'SBTi Net-Zero requires organizations to decarbonize by at least 90% before the final residual emissions (maximum 10%) can be neutralized with permanent removals.'
        }
      ]
    }
  }
];

export const WASTE_MANAGEMENT_CHAPTERS: CourseChapter[] = [
  {
    id: 'wm-ch1',
    chapterNumber: 1,
    title: 'Introduction to Waste Management Hierarchies',
    description: 'Learn the fundamental waste management hierarchy: Refuse, Reduce, Reuse, Recycle, and Recover.',
    durationMinutes: 40,
    learningObjectives: [
      'Understand the international waste management hierarchy and inverted pyramid.',
      'Explain why prevention and reduction are significantly more effective than end-of-pipe recycling.',
      'Calculate facility diversion rate percentages from hauling manifests.',
      'Identify the environmental consequences of landfill methane generation.'
    ],
    lessonContent: [
      'Modern industrial societies generate billions of tons of solid municipal and commercial waste annually. Traditional "linear" waste management treated discarding materials as an inevitable byproduct of commerce: resources were extracted, manufactured into single-use products, and buried in landfills or burned in incinerators. Sustainable waste management transforms this into a circular material discipline.',
      'The international Waste Management Hierarchy ranks material handling options from most environmentally preferable to least: 1) Refuse / Prevent (eliminating waste at the source through redesign), 2) Reduce (minimizing material volume and toxicity), 3) Reuse / Repair (keeping products in service without reprocessing), 4) Recycle / Compost (reprocessing materials into secondary inputs), 5) Energy Recovery (waste-to-energy incineration), and 6) Disposal (landfilling as the absolute last resort).',
      'Preventing waste at the source saves up to 10 times more energy and water than recycling, because prevention avoids all the upstream extraction, processing, and transportation energy required to manufacture replacement goods.',
      'When organic waste (food scraps, cardboard, wood) is compressed inside an anaerobic landfill without oxygen, anaerobic bacteria decompose the organic matter, producing methane gas (CH4)—a potent greenhouse gas with a global warming potential nearly 30 times greater than carbon dioxide over a 100-year timeframe.'
    ],
    practicalExamples: [
      {
        title: 'Toyota Zero Waste to Landfill Manufacturing Plants',
        description: 'Toyota automotive manufacturing plants implemented strict scrap metal segregation and reusable packaging crates. By eliminating single-use wooden pallets and corrugated boxes with Tier-1 suppliers, facilities achieved over 95% landfill diversion rates across multiple continents.'
      },
      {
        title: 'Source Reduction in Corporate Dining (Google Food Labs)',
        description: 'Commercial kitchens installed computer-vision waste auditing cameras over disposal bins. The system automatically categorized wasted ingredients, enabling chefs to adjust ingredient purchasing and cut food waste by 35% in six months.'
      }
    ],
    activityTask: {
      title: 'Single-Use Material Audit',
      instruction: 'Track every single-use packaging item you discard over a 24-hour period (plastic food wrappers, disposable coffee cups, cardboard boxes, paper napkins).',
      prompt: 'Identify the two largest single-use items in your waste stream and formulate a practical source-reduction alternative for each.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'wm-q1-1',
          questionText: 'In the waste hierarchy, what is the most environmentally preferable action?',
          options: [
            'Source Reduction and Waste Prevention',
            'Recycling in blue bins',
            'Waste-to-energy incineration',
            'Sanitary landfill disposal'
          ],
          correctAnswerIndex: 0,
          explanation: 'Preventing waste from being created in the first place avoids all upstream energy, extraction, and manufacturing footprints.'
        },
        {
          id: 'wm-q1-2',
          questionText: 'Why does organic food waste buried in municipal landfills generate potent greenhouse gas methane?',
          options: [
            'Organic material decomposes in anaerobic (oxygen-depleted) conditions, producing methane gas',
            'Landfill operators pump natural gas into the garbage heaps intentionally',
            'Plastic bags undergo chemical fusion with rainwater',
            'Food waste does not produce any gas in landfills'
          ],
          correctAnswerIndex: 0,
          explanation: 'When organic matter is compacted without oxygen, anaerobic bacteria produce methane (CH4), a potent greenhouse gas.'
        },
        {
          id: 'wm-q1-3',
          questionText: 'What is the formula for calculating a facility waste diversion rate percentage?',
          options: [
            '(Recycled + Composted + Reused Material) / (Total Waste Generated) * 100',
            '(Total Landfilled Waste) * (Monthly Water Bill)',
            '(Total Number of Trash Cans) / (Building Area)',
            '(Cardboard Weight) - (Plastic Weight)'
          ],
          correctAnswerIndex: 0,
          explanation: 'Diversion rate measures the percentage of total generated waste diverted away from landfills and incineration toward reuse, recycling, and composting.'
        }
      ]
    }
  },
  {
    id: 'wm-ch2',
    chapterNumber: 2,
    title: 'Solid Waste Characterization & Auditing',
    description: 'Master ASTM waste composition sampling, contamination rate calculation, and facility audit workflows.',
    durationMinutes: 45,
    learningObjectives: [
      'Conduct a facility waste characterization audit conforming to standard ASTM methodologies.',
      'Calculate recycling stream contamination rates and explain their economic and operational penalties.',
      'Design clear multi-stream waste stations with intuitive color coding and signage.',
      'Utilize waste hauling manifests to establish auditable baseline metrics.'
    ],
    lessonContent: [
      'You cannot manage what you do not measure. A Solid Waste Characterization Audit is the fundamental diagnostic tool used by environmental engineers to determine the exact volume, weight, and composition of materials an organization discards.',
      'Under standardized protocols (such as ASTM D5231), audit teams collect representative samples of discarded bags over a multi-day operating cycle. Materials are sorted manually into standardized categories: fibers (cardboard, office paper), rigid plastics, film plastics, food waste, metals, glass, electronic waste, and residual non-recyclables.',
      'A primary challenge in modern recycling is "contamination"—non-recyclable items placed in recycling bins (e.g. greasy pizza boxes, plastic bags tangling sorting equipment, unrinsed food containers). When contamination exceeds 10% to 15%, entire shipping containers of recyclables are rejected by processing facilities and diverted directly to landfills.',
      'Effective waste auditing enables facilities to redesign their waste stations: eliminating individual desk-side trash cans in favor of centralized stations with color-coded lids, pictorial signage at eye level, and paired recycling-compost-trash bins to eliminate confusion.'
    ],
    practicalExamples: [
      {
        title: 'Centralized Bin System Rollout in Commercial Offices',
        description: 'A corporate campus with 2,500 employees eliminated desk-side trash bins and installed centralized sorting stations with 3 streams (Compost, Clean Paper, Landfill). Contamination fell from 34% to under 6%, and custodial cleaning efficiency increased by 25%.'
      },
      {
        title: 'ASTM Sorting Audit at a Distribution Warehouse',
        description: 'An audit revealed that 68% of warehouse landfill dumpster volume consisted of clean LDPE stretch wrap film. The facility purchased an on-site plastic baler, compacting the wrap and selling it directly to a plastic recycler for $180 per ton instead of paying landfill tipping fees.'
      }
    ],
    activityTask: {
      title: 'Analyze Your Immediate Workspace Waste Station',
      instruction: 'Inspect the waste bins in your immediate workspace, kitchen, or office.',
      prompt: 'Are recycling and trash bins placed directly next to each other? Is signage clear with pictures? Identify one common item frequently placed in the wrong bin.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'wm-q2-1',
          questionText: 'What is "recycling contamination"?',
          options: [
            'Non-recyclable or dirty items placed in recycling streams that can cause entire loads to be rejected',
            'Adding green food coloring to recycled paper pulp',
            'Recycling aluminum cans twice in the same calendar year',
            'Disposing of clean shredded office paper'
          ],
          correctAnswerIndex: 0,
          explanation: 'Contamination occurs when non-recyclables or food residues enter the recycling stream, degrading material quality and jamming sorting machines.'
        },
        {
          id: 'wm-q2-2',
          questionText: 'Why is eliminating individual under-desk trash cans in favor of centralized sorting stations effective?',
          options: [
            'It forces people to consciously sort materials at centralized multi-stream stations and reduces custodial labor',
            'It prevents employees from eating lunch at their desks',
            'It allows facilities to spy on employee discarded documents',
            'Individual trash cans are illegal in all office buildings'
          ],
          correctAnswerIndex: 0,
          explanation: 'Centralized stations create visual prompts that dramatically reduce contamination compared to passive unmonitored desk-side bins.'
        },
        {
          id: 'wm-q2-3',
          questionText: 'Under ASTM D5231 protocols, how is a solid waste characterization audit conducted?',
          options: [
            'Representative waste samples are gathered, categorized into material streams, weighed, and statistically analyzed',
            'By asking security guards how heavy the dumpster feels',
            'By weighing the entire building before and after working hours',
            'By burning trash bags and measuring the smoke'
          ],
          correctAnswerIndex: 0,
          explanation: 'ASTM D5231 involves physical sorting of representative sample batches into material categories to calculate percentage composition and confidence intervals.'
        }
      ]
    }
  },
  {
    id: 'wm-ch3',
    chapterNumber: 3,
    title: 'Circular Economy & Closed-Loop Recycling',
    description: 'Understand circular design principles, Cradle to Cradle certification, and industrial symbiosis.',
    durationMinutes: 45,
    learningObjectives: [
      'Contrast the linear economy (Take-Make-Waste) with the circular economy (Biological and Technical cycles).',
      'Explain Cradle to Cradle (C2C) design principles and material health certifications.',
      'Define "industrial symbiosis" where one facility waste byproduct becomes raw input for another.',
      'Identify extended producer responsibility (EPR) regulations and deposit return systems.'
    ],
    lessonContent: [
      'The Ellen MacArthur Foundation circular economy framework is built on three core principles: 1) Eliminate waste and pollution by design; 2) Circulate products and materials at their highest value; and 3) Regenerate natural biological systems.',
      'The circular economy model divides material flows into two distinct metabolic cycles: The Biological Cycle (organic materials like food, cotton, and wood that can safely biodegrade and return nutrients to the soil) and The Technical Cycle (inorganic materials like metals, plastics, and electronics that must be designed for continuous disassembly, refurbishing, and remanufacturing without downcycling).',
      'Cradle to Cradle (C2C) design challenges engineers to design products that never become waste. In traditional design, products are "cradle to grave"—manufactured, used, and dumped. In cradle-to-cradle design, every constituent plastic, dye, and screw is inventoried for biological or technical cycling.',
      'Industrial Symbiosis takes circularity to an ecosystem level: geographic clusters of manufacturing facilities connect their material, water, and energy streams so that waste output from one factory (such as steam, fly ash, sludge, or sulfur) becomes the primary raw feedstock for a neighboring plant.'
    ],
    practicalExamples: [
      {
        title: 'Kalundborg Industrial Symbiosis (Denmark)',
        description: 'For over 50 years in Kalundborg, Denmark, an energy plant, an oil refinery, a pharmaceutical manufacturer, and a drywall maker share water, steam, and byproducts. Gypsum extracted from power plant flue gas desulfurization replaces mined gypsum in drywall manufacturing, saving over 3 million m³ of water and 60,000 tons of CO2 annually.'
      },
      {
        title: 'Interface Carpet Tile Closed-Loop Recycling (ReEntry)',
        description: 'Modular carpet manufacturer Interface developed a proprietary machine that separates nylon fibers from vinyl backing. Reclaimed nylon is remelted into new 100% recycled yarn, eliminating virgin petroleum polymer extraction.'
      }
    ],
    activityTask: {
      title: 'Identify a Circular Material Opportunity',
      instruction: 'Think about a common manufacturing process in your region (e.g. beer brewing, coffee roasting, woodworking, construction).',
      prompt: 'Identify one major byproduct (e.g. spent brewer grain, coffee grounds, sawdust). How could that byproduct become raw material for a secondary product (e.g. mushroom cultivation, biofuel briquettes, compost)?'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'wm-q3-1',
          questionText: 'What distinguishes the "Biological Cycle" from the "Technical Cycle" in circular economy design?',
          options: [
            'Biological materials can safely biodegrade and return nutrients to soil; technical materials must be kept circulating through reuse and recycling',
            'Biological cycles apply only to trees; technical cycles apply only to internet websites',
            'Biological cycles produce radioactive waste; technical cycles produce fresh water',
            'There is no difference between the two cycles'
          ],
          correctAnswerIndex: 0,
          explanation: 'The butterfly diagram divides materials into biological nutrients (compostable organics) and technical nutrients (metals, polymers that must be recycled).'
        },
        {
          id: 'wm-q3-2',
          questionText: 'What is "industrial symbiosis"?',
          options: [
            'A cooperative network where the waste byproduct of one industrial facility becomes the raw material input for another',
            'When two companies merge their stock market tickers',
            'When factory robots replace all human assembly workers',
            'Exporting factory waste to ocean barges'
          ],
          correctAnswerIndex: 0,
          explanation: 'Industrial symbiosis connects distinct industries to exchange waste, byproducts, heat, and wastewater, eliminating landfill disposal and reducing raw material costs.'
        },
        {
          id: 'wm-q3-3',
          questionText: 'What does "Cradle to Cradle" (C2C) design prioritize?',
          options: [
            'Designing products so that materials can be indefinitely disassembled and re-entered into healthy biological or technical cycles',
            'Manufacturing baby cribs out of recycled plastic bottles only',
            'Ensuring products disintegrate completely within 30 days of purchase',
            'Burning all products at the end of their operational lifespan'
          ],
          correctAnswerIndex: 0,
          explanation: 'Cradle to Cradle eliminates the concept of waste by designing every component for safe perpetual cycling.'
        }
      ]
    }
  },
  {
    id: 'wm-ch4',
    chapterNumber: 4,
    title: 'Hazardous Waste & Zero-Waste Planning',
    description: 'Learn regulatory compliance, toxic use reduction, and TRUE Zero Waste facility certification requirements.',
    durationMinutes: 45,
    learningObjectives: [
      'Identify the characteristics of hazardous waste: ignitability, corrosivity, reactivity, and toxicity.',
      'Explain TRUE Zero Waste certification standards (achieving >90% diversion from landfill).',
      'Implement upstream toxic chemical substitution to eliminate hazardous waste streams at the source.',
      'Structure a multi-year organizational Zero Waste action plan.'
    ],
    lessonContent: [
      'While general solid waste presents volume and carbon challenges, hazardous industrial waste presents acute environmental and health risks. Under environmental regulations (such as RCRA in the US and REACH/WEEE in the European Union), waste is classified as hazardous if it exhibits one or more characteristics: Ignitability (flash point < 60°C), Corrosivity (pH ≤ 2 or ≥ 12.5), Reactivity (unstable or explosive when exposed to water), or Toxicity (leaches dangerous concentrations of heavy metals or poisons).',
      'The gold standard for institutional waste reduction is TRUE (Total Resource Use and Efficiency) Zero Waste certification, administered by Green Business Certification Inc. (GBCI). To achieve TRUE Zero Waste certification, a facility must achieve an audited minimum 90% diversion rate away from landfills, incinerators, and the environment for at least 12 consecutive months.',
      'Achieving zero waste requires looking upstream to procurement: replacing solvent-based degreasers with aqueous ultrasonic cleaners, requiring suppliers to ship in reusable collapsible totes with mandatory take-back, and designing packaging out of single-polymer unpigmented materials that have guaranteed domestic recycling markets.',
      'Zero waste is not simply a disposal strategy; it is an organizational operational excellence program that cuts hauling costs, improves worker safety, and prevents material loss.'
    ],
    practicalExamples: [
      {
        title: 'Aqueous Solvent Substitution in Aerospace Machining',
        description: 'An aerospace parts manufacturer replaced chlorinated trichloroethylene (TCE) solvent degreasers with heated water-based citrus detergent cleaning baths. The plant eliminated hazardous waste classification, saving $95,000 annually in hazardous waste disposal fees and eliminating toxic exposure for 80 machinists.'
      },
      {
        title: 'TRUE Platinum Zero Waste Distribution Hub',
        description: 'A national logistics center diverted 98.4% of all discard streams through pallet refurbishment, cardboard compression baling, cafeteria compost digesters, and zero single-use plastic cups, earning TRUE Platinum certification and generating $220,000 in net recycling commodity revenue.'
      }
    ],
    activityTask: {
      title: 'Toxic Use Reduction Audit',
      instruction: 'Identify three chemical cleaning or maintenance products in your home or facility (e.g. bleach, solvent aerosol, paint stripper, drain cleaner).',
      prompt: 'Check the safety warning labels (flammable, corrosive, toxic). Research one non-toxic green certified substitute (e.g. EPA Safer Choice or Green Seal certified alternative).'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'wm-q4-1',
          questionText: 'What are the four primary characteristics used to legally classify hazardous waste?',
          options: [
            'Ignitability, Corrosivity, Reactivity, and Toxicity',
            'Weight, Height, Length, and Color',
            'Plastic, Metal, Paper, and Glass',
            'Expensive, Cheap, Domestic, and Imported'
          ],
          correctAnswerIndex: 0,
          explanation: 'Environmental regulatory standards define hazardous waste through ignitability, corrosivity, reactivity, and toxicity criteria.'
        },
        {
          id: 'wm-q4-2',
          questionText: 'What minimum diversion rate must a facility achieve for 12 consecutive months to qualify for TRUE Zero Waste certification?',
          options: [
            'At least 90% diversion from landfill and incineration',
            'At least 50% diversion',
            '100% diversion with zero waste of any kind produced',
            '25% diversion'
          ],
          correctAnswerIndex: 0,
          explanation: 'GBCI TRUE Zero Waste certification requires facilities to divert a minimum of 90% of all generated materials from landfills and incinerators.'
        },
        {
          id: 'wm-q4-3',
          questionText: 'What is the most sustainable approach to handling toxic industrial solvents?',
          options: [
            'Source substitution with non-toxic aqueous or bio-based alternatives that eliminate the hazardous stream entirely',
            'Pouring solvents into municipal storm drains at midnight',
            'Burning solvents in open outdoor barrels',
            'Diluting solvents with river water until clear'
          ],
          correctAnswerIndex: 0,
          explanation: 'Toxic Use Reduction (TUR) focuses on replacing hazardous chemicals with benign alternatives, permanently removing risk and hazardous waste disposal requirements.'
        }
      ]
    }
  }
];

export const ENERGY_EFFICIENCY_CHAPTERS: CourseChapter[] = [
  {
    id: 'ee-ch1',
    chapterNumber: 1,
    title: 'Energy Auditing Principles & Baselines',
    description: 'Learn ASHRAE audit levels, utility billing reconciliation, and weather-normalized energy baselines.',
    durationMinutes: 45,
    learningObjectives: [
      'Explain the scopes of ASHRAE Level 1, Level 2, and Level 3 investment-grade energy audits.',
      'Calculate Energy Use Intensity (EUI) normalized by building area.',
      'Understand weather normalization using Heating Degree Days (HDD) and Cooling Degree Days (CDD).',
      'Identify baseline energy consumption and detect operational energy drift.'
    ],
    lessonContent: [
      'Energy efficiency is widely recognized as the "first fuel" of the clean energy transition: the cleanest, cheapest, and most immediately accessible kilowatt-hour of energy is the one you never have to generate in the first place. An energy audit is the systematic inspection, survey, and analysis of energy flows in a building or industrial facility.',
      'The American Society of Heating, Refrigerating and Air-Conditioning Engineers (ASHRAE) defines three recognized audit tiers: Level 1 (Walk-Through Assessment: a preliminary screening of utility bills and visual walkthrough to identify low-cost/no-cost operational improvements); Level 2 (Energy Survey and Engineering Analysis: detailed measurement of end-use loads, equipment efficiency testing, and financial payback calculations); and Level 3 (Detailed Investment-Grade Audit: rigorous computer simulation modeling, data logging, and contract-ready financial analysis for major capital retrofits).',
      'A foundational metric is Energy Use Intensity (EUI), measured in kBtu per square foot or kWh per square meter per year. Normalizing energy consumption by floor area allows facility managers to benchmark buildings against national averages (such as ENERGY STAR Portfolio Manager).',
      'To ensure energy comparisons are accurate across shifting seasonal temperatures, auditors use weather normalization with Heating Degree Days (HDD) and Cooling Degree Days (CDD). Regression modeling correlates historical utility bills with degree days, establishing a robust baseline to verify genuine savings.'
    ],
    practicalExamples: [
      {
        title: 'ASHRAE Level 2 Audit in a Commercial Office Building',
        description: 'An audit of a 120,000 sq ft office building identified that HVAC chillers and air handlers were running 24/7 even when the building was unoccupied on weekends. Reprogramming building automation system (BAS) schedules saved $42,000 in electricity with zero capital expenditure.'
      },
      {
        title: 'Weather-Normalized Baseline Verification',
        description: 'A manufacturing facility installed LED lighting and variable speed drives. By normalizing utility bills against Heating Degree Days, the engineering team proved that a 14% drop in electricity draw was directly caused by the retrofits rather than an unusually mild summer.'
      }
    ],
    activityTask: {
      title: 'Calculate Energy Use Intensity (EUI)',
      instruction: 'A municipal library building has a total floor area of 20,000 square feet. Its utility bills show that it consumes 300,000 kWh of electricity and 2,000 therms of natural gas annually.',
      prompt: 'Convert the energy to equivalent kBtu (1 kWh = 3.412 kBtu; 1 therm = 100 kBtu) and calculate the building EUI in kBtu/sq ft/year.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'ee-q1-1',
          questionText: 'What is the main characteristic of an ASHRAE Level 1 energy audit?',
          options: [
            'A preliminary walk-through assessment and utility bill review to identify low-cost/no-cost savings',
            'Demolishing the building to test foundation soil insulation',
            'A multi-million dollar architectural reconstruction blueprint',
            'An audit conducted exclusively with drone thermal satellites'
          ],
          correctAnswerIndex: 0,
          explanation: 'Level 1 audits provide a rapid walk-through screening to identify obvious operational waste and estimate potential savings.'
        },
        {
          id: 'ee-q1-2',
          questionText: 'What does Energy Use Intensity (EUI) measure?',
          options: [
            'Total annual energy consumed normalized by building floor area (e.g. kBtu/sq ft/year)',
            'The physical voltage of electrical outlets in an office',
            'The speed of electrical current flowing through copper wires',
            'How hot a light bulb feels to the touch'
          ],
          correctAnswerIndex: 0,
          explanation: 'EUI measures annual building energy consumption divided by gross floor area, allowing standardized benchmarking across facilities.'
        },
        {
          id: 'ee-q1-3',
          questionText: 'Why do energy auditors use Heating Degree Days (HDD) and Cooling Degree Days (CDD)?',
          options: [
            'To normalize energy consumption against ambient outdoor weather variations across different years',
            'To decide what clothes building maintenance workers should wear',
            'To set the thermostat to maximum heat in the middle of summer',
            'Degree days are only used by agricultural farmers'
          ],
          correctAnswerIndex: 0,
          explanation: 'Weather normalization accounts for unusually hot or cold seasons so auditors can accurately measure the real savings of energy retrofits.'
        }
      ]
    }
  },
  {
    id: 'ee-ch2',
    chapterNumber: 2,
    title: 'Electrical & Motor System Efficiency',
    description: 'Master pump and fan affinity laws, variable frequency drives (VFDs), and motor efficiency standards.',
    durationMinutes: 45,
    learningObjectives: [
      'Explain the Affinity Laws for centrifugal pumps and fans (Power varies with the cube of speed).',
      'Understand how Variable Frequency Drives (VFDs) eliminate mechanical throttling waste.',
      'Identify international motor efficiency classes (IE1 through IE4 Super Premium).',
      'Calculate electrical savings and simple payback for motor retrofits.'
    ],
    lessonContent: [
      'Electric motors are the unsung workhorses of modern civilization, powering ventilation fans, chilled water pumps, industrial conveyor belts, and compressors. In industrial facilities, electric motors typically account for over 65% to 70% of total plant electricity consumption.',
      'Historically, when an air ventilation fan or water pump needed to deliver 70% flow, engineers simply throttled a mechanical valve or closed a damper—comparable to driving a car with your foot slammed down on the accelerator while pressing the brake to regulate speed. The motor continues drawing full power from the electrical grid, and the excess energy is lost as hydraulic turbulence and friction.',
      'The Affinity Laws for centrifugal fans and pumps reveal a remarkable mathematical principle: Power is proportional to the cube of rotational speed (P ∝ N³). If you reduce the speed of a pump by just 20% (operating at 80% speed), the power required drops to 0.8³ = 0.512—a staggering 49% reduction in electrical power draw!',
      'Variable Frequency Drives (VFDs, or inverters) electronically adjust the frequency and voltage supplied to the motor, modulating pump or fan speed to match exact real-time demand. Furthermore, upgrading legacy motors to modern IE3 (Premium) and IE4 (Super Premium) motors utilizes higher-grade silicon steel and copper rotors, reducing internal electrical resistance losses.'
    ],
    practicalExamples: [
      {
        title: 'Chilled Water Pump VFD Retrofit',
        description: 'A commercial hospital campus retrofitted 6 constant-speed 50-horsepower chilled water distribution pumps with variable frequency drives and differential pressure sensors. Power consumption dropped by 44%, delivering $38,000 in annual electrical savings and achieving simple financial payback in 14 months.'
      },
      {
        title: 'LED Lighting Upgrade with Occupancy Sensing',
        description: 'Replacing legacy 400-watt metal-halide warehouse fixtures with 120-watt high-bay LEDs paired with integrated microwave occupancy sensors reduced lighting circuit energy consumption by 78% while eliminating maintenance bulb replacements for 50,000 operating hours.'
      }
    ],
    activityTask: {
      title: 'Affinity Law Calculation',
      instruction: 'A cooling tower fan motor consumes 30 kW of electrical power when operating at 100% full speed (1,800 RPM).',
      prompt: 'Using the Affinity Law (P2 = P1 * (N2 / N1)³), calculate how much power the motor draws if its speed is reduced to 75% (1,350 RPM). What is the percentage of energy saved?'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'ee-q2-1',
          questionText: 'According to the pump and fan Affinity Laws, how does power consumption relate to rotational speed?',
          options: [
            'Power is proportional to the cube of speed (reducing speed by 20% cuts power by nearly 50%)',
            'Power is completely independent of rotational speed',
            'Power increases when speed decreases',
            'Power varies linearly (reducing speed by 10% cuts power by only 1%)'
          ],
          correctAnswerIndex: 0,
          explanation: 'Because power varies with the cube of speed (P ∝ N³), small reductions in pump or fan speed yield massive reductions in power consumption.'
        },
        {
          id: 'ee-q2-2',
          questionText: 'What is the primary function of a Variable Frequency Drive (VFD)?',
          options: [
            'It electronically modulates the frequency and voltage to control motor speed to match actual demand',
            'It stores electricity like a giant lithium battery',
            'It converts electrical power into compressed hydrogen gas',
            'It plays background music through motor vibrations'
          ],
          correctAnswerIndex: 0,
          explanation: 'VFDs adjust electrical input frequency, allowing motors to run at partial speeds rather than constantly running at 100% full speed against closed valves.'
        },
        {
          id: 'ee-q2-3',
          questionText: 'What percentage of industrial electricity consumption is typically drawn by electric motor systems?',
          options: [
            'Between 65% and 70%',
            'Less than 5%',
            'Exactly 100% in all buildings',
            'Under 1%'
          ],
          correctAnswerIndex: 0,
          explanation: 'Motors represent the largest industrial electrical load, consuming approximately two-thirds of all industrial electricity worldwide.'
        }
      ]
    }
  },
  {
    id: 'ee-ch3',
    chapterNumber: 3,
    title: 'Thermal Systems & Waste Heat Recovery',
    description: 'Learn boiler combustion tuning, steam trap inspection, and heat exchanger recovery design.',
    durationMinutes: 45,
    learningObjectives: [
      'Understand boiler combustion efficiency and flue gas excess air tuning.',
      'Identify the energy and financial losses associated with failed open steam traps.',
      'Design waste heat recovery exchanger systems using economizers and heat pipes.',
      'Apply Pinch Analysis concepts to match thermal heat sources with cold process sinks.'
    ],
    lessonContent: [
      'Thermal energy (steam, hot water, and high-temperature process heat) represents a massive portion of total energy consumption in manufacturing, food processing, chemicals, and institutional heating. In thermal systems, every percentage point of combustion efficiency saved directly reduces natural gas or fuel oil consumption.',
      'In industrial boilers, combustion efficiency depends heavily on the fuel-to-air ratio. Too little combustion air causes incomplete combustion, producing dangerous toxic carbon monoxide and unburned soot. Too much combustion air, however, acts as a thermal thief: cold ambient air is heated up by the burner and blown straight out the exhaust flue stack into the atmosphere, carrying precious heat with it. Automated oxygen trim systems continuously measure stack O2 and fine-tune air intake dampers to maintain optimal 3% to 4% stack oxygen.',
      'In steam distribution networks, steam traps are automatic valves designed to discharge liquid condensate while trapping high-pressure live steam inside the pipe. When steam traps fail "open", high-pressure live steam blows unimpeded into the condensate return or atmosphere. A single blowing steam trap can waste over $8,000 to $12,000 in fuel annually.',
      'Finally, Waste Heat Recovery captures exhaust thermal energy using economizers or heat pipe heat exchangers. Hot flue gas exiting a boiler at 220°C is passed across water coils, preheating incoming cold boiler feedwater from 20°C to 80°C and reducing boiler fuel consumption by 5% to 8% immediately.'
    ],
    practicalExamples: [
      {
        title: 'Boiler Flue Gas Condensing Economizer',
        description: 'A food processing plant generating 20,000 lbs/hr of steam installed a condensing flue gas economizer. Capturing latent and sensible heat from the flue exhaust preheated process wash water, saving 110,000 therms of natural gas and $88,000 annually.'
      },
      {
        title: 'Ultrasonic Steam Trap Survey',
        description: 'An annual acoustic ultrasound survey across 220 steam traps at a university campus identified 18 leaking or failed-open traps. Replacing the damaged trap capsules cost $9,000 and avoided $95,000 in wasted steam losses over the following winter.'
      }
    ],
    activityTask: {
      title: 'Steam Trap Energy Loss Estimation',
      instruction: 'A 1/4-inch orifice steam trap operating at 100 psig steam pressure has failed open, leaking live steam continuously for 8,000 operating hours per year.',
      prompt: 'If steam costs $12 per 1,000 lbs and the leak rate is approximately 80 lbs/hr, calculate the total annual monetary loss of this single failed trap. How does this compare to the $500 cost of replacing the trap?'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'ee-q3-1',
          questionText: 'What is the function of a steam trap in an industrial steam distribution network?',
          options: [
            'To discharge liquid condensate and air while preventing live steam from escaping',
            'To trap wild animals that enter boiler rooms',
            'To add cold tap water directly into the steam pipes',
            'To measure boiler room atmospheric air pressure'
          ],
          correctAnswerIndex: 0,
          explanation: 'Steam traps automatically open to drain condensed water (which causes water hammer and corrosion) while closing tight against gaseous steam to prevent energy loss.'
        },
        {
          id: 'ee-q3-2',
          questionText: 'Why is an optimal fuel-to-air ratio crucial for boiler combustion efficiency?',
          options: [
            'Excess air carries valuable thermal energy straight out the exhaust flue stack into the atmosphere',
            'Too much air causes the boiler to physically float into the sky',
            'Air completely prevents natural gas from catching fire under all circumstances',
            'Boilers do not use any air during combustion'
          ],
          correctAnswerIndex: 0,
          explanation: 'Excess combustion air absorbs heat from the flame and carries it uselessly out the chimney stack, lowering overall boiler efficiency.'
        },
        {
          id: 'ee-q3-3',
          questionText: 'How does a boiler economizer save fuel?',
          options: [
            'It extracts heat from hot exhaust flue gas to preheat incoming cold boiler feedwater',
            'It turns off the boiler burner whenever the building is occupied',
            'It replaces natural gas with coal powder',
            'It decreases the boiling temperature of water to 10 degrees Celsius'
          ],
          correctAnswerIndex: 0,
          explanation: 'Economizers are heat exchangers that reclaim waste thermal energy from the exhaust stack to preheat water entering the boiler, cutting fuel demand.'
        }
      ]
    }
  },
  {
    id: 'ee-ch4',
    chapterNumber: 4,
    title: 'Compressed Air Systems & Building Optimization',
    description: 'Eliminate artificial demand, repair compressed air leaks, and configure smart Building Automation Systems (BAS).',
    durationMinutes: 45,
    learningObjectives: [
      'Understand why compressed air is the most expensive industrial utility (only 10-15% efficiency).',
      'Conduct ultrasonic compressed air leak surveys to eliminate acoustic leaks.',
      'Explain "artificial demand" caused by excessive system distribution pressure.',
      'Implement Building Automation System (BAS) temperature setback and night-purge optimization.'
    ],
    lessonContent: [
      'Industrial plant managers often refer to compressed air as the "Fourth Utility" (alongside electricity, natural gas, and water). However, compressed air is by far the most expensive form of energy in a factory: electric motor compressors convert electrical energy into compressed air with an overall thermodynamic efficiency of only 10% to 15%. The remaining 85% to 90% of electricity is lost as heat. Generating 1 horsepower of useful compressed air work requires approximately 7 to 8 horsepower of electrical input!',
      'In unmanaged industrial facilities, 20% to 30% of total compressor output is quietly lost to leaks in fittings, quick-disconnect couplers, damaged hoses, and open condensate drains. Because air leaks are invisible, they often hiss unnoticed above loud machinery.',
      'Using airborne ultrasonic acoustic detectors, maintenance auditors detect the high-frequency turbulence created by escaping air, tagging leak locations and calculating repair priority.',
      'Another critical factor is "artificial demand". Every 2 psi reduction in overall compressor line pressure reduces compressor electrical power draw by approximately 1%. Operating an entire system at 125 psi when tools only require 90 psi wastes tremendous energy and increases leak rates exponentially.',
      'In commercial buildings, smart Building Automation Systems (BAS) provide the software intelligence for HVAC efficiency: implementing night setback temperatures, scheduled morning pre-cooling, enthalpy-based air economization, and demand-controlled ventilation (DCV) using CO2 room sensors.'
    ],
    practicalExamples: [
      {
        title: 'Ultrasonic Compressed Air Leak Survey in Automotive Assembly',
        description: 'An acoustic ultrasound inspection across a 400,000 sq ft manufacturing plant tagged 142 compressed air leaks totaling 310 CFM. Repairing push-connect fittings and replacing cracked hoses cost $4,500 and saved $58,000 annually in compressor electricity.'
      },
      {
        title: 'Demand-Controlled Ventilation (DCV) with CO2 Sensors',
        description: 'A 1,000-seat university lecture hall previously drew 100% outside air continuously during operating hours. Installing indoor CO2 sensors modulated ventilation dampers based on actual occupancy headcount, cutting winter heating and summer cooling energy by 52%.'
      }
    ],
    activityTask: {
      title: 'Compressed Air Line Pressure Energy Analysis',
      instruction: 'A manufacturing plant operates three 100-horsepower air compressors running 6,000 hours per year at an elevated discharge pressure of 120 psi, even though production machines only require 95 psi.',
      prompt: 'If reducing system pressure by 2 psi saves 1% of compressor electricity, estimate the percentage savings achieved by tuning system pressure down from 120 psi to 100 psi (a 20 psi reduction).'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'ee-q4-1',
          questionText: 'Approximately what percentage of electrical energy supplied to an air compressor delivers useful mechanical work?',
          options: [
            'Only 10% to 15% (with 85% to 90% dissipated as thermal heat)',
            '95% to 99% efficiency',
            'Exactly 50%',
            '100% efficiency'
          ],
          correctAnswerIndex: 0,
          explanation: 'Compressed air is notoriously energy-intensive; roughly 85-90% of electrical input becomes heat, making compressed air leaks extremely costly.'
        },
        {
          id: 'ee-q4-2',
          questionText: 'How much compressor electrical energy is saved for every 2 psi reduction in system distribution pressure?',
          options: [
            'Approximately 1% of compressor power',
            '50% of compressor power',
            'Zero savings (pressure has no relationship to power)',
            'Exactly 10% per psi'
          ],
          correctAnswerIndex: 0,
          explanation: 'As a rule of thumb, every 2 psi drop in discharge pressure reduces compressor motor power draw by approximately 1% while reducing leak rates.'
        },
        {
          id: 'ee-q4-3',
          questionText: 'What is "Demand-Controlled Ventilation" (DCV) in building energy management?',
          options: [
            'Using indoor CO2 sensors to modulate fresh outside air ventilation based on actual room occupancy',
            'Turning off all building air conditioning when tenants complain',
            'Opening all windows during thunderstorms',
            'Replacing air filters once every ten years'
          ],
          correctAnswerIndex: 0,
          explanation: 'DCV uses CO2 sensors to monitor human breath levels, bringing in outside air when rooms are occupied and throttling back conditioning when rooms are empty.'
        }
      ]
    }
  }
];
