
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
var NeedToUndo = false;
var GlobalNewsArray = [];
GlobalNewsArray = [
  ["full form","short"],
  ["^(:|\\.|,|\\))[\\s{0,}]?",""],         // beginning correction: no/multiple white-spaces before and after colon, comma, period, closing bracket
  ["\\s{1,}(:|\\.|,|\\))[\\s{0,}]?","$1 "],   // no/multiple white-spaces before and after colon, comma, period, closing bracket
  ["additional chief metrapolitan magistrate","ACMM"],
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
  ["election commission of india","EC"],
  ["election commission","EC"],
  ["enforcement directorate","ED"],
  ["fixed drug combination","FDC"],
  ["goods & services tax","GST"],
  ["goods and services tax","GST"],
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
  ["ministry of corporate affairs","MoCA"],
  ["ministry of defence","MoD"],
  ["ministry of health & welfare","MoHW"],
  ["ministry of home affairs","MoHA"],
  ["minitsry of environment and forests and climate change","MoEFCC"],
  ["national register of citizens","NRC"],
  ["national company law appellate tribunal","NCLAT"],
  ["national company law tribunal","NCLT"],
  ["national consumer disputes redressal commission","NCDRC"],
  ["national green tribunal","NGT"],
  ["national human rights commission","NHRC"],
  ["new delhi international arbitration centre","NDIAC"],
  ["new delhi municipal council","NDMC"],
  ["pension fund regulatory and development authority","PFRDA"],
  ["petroleum and natural gas board","PNGRB"],
  ["Prevention of Corruption Act","PC Act"],
  ["Prevention of Money Laundering Act","PMLA"],
  ["prime minister","PM"],
  ["protection of children from sexual offences","POCSO"],
  ["protection of children from sexual offenses","POCSO"],
  ["public interest litigation","PIL"],
  ["public service commission","PSC"],
  ["punjab land preservation act","PLPA"],
  ["quality council of india","QCI"],
  ["rajya sabha","RS"],
  ["real estate (regulation and development) act","RERA"],
  ["real estate regulation and development act","RERA"],
  ["right to information","RTI"],
  ["scheduled caste","SC"],
  ["scheduled tribe","ST"],
  ["securities and exchange board of india","SEBI"],
  ["securities and exchanges board of india","SEBI"],
  ["securities appellate tribunal","SAT"],
  ["smuggling and foreign exchange manipulators act","SAFEMA"],
  ["supreme court","SC"],
  ["telecom regulatory authority of india","TRAI"],
  ["unique identification authority of india","UIDAI"],
  ["west bengal housing industry regulation act","WBHIRA"],
  ["electronic voting machine","EVM"],
  ["rajiv gandhi national university of law","RGNUL"],
  ["Central Information Commission","CIC"],
  ["(apex|top) court","SC"],



  ["(^(?:\\w+)\\s?(?:\\w+)?:\\s)",""],  // remove reporting city
  ["\\.{2,}","\."],                     // multiple periods (dots) into one
  ["(?:[\\s]?)\\(([A-Z|&]*)\\)",""],    // removes in bracket if NOT space | numeric
  ["(?:on)\\s[a-zA-Z]+day,?\\s?",""],   // removing weekdays
  ["\\s[a-zA-Z]+day",""],               // removing today yesterday
  ["\\s\\[read[a-zA-Z|\\s]+]",""],      // removing [READ ORDER]
  [",\\sread[a-zA-Z|\\s]+",""],          // removing ', read xyz'
  ["\\.(?!\\s)","\. "],                 // adding space after period if absent


];
