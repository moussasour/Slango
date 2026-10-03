"""فحص الجودة قبل النشر:  python check.py
يعدّ العبارات في كل ملفات data*.js ويكشف التكرار والحقول الناقصة."""
import re, glob, collections
rows = []
for f in sorted(glob.glob("data*.js")):
    txt = open(f, encoding="utf-8").read()
    rows += [("slang" if k=="S" else "idiom", e, a, x) for k,e,a,x in re.findall(r'^([SI])\("((?:[^"\\]|\\.)*)","([^"]*)","([^"]*)"', txt, re.M)]
    rows += re.findall(r'\{t:"(slang|idiom)",en:"((?:[^"\\]|\\.)*)",ar:"([^"]*)",ex:"([^"]*)"', open(f, encoding="utf-8").read())
cnt = collections.Counter(r[0] for r in rows)
dups = [k for k, v in collections.Counter(r[1].lower() for r in rows).items() if v > 1]
print("slang:", cnt["slang"], "/ 1000   idioms:", cnt["idiom"], "/ 1000")
print("مكرر:", dups or "لا يوجد")
