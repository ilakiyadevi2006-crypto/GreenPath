import { CourseChapter } from '../types';

export const ENERGY_EFFICIENCY_CHAPTERS: CourseChapter[] = [
  {
    id: 'ee-ch1',
    chapterNumber: 1,
    title: 'Chapter 1: Energy Auditing Protocols & Baseline Regression Analysis',
    description: 'Master standard energy auditing procedures under ASHRAE Standard 211, ISO 50002, weather normalization, and baseline regression modeling.',
    durationMinutes: 45,
    learningObjectives: [
      'Distinguish between ASHRAE Level 1, Level 2, and Level 3 energy audit scopes',
      'Establish an Energy Baseline (EnB) and Energy Performance Indicators (EnPIs) under ISO 50006',
      'Normalize utility energy consumption using Heating and Cooling Degree Days (HDD/CDD)',
      'Construct a multivariable linear regression model to detect operational drift and verify savings'
    ],
    lessonContent: [
      'Energy efficiency is widely recognized as the "first fuel" of the global clean energy transition because the cleanest and cheapest kilowatt-hour is the one that is never generated. However, achieving substantial, verified energy reductions requires moving beyond ad-hoc equipment replacements to systematic energy engineering audits.',
      'The international benchmark for commercial and industrial energy assessments is ASHRAE Standard 211 (Standard for Commercial Building Energy Audits). It defines three distinct audit scopes: Level 1 (Walk-Through Analysis), which screens monthly utility bills and identifies low-cost operational improvements; Level 2 (Energy Survey and Engineering Analysis), which conducts detailed breakdowns of end-use loads, evaluates equipment efficiencies, and delivers lifecycle cost analyses for energy conservation measures (ECMs); and Level 3 (Detailed Analysis of Capital-Intensive Modifications, or "Investment-Grade Audit"), which incorporates high-frequency data logging, rigorous dynamic simulations, and financial risk modeling suitable for securing external project financing.',
      'A critical prerequisite for any energy efficiency project is establishing an accurate Energy Baseline (EnB). Raw historical utility bills are heavily influenced by external factors, primarily weather fluctuations and facility production throughput. If a winter is unusually mild, a facility might consume 15% less natural gas without implementing any efficiency improvements. Conversely, a surge in manufacturing output will increase electricity consumption even if motors are operating with peak efficiency.',
      'To isolate genuine efficiency gains, engineers use Heating Degree Days (HDD) and Cooling Degree Days (CDD) alongside multivariable linear regression modeling. Under ISO 50006, an effective regression model must demonstrate an R-squared value (R² > 0.75) and statistically valid p-values. This mathematical model provides an expected consumption formula against which actual performance is measured, enabling cumulative sum (CUSUM) tracking to detect operational anomalies in real time.'
    ],
    practicalExamples: [
      {
        title: 'ASHRAE Level 3 Healthcare Facility Central Plant Overhaul',
        description: 'A 600-bed regional medical center executed an ASHRAE Level 3 investment-grade audit on its central chilled water and steam plant. Dynamic energy modeling revealed that 30-year-old chillers were operating at a low coefficient of performance (COP 3.2). Replacing the central chillers with magnetic-bearing variable-speed chillers (COP 6.8) cut annual hospital utility spend by $420,000 with a 3.4-year simple payback.'
      },
      {
        title: 'Weather-Normalized Baseline Regression for Commercial Real Estate',
        description: 'A commercial real estate portfolio comprising 12 office towers established weather-normalized regression baselines using local meteorological station degree days. The normalized models revealed that weekend setback scheduling in 4 towers had failed, causing HVAC systems to run continuously. Correcting the programming saved 85,000 kWh per month with zero capital expenditure.'
      }
    ],
    activityTask: {
      title: 'Facility Baseline Degree Day Normalization',
      instruction: 'Review an electricity or natural gas utility bill for a building or home across three different months (e.g., January, April, and July). Calculate or observe how consumption fluctuates with outdoor temperatures. Write down how establishing a Heating Degree Day (HDD) or Cooling Degree Day (CDD) baseline prevents misinterpreting seasonal weather changes as true energy savings or waste.',
      prompt: 'What pattern did you observe between weather changes and utility usage, and why is normalization essential?'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational lecture on ASHRAE 211 energy auditing in preparation'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'ee-ch1-q1',
          questionText: 'Which ASHRAE audit level is classified as an "Investment-Grade Energy Audit" providing detailed engineering simulations and financial risk modeling suitable for capital financing?',
          options: [
            'ASHRAE Level 3 (Detailed Analysis of Capital-Intensive Modifications)',
            'ASHRAE Level 1 (Walk-Through Screening)',
            'ASHRAE Level 2 (Energy Survey and Engineering Analysis)',
            'Preliminary Utility Benchmarking'
          ],
          correctAnswerIndex: 0,
          explanation: 'ASHRAE Level 3 builds upon Level 2 with high-resolution field data logging, dynamic simulation modeling, and investment-grade financial engineering.'
        },
        {
          id: 'ee-ch1-q2',
          questionText: 'Why must raw utility energy consumption be normalized using Degree Days (HDD/CDD) or production data?',
          options: [
            'To ensure that changes in weather or factory throughput are not mistaken for genuine efficiency gains or losses',
            'Because utility companies will not accept payments without degree days',
            'To convert kilowatt-hours into monetary dollars automatically',
            'Because energy cannot be measured in physical units'
          ],
          correctAnswerIndex: 0,
          explanation: 'Normalization decouples weather and production variables from baseline models, verifying true energy performance changes.'
        },
        {
          id: 'ee-ch1-q3',
          questionText: 'Under ISO 50001 and ISO 50006, what does "EnPI" stand for?',
          options: [
            'Energy Performance Indicator',
            'Environmental Protection Index',
            'Electrical Power Input',
            'Engineering Protocol Interface'
          ],
          correctAnswerIndex: 0,
          explanation: 'Energy Performance Indicators (EnPIs) are quantifiable metrics used to track, evaluate, and report energy performance improvements.'
        }
      ]
    }
  },
  {
    id: 'ee-ch2',
    chapterNumber: 2,
    title: 'Chapter 2: Industrial Motor Systems & Variable Frequency Drives (VFD)',
    description: 'Understand electric motor efficiency classes (IE1 to IE4), the pump and fan Affinity Laws, and why reducing speed yields exponential energy savings.',
    durationMinutes: 50,
    learningObjectives: [
      'Examine the global energy footprint of electric motor-driven systems in industry',
      'Master IEC 60034-30-1 motor efficiency classes (IE1 Standard to IE4 Super Premium)',
      'Apply the Affinity Laws for centrifugal pumps and fans (Power varies with the cube of speed: P ∝ N³)',
      'Calculate electrical energy savings and financial payback from VFD retrofits versus mechanical throttling'
    ],
    lessonContent: [
      'Electric motors are the unsung workhorses of the modern global economy. Across industry and commercial facilities, electric motor systems—powering pumps, fans, compressors, conveyors, and chillers—consume nearly 70% of all industrial electricity and over 45% of all global electrical generation. Consequently, optimizing motor systems represents the single largest target for industrial decarbonization.',
      'The International Electrotechnical Commission (IEC) standard 60034-30-1 classifies motor efficiency into four standardized international tiers: IE1 (Standard Efficiency), IE2 (High Efficiency), IE3 (Premium Efficiency), and IE4 (Super Premium Efficiency). While premium IE3 and IE4 motors carry a higher upfront purchase price, the purchase price represents only about 2% to 3% of an industrial motor\'s total lifetime cost. Over 95% of a motor\'s lifecycle cost is the electricity it consumes during operation. Upgrading from an aging IE1 motor to an IE4 synchronous reluctance or permanent magnet motor typically pays for itself within months.',
      'However, the greatest energy savings in motor systems come from speed regulation rather than motor efficiency alone. In traditional systems, pumps and fans operate at a constant fixed speed (e.g., 1800 or 3600 RPM). When the facility requires lower flow, operators mechanically throttle flow using valves or dampers—a method akin to driving a car with the gas pedal pressed to the floor while regulating speed by pressing the brake.',
      'Centrifugal equipment obeys the physical Affinity Laws: Flow (Q) is proportional to speed (N); Head or Pressure (H) is proportional to speed squared (N²); and Power (P) is proportional to speed cubed (P ∝ N³). Because power varies with the cube of speed, reducing motor speed by just 20% (operating at 80% speed) reduces electrical power draw by nearly 50% (0.8³ = 0.512). Installing a Variable Frequency Drive (VFD) to modulate motor frequency eliminates throttling losses and delivers dramatic energy reductions.'
    ],
    practicalExamples: [
      {
        title: 'Municipal Water Treatment Facility VFD Pump Retrofit',
        description: 'A municipal water utility operated four 150-horsepower raw water intake pumps with mechanical throttling valves. Retrofitting the pumps with variable frequency drives and digital pressure feedback loops allowed the utility to slow pump RPM during off-peak night hours. The retrofit reduced plant electrical draw by 41%, saving 620,000 kWh and $68,000 annually.'
      },
      {
        title: 'Cleanroom HVAC Recirculation Fan Speed Modulation',
        description: 'A semiconductor manufacturing cleanroom operated 24 recirculation air handling units at 100% constant speed. By upgrading motors to IE4 Super Premium and installing VFDs calibrated to particulate sensors, air velocity was trimmed by 15% during non-production periods, reducing fan power consumption by 38%.'
      }
    ],
    activityTask: {
      title: 'Affinity Law Cube Rule Calculation',
      instruction: 'An industrial ventilation fan motor consumes 50 kW of electrical power when operating at 100% full speed (1800 RPM). Using the Affinity Law (P2 = P1 * (N2 / N1)³), calculate the expected power draw if the fan speed is reduced by 20% to 80% speed (1440 RPM). What is the total kilowatt reduction?',
      prompt: 'Show your calculation for expected power draw at 80% speed and state the total kilowatts saved.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational video on pump affinity laws and VFD physics in preparation'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'ee-ch2-q1',
          questionText: 'According to the centrifugal Affinity Laws, how does power consumption (P) relate to shaft rotational speed (N)?',
          options: [
            'Power is proportional to the cube of speed (P ∝ N³)',
            'Power is directly linear with speed (P ∝ N)',
            'Power is proportional to the square of speed (P ∝ N²)',
            'Power is completely independent of shaft speed'
          ],
          correctAnswerIndex: 0,
          explanation: 'The cubic relationship (P ∝ N³) means small reductions in motor speed yield substantial exponential drops in electrical power consumption.'
        },
        {
          id: 'ee-ch2-q2',
          questionText: 'Over the entire operating lifespan of an industrial electric motor, what percentage of its total lifecycle cost is represented by electricity consumption?',
          options: [
            'Over 90% to 95% of total lifecycle cost',
            'Less than 5%',
            'Approximately 25%',
            'Exactly 50%'
          ],
          correctAnswerIndex: 0,
          explanation: 'Electricity makes up 90-95%+ of a motor lifetime cost, while initial purchase cost accounts for only 2-3%, making efficiency upgrades highly profitable.'
        },
        {
          id: 'ee-ch2-q3',
          questionText: 'Why is using a Variable Frequency Drive (VFD) far more energy-efficient than using a mechanical throttling valve or damper?',
          options: [
            'The VFD slows the motor to meet actual load requirements rather than dissipating wasted energy across a mechanical restriction',
            'VFDs convert alternating current into batteries for later use',
            'Throttling valves consume electricity directly from the wall outlet',
            'VFDs eliminate all friction in mechanical bearings'
          ],
          correctAnswerIndex: 0,
          explanation: 'A VFD adjusts motor speed so only the exact flow and pressure needed are produced, preventing the severe pressure drop losses of throttling.'
        }
      ]
    }
  },
  {
    id: 'ee-ch3',
    chapterNumber: 3,
    title: 'Chapter 3: Steam Systems, Boilers, and Waste Heat Recovery',
    description: 'Analyze industrial boiler combustion efficiency, excess air tuning, failed steam trap losses, and economizer waste heat recovery heat exchangers.',
    durationMinutes: 45,
    learningObjectives: [
      'Examine industrial steam generation and understand heat distribution thermodynamics',
      'Optimize boiler combustion efficiency using stack gas O2 and temperature monitoring',
      'Identify the energy and monetary losses of failed open steam traps',
      'Size and evaluate waste heat recovery systems including flue gas economizers and blowdown heat exchangers'
    ],
    lessonContent: [
      'Steam is the primary thermal energy carrier across chemical manufacturing, paper mills, food processing, oil refining, and district heating systems. Over 30% of all energy used in industrial manufacturing is dedicated to generating steam. Because steam holds vast amounts of latent heat of vaporization, it is an exceptionally effective heat transfer medium, but poorly maintained steam systems suffer massive thermal losses.',
      'Boiler efficiency is governed by the combustion process. Complete combustion of fuel requires mixing fuel (typically natural gas, biomass, or fuel oil) with oxygen. If there is insufficient air, fuel passes unburned into the flue gas as carbon monoxide and soot, wasting energy and creating hazardous emissions. To prevent incomplete combustion, boilers operate with "excess air". However, feeding too much excess air dilutes the flame and carries valuable heat out through the exhaust stack.',
      'By installing continuous zirconium oxide oxygen trim sensors in the flue stack, automated damper actuators maintain excess air within an optimal 10% to 15% range (corresponding to 2% to 3% stack O2). Every 1% reduction in excess oxygen increases overall boiler efficiency by approximately 0.5% to 1%. Furthermore, every 40°F (22°C) reduction in flue gas exit temperature increases boiler efficiency by 1%.',
      'Another common source of catastrophic energy loss is failed steam traps. Steam traps are autonomous valves designed to discharge liquid condensate and non-condensable gases while preventing live steam from escaping. In an unmonitored plant, 15% to 20% of all steam traps typically fail in an open position. A single failed-open 1/2-inch steam trap at 100 psig steam pressure blows over 500,000 pounds of live steam annually, wasting thousands of dollars in fuel and water treatment chemicals.'
    ],
    practicalExamples: [
      {
        title: 'Food Processing Plant Condensing Flue Gas Economizer',
        description: 'A commercial dairy processing facility operating two 600-horsepower steam boilers installed condensing flue gas economizers on the exhaust stacks. By using waste flue heat to preheat cold boiler makeup water from 50°F to 160°F, the plant cut boiler natural gas consumption by 8.5%, saving $140,000 annually with an 18-month payback.'
      },
      {
        title: 'Automated Acoustic Ultrasonic Steam Trap Monitoring',
        description: 'A petrochemical refinery installed wireless acoustic sensors on 450 critical steam traps. The system immediately flagged 38 traps that failed open during winter operations. Rapid replacement prevented over 14 million pounds of live steam loss and 1,200 metric tons of CO2 emissions.'
      }
    ],
    activityTask: {
      title: 'Failed Steam Trap Energy Loss Estimation',
      instruction: 'A facility has a steam trap with a 1/4-inch orifice operating continuously at 100 psig line pressure. When failed open, this trap blows approximately 180 pounds of steam per hour. If steam generation costs $12.00 per 1,000 lbs of steam, calculate the annual monetary loss of leaving this trap unrepaired for one year (8,760 hours).',
      prompt: 'Show your calculation for total annual steam lost (lbs) and the resulting annual financial cost.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational lecture on boiler efficiency and steam traps in preparation'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'ee-ch3-q1',
          questionText: 'What is the primary function of a steam trap in an industrial steam distribution loop?',
          options: [
            'To discharge condensed liquid water and non-condensable air while trapping valuable live steam inside the system',
            'To increase the pressure of the steam using electric heating coils',
            'To convert high-pressure steam into cold drinking water',
            'To inject chemical fragrances into the exhaust stack'
          ],
          correctAnswerIndex: 0,
          explanation: 'Steam traps must hold live steam within the heat exchanger while automatically draining condensed liquid water to maintain thermal efficiency.'
        },
        {
          id: 'ee-ch3-q2',
          questionText: 'What happens to boiler combustion efficiency when excessive excess air is introduced into the burner?',
          options: [
            'Excessive air cools the combustion flame and carries valuable heat out through the exhaust flue stack, lowering efficiency',
            'It doubles the boiler heat output without using extra fuel',
            'It causes the boiler water to freeze instantly',
            'It eliminates all thermal losses completely'
          ],
          correctAnswerIndex: 0,
          explanation: 'Too much excess air dilutes combustion temperatures and wastes heat by carrying it directly into the atmosphere through the chimney.'
        },
        {
          id: 'ee-ch3-q3',
          questionText: 'How does an exhaust flue gas economizer recover waste thermal energy?',
          options: [
            'It captures sensible heat from hot exhaust gases and transfers it to preheat incoming boiler feedwater',
            'It filters particulate matter into solid bricks for construction',
            'It uses photovoltaic panels to convert stack heat directly into AC electricity',
            'It condenses steam into compressed air'
          ],
          correctAnswerIndex: 0,
          explanation: 'Flue gas economizers extract thermal energy from hot exhaust gases, preheating boiler feedwater so less fuel is required to produce steam.'
        }
      ]
    }
  },
  {
    id: 'ee-ch4',
    chapterNumber: 4,
    title: 'Chapter 4: Compressed Air Optimization & System Auditing',
    description: 'Audit compressed air systems, eliminate artificial demand, detect ultrasound leaks, and understand why air is the most expensive industrial utility.',
    durationMinutes: 45,
    learningObjectives: [
      'Understand specific power (kW/100 cfm) and recognize compressed air thermodynamic efficiency limits',
      'Calculate the cost of artificial demand and quantify pressure drop reduction benefits',
      'Execute an ultrasonic acoustic leak survey and prioritize repair maintenance workflows',
      'Evaluate compressed air storage receiver sizing and variable-speed compressor control'
    ],
    lessonContent: [
      'Compressed air is often referred to as the "fourth utility" in manufacturing (alongside electricity, gas, and water). It powers pneumatic cylinders, robotic pick-and-place actuators, spray painting, and packaging equipment. However, compressed air is simultaneously the most thermodynamically inefficient and expensive utility in modern industry.',
      'To generate useful mechanical work from compressed air, an industrial air compressor draws substantial electrical power. Thermodynamics dictates that approximately 85% to 90% of the electrical energy fed into an air compressor is converted immediately into low-grade reject heat, with only 10% to 15% remaining as usable pneumatic energy. As a rule of thumb, it requires roughly 7 to 8 horsepower of electrical energy to deliver 1 horsepower of useful pneumatic mechanical work.',
      'Because compressed air is so costly, system inefficiencies compound rapidly. The three primary targets of compressed air auditing are: (1) System leaks: In an unmanaged plant, 20% to 30% of total compressor output is lost through loose fittings, corroded hoses, and worn disconnects. A single 1/4-inch leak at 100 psig wastes over $3,500 in electricity annually; (2) Artificial demand: Over-pressurizing the distribution header causes equipment to consume excess air without performing more work. As a standard engineering rule, every 2 psi (0.14 bar) reduction in operating pressure saves approximately 1% in compressor electrical power; and (3) Inappropriate uses: Using expensive compressed air for personal cooling, sweeping floors, or open cabinet agitation should be replaced with low-pressure blowers or mechanical brushes.',
      'Executing a comprehensive leak survey using directional ultrasonic acoustic detectors enables plant engineers to pinpoint leaks even in noisy operating environments. Tagging, logging, and repairing identified leaks delivers immediate energy reductions and prevents the unnecessary capital expenditure of buying larger compressors.'
    ],
    practicalExamples: [
      {
        title: 'Aerospace Assembly Plant Ultrasonic Leak Detection Program',
        description: 'An aerospace manufacturing plant operating four 100-horsepower rotary screw compressors conducted a plant-wide ultrasonic leak audit. The survey detected 114 separate leaks across pneumatic tooling lines. Repairing the leaks reduced baseload compressed air demand by 340 cfm, allowing the plant to shut down one 100-hp compressor entirely and saving $48,000 annually.'
      },
      {
        title: 'Pressure Reduction & Dedicated Intermediate Storage Receivers',
        description: 'An automotive stamping plant operated its entire distribution loop at 115 psig because one robotic clamping cell experienced intermittent pressure drops. Engineers installed a dedicated 500-gallon storage receiver at the clamping cell, allowing the central header pressure to be lowered from 115 psig to 95 psig. The 20 psi drop yielded a 10% direct energy reduction across the entire compressor room.'
      }
    ],
    activityTask: {
      title: 'Compressed Air Pressure Drop Energy Calculation',
      instruction: 'A manufacturing facility compressor room operates at 110 psig header pressure, consuming 250,000 kWh annually. Using the engineering rule of thumb (every 2 psi reduction saves 1% of compressor energy), calculate the expected percentage energy reduction and annual kWh saved if header pressure is safely reduced by 10 psi to 100 psig.',
      prompt: 'State the percentage energy savings and calculate the total kilowatt-hours saved annually.'
    },
    video: {
      status: 'in_preparation',
      sourceNote: 'Verified educational lecture on compressed air system auditing in preparation'
    },
    quiz: {
      passingScorePercent: 75,
      questions: [
        {
          id: 'ee-ch4-q1',
          questionText: 'Roughly what percentage of electrical energy fed into an industrial air compressor is converted into reject heat rather than usable pneumatic energy?',
          options: [
            'Approximately 85% to 90%',
            'Less than 10%',
            'Zero percent (compressors are 100% efficient)',
            'Exactly 50%'
          ],
          correctAnswerIndex: 0,
          explanation: 'Thermodynamics makes compressed air thermally inefficient: 85-90% of electricity input becomes heat, requiring heat recovery and aggressive leak reduction.'
        },
        {
          id: 'ee-ch4-q2',
          questionText: 'What is the standard engineering rule of thumb for compressor power savings when reducing header distribution pressure?',
          options: [
            'Every 2 psi reduction in operating pressure saves approximately 1% in compressor electrical power',
            'Pressure changes have zero impact on motor electrical consumption',
            'Every 1 psi reduction saves 50% of electrical power',
            'Reducing pressure always increases electricity consumption'
          ],
          correctAnswerIndex: 0,
          explanation: 'Reducing discharge pressure reduces the work performed by the compressor by roughly 1% for every 2 psi drop.'
        },
        {
          id: 'ee-ch4-q3',
          questionText: 'What instrument is primarily used during plant audits to pinpoint air leaks in loud industrial environments without halting production?',
          options: [
            'Directional ultrasonic acoustic detector',
            'A household thermometer',
            'A magnetic compass',
            'A visual magnifying glass'
          ],
          correctAnswerIndex: 0,
          explanation: 'Ultrasonic acoustic detectors capture the high-frequency turbulence (around 40 kHz) created by escaping compressed air, ignoring lower-frequency factory noise.'
        }
      ]
    }
  }
];
