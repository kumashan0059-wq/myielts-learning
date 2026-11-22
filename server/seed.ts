import { db } from './db.ts';
import type {
  ListeningSectionData,
  ReadingPassageData,
  WritingTaskData,
  SpeakingData,
  MockTestPayload,
} from '../shared/mockTestTypes.ts';

function buildListeningSections(): ListeningSectionData[] {
  return [
    {
      id: 'l-sec-1',
      sectionNumber: 1,
      title: 'Section 1: Northbridge Sports & Aquatics Membership',
      context: 'A prospective member phones a community sports centre reception desk to inquire about joining and booking a fitness assessment.',
      instructions: 'Questions 1–10. Complete the form and answer the multiple-choice questions. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for gap-fill items.',
      durationSeconds: 320,
      transcript: `Receptionist: Good morning, Northbridge Sports and Aquatics Centre, Clara speaking. How can I help you today?
Caller: Hi Clara, I recently moved to the area and I'd like to sign up for an off-peak membership.
Receptionist: Certainly! Let me take a few details to set up your profile. Could I have your full name, please?
Caller: Yes, it's Daniel Hargreaves. That's H-A-R-G-R-E-A-V-E-S.
Receptionist: Thank you, Daniel. And what is your current residential street address?
Caller: I'm at 48 Willowbank Avenue, Flat 3.
Receptionist: Willowbank Avenue, got it. What postcode is that?
Caller: NW4 8LP.
Receptionist: Great. And a contact mobile number?
Caller: It's 07742 819 305.
Receptionist: Now, for off-peak access, you can use the gym and 50-metre pool between 6:00 a.m. and 4:00 p.m. on weekdays, plus all day Sunday. The monthly fee is 38 pounds, with a one-off induction charge of 15 pounds.
Caller: That sounds reasonable. Do I get access to the sauna and steam room?
Receptionist: Those are included in our Platinum tier, whereas off-peak covers the swimming pool, weights studio, and cardio floor. However, you do receive two complimentary squash court bookings each month.
Caller: Brilliant! Can I book my mandatory gym induction for this Thursday morning?
Receptionist: Let me check. Thursday at 9:30 a.m. is booked out, and 11:00 a.m. is reserved for a school group. I can fit you in at 10:15 a.m. with Coach Marcus.
Caller: 10:15 a.m. works well. Should I bring anything specific?
Receptionist: Just clean indoor trainers, a refillable water bottle, and a small padlock for the changing-room lockers—towels are provided at the desk.
Caller: Perfect. Oh, one last question—is there free bicycle parking outside?
Receptionist: Yes, we have a covered bike rack beside the East Entrance, which is monitored by CCTV. Car parking is free for the first two hours if you validate your ticket at reception.`,
      questions: [
        {
          id: 'lq1',
          number: 1,
          type: 'form_completion',
          contextLabel: 'Applicant Surname',
          prompt: 'Daniel ________',
          acceptedAnswers: ['Hargreaves'],
          explanation: 'The caller spells his surname as H-A-R-G-R-E-A-V-E-S.',
        },
        {
          id: 'lq2',
          number: 2,
          type: 'form_completion',
          contextLabel: 'Street Address',
          prompt: '48 ________ Avenue, Flat 3',
          acceptedAnswers: ['Willowbank'],
          explanation: 'He states he lives at 48 Willowbank Avenue, Flat 3.',
        },
        {
          id: 'lq3',
          number: 3,
          type: 'form_completion',
          contextLabel: 'Postcode',
          prompt: 'Postcode: ________',
          acceptedAnswers: ['NW4 8LP', 'NW48LP'],
          explanation: 'His postcode is NW4 8LP.',
        },
        {
          id: 'lq4',
          number: 4,
          type: 'form_completion',
          contextLabel: 'Monthly Membership Fee',
          prompt: '£________ per month (Off-peak)',
          acceptedAnswers: ['38', '£38'],
          explanation: 'The receptionist states the monthly fee is 38 pounds.',
        },
        {
          id: 'lq5',
          number: 5,
          type: 'form_completion',
          contextLabel: 'Induction Charge',
          prompt: 'One-off fee of £________',
          acceptedAnswers: ['15', '£15'],
          explanation: 'There is a one-off induction charge of 15 pounds.',
        },
        {
          id: 'lq6',
          number: 6,
          type: 'mcq',
          prompt: 'Which facility is NOT included in the off-peak membership?',
          options: [
            'A. The 50-metre swimming pool',
            'B. The sauna and steam room',
            'C. Two monthly squash court bookings',
          ],
          acceptedAnswers: ['B', 'B. The sauna and steam room', 'The sauna and steam room'],
          explanation: 'The sauna and steam room are only included in the Platinum tier.',
        },
        {
          id: 'lq7',
          number: 7,
          type: 'mcq',
          prompt: 'What time is Daniel’s gym induction scheduled for Thursday?',
          options: ['A. 9:30 a.m.', 'B. 10:15 a.m.', 'C. 11:00 a.m.'],
          acceptedAnswers: ['B', 'B. 10:15 a.m.', '10:15 a.m.'],
          explanation: '9:30 is booked and 11:00 is reserved for a school group; 10:15 a.m. is available.',
        },
        {
          id: 'lq8',
          number: 8,
          type: 'gap_fill',
          prompt: 'Members must bring their own small ________ for the changing-room lockers.',
          acceptedAnswers: ['padlock'],
          explanation: 'The receptionist advises bringing a small padlock; towels are provided.',
        },
        {
          id: 'lq9',
          number: 9,
          type: 'gap_fill',
          prompt: 'Covered bicycle parking is located beside the ________ Entrance.',
          acceptedAnswers: ['East'],
          explanation: 'The covered bike rack is beside the East Entrance.',
        },
        {
          id: 'lq10',
          number: 10,
          type: 'gap_fill',
          prompt: 'Car parking is complimentary for up to ________ hours with ticket validation.',
          acceptedAnswers: ['2', 'two'],
          explanation: 'Parking is free for the first two hours when validated at reception.',
        },
      ],
    },
    {
      id: 'l-sec-2',
      sectionNumber: 2,
      title: 'Section 2: Greenway Botanical Gardens Audio Tour',
      context: 'A volunteer guide welcomes visitors to the newly restored Greenway Botanical Gardens and explains the zones and seasonal events.',
      instructions: 'Questions 11–20. Choose the correct letter A, B, or C, or match each garden zone to its key feature.',
      durationSeconds: 340,
      transcript: `Welcome everyone to Greenway Botanical Gardens! I'm Fiona, head volunteer here, and before you head out along the cedar boardwalks, let me give you a quick orientation of our newly refurbished grounds.
The gardens originally opened in 1924 as a private medicinal herb estate before being gifted to the city council in 1968. Following a three-year conservation grant, we reopened the Glass Conservatory last spring with over 400 tropical orchid species.
Let's look at the four main zones on your map. First, directly north of the Visitor Pavilion is the Alpine Rockery, where you'll find hardy mountain flora fed by a recirculating glacial stream. Because the limestone paths can become slippery after morning mist, we ask visitors to wear sturdy footwear there.
Second, to the east lies the Sensory Courtyard. This area was co-designed with local occupational therapists and features raised cedar beds filled with aromatic lavender, rosemary, and textured lamb's ear plants—perfect for tactile exploration.
Third, down by the lower lake is the Heritage Orchard, which preserves 35 rare regional apple and pear varieties. Our cider-pressing demonstration takes place there every Saturday afternoon in October.
Finally, on the western ridge stands the Canopy Walkway, an elevated steel-and-timber bridge suspended twelve metres above the woodland floor. Please note that the Canopy Walkway closes whenever wind speeds exceed 45 kilometres per hour.
For refreshments, the Terrace Café serves seasonal vegetarian lunches until 3:30 p.m., though hot drinks and pastries remain available until 5:00 p.m. If you're hoping to join our twilight photography walk next Friday, advance booking online is essential as group numbers are capped at 18 participants.`,
      questions: [
        {
          id: 'lq11',
          number: 11,
          type: 'mcq',
          prompt: 'When were the Greenway Botanical Gardens gifted to the city council?',
          options: ['A. 1924', 'B. 1968', 'C. Last spring'],
          acceptedAnswers: ['B', 'B. 1968', '1968'],
          explanation: 'The gardens opened privately in 1924 and were gifted to the city council in 1968.',
        },
        {
          id: 'lq12',
          number: 12,
          type: 'mcq',
          prompt: 'What is housed inside the refurbished Glass Conservatory?',
          options: [
            'A. Medicinal coastal ferns',
            'B. Over 400 tropical orchid species',
            'C. Rare apple cultivars',
          ],
          acceptedAnswers: ['B', 'B. Over 400 tropical orchid species', 'Over 400 tropical orchid species'],
          explanation: 'The Glass Conservatory reopened with over 400 tropical orchid species.',
        },
        {
          id: 'lq13',
          number: 13,
          type: 'matching',
          prompt: 'Match Zone: Alpine Rockery',
          options: [
            'A. Elevated bridge twelve metres above woodland',
            'B. Limestone paths and recirculating stream',
            'C. Raised beds with aromatic herbs',
            'D. Rare regional apple and pear varieties',
          ],
          acceptedAnswers: ['B', 'B. Limestone paths and recirculating stream'],
          explanation: 'The Alpine Rockery features hardy mountain flora, limestone paths, and a recirculating stream.',
        },
        {
          id: 'lq14',
          number: 14,
          type: 'matching',
          prompt: 'Match Zone: Sensory Courtyard',
          options: [
            'A. Elevated bridge twelve metres above woodland',
            'B. Limestone paths and recirculating stream',
            'C. Raised beds with aromatic herbs',
            'D. Rare regional apple and pear varieties',
          ],
          acceptedAnswers: ['C', 'C. Raised beds with aromatic herbs'],
          explanation: 'The Sensory Courtyard features raised cedar beds with lavender, rosemary, and lamb’s ear.',
        },
        {
          id: 'lq15',
          number: 15,
          type: 'matching',
          prompt: 'Match Zone: Heritage Orchard',
          options: [
            'A. Elevated bridge twelve metres above woodland',
            'B. Limestone paths and recirculating stream',
            'C. Raised beds with aromatic herbs',
            'D. Rare regional apple and pear varieties',
          ],
          acceptedAnswers: ['D', 'D. Rare regional apple and pear varieties'],
          explanation: 'The Heritage Orchard preserves 35 rare regional apple and pear varieties.',
        },
        {
          id: 'lq16',
          number: 16,
          type: 'matching',
          prompt: 'Match Zone: Canopy Walkway',
          options: [
            'A. Elevated bridge twelve metres above woodland',
            'B. Limestone paths and recirculating stream',
            'C. Raised beds with aromatic herbs',
            'D. Rare regional apple and pear varieties',
          ],
          acceptedAnswers: ['A', 'A. Elevated bridge twelve metres above woodland'],
          explanation: 'The Canopy Walkway is suspended twelve metres above the woodland floor.',
        },
        {
          id: 'lq17',
          number: 17,
          type: 'gap_fill',
          prompt: 'The Canopy Walkway closes if wind speeds exceed ________ km/h.',
          acceptedAnswers: ['45'],
          explanation: 'It closes whenever wind speeds exceed 45 kilometres per hour.',
        },
        {
          id: 'lq18',
          number: 18,
          type: 'gap_fill',
          prompt: 'Seasonal vegetarian lunches at the Terrace Café are served until ________ p.m.',
          acceptedAnswers: ['3:30', '3.30'],
          explanation: 'Lunches are served until 3:30 p.m.; hot drinks continue until 5:00 p.m.',
        },
        {
          id: 'lq19',
          number: 19,
          type: 'mcq',
          prompt: 'Why must visitors book the twilight photography walk in advance?',
          options: [
            'A. Camera tripods require inspection',
            'B. Group size is limited to 18 people',
            'C. It takes place outside normal opening hours only for members',
          ],
          acceptedAnswers: ['B', 'B. Group size is limited to 18 people'],
          explanation: 'Advance booking is essential because group numbers are capped at 18 participants.',
        },
        {
          id: 'lq20',
          number: 20,
          type: 'gap_fill',
          prompt: 'Cider-pressing demonstrations are held every Saturday afternoon during ________.',
          acceptedAnswers: ['October'],
          explanation: 'The cider-pressing demonstration takes place every Saturday afternoon in October.',
        },
      ],
    },
    {
      id: 'l-sec-3',
      sectionNumber: 3,
      title: 'Section 3: University Urban Microclimate Research Project',
      context: 'Two environmental science undergraduates, Maya and Liam, discuss their field research proposal with their tutor.',
      instructions: 'Questions 21–30. Answer the multiple-choice, matching, and summary completion questions.',
      durationSeconds: 360,
      transcript: `Maya: Liam, have you reviewed Dr. Patel's comments on our urban heat island proposal?
Liam: Yes! She liked our idea of comparing surface temperatures across three neighbourhoods, though she thought measuring twelve sites was unrealistic within a six-week semester window.
Maya: True. Cutting down to six representative junctions—two asphalt plazas, two tree-lined avenues, and two pocket parks—gives us cleaner calibration anyway.
Liam: Right. What about the sensor equipment? I thought we'd mount infrared thermometers onto campus bicycles, but Dr. Patel warned that cycling vibration skews the optical readings.
Maya: So we're going with stationary weather-shielded data loggers strapped to lampposts at a standard height of 2.5 metres. That removes movement error and keeps the instruments safe from tampering.
Liam: What surprised me in the pilot data was how quickly shaded brick alleys cooled after sunset compared to open concrete squares. The difference hit nearly 4.2 degrees Celsius by 9:00 p.m.!
Maya: Exactly—and remember Dr. Patel suggested interviewing local shopkeepers about afternoon footfall rather than relying solely on pedestrian counters.
Liam: I was hesitant about interviews at first because transcribing takes ages, but short five-question structured surveys will tell us whether heat actually changes how long shoppers linger.
Maya: Let's divide the workload: you handle the GIS spatial mapping and sensor calibration, while I oversee ethical clearance and coordinate the survey team.
Liam: Deal. Our draft methodology chapter is due on November 14th, which gives us ten days after data collection wraps up.`,
      questions: [
        {
          id: 'lq21',
          number: 21,
          type: 'mcq',
          prompt: 'Why did the students reduce their study from twelve sites to six?',
          options: [
            'A. Twelve sensors were too expensive to rent',
            'B. Six weeks was insufficient for twelve sites',
            'C. Council permits covered only six junctions',
          ],
          acceptedAnswers: ['B', 'B. Six weeks was insufficient for twelve sites'],
          explanation: 'Dr. Patel noted measuring twelve sites was unrealistic within a six-week semester window.',
        },
        {
          id: 'lq22',
          number: 22,
          type: 'mcq',
          prompt: 'Why did they reject mounting infrared thermometers on bicycles?',
          options: [
            'A. Battery life was too short',
            'B. Cycling vibration distorts optical readings',
            'C. Traffic regulations prohibit handlebar attachments',
          ],
          acceptedAnswers: ['B', 'B. Cycling vibration distorts optical readings'],
          explanation: 'Dr. Patel warned that cycling vibration skews the optical readings.',
        },
        {
          id: 'lq23',
          number: 23,
          type: 'gap_fill',
          prompt: 'Data loggers will be attached to lampposts at a height of ________ metres.',
          acceptedAnswers: ['2.5'],
          explanation: 'They mount the data loggers at a standard height of 2.5 metres.',
        },
        {
          id: 'lq24',
          number: 24,
          type: 'gap_fill',
          prompt: 'Pilot readings showed shaded brick alleys were up to ________ °C cooler than concrete squares at 9:00 p.m.',
          acceptedAnswers: ['4.2'],
          explanation: 'The difference hit nearly 4.2 degrees Celsius by 9:00 p.m.',
        },
        {
          id: 'lq25',
          number: 25,
          type: 'mcq',
          prompt: 'How did Liam’s attitude toward interviewing shopkeepers change?',
          options: [
            'A. He switched to purely automated counters',
            'B. He agreed short structured surveys were manageable and insightful',
            'C. He asked Dr. Patel to conduct the interviews',
          ],
          acceptedAnswers: ['B', 'B. He agreed short structured surveys were manageable and insightful'],
          explanation: 'Though initially hesitant about transcription, he agreed five-question structured surveys show how heat affects lingering.',
        },
        {
          id: 'lq26',
          number: 26,
          type: 'matching',
          prompt: 'Who is responsible for: GIS spatial mapping & sensor calibration?',
          options: ['A. Maya', 'B. Liam', 'C. Dr. Patel'],
          acceptedAnswers: ['B', 'B. Liam', 'Liam'],
          explanation: 'Maya explicitly assigns GIS spatial mapping and sensor calibration to Liam.',
        },
        {
          id: 'lq27',
          number: 27,
          type: 'matching',
          prompt: 'Who is responsible for: Ethical clearance & survey team coordination?',
          options: ['A. Maya', 'B. Liam', 'C. Dr. Patel'],
          acceptedAnswers: ['A', 'A. Maya', 'Maya'],
          explanation: 'Maya oversees ethical clearance and coordinates the survey team.',
        },
        {
          id: 'lq28',
          number: 28,
          type: 'gap_fill',
          prompt: 'Each of the three site categories—plazas, avenues, and ________ parks—has two junctions.',
          acceptedAnswers: ['pocket'],
          explanation: 'The six junctions consist of two asphalt plazas, two tree-lined avenues, and two pocket parks.',
        },
        {
          id: 'lq29',
          number: 29,
          type: 'gap_fill',
          prompt: 'The draft methodology chapter is due on November ________.',
          acceptedAnswers: ['14', '14th'],
          explanation: 'Liam confirms the draft methodology chapter is due on November 14th.',
        },
        {
          id: 'lq30',
          number: 30,
          type: 'mcq',
          prompt: 'How many days do they have between finishing data collection and the methodology deadline?',
          options: ['A. 6 days', 'B. 10 days', 'C. 14 days'],
          acceptedAnswers: ['B', 'B. 10 days', '10 days'],
          explanation: 'Liam says it gives them ten days after data collection wraps up.',
        },
      ],
    },
    {
      id: 'l-sec-4',
      sectionNumber: 4,
      title: 'Section 4: Lecture on Deep-Sea Bioluminescence',
      context: 'An academic marine biology lecture examining how deep-ocean organisms generate and use light.',
      instructions: 'Questions 31–40. Complete the lecture notes below. Write ONE WORD ONLY for each gap-fill answer.',
      durationSeconds: 380,
      transcript: `Today we turn to one of the ocean's most widespread yet least understood phenomena: bioluminescence—the biochemical production of light by living organisms. Below roughly 200 metres, in what oceanographers call the mesopelagic or twilight zone, sunlight fades rapidly, yet over 75 percent of marine species found there are capable of emitting their own light.
Chemically, bioluminescence relies on a reaction between a light-emitting molecule known as luciferin and an enzyme called luciferase, triggered in the presence of oxygen. Unlike an incandescent bulb, which wastes most of its energy as heat, this reaction is nearly 100 percent efficient, which is why scientists refer to it as cold light.
Organisms deploy bioluminescence for three primary ecological functions: defence, predation, and communication. In terms of defence, certain deep-sea squid eject a luminous cloud of mucus to startle predators, giving the squid precious seconds to jet away. Meanwhile, hatchetfish use a strategy called counter-illumination: photophores along their bellies match the faint blue glow of sunlight filtering down from above, effectively erasing their silhouette when viewed from below.
For predation, the female anglerfish famously dangles a glowing lure—actually colonised by symbiotic bacteria—just above her jaws to attract curious crustaceans. A rarer tactic is employed by the stoplight loosejaw fish, which emits far-red light that most prey species cannot detect, acting like a private night-vision spotlight.
Beyond ecology, marine bioluminescence has transformed modern medicine. Green fluorescent protein, first isolated from a Pacific jellyfish in the 1960s, now serves as a biological marker allowing geneticists to track protein movement inside living cells without harming the tissue.`,
      questions: [
        {
          id: 'lq31',
          number: 31,
          type: 'gap_fill',
          prompt: 'The mesopelagic zone begins below approximately 200 metres and is also called the ________ zone.',
          acceptedAnswers: ['twilight'],
          explanation: 'The lecturer states it is called the mesopelagic or twilight zone.',
        },
        {
          id: 'lq32',
          number: 32,
          type: 'gap_fill',
          prompt: 'More than ________ percent of species in this deep zone produce light.',
          acceptedAnswers: ['75', 'seventy-five'],
          explanation: 'Over 75 percent of marine species found there emit their own light.',
        },
        {
          id: 'lq33',
          number: 33,
          type: 'gap_fill',
          prompt: 'The chemical reaction combines luciferin, the enzyme luciferase, and ________.',
          acceptedAnswers: ['oxygen'],
          explanation: 'The reaction is triggered in the presence of oxygen.',
        },
        {
          id: 'lq34',
          number: 34,
          type: 'gap_fill',
          prompt: 'Because almost no energy becomes heat, scientists term this ________ light.',
          acceptedAnswers: ['cold'],
          explanation: 'It is nearly 100 percent efficient and referred to as cold light.',
        },
        {
          id: 'lq35',
          number: 35,
          type: 'gap_fill',
          prompt: 'Some deep-sea squid release a glowing cloud of ________ to distract predators.',
          acceptedAnswers: ['mucus'],
          explanation: 'Certain deep-sea squid eject a luminous cloud of mucus.',
        },
        {
          id: 'lq36',
          number: 36,
          type: 'gap_fill',
          prompt: 'Hatchetfish hide their ________ from predators below using counter-illumination.',
          acceptedAnswers: ['silhouette'],
          explanation: 'Counter-illumination erases their silhouette when viewed from below.',
        },
        {
          id: 'lq37',
          number: 37,
          type: 'gap_fill',
          prompt: 'The anglerfish’s glowing lure is powered by symbiotic ________.',
          acceptedAnswers: ['bacteria'],
          explanation: 'The lure is colonised by symbiotic bacteria.',
        },
        {
          id: 'lq38',
          number: 38,
          type: 'mcq',
          prompt: 'What makes the stoplight loosejaw fish’s hunting beam unusual?',
          options: [
            'A. It pulses louder than sound waves',
            'B. It emits far-red light invisible to most prey',
            'C. It changes colour every three seconds',
          ],
          acceptedAnswers: ['B', 'B. It emits far-red light invisible to most prey'],
          explanation: 'It emits far-red light that most prey species cannot detect.',
        },
        {
          id: 'lq39',
          number: 39,
          type: 'gap_fill',
          prompt: 'Green fluorescent protein was originally isolated from a Pacific ________.',
          acceptedAnswers: ['jellyfish'],
          explanation: 'It was first isolated from a Pacific jellyfish in the 1960s.',
        },
        {
          id: 'lq40',
          number: 40,
          type: 'gap_fill',
          prompt: 'In medicine, the protein acts as a biological ________ inside living cells.',
          acceptedAnswers: ['marker'],
          explanation: 'It serves as a biological marker allowing geneticists to track protein movement.',
        },
      ],
    },
  ];
}

function buildAcademicReadingPassages(): ReadingPassageData[] {
  return [
    {
      id: 'ar-p1',
      passageNumber: 1,
      title: 'The Architecture of Wind: Passive Cooling in Arid Heritage Cities',
      subtitle: 'Reading Passage 1 · Questions 1–13',
      instructions: 'Read the passage and answer Questions 1–13 (True / False / Not Given and Sentence Completion).',
      paragraphs: [
        {
          label: 'A',
          text: 'Long before mechanical air conditioning reshaped modern skylines, builders across arid regions of Iran, Oman, and North Africa perfected passive cooling techniques that maintained comfortable indoor temperatures even when desert afternoons exceeded 45°C. Central to this vernacular engineering is the badgir, or windcatcher—a masonry tower rising above flat rooftops with vertical vents oriented toward prevailing breezes.',
        },
        {
          label: 'B',
          text: 'A windcatcher operates through two complementary physical principles: pressure differentials and thermal buoyancy. During the day, cooler upper-air breezes enter the windward shafts and are channelled downward into living quarters, displacing warm indoor air out through shaded courtyard windows. At night, when desert air cools rapidly, thick mud-brick walls radiate stored daytime heat, drawing cool night air upward through the tower in a reverse chimney effect.',
        },
        {
          label: 'C',
          text: 'In Yazd, Iran, engineers paired windcatchers with subterranean water canals known as qanats. Incoming air descending the tower shaft passed directly over an underground pool fed by mountain snowmelt. Evaporative cooling dropped indoor air temperatures by as much as 12°C while simultaneously raising dry desert humidity to comfortable levels—requiring zero electricity or moving mechanical parts.',
        },
        {
          label: 'D',
          text: 'However, mid-twentieth-century urban planning largely sidelined traditional earth architecture in favour of imported concrete frames and glass curtain walls. While glazed towers projected civic prestige, they trapped solar radiation and depended entirely on energy-intensive chillers. Surveys conducted in Gulf municipalities in 2018 revealed that residential cooling alone accounted for over 65 percent of peak summer electricity demand.',
        },
        {
          label: 'E',
          text: 'Today, contemporary architects are adapting ancient windcatcher geometry using computational fluid dynamics. At Masdar City and several university campuses in Jordan, automated louvres atop hybrid wind towers adjust angles dynamically according to real-time wind sensors, combining ancestral thermal wisdom with modern smart-building controls.',
        },
      ],
      questions: [
        {
          id: 'arq1',
          number: 1,
          type: 'tfng',
          prompt: 'Traditional windcatchers were originally invented in North Africa before spreading to Iran.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['NOT GIVEN'],
          explanation: 'Paragraph A mentions builders across Iran, Oman, and North Africa used them, but never states where they were originally invented.',
        },
        {
          id: 'arq2',
          number: 2,
          type: 'tfng',
          prompt: 'Windcatchers reverse their airflow direction during the night.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['TRUE'],
          explanation: 'Paragraph B explains that at night, heat radiating from mud-brick walls draws cool air upward in a reverse chimney effect.',
        },
        {
          id: 'arq3',
          number: 3,
          type: 'tfng',
          prompt: 'Qanat water systems relied on electric pumps to circulate mountain snowmelt.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['FALSE'],
          explanation: 'Paragraph C states the qanat evaporative system required zero electricity or moving mechanical parts.',
        },
        {
          id: 'arq4',
          number: 4,
          type: 'tfng',
          prompt: 'Combining windcatchers with qanats made dry indoor desert air slightly more humid.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['TRUE'],
          explanation: 'Paragraph C notes evaporative cooling dropped temperatures while raising dry desert humidity to comfortable levels.',
        },
        {
          id: 'arq5',
          number: 5,
          type: 'tfng',
          prompt: 'Imported concrete and glass buildings reduced summer electricity consumption in Gulf cities.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['FALSE'],
          explanation: 'Paragraph D explains glazed towers trapped heat and relied on energy-intensive chillers, pushing cooling above 65% of peak demand.',
        },
        {
          id: 'arq6',
          number: 6,
          type: 'tfng',
          prompt: 'In 2018, Jordan banned glass curtain walls on new university campuses.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['NOT GIVEN'],
          explanation: 'Paragraph E mentions hybrid wind towers on Jordanian campuses, with no mention of any legal ban.',
        },
        {
          id: 'arq7',
          number: 7,
          type: 'tfng',
          prompt: 'Modern hybrid wind towers use real-time sensors to reposition rooftop louvres.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['TRUE'],
          explanation: 'Paragraph E confirms automated louvres adjust angles dynamically according to real-time wind sensors.',
        },
        {
          id: 'arq8',
          number: 8,
          type: 'sentence_completion',
          prompt: 'A badgir is a ________ tower built above flat rooftops to capture prevailing winds.',
          acceptedAnswers: ['masonry'],
          explanation: 'Paragraph A describes it as a masonry tower rising above flat rooftops.',
        },
        {
          id: 'arq9',
          number: 9,
          type: 'sentence_completion',
          prompt: 'Thick ________ walls store heat during the day and release it after sunset.',
          acceptedAnswers: ['mud-brick', 'mud brick'],
          explanation: 'Paragraph B states thick mud-brick walls radiate stored daytime heat at night.',
        },
        {
          id: 'arq10',
          number: 10,
          type: 'sentence_completion',
          prompt: 'In Yazd, air flowing down the shaft passed over water sourced from mountain ________.',
          acceptedAnswers: ['snowmelt'],
          explanation: 'Paragraph C refers to an underground pool fed by mountain snowmelt.',
        },
        {
          id: 'arq11',
          number: 11,
          type: 'sentence_completion',
          prompt: 'Evaporative cooling could lower indoor temperatures by up to ________ °C.',
          acceptedAnswers: ['12'],
          explanation: 'Paragraph C mentions dropping indoor air temperatures by as much as 12°C.',
        },
        {
          id: 'arq12',
          number: 12,
          type: 'sentence_completion',
          prompt: 'In 2018 Gulf surveys, cooling accounted for more than ________ percent of peak electricity use.',
          acceptedAnswers: ['65'],
          explanation: 'Paragraph D states cooling accounted for over 65 percent of peak summer electricity demand.',
        },
        {
          id: 'arq13',
          number: 13,
          type: 'sentence_completion',
          prompt: 'Contemporary engineers model windcatcher airflow using computational ________ dynamics.',
          acceptedAnswers: ['fluid'],
          explanation: 'Paragraph E refers to computational fluid dynamics.',
        },
      ],
    },
    {
      id: 'ar-p2',
      passageNumber: 2,
      title: 'How Urban Trees Remember Drought: Botanical Memory & Resilience',
      subtitle: 'Reading Passage 2 · Questions 14–26',
      instructions: 'Match the correct heading to each paragraph (14–18) and answer Questions 19–26.',
      paragraphs: [
        {
          label: 'A',
          text: 'For decades, forestry researchers assumed that trees react passively to each passing season, expanding rings in wet years and slowing growth in dry ones without retaining any lasting physiological imprint of past stress. Recent molecular and hydraulic studies are overturning that assumption, revealing that trees encode measurable memories of prior droughts.',
        },
        {
          label: 'B',
          text: 'The mechanism begins in a tree’s vascular plumbing. When soil moisture plunges, tension inside xylem water columns rises sharply, risking microscopic air bubbles—known as embolisms—that block sap transport. Trees that survive an initial moderate drought often remodel new wood cells with narrower vessel diameters and thicker pit membranes, making their future plumbing markedly more resistant to bubble collapse.',
        },
        {
          label: 'C',
          text: 'Beyond structural wood changes, scientists at the Swiss Federal Institute for Forest Research discovered epigenetic chemical tags attached to DNA inside drought-exposed spruce seedlings. Without altering the genetic code itself, these methylation tags kept stress-response genes primed so that when a second dry spell struck two summers later, primed trees closed leaf pores 30 percent faster to conserve moisture.',
        },
        {
          label: 'D',
          text: 'Yet stress memory carries a biological price tag. Keeping defensive chemistry active and building denser, narrower xylem vessels diverts carbohydrates away from canopy growth and root expansion. If repeated severe droughts arrive too rapidly—leaving less than two wet recovery seasons between shocks—carbon reserves deplete and mortality risk surges sharply.',
        },
        {
          label: 'E',
          text: 'City arborists are already applying these insights to urban streetscapes. Rather than pampering young street saplings with constant automated drip irrigation, progressive municipal nurseries in Melbourne and Vienna now apply controlled "hardening" cycles—brief, supervised water deficits that train young trees for hotter, drier city summers.',
        },
      ],
      headingOptions: [
        'i. The metabolic cost of staying prepared for drought',
        'ii. Training young urban trees through controlled water stress',
        'iii. Challenging an outdated view of passive plant response',
        'iv. Genetic mutation caused by extreme soil salinity',
        'v. Structural reinforcement inside water-transport tissues',
        'vi. Epigenetic chemical switches that accelerate water conservation',
      ],
      questions: [
        {
          id: 'arq14',
          number: 14,
          type: 'matching_headings',
          prompt: 'Choose the best heading for Paragraph A',
          options: [
            'i. The metabolic cost of staying prepared for drought',
            'ii. Training young urban trees through controlled water stress',
            'iii. Challenging an outdated view of passive plant response',
            'iv. Genetic mutation caused by extreme soil salinity',
            'v. Structural reinforcement inside water-transport tissues',
            'vi. Epigenetic chemical switches that accelerate water conservation',
          ],
          acceptedAnswers: ['iii', 'iii. Challenging an outdated view of passive plant response'],
          explanation: 'Paragraph A contrasts the older assumption of passive reaction with new evidence of drought memory.',
        },
        {
          id: 'arq15',
          number: 15,
          type: 'matching_headings',
          prompt: 'Choose the best heading for Paragraph B',
          options: [
            'i. The metabolic cost of staying prepared for drought',
            'ii. Training young urban trees through controlled water stress',
            'iii. Challenging an outdated view of passive plant response',
            'iv. Genetic mutation caused by extreme soil salinity',
            'v. Structural reinforcement inside water-transport tissues',
            'vi. Epigenetic chemical switches that accelerate water conservation',
          ],
          acceptedAnswers: ['v', 'v. Structural reinforcement inside water-transport tissues'],
          explanation: 'Paragraph B explains narrower xylem vessels and thicker pit membranes in water-transport plumbing.',
        },
        {
          id: 'arq16',
          number: 16,
          type: 'matching_headings',
          prompt: 'Choose the best heading for Paragraph C',
          options: [
            'i. The metabolic cost of staying prepared for drought',
            'ii. Training young urban trees through controlled water stress',
            'iii. Challenging an outdated view of passive plant response',
            'iv. Genetic mutation caused by extreme soil salinity',
            'v. Structural reinforcement inside water-transport tissues',
            'vi. Epigenetic chemical switches that accelerate water conservation',
          ],
          acceptedAnswers: ['vi', 'vi. Epigenetic chemical switches that accelerate water conservation'],
          explanation: 'Paragraph C focuses on epigenetic methylation tags that help trees close leaf pores 30% faster.',
        },
        {
          id: 'arq17',
          number: 17,
          type: 'matching_headings',
          prompt: 'Choose the best heading for Paragraph D',
          options: [
            'i. The metabolic cost of staying prepared for drought',
            'ii. Training young urban trees through controlled water stress',
            'iii. Challenging an outdated view of passive plant response',
            'iv. Genetic mutation caused by extreme soil salinity',
            'v. Structural reinforcement inside water-transport tissues',
            'vi. Epigenetic chemical switches that accelerate water conservation',
          ],
          acceptedAnswers: ['i', 'i. The metabolic cost of staying prepared for drought'],
          explanation: 'Paragraph D outlines the biological price tag and carbohydrate diversion of stress memory.',
        },
        {
          id: 'arq18',
          number: 18,
          type: 'matching_headings',
          prompt: 'Choose the best heading for Paragraph E',
          options: [
            'i. The metabolic cost of staying prepared for drought',
            'ii. Training young urban trees through controlled water stress',
            'iii. Challenging an outdated view of passive plant response',
            'iv. Genetic mutation caused by extreme soil salinity',
            'v. Structural reinforcement inside water-transport tissues',
            'vi. Epigenetic chemical switches that accelerate water conservation',
          ],
          acceptedAnswers: ['ii', 'ii. Training young urban trees through controlled water stress'],
          explanation: 'Paragraph E describes nursery hardening cycles using controlled water deficits in Melbourne and Vienna.',
        },
        {
          id: 'arq19',
          number: 19,
          type: 'mcq',
          prompt: 'What happens when microscopic air bubbles form inside xylem columns?',
          options: [
            'A. Leaf pores permanently widen',
            'B. Sap transport is obstructed',
            'C. Root sugars multiply rapidly',
          ],
          acceptedAnswers: ['B', 'B. Sap transport is obstructed'],
          explanation: 'Paragraph B explains that embolisms block sap transport.',
        },
        {
          id: 'arq20',
          number: 20,
          type: 'mcq',
          prompt: 'How do epigenetic methylation tags affect drought-primed spruce seedlings?',
          options: [
            'A. They rewrite the tree’s core DNA sequence',
            'B. They trigger faster leaf pore closure in later droughts',
            'C. They eliminate the need for recovery seasons',
          ],
          acceptedAnswers: ['B', 'B. They trigger faster leaf pore closure in later droughts'],
          explanation: 'Paragraph C states primed trees closed leaf pores 30 percent faster without altering genetic code.',
        },
        {
          id: 'arq21',
          number: 21,
          type: 'tfng',
          prompt: 'Building denser xylem vessels leaves fewer carbohydrates for canopy growth.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['TRUE'],
          explanation: 'Paragraph D states building denser, narrower vessels diverts carbohydrates away from canopy growth.',
        },
        {
          id: 'arq22',
          number: 22,
          type: 'tfng',
          prompt: 'Trees usually need at least two wet recovery seasons between severe droughts to avoid reserve depletion.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['TRUE'],
          explanation: 'Paragraph D notes that leaving less than two wet recovery seasons causes carbon reserves to deplete.',
        },
        {
          id: 'arq23',
          number: 23,
          type: 'tfng',
          prompt: 'Melbourne spent more money on street tree nurseries than Vienna.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['NOT GIVEN'],
          explanation: 'Paragraph E mentions both cities apply hardening cycles, without comparing spending.',
        },
        {
          id: 'arq24',
          number: 24,
          type: 'sentence_completion',
          prompt: 'Microscopic air bubbles blocking water transport in xylem are called ________.',
          acceptedAnswers: ['embolisms'],
          explanation: 'Paragraph B defines these air bubbles as embolisms.',
        },
        {
          id: 'arq25',
          number: 25,
          type: 'sentence_completion',
          prompt: 'Primed spruce seedlings closed leaf pores ________ percent faster during a second drought.',
          acceptedAnswers: ['30'],
          explanation: 'Paragraph C states they closed leaf pores 30 percent faster.',
        },
        {
          id: 'arq26',
          number: 26,
          type: 'sentence_completion',
          prompt: 'Municipal nurseries use supervised water deficits known as ________ cycles.',
          acceptedAnswers: ['hardening'],
          explanation: 'Paragraph E refers to controlled "hardening" cycles.',
        },
      ],
    },
    {
      id: 'ar-p3',
      passageNumber: 3,
      title: 'The Attention Economy and the Return of Slow Reading',
      subtitle: 'Reading Passage 3 · Questions 27–40',
      instructions: 'Answer Questions 27–40 (Yes / No / Not Given, Multiple Choice, and Summary Completion).',
      paragraphs: [
        {
          label: 'A',
          text: 'Across university humanities and STEM departments alike, instructors report a subtle yet persistent shift: students who can rapidly synthesize short digital briefings often struggle to sustain concentration across dense, forty-page academic monographs. Cognitive neuroscientist Maryanne Wolf describes this phenomenon as "skimming transfer"—our brains adopt the rapid, F-shaped scanning habits rewarded by newsfeeds and inadvertently apply them to complex texts.',
        },
        {
          label: 'B',
          text: 'Crucially, reading is not an innate human instinct like spoken language; the brain possesses no dedicated reading gene. Instead, literacy repurposes neural circuits originally evolved for object recognition and spoken phonology. Because this "reading circuit" is plastic, how we read—whether scrolling fragmented alerts or immersing in sustained linear prose—actively reshapes which cognitive pathways strengthen or atrophy.',
        },
        {
          label: 'C',
          text: 'Critics of digital reading sometimes romanticize print as inherently superior, yet laboratory experiments paint a more nuanced picture. When comprehension tests measure surface fact recall on short passages, screen readers perform virtually identically to print readers. Divergences emerge primarily when texts exceed 1,500 words and require tracking subtle causal chains, counterarguments, or shifting narrative perspectives.',
        },
        {
          label: 'D',
          text: 'In response, several higher-education programs have introduced "slow reading" seminars—not as nostalgic rejection of technology, but as deliberate cognitive cross-training. Students annotate printed essays by hand, pause after every section to summarize arguments from memory, and compare interpretations in distraction-free classrooms with devices stored away.',
        },
        {
          label: 'E',
          text: 'The encouraging takeaway from longitudinal studies is that deep-reading stamina behaves much like cardiovascular fitness: habits eroded by fractured multitasking can be rebuilt within weeks of structured, uninterrupted practice. Mastering both rapid digital triage and patient analytical immersion may prove to be the defining intellectual skill of the twenty-first century.',
        },
      ],
      questions: [
        {
          id: 'arq27',
          number: 27,
          type: 'ynng',
          prompt: 'University instructors notice that students struggle mostly with short digital briefings.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          acceptedAnswers: ['NO'],
          explanation: 'Paragraph A says students rapidly synthesize short digital briefings but struggle with dense monographs.',
        },
        {
          id: 'arq28',
          number: 28,
          type: 'ynng',
          prompt: 'Humans are born with a specific genetic circuit designed exclusively for reading.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          acceptedAnswers: ['NO'],
          explanation: 'Paragraph B states the brain has no dedicated reading gene; literacy repurposes other neural circuits.',
        },
        {
          id: 'arq29',
          number: 29,
          type: 'ynng',
          prompt: 'Maryanne Wolf believes smartphones should be banned from university libraries.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          acceptedAnswers: ['NOT GIVEN'],
          explanation: 'Wolf’s concept of skimming transfer is cited in Paragraph A, but no library ban proposal is mentioned.',
        },
        {
          id: 'arq30',
          number: 30,
          type: 'ynng',
          prompt: 'On brief factual texts, screen reading yields virtually the same comprehension scores as print.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          acceptedAnswers: ['YES'],
          explanation: 'Paragraph C confirms screen readers perform virtually identically to print readers on short fact recall.',
        },
        {
          id: 'arq31',
          number: 31,
          type: 'ynng',
          prompt: 'Slow reading seminars aim to reject modern digital technology altogether.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          acceptedAnswers: ['NO'],
          explanation: 'Paragraph D explicitly states they are not a nostalgic rejection of technology, but cognitive cross-training.',
        },
        {
          id: 'arq32',
          number: 32,
          type: 'ynng',
          prompt: 'Lost deep-reading stamina can be restored relatively quickly through focused practice.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          acceptedAnswers: ['YES'],
          explanation: 'Paragraph E notes habits can be rebuilt within weeks of structured, uninterrupted practice.',
        },
        {
          id: 'arq33',
          number: 33,
          type: 'mcq',
          prompt: 'What does "skimming transfer" refer to in Paragraph A?',
          options: [
            'A. Copying lecture notes into digital spreadsheets',
            'B. Applying fast feed-scanning habits to demanding texts',
            'C. Switching between multiple academic majors',
          ],
          acceptedAnswers: ['B', 'B. Applying fast feed-scanning habits to demanding texts'],
          explanation: 'Paragraph A defines skimming transfer as applying rapid F-shaped newsfeed scanning habits to complex texts.',
        },
        {
          id: 'arq34',
          number: 34,
          type: 'mcq',
          prompt: 'According to Paragraph C, when do print and screen comprehension begin to diverge?',
          options: [
            'A. When texts exceed 1,500 words and involve complex reasoning',
            'B. When texts include technical tables and footnotes',
            'C. When readers are tested in noisy environments',
          ],
          acceptedAnswers: ['A', 'A. When texts exceed 1,500 words and involve complex reasoning'],
          explanation: 'Paragraph C notes divergences emerge primarily when texts exceed 1,500 words and require tracking causal chains or counterarguments.',
        },
        {
          id: 'arq35',
          number: 35,
          type: 'mcq',
          prompt: 'What is the writer’s overall conclusion in Paragraph E?',
          options: [
            'A. Print books will completely replace digital tablets in academia',
            'B. Combining fast digital scanning with deep analytical reading is ideal',
            'C. Deep reading is impossible for generations raised on multitasking',
          ],
          acceptedAnswers: ['B', 'B. Combining fast digital scanning with deep analytical reading is ideal'],
          explanation: 'The final sentence highlights mastering both rapid digital triage and patient analytical immersion.',
        },
        {
          id: 'arq36',
          number: 36,
          type: 'sentence_completion',
          prompt: 'Newsfeeds encourage an ________-shaped scanning pattern.',
          acceptedAnswers: ['F'],
          explanation: 'Paragraph A mentions rapid, F-shaped scanning habits.',
        },
        {
          id: 'arq37',
          number: 37,
          type: 'sentence_completion',
          prompt: 'Reading builds upon brain networks originally evolved for object recognition and spoken ________.',
          acceptedAnswers: ['phonology'],
          explanation: 'Paragraph B states literacy repurposes circuits evolved for object recognition and spoken phonology.',
        },
        {
          id: 'arq38',
          number: 38,
          type: 'sentence_completion',
          prompt: 'In slow reading seminars, students ________ printed essays manually.',
          acceptedAnswers: ['annotate'],
          explanation: 'Paragraph D says students annotate printed essays by hand.',
        },
        {
          id: 'arq39',
          number: 39,
          type: 'sentence_completion',
          prompt: 'Participants summarize section arguments from ________ without checking notes.',
          acceptedAnswers: ['memory'],
          explanation: 'Paragraph D mentions summarizing arguments from memory.',
        },
        {
          id: 'arq40',
          number: 40,
          type: 'sentence_completion',
          prompt: 'The author compares deep-reading stamina to ________ fitness.',
          acceptedAnswers: ['cardiovascular'],
          explanation: 'Paragraph E compares deep-reading stamina to cardiovascular fitness.',
        },
      ],
    },
  ];
}

function buildGeneralReadingPassages(): ReadingPassageData[] {
  return [
    {
      id: 'gr-p1',
      passageNumber: 1,
      title: 'Section 1: Municipal Library Membership & Community Room Guidelines',
      subtitle: 'General Reading Section 1 · Questions 1–14',
      instructions: 'Read the public notices below and answer Questions 1–14.',
      paragraphs: [
        {
          label: 'Notice A',
          text: 'RIVERSIDE PUBLIC LIBRARY — MEMBERSHIP TIERS: Residents living or working within Riverside Borough qualify for a Free Standard Card, allowing up to 12 print loans for 21 days and 6 simultaneous e-book downloads. Non-residents may purchase an Annual Visiting Card for $45. Late returns incur $0.25 per item per day, capped at $6 per book; children’s picture books carry zero overdue fines.',
        },
        {
          label: 'Notice B',
          text: 'COMMUNITY STUDY PODS: Four sound-insulated study pods on Level 2 may be reserved online up to 7 days ahead for 90-minute slots. Users must check in at the Level 2 kiosk within 15 minutes of their booking start time, or the pod automatically releases to walk-in visitors. Food is restricted to the Ground Floor Atrium; lidded water bottles are permitted throughout.',
        },
        {
          label: 'Notice C',
          text: 'WEEKEND DIGITAL CLINIC: Every Saturday between 10:00 a.m. and 1:00 p.m., volunteer IT mentors offer 20-minute drop-in troubleshooting for smartphones, PDF forms, and library e-reader setup. Bring your own charger and device passwords. No appointment is required, though tickets are issued from 9:45 a.m. on a first-come basis.',
        },
      ],
      questions: [
        {
          id: 'grq1',
          number: 1,
          type: 'tfng',
          prompt: 'People who work inside Riverside Borough but live elsewhere can obtain a Free Standard Card.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['TRUE'],
          explanation: 'Notice A covers residents living or working within Riverside Borough.',
        },
        {
          id: 'grq2',
          number: 2,
          type: 'tfng',
          prompt: 'The maximum overdue fine on a single adult print book is $6.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['TRUE'],
          explanation: 'Notice A specifies late fees are capped at $6 per book.',
        },
        {
          id: 'grq3',
          number: 3,
          type: 'tfng',
          prompt: 'Children’s picture books may only be borrowed for 14 days.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['NOT GIVEN'],
          explanation: 'Notice A states children’s books have no fines, without stating a separate loan period.',
        },
        {
          id: 'grq4',
          number: 4,
          type: 'tfng',
          prompt: 'Study pod reservations remain held for 30 minutes if the user arrives late.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['FALSE'],
          explanation: 'Notice B states users must check in within 15 minutes before automatic release.',
        },
        {
          id: 'grq5',
          number: 5,
          type: 'tfng',
          prompt: 'Covered water bottles are allowed inside Level 2 study pods.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['TRUE'],
          explanation: 'Notice B confirms lidded water bottles are permitted throughout.',
        },
        {
          id: 'grq6',
          number: 6,
          type: 'tfng',
          prompt: 'The Weekend Digital Clinic requires booking a slot three days in advance.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['FALSE'],
          explanation: 'Notice C says no appointment is required; tickets are issued from 9:45 a.m.',
        },
        {
          id: 'grq7',
          number: 7,
          type: 'sentence_completion',
          prompt: 'Non-residents pay $________ per year for a Visiting Card.',
          acceptedAnswers: ['45'],
          explanation: 'Notice A lists the Annual Visiting Card at $45.',
        },
        {
          id: 'grq8',
          number: 8,
          type: 'sentence_completion',
          prompt: 'Standard Card holders may download up to ________ e-books at one time.',
          acceptedAnswers: ['6', 'six'],
          explanation: 'Notice A allows 6 simultaneous e-book downloads.',
        },
        {
          id: 'grq9',
          number: 9,
          type: 'sentence_completion',
          prompt: 'Study pods on Level 2 can be booked up to ________ days in advance.',
          acceptedAnswers: ['7', 'seven'],
          explanation: 'Notice B specifies up to 7 days ahead.',
        },
        {
          id: 'grq10',
          number: 10,
          type: 'sentence_completion',
          prompt: 'Each study pod booking lasts for ________ minutes.',
          acceptedAnswers: ['90'],
          explanation: 'Notice B lists 90-minute slots.',
        },
        {
          id: 'grq11',
          number: 11,
          type: 'sentence_completion',
          prompt: 'Food may only be consumed in the Ground Floor ________.',
          acceptedAnswers: ['Atrium'],
          explanation: 'Notice B restricts food to the Ground Floor Atrium.',
        },
        {
          id: 'grq12',
          number: 12,
          type: 'sentence_completion',
          prompt: 'Saturday IT help sessions run for ________ minutes per visitor.',
          acceptedAnswers: ['20'],
          explanation: 'Notice C offers 20-minute drop-in troubleshooting.',
        },
        {
          id: 'grq13',
          number: 13,
          type: 'mcq',
          prompt: 'When are drop-in tickets distributed for the Saturday Digital Clinic?',
          options: ['A. 9:30 a.m.', 'B. 9:45 a.m.', 'C. 10:00 a.m.'],
          acceptedAnswers: ['B', 'B. 9:45 a.m.', '9:45 a.m.'],
          explanation: 'Notice C states tickets are issued from 9:45 a.m.',
        },
        {
          id: 'grq14',
          number: 14,
          type: 'mcq',
          prompt: 'What should visitors bring to the Digital Clinic?',
          options: [
            'A. Proof of borough employment',
            'B. Their device charger and passwords',
            'C. A blank USB flash drive',
          ],
          acceptedAnswers: ['B', 'B. Their device charger and passwords'],
          explanation: 'Notice C reminds visitors to bring their own charger and device passwords.',
        },
      ],
    },
    {
      id: 'gr-p2',
      passageNumber: 2,
      title: 'Section 2: Hybrid Workplace Safety & Ergonomic Onboarding Guide',
      subtitle: 'General Reading Section 2 · Questions 15–27',
      instructions: 'Read the workplace handbook extract and answer Questions 15–27.',
      paragraphs: [
        {
          label: 'A',
          text: 'New staff working two or more days per week from home are eligible for a one-time $350 Home Ergonomics Stipend within their first 60 days of employment. Eligible purchases include adjustable task chairs, external keyboards, monitor risers, and glare-free desk lamps. Receipts must be uploaded through the HR Expense Portal before reimbursement.',
        },
        {
          label: 'B',
          text: 'To prevent eye fatigue and musculoskeletal strain, every employee should position their primary screen an arm’s length away, with the top bezel aligned slightly below eye level. Follow the 20-20-20 guideline: every 20 minutes, look at an object at least 20 feet away for 20 seconds, and stand up briefly once every hour.',
        },
        {
          label: 'C',
          text: 'Company laptops must never connect to unencrypted public Wi-Fi networks in cafés or airports without first activating the corporate VPN client. Should a device be misplaced during travel, report the incident to the IT Security Desk within 2 hours so remote wipe protocols can safeguard client files.',
        },
      ],
      questions: [
        {
          id: 'grq15',
          number: 15,
          type: 'tfng',
          prompt: 'Employees working from home one day a week qualify for the $350 Ergonomics Stipend.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['FALSE'],
          explanation: 'Paragraph A requires working two or more days per week from home.',
        },
        {
          id: 'grq16',
          number: 16,
          type: 'tfng',
          prompt: 'Staff must submit stipend receipts within 60 days of starting.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['TRUE'],
          explanation: 'Paragraph A states eligibility is within their first 60 days of employment.',
        },
        {
          id: 'grq17',
          number: 17,
          type: 'tfng',
          prompt: 'The Ergonomics Stipend covers monthly home fibre internet bills.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['FALSE'],
          explanation: 'Paragraph A lists chairs, keyboards, monitor risers, and desk lamps, not internet bills.',
        },
        {
          id: 'grq18',
          number: 18,
          type: 'tfng',
          prompt: 'Monitors should be positioned higher than the user’s eye line.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['FALSE'],
          explanation: 'Paragraph B specifies the top bezel should be aligned slightly below eye level.',
        },
        {
          id: 'grq19',
          number: 19,
          type: 'tfng',
          prompt: 'Employees using café Wi-Fi must enable the corporate VPN first.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['TRUE'],
          explanation: 'Paragraph C mandates activating the corporate VPN client on public Wi-Fi.',
        },
        {
          id: 'grq20',
          number: 20,
          type: 'sentence_completion',
          prompt: 'Reimbursement claims are submitted via the HR ________ Portal.',
          acceptedAnswers: ['Expense'],
          explanation: 'Paragraph A specifies the HR Expense Portal.',
        },
        {
          id: 'grq21',
          number: 21,
          type: 'sentence_completion',
          prompt: 'Screens should sit roughly an ________ length from the user.',
          acceptedAnswers: ["arm's", 'arms'],
          explanation: 'Paragraph B states an arm’s length away.',
        },
        {
          id: 'grq22',
          number: 22,
          type: 'sentence_completion',
          prompt: 'Every 20 minutes, gaze 20 feet away for ________ seconds.',
          acceptedAnswers: ['20'],
          explanation: 'The 20-20-20 guideline recommends 20 seconds.',
        },
        {
          id: 'grq23',
          number: 23,
          type: 'sentence_completion',
          prompt: 'Lost laptops must be reported to IT Security within ________ hours.',
          acceptedAnswers: ['2', 'two'],
          explanation: 'Paragraph C states within 2 hours.',
        },
        {
          id: 'grq24',
          number: 24,
          type: 'mcq',
          prompt: 'Why must misplaced laptops be reported promptly?',
          options: [
            'A. To order an immediate courier replacement',
            'B. So IT can trigger remote wipe protocols',
            'C. To avoid an insurance deductible fee',
          ],
          acceptedAnswers: ['B', 'B. So IT can trigger remote wipe protocols'],
          explanation: 'Paragraph C states remote wipe protocols safeguard client files.',
        },
        {
          id: 'grq25',
          number: 25,
          type: 'mcq',
          prompt: 'How often does the guide advise standing up during the workday?',
          options: ['A. Every 20 minutes', 'B. Once every hour', 'C. Twice per afternoon'],
          acceptedAnswers: ['B', 'B. Once every hour'],
          explanation: 'Paragraph B recommends standing up briefly once every hour.',
        },
        {
          id: 'grq26',
          number: 26,
          type: 'sentence_completion',
          prompt: 'Desk lamps purchased with the stipend must be ________-free.',
          acceptedAnswers: ['glare'],
          explanation: 'Paragraph A specifies glare-free desk lamps.',
        },
        {
          id: 'grq27',
          number: 27,
          type: 'tfng',
          prompt: 'Contractors are excluded from the Home Ergonomics Stipend.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          acceptedAnswers: ['NOT GIVEN'],
          explanation: 'The extract mentions new staff working from home, without discussing contractors.',
        },
      ],
    },
    {
      id: 'gr-p3',
      passageNumber: 3,
      title: 'Section 3: The Revival of Neighbourhood Tool Libraries',
      subtitle: 'General Reading Section 3 · Questions 28–40',
      instructions: 'Read the feature article and answer Questions 28–40 (Matching Headings, Yes/No/Not Given, and Completion).',
      paragraphs: [
        {
          label: 'A',
          text: 'Inside the average suburban garage sits an electric power drill that will be used for roughly thirteen minutes over its entire working life. Driven by rising hardware prices and cramped urban apartments, residents across dozens of cities are embracing "tool libraries"—community lending hubs where members borrow ladders, sanders, sewing machines, and camping stoves for less than the cost of a cinema ticket.',
        },
        {
          label: 'B',
          text: 'The earliest modern tool library opened in Grosse Pointe, Michigan, in 1943 during wartime metal shortages, when sharing saws and chisels became civic necessity. Yet the movement only surged globally after 2010, sparked by zero-waste grassroots collectives in Portland, Toronto, and Edinburgh converting unused shipping containers and shopfronts into bright lending workshops.',
        },
        {
          label: 'C',
          text: 'Running a reliable lending workshop demands far more than collecting dusty donations. Successful branches employ part-time repair technicians to test electrical cords, sharpen blades, and maintain a barcoded inventory. Without routine safety inspections, broken equipment quickly erodes member trust and drives up liability insurance premiums.',
        },
        {
          label: 'D',
          text: 'Perhaps the greatest surprise for founders has been the social dividend. Tool libraries regularly host weekend repair cafés where retired carpenters mentor first-time renters on fixing wobbly chairs or patching plasterboard. For many newcomers living alone, borrowing a cordless drill becomes the first step toward knowing their neighbours.',
        },
      ],
      headingOptions: [
        'i. Why technical maintenance keeps lending hubs viable',
        'ii. Unexpected community bonds forged through shared tools',
        'iii. Historical roots and the recent wave of urban growth',
        'iv. Unused household tools fueling a sharing shift',
      ],
      questions: [
        {
          id: 'grq28',
          number: 28,
          type: 'matching_headings',
          prompt: 'Choose the best heading for Paragraph A',
          options: [
            'i. Why technical maintenance keeps lending hubs viable',
            'ii. Unexpected community bonds forged through shared tools',
            'iii. Historical roots and the recent wave of urban growth',
            'iv. Unused household tools fueling a sharing shift',
          ],
          acceptedAnswers: ['iv', 'iv. Unused household tools fueling a sharing shift'],
          explanation: 'Paragraph A highlights idle power drills and apartment constraints driving tool libraries.',
        },
        {
          id: 'grq29',
          number: 29,
          type: 'matching_headings',
          prompt: 'Choose the best heading for Paragraph B',
          options: [
            'i. Why technical maintenance keeps lending hubs viable',
            'ii. Unexpected community bonds forged through shared tools',
            'iii. Historical roots and the recent wave of urban growth',
            'iv. Unused household tools fueling a sharing shift',
          ],
          acceptedAnswers: ['iii', 'iii. Historical roots and the recent wave of urban growth'],
          explanation: 'Paragraph B traces the 1943 Michigan origins and post-2010 global surge.',
        },
        {
          id: 'grq30',
          number: 30,
          type: 'matching_headings',
          prompt: 'Choose the best heading for Paragraph C',
          options: [
            'i. Why technical maintenance keeps lending hubs viable',
            'ii. Unexpected community bonds forged through shared tools',
            'iii. Historical roots and the recent wave of urban growth',
            'iv. Unused household tools fueling a sharing shift',
          ],
          acceptedAnswers: ['i', 'i. Why technical maintenance keeps lending hubs viable'],
          explanation: 'Paragraph C focuses on repair technicians, blade sharpening, and safety inspections.',
        },
        {
          id: 'grq31',
          number: 31,
          type: 'matching_headings',
          prompt: 'Choose the best heading for Paragraph D',
          options: [
            'i. Why technical maintenance keeps lending hubs viable',
            'ii. Unexpected community bonds forged through shared tools',
            'iii. Historical roots and the recent wave of urban growth',
            'iv. Unused household tools fueling a sharing shift',
          ],
          acceptedAnswers: ['ii', 'ii. Unexpected community bonds forged through shared tools'],
          explanation: 'Paragraph D discusses mentorship at repair cafés and neighbourly connection.',
        },
        {
          id: 'grq32',
          number: 32,
          type: 'ynng',
          prompt: 'Most household power drills are used extensively every month.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          acceptedAnswers: ['NO'],
          explanation: 'Paragraph A states the average drill is used for roughly thirteen minutes over its entire working life.',
        },
        {
          id: 'grq33',
          number: 33,
          type: 'ynng',
          prompt: 'Wartime metal shortages helped inspire the first modern tool library in 1943.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          acceptedAnswers: ['YES'],
          explanation: 'Paragraph B confirms the Grosse Pointe library opened in 1943 during wartime metal shortages.',
        },
        {
          id: 'grq34',
          number: 34,
          type: 'ynng',
          prompt: 'Toronto’s tool library currently owns more tools than Edinburgh’s.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          acceptedAnswers: ['NOT GIVEN'],
          explanation: 'Both cities are named in Paragraph B, without comparing inventory counts.',
        },
        {
          id: 'grq35',
          number: 35,
          type: 'ynng',
          prompt: 'Neglecting safety inspections can raise insurance costs for tool libraries.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          acceptedAnswers: ['YES'],
          explanation: 'Paragraph C warns broken gear drives up liability insurance premiums.',
        },
        {
          id: 'grq36',
          number: 36,
          type: 'sentence_completion',
          prompt: 'An average garage power drill operates for about ________ minutes across its lifespan.',
          acceptedAnswers: ['13', 'thirteen'],
          explanation: 'Paragraph A mentions roughly thirteen minutes.',
        },
        {
          id: 'grq37',
          number: 37,
          type: 'sentence_completion',
          prompt: 'Grassroots collectives converted unused shipping ________ into workshops.',
          acceptedAnswers: ['containers'],
          explanation: 'Paragraph B states unused shipping containers and shopfronts.',
        },
        {
          id: 'grq38',
          number: 38,
          type: 'sentence_completion',
          prompt: 'Part-time repair technicians track items using a ________ inventory.',
          acceptedAnswers: ['barcoded'],
          explanation: 'Paragraph C mentions a barcoded inventory.',
        },
        {
          id: 'grq39',
          number: 39,
          type: 'sentence_completion',
          prompt: 'Retired ________ volunteer at weekend repair cafés to mentor newcomers.',
          acceptedAnswers: ['carpenters'],
          explanation: 'Paragraph D refers to retired carpenters.',
        },
        {
          id: 'grq40',
          number: 40,
          type: 'mcq',
          prompt: 'What unexpected benefit have tool library founders observed?',
          options: [
            'A. Increased hardware store sales nearby',
            'B. Stronger social connections among isolated neighbours',
            'C. Reduced municipal electricity bills',
          ],
          acceptedAnswers: ['B', 'B. Stronger social connections among isolated neighbours'],
          explanation: 'Paragraph D highlights the social dividend and neighbours getting to know each other.',
        },
      ],
    },
  ];
}

function buildAcademicWritingTasks(): WritingTaskData[] {
  return [
    {
      id: 'aw-t1',
      taskNumber: 1,
      title: 'Writing Task 1 (Academic Data Report)',
      instructions:
        'You should spend about 20 minutes on this task. Write at least 150 words. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
      prompt:
        'The bar chart below compares the percentage of international university graduates working in hybrid or remote roles across four study destinations in 2020 and 2025.',
      minWords: 150,
      recommendedMinutes: 20,
      visualData: {
        caption: 'International Graduates in Hybrid/Remote Roles (%) — 2020 vs. 2025',
        unit: '%',
        seriesALabel: '2020 (%)',
        seriesBLabel: '2025 (%)',
        bars: [
          { label: 'Canada', valueA: 24, valueB: 52 },
          { label: 'United Kingdom', valueA: 28, valueB: 49 },
          { label: 'Australia', valueA: 19, valueB: 41 },
          { label: 'Germany', valueA: 16, valueB: 38 },
        ],
      },
    },
    {
      id: 'aw-t2',
      taskNumber: 2,
      title: 'Writing Task 2 (Academic Essay)',
      instructions:
        'You should spend about 40 minutes on this task. Write at least 250 words. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
      prompt:
        'In many countries, universities are placing greater emphasis on online degree modules and artificial intelligence study tools rather than traditional in-person lectures. Do the advantages of this shift outweigh the disadvantages?',
      minWords: 250,
      recommendedMinutes: 40,
    },
  ];
}

function buildGeneralWritingTasks(): WritingTaskData[] {
  return [
    {
      id: 'gw-t1',
      taskNumber: 1,
      title: 'Writing Task 1 (Formal / Semi-Formal Letter)',
      instructions:
        'You should spend about 20 minutes on this task. Write at least 150 words. You do NOT need to write any addresses. Begin your letter as follows: Dear Manager,',
      prompt:
        'You recently attended a three-day professional training workshop hosted at a conference hotel, but several promised facilities were unavailable during the event. Write a letter to the hotel manager. In your letter:\n• Give details of the workshop and when you attended\n• Explain the facility problems you experienced\n• Say what action or compensation you expect the hotel to take',
      minWords: 150,
      recommendedMinutes: 20,
    },
    {
      id: 'gw-t2',
      taskNumber: 2,
      title: 'Writing Task 2 (Discursive Essay)',
      instructions:
        'You should spend about 40 minutes on this task. Write at least 250 words. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
      prompt:
        'Some employers argue that practical workplace experience should matter more than formal university degrees when hiring young professionals, while others believe academic qualifications remain essential. Discuss both views and give your own opinion.',
      minWords: 250,
      recommendedMinutes: 40,
    },
  ];
}

function buildSpeakingData(category: 'academic' | 'general'): SpeakingData {
  return {
    part1: {
      title: 'Part 1: Introduction & Interview (4–5 Minutes)',
      instructions:
        'Answer these everyday conversational questions clearly and naturally. Aim for 2–4 well-developed sentences per answer.',
      questions: [
        'Where is your hometown, and what do you enjoy most about living there?',
        'Do you prefer studying or working in the morning or late at night? Why?',
        'What kind of public transport is most popular in your city?',
        category === 'academic'
          ? 'Are there any new academic skills or languages you hope to learn this year?'
          : 'How do you usually spend your weekends with friends or family?',
      ],
    },
    part2: {
      title: 'Part 2: Individual Long Turn — Cue Card',
      instructions:
        'You have 1 minute to prepare your notes and up to 2 minutes to speak continuously on the topic below.',
      prepSeconds: 60,
      speakSeconds: 120,
      cueCard: {
        topic: 'Describe a skill or course you learned that had a positive impact on your career or studies.',
        bullets: [
          'What the skill or course was',
          'When and where you learned it',
          'What challenges you faced while learning it',
          'And explain why it became valuable for your goals',
        ],
        followUpQuestion: 'Would you recommend this skill to younger students today?',
      },
    },
    part3: {
      title: 'Part 3: Two-Way Discussion (4–5 Minutes)',
      instructions:
        'Respond to these broader, abstract questions with balanced arguments, examples, and clear reasoning.',
      questions: [
        'How have digital learning platforms changed the way people acquire career skills compared to twenty years ago?',
        'Why do some people continue learning new qualifications even after securing full-time employment?',
        'Do you think employers value adaptability more than specialized technical knowledge today?',
        'How might governments support adults who need to retrain for emerging industries?',
      ],
    },
  };
}

export function seedInitialMockTests(): void {
  const existing = db.prepare('SELECT COUNT(*) AS cnt FROM mock_tests').get() as { cnt: number };
  if (existing && existing.cnt > 0) return;

  const now = new Date().toISOString();
  const listening = buildListeningSections();
  const acReading = buildAcademicReadingPassages();
  const genReading = buildGeneralReadingPassages();
  const acWriting = buildAcademicWritingTasks();
  const genWriting = buildGeneralWritingTasks();
  const acSpeaking = buildSpeakingData('academic');
  const genSpeaking = buildSpeakingData('general');

  const tests: Array<{
    id: string;
    title: string;
    category: 'academic' | 'general';
    moduleType: 'listening' | 'reading' | 'writing' | 'speaking' | 'full';
    description: string;
    durationMinutes: number;
    questionCount: number;
    payload: MockTestPayload;
  }> = [
    {
      id: 'full-academic-01',
      title: 'Full IELTS Academic Mock Exam 01',
      category: 'academic',
      moduleType: 'full',
      description:
        'Complete Cambridge-format computer-delivered simulation: Listening (40 Qs), Academic Reading (40 Qs), Writing Tasks 1 & 2, and Speaking Parts 1–3 with instant objective + AI estimated band scoring.',
      durationMinutes: 164,
      questionCount: 85,
      payload: {
        listeningSections: listening,
        readingPassages: acReading,
        writingTasks: acWriting,
        speaking: acSpeaking,
      },
    },
    {
      id: 'full-general-01',
      title: 'Full IELTS General Training Mock Exam 01',
      category: 'general',
      moduleType: 'full',
      description:
        'Complete Express Entry & skilled migration simulation: Listening (40 Qs), General Reading (40 Qs), Letter & Essay Writing, and Speaking Parts 1–3.',
      durationMinutes: 164,
      questionCount: 85,
      payload: {
        listeningSections: listening,
        readingPassages: genReading,
        writingTasks: genWriting,
        speaking: genSpeaking,
      },
    },
    {
      id: 'listening-practice-01',
      title: 'IELTS Listening Practice Test 01',
      category: 'academic',
      moduleType: 'listening',
      description:
        'Four progressive audio sections covering everyday conversation, campus/public monologue, academic tutorial, and university lecture with 40 mixed questions.',
      durationMinutes: 30,
      questionCount: 40,
      payload: { listeningSections: listening },
    },
    {
      id: 'reading-academic-01',
      title: 'IELTS Academic Reading Test 01',
      category: 'academic',
      moduleType: 'reading',
      description:
        'Three authentic long-form passages (Architecture, Botany, Cognitive Science) with 40 questions including T/F/NG, Y/N/NG, Matching Headings, MCQ, and Completion.',
      durationMinutes: 60,
      questionCount: 40,
      payload: { readingPassages: acReading },
    },
    {
      id: 'reading-general-01',
      title: 'IELTS General Training Reading Test 01',
      category: 'general',
      moduleType: 'reading',
      description:
        'Three practical workplace & general-interest sections with 40 questions tailored for PR and work-visa candidates.',
      durationMinutes: 60,
      questionCount: 40,
      payload: { readingPassages: genReading },
    },
    {
      id: 'writing-academic-01',
      title: 'IELTS Academic Writing Test 01',
      category: 'academic',
      moduleType: 'writing',
      description:
        'Data chart report (Task 1) and Academic Essay (Task 2) with live word counters, auto-save drafts, and AI examiner evaluation.',
      durationMinutes: 60,
      questionCount: 2,
      payload: { writingTasks: acWriting },
    },
    {
      id: 'writing-general-01',
      title: 'IELTS General Training Writing Test 01',
      category: 'general',
      moduleType: 'writing',
      description:
        'Formal complaint letter (Task 1) and discursive essay (Task 2) evaluated against official IELTS band descriptors.',
      durationMinutes: 60,
      questionCount: 2,
      payload: { writingTasks: genWriting },
    },
    {
      id: 'speaking-mock-01',
      title: 'IELTS Speaking Simulation 01',
      category: 'academic',
      moduleType: 'speaking',
      description:
        'Complete 3-part Speaking interview with Part 2 Cue Card prep/speak timers, microphone recording, playback, and AI pronunciation & fluency feedback.',
      durationMinutes: 14,
      questionCount: 3,
      payload: { speaking: acSpeaking },
    },
  ];

  const stmt = db.prepare(`
    INSERT INTO mock_tests (
      id, title, category, module_type, description,
      duration_minutes, question_count, is_published, payload_json, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
  `);

  for (const t of tests) {
    stmt.run(
      t.id,
      t.title,
      t.category,
      t.moduleType,
      t.description,
      t.durationMinutes,
      t.questionCount,
      JSON.stringify(t.payload),
      now,
      now
    );
  }
}
