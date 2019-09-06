
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



  ["(the\\s)?(apex|top) court","SC"],
  ["(goods (&|and) service[s]? tax)","GST"],
  ["(headed by NGT chairperson (Justice\\s)?Adarsh Kumar Goel )",""],
  ["(the\\s)?(Infrastructure Leasing & Financial Services( Ltd)?(\\s?\\(IL&FS\\))?)","IL&FS"],
  ["(the\\s)?Reserve Bank of India(\\s?\\(RBI\\))?","RBI"],
  ["(the\\s)?\\belection commission( of india)?","EC"],
  ["(the\\s)?additional chief metrapolitan magistrate(\\s?\\(ACMM\\))?","ACMM"],
  ["(the\\s)?advocate on record(\\s?\\(AoR\\))?","AoR"],
  ["(the\\s)?all india muslim personal law board(\\s?\\(AIMPLB\\))?","AIMPLB"],
  ["(the\\s)?amma makkal munnetra kazhagam(\\s?\\(party\\))?","AMMK party"],
  ["(the\\s)?Anti[-\\s]Terrorism Squad(\\s?\\(ATS\\))?","ATS"],
  ["arbitration and conciliation act(, 1996 \\(?arbitration act\\)?)?","Arbitration Act"],
  ["(the\\s)?armed forces tribunal(\\s?\\(AFT\\))?","AFT"],
  ["(the\\s)?bar council of india(\\s?\\(BCI\\))?","BCI"],
  ["(the\\s)?bharatiya janata party(\\s?\\(BJP\\))?","BJP"],
  ["(the\\s)?Central Administrative Tribunal(\\s?\\(CAT\\))?","CAT"],
  ["(the\\s)?central adoption resource information and guidance system(\\s?\\(CARIGS\\))?","CARIGS"],
  ["(the\\s)?Central Board of Direct Taxes(\\s?\\(CBDT\\))?","CBDT"],
  ["(the\\s)?central board of indirect taxes and customs(\\s?\\(CBIC\\))?","CBIC"],
  ["(the\\s)?central bureau of investigation(\\s?\\(CBI\\))?","CBI"],
  ["(the\\s)?central information commission(\\s?\\(CIC\\))?","CIC"],
  ["(the\\s)?Central Pollution Control Board(\\s?\\(CPCB\\))?","CPCB"],
  ["(the\\s)?Central Teacher Eligibility Test(\\s?\\(CTET\\))?","CTET"],
  ["(the\\s)?chief information commissioner(\\s?\\(CIC\\))?","CIC"],
  ["(the\\s)?chief judicial magistrate(\\s?\\(CJM\\))?","CJM"],
  ["(the\\s)?chief justice gogoi","CJI"],
  ["(the\\s)?chief justice of india ranjan gogoi","CJI"],
  ["(the\\s)?chief justice of india","CJI"],
  ["(the\\s)?chief justice ranjan gogoi","CJI"],
  ["(the\\s)?Chief Justice","CJ"],
  ["(the\\s)?chief metropolitan magistrate(\\s?\\(CMM\\))?","CMM"],
  ["(the\\s)?chief minister(\\s?\\(CM\\))?","CM"],
  ["(the\\s)?civil procedure code(\\s?\\(CPC\\))?","CPC"],
  ["cji ranjan gogoi","CJI Gogoi"],
  ["code of civil procedure","CPC"],
  ["code of criminal procedure(\\s?\\(CrPC\\))?","CrPC"],
  ["(the\\s)?committee of administrators(\\s?\\(CoA\\))?","CoA"],
  ["(the\\s)?Common Law Admission Test(\\s?\\(CLAT\\))?","CLAT"],
  ["court recently","court"],
  ["Cr\\.?\\s*P\\.?\\s*C\\.?","CrPC"],
  ["criminal procedure code(\\s?\\(CrPC\\))?","CrPC"],
  ["(the\\s)?Customs,? Excise (and|&) Service Tax Appellate Tribunal(\\s?\\(CESTAT\\))?","CESTAT"],
  ["debts due to banks and financial institutions act(\\s?\\(RDDBFI Act\\))?","RDDBFI Act"],
  ["(the\\s)?debts recovery tribunal(\\s?\\(DRT\\))?","DRT"],
  ["(the\\s)?delhi commission for women(\\s?\\(DCW\\))?","DCW"],
  ["(the\\s)?delhi development authority(\\s?\\(DDA\\))?","DDA"],
  ["(the\\s)?Delhi Metro Rail Corporation(\\s?\\(DMRC\\))?","DMRC"],
  ["(the\\s)?Delhi Transport Department(\\s?\\(DTD\\))?","DTD"],
  ["(the\\s)?delhi women's commission(\\s?\\(DCW\\))?","DCW"],
  ["(the\\s)?delimitation commission of india(\\s?\\(DCI\\))?","DCI"],
  ["(the\\s)?department of telecom(\\s?\\(DoT\\))?","DoT"],
  ["(the\\s)?director general of police(\\s?\\(DGP\\))?","DGP"],
  ["(the\\s)?drug technical advisory board(\\s?\\(DTAB\\))?","DTAB"],
  ["(the\\s)?economically weaker section(\\s?\\(EWS\\))?","EWS"],
  ["(the\\s)?electronic voting machine(\\s?\\(EVM\\))?","EVM"],
  ["employees state insurance act(, 1948 \\(?esi act\\)?)?","ESI Act"],
  ["(the\\s)?enforcement directorate(\\s?\\(ED\\))?","ED"],
  ["(the\\s)?Environment Pollution Control Authority(\\s?\\(EPCA\\))?","EPCA"],
  ["(the\\s)?Film and Television Institute of India(\\s?\\(FTII\\))?","FTII"],
  ["(the\\s)?fixed drug combination(\\s?\\(FDC\\))?","FDC"],
  ["(the\\s)?Foreign Contributions Regulation Act(\\s?\\(FCRA\\))?","FCRA"],
  ["(the\\s)?gujarat national law university(\\s?\\(GNLU\\))?","GNLU"],
  ["(the\\s)?high court","HC"],
  ["(the\\s)?Income Tax Appellate Tribunal(\\s?\\(ITAT\\))?","ITAT"],
  ["(the\\s)?Income(-|\\s)?Tax(\\s?\\(I(-)?T\\))?","I-T"],
  ["indian penal code(\\s?\\(IPC\\))?","IPC"],
  ["(the\\s)?insolvency (&|and) bankruptcy code(\\s?\\(ibc\\))?","IBC"],
  ["(the\\s)?Insolvency and Bankruptcy Board of India(\\s?\\(IBBI\\))?","IBBI"],
  ["(the\\s)?insurance regulatory and development authority(\\s?\\(IRDA\\))?","IRDA"],
  ["(the\\s)?international centre for alternative dispute resolution(\\s?\\(ICADR\\))?","ICADR"],
  ["(the\\s)?international cricket council(\\s?\\(ICC\\))?","ICC"],
  ["jammu & kashmir(\\s?\\(J&K\\))?","J&K"],
  ["jammu and kashmir(\\s?\\(J&K\\))?","J&K"],
  ["(the\\s)?jharkhand state bar council(\\s?\\(JSBC\\))?","JSBC"],
  ["(the\\s)?lok sabha","LS"],
  ["Madhya Pradesh(\\s?\\(MP\\))?","MP state"],
  ["maharashtra control of organised crimes act(\\s?\\(MCOC Act\\))?","MCOC Act"],
  ["(the\\s)?ministry of corporate affairs(\\s?\\(MCA\\))?","MCA"],
  ["(the\\s)?ministry of defence(\\s?\\(MD\\))?","MD"],
  ["(the\\s)?ministry of health & welfare(\\s?\\(MHW\\))?","MHW"],
  ["(the\\s)?ministry of home affairs(\\s?\\(MHA\\))?","MHA"],
  ["(the\\s)?minitsry of environment and forests and climate change(\\s?\\(MEFCC\\))?","MEFCC"],
  ["(the\\s)?model code of conduct(\\s?\\(MCC\\))?","MCC"],
  ["(the\\s)?national company law appellate tribunal(\\s?\\(NCLAT\\))?","NCLAT"],
  ["(the\\s)?national company law tribunal(\\s?\\(NCLT\\))?","NCLT"],
  ["(the\\s)?national consumer disputes redressal commission(\\s?\\(NCDRC\\))?","NCDRC"],
  ["(the\\s)?national green tribunal(\\s?\\(NGT\\))?","NGT"],
  ["(the\\s)?national highways authority of india(\\s?\\(NHAI\\))?","NHAI"],
  ["(the\\s)?national human rights commission(\\s?\\(NHRC\\))?","NHRC"],
  ["(the\\s)?National Investigation Agency(\\s?\\(NIA\\))?","NIA"],
  ["(the\\s)?National Law School of India University(\\s?\\(NLSIU\\))?","NLSIU"],
  ["(the\\s)?national register of citizens(\\s?\\(NRC\\))?","NRC"],
  ["(the\\s)?national stock exchange(\\s?\\(NSE\\))?","NSE"],
  ["negotiable instruments act(\\s?\\(NI Act\\))?","NI Act"],
  ["(the\\s)?new delhi international arbitration centre(\\s?\\(NDIAC\\))?","NDIAC"],
  ["(the\\s)?new delhi municipal council(\\s?\\(NDMC\\))?","NDMC"],
  ["(the\\s)?non[\\-\\s]banking finance compan(ie|y)(\\s?(\\(?NBFC\\)?))?","NBFC"],
  ["(the\\s)?pension fund regulatory and development authority","PFRDA"],
  ["(the\\s)?petroleum and natural gas board(\\s?\\(PNGRB\\))?","PNGRB"],
  ["pre-conception and pre-natal diagnostic techniques (\\(prohibition of sex selection\\) )?act(, 1994)?","PCPNDT Act"],
  ["prevention of corruption act(\\s?\\(PC Act\\))?","PC Act"],
  ["(the\\s)?prevention of money laundering act(\\s?\\(PMLA\\))?","PMLA"],
  ["prime minister(\\s?\\(PM\\))?","PM"],
  ["protection of children from sexual offen[cs]es(\\s?\\(POCSO\\))?","POCSO"],
  ["(the\\s)?public interest litigation(\\s?\\(PIL\\))?","PIL"],
  ["(the\\s)?public service commission(\\s?\\(PSC\\))?","PSC"],
  ["(the\\s)?punjab land preservation act(\\s?\\(PLPA\\))?","PLPA"],
  ["(the\\s)?quality council of india(\\s?\\(QCI\\))?","QCI"],
  ["(the\\s)?rajiv gandhi national university of law(\\s?\\(RGNUL\\))?","RGNUL"],
  ["(the\\s)?rajya sabha","RS"],
  ["(the\\s)?real estate(\\s?\\(?regulation and development\\))? act(\\s?\\(RERA\\))?","RERA"],
  ["(the\\s)?resolution professional(\\s?\\(rp\\))?","RP"],
  ["(the\\s)?right to information(\\s?\\(RTI\\))?","RTI"],
  ["(the\\s)?sc advocates[\\s|-]?on[\\s|-]?record association(\\s?\\(SCAORA\\))?","SCAORA"],
  ["(the\\s)?scheduled caste(\\s?\\(SC\\))?","SC"],
  ["(the\\s)?scheduled tribe(\\s?\\(ST\\))?","ST"],
  ["(the\\s)?securities (and|&) exchanges? board of india(\\s?\\(sebi\\))?","SEBI"],
  ["(the\\s)?securities appellate tribunal(\\s?\\(SAT\\))?","SAT"],
  ["(the\\s)?Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest(\\s?\\(SARFAESI\\))?","SARFAESI"],
  ["(the\\s)?smuggling and foreign exchange manipulators act(\\s?\\(SAFEMA\\))?","SAFEMA"],
  ["(the\\s)?State Consumer Disputes Redressal Commission(\\s?\\(SCDRC\\))?","SCDRC"],
  ["(the\\s)?State Pollution Control Board(\\s?\\(SPCB\\))?","SPCB"],
  ["(the\\s)?supreme court( of\\sindia)?","SC"],
  ["(the\\s)?telecom regulatory authority of india(\\s?\\(TRAI\\))?","TRAI"],
  ["(the\\s)?unique identification authority of india(\\s?\\(UIDAI\\))?","UIDAI"],
  ["(the\\s)?Uttar Pradesh(\\s?\\(UP\\))?","UP state"],
  ["(the\\s)?Voter Verified Paper Audit Trail(\\s?\\(VVPAT\\))?","VVPAT"],
  ["(the\\s)?west bengal housing industry regulation act(\\s?\\(WBHIRA\\))?","WBHIRA"],
  ["(the\\s)?Competition Commission of India(\\s?\\(CCI\\))?","CCI"],
  ["(the\\s)?(Housing Development (and|&) Infrastructure Ltd(\\s?\\(HDIL\\))?)","HDIL"],
  ["(the\\s)?Uniform Civil Code(\\s?\\(UCC\\))?","UCC"],
  ["(the\\s)?committee of creditors(\\s?\\(CoC\\))?","CoC"],
  ["(the\\s)?Housing and Urban Development Corporation(\\s?\\(HUDCO\\))?","HUDCO"],
  ["(the\\s)?Financial Action Task Force(\\s?\\(FATF\\))?","FATF"],
  ["(the\\s)?I[-]?T Returns(\\s?\\(ITR\\))?","ITR"],
  ["(the\\s)?interim RP(\\s?\\(IRP\\))?","IRP"],
  ["under section","U/S"],
  ["in this case ([\\(\\[].*[\\)\\]]),","in a case,"],
  ["former (union\\s)?finance minister\\s",""],
  ["(the\\s)?National Buildings Construction Corporation Limited(\\s?\\(NBCC\\))?","NBCC"],
  ["(the\\s)?Ministry of Human Resources Development(\\s?\\(MHRD\\))?","MHRD"],
  ["(the\\s)?Special Investigation Team(\\s?\\(SIT\\))?","SIT"],
  ["(the\\s)?Serious Fraud Investigation Office(\\s?\\(SFIO\\))?","SFIO"],
  ["(the\\s)?Insurance Regulatory Development Authority of India(\\s?\\(IRDAI\\))?","IRDAI"],
  ["(the\\s)?ministry of environment, forest and climate change(\\s?\\(MoEFCC\\))?","MoEFCC"],
  ["(the\\s)?Common Effluent Treatment Plant(\\s?\\(CETP\\))?","CETP"],

  

  ["([NB]SE[\\s\\.\\d-]+%)",""],               // The Hindu (N/B)SE % nonsense
  ["(has|have)\\s(up)?held","$2held"],         // 'has/have upheld' into 'upheld'
  ["([HS][C])\\shas","$1"],                    // REMOVE HC or SC "has"
  ["\\.{2,}","."],                             // multiple periods (dots) into one
  [",{2,}\\s*",", "],                          // multiple commas into one
  ["\\s*([\\(\\[\\{])\\s*"," $1"],             // add/corrects space before bracket starts
  ["\\s*([\\)\\]\\}])\\s*","$1 "],             // add/corrects space after  bracket closes
  ["(,\\s*(\\bon)?)\\s*(\\w+day)"," on $3"],   // REMOVE ',' before 'on+weekday' ++++
  ["(\\bon)?\\s*\\w+day((,\\s)|\\s)?"," "],    // REMOVE all ON + weekdays, today, yesterday
  ["(,?\\s\\[?read[a-zA-Z|\\s]+\\]?)$",""],    // REMOVE the last put ,/[ read...
  ["([\\:,\\?\\.])(?!\\s)([a-zA-Z])","$1 $2"], // ADD space after ':,?.' if absent
  ["(\\d)\\s+(\\()","$1$2"],                   // REMOVE spaces between number and '('
  ["\\)\\s+\\(",")("],                         // REMOVE spaces between ')' and next '('
  ["\\s+(\\.)","$1"],                          // REMOVE spaces before period
  ["(\\ba\\b)\\s+([hs]c\\b)","an $2"],         // 'a' into 'an' before HC|SC
  ["HC of ([&\\w]+(\\sPradesh)?)","$1 HC"],    // 'HC of XYZ' into 'XYZ HC'
  ["\\s?per\\s?cent\\s?","% "],                // ' per cent ' into '%'
  ["(\\))\\s*([^a-z0-9])","$1$2"],             // REMOVE spaces between ')' and non-words
  ["(^(?:\\w+)[\\s\\|]*(?:\\w+)?(?!\\/):\\s)",""],         // REMOVE reporting city
];
