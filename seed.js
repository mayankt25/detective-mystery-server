const mongoose = require("mongoose");
const connectDB = require("./db");
const Case = require("./models/Case");
const Probability = require("./models/Probability");

const caseData = [
    {
        crime_scene: "Poisoning at a Dinner Party",
        killer: "Sarah Thompson",
        suspects: [
            {
                name: "John Smith",
                relation: "Brother",
                motives: [
                    "Long-held bitterness from years of familial rivalry. John believed the victim favored other siblings in the distribution of family wealth.",
                    "A desire to gain sole ownership of shared family property by removing the victim from the dispute."
                ],
                evidence: "Cyanide, which investigators linked to a purchase John made under a false name a week prior.",
                alibi: "Claimed to have been in the garden speaking to a family friend, but the timeline provided by the friend conflicted with John’s account.",
                eyewitness: "One guest noted John was the last to leave the victim’s vicinity before the toast.",
                mental_state: "Initially cooperative but became hostile when pressed about his movements during the party.",
            },
            {
                name: "Sarah Thompson",
                relation: "Business Partner",
                motives: [
                    "Strained relations due to ongoing disagreements over the direction of their business partnership. The victim’s refusal to sell the company caused tension.",
                    "Sarah stood to gain financially from the victim’s death due to an undisclosed clause in their business agreement."
                ],
                evidence: "Traces of the same poison were found in Sarah’s office, disguised as a medical substance.",
                alibi: " Claimed she was speaking with another guest at the far end of the room during the toast. However, her movement pattern earlier in the evening contradicted this claim.",
                eyewitness: "A waiter distinctly remembered seeing Sarah pick up the victim’s glass briefly before serving it.",
                mental_state: "Composed but visibly unsettled during discussions about financial motives.",
            },
            {
                name: "Robert Lewis",
                relation: "Friend",
                motives: [
                    "The victim’s refusal to loan Robert money despite their close friendship fueled anger.",
                    "Robert had a longstanding grudge due to an unfulfilled promise of business collaboration."
                ],
                evidence: "A bottle of cyanide was found discarded near Robert’s hotel room, with traces of his fingerprints.",
                alibi: "Claimed he was in the restroom, but surveillance footage showed him walking toward the dining room minutes before the toast.",
                eyewitness: "A guest recalled Robert appearing flushed and nervous as the victim collapsed.",
                mental_state: "Appeared regretful but maintained a defensive stance, frequently blaming others.",
            },
            {
                name: "Tom Harris",
                relation: "Victim’s Cousin",
                motives: [
                    "Anger over being excluded from a family inheritance.",
                    "Jealousy of the victim’s close relationship with other family members."
                ],
                evidence: "Traces of poison found on Tom’s coat after he served drinks.",
                alibi: "Claimed he was at the bar, but the bartender didn’t see him there.",
                eyewitness: "A guest saw Tom acting strangely while preparing the drinks.",
                mental_state: "Nervous and defensive, but unable to provide a clear timeline."
            },
            {
                name: "Clara Davis",
                relation: "Ex-Girlfriend",
                motives: [
                    "The victim ended their relationship and she wanted revenge.",
                    "Financial motives due to an unresolved dispute over shared property."
                ],
                evidence: "Traces of the same poison were found in Clara’s purse.",
                alibi: "Claimed to have been in the living room with other guests, but no one can confirm her presence.",
                eyewitness: "A guest noticed Clara near the victim’s drink just before the toast.",
                mental_state: "Calm but showed signs of discomfort when asked about the breakup."
            }
        ],
    },
    {
        crime_scene: "Robbery at a Jewelry Store",
        killer: "Michael Carter",
        suspects: [
            {
                name: "Michael Carter",
                relation: "Brother",
                motives: [
                    "Mounting personal debts created financial desperation, driving him to target the store.",
                    "He harbored jealousy toward the victim’s flourishing business, feeling overlooked for help during his financial struggles."
                ],
                evidence: "A lever used to break into display cases, bearing partial fingerprints matching Michael’s.",
                alibi: "Claimed he was at home during the crime, but phone location data placed him near the store.",
                eyewitness: "A shopkeeper from a nearby store identified Michael pacing outside the jewelry store the previous evening.",
                mental_state: "Defensive and prone to outbursts when questioned about his financial records."
            },
            {
                name: "Emma Davis",
                relation: "Regular Customer",
                motives: [
                    "Long-standing grudge against the victim for refusing her extended credit on a high-value item.",
                    "Desire to obtain a specific piece of jewelry she believed was rightfully hers after a prior dispute."
                ],
                evidence: "Gloves consistent with fibers found at the crime scene, recovered from her vehicle.",
                alibi: "Claimed she was shopping at a nearby market, but no receipts or witnesses corroborated this.",
                eyewitness: "Jewelry store staff remembered Emma arguing with the victim days before the crime.",
                mental_state: "Confident and clear but faltered when inconsistencies were pointed out."
            },
            {
                name: "Thomas Reed",
                relation: "Neighbor",
                motives: [
                    "An unresolved dispute with the victim over property boundaries led to simmering tensions.",
                    "Opportunity for financial gain amidst the chaos."
                ],
                evidence: "A wrench with DNA evidence linked to Thomas was found discarded in an alley near the store.",
                alibi: "Claimed to have been walking his dog, but no witnesses confirmed seeing him in the area.",
                eyewitness: "Security footage captured someone of Thomas’s build entering the store shortly before the alarm triggered.",
                mental_state: "Seemed cooperative but displayed inconsistencies in his timeline of events."
            },
            {
                name: "Sophia Bennett",
                relation: "Store Employee",
                motives: [
                    "Jealousy over the victim’s success and business opportunities.",
                    "Financial desperation after personal debts piled up."
                ],
                evidence: "A pair of gloves found in her locker matched fibers found at the crime scene.",
                alibi: "Claimed she was on a lunch break, but no one saw her leave.",
                eyewitness: "Security footage shows Sophia in the store around the time of the robbery.",
                mental_state: "Calm but visibly anxious when asked about her finances."
            },
            {
                name: "David Turner",
                relation: "Rival Business Owner",
                motives: [
                    "Desire to ruin the victim’s store and steal their clients.",
                    "Financial gain through an insurance claim after the robbery."
                ],
                evidence: "A lever linked to David was found at the scene, covered in dust.",
                alibi: "Claimed he was home, but his cell phone records show him near the store.",
                eyewitness: "A witness saw David acting suspiciously near the store the night of the robbery.",
                mental_state: "Defensive and fierce, deflecting questions about his involvement."
            }
        ],
    },
    {
        crime_scene: "Hit-and-Run at an Intersection",
        killer: "Ethan Brooks",
        suspects: [
            {
                name: "Daniel Evans",
                relation: "Husband",
                motives: [
                    "Ongoing domestic conflicts led to separation, with Daniel fearing loss of assets in an upcoming divorce.",
                    "The victim had recently discovered suspicious information about Daniel’s financial dealings."
                ],
                evidence: "Daniel’s car, which had damage consistent with the incident and blood traces matching the victim.",
                alibi: "Claimed to have been running errands elsewhere, but surveillance captured his car near the intersection.",
                eyewitness: "A local resident identified Daniel’s car fleeing the scene shortly after the collision.",
                mental_state: "Calm but evasive, often redirecting questions."
            },
            {
                name: "Olivia Harris",
                relation: "Work Colleague",
                motives: [
                    "Anger over the victim’s attempts to discredit her at work.",
                    "Desire to secure a promotion at the victim’s expense."
                ],
                evidence: "A similar car model registered to Olivia was sighted in the vicinity.",
                alibi: "Claimed to have been at a work function, but no attendees confirmed her presence.",
                eyewitness: "A witness noted a driver matching Olivia’s description in a car parked nearby earlier.",
                mental_state: "Controlled and composed but became defensive when pressed about work-related grievances."
            },
            {
                name: "Ethan Brooks",
                relation: "Former Business Partner",
                motives: [
                    "Revenge over the victim’s role in a failed business venture.",
                    "To send a message to other associates through intimidation."
                ],
                evidence: "His car bore fresh paint in an attempt to conceal damage.",
                alibi: "Claimed he was attending a business meeting, but no meeting records were found.",
                eyewitness: "Multiple witnesses reported seeing Ethan’s car speeding from the scene.",
                mental_state: "Agitated and frequently shifted blame onto others."
            },
            {
                name: "Isabella Moore",
                relation: "Victim’s Cousin",
                motives: [
                    "A recent argument with the victim about a shared property.",
                    "Personal anger stemming from a failed business deal between her and the victim."
                ],
                evidence: "Isabella’s car had damage that matched the accident, but she claimed it was unrelated.",
                alibi: "Claimed to have been at home, but no one could confirm her whereabouts.",
                eyewitness: "Witnesses reported seeing her car near the scene of the accident.",
                mental_state: "Nervous, inconsistent with her story, and defensive when questioned."
            },
            {
                name: "Benjamin Carter",
                relation: "Victim’s Neighbor",
                motives: [
                    "Long-standing tensions with the victim over neighborhood disputes.",
                    "Anger over the victim’s attempts to block his development project."
                ],
                evidence: "Benjamin’s vehicle was found with paint traces from the victim’s car.",
                alibi: "Claimed to have been out of town, but his flight records showed he returned late the same night.",
                eyewitness: "Someone saw Benjamin’s car near the accident site right before it happened.",
                mental_state: "Calm but unclear, often giving vague answers when questioned about the incident."
            }
        ],
    },
    {
        crime_scene: "Suspicious Death at a Hotel",
        killer: "James Bennett",
        suspects: [
            {
                name: "William Carter",
                relation: "Brother",
                motives: [
                    "Long-standing sibling rivalry over family wealth and recognition. The victim recently excluded William from a profitable family trust.",
                    "Escalating anger following a heated argument over personal debts, which the victim refused to settle."
                ],
                evidence: "Physical confrontation led to the victim being pushed from the window, as William’s DNA was found on the windowsill.",
                alibi: "Claimed to have left the hotel hours before the incident, but hotel staff confirmed he returned to the room later that evening.",
                eyewitness: "A neighbor in an adjacent room overheard William shouting at the victim minutes before the incident.",
                mental_state: "Showed signs of indifference and shifted focus to family disputes during questioning."
            },
            {
                name: "Emma Wright",
                relation: "Hotel Manager",
                motives: [
                    "Recent disputes with the victim over unpaid hotel bills.",
                    "Desire to protect the hotel’s reputation after the victim threatened to file a public complaint."
                ],
                evidence: "A blunt object, possibly a paperweight from her office, as evidence of similar objects was found with traces of the victim’s blood.",
                alibi: "Claimed to have been managing a staff meeting at the time, but the meeting ended earlier than her stated timeline.",
                eyewitness: "An employee spotted Emma heading to the victim’s room shortly before the body was discovered.",
                mental_state: "Initially composed but exhibited signs of stress when inconsistencies were raised."
            },
            {
                name: "James Bennett",
                relation: "Old Friend",
                motives: [
                    "Bitterness over an unresolved personal loan the victim had refused to repay.",
                    "Jealousy over the victim’s recent professional success, which had overshadowed James’s career."
                ],
                evidence: "A broken wine bottle found in the victim’s room bore James’s fingerprints.",
                alibi: "Claimed to have been at the hotel bar, but receipts placed him near the victim’s room instead.",
                eyewitness: "Hotel security footage showed James entering the victim’s room late at night.",
                mental_state: "Restless and visibly nervous, providing conflicting statements about his movements."
            },
            {
                name: "Sophia Mitchell",
                relation: "Hotel Staff",
                motives: [
                    "The victim had recently made negative comments about Sophia’s performance at work, leading to tension.",
                    "Financial pressure, as Sophia owed money and thought the victim could help her."
                ],
                evidence: "A heavy vase from the victim’s room was found with Sophia’s fingerprints.",
                alibi: "Claimed she was busy with another guest at the time of the incident, but no one can confirm this.",
                eyewitness: "A housekeeper saw Sophia arguing with the victim earlier that day.",
                mental_state: "Flustered and defensive when asked about the incident."
            },
            {
                name: "Henry Cooper",
                relation: "Hotel Guest",
                motives: [
                    "The victim had been involved in a personal dispute with Henry’s family.",
                    "A financial issue where Henry owed the victim money."
                ],
                evidence: "A broken window found near the crime scene was linked to Henry’s room key.",
                alibi: "Claimed he was in his room, but security footage shows him leaving at the time of the incident.",
                eyewitness: "A guest saw Henry standing near the victim’s room just after the fall.",
                mental_state: "Shifty and vague, seemed to be hiding something."
            }
        ],
    },
    {
        crime_scene: "Burglary Gone Wrong",
        killer: "Edward Hayes",
        suspects: [
            {
                name: "Edward Hayes",
                relation: "Brother",
                motives: [
                    "Financial desperation, magnified by his request for money being denied by the victim.",
                    "Belief that the victim had wrongfully inherited assets that should have been his."
                ],
                evidence: "Ropes and duct tape match purchases Edward made weeks before the incident.",
                alibi: "Claimed to have been visiting a friend, but phone location data placed him near the victim’s residence.",
                eyewitness: "A neighbor saw someone resembling Edward entering the house two nights before the burglary.",
                mental_state: "Anxious and argumentative when confronted with evidence of his financial troubles."
            },
            {
                name: "Olivia Harper",
                relation: "Neighbor",
                motives: [
                    "Frustration over property disputes with the victim, who recently reported Olivia to local authorities.",
                    "Opportunity to steal valuable items she knew were in the house."
                ],
                evidence: "A lever found on the premises had traces of Olivia’s fingerprints.",
                alibi: "Claimed to have been at the gym, but no records or witnesses confirmed this.",
                eyewitness: "A delivery driver saw Olivia near the victim’s home around the time of the crime.",
                mental_state: "Overly cooperative initially but failed to explain suspicious evidence."
            },
            {
                name: "Lucas Turner",
                relation: "Former Employee",
                motives: [
                    "Payback for being terminated from his job by the victim under unsettled circumstances.",
                    "Financial desperation due to mounting personal debts."
                ],
                evidence: "A set of gloves found at the scene matched Lucas’s size and fibers from his car.",
                alibi: "Claimed to have been at a coffee shop, but surveillance footage disproved this.",
                eyewitness: "A passerby identified Lucas’s vehicle parked near the victim’s house that night.",
                mental_state: "Nervous and irritable, avoiding direct answers during questioning."
            },
            {
                name: "Isabella Reed",
                relation: "Victim’s Ex-Wife",
                motives: [
                    "Anger over the divorce settlement and the victim’s refusal to pay what she thought was owed.",
                    "A history of dislike, as she believed the victim had wronged her financially."
                ],
                evidence: "Duct tape found in her car matched the type used in the burglary.",
                alibi: "Claimed she was at a friend’s house, but no one could verify her location.",
                eyewitness: "A neighbor reported seeing Isabella leave the house late at night.",
                mental_state: "Calm but showed signs of nervousness when questioned."
            },
            {
                name: "Nathan Brooks",
                relation: "Former Handyman",
                motives: [
                    "The victim had fired Nathan after a falling-out over a job.",
                    "The victim owed Nathan money for work he had completed but was never paid."
                ],
                evidence: "Tools found at the scene were consistent with Nathan’s equipment.",
                alibi: "Claimed to be at a bar, but his credit card records place him near the house.",
                eyewitness: "Someone reported seeing Nathan leave the victim’s house the night of the burglary.",
                mental_state: "Defensive and unclear, tried to shift suspicion onto others."
            }
        ],
    },
    {
        crime_scene: "Fire at a Warehouse",
        killer: "Eva Bennett",
        suspects: [
            {
                name: "Dylan Carter",
                relation: "Business Partner",
                motives: [
                    "Financial gain from an insurance payout the victim had recently initiated.",
                    "Desire to eliminate competition by sabotaging the victim’s business operations."
                ],
                evidence: "Fuel purchased by Dylan days before the fire was found at the scene.",
                alibi: "Claimed to have been dining with his family, but credit card records indicated no transactions during the stated time.",
                eyewitness: "A security guard spotted someone resembling Dylan leaving the warehouse moments before the fire started.",
                mental_state: "Calm but overly defensive, repeatedly referencing his loyalty to the business."
            },
            {
                name: "Eva Bennett",
                relation: "Competitor",
                motives: [
                    "Revenge for losing a major client to the victim’s warehouse.",
                    "Elimination of a rival to expand her own business operations."
                ],
                evidence: "Traces of fuel similar to products she used in her business were detected at the site.",
                alibi: "Claimed to have been attending a trade conference, but no registration records supported her claim.",
                eyewitness: "A truck driver spotted Eva’s vehicle leaving the area shortly before the fire.",
                mental_state: "Polished and well-prepared but avoided direct answers when pressed on her presence near the site."
            },
            {
                name: "James Parker",
                relation: "Old Friend",
                motives: [
                    "Anger over the victim breaking their friendship following a personal betrayal.",
                    "Financial difficulties after being denied a job offer by the victim."
                ],
                evidence: "A lighter found near the warehouse bore James’s fingerprints.",
                alibi: "Claimed to have been home alone, but neighbors reported not seeing his car at his residence.",
                eyewitness: "A witness spotted James arguing with the victim outside the warehouse earlier that evening.",
                mental_state: "Tense and quick-tempered, often contradicting himself during questioning."
            },
            {
                name: "Lily Turner",
                relation: "Warehouse Manager",
                motives: [
                    "Anger over being passed over for a promotion, which the victim had promised.",
                    "Desire to collect an insurance payout to cover personal debts."
                ],
                evidence: "Evidence of fuel was found in Lily’s possession.",
                alibi: "Claimed she was at home, but phone records show she was near the warehouse at the time of the fire.",
                eyewitness: "A security guard saw Lily leave the warehouse just before the fire started.",
                mental_state: "Calm but visibly uncomfortable when questioned about the insurance claim."
            },
            {
                name: "Michael Douglas",
                relation: "Rival Business Owner",
                motives: [
                    "Revenge for a failed business deal with the victim.",
                    "To sabotage the victim’s business and eliminate competition."
                ],
                evidence: "Traces of the same fuel used in the fire were found in Michael’s garage.",
                alibi: "Claimed to have been at a dinner party, but no one at the party confirmed his attendance.",
                eyewitness: "A witness saw Michael near the warehouse hours before the fire started.",
                mental_state: "Aggressive and unclear, attempted to deflect blame onto others."
            }
        ],
    },
    {
        crime_scene: "Disappearance on a Hiking Trail",
        killer: "Oliver King",
        suspects: [
            {
                name: "Adam Lawson",
                relation: "Friend",
                motives: [
                    "Secretly in love with the victim’s partner, Adam’s emotions boiled over when the victim began discussing plans for a future without him.",
                    "A financial dispute regarding a shared hiking business the victim wanted to end."
                ],
                evidence: "A large rock with traces of blood was found near the victim’s last known location, and forensic analysis tied it to Adam’s hiking gear.",
                alibi: "Claimed to have stayed behind on the trail to rest, but GPS data from his phone contradicted this claim, showing he left the area much earlier.",
                eyewitness: "A fellow hiker reported seeing Adam walking away from the area where the victim was last seen.",
                mental_state: "Nervous but calm, attempting to downplay the gravity of the situation while showing signs of guilt when discussing the victim’s disappearance."
            },
            {
                name: "Claire Robinson",
                relation: "Sister",
                motives: [
                    "A long-standing sibling rivalry, worsened by the victim’s influence over the family’s inheritance.",
                    "Feelings of betrayal over the victim’s actions towards their parents, particularly in excluding her from family events."
                ],
                evidence: "Evidence showed Claire had recently used a knife from her camping supplies, which was later found covered in the victim’s blood.",
                alibi: "Claimed to have been resting in the campsite when the victim went missing, but conflicting testimony from fellow campers placed her in the vicinity at the time.",
                eyewitness: "A hiker on the trail saw Claire and the victim arguing shortly before the victim disappeared.",
                mental_state: "Nervous and visibly upset when questioned, Claire became defensive and emotional, providing inconsistent details of her actions."
            },
            {
                name: "Ethan Miller",
                relation: "Best Friend",
                motives: [
                    "Jealousy over the victim’s close relationship with another friend, which had strained their bond over the past year.",
                    "Tension from a financial investment he made into a hiking business that the victim was pulling out of, leaving him in an uncertain position."
                ],
                evidence: "The victim’s hiking backpack was found at a location only Ethan could have accessed, containing items that suggested an attempt to cover up the murder.",
                alibi: "Claimed to have gone ahead to the summit and returned to the camp later, but his location was unverified during the critical time frame.",
                eyewitness: "A hiker recalled seeing Ethan near the area where the victim’s belongings were found, around the time the victim went missing.",
                mental_state: "Calm and collected but visibly tense when asked about his movements on the trail."
            },
            {
                name: "Nina Harris",
                relation: "Victim’s Friend",
                motives: [
                    "Long-standing anger over the victim’s success and a recent falling-out about an unreturned favor.",
                    "Jealousy of the victim’s bond with other friends, which Nina felt excluded from."
                ],
                evidence: "Nina’s hiking stick was found with traces of the victim’s blood on it, indicating a possible struggle.",
                alibi: "Claimed to have been behind on the trail, but a hiker reported seeing her near the victim’s last known location.",
                eyewitness: "A hiker recalled seeing Nina walking quickly away from the area where the victim’s belongings were found.",
                mental_state: "Nervous, providing inconsistent statements about her movements and the victim’s condition."
            },
            {
                name: "Oliver King",
                relation: "Fellow Hiker",
                motives: [
                    "Tensions from a past argument between him and the victim over a business deal gone wrong.",
                    "Oliver believed the victim had been sabotaging his reputation in the hiking community."
                ],
                evidence: "A small knife, similar to one Oliver had been known to carry, was found near the victim’s backpack.",
                alibi: "Claimed to have been at a campsite during the disappearance, but his phone records show him in the area around the time the victim went missing.",
                eyewitness: "A fellow hiker recalled seeing Oliver and the victim arguing earlier that day.",
                mental_state: "Panicked and anxious, Oliver struggled to explain his whereabouts when questioned."
            }
        ],
    },
    {
        crime_scene: "Car Crash on a Deserted Road",
        killer: "Sophia Williams",
        suspects: [
            {
                name: "James Carter",
                relation: "Husband",
                motives: [
                    "Long-running domestic tension, made worse by the victim’s decision to seek a divorce. James feared the loss of family wealth and custody of children.",
                    "Financial difficulties tied to a business venture that the victim threatened to expose publicly."
                ],
                evidence: "Evidence pointed to tampering with the victim’s car brakes, which were traced to parts James had recently purchased.",
                alibi: "Claimed he was at home, but phone location data placed him near the crash site at the time of the incident.",
                eyewitness: "A trucker passing the scene recognized James’s vehicle parked at a nearby diner, only moments before the crash occurred.",
                mental_state: "Seemed genuinely heartbroken over the crash but became increasingly defensive when questioned about his involvement in the tampering."
            },
            {
                name: "Laura Evans",
                relation: "Coworker",
                motives: [
                    "Anger toward the victim for receiving the promotions Laura felt she deserved.",
                    "A secret affair with the victim, which the husband had recently uncovered, creating a volatile situation."
                ],
                evidence: "Evidence of forced braking at the crash site, consistent with an attempt to cause a collision, which Laura had the technical knowledge to manipulate.",
                alibi: "Claimed she was at home, but security footage from her office building showed her leaving late that night and never returning to her apartment.",
                eyewitness: "A witness reported seeing a car similar to Laura’s following the victim just moments before the crash.",
                mental_state: "Affected but remained cool-headed throughout questioning, showing a lack of empathy for the situation."
            },
            {
                name: "Henry Peterson",
                relation: "Old School Friend",
                motives: [
                    "Years of bitterness after the victim betrayed him in a business partnership, leaving Henry financially crippled.",
                    "The victim’s successful career and personal achievements constantly reminded Henry of his failures."
                ],
                evidence: "Tire marks at the scene matched Henry’s vehicle, and forensic analysis confirmed that his car had been near the crash.",
                alibi: "Claimed to have been at home alone, but inconsistencies in his phone’s GPS data contradicted this claim.",
                eyewitness: "Multiple witnesses reported seeing Henry’s car parked by the crash site shortly before the crash.",
                mental_state: "Highly nervous, struggling to control his temper, and avoiding direct answers when questioned."
            },
            {
                name: "Sophia Williams",
                relation: "Victim’s Business Partner",
                motives: [
                    "A recent heated argument over the victim’s plans to dissolve their business partnership.",
                    "Personal feud after the victim tried to take full control of the business."
                ],
                evidence: "Evidence that the victim’s car had been tampered with, and Sophia’s fingerprints were found near the brake line.",
                alibi: "Claimed to have been at a business meeting, but her location was unverified during the time of the crash.",
                eyewitness: "A trucker passing by recalled seeing Sophia’s car near the scene just before the crash.",
                mental_state: "Sophia appeared calm but noticeably tense when questioned about her involvement in the crash."
            },
            {
                name: "Benjamin Clark",
                relation: "Old Friend of the Victim",
                motives: [
                    "Feelings of betrayal after the victim abruptly ended their longstanding friendship over a personal matter.",
                    "Anger over being cut out of an important business deal that the victim had been working on."
                ],
                evidence: "Tire marks found at the scene matched the vehicle registered to Benjamin.",
                alibi: "Claimed to be at home watching television, but no one can confirm his whereabouts.",
                eyewitness: "A witness reported seeing Benjamin’s car near the accident site moments before the crash occurred.",
                mental_state: "Defensive and reluctant to discuss the nature of his relationship with the victim."
            }
        ],
    },
    {
        crime_scene: "Kidnapping of a Child",
        killer: "Edward Johnson",
        suspects: [
            {
                name: "Edward Johnson",
                relation: "Uncle",
                motives: [
                    "Financial desperation and a mounting gambling debt that Edward tried to conceal from his family.",
                    "A belief that the child’s family owed him for past favors, and Edward wanted to claim control over them."
                ],
                evidence: "Evidence of duct tape and rope found at Edward’s home, which were consistent with the method of restraint used in the kidnapping.",
                alibi: "Claimed he was out of town on business, but neighbors reported seeing him leave the area around the time of the kidnapping.",
                eyewitness: "A witness recalled seeing Edward’s vehicle near the victim’s house late at night before the kidnapping was discovered.",
                mental_state: "Defensive and increasingly aggressive during questioning, showing signs of guilt."
            },
            {
                name: "Olivia Martin",
                relation: "Former Babysitter",
                motives: [
                    "Upset after being dismissed from her babysitting job, Olivia felt humiliated and wanted revenge.",
                    "Olivia believed the family owed her compensation for time spent caring for the child, and she saw the kidnapping as a way to get attention."
                ],
                evidence: "A bag containing the child’s belongings was found in Olivia’s apartment, and it contained items that were unique to the family.",
                alibi: "Claimed to have been at home with friends, but no one could confirm her whereabouts during the critical time.",
                eyewitness: "A neighbor recalled seeing Olivia near the family’s house the evening before the child disappeared.",
                mental_state: "Nervous but persistent, Olivia seemed emotionally detached when questioned about her relationship with the child."
            },
            {
                name: "Mark Davis",
                relation: "Family Friend",
                motives: [
                    "Anger over past conflicts with the family, particularly the victim’s dad, who had publicly humiliated Mark.",
                    "Financial troubles that led Mark to consider drastic actions, including kidnapping for ransom."
                ],
                evidence: "Ropes found at Mark’s home matched those used to tie the child.",
                alibi: "Claimed to have been at a friend’s party, but no one could verify his attendance.",
                eyewitness: "The child’s parents reported seeing Mark’s car parked outside their house on the night of the kidnapping.",
                mental_state: "Appeared calm but indirect, with no clear explanation for his presence near the victim’s house."
            },
            {
                name: "Megan Clark",
                relation: "Neighbor",
                motives: [
                    "Megan had been secretly envious of the attention the victim’s family received from the community. She harbored anger after being excluded from a neighborhood event.",
                    "Megan’s financial struggles made her desperate, and she saw the opportunity to kidnap the child for ransom as a way out."
                ],
                evidence: "A set of gloves with fibers matching those found at the crime scene were linked to Megan.",
                alibi: "Claimed to have been out shopping, but a store receipt shows she wasn’t at the store at the time of the kidnapping.",
                eyewitness: "A neighbor saw Megan’s car parked near the victim’s house around the time of the disappearance.",
                mental_state: "Appeared calm and collected but grew defensive when questioned about her whereabouts and the ransom."
            },
            {
                name: "Samuel Wright",
                relation: "Family Friend",
                motives: [
                    "Unresolved anger over a past family dispute involving money.",
                    "Samuel believed that the family owed him compensation for his years of loyalty, and kidnapping the child would make them pay."
                ],
                evidence: "A bag containing the child’s items was found at Samuel’s house, further linking him to the crime.",
                alibi: "Claimed to have been at work, but security cameras show him leaving early on the night of the kidnapping.",
                eyewitness: "A delivery driver remembered seeing Samuel’s car parked near the victim’s house late at night.",
                mental_state: "Calm but vague, his answers seemed rehearsed when questioned about the kidnapping."
            }
        ],
    }
];

const probabilityData = [
    { name: "motive", trueProbability: 0.75, falseProbability: 0.25 },
    { name: "evidence", trueProbability: 0.8, falseProbability: 0.2 },
    { name: "alibi", trueProbability: 0.7, falseProbability: 0.3 },
    { name: "eyewitness", trueProbability: 0.7, falseProbability: 0.3 },
    { name: "mental_state", trueProbability: 0.65, falseProbability: 0.35 }
];

// const seedData = async () => {
//     try {
//         await connectDB();

//         await Case.insertMany(caseData);
//         console.log("Cases data seeded successfully");

//         await Probability.insertMany(probabilityData);
//         console.log("Probability data seeded successfully");

//         process.exit();
//     } catch (err) {
//         console.error(err);
//         process.exit(1);
//     }
// };

// seedData();