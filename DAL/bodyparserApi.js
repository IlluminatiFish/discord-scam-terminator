const { remove } = require('confusables'); 
const { addMessageToScamList } = require('./databaseApi');

const urlRegex = /((?:(?:(?:https?):\/\/(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:https?):\/\/)(?:[a-z0-9%.]+:[a-z0-9%]+@)?(?:[a-z0-9\-_~]{1,63}\.)*(?:(?:(?:[a-z0-9]\-?){0,62}[a-z0-9])|(?:xn--[a-z0-9\-]+))\.(?:XN--VERMGENSBERATUNG-PWB|XN--VERMGENSBERATER-CTB|XN--CLCHC0EA0B2G2A9GCD|XN--W4R85EL8FHU5DNRA|NORTHWESTERNMUTUAL|TRAVELERSINSURANCE|XN--3OQ18VL8PN36A|XN--5SU34J936BGSG|XN--BCK1B9A5DRE4C|XN--MGBAH1A3HJKRD|XN--MGBAI9AZGQP6J|XN--MGBERP4A5D4AR|XN--XKC2DL3A5EE0H|XN--FZYS8D69UVGM|XN--MGBA7C0BBN0A|XN--MGBCPQ6GPA1A|XN--XKC2AL3HYE2A|AMERICANEXPRESS|KERRYPROPERTIES|SANDVIKCOROMANT|XN--I1B6B1A6A2E|XN--KCRX77D1X4A|XN--LGBBAT1AD8J|XN--MGBA3A4F16A|XN--MGBAAKC7DVF|XN--MGBC0A9AZCG|XN--NQV7FS00EMA|AFAMILYCOMPANY|AMERICANFAMILY|BANANAREPUBLIC|CANCERRESEARCH|COOKINGCHANNEL|KERRYLOGISTICS|WEATHERCHANNEL|XN--54B7FTA0CC|XN--6QQ986B3XL|XN--80AQECDR1A|XN--B4W605FERD|XN--FIQ228C5HS|XN--H2BREG3EVE|XN--JLQ480N2RG|XN--JLQ61U9W7B|XN--MGBA3A3EJT|XN--MGBAAM7A8H|XN--MGBAYH7GPA|XN--MGBBH1A71E|XN--MGBCA7DZDO|XN--MGBI4ECEXP|XN--MGBX4CD0AB|XN--RVC1E0AM3E|INTERNATIONAL|LIFEINSURANCE|TRAVELCHANNEL|WOLTERSKLUWER|XN--CCKWCXETD|XN--ECKVDTC9D|XN--FPCRJ9C3D|XN--FZC2C9E2C|XN--H2BRJ9C8C|XN--TIQ49XQYJ|XN--YFRO4I67O|XN--YGBI2AMMX|CONSTRUCTION|LPLFINANCIAL|SCHOLARSHIPS|VERSICHERUNG|XN--3E0B707E|XN--45BR5CYL|XN--4DBRK0CE|XN--80ADXHKS|XN--80ASEHDB|XN--8Y0A063A|XN--GCKR3F0F|XN--MGB9AWBF|XN--MGBAB2BD|XN--MGBGU82A|XN--MGBPL2FH|XN--MGBT3DHD|XN--MK1BU44C|XN--NGBC5AZD|XN--NGBE9E0A|XN--OGBPF8FL|XN--QCKA1PMC|ACCOUNTANTS|BARCLAYCARD|BLACKFRIDAY|BLOCKBUSTER|BRIDGESTONE|CALVINKLEIN|CONTRACTORS|CREDITUNION|ENGINEERING|ENTERPRISES|FOODNETWORK|INVESTMENTS|KERRYHOTELS|LAMBORGHINI|MOTORCYCLES|OLAYANGROUP|PHOTOGRAPHY|PLAYSTATION|PRODUCTIONS|PROGRESSIVE|REDUMBRELLA|WILLIAMHILL|XN--11B4C3D|XN--1CK2E1B|XN--1QQW23A|XN--2SCRJ9C|XN--3BST00M|XN--3DS443G|XN--3HCRJ9C|XN--42C2D9A|XN--45BRJ9C|XN--55QW42G|XN--6FRZ82G|XN--80AO21A|XN--9KRT00A|XN--CCK2B3B|XN--CZR694B|XN--D1ACJ3B|XN--EFVY88H|XN--FCT429K|XN--FJQ720A|XN--FLW351E|XN--G2XX48C|XN--GECRJ9C|XN--GK3AT1E|XN--H2BRJ9C|XN--HXT814E|XN--IMR513N|XN--J6W193G|XN--JVR189M|XN--KPRW13D|XN--KPRY57D|XN--MGBBH1A|XN--MGBTX2B|XN--MIX891F|XN--NYQY26A|XN--OTU796D|XN--PGBS0DH|XN--Q9JYB4C|XN--RHQV96G|XN--ROVU88B|XN--S9BRJ9C|XN--SES554G|XN--T60B56A|XN--VUQ861B|XN--W4RS40L|XN--XHQ521B|XN--ZFR164B|ACCOUNTANT|APARTMENTS|ASSOCIATES|BASKETBALL|BNPPARIBAS|BOEHRINGER|CAPITALONE|CONSULTING|CREDITCARD|CUISINELLA|EUROVISION|EXTRASPACE|FOUNDATION|HEALTHCARE|IMMOBILIEN|INDUSTRIES|MANAGEMENT|MITSUBISHI|NEXTDIRECT|PROPERTIES|PROTECTION|PRUDENTIAL|REALESTATE|REPUBLICAN|RESTAURANT|SCHAEFFLER|SWIFTCOVER|TATAMOTORS|TECHNOLOGY|UNIVERSITY|VLAANDEREN|VOLKSWAGEN|XN--30RR7Y|XN--3PXU8K|XN--45Q11C|XN--4GBRIM|XN--55QX5D|XN--5TZM5G|XN--80ASWG|XN--90A3AC|XN--9DBQ2A|XN--9ET52U|XN--C2BR7G|XN--CG4BKI|XN--CZRS0T|XN--CZRU2D|XN--FIQ64B|XN--FIQS8S|XN--FIQZ9S|XN--IO0A7I|XN--KPUT3I|XN--MXTQ1M|XN--O3CW4H|XN--PSSY2U|XN--Q7CE6A|XN--UNUP4Y|XN--WGBH1C|XN--WGBL6A|XN--Y9A3AQ|ACCENTURE|ALFAROMEO|ALLFINANZ|AMSTERDAM|ANALYTICS|AQUARELLE|BARCELONA|BLOOMBERG|CHRISTMAS|COMMUNITY|DIRECTORY|EDUCATION|EQUIPMENT|FAIRWINDS|FINANCIAL|FIRESTONE|FRESENIUS|FRONTDOOR|FURNITURE|GOLDPOINT|HISAMITSU|HOMEDEPOT|HOMEGOODS|HOMESENSE|INSTITUTE|INSURANCE|KUOKGROUP|LANCASTER|LANDROVER|LIFESTYLE|MARKETING|MARSHALLS|MELBOURNE|MICROSOFT|PANASONIC|PASSAGENS|PRAMERICA|RICHARDLI|SCJOHNSON|SHANGRILA|SOLUTIONS|STATEBANK|STATEFARM|STOCKHOLM|TRAVELERS|VACATIONS|XN--90AIS|XN--C1AVG|XN--D1ALF|XN--E1A4C|XN--FHBEI|XN--J1AEF|XN--J1AMH|XN--L1ACC|XN--NGBRX|XN--NQV7F|XN--P1ACF|XN--QXA6A|XN--TCKWE|XN--VHQUV|YODOBASHI|ABUDHABI|AIRFORCE|ALLSTATE|ATTORNEY|BARCLAYS|BAREFOOT|BARGAINS|BASEBALL|BOUTIQUE|BRADESCO|BROADWAY|BRUSSELS|BUDAPEST|BUILDERS|BUSINESS|CAPETOWN|CATERING|CATHOLIC|CIPRIANI|CITYEATS|CLEANING|CLINIQUE|CLOTHING|COMMBANK|COMPUTER|DELIVERY|DELOITTE|DEMOCRAT|DIAMONDS|DISCOUNT|DISCOVER|DOWNLOAD|ENGINEER|ERICSSON|ETISALAT|EXCHANGE|FEEDBACK|FIDELITY|FIRMDALE|FOOTBALL|FRONTIER|GOODYEAR|GRAINGER|GRAPHICS|GUARDIAN|HDFCBANK|HELSINKI|HOLDINGS|HOSPITAL|INFINITI|IPIRANGA|ISTANBUL|JPMORGAN|LIGHTING|LUNDBECK|MARRIOTT|MASERATI|MCKINSEY|MEMORIAL|MERCKMSD|MORTGAGE|OBSERVER|PARTNERS|PHARMACY|PICTURES|PLUMBING|PROPERTY|REDSTONE|RELIANCE|SAARLAND|SAMSCLUB|SECURITY|SERVICES|SHOPPING|SHOWTIME|SOFTBANK|SOFTWARE|STCGROUP|SUPPLIES|TRAINING|VANGUARD|VENTURES|VERISIGN|WOODSIDE|XN--90AE|XN--NODE|XN--P1AI|XN--QXAM|YOKOHAMA|ABOGADO|ACADEMY|AGAKHAN|ALIBABA|ANDROID|ATHLETA|AUCTION|AUDIBLE|AUSPOST|AVIANCA|BANAMEX|BAUHAUS|BENTLEY|BESTBUY|BOOKING|BROTHER|BUGATTI|CAPITAL|CARAVAN|CAREERS|CHANNEL|CHARITY|CHINTAI|CITADEL|CLUBMED|COLLEGE|COLOGNE|COMCAST|COMPANY|COMPARE|CONTACT|COOKING|CORSICA|COUNTRY|COUPONS|COURSES|CRICKET|CRUISES|DENTIST|DIGITAL|DOMAINS|EXPOSED|EXPRESS|FARMERS|FASHION|FERRARI|FERRERO|FINANCE|FISHING|FITNESS|FLIGHTS|FLORIST|FLOWERS|FORSALE|FROGANS|FUJITSU|GALLERY|GENTING|GODADDY|GROCERY|GUITARS|HAMBURG|HANGOUT|HITACHI|HOLIDAY|HOSTING|HOTELES|HOTMAIL|HYUNDAI|ISMAILI|JEWELRY|JUNIPER|KITCHEN|KOMATSU|LACAIXA|LANXESS|LASALLE|LATROBE|LECLERC|LIMITED|LINCOLN|MARKETS|MONSTER|NETBANK|NETFLIX|NETWORK|NEUSTAR|OKINAWA|OLDNAVY|ORGANIC|ORIGINS|PHILIPS|PIONEER|POLITIE|REALTOR|RECIPES|RENTALS|REVIEWS|REXROTH|SAMSUNG|SANDVIK|SCHMIDT|SCHWARZ|SCIENCE|SHIKSHA|SINGLES|STAPLES|STORAGE|SUPPORT|SURGERY|SYSTEMS|TEMASEK|THEATER|THEATRE|TICKETS|TIFFANY|TOSHIBA|TRADING|WALMART|WANGGOU|WATCHES|WEATHER|WEBSITE|WEDDING|WHOSWHO|WINDOWS|WINNERS|XFINITY|YAMAXUN|YOUTUBE|ZUERICH|ABARTH|ABBOTT|ABBVIE|AFRICA|AGENCY|AIRBUS|AIRTEL|ALIPAY|ALSACE|ALSTOM|AMAZON|ANQUAN|ARAMCO|AUTHOR|BAYERN|BEAUTY|BERLIN|BHARTI|BOSTIK|BOSTON|BROKER|CAMERA|CAREER|CASINO|CENTER|CHANEL|CHROME|CHURCH|CIRCLE|CLAIMS|CLINIC|COFFEE|COMSEC|CONDOS|COUPON|CREDIT|CRUISE|DATING|DATSUN|DEALER|DEGREE|DENTAL|DESIGN|DIRECT|DOCTOR|DUNLOP|DUPONT|DURBAN|EMERCK|ENERGY|ESTATE|EVENTS|EXPERT|FAMILY|FLICKR|FUTBOL|GALLUP|GARDEN|GEORGE|GIVING|GLOBAL|GOOGLE|GRATIS|HEALTH|HERMES|HIPHOP|HOCKEY|HOTELS|HUGHES|IMAMAT|INSURE|INTUIT|JAGUAR|JOBURG|JUEGOS|KAUFEN|KINDER|KINDLE|KOSHER|LANCIA|LATINO|LAWYER|LEFRAK|LIVING|LOCKER|LONDON|LUXURY|MADRID|MAISON|MAKEUP|MARKET|MATTEL|MOBILE|MONASH|MORMON|MOSCOW|MUSEUM|MUTUAL|NAGOYA|NATURA|NISSAN|NISSAY|NORTON|NOWRUZ|OFFICE|OLAYAN|ONLINE|ORACLE|ORANGE|OTSUKA|PFIZER|PHOTOS|PHYSIO|PICTET|QUEBEC|RACING|REALTY|REISEN|REPAIR|REPORT|REVIEW|ROCHER|ROGERS|RYUKYU|SAFETY|SAKURA|SANOFI|SCHOOL|SCHULE|SEARCH|SECURE|SELECT|SHOUJI|SOCCER|SOCIAL|STREAM|STUDIO|SUPPLY|SUZUKI|SWATCH|SYDNEY|TAIPEI|TAOBAO|TARGET|TATTOO|TENNIS|TIENDA|TJMAXX|TKMAXX|TOYOTA|TRAVEL|UNICOM|VIAJES|VIKING|VILLAS|VIRGIN|VISION|VOTING|VOYAGE|VUELOS|WALTER|WEBCAM|XIHUAN|YACHTS|YANDEX|ZAPPOS|ACTOR|ADULT|AETNA|AMFAM|AMICA|APPLE|ARCHI|AUDIO|AUTOS|AZURE|BAIDU|BEATS|BIBLE|BINGO|BLACK|BOATS|BOSCH|BUILD|CANON|CARDS|CHASE|CHEAP|CISCO|CITIC|CLICK|CLOUD|COACH|CODES|CROWN|CYMRU|DABUR|DANCE|DEALS|DELTA|DRIVE|DUBAI|EARTH|EDEKA|EMAIL|EPSON|FAITH|FEDEX|FINAL|FOREX|FORUM|GALLO|GAMES|GIFTS|GIVES|GLADE|GLASS|GLOBO|GMAIL|GREEN|GRIPE|GROUP|GUCCI|GUIDE|HOMES|HONDA|HORSE|HOUSE|HYATT|IKANO|IRISH|JETZT|KOELN|KYOTO|LAMER|LEASE|LEGAL|LEXUS|LILLY|LINDE|LIPSY|LIXIL|LOANS|LOCUS|LOTTE|LOTTO|MACYS|MANGO|MEDIA|MIAMI|MONEY|MOVIE|NEXUS|NIKON|NINJA|NOKIA|NOWTV|OMEGA|OSAKA|PARIS|PARTS|PARTY|PHONE|PHOTO|PIZZA|PLACE|POKER|PRAXI|PRESS|PRIME|PROMO|QUEST|RADIO|REHAB|REISE|RICOH|ROCKS|RODEO|RUGBY|SALON|SENER|SEVEN|SHARP|SHELL|SHOES|SKYPE|SLING|SMART|SMILE|SOLAR|SPACE|SPORT|STADA|STORE|STUDY|STYLE|SUCKS|SWISS|TATAR|TIRES|TIROL|TMALL|TODAY|TOKYO|TOOLS|TORAY|TOTAL|TOURS|TRADE|TRUST|TUNES|TUSHU|UBANK|VEGAS|VIDEO|VODKA|VOLVO|WALES|WATCH|WEBER|WEIBO|WORKS|WORLD|XEROX|YAHOO|AARP|ABLE|ADAC|AERO|AKDN|ALLY|AMEX|ARAB|ARMY|ARPA|ARTE|ASDA|ASIA|AUDI|AUTO|BABY|BAND|BANK|BBVA|BEER|BEST|BIKE|BING|BLOG|BLUE|BOFA|BOND|BOOK|BUZZ|CAFE|CALL|CAMP|CARE|CARS|CASA|CASE|CASH|CBRE|CERN|CHAT|CITI|CITY|CLUB|COOL|COOP|CYOU|DATA|DATE|DCLK|DEAL|DELL|DESI|DIET|DISH|DOCS|DUCK|DVAG|ERNI|FAGE|FAIL|FANS|FARM|FAST|FIAT|FIDO|FILM|FIRE|FISH|FLIR|FOOD|FORD|FREE|FUND|GAME|GBIZ|GENT|GGEE|GIFT|GMBH|GOLD|GOLF|GOOG|GUGE|GURU|HAIR|HAUS|HDFC|HELP|HERE|HGTV|HOST|HSBC|ICBC|IEEE|IMDB|IMMO|INFO|ITAU|JAVA|JEEP|JOBS|JPRS|KDDI|KIWI|KPMG|KRED|LAND|LEGO|LGBT|LIDL|LIFE|LIKE|LIMO|LINK|LIVE|LOAN|LOFT|LOVE|LTDA|LUXE|MAIF|MEET|MEME|MENU|MINI|MINT|MOBI|MODA|MOTO|NAME|NAVY|NEWS|NEXT|NICO|NIKE|OLLO|OPEN|PAGE|PARS|PCCW|PICS|PING|PINK|PLAY|PLUS|POHL|PORN|POST|PROD|PROF|QPON|RAID|READ|REIT|RENT|REST|RICH|RMIT|ROOM|RSVP|RUHR|SAFE|SALE|SARL|SAVE|SAXO|SCOT|SEAT|SEEK|SEXY|SHAW|SHIA|SHOP|SHOW|SILK|SINA|SITE|SKIN|SNCF|SOHU|SONG|SONY|SPOT|STAR|SURF|TALK|TAXI|TEAM|TECH|TEVA|TIAA|TIPS|TOWN|TOYS|TUBE|VANA|VISA|VIVA|VIVO|VOTE|VOTO|WANG|WEIR|WIEN|WIKI|WINE|WORK|XBOX|YOGA|ZARA|ZERO|ZONE|AAA|ABB|ABC|ACO|ADS|AEG|AFL|AIG|ANZ|AOL|APP|ART|AWS|AXA|BAR|BBC|BBT|BCG|BCN|BET|BID|BIO|BIZ|BMS|BMW|BOM|BOO|BOT|BOX|BUY|BZH|CAB|CAL|CAM|CAR|CAT|CBA|CBN|CBS|CEO|CFA|CFD|COM|CPA|CRS|CSC|DAD|DAY|DDS|DEV|DHL|DIY|DNP|DOG|DOT|DTV|DVR|EAT|ECO|EDU|ESQ|EUS|FAN|FIT|FLY|FOO|FOX|FRL|FTR|FUN|FYI|GAL|GAP|GAY|GDN|GEA|GLE|GMO|GMX|GOO|GOP|GOT|GOV|HBO|HIV|HKT|HOT|HOW|IBM|ICE|ICU|IFM|INC|ING|INK|INT|IST|ITV|JCB|JIO|JLL|JMP|JNJ|JOT|JOY|KFH|KIA|KIM|KPN|KRD|LAT|LAW|LDS|LLC|LLP|LOL|LPL|LTD|MAN|MAP|MBA|MED|MEN|MIL|MIT|MLB|MLS|MMA|MOE|MOI|MOM|MOV|MSD|MTN|MTR|NAB|NBA|NEC|NET|NEW|NFL|NGO|NHK|NOW|NRA|NRW|NTT|NYC|OBI|OFF|ONE|ONG|ONL|OOO|ORG|OTT|OVH|PAY|PET|PHD|PID|PIN|PNC|PRO|PRU|PUB|PWC|QVC|RED|REN|RIL|RIO|RIP|RUN|RWE|SAP|SAS|SBI|SBS|SCA|SCB|SES|SEW|SEX|SFR|SKI|SKY|SOY|SPA|SRL|STC|TAB|TAX|TCI|TDK|TEL|THD|TJX|TOP|TRV|TUI|TVS|UBS|UNO|UOL|UPS|VET|VIG|VIN|VIP|WED|WIN|WME|WOW|WTC|WTF|XIN|XXX|XYZ|YOU|YUN|ZIP|AC|AD|AE|AF|AG|AI|AL|AM|AO|AQ|AR|AS|AT|AU|AW|AX|AZ|BA|BB|BD|BE|BF|BG|BH|BI|BJ|BM|BN|BO|BR|BS|BT|BV|BW|BY|BZ|CA|CC|CD|CF|CG|CH|CI|CK|CL|CM|CN|CO|CR|CU|CV|CW|CX|CY|CZ|DE|DJ|DK|DM|DO|DZ|EC|EE|EG|ER|ES|ET|EU|FI|FJ|FK|FM|FO|FR|GA|GB|GD|GE|GF|GG|GH|GI|GL|GM|GN|GP|GQ|GR|GS|GT|GU|GW|GY|HK|HM|HN|HR|HT|HU|ID|IE|IL|IM|IN|IO|IQ|IR|IS|IT|JE|JM|JO|JP|KE|KG|KH|KI|KM|KN|KP|KR|KW|KY|KZ|LA|LB|LC|LI|LK|LR|LS|LT|LU|LV|LY|MA|MC|MD|ME|MG|MH|MK|ML|MM|MN|MO|MP|MQ|MR|MS|MT|MU|MV|MW|MX|MY|MZ|NA|NC|NE|NF|NG|NI|NL|NO|NP|NR|NU|NZ|OM|PA|PE|PF|PG|PH|PK|PL|PM|PN|PR|PS|PT|PW|PY|QA|RE|RO|RS|RU|RW|SA|SB|SC|SD|SE|SG|SH|SI|SJ|SK|SL|SM|SN|SO|SR|SS|ST|SU|SV|SX|SY|SZ|TC|TD|TF|TG|TH|TJ|TK|TL|TM|TN|TO|TR|TT|TV|TW|TZ|UA|UG|UK|US|UY|UZ|VA|VC|VE|VG|VI|VN|VU|WF|WS|YE|YT|ZA|ZM|ZW))(?::\d{2,5})?(?:\/[a-z0-9\/\-_%$@&()!?'=~*+:;,.]+)*\/?(?:[?#]\S*)*\/?)/ig;

/*
 * there are 3 URL patterns that discord will display without https:
 * discord.com/invite/XYZ
 * discord.gg/XYZ
 * discord.gg/invite/XYZ
 * discordapp.com/invite/XYZ
 */
const discordInvitePattern = /(?:discord(?:(?:app)?\.com\/invite\/|\.gg\/(?:invite\/)?))[A-Za-z0-9\-]{2,}/ig;

/*
 * there is no known way for channel links to be malicious
 */
const discordChannelPattern = /https:\/\/(?:\w+\.)?discord(?:app)?\.com\/channels\/(\d+)\/(\d+)(\/(\d+))?/ig;

/**
 * 
 * @param {String} content 
 * @param {Boolean} fullyQualify 
 * @returns {Array<String>}
 */
function extractUrlsFromContent(content, fullyQualify) {
    try {
        let urls = [];

        if (!content)
            return urls;

        const test = content.match(urlRegex);
        if (test && test.forEach) {
            test.forEach((match) => {
                urls.push(match);
            });

            // remove Discord channel URLs as there is not a known scam involving those
            urls = urls.filter((a) => !discordChannelPattern.test(a));
        }
        
        const inviteMatch = content.match(discordInvitePattern);
        if (inviteMatch && inviteMatch.forEach) {
            inviteMatch.forEach((match) => {
                urls.push(fullyQualify ? `https://${match}` : match);
            });
        }

        return urls.filter(onlyUnique).sort((a, b) => {
            // keep http/https at the beginning for the purposes of stripping out later
            if (a && (a.indexOf("https://") === 0 || a.indexOf("http://") === 0)) return -1;
            if (b && (b.indexOf("https://") === 0 || b.indexOf("http://") === 0)) return 1;
            return 0;
        });
    } catch (err) {
        console.log("unable to parse URLs: " + err);
        return [];
    }
}

/**
 * 
 * @param {String} value 
 * @param {Number} index 
 * @param {String} self 
 * @returns {Boolean}
 */
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

/**
 * 
 * @param {String} message 
 * @returns {String}
 */
function cleanMessage(message) {
    message = message.toLowerCase();
    message = remove(message);
    message = message.replace(/\n/g, " ");
    message = message.replace(/\s\s+/g, " ");

    return message;
}

// most scams tend to be short and sweet, and we occassionally get false positives the longer a message is
/**
 * 
 * @param {String} str 
 * @returns {Number}
 */
function countWords(str) {
    return str.trim().split(/\s+/).length;
}

/**
 * 
 * @param {String} message 
 * @param {Boolean} removeUrl 
 * @returns {Number}
 */
function containsKeyIndicators(message, removeUrl = true) {
    message = cleanMessage(message);

    if (removeUrl) {
        try {
            const urls = extractUrlsFromContent(message, false);
    
            // no URLs means this isn't a scam link
            if (urls.length === 0)
                return 0;
    
            urls.forEach(url => message = message.replace(url, " "));

            message = message.replace(":", " ");
            message = message.replace(/\s\s+/g, " ");
        } catch { /* we don't really care if this fails */}
    }

    let wordcount = countWords(message);

    let indicators = 0;

    // only analyze short messages for now
    if (wordcount > 60)
        return indicators;

    let words = message.match(/\b(\w+)\b/g);
    words = [...new Set(words)];

    if (words && words.length)
    for (var word of words) {
        if (word === "@everyone")
        indicators += 3;

        if (word === "discord")
            indicators += 1;

        if (word === "nitro")
            indicators += 1;

        if (word === "free")
            indicators += 1;

        if (word === "giveaway")
            indicators += 1;
        
        if (word === "steam")
            indicators += 1;

        if (word === "month")
            indicators += 1;

        if (word === "airdrop")
            indicators += 1;

        if (word === "pass") 
            indicators += 1;
        
        if (word === "password") 
            indicators += 1;
    }

    if (message.indexOf("gifted a subscription") > -1)
        indicators += 1;

    if (message.indexOf("trade offer with") > -1)
        indicators += 1;

    if (message.indexOf("discord has gifted you") > -1)
        indicators += 2;

    if (message.indexOf("who is first? :)") > -1)
        indicators += 2;

    if (message.indexOf("take it guys :)") > -1)
        indicators += 2;

    if (message.indexOf("test my first game") > -1) 
        indicators += 1;

    return indicators;
}

/**
 * 
 * @param {String} message 
 * @returns {Boolean}
 */
function suspiciousDmRequests(message) {
    message = cleanMessage(message);

    try {
        const urls = extractUrlsFromContent(message, false);

        if (urls.length > 0) {
            urls.forEach(url => message = message.replace(url, " "));

            message = message.replace(":", " ");
            message = message.replace(/\s\s+/g, " ");
        }
    } catch { /* we don't really care if this fails */}

    let indicators = 0;

    let words = message.match(/\b(\w+)\b/g);
    words = [...new Set(words)];

    let actionRequest = false;

    if (words && words.length)
    for (var word of words) {
        if (word === "@everyone")
            indicators += 3;

        if (word === "discord")
            indicators += 1;

        if (word === "nitro")
            indicators += 1;

        if (word === "free")
            indicators += 1;

        if (word === "giveaway")
            indicators += 1;
        
        if (word === "steam")
            indicators += 1;

        if (word === "month")
            indicators += 1;

        if (word === "airdrop")
            indicators += 1;

        if (word === "pass") 
            indicators += 1;
        
        if (word === "password") 
            indicators += 1;

        if (word === "crypto")
            indicators += 1;

        if (word === "profit")
            indicators += 1;

        if (word === "earn")
            indicators += 1;

        if (word === "earned")
            indicators += 1;

        if (word === "nft")
            indicators += 1;

        // these indicators are action requests
        if (word === "dm")
            actionRequest = true;

        if (word === "message")
            actionRequest = true;
        
        if (word === "talk")
            actionRequest = true;
    }

    if (message.indexOf("gifted a subscription") > -1)
        indicators += 1;

    if (message.indexOf("trade offer with") > -1)
        indicators += 1;

    if (message.indexOf("discord has gifted you") > -1)
        indicators += 2;

    if (message.indexOf("who is first? :)") > -1)
        indicators += 2;

    if (message.indexOf("take it guys :)") > -1)
        indicators += 2;

    if (message.indexOf("test my first game") > -1) 
        indicators += 1;

    // these indicators are action requests
    if (message.indexOf("reach out") > -1)
        actionRequest = true;

    if (message.indexOf("send me") > -1)
        actionRequest = true;

    return actionRequest && indicators > 1;
}

/**
 * 
 * @param {String} url 
 * @returns {String}
 */
function extractHostname(url) {
    url = url.toLowerCase();
    
    try {
        const urlObject = new URL(url);

        return urlObject.hostname;
    } catch {
        if (url.indexOf("https://") === 0)
            url = url.substring(8);
        else if (url.indexOf("http://") === 0)
            url = url.substring(7);

        return url;
    }
}

/**
 * 
 * @param {String} message 
 * @param {Array<String>} urls 
 * @param {String} user 
 * @param {String} server 
 * @returns {Promise<Boolean>}
 */
async function isRedlineStealer(message, urls, user, server) {
    let hasKnownBadPath = false;
    let badUrl = "";

    if (urls.length)
        urls.forEach(url => {
            if (typeof url === "string") {
                let host = extractHostname(url);

                if (host === "github.com") {
                    if (url.toLowerCase().indexOf("skyblade.rar") > -1) {
                        badUrl = url;
                        hasKnownBadPath = true;
                    }
                }
            }
        });

    if (hasKnownBadPath) {
        await addMessageToScamList(badUrl, message, user, server);

        return true;
    }

    return false;
}

module.exports = {
    extractUrlsFromContent,
    containsKeyIndicators,
    cleanMessage,
    MINIMUM_INDICATORS: 1,

    isRedlineStealer,
    urlRegex, 

    suspiciousDmRequests,
    discordInvitePattern
};
