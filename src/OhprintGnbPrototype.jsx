import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Edit3,
  Eye,
  GitCompare,
  Plus,
  Trash2,
  Download,
  Upload,
  X,
  User,
  ShoppingCart,
  RotateCcw,
  ListPlus,
  Flame,
  GripVertical,
  Columns3,
} from "lucide-react";

// ============================================================================
// 레이아웃 상수 (실제 오프린트미 기준)
// ============================================================================
const LAYOUT = {
  containerMaxWidth: 1440, // 실제 오프린트미 콘텐츠 최대 폭
  containerPaddingX: 40, // 좌우 내부 여백
  gnbBaseHeight: 110, // 로고 + GNB 바 합산 높이 근사
};
const COLORS = {
  logoOrange: "rgb(255, 202, 80)",
  logoBlue: "rgb(44, 131, 233)",
  badgeHot: "#FF5C35",
  badgeHotBg: "#FFF0EB",
  badgeNew: "#FF3B47",
  badgeNewBg: "#FFECEC",
  badgeSaleFrom: "#FFB800",
  badgeSaleTo: "#FF3B8E",
  textPrimary: "#111827",
  textSecondary: "#4B5563",
  textMuted: "#6B7280",
  borderLight: "#F3F4F6",
  borderBase: "#E5E7EB",
};
const MAX_COLUMNS = 5;

// ============================================================================
// 초기 데이터 (열 기반 구조)
// ============================================================================
const INITIAL_DATA = {
  categories: [
    {
      id: "sticker",
      name: "스티커",
      columns: [
        {
          id: "col-sticker-1",
          groups: [
            {
              id: "sticker-single",
              name: "싱글 스티커",
              items: [
                { id: "s1", name: "맞춤 싱글 스티커 (낱장)", badge: "HOT" },
                { id: "s2", name: "원형 싱글 스티커" },
                { id: "s3", name: "정사각 싱글 스티커" },
                { id: "s4", name: "타원 싱글 스티커" },
                { id: "s5", name: "직사각 싱글 스티커" },
                { id: "s6", name: "자유 반칼 스티커" },
                { id: "s7", name: "띠부 스티커" },
                { id: "s8", name: "우표 조각 스티커" },
              ],
            },
          ],
        },
        {
          id: "col-sticker-2",
          groups: [
            {
              id: "sticker-sheet",
              name: "시트 스티커",
              items: [
                { id: "sh1", name: "맞춤 시트 스티커 (DIY)", badge: "HOT" },
                { id: "sh2", name: "원형 시트 스티커" },
                { id: "sh3", name: "정사각 시트 스티커" },
                { id: "sh4", name: "타원 시트 스티커" },
                { id: "sh5", name: "직사각 시트 스티커" },
                { id: "sh6", name: "와이드 시트 스티커" },
              ],
            },
          ],
        },
        {
          id: "col-sticker-3",
          groups: [
            {
              id: "sticker-roll",
              name: "롤 스티커",
              items: [
                { id: "r1", name: "원형 롤 스티커" },
                { id: "r2", name: "정사각 롤 스티커" },
                { id: "r3", name: "타원 롤 스티커" },
                { id: "r4", name: "직사각 롤 스티커" },
                { id: "r5", name: "하트 롤 스티커" },
              ],
            },
          ],
        },
        {
          id: "col-sticker-4",
          groups: [
            {
              id: "sticker-decal",
              name: "데칼 스티커",
              items: [
                { id: "d1", name: "컬러 데칼 스티커" },
                { id: "d2", name: "그래픽 데칼 스티커" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "card-bc",
      name: "명함",
      columns: [
        {
          id: "col-bc-1",
          groups: [
            {
              id: "bc-best",
              name: "베스트",
              items: [
                { id: "bb1", name: "오리지널 명함", badge: "HOT" },
                { id: "bb2", name: "프리미엄 매트 명함", badge: "HOT" },
                { id: "bb3", name: "소프트 명함", badge: "HOT" },
              ],
            },
          ],
        },
        {
          id: "col-bc-2",
          groups: [
            {
              id: "bc-premium",
              name: "고급",
              items: [
                { id: "bp1", name: "리넨 명함", badge: "HOT" },
                { id: "bp2", name: "펠트 명함", badge: "HOT" },
                { id: "bp3", name: "펄 명함", badge: "HOT" },
                { id: "bp4", name: "매트블랙 명함" },
                { id: "bp5", name: "투명 명함" },
                { id: "bp6", name: "투명 글로시 명함" },
                { id: "bp7", name: "골드 글로시 명함" },
                { id: "bp8", name: "실버 글로시 명함" },
                { id: "bp9", name: "홀로그램 글로시 명함" },
                { id: "bp10", name: "럭스 명함" },
                { id: "bp11", name: "박 명함" },
              ],
            },
          ],
        },
        {
          id: "col-bc-3",
          groups: [
            {
              id: "bc-shape",
              name: "모양",
              items: [
                { id: "bs1", name: "기본 명함" },
                { id: "bs2", name: "둥근 기본 명함" },
                { id: "bs3", name: "글로벌 명함" },
                { id: "bs4", name: "둥근 글로벌 명함" },
              ],
            },
          ],
        },
        {
          id: "col-bc-4",
          groups: [
            {
              id: "bc-eco",
              name: "친환경",
              items: [
                { id: "be1", name: "리사이클 명함" },
                { id: "be2", name: "크라프트 명함" },
              ],
            },
          ],
        },
        {
          id: "col-bc-5",
          groups: [
            {
              id: "bc-acc",
              name: "액세서리",
              items: [
                { id: "ba1", name: "아크릴 명함 홀더" },
                { id: "ba2", name: "알루미늄 명함 케이스" },
                { id: "ba3", name: "자석 명함 케이스" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "promo",
      name: "홍보물",
      columns: [
        {
          id: "col-promo-1",
          groups: [
            {
              id: "promo-ad",
              name: "홍보용품",
              items: [
                { id: "pa1", name: "전단" },
                { id: "pa2", name: "브로슈어" },
                { id: "pa3", name: "쿠폰" },
                { id: "pa4", name: "포스터" },
                { id: "pa5", name: "현수막" },
                { id: "pa6", name: "양면 배너" },
                { id: "pa7", name: "부채" },
              ],
            },
          ],
        },
        {
          id: "col-promo-2",
          groups: [
            {
              id: "promo-store",
              name: "가게용품",
              items: [
                { id: "ps1", name: "메뉴판" },
                { id: "ps2", name: "테이블탑 사인" },
                { id: "ps3", name: "A 프레임 사인" },
                { id: "ps4", name: "원형 롤 스티커" },
                { id: "ps5", name: "맞춤 싱글 스티커 (낱장)", badge: "HOT" },
                { id: "ps6", name: "그래픽 데칼 스티커" },
                { id: "ps7", name: "에이프런(앞치마)" },
                { id: "ps8", name: "쇼핑백" },
              ],
            },
          ],
        },
        {
          id: "col-promo-3",
          groups: [
            {
              id: "promo-gift",
              name: "기념품",
              items: [
                { id: "pg1", name: "메모패드" },
                { id: "pg2", name: "베이직 볼펜" },
                { id: "pg3", name: "핀 버튼" },
                { id: "pg4", name: "포토 티켓" },
                { id: "pg5", name: "심플 글라스" },
                { id: "pg6", name: "리유저블컵" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "banner",
      name: "현수막/배너",
      columns: [
        {
          id: "col-banner-1",
          groups: [
            {
              id: "banner-main",
              name: "",
              items: [
                { id: "bn1", name: "현수막" },
                { id: "bn2", name: "스탠다드 배너" },
                { id: "bn3", name: "양면 배너" },
                { id: "bn4", name: "롤업 배너" },
                { id: "bn5", name: "미니 배너" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "poster",
      name: "포스터/사인",
      columns: [
        {
          id: "col-poster-1",
          groups: [
            {
              id: "poster-main",
              name: "",
              items: [
                { id: "po1", name: "포스터" },
                { id: "po2", name: "보드 사인" },
                { id: "po3", name: "아크릴 사인" },
                { id: "po4", name: "메탈 사인" },
                { id: "po5", name: "원목 사인" },
                { id: "po6", name: "테이블탑 사인" },
                { id: "po7", name: "A 프레임 사인" },
                { id: "po8", name: "카 마그넷" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "goods",
      name: "굿즈",
      badge: "HOT",
      columns: [
        {
          id: "col-goods-1",
          groups: [
            {
              id: "goods-diary",
              name: "다이어리/메모",
              items: [
                { id: "gd1", name: "하드커버 다이어리", badge: "HOT" },
                { id: "gd2", name: "투명PVC커버 다이어리", badge: "HOT" },
                { id: "gd3", name: "소프트커버 다이어리", badge: "HOT" },
                { id: "gd4", name: "메모패드" },
                { id: "gd5", name: "노트패드" },
              ],
            },
            {
              id: "goods-cup",
              name: "컵/텀블러",
              items: [
                { id: "gc1", name: "뉴 스택 글라스" },
                { id: "gc2", name: "스트레이트 글라스" },
                { id: "gc3", name: "심플 글라스" },
                { id: "gc4", name: "리유저블컵" },
                { id: "gc5", name: "반투명 리유저블컵" },
                { id: "gc6", name: "에코 텀블러" },
                { id: "gc7", name: "월머그 텀블러" },
              ],
            },
          ],
        },
        {
          id: "col-goods-2",
          groups: [
            {
              id: "goods-pen",
              name: "볼펜/필기류",
              items: [
                { id: "gp1", name: "베이직 볼펜" },
                { id: "gp2", name: "스탠다드 볼펜" },
                { id: "gp3", name: "친환경 볼펜" },
              ],
            },
            {
              id: "goods-fan",
              name: "부채",
              items: [{ id: "gf1", name: "부채" }],
            },
          ],
        },
        {
          id: "col-goods-3",
          groups: [
            {
              id: "goods-acrylic",
              name: "아크릴 굿즈",
              items: [
                { id: "ga1", name: "아크릴 키링", badge: "HOT" },
                { id: "ga2", name: "아크릴 마그넷" },
              ],
            },
          ],
        },
        {
          id: "col-goods-4",
          groups: [
            {
              id: "goods-photo",
              name: "포토 굿즈",
              items: [
                { id: "gph1", name: "필름 북마크" },
                { id: "gph2", name: "포토 티켓" },
              ],
            },
          ],
        },
        {
          id: "col-goods-5",
          groups: [
            {
              id: "goods-btn",
              name: "버튼/액세서리",
              items: [
                { id: "gb1", name: "핀 버튼" },
                { id: "gb2", name: "거울 버튼" },
                { id: "gb3", name: "자석 버튼" },
                { id: "gb4", name: "스마트 톡" },
                { id: "gb5", name: "오바룩 마우스패드", badge: "NEW" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "card",
      name: "카드",
      columns: [
        {
          id: "col-card-1",
          groups: [
            {
              id: "card-main",
              name: "카드",
              items: [
                { id: "c1", name: "기본 카드" },
                { id: "c2", name: "2단 카드" },
                { id: "c3", name: "투명 글로시 카드" },
                { id: "c4", name: "실버 글로시 카드" },
                { id: "c5", name: "골드 글로시 카드" },
                { id: "c6", name: "홀로그램 글로시 카드" },
              ],
            },
          ],
        },
        {
          id: "col-card-2",
          groups: [
            {
              id: "card-env",
              name: "카드봉투",
              items: [
                { id: "ce1", name: "카드 봉투" },
                { id: "ce2", name: "무지 카드 봉투" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "envelope",
      name: "봉투/쇼핑백",
      columns: [
        {
          id: "col-env-1",
          groups: [
            {
              id: "env-main",
              name: "",
              items: [
                { id: "e1", name: "봉투" },
                { id: "e2", name: "쇼핑백" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "calendar",
      name: "캘린더",
      columns: [
        {
          id: "col-cal-1",
          groups: [
            {
              id: "cal-main",
              name: "",
              items: [
                { id: "ca1", name: "탁상 캘린더" },
                { id: "ca2", name: "벽걸이 캘린더" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "accessory",
      name: "액세서리",
      columns: [
        {
          id: "col-acc-1",
          groups: [
            {
              id: "acc-main",
              name: "",
              items: [
                { id: "ac1", name: "무지봉투" },
                { id: "ac2", name: "아크릴 홀더" },
                { id: "ac3", name: "거치대 및 부자재" },
                { id: "ac4", name: "이젤" },
                { id: "ac5", name: "무지 크라프트 쇼핑백" },
                { id: "ac6", name: "롤스티커 디스펜서" },
                { id: "ac7", name: "PVC 펜 파우치" },
                { id: "ac8", name: "PVC 슬라이드 지퍼백" },
                { id: "ac9", name: "리유저블 스트로우" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "apparel",
      name: "어패럴",
      badge: "SALE",
      columns: [
        {
          id: "col-ap-1",
          groups: [
            {
              id: "ap-main",
              name: "",
              items: [
                { id: "ap1", name: "티셔츠" },
                { id: "ap2", name: "맨투맨/후드/집업" },
                { id: "ap3", name: "모자" },
                { id: "ap4", name: "잡화" },
                { id: "ap5", name: "자수" },
                { id: "ap6", name: "단체추천" },
                { id: "ap7", name: "클리어런스", badge: "SALE" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const NEW_CUP_CATEGORY = {
  id: "cup-tumbler",
  name: "컵/텀블러",
  isNew: true,
  columns: [
    {
      id: "col-ct-1",
      groups: [
        {
          id: "ct-mug",
          name: "머그컵",
          items: [
            { id: "ctm1", name: "본차이나 머그컵 S/M" },
            { id: "ctm2", name: "내열유리 반투명 머그컵" },
            { id: "ctm3", name: "제로마크 캠프 스텐컵" },
            { id: "ctm4", name: "라운드 마블 머그컵" },
            { id: "ctm5", name: "컬러 스택 머그컵" },
          ],
        },
      ],
    },
    {
      id: "col-ct-2",
      groups: [
        {
          id: "ct-glass",
          name: "유리컵",
          items: [
            { id: "ctg1", name: "내열유리 머그컵 S/M/L" },
            { id: "ctg2", name: "내열유리 머그컵 S/M/L" },
            { id: "ctg3", name: "내열유리 머그컵 S/M/L" },
            { id: "ctg4", name: "내열유리 머그컵 S/M/L" },
            { id: "ctg5", name: "내열유리 머그컵 S/M/L" },
            { id: "ctg6", name: "내열유리 머그컵 S/M/L" },
          ],
        },
      ],
    },
    {
      id: "col-ct-3",
      groups: [
        {
          id: "ct-tumbler",
          name: "텀블러",
          items: [
            { id: "ctt1", name: "제로마크 메탈 스포츠보틀" },
            { id: "ctt2", name: "제로마크 메탈 스포츠보틀" },
            { id: "ctt3", name: "제로마크 메탈 스포츠보틀" },
            { id: "ctt4", name: "제로마크 메탈 스포츠보틀" },
            { id: "ctt5", name: "제로마크 메탈 스포츠보틀" },
            { id: "ctt6", name: "컬러 스택 머그컵" },
            { id: "ctt7", name: "컬러 스택 머그컵" },
            { id: "ctt8", name: "컬러 스택 머그컵" },
            { id: "ctt9", name: "컬러 스택 머그컵" },
            { id: "ctt10", name: "컬러 스택 머그컵" },
            { id: "ctt11", name: "컬러 스택 머그컵" },
            { id: "ctt12", name: "컬러 스택 머그컵" },
          ],
        },
      ],
    },
    {
      id: "col-ct-4",
      groups: [
        {
          id: "ct-reusable",
          name: "리유저블컵",
          items: [
            { id: "ctr1", name: "리유저블컵" },
            { id: "ctr2", name: "반투명 리유저블컵" },
          ],
        },
      ],
    },
    {
      id: "col-ct-5",
      groups: [
        {
          id: "ct-engrave",
          name: "레이저 각인",
          items: [
            { id: "cte1", name: "[각인] 제로마크 캠프 스텐컵" },
            { id: "cte2", name: "[각인] 제로마크 캠프 스텐컵" },
            { id: "cte3", name: "[각인] 제로마크 캠프 스텐컵" },
            { id: "cte4", name: "[각인] 제로마크 캠프 스텐컵" },
            { id: "cte5", name: "[각인] 제로마크 캠프 스텐컵" },
            { id: "cte6", name: "[각인] 제로마크 캠프 스텐컵" },
            { id: "cte7", name: "[각인] 제로마크 캠프 스텐컵" },
            { id: "cte8", name: "[각인] 제로마크 캠프 스텐컵" },
            { id: "cte9", name: "[각인] 제로마크 캠프 스텐컵" },
            { id: "cte10", name: "[각인] 제로마크 캠프 스텐컵" },
          ],
        },
      ],
    },
  ],
};

const getInitialAfterData = () => {
  const afterCategories = JSON.parse(JSON.stringify(INITIAL_DATA.categories));
  const goodsIndex = afterCategories.findIndex((c) => c.id === "goods");
  afterCategories.splice(goodsIndex + 1, 0, JSON.parse(JSON.stringify(NEW_CUP_CATEGORY)));
  return { categories: afterCategories };
};

const uid = () => Math.random().toString(36).slice(2, 10);

const getAllItems = (category) => {
  const items = new Map();
  (category.columns || []).forEach((col) =>
    (col.groups || []).forEach((grp) =>
      (grp.items || []).forEach((itm) => items.set(itm.id, itm.name))
    )
  );
  return items;
};

const hasAnyGroupName = (category) =>
  (category.columns || []).some((col) =>
    (col.groups || []).some((g) => g.name && g.name.trim())
  );

// ============================================================================
// 뱃지
// ============================================================================
function CategoryBadge({ type }) {
  const baseStyle = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: "-14px",
    fontSize: "9px",
    fontWeight: 700,
    padding: "2px 6px",
    borderRadius: "9999px",
    lineHeight: 1,
    whiteSpace: "nowrap",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    display: "inline-flex",
    alignItems: "center",
    gap: "2px",
  };
  if (type === "HOT") {
    return (
      <span style={{ ...baseStyle, backgroundColor: COLORS.badgeHot, color: "#fff" }}>
        <Flame style={{ width: 8, height: 8 }} strokeWidth={3} />
        HOT
      </span>
    );
  }
  if (type === "NEW") {
    return <span style={{ ...baseStyle, backgroundColor: COLORS.badgeNew, color: "#fff" }}>NEW</span>;
  }
  if (type === "SALE") {
    return (
      <span
        style={{
          ...baseStyle,
          background: `linear-gradient(to right, ${COLORS.badgeSaleFrom}, ${COLORS.badgeSaleTo})`,
          color: "#fff",
        }}
      >
        SALE
      </span>
    );
  }
  if (type === "NEW_CAT") {
    return <span style={{ ...baseStyle, backgroundColor: COLORS.logoBlue, color: "#fff" }}>NEW</span>;
  }
  return null;
}

function ItemBadge({ type }) {
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "1px",
    fontSize: "9px",
    fontWeight: 700,
    padding: "1px 4px",
    borderRadius: "9999px",
    lineHeight: 1,
    marginLeft: "4px",
  };
  if (type === "HOT") {
    return (
      <span style={{ ...baseStyle, backgroundColor: COLORS.badgeHotBg, color: COLORS.badgeHot }}>
        <Flame style={{ width: 8, height: 8 }} strokeWidth={2.5} />
        HOT
      </span>
    );
  }
  if (type === "NEW") {
    return (
      <span style={{ ...baseStyle, backgroundColor: COLORS.badgeNewBg, color: COLORS.badgeNew, padding: "1px 5px" }}>
        NEW
      </span>
    );
  }
  if (type === "SALE") {
    return (
      <span
        style={{
          ...baseStyle,
          background: `linear-gradient(to right, ${COLORS.badgeSaleFrom}, ${COLORS.badgeSaleTo})`,
          color: "#fff",
          padding: "1px 5px",
        }}
      >
        SALE
      </span>
    );
  }
  return null;
}

// ============================================================================
// GNB 미리보기 — 1440px 고정 컨테이너 + 중앙 정렬
// 실제 오프린트미와 동일한 구조:
//   바깥: 전체 폭 배경 (흰색)
//   내부: max-width 1440px + margin auto + 좌우 40px 여백
//   드롭다운: 내부 컨테이너 폭과 동일하게 펼쳐짐
// ============================================================================
function GnbPreview({ data, label, highlightNew = false, originalCategoryIds = [] }) {
  const [openId, setOpenId] = useState(null);
  // 각 카테고리의 화면 내 위치(left, width) 추적
  const [catRects, setCatRects] = useState({});
  const barRef = useRef(null);
  const catRefs = useRef({});

  const openCategory = data.categories.find((c) => c.id === openId);

  // 카테고리 위치 측정 (마운트 후 + resize + 데이터 변경 시)
  useEffect(() => {
    const measure = () => {
      if (!barRef.current) return;
      const barLeft = barRef.current.getBoundingClientRect().left;
      const next = {};
      data.categories.forEach((cat) => {
        const el = catRefs.current[cat.id];
        if (el) {
          const r = el.getBoundingClientRect();
          next[cat.id] = { left: r.left - barLeft, width: r.width, center: r.left - barLeft + r.width / 2 };
        }
      });
      setCatRects(next);
    };
    measure();
    window.addEventListener("resize", measure);
    // 폰트 로드 등으로 레이아웃이 지연될 수 있어 살짝 후에 한번 더
    const t = setTimeout(measure, 100);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [data]);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: `1px solid ${COLORS.borderBase}`,
        borderRadius: "8px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      {/* 라벨 */}
      <div
        style={{
          padding: "8px 16px",
          backgroundColor: "#F9FAFB",
          borderBottom: `1px solid ${COLORS.borderBase}`,
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "12px", fontWeight: 600, color: COLORS.textSecondary }}>
          {label}
        </span>
        <span style={{ fontSize: "10px", color: "#9CA3AF" }}>
          실제 홈페이지 기준: 최대 콘텐츠 폭 {LAYOUT.containerMaxWidth}px · 중앙 정렬
        </span>
      </div>

      {/* 전체 폭 래퍼 - 연한 회색 배경으로 좌우 여백 시각화 */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#F9FAFB",
          position: "relative",
        }}
        onMouseLeave={() => setOpenId(null)}
      >
        {/* 중앙 정렬 고정폭 컨테이너 (1440px) */}
        <div
          style={{
            maxWidth: `${LAYOUT.containerMaxWidth}px`,
            margin: "0 auto",
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          {/* ── 1줄: 로고 + 스위처 / 우측 유틸 ────────────────── */}
          <div
            style={{
              padding: `30px ${LAYOUT.containerPaddingX}px 16px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              zIndex: 2,
              backgroundColor: "#fff",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "36px", flexShrink: 0 }}>
              {/* 로고 - OH PRINT.ME (공백 포함) */}
              <div
                style={{
                  fontWeight: 900,
                  fontSize: "30px",
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "baseline",
                  gap: "8px",
                }}
              >
                <span style={{ color: COLORS.logoOrange }}>OH</span>
                <span style={{ color: COLORS.logoBlue }}>PRINT.ME</span>
              </div>

              {/* 오프린트미/어패럴 스위처 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  border: `1px solid ${COLORS.borderBase}`,
                  borderRadius: "9999px",
                  padding: "4px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    padding: "8px 18px",
                    fontSize: "14px",
                    fontWeight: 600,
                    backgroundColor: COLORS.textPrimary,
                    color: "#fff",
                    borderRadius: "9999px",
                    lineHeight: 1,
                  }}
                >
                  오프린트미
                </span>
                <span
                  style={{
                    position: "relative",
                    padding: "8px 18px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#9CA3AF",
                    lineHeight: 1,
                  }}
                >
                  어패럴
                  <span
                    style={{
                      position: "absolute",
                      top: "-9px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: COLORS.badgeNew,
                      color: "#fff",
                      fontSize: "8px",
                      fontWeight: 700,
                      padding: "1px 5px",
                      borderRadius: "9999px",
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    NEW
                  </span>
                </span>
              </div>
            </div>

            {/* 우측 유틸 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                fontSize: "14px",
                color: "#374151",
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              <span style={{ cursor: "pointer", whiteSpace: "nowrap" }}>대량구매</span>
              <span style={{ cursor: "pointer", whiteSpace: "nowrap" }}>브랜드 굿즈</span>
              <span
                style={{
                  padding: "9px 18px",
                  border: `1px solid ${COLORS.borderBase}`,
                  borderRadius: "9999px",
                  fontSize: "13px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                All about 오프린트미
              </span>
              <User style={{ width: 22, height: 22, color: "#1F2937", flexShrink: 0 }} strokeWidth={1.5} />
              <ShoppingCart style={{ width: 22, height: 22, color: "#1F2937", flexShrink: 0 }} strokeWidth={1.5} />
            </div>
          </div>

          {/* ── 2줄: 카테고리 드롭다운 + 대카테고리 리스트 ───────── */}
          <div style={{ position: "relative", zIndex: 10 }}>
            <div
              ref={barRef}
              style={{
                padding: `16px ${LAYOUT.containerPaddingX}px 28px`,
                display: "flex",
                alignItems: "center",
                gap: "24px",
                backgroundColor: "#fff",
                position: "relative",
              }}
            >
              {/* 카테고리 드롭다운 트리거 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "17px",
                  fontWeight: 700,
                  color: COLORS.textPrimary,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <span>카테고리</span>
                <ChevronDown style={{ width: 16, height: 16 }} strokeWidth={2.5} />
              </div>
              <div
                style={{
                  width: "1px",
                  height: "18px",
                  backgroundColor: COLORS.borderBase,
                  flexShrink: 0,
                }}
              />

              {/* 대카테고리 리스트 - space-between으로 전체 폭 활용 (실제 홈페이지와 동일) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: 1,
                  minWidth: 0,
                  flexWrap: "nowrap",
                }}
              >
                {data.categories.map((cat) => {
                  const isNewCat = highlightNew && !originalCategoryIds.includes(cat.id);
                  const isOpen = openId === cat.id;
                  return (
                    <div
                      key={cat.id}
                      ref={(el) => (catRefs.current[cat.id] = el)}
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                      onMouseEnter={() => setOpenId(cat.id)}
                    >
                      <span style={{ position: "relative", display: "inline-block" }}>
                        <span
                          style={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: isNewCat
                              ? COLORS.logoBlue
                              : isOpen
                              ? COLORS.textPrimary
                              : "#1F2937",
                            display: "inline-block",
                            position: "relative",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {cat.name}
                          {isOpen && (
                            <span
                              style={{
                                position: "absolute",
                                bottom: "-30px",
                                left: 0,
                                right: 0,
                                height: "2px",
                                backgroundColor: COLORS.textPrimary,
                              }}
                            />
                          )}
                        </span>
                        {cat.badge && <CategoryBadge type={cat.badge} />}
                        {isNewCat && !cat.badge && <CategoryBadge type="NEW_CAT" />}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 드롭다운 - 해당 카테고리 바로 아래 + 열 개수만큼 폭 */}
            {openCategory && catRects[openCategory.id] && (
              <Dropdown
                category={openCategory}
                anchorRect={catRects[openCategory.id]}
                barWidth={barRef.current?.offsetWidth || LAYOUT.containerMaxWidth}
              />
            )}
          </div>

          {/* 히어로 영역 - 중앙 1440px 컨테이너 내부 */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              height: "420px",
              background: "linear-gradient(135deg, #F9FAFB 0%, #F9FAFB 60%, #F3F4F6 100%)",
              borderTop: `1px solid ${COLORS.borderLight}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "12px", color: "#9CA3AF" }}>
              히어로 배너 영역 (더미) · 드롭다운이 이 영역 위로 겹쳐서 노출됩니다
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 드롭다운
// - 카테고리 위치 기반 (해당 카테고리 바로 아래에서 시작)
// - 폭은 열 개수 × 컬럼 폭 기반으로 자동 결정
// - 화면 우측을 넘어가지 않도록 자동 보정
// ============================================================================
function Dropdown({ category, anchorRect, barWidth }) {
  if (!category) return null;
  const columns = (category.columns || []).filter(
    (col) => (col.groups || []).length > 0
  );
  if (columns.length === 0) return null;

  const showGroupName = hasAnyGroupName(category);
  const columnCount = Math.min(columns.length, MAX_COLUMNS);

  // 레이아웃 상수
  const COLUMN_WIDTH = 180; // 한 열 기준 폭
  const COLUMN_GAP = 32;    // 열 간격
  const PANEL_PADDING_X = 24; // 드롭다운 좌우 내부 패딩
  const PANEL_PADDING_Y = 24;

  // 패널 폭 = 열들 + 간격 + 좌우 패딩
  const panelWidth =
    columnCount * COLUMN_WIDTH + (columnCount - 1) * COLUMN_GAP + PANEL_PADDING_X * 2;

  // 위치 계산: 카테고리 좌측 기준, 화면 우측 넘어가면 당겨오기
  const anchorLeft = anchorRect?.left ?? 0;
  const maxLeft = Math.max(0, barWidth - panelWidth);
  const left = Math.min(anchorLeft - PANEL_PADDING_X, maxLeft);
  // left가 음수가 되지 않도록 보정
  const finalLeft = Math.max(0, left);

  return (
    <div
      style={{
        position: "absolute",
        left: `${finalLeft}px`,
        top: "100%",
        width: `${panelWidth}px`,
        backgroundColor: "#fff",
        boxShadow: "0 12px 24px -6px rgba(0,0,0,0.12)",
        borderTop: `1px solid ${COLORS.borderLight}`,
      }}
    >
      <div
        style={{
          padding: `${PANEL_PADDING_Y}px ${PANEL_PADDING_X}px`,
          display: "grid",
          gridTemplateColumns: `repeat(${columnCount}, ${COLUMN_WIDTH}px)`,
          columnGap: `${COLUMN_GAP}px`,
          rowGap: "24px",
          alignItems: "start",
        }}
      >
        {columns.slice(0, MAX_COLUMNS).map((col) => (
          <DropdownColumn key={col.id} column={col} showGroupName={showGroupName} />
        ))}
      </div>
    </div>
  );
}

function DropdownColumn({ column, showGroupName }) {
  return (
    <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: "20px" }}>
      {column.groups.map((group) => (
        <div key={group.id}>
          {showGroupName && group.name ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                marginBottom: "14px",
                fontSize: "13px",
                fontWeight: 700,
                color: COLORS.textPrimary,
                cursor: "pointer",
              }}
            >
              <span>{group.name}</span>
              <ChevronRight style={{ width: 12, height: 12 }} strokeWidth={2.5} />
            </div>
          ) : null}
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {group.items.map((item) => (
              <li
                key={item.id}
                style={{
                  fontSize: "13px",
                  color: COLORS.textSecondary,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 0",
                }}
              >
                <span>{item.name}</span>
                <ItemBadge type={item.badge} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 일괄 추가 모달
// ============================================================================
function BulkAddModal({ isOpen, onClose, onAdd, targetName }) {
  const [text, setText] = useState("");
  const [defaultBadge, setDefaultBadge] = useState("");
  if (!isOpen) return null;

  const handleAdd = () => {
    const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    if (lines.length === 0) {
      alert("추가할 항목을 입력해주세요.");
      return;
    }
    onAdd(lines, defaultBadge);
    setText("");
    setDefaultBadge("");
    onClose();
  };

  const handleClose = () => {
    setText("");
    setDefaultBadge("");
    onClose();
  };

  const lineCount = text.split("\n").filter((l) => l.trim().length > 0).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-md p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">항목 일괄 추가</h3>
            {targetName && (
              <p className="text-xs text-gray-500 mt-0.5">
                대상 그룹: <span className="font-medium text-gray-700">{targetName}</span>
              </p>
            )}
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            한 줄에 하나씩 입력해주세요
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`예시:\n본차이나 머그컵 S/M\n내열유리 반투명 머그컵\n제로마크 캠프 스텐컵`}
            className="w-full h-40 text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none resize-none font-mono"
            autoFocus
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-gray-500">
              입력된 항목: <b className="text-gray-900">{lineCount}개</b>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500">일괄 뱃지:</span>
              <select
                value={defaultBadge}
                onChange={(e) => setDefaultBadge(e.target.value)}
                className="text-xs px-1.5 py-0.5 border border-gray-200 rounded bg-white"
              >
                <option value="">없음</option>
                <option value="HOT">HOT</option>
                <option value="NEW">NEW</option>
                <option value="SALE">SALE</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white rounded-md"
            style={{ backgroundColor: COLORS.textPrimary }}
          >
            <ListPlus className="w-3.5 h-3.5" />
            {lineCount > 0 ? `${lineCount}개 추가` : "추가"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 편집 UI
// ============================================================================
function EditorPanel({ data, setData, originalCategoryIds }) {
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const [expandedGroupIds, setExpandedGroupIds] = useState({});
  const [bulkAddTarget, setBulkAddTarget] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);

  const updateData = (updater) => {
    setData((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      updater(next);
      return next;
    });
  };

  const toggleCategory = (id) => setExpandedCategoryId(expandedCategoryId === id ? null : id);
  const toggleGroup = (id) => setExpandedGroupIds((prev) => ({ ...prev, [id]: !prev[id] }));

  const addCategory = () => {
    const newId = uid();
    updateData((d) => {
      d.categories.push({
        id: newId,
        name: "새 대카테고리",
        columns: [
          {
            id: uid(),
            groups: [{ id: uid(), name: "", items: [{ id: uid(), name: "새 항목" }] }],
          },
        ],
      });
    });
    setExpandedCategoryId(newId);
  };

  const removeCategory = (catId) => {
    if (!confirm("이 대카테고리를 삭제하시겠어요?")) return;
    updateData((d) => {
      d.categories = d.categories.filter((c) => c.id !== catId);
    });
  };

  const moveCategory = (catId, direction) => {
    updateData((d) => {
      const idx = d.categories.findIndex((c) => c.id === catId);
      const newIdx = direction === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= d.categories.length) return;
      [d.categories[idx], d.categories[newIdx]] = [d.categories[newIdx], d.categories[idx]];
    });
  };

  const renameCategory = (catId, name) => {
    updateData((d) => {
      const cat = d.categories.find((c) => c.id === catId);
      if (cat) cat.name = name;
    });
  };

  const setCategoryBadge = (catId, badge) => {
    updateData((d) => {
      const cat = d.categories.find((c) => c.id === catId);
      if (cat) {
        if (badge) cat.badge = badge;
        else delete cat.badge;
      }
    });
  };

  const addColumn = (catId) => {
    updateData((d) => {
      const cat = d.categories.find((c) => c.id === catId);
      if (cat && (cat.columns?.length || 0) < MAX_COLUMNS) {
        cat.columns.push({
          id: uid(),
          groups: [{ id: uid(), name: "새 그룹", items: [] }],
        });
      }
    });
  };

  const removeColumn = (catId, colId) => {
    if (!confirm("이 열을 삭제하시겠어요? 안에 있는 그룹도 모두 삭제됩니다.")) return;
    updateData((d) => {
      const cat = d.categories.find((c) => c.id === catId);
      if (cat) cat.columns = cat.columns.filter((c) => c.id !== colId);
    });
  };

  const addGroup = (catId, colId) => {
    updateData((d) => {
      const cat = d.categories.find((c) => c.id === catId);
      const col = cat?.columns.find((c) => c.id === colId);
      if (col) {
        col.groups.push({ id: uid(), name: "새 그룹", items: [{ id: uid(), name: "새 항목" }] });
      }
    });
  };

  const removeGroup = (catId, colId, groupId) => {
    if (!confirm("이 그룹을 삭제하시겠어요?")) return;
    updateData((d) => {
      const cat = d.categories.find((c) => c.id === catId);
      const col = cat?.columns.find((c) => c.id === colId);
      if (col) col.groups = col.groups.filter((g) => g.id !== groupId);
    });
  };

  const renameGroup = (catId, colId, groupId, name) => {
    updateData((d) => {
      const cat = d.categories.find((c) => c.id === catId);
      const col = cat?.columns.find((c) => c.id === colId);
      const grp = col?.groups.find((g) => g.id === groupId);
      if (grp) grp.name = name;
    });
  };

  const moveGroup = (catId, fromColId, groupId, toColId) => {
    if (fromColId === toColId) return;
    updateData((d) => {
      const cat = d.categories.find((c) => c.id === catId);
      if (!cat) return;
      const fromCol = cat.columns.find((c) => c.id === fromColId);
      const toCol = cat.columns.find((c) => c.id === toColId);
      if (!fromCol || !toCol) return;
      const groupIdx = fromCol.groups.findIndex((g) => g.id === groupId);
      if (groupIdx === -1) return;
      const [group] = fromCol.groups.splice(groupIdx, 1);
      toCol.groups.push(group);
    });
  };

  const reorderGroupInColumn = (catId, colId, groupId, direction) => {
    updateData((d) => {
      const cat = d.categories.find((c) => c.id === catId);
      const col = cat?.columns.find((c) => c.id === colId);
      if (!col) return;
      const idx = col.groups.findIndex((g) => g.id === groupId);
      const newIdx = direction === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= col.groups.length) return;
      [col.groups[idx], col.groups[newIdx]] = [col.groups[newIdx], col.groups[idx]];
    });
  };

  const addItem = (catId, colId, groupId) => {
    updateData((d) => {
      const cat = d.categories.find((c) => c.id === catId);
      const col = cat?.columns.find((c) => c.id === colId);
      const grp = col?.groups.find((g) => g.id === groupId);
      if (grp) grp.items.push({ id: uid(), name: "새 항목" });
    });
  };

  const bulkAddItems = (catId, colId, groupId, names, defaultBadge) => {
    updateData((d) => {
      const cat = d.categories.find((c) => c.id === catId);
      const col = cat?.columns.find((c) => c.id === colId);
      const grp = col?.groups.find((g) => g.id === groupId);
      if (grp) {
        names.forEach((name) => {
          const item = { id: uid(), name };
          if (defaultBadge) item.badge = defaultBadge;
          grp.items.push(item);
        });
      }
    });
    setExpandedGroupIds((prev) => ({ ...prev, [groupId]: true }));
  };

  const removeItem = (catId, colId, groupId, itemId) => {
    updateData((d) => {
      const cat = d.categories.find((c) => c.id === catId);
      const col = cat?.columns.find((c) => c.id === colId);
      const grp = col?.groups.find((g) => g.id === groupId);
      if (grp) grp.items = grp.items.filter((i) => i.id !== itemId);
    });
  };

  const renameItem = (catId, colId, groupId, itemId, name) => {
    updateData((d) => {
      const cat = d.categories.find((c) => c.id === catId);
      const col = cat?.columns.find((c) => c.id === colId);
      const grp = col?.groups.find((g) => g.id === groupId);
      const itm = grp?.items.find((i) => i.id === itemId);
      if (itm) itm.name = name;
    });
  };

  const setItemBadge = (catId, colId, groupId, itemId, badge) => {
    updateData((d) => {
      const cat = d.categories.find((c) => c.id === catId);
      const col = cat?.columns.find((c) => c.id === colId);
      const grp = col?.groups.find((g) => g.id === groupId);
      const itm = grp?.items.find((i) => i.id === itemId);
      if (itm) {
        if (badge) itm.badge = badge;
        else delete itm.badge;
      }
    });
  };

  const handleDragStart = (catId, colId, groupId) => (e) => {
    setDragging({ catId, fromColId: colId, groupId });
    e.dataTransfer.effectAllowed = "move";
    try {
      e.dataTransfer.setData("text/plain", groupId);
    } catch {}
  };

  const handleDragOver = (catId, colId) => (e) => {
    if (dragging && dragging.catId === catId) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (dragOverCol?.catId !== catId || dragOverCol?.colId !== colId) {
        setDragOverCol({ catId, colId });
      }
    }
  };

  const handleDrop = (catId, colId) => (e) => {
    e.preventDefault();
    if (dragging && dragging.catId === catId) {
      moveGroup(dragging.catId, dragging.fromColId, dragging.groupId, colId);
    }
    setDragging(null);
    setDragOverCol(null);
  };

  const handleDragEnd = () => {
    setDragging(null);
    setDragOverCol(null);
  };

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">개편안 편집</h3>
          <button
            onClick={addCategory}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white rounded-md"
            style={{ backgroundColor: COLORS.textPrimary }}
          >
            <Plus className="w-3.5 h-3.5" />
            대카테고리 추가
          </button>
        </div>

        <div className="space-y-2">
          {data.categories.map((cat, catIdx) => {
            const isExpanded = expandedCategoryId === cat.id;
            const isNew = !originalCategoryIds.includes(cat.id);
            return (
              <div
                key={cat.id}
                className="border rounded-md overflow-hidden"
                style={{
                  borderColor: isNew ? "#93C5FD" : COLORS.borderBase,
                  backgroundColor: isNew ? "rgba(239, 246, 255, 0.5)" : "#fff",
                }}
              >
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className="flex flex-col">
                    <button
                      onClick={() => moveCategory(cat.id, "up")}
                      disabled={catIdx === 0}
                      className="text-gray-400 hover:text-gray-700 disabled:opacity-20 leading-none text-xs"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveCategory(cat.id, "down")}
                      disabled={catIdx === data.categories.length - 1}
                      className="text-gray-400 hover:text-gray-700 disabled:opacity-20 leading-none text-xs"
                    >
                      ▼
                    </button>
                  </div>
                  <input
                    type="text"
                    value={cat.name}
                    onChange={(e) => renameCategory(cat.id, e.target.value)}
                    className="flex-1 text-sm font-medium bg-transparent border-b border-transparent hover:border-gray-300 focus:outline-none px-1 py-0.5"
                  />
                  <select
                    value={cat.badge || ""}
                    onChange={(e) => setCategoryBadge(cat.id, e.target.value)}
                    className="text-xs px-1.5 py-0.5 border border-gray-200 rounded bg-white"
                  >
                    <option value="">뱃지없음</option>
                    <option value="HOT">HOT</option>
                    <option value="NEW">NEW</option>
                    <option value="SALE">SALE</option>
                  </select>
                  {isNew && (
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: "#DBEAFE", color: "#2563EB", fontSize: "9px" }}
                    >
                      신규
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    열 {cat.columns?.length || 0}/{MAX_COLUMNS}
                  </span>
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="text-xs text-gray-500 hover:text-gray-900 px-2"
                  >
                    {isExpanded ? "접기" : "펼치기"}
                  </button>
                  <button
                    onClick={() => removeCategory(cat.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {isExpanded && (
                  <div
                    className="px-3 pb-3 pt-2"
                    style={{
                      backgroundColor: "rgba(249, 250, 251, 0.6)",
                      borderTop: `1px solid ${COLORS.borderLight}`,
                    }}
                  >
                    <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                      <Columns3 className="w-3 h-3" />
                      <span>
                        그룹을 드래그해서 다른 열로 이동할 수 있어요 (최대 {MAX_COLUMNS}열)
                      </span>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${Math.max(1, cat.columns?.length || 1)}, minmax(200px, 1fr))`,
                        gap: "8px",
                      }}
                    >
                      {cat.columns.map((col, colIdx) => {
                        const isDragOver =
                          dragOverCol?.catId === cat.id && dragOverCol?.colId === col.id;
                        return (
                          <div
                            key={col.id}
                            onDragOver={handleDragOver(cat.id, col.id)}
                            onDrop={handleDrop(cat.id, col.id)}
                            onDragLeave={() => {
                              if (dragOverCol?.colId === col.id) setDragOverCol(null);
                            }}
                            style={{
                              border: `2px dashed ${isDragOver ? COLORS.logoBlue : COLORS.borderBase}`,
                              borderRadius: "6px",
                              padding: "8px",
                              backgroundColor: isDragOver ? "#EFF6FF" : "#fff",
                              minHeight: "120px",
                              transition: "background-color 0.15s, border-color 0.15s",
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold" style={{ color: COLORS.textSecondary }}>
                                {colIdx + 1}열
                              </span>
                              <button
                                onClick={() => removeColumn(cat.id, col.id)}
                                className="text-gray-300 hover:text-red-500"
                                title="열 삭제"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="space-y-2">
                              {col.groups.length === 0 && (
                                <div
                                  className="text-xs text-gray-400 text-center py-3 border border-dashed rounded"
                                  style={{ borderColor: COLORS.borderLight }}
                                >
                                  빈 열 (여기에 그룹을 드롭)
                                </div>
                              )}
                              {col.groups.map((group, grpIdx) => {
                                const grpExpanded = expandedGroupIds[group.id];
                                const isDragging = dragging?.groupId === group.id;
                                return (
                                  <div
                                    key={group.id}
                                    draggable
                                    onDragStart={handleDragStart(cat.id, col.id, group.id)}
                                    onDragEnd={handleDragEnd}
                                    style={{
                                      border: `1px solid ${COLORS.borderBase}`,
                                      borderRadius: "4px",
                                      padding: "6px 8px",
                                      backgroundColor: "#fff",
                                      opacity: isDragging ? 0.4 : 1,
                                      cursor: "grab",
                                      transition: "opacity 0.15s",
                                    }}
                                  >
                                    <div className="flex items-center gap-1">
                                      <GripVertical
                                        className="w-3 h-3 text-gray-400 flex-shrink-0"
                                        style={{ cursor: "grab" }}
                                      />
                                      <input
                                        type="text"
                                        value={group.name}
                                        onChange={(e) =>
                                          renameGroup(cat.id, col.id, group.id, e.target.value)
                                        }
                                        placeholder="(그룹명 없음)"
                                        className="flex-1 text-xs bg-transparent border-b border-transparent hover:border-gray-300 focus:outline-none min-w-0"
                                        onDragStart={(e) => e.stopPropagation()}
                                        draggable={false}
                                      />
                                    </div>
                                    <div className="flex items-center gap-1 mt-1 flex-wrap">
                                      <div className="flex">
                                        <button
                                          onClick={() =>
                                            reorderGroupInColumn(cat.id, col.id, group.id, "up")
                                          }
                                          disabled={grpIdx === 0}
                                          className="text-gray-400 hover:text-gray-700 disabled:opacity-20 text-[10px] px-1"
                                          title="위로 이동"
                                        >
                                          ▲
                                        </button>
                                        <button
                                          onClick={() =>
                                            reorderGroupInColumn(cat.id, col.id, group.id, "down")
                                          }
                                          disabled={grpIdx === col.groups.length - 1}
                                          className="text-gray-400 hover:text-gray-700 disabled:opacity-20 text-[10px] px-1"
                                          title="아래로 이동"
                                        >
                                          ▼
                                        </button>
                                      </div>
                                      <button
                                        onClick={() =>
                                          setBulkAddTarget({
                                            catId: cat.id,
                                            colId: col.id,
                                            groupId: group.id,
                                            groupName: group.name || cat.name,
                                          })
                                        }
                                        className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded"
                                        style={{ color: COLORS.logoBlue, backgroundColor: "#EFF6FF" }}
                                        title="여러 항목을 한 번에 추가"
                                      >
                                        <ListPlus className="w-2.5 h-2.5" />
                                        일괄
                                      </button>
                                      <button
                                        onClick={() => toggleGroup(group.id)}
                                        className="text-[10px] text-gray-500 hover:text-gray-900 ml-auto"
                                      >
                                        {grpExpanded ? "접기" : `${group.items.length}개`}
                                      </button>
                                      <button
                                        onClick={() => removeGroup(cat.id, col.id, group.id)}
                                        className="text-gray-300 hover:text-red-500"
                                        title="그룹 삭제"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                    {grpExpanded && (
                                      <div
                                        className="mt-2 space-y-1 pt-1"
                                        style={{ borderTop: `1px solid ${COLORS.borderLight}` }}
                                        onDragStart={(e) => e.stopPropagation()}
                                        draggable={false}
                                      >
                                        {group.items.map((item) => (
                                          <div key={item.id} className="flex items-center gap-1">
                                            <span className="text-gray-300 text-[10px]">·</span>
                                            <input
                                              type="text"
                                              value={item.name}
                                              onChange={(e) =>
                                                renameItem(
                                                  cat.id,
                                                  col.id,
                                                  group.id,
                                                  item.id,
                                                  e.target.value
                                                )
                                              }
                                              className="flex-1 text-[11px] bg-white border border-gray-200 rounded px-1.5 py-0.5 focus:outline-none min-w-0"
                                              draggable={false}
                                            />
                                            <select
                                              value={item.badge || ""}
                                              onChange={(e) =>
                                                setItemBadge(
                                                  cat.id,
                                                  col.id,
                                                  group.id,
                                                  item.id,
                                                  e.target.value
                                                )
                                              }
                                              className="text-[10px] px-0.5 py-0.5 border border-gray-200 rounded bg-white"
                                            >
                                              <option value="">-</option>
                                              <option value="HOT">HOT</option>
                                              <option value="NEW">NEW</option>
                                              <option value="SALE">SALE</option>
                                            </select>
                                            <button
                                              onClick={() =>
                                                removeItem(cat.id, col.id, group.id, item.id)
                                              }
                                              className="text-gray-300 hover:text-red-500"
                                            >
                                              <X className="w-2.5 h-2.5" />
                                            </button>
                                          </div>
                                        ))}
                                        <button
                                          onClick={() => addItem(cat.id, col.id, group.id)}
                                          className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-900 mt-0.5"
                                        >
                                          <Plus className="w-2.5 h-2.5" />
                                          항목 추가
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                              <button
                                onClick={() => addGroup(cat.id, col.id)}
                                className="w-full flex items-center justify-center gap-1 text-[10px] text-gray-500 hover:text-gray-900 py-1 border border-dashed rounded"
                                style={{ borderColor: COLORS.borderBase }}
                              >
                                <Plus className="w-3 h-3" />
                                그룹 추가
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {cat.columns.length < MAX_COLUMNS && (
                      <button
                        onClick={() => addColumn(cat.id)}
                        className="mt-2 flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 px-3 py-1.5 border border-dashed rounded"
                        style={{ borderColor: COLORS.borderBase }}
                      >
                        <Plus className="w-3 h-3" />
                        열 추가 ({cat.columns.length}/{MAX_COLUMNS})
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BulkAddModal
        isOpen={!!bulkAddTarget}
        onClose={() => setBulkAddTarget(null)}
        onAdd={(names, badge) =>
          bulkAddTarget &&
          bulkAddItems(bulkAddTarget.catId, bulkAddTarget.colId, bulkAddTarget.groupId, names, badge)
        }
        targetName={bulkAddTarget?.groupName}
      />
    </>
  );
}

// ============================================================================
// Diff Summary
// ============================================================================
function DiffSummary({ before, after }) {
  const summary = useMemo(() => {
    const beforeCatIds = new Set(before.categories.map((c) => c.id));
    const afterCatIds = new Set(after.categories.map((c) => c.id));
    const addedCats = after.categories.filter((c) => !beforeCatIds.has(c.id));
    const removedCats = before.categories.filter((c) => !afterCatIds.has(c.id));
    const renamedCats = [];
    const itemChanges = { added: 0, removed: 0, renamed: 0 };

    after.categories.forEach((afterCat) => {
      const beforeCat = before.categories.find((c) => c.id === afterCat.id);
      if (!beforeCat) return;
      if (beforeCat.name !== afterCat.name) {
        renamedCats.push({ before: beforeCat.name, after: afterCat.name });
      }
      const beforeItems = getAllItems(beforeCat);
      const afterItems = getAllItems(afterCat);
      afterItems.forEach((name, id) => {
        if (!beforeItems.has(id)) itemChanges.added += 1;
        else if (beforeItems.get(id) !== name) itemChanges.renamed += 1;
      });
      beforeItems.forEach((_, id) => {
        if (!afterItems.has(id)) itemChanges.removed += 1;
      });
    });

    return { addedCats, removedCats, renamedCats, itemChanges };
  }, [before, after]);

  const hasChanges =
    summary.addedCats.length > 0 ||
    summary.removedCats.length > 0 ||
    summary.renamedCats.length > 0 ||
    summary.itemChanges.added > 0 ||
    summary.itemChanges.removed > 0 ||
    summary.itemChanges.renamed > 0;

  if (!hasChanges) {
    return (
      <div className="text-xs text-gray-500 bg-gray-50 rounded-md px-3 py-2 border border-gray-200">
        변경사항 없음
      </div>
    );
  }

  return (
    <div className="text-xs bg-gray-50 rounded-md px-3 py-2.5 border border-gray-200 space-y-1.5">
      {summary.addedCats.length > 0 && (
        <div>
          <span className="inline-block w-20 font-semibold" style={{ color: COLORS.logoBlue }}>
            추가 대카테고리
          </span>
          <span className="text-gray-700">{summary.addedCats.map((c) => c.name).join(", ")}</span>
        </div>
      )}
      {summary.removedCats.length > 0 && (
        <div>
          <span className="inline-block w-20 font-semibold" style={{ color: COLORS.badgeHot }}>
            삭제 대카테고리
          </span>
          <span className="text-gray-700">{summary.removedCats.map((c) => c.name).join(", ")}</span>
        </div>
      )}
      {summary.renamedCats.length > 0 && (
        <div>
          <span className="inline-block w-20 font-semibold" style={{ color: "#D97706" }}>
            이름변경
          </span>
          <span className="text-gray-700">
            {summary.renamedCats.map((c) => `${c.before} → ${c.after}`).join(", ")}
          </span>
        </div>
      )}
      <div className="flex gap-3 pt-1 border-t border-gray-200">
        <span className="text-gray-600">
          항목 추가 <b style={{ color: COLORS.logoBlue }}>{summary.itemChanges.added}</b>
        </span>
        <span className="text-gray-600">
          항목 수정 <b style={{ color: "#D97706" }}>{summary.itemChanges.renamed}</b>
        </span>
        <span className="text-gray-600">
          항목 삭제 <b style={{ color: COLORS.badgeHot }}>{summary.itemChanges.removed}</b>
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// 영속 저장 키 (아티팩트 storage용)
// ============================================================================
const STORAGE_KEY = "ohprint-gnb-after-data-v1";

// ============================================================================
// 메인
// ============================================================================
export default function OhprintGnbPrototype() {
  const [beforeData] = useState(INITIAL_DATA);
  const [afterData, setAfterData] = useState(getInitialAfterData());
  const [viewMode, setViewMode] = useState("compare");
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved | error
  const [isLoaded, setIsLoaded] = useState(false);
  const fileInputRef = useRef(null);

  const originalCategoryIds = useMemo(
    () => beforeData.categories.map((c) => c.id),
    [beforeData]
  );

  // 앱 시작 시 저장된 데이터 자동 복원
  useEffect(() => {
    const loadStored = async () => {
      try {
        if (typeof window !== "undefined" && window.storage && typeof window.storage.get === "function") {
          const result = await window.storage.get(STORAGE_KEY);
          if (result && result.value) {
            const parsed = JSON.parse(result.value);
            if (parsed && Array.isArray(parsed.categories)) {
              setAfterData(parsed);
            }
          }
        }
      } catch (err) {
        // 저장된 데이터가 없거나 오류 - 기본 데이터 그대로 사용
        console.log("저장된 데이터 없음, 기본값 사용");
      } finally {
        setIsLoaded(true);
      }
    };
    loadStored();
  }, []);

  // 데이터 변경 시 자동 저장 (디바운스 적용)
  useEffect(() => {
    if (!isLoaded) return; // 초기 로드 전엔 저장 안 함
    if (typeof window === "undefined" || !window.storage || typeof window.storage.set !== "function") {
      return; // 저장소 없는 환경 (일반 브라우저)
    }

    setSaveStatus("saving");
    const timer = setTimeout(async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify(afterData));
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch (err) {
        console.error("저장 실패:", err);
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 3000);
      }
    }, 800); // 800ms 디바운스 - 빠른 연속 변경 시 마지막만 저장

    return () => clearTimeout(timer);
  }, [afterData, isLoaded]);

  const exportJson = () => {
    try {
      const jsonStr = JSON.stringify(afterData, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ohprint-gnb-${new Date().toISOString().slice(0, 10)}.json`;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      // 약간의 지연 후 정리 (브라우저가 다운로드 처리할 시간 확보)
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (err) {
      console.error("내보내기 실패:", err);
      alert("JSON 내보내기 중 오류가 발생했습니다.");
    }
  };

  const importJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed && Array.isArray(parsed.categories)) {
          setAfterData(parsed);
        } else {
          alert("올바른 포맷이 아닙니다.");
        }
      } catch {
        alert("JSON 파싱 실패");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const resetToInitial = async () => {
    if (!confirm("개편안을 초기 상태로 되돌리시겠어요? 자동 저장된 내용도 삭제됩니다.")) return;
    setAfterData(getInitialAfterData());
    // 저장된 데이터도 삭제
    try {
      if (typeof window !== "undefined" && window.storage && typeof window.storage.delete === "function") {
        await window.storage.delete(STORAGE_KEY);
      }
    } catch (err) {
      console.error("저장 삭제 실패:", err);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: "#F3F4F6" }}>
      <div style={{ width: "100%", margin: "0 auto" }}>
        <div className="mb-4 flex flex-wrap items-center gap-3 justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              오프린트미 GNB 개편 프로토타입
              {/* 저장 상태 인디케이터 */}
              {saveStatus === "saving" && (
                <span className="text-xs font-normal text-gray-500 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                  저장 중...
                </span>
              )}
              {saveStatus === "saved" && (
                <span className="text-xs font-normal text-green-600 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
                  자동 저장됨
                </span>
              )}
              {saveStatus === "error" && (
                <span className="text-xs font-normal text-red-600 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full" />
                  저장 실패
                </span>
              )}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              실제 홈페이지 기준 콘텐츠 폭 {LAYOUT.containerMaxWidth}px · 중앙 정렬 · 최대 5열 그리드 · 편집 시 자동 저장
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Upload className="w-3.5 h-3.5" />
              JSON 불러오기
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={importJson}
              className="hidden"
            />
            <button
              onClick={exportJson}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Download className="w-3.5 h-3.5" />
              JSON 내보내기
            </button>
            <button
              onClick={resetToInitial}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              초기화
            </button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-1 bg-white rounded-md p-1 border border-gray-200 w-fit">
          {[
            { id: "compare", label: "변경 전/후 비교", icon: GitCompare },
            { id: "edit", label: "편집 모드", icon: Edit3 },
            { id: "after", label: "개편안만 보기", icon: Eye },
            { id: "before", label: "현재만 보기", icon: Eye },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded"
                style={{
                  backgroundColor: viewMode === tab.id ? COLORS.textPrimary : "transparent",
                  color: viewMode === tab.id ? "#fff" : "#4B5563",
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mb-4">
          <DiffSummary before={beforeData} after={afterData} />
        </div>

        {viewMode === "compare" && (
          <div className="space-y-6">
            <GnbPreview data={beforeData} label="변경 전 (현재 GNB)" />
            <GnbPreview
              data={afterData}
              label="변경 후 (개편안)"
              highlightNew
              originalCategoryIds={originalCategoryIds}
            />
          </div>
        )}

        {viewMode === "before" && <GnbPreview data={beforeData} label="변경 전 (현재 GNB)" />}

        {viewMode === "after" && (
          <GnbPreview
            data={afterData}
            label="변경 후 (개편안)"
            highlightNew
            originalCategoryIds={originalCategoryIds}
          />
        )}

        {viewMode === "edit" && (
          <div className="space-y-4">
            <GnbPreview
              data={afterData}
              label="실시간 미리보기 (개편안)"
              highlightNew
              originalCategoryIds={originalCategoryIds}
            />
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <EditorPanel
                data={afterData}
                setData={setAfterData}
                originalCategoryIds={originalCategoryIds}
              />
            </div>
            <div
              className="text-xs px-3 py-2 rounded-md border"
              style={{ backgroundColor: "#EFF6FF", borderColor: "#DBEAFE", color: "#1E40AF" }}
            >
              💡 <b>사용법</b>: 그룹 카드 왼쪽의 핸들(⋮⋮)을 잡고 다른 열로 드래그하세요. 한 열에 여러 그룹을 쌓을 수 있고, 최대 5열까지 배치 가능합니다.
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-xs text-gray-400">
          Ohprint.me GNB Restructuring Prototype · 기능은 미리보기 전용이며 실제 페이지로 이동하지 않습니다.
        </div>
      </div>
    </div>
  );
}
