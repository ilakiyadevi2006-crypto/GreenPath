import { CourseChapter } from '../types';

export const GREEN_IT_CHAPTERS: CourseChapter[] = [
  {
    id: 'git-ch1',
    chapterNumber: 1,
    title: 'Chapter 1: Introduction to Green IT',
    description: 'Understand what Green IT is, why sustainable technology is crucial, the global carbon footprint of the digital world, and hardware lifecycle stages.',
    durationMinutes: 35,
    learningObjectives: [
      'Understand the definition and scope of Green IT in the modern digital economy',
      'Identify the environmental footprint of digital devices, networks, and data centers',
      'Examine the four device lifecycle stages: extraction, manufacturing, use, and end-of-life',
      'Distinguish between operational carbon emissions and embodied hardware carbon'
    ],
    lessonContent: [
      'Green Information Technology (Green IT) is the discipline and practice of designing, manufacturing, operating, and disposing of computing hardware, software systems, and digital networks in an environmentally responsible manner. In our increasingly connected world, computing powers everything from communication and commerce to medical diagnostics and remote education. However, digital technology has a physical, planetary cost that is often overlooked because software and the "cloud" feel weightless.',
      'A common misconception is that "going digital" is inherently green because it eliminates paper. While digital workflows do reduce physical printing, the Information and Communications Technology (ICT) sector generates roughly 3% to 4% of total global greenhouse gas emissions. This is on par with the global aviation industry. Every time we stream video, back up photos, or run complex software algorithms, electricity is consumed across global networks, subsea cables, and rack-mounted servers.',
      'To understand a device\'s true environmental impact, we must apply lifecycle thinking across four distinct phases: (1) Raw Material Extraction, where copper, lithium, gold, cobalt, and rare earth minerals are extracted from the earth; (2) Manufacturing and Silicon Fabrication, which requires ultra-pure cleanrooms, toxic chemicals, and intense heating; (3) Operational Use, which includes the electricity needed to charge batteries and power processors; and (4) End-of-Life Disposal, where discarded hardware either enters circular recycling or hazardous landfills.',
      'Crucially, for consumer electronics like laptops, tablets, and smartphones, between 70% and 85% of their total lifetime carbon footprint occurs during manufacturing before the consumer even turns on the device for the first time. This is known as "embodied carbon". Because manufacturing is so resource-intensive, extending the lifespan of a laptop from two years to five years cuts its annual carbon footprint by nearly 50%—far more than any small operational energy saving from buying a brand new model.'
    ],
    practicalExamples: [
      {
        title: 'Modular Smartphone Architecture (Fairphone)',
        description: 'Dutch social enterprise Fairphone created a modular smartphone designed to be opened with a standard screwdriver. Users can replace worn-out batteries, cracked screens, or camera sensors in under five minutes. By keeping devices in active use for over five years and sourcing Fairtrade gold and recycled plastics, Fairphone cuts device lifetime emissions by more than 30%.'
      },
      {
        title: 'European Green Public Procurement (GPP)',
        description: 'Government municipalities across Sweden, Norway, and Germany adopted strict Green Public Procurement guidelines for their IT acquisitions. Rather than buying the cheapest laptops, tenders mandate TCO Certified or EPEAT Gold standards, requiring vendors to provide 5-year spare parts availability, non-toxic flame retardants, and supply chain audit transparency.'
      }
    ],
    activityTask: {
      title: 'Personal Digital Hardware Audit',
      instruction: 'Conduct a thorough inventory of all electronic devices you personally or your household/team uses (smartphones, laptops, monitors, tablets, smart speakers). Note down how old each device is and whether it is still performing well. Write down one concrete maintenance or software action you can take to prolong the active lifespan of at least one device by an extra year (for example: replacing an aging battery, uninstalling bloatware, or applying a protective case).',
      prompt: 'How many devices did you identify, and what specific action will you take to keep them running longer?'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'git-ch1-q1',
          questionText: 'Roughly what proportion of global greenhouse gas emissions is currently attributed to the ICT sector?',
          options: [
            'Around 3% to 4%, comparable to the global aviation industry',
            'Less than 0.1%',
            'Over 40% of all global emissions',
            'Zero percent because digital software has no physical weight'
          ],
          correctAnswerIndex: 0,
          explanation: 'The ICT sector produces approximately 3% to 4% of global greenhouse emissions, which is comparable to or slightly higher than commercial aviation before recent expansion.'
        },
        {
          id: 'git-ch1-q2',
          questionText: 'For a typical modern laptop or smartphone, which lifecycle stage produces the largest share of total greenhouse gas emissions?',
          options: [
            'Raw material extraction and manufacturing (embodied carbon)',
            'Shipping the packaged box to the store',
            'Charging the battery during daily home use',
            'Recycling the paper manual inside the box'
          ],
          correctAnswerIndex: 0,
          explanation: 'Embodied carbon from silicon chip fabrication, precious metal extraction, and assembly accounts for 70% to 85% of a consumer laptop or smartphone\'s lifetime carbon footprint.'
        },
        {
          id: 'git-ch1-q3',
          questionText: 'What is the most effective action an individual or organization can take to reduce the environmental impact of their personal computing devices?',
          options: [
            'Prolonging the useful operating life of existing devices through maintenance and repair',
            'Replacing laptops every 12 months for minor battery efficiency gains',
            'Keeping the screen brightness set to 100% at all times',
            'Throwing old charging cables directly into the municipal landfill'
          ],
          correctAnswerIndex: 0,
          explanation: 'Extending a device\'s lifespan from 2 years to 4-5 years spreads its heavy manufacturing footprint over more years, cutting its effective annual carbon impact by up to 50%.'
        },
        {
          id: 'git-ch1-q4',
          questionText: 'What does "Green IT" specifically encompass?',
          options: [
            'Designing, manufacturing, using, and disposing of computing technology in an ecologically sustainable manner',
            'Painting computer cases green to reflect sunlight',
            'Only turning off Wi-Fi routers on weekends',
            'Buying products that come in green-colored cardboard packaging'
          ],
          correctAnswerIndex: 0,
          explanation: 'Green IT addresses the holistic lifecycle of technology: energy efficiency, responsible mineral sourcing, software optimization, right-to-repair, and circular e-waste recycling.'
        }
      ]
    }
  },
  {
    id: 'git-ch2',
    chapterNumber: 2,
    title: 'Chapter 2: Energy-Efficient Computing',
    description: 'Learn how computer hardware consumes electricity, how operating system power profiles work, and how to eliminate phantom power waste.',
    durationMinutes: 40,
    learningObjectives: [
      'Understand dynamic power consumption vs static leakage power in microprocessors',
      'Configure operating system ACPI sleep states, hibernation, and display timeouts',
      'Recognize international energy efficiency standards such as Energy Star 8.0 and 80 PLUS',
      'Identify and eliminate phantom ("vampire") power draws from workstation peripherals'
    ],
    lessonContent: [
      'At the silicon level, a computer consumes two forms of electrical power: dynamic power and static leakage power. Dynamic power is consumed when transistors switch between high and low states (binary 0 and 1) to perform arithmetic calculations. Static power, on the other hand, is electricity that leaks through microscopic semiconductor gates even when the processor is completely idle. When a computer runs unoptimized background tasks, indexing services, or poorly written applications, processors remain at high clock speeds, generating heat and drawing continuous power.',
      'Modern operating systems manage hardware power through the Advanced Configuration and Power Interface (ACPI) standard. Under ACPI, systems transition between power states: S0 (fully operational), S1 to S3 (Sleep states, where CPU clocks stop and data is held in RAM using milliwatts), S4 (Hibernation, where RAM contents are written to non-volatile storage and the system powers down completely), and S5 (Soft Off). Configuring computers to enter sleep after 10 to 15 minutes of inactivity saves an average of 150 to 300 kilowatt-hours per machine annually compared to leaving it idling overnight.',
      'Displays are another significant consumer of workstation energy. On traditional LCD panels with LED backlights, the backlight remains fully lit regardless of whether the screen displays white or black. In contrast, modern OLED (Organic Light Emitting Diode) and AMOLED screens illuminate each pixel independently. When an OLED pixel displays pure black, it turns off entirely and consumes almost zero current. Using true dark mode on OLED screens and moderating screen brightness from 100% to 70% can reduce display energy consumption by up to 30% to 40%.',
      'Beyond the computer itself, workstation peripherals contribute substantially to invisible energy waste through phantom power (also called vampire draw). Power bricks for laptop chargers, external monitors, docking stations, USB hubs, and desktop speakers continue drawing between 0.5 Watts and 15 Watts each when plugged in, even if the computer is turned off or disconnected. Using smart power strips with master-slave outlets or manual cut-off switches stops this passive waste entirely.'
    ],
    practicalExamples: [
      {
        title: 'Automated Enterprise Power Management Policies',
        description: 'A global financial services corporation with 15,000 office workstations implemented centralized Active Directory Group Policies. All desktop computers were scheduled to enter low-power sleep after 15 minutes of idle time and automatically shut down at 8:00 PM on weekdays. The company reduced its annual electricity consumption by 2.4 million kWh, avoiding over 1,000 metric tons of CO2 emissions and saving $260,000 annually.'
      },
      {
        title: '80 PLUS Titanium Power Supply Upgrades',
        description: 'High-performance engineering workstations and server units require internal power supply units (PSUs) to convert AC wall current into DC voltage. Standard PSUs waste 20% to 30% of input power as ambient heat. Upgrading to 80 PLUS Titanium certified power supplies delivers 94% to 96% electrical conversion efficiency, drastically lowering heat output and reducing office air conditioning load.'
      }
    ],
    activityTask: {
      title: 'Workstation Energy Optimization & Settings Audit',
      instruction: 'Open your computer\'s operating system power and sleep settings. Verify that the screen timeout is set to 10 minutes or less on battery and 15 minutes or less on wall power. Verify that system sleep is enabled. If your device has an OLED or modern display, switch your operating system theme to Dark Mode. Finally, inspect your physical desk setup: locate at least one power adapter or peripheral that can be unplugged when not in active use.',
      prompt: 'What were your previous sleep settings, and what adjustments did you make to optimize your workstation?'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'git-ch2-q1',
          questionText: 'What is "vampire power" (also known as phantom load) in computing?',
          options: [
            'Standby electricity drawn by power adapters and peripherals even when devices are idle or switched off',
            'Electricity consumed by malicious computer viruses',
            'Excessive heat generated by graphics cards during 3D video gaming',
            'Power surges that occur during nighttime lightning storms'
          ],
          correctAnswerIndex: 0,
          explanation: 'Vampire power refers to continuous standby electricity drawn by plugged-in power bricks, external monitors, and peripheral adapters even when the host device is asleep or unplugged.'
        },
        {
          id: 'git-ch2-q2',
          questionText: 'Under the ACPI hardware standard, what occurs when a computer enters the S3 Sleep state?',
          options: [
            'System memory (RAM) is preserved while processors, fans, and disk drives are powered down',
            'The computer permanently formats its internal solid-state drive',
            'The central processor runs at maximum clock frequency to compute background tasks',
            'The computer switches to an emergency diesel generator'
          ],
          correctAnswerIndex: 0,
          explanation: 'In the S3 Sleep state (Suspend to RAM), active session data remains safely in RAM while power is removed from processors, storage drives, and cooling fans.'
        },
        {
          id: 'git-ch2-q3',
          questionText: 'On which type of display panel does enabling dark mode deliver genuine, measurable energy savings?',
          options: [
            'OLED and AMOLED screens where individual black pixels turn off and draw zero current',
            'Traditional LCD displays where a continuous backlight illuminates behind the entire panel',
            'CRT cathode-ray tube computer monitors only',
            'Projector screens using metal-halide bulbs'
          ],
          correctAnswerIndex: 0,
          explanation: 'Because OLED pixels emit their own light independently, displaying true black turns those pixels completely off, saving up to 30-40% of display battery power.'
        },
        {
          id: 'git-ch2-q4',
          questionText: 'What is guaranteed by an 80 PLUS Titanium certified power supply unit (PSU)?',
          options: [
            'Over 90% to 94%+ electrical energy conversion efficiency from AC to DC power',
            'The computer will run on solar power without any battery',
            'The computer contains 80 pounds of titanium metal',
            'The device is immune to all software malware'
          ],
          correctAnswerIndex: 0,
          explanation: 'The 80 PLUS Titanium certification signifies that the internal power supply achieves 90% to 94%+ electrical conversion efficiency, minimizing energy wasted as heat.'
        }
      ]
    }
  },
  {
    id: 'git-ch3',
    chapterNumber: 3,
    title: 'Chapter 3: Electronic Waste Management',
    description: 'Understand the global e-waste crisis, hazardous chemical risks, circular electronics design, the right to repair, and certified recycling.',
    durationMinutes: 40,
    learningObjectives: [
      'Grasp the scale of the global electronic waste problem according to United Nations data',
      'Identify hazardous substances (lead, mercury, cadmium) and valuable materials in electronics',
      'Understand the Right to Repair movement and circular economy principles in hardware',
      'Recognize verified recycling certifications such as e-Stewards and R2 (Responsible Recycling)'
    ],
    lessonContent: [
      'Electronic waste (e-waste) is the fastest-growing municipal waste stream in the world. According to the United Nations Global E-waste Monitor, humanity generated over 62 million metric tonnes of electronic waste in a single year—a figure projected to surge past 80 million tonnes by 2030. Tragically, less than 23% of this waste is formally collected and documented as recycled under environmentally sound management. The remainder ends up in landfills, is incinerated, or is illegally exported to informal scrap yards.',
      'Electronic devices are a toxic paradox: they contain both some of the most precious elements on Earth and some of the most dangerous poisons. A single tonne of discarded smartphone circuit boards contains up to 300 grams of pure gold, 1,000 grams of silver, and significant amounts of copper, palladium, and neodymium. However, older circuit boards, solder, cathode ray tubes, and batteries contain toxic heavy metals including lead (which causes neurological damage), mercury, cadmium (a kidney toxin), and brominated flame retardants. When e-waste is burned in open-air pits or dumped into unlined soil, these toxins leach into local drinking water tables and the global food chain.',
      'The "Right to Repair" movement has emerged as an essential legal and environmental antidote to planned obsolescence. For years, tech manufacturers used proprietary tamper-proof screws, glued batteries to chassis frames, paired replacement parts with cryptographic serial locks, and refused to publish repair manuals. Right to repair laws—now adopted across the European Union and several US states—require hardware manufacturers to provide replacement parts, diagnostic schematics, and fair software repair access for at least seven to ten years after a model\'s release.',
      'When hardware truly reaches the end of its operational viability, it must be recycled through certified IT Asset Disposition (ITAD) specialists. Two independent certifications provide rigorous verification: e-Stewards and R2v3 (Responsible Recycling). Certified facilities guarantee three vital safeguards: (1) Cryptographic, verifiable data sanitization conforming to NIST 800-88 standards so personal data is permanently wiped; (2) Strict occupational safety standards preventing workers from inhaling toxic dust; and (3) Complete prohibition of shipping hazardous scrap to developing countries.'
    ],
    practicalExamples: [
      {
        title: 'Framework Modular Laptop Architecture',
        description: 'Framework Computer designed an ultraportable laptop where every single module—including USB-C, HDMI, and storage expansion cards, the keyboard, the battery, and the mainboard—can be swapped using a single included screwdriver. When a new CPU generation arrives, users simply buy a replacement motherboard rather than discarding the entire aluminum body and display.'
      },
      {
        title: 'Corporate ITAD Refurbishment & School Donation',
        description: 'An international telecom provider decommissioned 8,000 three-year-old enterprise laptops during a fleet transition. Instead of sending them to scrap, they partnered with an e-Stewards certified ITAD partner. The partner wiped all storage under NIST 800-88 guidelines, upgraded the RAM and SSDs, and donated 7,200 fully functional laptops to underserved rural schools, extending their active service by four additional years.'
      }
    ],
    activityTask: {
      title: 'Local E-Waste Recycling & Safe Data Sanitization Plan',
      instruction: 'Locate a certified e-waste drop-off center, municipal recycling station, or manufacturer take-back depot in your area. Next, review the necessary steps to safely decommission an old phone or computer: (1) Back up personal files to an external drive or cloud; (2) Sign out of all accounts (Google, Apple, Microsoft); (3) Perform an encrypted factory reset. Write down the name and location of the drop-off facility you found.',
      prompt: 'Which e-waste drop-off location or take-back program did you find, and what steps will you follow before handing over a device?'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'git-ch3-q1',
          questionText: 'According to the United Nations Global E-waste Monitor, roughly what percentage of global e-waste is formally collected and documented as properly recycled?',
          options: [
            'Less than 25%',
            'Approximately 75%',
            'Over 90%',
            '100% in developed countries'
          ],
          correctAnswerIndex: 0,
          explanation: 'Less than 23% of global electronic waste is formally documented as collected and recycled properly, leaving the vast majority to end up in landfills or informal dumps.'
        },
        {
          id: 'git-ch3-q2',
          questionText: 'Why is "urban mining" (recovering minerals from e-waste) environmentally superior to extracting virgin ore from natural mines?',
          options: [
            'E-waste contains concentrations of precious metals up to 50 times richer than natural ores and requires drastically less energy to refine',
            'Urban mining does not require any human labor or tools',
            'Computer circuit boards contain no toxic substances whatsoever',
            'Virgin mining has been completely outlawed across all nations'
          ],
          correctAnswerIndex: 0,
          explanation: 'Extracting gold and copper from discarded electronics produces significantly lower carbon emissions, avoids acid mine drainage, and repurposes already-refined materials.'
        },
        {
          id: 'git-ch3-q3',
          questionText: 'What is the primary objective of the "Right to Repair" movement in consumer technology?',
          options: [
            'To ensure consumers and independent repair technicians have access to spare parts, schematics, and diagnostic tools at fair prices',
            'To make all software applications free of charge',
            'To ban all new electronics from being manufactured',
            'To force consumers to build their own computers from raw silicon'
          ],
          correctAnswerIndex: 0,
          explanation: 'The Right to Repair ensures that hardware can be serviced and repaired affordably by owners and local repair shops, ending premature planned obsolescence.'
        },
        {
          id: 'git-ch3-q4',
          questionText: 'Which two third-party certifications assure that an electronic waste recycler adheres to strict worker safety and does not export hazardous waste illegally?',
          options: [
            'e-Stewards and R2 (Responsible Recycling)',
            'Energy Star and Bluetooth SIG',
            'ISO 9001 and HDMI Standard',
            'USB-IF and CE Safety Marking'
          ],
          correctAnswerIndex: 0,
          explanation: 'e-Stewards and R2v3 are the globally recognized benchmarks for ethical electronics recycling, preventing toxic dumping and enforcing safe worker conditions.'
        }
      ]
    }
  },
  {
    id: 'git-ch4',
    chapterNumber: 4,
    title: 'Chapter 4: Sustainable Data Centers',
    description: 'Explore the infrastructure powering the internet, Power Usage Effectiveness (PUE), advanced liquid cooling, and 24/7 carbon-free energy.',
    durationMinutes: 45,
    learningObjectives: [
      'Understand how data centers function and why their electrical footprint is growing',
      'Calculate and interpret the Power Usage Effectiveness (PUE) metric',
      'Compare mechanical chillers with free-air cooling and liquid immersion systems',
      'Discover how data center waste heat is repurposed for municipal district heating'
    ],
    lessonContent: [
      'Data centers are the invisible factories of the 21st century. Every website, cloud file, streaming show, AI query, and online payment flows through these specialized facilities. A modern hyperscale data center can span several football fields, housing over 50,000 servers, petabytes of solid-state storage, high-density network switches, massive uninterruptible battery banks, and backup diesel generators. Globally, data centers currently consume an estimated 1% to 1.5% of worldwide electricity, a number rising rapidly with the expansion of artificial intelligence and cloud computing.',
      'To evaluate how efficiently a data center utilizes its power, the industry relies on Power Usage Effectiveness (PUE), a metric established by The Green Grid. PUE is calculated as:\nPUE = Total Facility Energy / IT Equipment Energy.\nIf a data center consumes 10 Megawatts of total utility electricity, but only 5 Megawatts directly powers the servers and switches (with the remaining 5 Megawatts consumed by cooling fans, chillers, power transformers, and lighting), its PUE is 2.0. A theoretically perfect PUE is 1.0, where every watt entering the building powers compute. While legacy enterprise data centers average around 1.55, modern green hyperscale facilities achieve PUE ratings between 1.10 and 1.18.',
      'Cooling represents the largest non-compute energy consumer in any data center. Historically, operators used power-hungry industrial air chillers. Today, green engineering has revolutionized thermal management through: (1) Free-Air Economizers, which pull cool outside ambient air directly into the building in northern or coastal climates; (2) Direct-to-Chip Liquid Cooling, where closed loops of chilled water flow over copper cold plates attached directly to CPU and GPU silicon; and (3) Two-Phase Liquid Immersion Cooling, where entire server blades are submerged into non-conductive, dielectric fluid that boils at low temperatures, eliminating internal fans and slashing facility cooling energy by up to 90%.',
      'Beyond efficiency, leading tech companies are pioneering 24/7 Carbon-Free Energy (CFE). Rather than simply purchasing voluntary annual renewable certificates to offset fossil fuel power, 24/7 CFE matches data center consumption on an hour-by-hour basis with local clean solar, wind, and geothermal sources. Furthermore, in cold climates like Finland, Sweden, and Denmark, data centers capture the hot water discharged from server cooling systems (typically 40°C to 65°C) and pump it into municipal district heating grids, warming thousands of homes and replacing coal or fossil gas boilers.'
    ],
    practicalExamples: [
      {
        title: 'Mäntsälä Data Center District Heat Recovery (Finland)',
        description: 'A large data center in Mäntsälä, Finland, captures waste thermal energy from its server racks. High-temperature heat pumps transfer the thermal energy directly into the local municipal district heating network. The waste heat supplies over 75% of the entire municipality\'s heating requirements in winter, cutting the town\'s greenhouse gas emissions from fossil gas by over 40%.'
      },
      {
        title: 'Carbon-Intelligent Workload Shifting (Google Cloud)',
        description: 'Google developed a carbon-intelligent computing platform that predicts hourly carbon intensity across global electrical grids. Non-urgent computational workloads (such as YouTube video transcoding, machine learning model updates, and web crawling) are automatically scheduled when local renewable wind and solar power are at their peak.'
      }
    ],
    activityTask: {
      title: 'PUE Calculation & Cooling Optimization Exercise',
      instruction: 'Suppose a regional data center draws 14 Megawatts of total electricity from the power grid. Instrumentation reveals that 10 Megawatts powers server hardware, while 4 Megawatts powers facility chillers, transformers, and building lighting. (1) Calculate the facility\'s PUE (14 ÷ 10 = 1.40). (2) Identify two practical engineering modifications that could reduce cooling energy and push the PUE down toward 1.15 (for example: installing hot/cold aisle containment baffles, or using free-air economizers during winter).',
      prompt: 'What is the calculated PUE, and which two cooling retrofits would you recommend?'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'git-ch4-q1',
          questionText: 'What is the formula used to calculate Power Usage Effectiveness (PUE) in data center engineering?',
          options: [
            'Total Facility Energy divided by IT Equipment Energy',
            'IT Equipment Energy divided by Cooling Energy',
            'Renewable Energy divided by Diesel Generator Output',
            'Total Square Footage divided by Number of Servers'
          ],
          correctAnswerIndex: 0,
          explanation: 'PUE = Total Facility Energy / IT Equipment Energy. A lower ratio closer to 1.0 indicates higher energy efficiency.'
        },
        {
          id: 'git-ch4-q2',
          questionText: 'What does a PUE score of 1.15 represent?',
          options: [
            'A very efficient data center where only 15% of total power is consumed by cooling, lighting, and power conversion overhead',
            'A data center that generates 15% more electricity than it uses',
            'A data center that uses 115% fossil fuel power',
            'A facility where 85% of power is wasted as heat'
          ],
          correctAnswerIndex: 0,
          explanation: 'A PUE of 1.15 means that for every 1.00 Watt powering the servers, only 0.15 Watts of overhead is required for cooling and facility systems.'
        },
        {
          id: 'git-ch4-q3',
          questionText: 'How does dielectric liquid immersion cooling improve data center energy efficiency?',
          options: [
            'By submerging server hardware in non-conductive fluid, transferring heat away far more efficiently than air and removing noisy cooling fans',
            'By freezing servers in block ice so they never heat up',
            'By spraying regular tap water directly onto electrical outlets',
            'By replacing electricity with hydraulic fluid power'
          ],
          correctAnswerIndex: 0,
          explanation: 'Liquid immersion cooling uses non-conductive fluids with high thermal conductivity, eliminating cooling fans and slashing total cooling energy by up to 90%.'
        },
        {
          id: 'git-ch4-q4',
          questionText: 'What is the benefit of connecting a data center to a municipal district heating grid?',
          options: [
            'Capturing hot water discharged from server cooling systems to heat community homes, replacing fossil fuel heating',
            'Allowing residents to connect their home computers to the data center for free internet',
            'Cooling the servers with domestic wastewater',
            'Eliminating the need for software updates'
          ],
          correctAnswerIndex: 0,
          explanation: 'Data center heat recovery captures server waste heat and channels it into city heating pipes, providing sustainable warmth for residential homes and public facilities.'
        }
      ]
    }
  },
  {
    id: 'git-ch5',
    chapterNumber: 5,
    title: 'Chapter 5: Green Software Development',
    description: 'Discover how code choices impact electricity consumption, the Software Carbon Intensity (SCI) standard, and carbon-aware programming.',
    durationMinutes: 45,
    learningObjectives: [
      'Understand how software architecture and algorithms directly influence hardware power consumption',
      'Learn the Software Carbon Intensity (SCI) specification created by the Green Software Foundation',
      'Implement carbon-aware computing strategies: temporal shifting and spatial shifting',
      'Apply practical green coding patterns: asset optimization, caching, and polling reduction'
    ],
    lessonContent: [
      'Software developers often write code under the illusion that applications live in a purely abstract mathematical space. However, every instruction executed by a CPU, every memory allocation in RAM, and every network packet transmitted across a cellular tower consumes real physical electricity. Inefficient code—such as unoptimized database loops, memory leaks, and continuous background polling—forces processors to run at high clock frequencies, drawing maximum electrical power and demanding more facility cooling.',
      'To provide a standardized engineering methodology for evaluating software emissions, the Green Software Foundation developed the Software Carbon Intensity (SCI) specification (now ISO/IEC 21031). The formula is:\nSCI = ((E × I) + M) / R\nWhere:\n- E is the energy consumed by the software system in kilowatt-hours (kWh).\n- I is the marginal carbon intensity of the electricity grid in grams of CO2e per kWh.\n- M is the embodied carbon of the physical hardware allocated to run the software.\n- R is the functional unit of the application (such as per user session, per API call, or per transaction processed).\nUnlike carbon offsetting schemes, the only way to lower an SCI score is to write more efficient software, use less physical hardware, or run compute on cleaner energy.',
      'A core pillar of green software is Carbon-Aware Computing. Rather than assuming that electricity is equally clean at all times, carbon-aware applications adjust their behavior based on real-time grid conditions:\n- Temporal Shifting: Delaying non-urgent batch computations (such as nightly database backups, video rendering, or AI model retraining) to hours of the day when solar or wind energy flood the local electric grid.\n- Spatial Shifting: Routing compute jobs to data centers located in regions with low carbon intensity, such as regions powered primarily by hydroelectric or geothermal energy.\n- Demand Shaping: Gracefully downgrading fidelity during grid peak hours (e.g., streaming in 1080p instead of 4K, or pausing cosmetic background animations).',
      'On the web and mobile front end, small engineering decisions yield massive energy reductions across millions of devices. Practices include: (1) Replacing continuous HTTP polling with event-driven WebSockets or server-sent events, allowing mobile cellular radios to remain in low-power sleep; (2) Compressing images using modern formats (WebP, AVIF) and utilizing lightweight SVG vectors; (3) Aggressively caching API responses to prevent redundant network round-trips; and (4) Eliminating heavy unused JavaScript libraries (tree-shaking), which reduces client CPU compilation time and preserves battery life.'
    ],
    practicalExamples: [
      {
        title: 'Carbon-Aware Operating System Updates',
        description: 'Both Microsoft Windows 11 and Apple macOS incorporated carbon-aware scheduling APIs (such as WattTime and Electricity Maps). When a user\'s device is plugged in, heavy operating system updates and cloud backups are automatically scheduled during hours when the local electrical grid generates the lowest carbon emissions.'
      },
      {
        title: 'E-Commerce Web Bundle & Asset Optimization',
        description: 'A major international retail platform audited its web application, removing 1.8 megabytes of unused JavaScript bundles, converting product images from uncompressed PNGs to modern WebP formats, and replacing client polling with WebSocket push events. The average page payload fell by 72%, saving millions of kilowatt-hours of network transfer energy across 50 million monthly visitors.'
      }
    ],
    activityTask: {
      title: 'Green Code & Application Architecture Inspection',
      instruction: 'Select any web application or software tool you use frequently. Use browser developer tools (or inspect its user interface) to examine: (1) Does it provide a Dark Mode option to save OLED power? (2) Does it use auto-refresh polling or real-time event updates? (3) Propose one architectural optimization (such as caching static assets, deferring heavy file downloads, or optimizing images) that would make the application more carbon-efficient.',
      prompt: 'What software application did you inspect, and what specific green optimization would you propose?'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'git-ch5-q1',
          questionText: 'What is the primary purpose of the Software Carbon Intensity (SCI) specification?',
          options: [
            'To calculate the carbon emissions produced per functional unit of software (e.g., per user session or per API transaction)',
            'To calculate the monetary sales price of a software license',
            'To count how many lines of source code a programmer writes in a day',
            'To measure the physical weight of computer hard drives'
          ],
          correctAnswerIndex: 0,
          explanation: 'The SCI specification calculates the rate of carbon emissions emitted per functional unit R, combining operational electricity E, grid carbon intensity I, and embodied hardware carbon M.'
        },
        {
          id: 'git-ch5-q2',
          questionText: 'In carbon-aware computing, what is "temporal shifting"?',
          options: [
            'Rescheduling non-urgent compute workloads to hours of the day when clean renewable energy is abundant on the grid',
            'Changing your computer\'s system clock to a different timezone',
            'Running software at half-speed to confuse benchmarks',
            'Deleting all historical database records older than one year'
          ],
          correctAnswerIndex: 0,
          explanation: 'Temporal shifting delays non-critical computing tasks (such as backups or model training) until local solar, wind, or hydro power are peak-producing, cutting carbon intensity.'
        },
        {
          id: 'git-ch5-q3',
          questionText: 'Why is frequent client-side HTTP polling inefficient from a green IT perspective?',
          options: [
            'It constantly wakes up mobile cellular radios and CPU cores from low-power sleep states even when no new data exists',
            'It causes physical internet wires to overheat and melt',
            'It is permanently blocked by all modern web browsers',
            'It costs more money than using satellite internet'
          ],
          correctAnswerIndex: 0,
          explanation: 'Frequent polling forces cellular radios and CPU cores out of energy-saving sleep states; event-driven connections (like WebSockets) conserve substantial device battery and network power.'
        },
        {
          id: 'git-ch5-q4',
          questionText: 'How can web developers reduce the network energy consumed by visitors loading their web applications?',
          options: [
            'Compressing images to modern WebP/AVIF formats, eliminating unused libraries, and implementing effective browser caching',
            'Uploading uncompressed 4K video backgrounds to every webpage',
            'Forcing users to reload the page every 30 seconds',
            'Writing all code in uppercase letters'
          ],
          correctAnswerIndex: 0,
          explanation: 'Minimizing data transfer through modern image compression, removing dead code, and utilizing browser caching directly reduces the electricity consumed across internet transmission networks.'
        }
      ]
    }
  },
  {
    id: 'git-ch6',
    chapterNumber: 6,
    title: 'Chapter 6: Green IT in Everyday Life',
    description: 'Everyday digital habits, digital decluttering, sustainable cloud storage practices, and creating your personal Green IT action plan.',
    durationMinutes: 35,
    learningObjectives: [
      'Recognize the unseen energy consumption of daily digital communications and media streaming',
      'Master digital decluttering techniques to eliminate "dark data" in cloud storage',
      'Compare the energy efficiency of Wi-Fi vs mobile cellular (4G/5G) connections',
      'Create a sustainable personal and workplace Green IT Action Plan'
    ],
    lessonContent: [
      'Our personal digital lives feel effortless. We stream high-definition music, back up thousands of vacation photos to cloud drives, and send hundreds of instant messages daily. However, behind every cloud drive is a physical server spinning magnetic disks or flash arrays in multiple redundant locations around the clock. Every email with a heavy attachment sent to fifty recipients requires storage space and server cooling across fifty separate inboxes indefinitely.',
      'An estimated 60% to 80% of data stored in consumer and enterprise clouds is classified as "dark data"—redundant, obsolete, or trivial files that will never be opened or used again. This includes duplicate burst photos, unread marketing newsletters, abandoned draft spreadsheets, and forgotten video recordings. Every terabyte of zombie cloud storage demands continuous electricity to keep data center hard drives spinning and replicated. Conducting regular digital decluttering—deleting obsolete backups, emptying digital trash bins, and unsubscribing from junk mailing lists—frees up tangible physical server capacity.',
      'How we connect to the internet also impacts our carbon footprint. Transmitting data over mobile cellular networks (4G and 5G) consumes between two and four times more electrical energy per gigabyte than fixed-line fiber-optic broadband or local home Wi-Fi. This is because cellular base stations must transmit high-power radio signals over kilometers of open air, and mobile phone modems must boost amplification to maintain signal locks. Downloading large software updates, offline media, or video playlists over Wi-Fi before traveling drastically reduces energy and device battery consumption.',
      'Finally, cultivating a "device longevity mindset" is the most impactful personal Green IT philosophy. Resisting marketing pressure to upgrade smartphones or laptops every year avoids the massive embodied carbon of manufacturing. Protecting devices with durable cases, replacing degrading batteries, upgrading internal SSD storage, and choosing certified refurbished equipment when an upgrade is genuinely necessary keeps hardware out of e-waste streams and protects planetary resources.'
    ],
    practicalExamples: [
      {
        title: 'Global University Digital Cleanup Day',
        description: 'A major university system launched an annual "Digital Cleanup Week" for students, faculty, and administrative staff. In one week, participants deleted 62 Terabytes of obsolete email archives, duplicate shared cloud drives, and test databases. The cleanup directly reduced the university\'s cloud storage hosting requirements and prevented an estimated 15 tonnes of CO2 equivalent emissions annually.'
      },
      {
        title: 'Refurbished Hardware Deployment in Remote Work',
        description: 'A remote-first technology company instituted a procurement policy prioritizing manufacturer-certified refurbished laptops and monitors for new hires. The equipment delivered identical performance, came with full manufacturer warranties, and avoided approximately 18,000 kg of embodied manufacturing CO2 emissions across 80 team members.'
      }
    ],
    activityTask: {
      title: 'Personal Green IT Action Plan Commitment',
      instruction: 'Formulate three specific, actionable Green IT commitments that you will personally implement starting this week. For example:\n1. Unsubscribe from at least 10 unwanted automated email subscriptions and delete 500 obsolete emails.\n2. Enable system sleep after 15 minutes on all personal computers and turn off power strips at night.\n3. Commit to keeping your current smartphone or laptop in active service for at least another 18 to 24 months before considering an upgrade.\nWrite down your three commitments.',
      prompt: 'What three Green IT actions will you commit to implementing this week?'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'git-ch6-q1',
          questionText: 'Why does storing obsolete "dark data" in cloud storage consume ongoing electrical power?',
          options: [
            'Because cloud data centers must continuously power, cool, and redundantly replicate physical storage drives 24/7',
            'Because old files slowly turn into computer viruses',
            'Because cloud storage loses its magnetic charge if electricity is turned off for more than an hour',
            'Because storing files in the cloud is taxed by international power utilities'
          ],
          correctAnswerIndex: 0,
          explanation: 'Cloud storage is physically housed on server drives and redundant backup arrays that must remain powered and cooled 24 hours a day, 365 days a year.'
        },
        {
          id: 'git-ch6-q2',
          questionText: 'Comparing mobile cellular connections (4G/5G) with fixed Wi-Fi or wired Ethernet, which consumes significantly more energy per gigabyte transferred?',
          options: [
            'Mobile cellular connections (4G/5G) require substantially more energy due to high-power radio transmission over long distances',
            'Wi-Fi consumes 100 times more energy than cellular networks',
            'Both have identical physics and zero energy consumption',
            'Wired Ethernet cables consume the most power of all'
          ],
          correctAnswerIndex: 0,
          explanation: 'Cellular networks require high-powered radio base stations and phone transmitters to broadcast signals across miles, consuming 2-4x more electricity per gigabyte than fixed Wi-Fi or Ethernet.'
        },
        {
          id: 'git-ch6-q3',
          questionText: 'What is a core tenet of a "device longevity mindset" in everyday Green IT?',
          options: [
            'Maintaining, repairing, and keeping existing devices in active service as long as possible before replacing with refurbished equipment',
            'Purchasing the newest smartphone release every 12 months',
            'Throwing away charging adapters every six months for safety',
            'Leaving computers running all weekend to prevent switch wear'
          ],
          correctAnswerIndex: 0,
          explanation: 'Because manufacturing embodies the majority of an electronic device\'s lifetime emissions, prolonging active device life is the single most effective individual sustainability habit.'
        },
        {
          id: 'git-ch6-q4',
          questionText: 'Which simple daily habit can reduce video conferencing energy consumption during large group meetings?',
          options: [
            'Turning off your camera when you are only listening or screen sharing to reduce bandwidth and device thermal load',
            'Streaming your video in 4K resolution at all times',
            'Keeping 20 background video tabs open during the call',
            'Shouting loudly into the microphone'
          ],
          correctAnswerIndex: 0,
          explanation: 'Disabling outbound video during large meetings when you are not speaking significantly cuts upload bandwidth, CPU encoding strain, and device battery drain.'
        }
      ]
    }
  }
];
