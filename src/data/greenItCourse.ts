import { CourseChapter, LearningPath } from '../types';

export const GREEN_IT_CHAPTERS: CourseChapter[] = [
  {
    id: 'git-ch1',
    chapterNumber: 1,
    title: 'Introduction to Green IT',
    description: 'Understand the environmental footprint of digital technology and discover why sustainable computing is essential for the future.',
    durationMinutes: 40,
    learningObjectives: [
      'Define Green IT and explain the difference between Greening of IT and Greening by IT.',
      'Distinguish between operational emissions (electricity use) and embodied carbon (manufacturing and supply chains).',
      'Understand the global scale of ICT greenhouse gas emissions and resource depletion.',
      'Identify the foundational principles of sustainable technology stewardship.'
    ],
    lessonContent: [
      'Information technology has transformed modern civilization, connecting billions of people and streamlining global industries. However, every digital action—from sending an email to training an artificial intelligence model—carries a physical environmental footprint. Green IT, also known as green computing or sustainable IT, is the study and practice of designing, manufacturing, using, and disposing of computers, servers, mobile devices, and software with minimal impact on the environment.',
      'To understand Green IT, we must examine two fundamental categories of emissions: operational emissions and embodied emissions. Operational emissions occur during the active life of a device—primarily the electricity consumed while running programs, powering displays, and keeping computer chips cool. Embodied emissions (or embodied carbon), by contrast, represent all greenhouse gas emissions generated before you even turn a device on: extracting raw minerals, chemical silicon wafer fabrication, international shipping, and retail distribution.',
      'For personal devices like laptops and smartphones, embodied carbon typically represents between 70% and 85% of their total lifetime carbon footprint. This means the most environmentally friendly action you can take with a smartphone or laptop is simply keeping it in working condition for an extra two to three years, rather than upgrading annually.',
      'Green IT approaches this challenge through two primary lenses: "Greening OF IT", which focuses on reducing the direct carbon and resource impact of hardware, data centers, and networks; and "Greening BY IT", which involves using smart software, sensors, and computing systems to help other industries (like transportation, agriculture, and power grids) cut their emissions.'
    ],
    practicalExamples: [
      {
        title: 'Device Lifespan Extension at Scale',
        description: 'A global financial services firm with 40,000 employees extended its laptop refresh cycle from 3 years to 5 years. By providing battery replacements and software tune-ups instead of purchasing 13,000 new laptops each year, the company avoided over 4,200 metric tons of CO2e in hardware manufacturing emissions and saved over $12 million.'
      },
      {
        title: 'Modular Smartphone Architecture (Fairphone)',
        description: 'Dutch company Fairphone designs smartphones with modular components that users can repair at home using an ordinary screwdriver. If a camera lens cracks or a battery degrades, the user replaces only that specific module rather than discarding the entire phone, drastically reducing electronic waste and rare-earth extraction.'
      }
    ],
    activityTask: {
      title: 'Personal Digital Inventory & Reflection',
      instruction: 'Take 5 minutes to list all digital computing devices you personally use (e.g., smartphone, laptop, desktop, tablet, smartwatch). Note how old each device is, whether you have ever repaired a device component, and reflect on what factors influence you to replace a device (battery degradation, cracked screen, or marketing).',
      prompt: 'Write down one practical step you can take to prolong the lifespan of your primary computing device by at least 12 months.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational lecture video is in preparation by our curriculum team. Comprehensive lesson text and interactive activities are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'git-q1-1',
          questionText: 'What is the primary definition of "Green IT"?',
          options: [
            'Painting computer casings green to symbolize eco-friendliness',
            'Designing, manufacturing, using, and disposing of technology with minimal environmental impact',
            'Using computers solely for agricultural and forestry projects',
            'Replacing all desktop computers with paper documentation'
          ],
          correctAnswerIndex: 1,
          explanation: 'Green IT encompasses the entire lifecycle of computing equipment—from sustainable manufacturing and energy-efficient operation to responsible recycling and disposal.'
        },
        {
          id: 'git-q1-2',
          questionText: 'What is "embodied carbon" in a computer or smartphone?',
          options: [
            'The carbon emissions generated during raw material extraction, chip manufacturing, and device assembly',
            'The physical plastic casing around the computer battery',
            'The electricity consumed by the screen while streaming high-definition video',
            'The heat dissipated by the computer cooling fan during gaming'
          ],
          correctAnswerIndex: 0,
          explanation: 'Embodied carbon refers to the greenhouse gas emissions resulting from mining minerals, silicon semiconductor fabrication, transportation, and assembly before the customer ever powers on the device.'
        },
        {
          id: 'git-q1-3',
          questionText: 'For consumer laptops and smartphones, embodied carbon typically accounts for what percentage of total lifetime emissions?',
          options: [
            'Less than 5%',
            'Around 15% to 25%',
            'Between 70% and 85%',
            'Exactly 100%'
          ],
          correctAnswerIndex: 2,
          explanation: 'Because semiconductor cleanroom manufacturing is extraordinarily energy- and chemical-intensive, 70% to 85% of a consumer laptop or phone lifetime emissions occur during manufacturing, making device longevity crucial.'
        },
        {
          id: 'git-q1-4',
          questionText: 'What distinguishes "Greening OF IT" from "Greening BY IT"?',
          options: [
            '"Greening OF IT" makes technology systems sustainable; "Greening BY IT" uses technology to help other sectors reduce emissions',
            '"Greening OF IT" applies only to hardware; "Greening BY IT" applies only to software developers',
            '"Greening OF IT" is mandated by law; "Greening BY IT" is completely optional',
            'There is no difference between the two concepts'
          ],
          correctAnswerIndex: 0,
          explanation: '"Greening OF IT" reduces IT direct footprint (efficient servers, green code, e-waste). "Greening BY IT" leverages digital tools (smart grids, logistics optimization, remote collaboration) to decarbonize broader society.'
        }
      ]
    }
  },
  {
    id: 'git-ch2',
    chapterNumber: 2,
    title: 'Energy-Efficient Computing',
    description: 'Learn how hardware uses electrical power, explore energy rating standards, and master practical power management techniques.',
    durationMinutes: 40,
    learningObjectives: [
      'Understand how CPUs, graphics cards, storage drives, and displays consume electrical energy.',
      'Explain "phantom load" or vampire draw and how to eliminate it in home and office environments.',
      'Identify key environmental certification standards including ENERGY STAR and EPEAT.',
      'Configure automated operating system power management settings for maximum energy savings.'
    ],
    lessonContent: [
      'Every computational operation performed by a processor involves microscopic transistors switching states billions of times per second. This switching requires electrical current, which dissipates as heat. In traditional computing setups, significant amounts of electrical energy are wasted when computers sit completely idle while powered on, or when power supply units convert alternating current (AC) from the wall into direct current (DC) with poor efficiency.',
      'Hardware efficiency has made monumental strides in recent years. Modern Solid State Drives (SSDs) consume up to 70% less power than mechanical hard disk drives with spinning magnetic platters. Contemporary ARM-based microprocessors achieve higher performance per watt than legacy chip architectures by dynamically scaling down voltage and frequency when heavy computation is not needed—a feature called Dynamic Voltage and Frequency Scaling (DVFS).',
      'Another critical factor is "phantom load" or vampire draw. Many monitors, printers, desktop towers, and docking stations draw between 5 and 20 watts of power even when turned "off", so long as they remain plugged into a live wall socket. Across an office of 500 computers, phantom load can quietly waste thousands of kilowatt-hours every year.',
      'When purchasing new hardware, look for international standards: ENERGY STAR certifies that equipment meets stringent operational energy efficiency thresholds. The Electronic Product Environmental Assessment Tool (EPEAT) goes even further, evaluating the full lifecycle: non-toxic materials, repairability, recycled plastics content, and manufacturer take-back availability across Bronze, Silver, and Gold tiers.'
    ],
    practicalExamples: [
      {
        title: '80 PLUS Power Supply Ratings in Workstations',
        description: 'Standard desktop power supplies historically converted wall AC power to internal DC power with only 65% to 70% efficiency, losing the rest as excess heat. Upgrading to an 80 PLUS Platinum certified power supply guarantees at least 90% to 94% conversion efficiency, cutting power waste and reducing internal fan noise.'
      },
      {
        title: 'Automated Centralized Sleep Scheduling in Universities',
        description: 'A state university with 3,200 lab computers installed open-source power management agents to put computers into low-power S3 sleep after 10 minutes of inactivity and execute clean shutdowns at 10 PM. The university reduced computer lab electrical consumption by 48% within the first semester.'
      }
    ],
    activityTask: {
      title: 'Audit Your Display & Sleep Settings',
      instruction: 'Open your operating system settings. On Windows: Settings > System > Power & Battery. On macOS: System Settings > Energy / Lock Screen. On Linux/Chromebook: Settings > Power.',
      prompt: 'Verify your display turn-off timeout is set to 5 minutes or less on battery (10 minutes on plug) and your computer sleep is set to 15 minutes or less. Record your before-and-after settings.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'git-q2-1',
          questionText: 'What does "phantom load" (or vampire draw) refer to in computing equipment?',
          options: [
            'Electricity consumed by devices even when switched off or in standby, simply by being plugged in',
            'Computer memory consumed by background malware and viruses',
            'The maximum processing capability of a central processing unit (CPU)',
            'The cloud storage space consumed by deleted files'
          ],
          correctAnswerIndex: 0,
          explanation: 'Phantom load is the continuous trickle of electrical current drawn by power adapters, standby circuits, and sensors while the appliance is seemingly turned off.'
        },
        {
          id: 'git-q2-2',
          questionText: 'What environmental standard evaluates IT products across their entire lifecycle, including repairability, toxic material avoidance, and recyclability?',
          options: [
            'EPEAT (Electronic Product Environmental Assessment Tool)',
            'ISO 9001 Quality System',
            'Bluetooth 5.2 Specification',
            'PCI-DSS Payment Card Standard'
          ],
          correctAnswerIndex: 0,
          explanation: 'EPEAT is a comprehensive global ecolabel managed by the Global Electronics Council that ranks laptops, phones, servers, and monitors as Bronze, Silver, or Gold.'
        },
        {
          id: 'git-q2-3',
          questionText: 'Compared to traditional spinning hard disk drives (HDDs), Solid State Drives (SSDs):',
          options: [
            'Consume significantly more electrical power due to silicon chips',
            'Consume up to 70% less power and have no moving mechanical parts',
            'Can only operate when plugged into external automotive batteries',
            'Generate far more heat and require liquid nitrogen cooling'
          ],
          correctAnswerIndex: 1,
          explanation: 'SSDs use flash memory cells with no motors or moving platters, reducing energy consumption to 1-2 watts under load compared to 6-8 watts for mechanical HDDs.'
        },
        {
          id: 'git-q2-4',
          questionText: 'Which simple action directly cuts phantom power draw for desktop accessories (printers, speakers, monitors)?',
          options: [
            'Connecting accessories to a switchable smart power strip and turning it off when leaving',
            'Maximizing screen brightness to drain stored power faster',
            'Leaving all applications open in the background overnight',
            'Covering the power cords with thermal insulation blankets'
          ],
          correctAnswerIndex: 0,
          explanation: 'A switchable power strip or smart plug physically severs electrical connectivity from the wall outlet, completely stopping vampire draw.'
        }
      ]
    }
  },
  {
    id: 'git-ch3',
    chapterNumber: 3,
    title: 'Electronic Waste Management',
    description: 'Explore the global e-waste crisis, discover the value of urban mining, and learn certified recycling and disposal best practices.',
    durationMinutes: 45,
    learningObjectives: [
      'Understand the global scale of electronic waste (e-waste) and the hazards of improper disposal.',
      'Identify toxic and hazardous chemicals found in computer circuit boards, batteries, and screens.',
      'Explain the concept of "urban mining" and why recycling circuitry recovers more minerals than mining geological ore.',
      'Recognize certified e-waste standards such as e-Stewards and R2 (Responsible Recycling).'
    ],
    lessonContent: [
      'Electronic waste, commonly known as e-waste, is the fastest-growing solid municipal waste stream on Earth. More than 55 million metric tons of e-waste are discarded globally every year—a mountain of obsolete devices equivalent to throwing away hundreds of commercial airplanes every single day. Shockingly, less than 20% of global e-waste is formally documented, collected, and properly recycled.',
      'When discarded electronics are dumped into ordinary municipal landfills or incinerated, dangerous heavy metals—such as lead in cathode-ray solder, mercury in older backlights, cadmium in legacy batteries, and brominated flame retardants in plastics—can leach into groundwater tables and poison agricultural soil. In developing countries with informal e-waste recycling sectors, workers often burn cables in open pits or use acid baths to extract metals without protective equipment, causing severe neurological and respiratory illness.',
      'Paradoxically, discarded electronics represent an extraordinarily rich repository of valuable resources—a concept known as "urban mining". One metric ton of recycled smartphone circuit boards contains up to 50 times more gold, 10 times more silver, and significantly more copper and rare earth elements than a metric ton of ore blasted from a virgin gold mine.',
      'The solution lies in the circular electronics hierarchy: First, Reduce demand by purchasing durable devices; Second, Reuse and Refurbish through trade-ins and donations; Third, Repair components via Right to Repair legislation; and finally, Recycle through certified facilities holding e-Stewards or R2 (Responsible Recycling) accreditations, ensuring verified worker safety and non-export to informal toxic dumps.'
    ],
    practicalExamples: [
      {
        title: 'Closed-Loop Cobalt & Gold Recovery (Apple & Dell)',
        description: 'Leading hardware manufacturers have introduced automated robotic disassembly lines (like Apple Daisy robot). These robots disassemble iPhones into individual components, recovering 100% recycled cobalt from old batteries and certified recycled gold for logic boards in newly manufactured models.'
      },
      {
        title: 'Municipal Right-to-Repair Legislation',
        description: 'New laws enacted across the European Union and several US states require electronic manufacturers to make original diagnostic software, service schematics, and spare replacement parts accessible to independent repair shops and consumers at fair prices for at least 7 years.'
      }
    ],
    activityTask: {
      title: 'Find Your Local Certified E-Waste Drop-off',
      instruction: 'Locate 2 retired electronic items in your home or workplace (e.g. an old USB cable, dead AA/lithium battery, cracked tablet, obsolete router). Search your city or local government waste department portal to find the nearest certified e-waste drop-off depot.',
      prompt: 'Check whether your local electronics retailer (such as Best Buy, Staples, or a municipal depot) accepts cables and batteries free of charge for certified recycling.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'git-q3-1',
          questionText: 'Why is tossing electronics into regular household trash dangerous for the environment?',
          options: [
            'Toxic substances like lead, mercury, and cadmium can leach into soil and contaminate groundwater',
            'Electronics make ordinary trash bags too heavy for automated collection trucks',
            'Computer software will continue transmitting radio signals from underneath landfills',
            'Trash collectors cannot legally handle items containing plastic'
          ],
          correctAnswerIndex: 0,
          explanation: 'Electronics contain hazardous heavy metals and flame retardants that break down in landfills, leaching into surrounding ecosystems and waterways.'
        },
        {
          id: 'git-q3-2',
          questionText: 'What is "urban mining" in the context of Green IT?',
          options: [
            'Digging gold mines underneath major metropolitan subway systems',
            'Recovering precious metals and rare earth elements from discarded electronics instead of mining raw earth ore',
            'Searching for lost USB flash drives on city sidewalks',
            'Replacing concrete buildings with wooden structures'
          ],
          correctAnswerIndex: 1,
          explanation: 'Urban mining recovers valuable raw materials (gold, silver, copper, palladium) from discarded circuitry, requiring far less energy and water than geological open-pit mining.'
        },
        {
          id: 'git-q3-3',
          questionText: 'What do certifications like "e-Stewards" and "R2" ensure when recycling electronics?',
          options: [
            'That devices are guaranteed to be sold at twice their retail price',
            'That recyclers follow strict environmental, health, data security, and non-toxic handling standards',
            'That recycled computers are painted with certified fluorescent green labels',
            'That all devices are sent overseas to unregulated facilities'
          ],
          correctAnswerIndex: 1,
          explanation: 'e-Stewards and R2 are rigorous third-party auditing certifications that prevent toxic e-waste dumping in developing nations and guarantee worker health and data privacy.'
        },
        {
          id: 'git-q3-4',
          questionText: 'According to the waste reduction hierarchy, what is the most environmentally preferable step before recycling an old laptop?',
          options: [
            'Crushing the laptop and burying the pieces in a backyard compost bin',
            'Repairing, upgrading, or donating the laptop so it continues to be used',
            'Immediately purchasing two new laptops to support the hardware economy',
            'Throwing the laptop into a metal smelting kiln'
          ],
          correctAnswerIndex: 1,
          explanation: 'Reusing, refurbishing, and repairing devices preserves the high embodied carbon already spent in manufacturing, which is always preferable to premature recycling.'
        }
      ]
    }
  },
  {
    id: 'git-ch4',
    chapterNumber: 4,
    title: 'Sustainable Data Centers',
    description: 'Explore the engines of the internet, understand Power Usage Effectiveness (PUE), and examine modern clean cooling innovations.',
    durationMinutes: 45,
    learningObjectives: [
      'Understand how cloud data centers operate and why their energy demand is expanding rapidly.',
      'Calculate and interpret Power Usage Effectiveness (PUE) and Water Usage Effectiveness (WUE).',
      'Describe clean cooling innovations including free-air economization, liquid immersion, and waste heat recovery.',
      'Explain how cloud server virtualization consolidates physical hardware and saves power.'
    ],
    lessonContent: [
      'Every time you stream music, conduct a video call, or run a search query, that digital request travels across fiber-optic cables to a data center. Data centers are specialized, climate-controlled industrial facilities housing thousands of densely packed server computers, data storage arrays, and network switches operating 24 hours a day, 365 days a year. Worldwide, data centers consume approximately 1% to 1.5% of total global electricity—a figure rising with the expansion of cloud services and AI workloads.',
      'In a traditional data center, electricity powers two primary things: the IT equipment itself (servers and storage), and the auxiliary facility infrastructure (chillers, air conditioners, fans, backup generators, and uninterruptible power supplies). Historically, legacy facilities spent almost as much electricity keeping servers cold as the servers consumed doing actual computation.',
      'To measure facility efficiency, engineers created Power Usage Effectiveness (PUE): PUE = Total Facility Energy / IT Equipment Energy. An ideal PUE is 1.0, representing a hypothetical facility where 100% of the energy consumed goes directly into useful computing, with zero energy wasted on cooling or power transformation. While older data centers often had poor PUE ratings between 1.8 and 2.2, modern hyperscale facilities regularly achieve PUE ratings between 1.1 and 1.2.',
      'Sustainable data centers achieve these breakthroughs through innovative cooling engineering: using outside ambient air ("free cooling" economizers) in colder climates, deploying direct-to-chip liquid cooling or submerging servers entirely in non-conductive dielectric fluid, and capturing waste hot water to heat nearby municipal buildings or residential greenhouses.'
    ],
    practicalExamples: [
      {
        title: 'District Heating from Server Waste Heat in Stockholm',
        description: 'Data centers in Stockholm, Sweden participate in the "Stockholm Data Parks" initiative. Hot exhaust water from thousands of cloud servers is channeled directly into the city district heating grid, supplying clean heating and hot water to more than 30,000 residential apartments.'
      },
      {
        title: 'Server Virtualization & Consolidation',
        description: 'Before cloud virtualization, enterprise servers typically ran at only 10% to 15% processor utilization because each server was dedicated to a single application. By running virtual machines (VMs) or lightweight software containers, companies consolidate 20 physical servers onto a single physical machine running at 70% utilization, cutting electricity consumption by over 80%.'
      }
    ],
    activityTask: {
      title: 'PUE Calculation Exercise',
      instruction: 'A regional data center draws 12,000,000 kilowatt-hours (kWh) of total electricity from the grid in a year. Its servers and storage equipment consume 8,000,000 kWh of that total.',
      prompt: 'Calculate the facility PUE (Divide Total Facility Energy by IT Equipment Energy). Is this facility performing better or worse than a benchmark facility with a PUE of 1.2? What could the operators do to improve this ratio?'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'git-q4-1',
          questionText: 'What is the formula for Power Usage Effectiveness (PUE) in data centers?',
          options: [
            'Total Facility Energy / IT Equipment Energy',
            'IT Equipment Energy / Cooling Power',
            'Total Server Count / Building Area in Square Feet',
            'Monthly Electricity Bill / Internet Download Speed'
          ],
          correctAnswerIndex: 0,
          explanation: 'PUE is the ratio of total energy entering the entire data center facility divided by the energy consumed strictly by computing equipment (servers, storage, network).'
        },
        {
          id: 'git-q4-2',
          questionText: 'What is the ideal, theoretically perfect PUE score for a data center?',
          options: [
            '0.0',
            '1.0',
            '10.0',
            '100.0'
          ],
          correctAnswerIndex: 1,
          explanation: 'A PUE of 1.0 means 100% of the energy coming into the building is used directly by the computers, with zero overhead energy spent on cooling or power transformation.'
        },
        {
          id: 'git-q4-3',
          questionText: 'How does server virtualization contribute to data center sustainability?',
          options: [
            'It replaces physical servers with imaginary holographic projections',
            'It allows multiple virtual servers to run on a single physical machine, eliminating redundant idle hardware',
            'It turns off internet access to all users during peak business hours',
            'It forces computers to run at 100 degrees Celsius'
          ],
          correctAnswerIndex: 1,
          explanation: 'Virtualization aggregates workloads onto fewer physical servers operating at high efficiency, reducing the physical server count, power draw, and cooling demand.'
        },
        {
          id: 'git-q4-4',
          questionText: 'How can data center waste heat be used productively instead of being vented into the atmosphere?',
          options: [
            'By channeling hot cooling water into municipal district heating networks for homes and schools',
            'By storing the heat in plastic bags for future emergency power generation',
            'By releasing the heat into glaciers to speed up freshwater runoff',
            'Waste heat cannot be transported or reused in any manner'
          ],
          correctAnswerIndex: 0,
          explanation: 'Modern green data centers integrate heat exchangers that transfer thermal waste heat directly into city heating networks, warming homes and reducing fossil fuel heating consumption.'
        }
      ]
    }
  },
  {
    id: 'git-ch5',
    chapterNumber: 5,
    title: 'Green Software Development',
    description: 'Learn the principles of carbon-efficient coding, master carbon-aware computing, and reduce digital energy waste through software design.',
    durationMinutes: 45,
    learningObjectives: [
      'Understand how software programming decisions directly dictate hardware electricity consumption.',
      'Explain the concept of carbon-aware computing, including temporal shifting and spatial shifting.',
      'Identify energy-wasteful coding anti-patterns such as busy waiting, uncompressed payloads, and redundant database queries.',
      'Apply the Software Carbon Intensity (SCI) metric to measure application efficiency.'
    ],
    lessonContent: [
      'Software does not have an electric plug, and it does not emit greenhouse gases directly from a exhaust pipe. However, software acts as the puppet master of hardware: every line of code instructs physical processor gates to open and close, calls memory buses, and requests data packets across transoceanic telecommunications cables. Inefficient, bloated software forces hardware to work hotter, consume more watts, and triggers premature hardware replacement.',
      'The Green Software Foundation (GSF) established principles to guide developers toward building carbon-efficient applications. A cornerstone metric is the Software Carbon Intensity (SCI) specification, which calculates the carbon emissions of an application per functional unit (such as grams of CO2 per active user session, per API call, or per processed payment).',
      'One of the most powerful paradigms in sustainable engineering is "Carbon-Aware Computing". Electrical grids do not generate electricity with constant carbon intensity: on a sunny, windy afternoon, a grid may be powered by 85% clean renewables, while at night with calm winds, the same grid may rely on coal or gas turbines. Carbon-aware software queries real-time grid carbon APIs (like WattTime or Electricity Maps). It then shifts heavy computational workloads—such as automated data backups, video rendering, or machine learning model training—to the greenest hours of the day (temporal shifting) or to data center regions powered by clean hydro or geothermal energy (spatial shifting).',
      'At the code level, developers reduce energy by avoiding "busy-waiting" polling loops that keep CPU cores awake, compressing images and web assets using modern formats (WebP, AVIF) to eliminate unnecessary network transmission, and leveraging aggressive caching so that repeated data is not recalculated or retransmitted unnecessarily.'
    ],
    practicalExamples: [
      {
        title: 'Carbon-Aware Windows Update Delivery',
        description: 'Modern operating systems now schedule large background system updates and downloads during hours when the local electrical grid has a higher proportion of clean renewable energy, reducing grid strain and associated emissions across hundreds of millions of computers.'
      },
      {
        title: 'Lean Web Asset Optimization',
        description: 'A major news publishing website audited its JavaScript bundles and unoptimized images. By eliminating unused dependencies, adopting system fonts, and serving responsive WebP images, the website reduced its average page size from 4.2 MB to 650 KB. This saved terabytes of network data transfer and dramatically reduced mobile phone battery drain for 15 million daily readers.'
      }
    ],
    activityTask: {
      title: 'Analyze Web Page Weight & Carbon Footprint',
      instruction: 'Visit an open-source website sustainability testing tool (like websitecarbon.com or ecograder.com) and test any public website you frequently visit.',
      prompt: 'Review the estimated carbon emissions per page view and note the main recommendations given (e.g. image optimization, script minimization, green web hosting).'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'git-q5-1',
          questionText: 'What is "carbon-aware computing"?',
          options: [
            'Software that changes its behavior or schedules workloads based on the real-time carbon intensity of the electricity grid',
            'Software that prints carbon accounting reports on recycled paper',
            'Installing solar panels directly onto computer keyboards',
            'Running software only once every calendar month'
          ],
          correctAnswerIndex: 0,
          explanation: 'Carbon-aware software responds to real-time grid signals, doing more compute when clean renewables are abundant and throttling non-essential tasks when the grid relies on fossil fuels.'
        },
        {
          id: 'git-q5-2',
          questionText: 'What is the difference between "temporal shifting" and "spatial shifting" in green computing?',
          options: [
            'Temporal shifting moves tasks to cleaner times; spatial shifting moves tasks to cleaner geographic locations',
            'Temporal shifting speeds up CPU clocks; spatial shifting adds more monitors to a workstation',
            'Temporal shifting deletes old files; spatial shifting compresses new files',
            'There is no distinction between temporal and spatial shifting'
          ],
          correctAnswerIndex: 0,
          explanation: 'Temporal shifting shifts workload in time (e.g. delaying a backup until midday solar peaks). Spatial shifting shifts workload in space (e.g. routing jobs to a cloud region running on geothermal power).'
        },
        {
          id: 'git-q5-3',
          questionText: 'Which coding practice directly reduces user device battery drain and network energy consumption?',
          options: [
            'Compressing images and web bundles to minimize transmitted bytes across cellular networks',
            'Writing endless while-loops that keep CPU cores at 100% capacity',
            'Preventing browsers from caching recurring stylesheet assets',
            'Forcing mobile screens to stay at maximum brightness continuously'
          ],
          correctAnswerIndex: 0,
          explanation: 'Cellular modems and mobile processors consume substantial battery power receiving and decoding data. Smaller payloads reduce radio transmission time and CPU cycles.'
        },
        {
          id: 'git-q5-4',
          questionText: 'What is the purpose of the Software Carbon Intensity (SCI) metric?',
          options: [
            'To calculate the carbon footprint of an application per functional unit (e.g., per user, per API request)',
            'To charge software developers an immediate tax on every line of written code',
            'To determine the weight of a computer monitor in kilograms',
            'To measure how fast software can download movies'
          ],
          correctAnswerIndex: 0,
          explanation: 'The SCI specification measures the carbon rate of a software system normalized against a relevant functional unit, allowing teams to track real carbon efficiency improvements.'
        }
      ]
    }
  },
  {
    id: 'git-ch6',
    chapterNumber: 6,
    title: 'Green IT in Everyday Life',
    description: 'Adopt practical digital sustainability habits for smartphones, streaming, email hygiene, and cloud storage to minimize your personal footprint.',
    durationMinutes: 35,
    learningObjectives: [
      'Understand the hidden environmental impact of everyday digital habits (video streaming, cloud storage, and email).',
      'Explain how display technologies (like OLED and Dark Mode) affect battery and energy consumption.',
      'Learn how cellular data transmission (4G/5G) compares in energy efficiency to home Wi-Fi and fiber.',
      'Formulate a personal and workplace sustainable digital action plan.'
    ],
    lessonContent: [
      'Because digital technology is largely invisible—data packets floating invisibly through airwaves and server racks humming in remote warehouses—it is easy to assume digital actions are completely free of environmental consequences. However, our cumulative daily digital habits collectively add up to millions of kilowatt-hours of electrical demand.',
      'Consider digital video streaming: high-definition (HD) and 4K video require vast quantities of data to be transmitted across cell towers, switches, and edge servers every second. Streaming video over a 4G or 5G cellular network consumes between 4 and 6 times more electrical energy than streaming the exact same video over a home fiber-optic Wi-Fi connection. If you are listening to a podcast or tutorial while working, choosing standard audio or lower video resolution prevents gigabytes of unnecessary data transmission.',
      'Another common source of digital waste is cloud storage hoarding. Keeping 50,000 unread marketing emails, duplicate 4K video clips, and outdated cloud backups requires cloud storage servers to remain perpetually powered and duplicated across multiple redundant data centers. Conducting periodic "digital cleanups"—unsubscribing from marketing newsletters, purging redundant photos, and deleting obsolete backups—frees up data center storage and reduces background sync power.',
      'Finally, display settings make an immediate difference on mobile devices. Modern smartphones and tablets use OLED (Organic Light Emitting Diode) screens, where each pixel produces its own light. When displaying true black in Dark Mode, those pixels are completely shut off, consuming virtually zero power. Verified lab tests demonstrate that using Dark Mode on an OLED phone can save up to 30% to 40% battery life over a full day compared to a bright white background at high brightness levels, prolonging battery health and keeping your device out of the e-waste bin.'
    ],
    practicalExamples: [
      {
        title: 'Dark Mode Battery Longevity on OLED Screens',
        description: 'Researchers tested identical smartphones reading text for 8 hours. The phone using standard bright white background drained 100% of its battery, while the identical phone using system-wide Dark Mode on an OLED display still had 38% battery remaining, saving power and reducing charging cycle degradation.'
      },
      {
        title: 'Corporate Email Attachment Reduction',
        description: 'A national engineering organization instructed staff to replace bulky multi-megabyte PDF and video attachments with secure cloud links. This simple policy eliminated tens of gigabytes of duplicate attachment storage replicated across hundreds of employee email inboxes and backup servers.'
      }
    ],
    activityTask: {
      title: 'Digital Clean-Up & Habit Commitment',
      instruction: 'Spend 10 minutes performing a digital cleanup: 1) Unsubscribe from 5 marketing email newsletters you never read; 2) Delete 20 duplicate photos or downloaded files from your device storage; 3) Check if your primary device has Dark Mode available and enable it.',
      prompt: 'Write down two personal green computing commitments you will practice consistently this month.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video lecture is in preparation. Complete reading materials and practical examples are provided above.'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'git-q6-1',
          questionText: 'How does enabling Dark Mode save battery power on smartphones with OLED screens?',
          options: [
            'Individual OLED pixels producing black are completely turned off, drawing virtually zero electrical power',
            'Dark mode slows down the phone processor speed by 90%',
            'Dark mode disables all telephone calls and mobile text messages',
            'Dark mode reflects external sunlight back into the phone battery'
          ],
          correctAnswerIndex: 0,
          explanation: 'Unlike LCD screens that use a continuous backlight, OLED screens emit light per pixel. Displaying true black shuts off pixels entirely, providing substantial energy savings.'
        },
        {
          id: 'git-q6-2',
          questionText: 'Compared to home fiber-optic Wi-Fi connections, transmitting data over 4G/5G mobile cellular networks typically:',
          options: [
            'Consumes roughly 4 to 6 times more electrical energy per gigabyte transferred',
            'Uses 100% clean solar energy exclusively',
            'Requires zero electrical power from cellular base stations',
            'Consumes exactly the same energy down to the microjoule'
          ],
          correctAnswerIndex: 0,
          explanation: 'Cellular wireless networks require high-power radio frequency transmission between mobile towers and handsets, making Wi-Fi substantially more energy-efficient for large downloads.'
        },
        {
          id: 'git-q6-3',
          questionText: 'Why does hoarding thousands of unread emails and obsolete cloud files contribute to energy consumption?',
          options: [
            'Cloud data centers must keep physical servers and storage drives powered and cooled 24/7 to maintain and replicate that data',
            'The files become physically heavier and weigh down computer desk tables',
            'Old emails cause computer screens to fade and turn brown',
            'Stored files cause computer operating systems to automatically delete passwords'
          ],
          correctAnswerIndex: 0,
          explanation: 'Cloud storage is not ethereal; it lives on real spinning disks and solid-state drives in data centers that draw continuous power, cooling, and automated multi-region replication.'
        },
        {
          id: 'git-q6-4',
          questionText: 'Which everyday digital habit is the most environmentally responsible choice?',
          options: [
            'Prolonging your existing device lifespan, using Wi-Fi for heavy downloads, and enabling power-saving settings',
            'Upgrading to a new flagship smartphone every 10 months regardless of condition',
            'Streaming 4K video continuously in the background while sleeping',
            'Never turning off computer displays or monitors'
          ],
          correctAnswerIndex: 0,
          explanation: 'Extending hardware lifespan, utilizing energy-efficient Wi-Fi, and using smart power management settings minimize both embodied manufacturing carbon and operational electricity consumption.'
        }
      ]
    }
  }
];

export const GREEN_IT_COURSE: LearningPath = {
  id: 'green-it-fundamentals',
  title: 'Green IT Fundamentals',
  tagline: 'Learn how to use, manage, and develop information technology more sustainably.',
  category: 'Green IT',
  level: 'Beginner',
  durationHours: 4,
  moduleCount: 6,
  featured: true,
  isAvailable: true,
  image: '/assets/images/ecomentor_workspace_1791730860421.jpg',
  imageAlt: 'Sustainable IT workstation with energy-efficient hardware and monitoring metrics',
  summary: 'Learn how to use, manage, and develop information technology more sustainably. Master beginner-friendly principles of sustainable computing, energy efficiency, electronic waste reduction, green data centers, and eco-friendly software design.',
  standardAlignment: 'Green Software Foundation (GSF) Principles & EPEAT Standards',
  learningObjectives: [
    'Understand the global environmental impact and carbon footprint of information technology.',
    'Implement practical energy-efficiency practices on computers, monitors, and mobile devices.',
    'Apply proper electronic waste (e-waste) management and circular electronics principles.',
    'Understand sustainable cloud data center architecture and cooling innovations.',
    'Learn foundational green software development practices and carbon-aware computing.',
    'Incorporate sustainable digital habits into everyday personal and workplace technology use.'
  ],
  outcomes: [
    'Audit personal and organizational digital technology footprints',
    'Configure hardware and operating system power-saving policies that eliminate phantom load',
    'Safely route end-of-life electronics to certified e-Stewards and R2 recyclers',
    'Evaluate cloud provider sustainability metrics including PUE and renewable matching',
    'Apply basic carbon-aware temporal and spatial compute shifting concepts'
  ],
  toolsAndStandards: [
    'Green Software Foundation SCI Specification',
    'EPEAT & ENERGY STAR Standards',
    'e-Stewards & R2 E-Waste Guidelines',
    'ISO/IEC 30134 Data Center PUE Metrics'
  ],
  targetRoles: [
    'IT Support Specialists',
    'Software Developers & Tech Leads',
    'Sustainability Coordinators',
    'Students & Technology Learners'
  ],
  learningMaterials: [
    'Green IT Fundamentals Handbook & Reference Guide',
    'Personal Computing Energy Audit Worksheet',
    'Certified E-Waste Recycling Directory Guide',
    'Green Software Foundation Principles Summary'
  ],
  finalAssessmentRequirements: [
    'Complete all 6 structured course chapters',
    'Pass all chapter quizzes with 75% or higher',
    'Score 80% or higher on the comprehensive Green IT Fundamentals assessment'
  ],
  chapters: GREEN_IT_CHAPTERS,
  syllabus: GREEN_IT_CHAPTERS.map(ch => ({
    id: ch.id,
    moduleNumber: ch.chapterNumber,
    title: ch.title,
    description: ch.description,
    durationHours: Math.round(ch.durationMinutes / 60 * 10) / 10,
    practicalProject: ch.activityTask.instruction,
    lessons: [
      {
        id: `${ch.id}-l1`,
        title: ch.title,
        durationMinutes: ch.durationMinutes,
        format: 'Lecture',
        videoStatus: ch.video?.status === 'verified' ? 'available' : 'in_production',
        videoUrl: ch.video?.url,
        content: {
          summary: ch.description,
          keyStandards: ['GSF Principles', 'EPEAT Standards'],
          technicalPoints: ch.learningObjectives,
          practicalExercise: ch.activityTask.instruction
        }
      }
    ]
  }))
};
