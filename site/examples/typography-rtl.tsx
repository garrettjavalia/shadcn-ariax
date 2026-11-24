import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  h1: {
    scrollMargin: "calc(var(--ariax-spacing, .25rem) * 20)",
    fontSize: "2.25rem",
    lineHeight: "calc(2.5 / 2.25)",
    fontWeight: 800,
    letterSpacing: "-.025em",
    textWrap: "balance",
  },
  leadParagraph: {
    fontSize: "1.25rem",
    lineHeight: "calc(var(--ariax-spacing, .25rem) * 7)",
    color: "var(--muted-foreground)",
    marginTop: {
      default: null,
      ":not(:first-child)": "calc(var(--ariax-spacing, .25rem) * 6)",
    },
  },
  h2Spaced: {
    marginTop: {
      default: "calc(var(--ariax-spacing, .25rem) * 10)",
      ":first-child": 0,
    },
    scrollMargin: "calc(var(--ariax-spacing, .25rem) * 20)",
    borderBottomWidth: 1,
    paddingBottom: "calc(var(--ariax-spacing, .25rem) * 2)",
    fontSize: "1.875rem",
    lineHeight: "calc(2.25 / 1.875)",
    fontWeight: 600,
    letterSpacing: "-.025em",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
  },
  p: {
    lineHeight: "calc(var(--ariax-spacing, .25rem) * 7)",
    marginTop: {
      default: null,
      ":not(:first-child)": "calc(var(--ariax-spacing, .25rem) * 6)",
    },
  },
  link: {
    fontWeight: 500,
    color: "var(--primary)",
    textDecorationLine: "underline",
    textUnderlineOffset: 4,
  },
  blockquote: {
    marginTop: "calc(var(--ariax-spacing, .25rem) * 6)",
    borderInlineStartWidth: 2,
    paddingInlineStart: "calc(var(--ariax-spacing, .25rem) * 6)",
    fontStyle: "italic",
  },
  h3Spaced: {
    marginTop: "calc(var(--ariax-spacing, .25rem) * 8)",
    scrollMargin: "calc(var(--ariax-spacing, .25rem) * 20)",
    fontSize: "1.5rem",
    lineHeight: "calc(2 / 1.5)",
    fontWeight: 600,
    letterSpacing: "-.025em",
  },
  list: {
    marginBlock: "calc(var(--ariax-spacing, .25rem) * 6)",
    marginInlineStart: "calc(var(--ariax-spacing, .25rem) * 6)",
    listStyleType: "disc",
  },
  tableContainer: {
    marginBlock: "calc(var(--ariax-spacing, .25rem) * 6)",
    width: "100%",
    overflowY: "auto",
  },
  table: { width: "100%" },
  tableRow: {
    margin: 0,
    borderTopWidth: 1,
    padding: 0,
    backgroundColor: { default: null, ":nth-child(even)": "var(--muted)" },
  },
  tableHeaderPlain: {
    borderWidth: 1,
    paddingInline: "calc(var(--ariax-spacing, .25rem) * 4)",
    paddingBlock: "calc(var(--ariax-spacing, .25rem) * 2)",
    textAlign: "start",
    fontWeight: 700,
  },
  tableCellPlain: {
    borderWidth: 1,
    paddingInline: "calc(var(--ariax-spacing, .25rem) * 4)",
    paddingBlock: "calc(var(--ariax-spacing, .25rem) * 2)",
    textAlign: "start",
  },
  listItem: { marginTop: "calc(var(--ariax-spacing, .25rem) * 2)" },
});

export default function TypographyRtl() {
  return (
    <div dir="rtl" lang="ar">
      <h1 {...stylex.props(styles.h1)}>
        فرض الضرائب على الضحك: سجلات ضريبة النكتة
      </h1>
      <p {...stylex.props(styles.leadParagraph)}>
        في قديم الزمان، في أرض بعيدة، كان هناك ملك كسول جداً يقضي يومه كله
        مستلقياً على عرشه. في أحد الأيام، جاءه مستشاروه بمشكلة: المملكة كانت
        تنفد من المال.
      </p>
      <h2 {...stylex.props(styles.h2Spaced)}>خطة الملك</h2>
      <p {...stylex.props(styles.p)}>
        فكر الملك طويلاً وبجد، وأخيراً توصل إلى{" "}
        <a href="#" {...stylex.props(styles.link)}>
          خطة عبقرية
        </a>
        : سيفرض ضريبة على النكات في المملكة.
      </p>
      <blockquote {...stylex.props(styles.blockquote)}>
        "في النهاية،" قال، "الجميع يستمتع بنكتة جيدة، لذا من العدل أن يدفعوا
        مقابل هذا الامتياز."
      </blockquote>
      <h3 {...stylex.props(styles.h3Spaced)}>ضريبة النكتة</h3>
      <p {...stylex.props(styles.p)}>
        لم يكن رعايا الملك سعداء. تذمروا واشتكوا، لكن الملك كان حازماً:
      </p>
      <ul {...stylex.props(styles.list)}>
        <li {...stylex.props(styles.listItem)}>
          المستوى الأول من التورية: 5 قطع ذهبية
        </li>
        <li {...stylex.props(styles.listItem)}>
          المستوى الثاني من النكات: 10 قطع ذهبية
        </li>
        <li {...stylex.props(styles.listItem)}>
          المستوى الثالث من النكات القصيرة: 20 قطعة ذهبية
        </li>
      </ul>
      <p {...stylex.props(styles.p)}>
        نتيجة لذلك، توقف الناس عن رواية النكات، وغرقت المملكة في الكآبة. لكن كان
        هناك شخص واحد رفض أن تحبطه حماقة الملك: مهرج البلاط المسمى المازح.
      </p>
      <h3 {...stylex.props(styles.h3Spaced)}>ثورة المازح</h3>
      <p {...stylex.props(styles.p)}>
        بدأ المازح يتسلل إلى القلعة في منتصف الليل ويترك النكات في كل مكان: تحت
        وسادة الملك، في حسائه، حتى في المرحاض الملكي. كان الملك غاضباً، لكنه لم
        يستطع إيقاف المازح.
      </p>
      <p {...stylex.props(styles.p)}>
        وبعد ذلك، في يوم من الأيام، اكتشف سكان المملكة أن النكات التي تركها
        المازح كانت مضحكة جداً لدرجة أنهم لم يستطيعوا منع أنفسهم من الضحك.
        وبمجرد أن بدأوا بالضحك، لم يستطيعوا التوقف.
      </p>
      <h3 {...stylex.props(styles.h3Spaced)}>ثورة الشعب</h3>
      <p {...stylex.props(styles.p)}>
        شعر سكان المملكة بالبهجة من الضحك، وبدأوا في رواية النكات والتورية مرة
        أخرى، وسرعان ما أصبحت المملكة بأكملها جزءاً من النكتة.
      </p>
      <div {...stylex.props(styles.tableContainer)}>
        <table {...stylex.props(styles.table)}>
          <thead>
            <tr {...stylex.props(styles.tableRow)}>
              <th {...stylex.props(styles.tableHeaderPlain)}>خزينة الملك</th>
              <th {...stylex.props(styles.tableHeaderPlain)}>سعادة الشعب</th>
            </tr>
          </thead>
          <tbody>
            <tr {...stylex.props(styles.tableRow)}>
              <td {...stylex.props(styles.tableCellPlain)}>فارغة</td>
              <td {...stylex.props(styles.tableCellPlain)}>فائضة</td>
            </tr>
            <tr {...stylex.props(styles.tableRow)}>
              <td {...stylex.props(styles.tableCellPlain)}>متواضعة</td>
              <td {...stylex.props(styles.tableCellPlain)}>راضٍ</td>
            </tr>
            <tr {...stylex.props(styles.tableRow)}>
              <td {...stylex.props(styles.tableCellPlain)}>ممتلئة</td>
              <td {...stylex.props(styles.tableCellPlain)}>منتشٍ</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p {...stylex.props(styles.p)}>
        الملك، عندما رأى مدى سعادة رعاياه، أدرك خطأ طرقه وألغى ضريبة النكتة.
        أُعلن المازح بطلاً، وعاشت المملكة في سعادة دائمة.
      </p>
      <p {...stylex.props(styles.p)}>
        مغزى القصة هو: لا تستهن أبداً بقوة الضحك الجيد وكن دائماً حذراً من
        الأفكار السيئة.
      </p>
    </div>
  );
}
