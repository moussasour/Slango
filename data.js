// قاعدة البيانات: type = slang | idiom ، reg = US | UK | ALL ، tone = casual | neutral
const EXPRESSIONS = [
 {t:"idiom",en:"Break the ice",ar:"كسر الجمود وبدء الحديث مع شخص جديد",ex:"He told a joke to break the ice.",tone:"neutral",reg:"ALL"},
 {t:"idiom",en:"Piece of cake",ar:"شيء سهل جدًا",ex:"The exam was a piece of cake.",tone:"casual",reg:"ALL"},
 {t:"idiom",en:"Under the weather",ar:"يشعر بتوعك خفيف",ex:"I'm feeling under the weather today.",tone:"casual",reg:"ALL"},
 {t:"idiom",en:"Spill the beans",ar:"يفشي السر",ex:"Who spilled the beans about the party?",tone:"casual",reg:"ALL"},
 {t:"idiom",en:"Hit the books",ar:"يذاكر بجد",ex:"I have to hit the books tonight.",tone:"casual",reg:"US"},
 {t:"idiom",en:"Once in a blue moon",ar:"نادرًا جدًا",ex:"We eat out once in a blue moon.",tone:"neutral",reg:"ALL"},
 {t:"idiom",en:"The ball is in your court",ar:"القرار الآن بيدك",ex:"I've made my offer. The ball is in your court.",tone:"neutral",reg:"ALL"},
 {t:"idiom",en:"Cost an arm and a leg",ar:"غالي جدًا",ex:"That car costs an arm and a leg.",tone:"casual",reg:"ALL"},
 {t:"slang",en:"No cap",ar:"بدون مبالغة، أقولها بصدق",ex:"That was the best pizza ever, no cap.",tone:"casual",reg:"US"},
 {t:"slang",en:"Low-key",ar:"نوعًا ما / بشكل غير معلن",ex:"I'm low-key excited for Monday.",tone:"casual",reg:"US"},
 {t:"slang",en:"Salty",ar:"منزعج أو متضايق من شيء",ex:"He's still salty about losing.",tone:"casual",reg:"US"},
 {t:"slang",en:"Gutted",ar:"محطّم ومصدوم (حزن شديد)",ex:"I was gutted when we lost the final.",tone:"casual",reg:"UK"},
 {t:"slang",en:"Knackered",ar:"مرهق جدًا",ex:"I'm absolutely knackered after work.",tone:"casual",reg:"UK"},
 {t:"slang",en:"Chuffed",ar:"سعيد وفخور",ex:"She was chuffed with her results.",tone:"casual",reg:"UK"},
 {t:"slang",en:"Vibe check",ar:"تقييم الأجواء أو المزاج العام",ex:"Quick vibe check: is everyone okay with this plan?",tone:"casual",reg:"US"},
 {t:"slang",en:"Bail",ar:"ينسحب أو يغادر فجأة",ex:"I have to bail, something came up.",tone:"casual",reg:"US"}
];
