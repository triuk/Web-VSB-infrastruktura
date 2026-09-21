const data = [
  {
    area:"Mikroskopie a zobrazování",
    device:"Vysokorozlišovací SEM",
    model:"Thermo Fisher Scientific Verios 5 UC",
    use:"Vysokorozlišovací morfologická a strukturní analýza materiálů; topografie a materiálový kontrast; STEM zobrazení; EDS chemická analýza a mapování; automatické mapování větších oblastí.",
    person:"Jan Schäfer",
    web:"https://mel.vsb.cz/infrastruktura/?category=microscopy",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_2.pdf"
  },
  {
    area:"Mikroskopie a zobrazování",
    device:"FIB-SEM DualBeam",
    model:"Thermo Fisher Scientific Helios 5 CX Dual Beam",
    use:"SEM zobrazování a opracování vzorku Ga iontovým svazkem; příprava tenkých lamel pro TEM; 3D analýza postupným odřezáváním; EDS chemické mapování a EBSD krystalografická analýza.",
    person:"Jan Schäfer",
    web:"https://mel.vsb.cz/infrastruktura/?category=microscopy",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_6.pdf"
  },
  {
    area:"Povrchová a strukturní analýza",
    device:"Rentgenová prášková difrakce (XRD)",
    model:"Malvern Panalytical Empyrean Series 3",
    use:"Identifikace a kvantifikace krystalických fází, velikost krystalitů a mikrodeformace; analýza tenkých vrstev a nanostruktur; SAXS/VSAXS, XRR a grazing-incidence měření; operando sledování baterií.",
    person:"S. M. Hossein Hejazi",
    web:"https://mel.vsb.cz/infrastruktura/?category=surface",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_3.pdf"
  },
  {
    area:"Povrchová a strukturní analýza",
    device:"Rentgenová fotoelektronová spektroskopie (XPS)",
    model:"Thermo Scientific Nexsa G2",
    use:"Prvkové složení povrchu, chemické a oxidační stavy a chemické vazby; prostorově lokalizovaná povrchová analýza; iontové odprašování a hloubkové profilování; UPS.",
    person:"Zdeněk Baďura",
    web:"https://mel.vsb.cz/infrastruktura/?category=surface",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_4.pdf"
  },
  {
    area:"Spektroskopie",
    device:"EPR spektrometr",
    model:"Bruker ELEXSYS E500",
    use:"Detekce a charakterizace systémů s nepárovými elektrony: radikály, paramagnetická kovová centra, spinové značky a defekty materiálů; mechanistické studium radikálových reakcí.",
    person:"Zdeněk Baďura",
    web:"https://mel.vsb.cz/infrastruktura/?category=spectroscopy",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_5.pdf"
  },
  {
    area:"Spektroskopie",
    device:"Výzkumný fluorimetr",
    model:"Edinburgh Instruments FLS1000",
    use:"Stacionární i časově rozlišená fotoluminiscence; emisní a excitační spektra; doby života; absolutní kvantový výtěžek; výzkum nanomateriálů, fotokatalyzátorů a hybridních systémů.",
    person:"Lukáš Zdražil",
    web:"https://mel.vsb.cz/infrastruktura/?category=spectroscopy",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_8.pdf"
  },
  {
    area:"Spektroskopie",
    device:"FTIR + DRIFTS reakční cela",
    model:"Model na webu MEL neuveden",
    use:"Vibrační spektroskopie prášků, porézních materiálů a katalyzátorů; povrchová chemie, adsorpce a reakční mechanismy; in situ/operando měření v řízených atmosférách nebo vakuu.",
    person:"Štěpán Kment",
    web:"https://mel.vsb.cz/infrastruktura/?category=spectroscopy",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_14.pdf"
  },
  {
    area:"Spektroskopie",
    device:"Konfokální Ramanův mikroskop",
    model:"Model na webu MEL neuveden",
    use:"Nedestruktivní chemická a strukturní mikroanalýza; identifikace fází a chemické heterogenity; bodová analýza, rychlé mapování, hloubkové profily a 2D/3D Ramanovo mapování.",
    person:"Aristeidis Bakandritsos",
    web:"https://mel.vsb.cz/infrastruktura/?category=spectroscopy",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_15.pdf"
  },
  {
    area:"Bioanalytika",
    device:"Průtokový cytometr",
    model:"BD FACSLyric",
    use:"Multiparametrická průtoková cytometrie buněk a částic; rozlišení populací podle rozptylu a fluorescence; detekce vzácných nebo slabě fluoreskujících populací.",
    person:"Tomáš Malina",
    web:"https://mel.vsb.cz/infrastruktura/?category=bioanalytical",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_7.pdf"
  },
  {
    area:"Chromatografie a hmotnostní spektrometrie",
    device:"LC-QTOF",
    model:"Agilent 1290 Infinity II HPLC + Agilent 6530 QTOF",
    use:"Separace a vysokorozlišovací MS identifikace komplexních kapalných směsí; farmaceutické, environmentální a biomolekulární analýzy; kvalitativní a semikvantitativní analýza.",
    person:"Petr Langer",
    web:"https://mel.vsb.cz/infrastruktura/?category=chromatography",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_9.pdf"
  },
  {
    area:"Chromatografie a hmotnostní spektrometrie",
    device:"GC-QTOF",
    model:"Agilent GC 8590 + Agilent 7280 GC-QTOF",
    use:"Identifikace a stanovení těkavých a polotěkavých organických látek; přesná hmotnost, HRMS a MS/MS pro objasnění struktury.",
    person:"Petr Langer",
    web:"https://mel.vsb.cz/infrastruktura/?category=chromatography",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_10.pdf"
  },
  {
    area:"Chromatografie a hmotnostní spektrometrie",
    device:"GC-MS + FID + headspace sampler",
    model:"Konkrétní model na webu MEL neuveden",
    use:"Těkavé a polotěkavé látky v kapalných vzorcích a headspace; VOC, paliva, aromatické látky, pesticidy; MS identifikace a FID kvantifikace.",
    person:"Aristeidis Bakandritsos",
    web:"https://mel.vsb.cz/infrastruktura/?category=chromatography",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_11.pdf"
  },
  {
    area:"Chromatografie a hmotnostní spektrometrie",
    device:"GC-MS + TCD + FID pro plyny",
    model:"Konkrétní model na webu MEL neuveden",
    use:"Analýza plynných vzorků a lehkých těkavých složek; zejména H₂, CO, CO₂, uhlovodíky a VOC; kvalitativní i kalibrační kvantitativní analýza.",
    person:"Aristeidis Bakandritsos",
    web:"https://mel.vsb.cz/infrastruktura/?category=chromatography",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_12.pdf"
  },
  {
    area:"Chromatografie a hmotnostní spektrometrie",
    device:"LC-MS",
    model:"Konkrétní model na webu MEL neuveden",
    use:"Polární, netěkavé a tepelně nestabilní organické látky; identifikace neznámých látek, kvantifikace, čistota, nečistoty, degradační produkty a metabolity.",
    person:"Aristeidis Bakandritsos",
    web:"https://mel.vsb.cz/infrastruktura/?category=chromatography",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_13.pdf"
  },
  {
    area:"Elektrochemie",
    device:"Modulární potenciostaty/galvanostaty a vícekanálové elektrochemické systémy",
    model:"Konkrétní modely na webu MEL neuvedeny",
    use:"Voltametrie, galvanostatická a potenciostatická měření, elektrochemická impedanční spektroskopie (EIS), paralelní měření více elektrod nebo vzorků a teplotně řízené elektrochemické experimenty.",
    person:"Aristeidis Bakandritsos",
    web:"https://mel.vsb.cz/infrastruktura/?category=electrochemical",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_16.pdf"
  },
  {
    area:"Příprava materiálů / depozice",
    device:"UHV magnetronový naprašovací systém / HiPIMS",
    model:"Konkrétní výrobce/model na webu MEL neuveden",
    use:"Příprava tenkých vrstev kovů, slitin, oxidů, nitridů a dalších materiálů; DC, RF, pulzní DC a HiPIMS; co-sputtering, reaktivní naprašování a vícevrstvé struktury.",
    person:"Štěpán Kment",
    web:"https://mel.vsb.cz/infrastruktura/?category=deposition",
    pdf:"https://mel.vsb.cz/wp-content/themes/mel/public/images/infrastructure/lists/pl_1.pdf"
  }
];