
/*! *****************************************************
*   COLORS
****************************************************** */
var erMsgColor = '#FFE6F6EE';
var okMsgColor = '#E6FFA6EE';
var wrMsgColor = '#F5DA81FF';


/*! *****************************************************
*   CATEGORY
****************************************************** */
var CatMapArray = [];
CatMapArray = [
  [49, 1],
  [50, 2],
  [51, 3],
  [52, 4],
  [53, 5],
  [54, 6],
  [55, 7],
  [56, 8],
  [57, 12],
  [48, 13]
];

/*! *****************************************************
*   GALLERY
****************************************************** */
var IsGalleryManaged = false;


/*! *****************************************************
*   ABBREVIATIONS
****************************************************** */
var NeedToUndo      = false;
var GlobalNewsArray = [];
GlobalNewsArray     = [
  ["full form","short"],
  ["^(:|\\.|,|\\))\\s*",""],         // beginning correction: no/multiple white-spaces before and after colon, comma, period, closing bracket
  ["\\s+(:|\\.|,|\\))\\s*","$1 "],   // no/multiple white-spaces before and after colon, comma, period, closing bracket
  ["(\\d{2})\\.(\\d{2})\\.(\\d{4})","$1-$2-$3"],   // making dates separated by dash instead of period 



  ["(apex|top) court","SC"],
  ["additional chief metrapolitan magistrate","ACMM"],
  ["advocate on record","AoR"],
  ["arbitration and conciliation act(, 1996 \\(?arbitration act\\)?)?","Arbitration Act"],
  ["bharatiya janata party","BJP"],
  ["cji ranjan gogoi","CJI Gogoi"],
  ["central board of indirect taxes and customs","CBIC"],
  ["central information commission","CIC"],
  ["chief metropolitan magistrate","CMM"],
  ["delhi development authority","DDA"],
  ["employees state insurance act(, 1948 \\(?esi act\\)?)?","ESI Act"],
  ["national highways authority of india","NHAI"],
  ["national stock exchange","NSE"],
  ["negotiable instruments act","NI Act"],
  ["prevention of corruption act","PC Act"],
  ["prevention of money laundering act","PMLA"],
  ["reserve bank of india","RBI"],
  ["sc advocates[\\s|-]?on[\\s|-]?record association\\s?(\\(?scaora\\)?)?","SCAORA"],
  ["all india muslim personal law board","AIMPLB"],
  ["amma makkal munnetra kazhagam","AMMK party"],
  ["armed forces tribunal","AFT"],
  ["bar council of india","BCI"],
  ["central adoption resource information and guidance system","CARIGS"],
  ["central bureau of investigation","CBI"],
  ["chief information commissioner","CIC"],
  ["chief judicial magistrate","CJM"],
  ["chief justice gogoi","CJI"],
  ["chief justice of india ranjan gogoi","CJI"],
  ["chief justice of india","CJI"],
  ["chief justice ranjan gogoi","CJI"],
  ["chief minister","CM"],
  ["code of civil procedure","CPC"],
  ["civil procedure code","CPC"],
  ["code of criminal procedure","CrPC"],
  ["committee of administrators","CoA"],
  ["court recently","court"],
  ["criminal procedure code","CrPC"],
  ["debts due to banks and financial institutions act","RDDBFI Act"],
  ["debts recovery tribunal","DRT"],
  ["delhi commission for women","DCW"],
  ["delhi women's commission","DCW"],
  ["delimitation commission of india","DCI"],
  ["department of telecom","DoT"],
  ["director general of police","DGP"],
  ["drug technical advisory board","DTAB"],
  ["economically weaker section","EWS"],
  ["\\belection commission( of india)?","EC"],
  ["electronic voting machine","EVM"],
  ["enforcement directorate","ED"],
  ["fixed drug combination","FDC"],
  ["(goods (&|and) service[s]? tax)","GST"],
  ["gujarat national law university","GNLU"],
  ["high court","HC"],
  ["income tax appellate tribunal","ITAT"],
  ["indian penal code","IPC"],
  ["insolvency & bankruptcy code","IBC"],
  ["insolvency and bankruptcy code","IBC"],
  ["insurance regulatory and development authority","IRDA"],
  ["international centre for alternative dispute resolution","ICADR"],
  ["international cricket council","ICC"],
  ["jammu & kashmir","J&K"],
  ["jammu and kashmir","J&K"],
  ["jharkhand state bar council","JSBC"],
  ["lok sabha","LS"],
  ["maharashtra control of organised crimes act","MCOC Act"],
  ["ministry of corporate affairs","MCA"],
  ["ministry of defence","MD"],
  ["ministry of health & welfare","MHW"],
  ["ministry of home affairs","MHA"],
  ["minitsry of environment and forests and climate change","MEFCC"],
  ["national company law appellate tribunal","NCLAT"],
  ["national company law tribunal","NCLT"],
  ["national consumer disputes redressal commission","NCDRC"],
  ["national green tribunal","NGT"],
  ["national human rights commission","NHRC"],
  ["national register of citizens","NRC"],
  ["new delhi international arbitration centre","NDIAC"],
  ["new delhi municipal council","NDMC"],
  ["pension fund regulatory and development authority","PFRDA"],
  ["petroleum and natural gas board","PNGRB"],
  ["prime minister","PM"],
  ["protection of children from sexual offen[cs]es","POCSO"],
  ["public interest litigation","PIL"],
  ["public service commission","PSC"],
  ["punjab land preservation act","PLPA"],
  ["quality council of india","QCI"],
  ["rajiv gandhi national university of law","RGNUL"],
  ["rajya sabha","RS"],
  ["real estate \\(?regulation and development\\)? act","RERA"],
  ["right to information","RTI"],
  ["scheduled caste","SC"],
  ["scheduled tribe","ST"],
  ["securities (and|&) exchanges? board of india(\\s\\(sebi\\))?","SEBI"],
  ["securities appellate tribunal","SAT"],
  ["smuggling and foreign exchange manipulators act","SAFEMA"],
  ["supreme court","SC"],
  ["telecom regulatory authority of india","TRAI"],
  ["unique identification authority of india","UIDAI"],
  ["west bengal housing industry regulation act","WBHIRA"],
  ["model code of conduct","MCC"],
  ["national law school of india university","NLSIU"],
  ["pre-conception and pre-natal diagnostic techniques (\\(prohibition of sex selection\\) )?act(, 1994)","PCPNDT Act"],
  ["Anti[-\\s]Terrorism Squad","ATS"],
  ["National Investigation Agency","NIA"],
  ["State Consumer Disputes Redressal Commission","SCDRC"],
  ["(Infrastructure Leasing & Financial Services( Ltd)?)","IL&FS"],
  ["Central Teacher Eligibility Test","CTET"],
  ["Central Board of Direct Taxes","CBDT"],
  ["Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest","SARFAESI"],
  ["Cr\\.\\s?P\\.\\s?C\\.","CrPC"],
  ["non[\\-\\s]banking finance compan(ie|y)","NBFC"],
  ["Common Law Admission Test","CLAT"],
  ["Voter Verified Paper Audit Trail","VVPAT"],
  ["Central Pollution Control Board","CPCB"],
  ["State Pollution Control Board","SPCB"],
  ["Chief Justice","CJ"],
  ["Customs,? Excise (and|&) Service Tax Appellate Tribunal(\\s\\(CESTAT\\))?","CESTAT"],
  ["Central Administrative Tribunal(\\s\\(CAT\\))?","CAT"],
  ["Foreign Contributions Regulation Act(\\s\\(FCRA\\))?","FCRA"],
  ["(has|have)\\s(up)?held","$2held"],
  ["([NB]SE[\\s\\.\\d-]+%)",""],
  ["Uttar Pradesh","UP"],
  ["Madhya Pradesh","MP"],
  ["--------------- anything you need to add ---------------","SHORT-FORM"],





  ["([HS][C])\\shas","$1"],                    // removes HC or SC "has"
  ["(^(?:\\w+)\\s?(?:\\w+)?:\\s)",""],         // remove reporting city
  ["\\.{2,}","\."],                            // multiple periods (dots) into one
  [",{2,}\\s{1,}?",", "],                      // multiple commas into one
  ["\\s*([\\(\\[\\{])\\s*"," $1"],             // add/corrects space before bracket starts
  ["\\s*([\\)\\]\\}])\\s*","$1 "],             // add/corrects space after  bracket closes
  ["(?:\\s?)(\\([&A-Z]+\\))",""],              // removes following abbr if contains chars or '&'
  ["(,\\s)?\\bon\\s\\w+day,?\\s?",""],         // removing 'on weekdays'
  ["\\s[a-zA-Z]+day",""],                      // removing all weekdays, today, yesterday
  ["(,?\\s\\[?read[a-zA-Z|\\s]+\\]?)$",""],    // removing the last put ,/[ read...
  ["([\\:,\\?\\.])(?!\\s)([a-zA-Z])","$1 $2"], // adding space after comma, ? and period, if absent
  ["\\b([A-Z])[\\s]([A-Z])\\b","$1$2"],        // removing space between two uppercase Chars, if present
  ["(\\d)\\s+(\\()","$1$2"],                   // remove spaces between number and starting bracket
  ["\\)\\s+\\(",")("],                         // remove spaces between closing starting bracket
  ["\\s+(\\.)","."],                           // remove spaces before period

  ["(\\))\\s*(\\W)","$1$2"],                   // trying to remove spaces between ')' and non-words

  ["(\\ba\\b)\\s+([hs]c\\b)","an $2"],         // convert a into an before HC|SC
  ["(?:in the) HC of (\\w+(\\sPradesh)?)","in the $1 HC"],

];
