import { supabase, isRemoteEnabled } from "./src/supabase.js";

const SAVE_KEY = "studio-verse-v1-save";
const SAVE_VERSION = 3;
const GOAL_ABILITY = 60;
const COSMETICS = [
  { id: "mug", name: "像素马克杯" },
  { id: "fruit-bowl", name: "水果小碗" },
  { id: "plant", name: "蓝色小绿植" },
  { id: "keyboard", name: "复古机械键盘" },
  { id: "lamp", name: "夕阳台灯" },
  { id: "badge", name: "员工工牌" },
  { id: "sticker", name: "CRT 显示器贴纸" },
  { id: "coaster", name: "猫爪杯垫" },
  { id: "poster", name: "低像素城市海报" },
  { id: "vending", name: "迷你饮料柜" }
];

const CATEGORIES = {
  ability: { label: "能力", className: "ability" },
  body: { label: "身体", className: "body" },
  mood: { label: "心情", className: "mood" },
  routine: { label: "流程", className: "routine" }
};

const RULES = {
  waterIntervalMinutes: 45,
  breakIntervalMinutes: 60,
  meetingIntervalMinutes: 45,
  bladderWarning: 70,
  distractionWarning: 65,
  meetingLoadWarning: 60
};

const GENDERS = {
  female: { label: "女" },
  male: { label: "男" },
  nonbinary: { label: "中性" }
};

const OUTFITS = {
  navy: { label: "深海工装" },
  beige: { label: "米色针织" },
  mint: { label: "薄荷外套" },
  coral: { label: "红棕机能" }
};

const EXPRESSIONS = {
  calm: { label: "平静", face: "•‿•" },
  smile: { label: "开心", face: "^‿^" },
  tired: { label: "疲惫", face: "-_-" },
  focus: { label: "专注", face: "•_•" }
};

const MULTIPLAYER_ENABLED = false;
const EMPLOYEE_APPROVAL_REQUIRED = MULTIPLAYER_ENABLED;
const MAX_MEETINGS_PER_DAY = 3;
const AGENDA_RULES = [
  { id: "morning-water", time: "10:00", title: "建议去喝水", text: "上午工作一段时间了，去茶水休息区补充水分。", location: "rest" },
  { id: "mid-morning-break", time: "11:00", title: "起身活动", text: "连续工作接近一小时，建议起身走动、喝水或眺望远处。", location: "rest" },
  { id: "lunch", time: "12:00", title: "午饭时间", text: "去茶水休息区吃饭，恢复身体状态。", location: "rest" },
  { id: "afternoon-water", time: "13:30", title: "补充水分", text: "午后容易缺水，去茶水休息区喝水。", location: "rest" },
  { id: "planning", time: "14:00", title: "整理工作目标", text: "去双人办公室确认下午的工作清单。", location: "office2" },
  { id: "afternoon-water-2", time: "15:00", title: "补充水分", text: "距离上次活动已经有一段时间，建议喝水和短暂离开工位。", location: "rest" },
  { id: "afternoon-break", time: "16:00", title: "起身休息", text: "工作较久了，去休息区摸鱼或小憩。", location: "rest" },
  { id: "late-afternoon-water", time: "16:30", title: "补充水分", text: "下班前再补充一次水分，并活动肩颈。", location: "rest" },
  { id: "daily-report", time: "17:30", title: "整理日报", text: "去资料室记录今天的完成事项。", location: "archive" }
];
const STUDIO_DIRECTORY_KEY = "studio-verse-studio-directory";
const STUDIO_DIRECTORY_VERSION = 2;
const DEMO_STUDIO = { id: "ST-DEMO-001", name: "像素工作室", type: "content", owner: "系统演示" };
const POINT_RULES = { task: 5, work: 10, meeting: 5, goal: 15 };
const SOCIAL_GIFTS = [
  { id: "coffee", name: "咖啡", cost: 10, affection: 4, emoji: "☕" },
  { id: "snack", name: "零食", cost: 15, affection: 6, emoji: "◼" },
  { id: "flower", name: "像素花", cost: 25, affection: 9, emoji: "✿" },
  { id: "sticker", name: "表情贴纸", cost: 8, affection: 3, emoji: "☆" }
];
const SOCIAL_CHATS = [
  { id: "hello", text: "打个招呼", affection: 2, reply: "嗨，今天也一起加油。" },
  { id: "encourage", text: "工作鼓励", affection: 3, reply: "谢谢，你也辛苦了。" },
  { id: "gossip", text: "分享八卦", affection: 2, reply: "这个我记下了，回头细聊。" }
];
const SOCIAL_EMOJIS = ["^_^", ">_<", "•‿•", "T_T"];
const SKIN_OPTIONS = {
  gold: { label: "金色像素", outfit: "gold" },
  midnight: { label: "深夜蓝", outfit: "midnight" },
  cyclone: { label: "旋风红", outfit: "cyclone" }
};
const DEFAULT_REWARDS = [
  { id: "skin-gold", name: "金色像素皮肤", type: "skin", cost: 180, stock: 5, description: "解锁金色像素服装。", skin: "gold" },
  { id: "skin-midnight", name: "深夜蓝皮肤", type: "skin", cost: 150, stock: 5, description: "解锁深夜蓝像素服装。", skin: "midnight" },
  { id: "skin-cyclone", name: "旋风红皮肤", type: "skin", cost: 220, stock: 3, description: "解锁旋风红机能皮肤。", skin: "cyclone" },
  { id: "coffee", name: "咖啡自由券", type: "privilege", cost: 60, stock: 20, description: "今天可以多休息一次。" },
  { id: "early-leave", name: "提前下班券", type: "privilege", cost: 260, stock: 2, description: "允许提前结束今天的打卡任务。" }
];
const DEFAULT_STAFF = [
  { id: "boss", name: "林总", role: "老板", rank: "创始人", status: "Working", taskState: "review", location: "office2", body: 82, mood: 76, ability: 88, points: 500, slacking: false, isBoss: true },
  { id: "aria", name: "Aria", role: "研究员", rank: "高级员工", status: "Working", taskState: "review", location: "archive", body: 78, mood: 82, ability: 64, points: 180, slacking: false },
  { id: "niko", name: "Niko", rank: "员工", role: "工程师", status: "Working", taskState: "working", location: "core", body: 70, mood: 74, ability: 72, points: 120, slacking: false },
  { id: "clio", name: "Clio", rank: "员工", role: "社区运营", status: "Slacking", taskState: "slacking", location: "rest", body: 84, mood: 88, ability: 58, points: 95, slacking: true },
  { id: "mira", name: "Mira", rank: "实习生", role: "设计师", status: "Idle", taskState: "pending", location: "rest", body: 90, mood: 80, ability: 42, points: 40, slacking: true }
];
const PROFESSIONS = {
  designer: {
    id: "designer", name: "设计师", code: "DS", color: "#f1b667", title: "PRODUCT DESIGNER",
    description: "把灵感、构图和配色带上工位。摸鱼和八卦时更容易获得创意。",
    overrides: { plan: "整理今日设计目标", work: "制作今日视觉方案", slack: "刷灵感网站", gossip: "听一点办公室八卦", report: "整理设计日报" }
  },
  engineer: {
    id: "engineer", name: "工程师", code: "EN", color: "#72d2c4", title: "SYSTEM ENGINEER",
    description: "负责系统、工具和故障处理。喝水时更可能触发脑内调试。",
    overrides: { plan: "拆解今日工程任务", work: "修复系统问题", slack: "浏览技术论坛", gossip: "参与工程师茶水会", report: "提交工程日报" }
  },
  producer: {
    id: "producer", name: "制作人", code: "PR", color: "#e27a83", title: "PROJECT PRODUCER",
    description: "负责排期、沟通和风险控制。八卦往往能提前发现项目风险。",
    overrides: { plan: "排出今日优先级", work: "推进项目排期", slack: "思考项目风险", gossip: "收集办公室情报", report: "同步项目进展" }
  }
};

const STUDIO_TYPES = {
  content: {
    id: "content", name: "内容创作工作室", code: "CT", color: "#f1b667", title: "CONTENT STUDIO",
    description: "主打内容策划、品牌叙事和社区运营的创作工作室。", overrides: {}
  },
  game: {
    id: "game", name: "游戏工作室", code: "GM", color: "#72d2c4", title: "GAME STUDIO",
    description: "围绕游戏设计、程序开发和项目制作组建的团队。", overrides: {}
  },
  design: {
    id: "design", name: "设计事务所", code: "DS", color: "#e27a83", title: "DESIGN STUDIO",
    description: "承接品牌、视觉、空间和数字体验项目的设计团队。", overrides: {}
  },
  film: {
    id: "film", name: "影像动画工作室", code: "FL", color: "#b79be8", title: "FILM & MOTION",
    description: "制作动画、短片、动态视觉和影像内容的创作团队。", overrides: {}
  }
};

const TASKS = [
  { id: "water", title: "喝水", category: "body", location: "rest", effects: { body: 8 }, description: "去茶水休息区接一杯水，提升身体状态。" },
  { id: "fruit", title: "吃水果", category: "body", location: "rest", effects: { body: 8, mood: 2 }, description: "补充一点水果和糖分，身体与心情小幅提升。" },
  { id: "plan", title: "写每日工作计划", category: "ability", location: "office2", effects: { ability: 10, mood: 5 }, description: "写下今天要做的事，提升能力与掌控感。" },
  { id: "work", title: "开始工作", category: "ability", location: "core", effects: { ability: 35, body: -20, mood: -5 }, description: "进入核心办公区，完成今天最重要的项目。" },
  { id: "lunch", title: "吃饭", category: "body", location: "rest", effects: { body: 25, mood: 5 }, description: "认真吃一顿饭，身体状态明显恢复。" },
  { id: "toilet", title: "上厕所", category: "body", location: "restroom", effects: { body: 3, mood: 5 }, description: "短暂离开工位，让身体重新舒服一点。" },
  { id: "slack", title: "摸鱼", category: "mood", location: "rest", effects: { mood: 25, body: 8, ability: -4 }, description: "降低一点能力进度，换取今天的好心情。" },
  { id: "gossip", title: "聊八卦", category: "mood", location: "rest", effects: { mood: 15, body: 2, ability: -2 }, description: "和同事交换一点无关紧要但很重要的信息。" },
  { id: "meeting", title: "开会", category: "ability", location: "meeting", effects: { ability: 15, body: -8, mood: -4 }, description: "项目同步结束，能力获得新的推进方向。" },
  { id: "nap", title: "小憩 / 睡觉", category: "body", location: "rest", effects: { body: 20, mood: 8, ability: -2 }, description: "在休息区恢复精神，清除连续工作带来的困意。" },
  { id: "report", title: "写日报", category: "ability", location: "archive", effects: { ability: 6, body: -8, mood: -2 }, description: "把今天做的事情收敛成一份简短记录。" },
];

let selectedProfession = null;
let setupProfile = { nickname: "", gender: "nonbinary", outfit: "navy", expression: "calm", mode: "employee", studioName: "像素工作室", studioId: "ST-DEMO-001" };
let state = loadState();
let activeLocation = null;
let reminderMutedUntil = 0;
let lastSavedAt = 0;

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const professionGrid = document.getElementById("profession-grid");
const startButton = document.getElementById("start-button");
const logList = document.getElementById("log-list");
const toast = document.getElementById("toast");
const summaryDialog = document.getElementById("summary-dialog");
const collectionDialog = document.getElementById("collection-dialog");
const deskDialog = document.getElementById("desk-dialog");
const actionDrawer = document.getElementById("action-drawer");
const actionList = document.getElementById("action-list");
const reminderBar = document.getElementById("reminder-bar");
const nicknameInput = document.getElementById("nickname-input");
const previewAvatar = document.getElementById("preview-avatar");
const previewExpression = document.getElementById("preview-expression");
const previewName = document.getElementById("preview-name");
const previewMeta = document.getElementById("preview-meta");

function getTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function getDateLabel(date = new Date()) {
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatClock(date = new Date(), withSeconds = false) {
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  return withSeconds ? `${hour}:${minute}:${second}` : `${hour}:${minute}`;
}

function daysBetween(dateKeyA, dateKeyB) {
  const a = new Date(`${dateKeyA}T00:00:00`);
  const b = new Date(`${dateKeyB}T00:00:00`);
  return Math.max(1, Math.round((b - a) / 86400000));
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function defaultMetrics() {
  return { hydration: 65, bladder: 20, distraction: 0, meetingLoad: 0 };
}

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const savedMode = parsed?.userMode || parsed?.profile?.mode || "employee";
    const savedStudioType = parsed?.studioType || "content";
    if (!parsed || (savedMode === "employee" ? !PROFESSIONS[parsed.profession] : !STUDIO_TYPES[savedStudioType])) return null;
    return {
      version: SAVE_VERSION,
      profession: savedMode === "creator" ? null : parsed.profession,
      studioType: savedMode === "creator" ? savedStudioType : null,
      profile: parsed.profile || { nickname: parsed.nickname || "RIN", gender: "nonbinary", outfit: "navy", expression: "calm" },
      studioId: parsed.studioId || (savedMode === "creator" ? generateStudioId() : "ST-DEMO-001"),
      studioName: parsed.studioName || (savedMode === "creator" ? ((parsed.profile?.nickname || parsed.nickname || "创始人") + "的工作室") : "像素工作室"),
      needsProfile: !parsed.profile,
      deskId: parsed.deskId || null,
      lastAction: parsed.lastAction || "idle",
      approvalStatus: parsed.approvalStatus || "approved",
      userMode: savedMode,
      points: parsed.points || 0,
      lifetimePoints: parsed.lifetimePoints || 0,
      rewards: parsed.rewards || DEFAULT_REWARDS.map((reward) => ({ ...reward })),
      redeemedRewards: parsed.redeemedRewards || [],
      unlockedSkins: parsed.unlockedSkins || [],
      staff: savedMode === "creator" ? [] : (parsed.staff ? DEFAULT_STAFF.map((base) => ({ ...base, ...(parsed.staff.find((member) => member.id === base.id) || {}) })).concat(parsed.staff.filter((member) => !DEFAULT_STAFF.some((base) => base.id === member.id))) : DEFAULT_STAFF.map((member) => ({ ...member }))),
      relationships: savedMode === "creator" ? (parsed.relationships || {}) : (parsed.relationships || Object.fromEntries((parsed.staff || DEFAULT_STAFF).map((member) => [member.id, { affection: 20, giftsSent: 0, giftsReceived: 0, meetings: 0 }]))),
      socialInbox: parsed.socialInbox || [],
      socialUnread: parsed.socialUnread || 0,
      activeMeetingId: parsed.activeMeetingId || null,
      checkInTime: parsed.checkInTime || "09:00",
      attendance: parsed.attendance || [],
      sleepPending: parsed.sleepPending || false,
      sleepPendingAt: parsed.sleepPendingAt || 0,
      drowsy: parsed.drowsy || false,
      reminderCounts: parsed.reminderCounts || {},
      refusedReminders: parsed.refusedReminders || {},
      reportCount: parsed.reportCount || 0,
      asleep: parsed.asleep || false,
      sleepEndsAt: parsed.sleepEndsAt || 0,
      continuousWorkMinutes: parsed.continuousWorkMinutes || 0,
      fatigueNotified: parsed.fatigueNotified || false,
      workGoals: parsed.workGoals || [],
      agendaTriggered: parsed.agendaTriggered || [],
      agents: parsed.agents || [],
      publishedTasks: parsed.publishedTasks || [],
      meetings: parsed.meetings || [],
      officeLayout: parsed.officeLayout || "default",
      patrolCount: parsed.patrolCount || 0,
      patrolBoost: parsed.patrolBoost || 0,
      playerLocation: parsed.playerLocation || "core",
      lastPatrolAt: parsed.lastPatrolAt || 0,
      day: parsed.day || 1,
      dateKey: parsed.dateKey || getTodayKey(),
      body: parsed.body ?? parsed.energy ?? 72,
      mood: parsed.mood ?? 68,
      ability: parsed.ability ?? parsed.progress ?? 0,
      hydration: parsed.hydration ?? parsed.metrics?.hydration ?? 65,
      bladder: parsed.bladder ?? parsed.metrics?.bladder ?? 20,
      distraction: parsed.distraction ?? parsed.metrics?.distraction ?? 0,
      meetingLoad: parsed.meetingLoad ?? parsed.metrics?.meetingLoad ?? 0,
      completed: Array.isArray(parsed.completed) ? parsed.completed.filter((id) => TASKS.some((task) => task.id === id)) : [],
      actionCounts: parsed.actionCounts || Object.fromEntries((parsed.completed || []).map((id) => [id, 1])),
      workSinceWater: parsed.workSinceWater ?? 0,
      workSinceBreak: parsed.workSinceBreak ?? 0,
      lastActionAt: parsed.lastActionAt || { water: Date.now(), break: Date.now() },
      lastMetricTick: Date.now(),
      logs: Array.isArray(parsed.logs) && parsed.logs.length ? parsed.logs : [{ time: formatClock(), text: "系统恢复完成。今天的目标是完成全部固定任务。" }],
      salary: parsed.salary || 0,
      xp: parsed.xp || 0,
      collection: Array.isArray(parsed.collection) ? parsed.collection : []
    };
  } catch {
    return null;
  }
}

function saveState() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...state, version: SAVE_VERSION }));
    lastSavedAt = Date.now();
  } catch {}
}

function createInitialState(identityId, profile) {
  const mode = profile.mode || "employee";
  return {
    version: SAVE_VERSION,
    profession: mode === "creator" ? null : identityId,
    studioType: mode === "creator" ? identityId : null,
    studioId: profile.studioId || null,
    studioName: profile.studioName || "像素工作室",
    profile,
    deskId: null,
    lastAction: "idle",
    approvalStatus: (profile.mode || "employee") === "employee" && EMPLOYEE_APPROVAL_REQUIRED ? "pending" : "approved",
    userMode: mode,
    points: 0,
    lifetimePoints: 0,
    rewards: DEFAULT_REWARDS.map((reward) => ({ ...reward })),
    redeemedRewards: [],
    unlockedSkins: [],
    staff: mode === "creator" ? [] : DEFAULT_STAFF.map((member) => ({ ...member })),
    relationships: mode === "creator" ? {} : Object.fromEntries(DEFAULT_STAFF.map((member) => [member.id, { affection: 20, giftsSent: 0, giftsReceived: 0, meetings: 0 }])),
    socialInbox: [],
    socialUnread: 0,
    activeMeetingId: null,
    checkInTime: profile.checkInTime || "09:00",
    attendance: [],
    sleepPending: false,
    sleepPendingAt: 0,
    drowsy: false,
    reminderCounts: {},
    refusedReminders: {},
    reportCount: 0,
    asleep: false,
    sleepEndsAt: 0,
    continuousWorkMinutes: 0,
    fatigueNotified: false,
    workGoals: [],
    agendaTriggered: [],
    agents: [],
    publishedTasks: [],
    meetings: [],
    officeLayout: "default",
    patrolCount: 0,
    patrolBoost: 0,
    playerLocation: "core",
    lastPatrolAt: 0,
    day: 1,
    dateKey: getTodayKey(),
    body: 72,
    mood: 68,
    ability: 0,
    ...defaultMetrics(),
    completed: [],
    actionCounts: {},
    workSinceWater: 0,
    workSinceBreak: 0,
    lastActionAt: { water: Date.now(), break: Date.now() },
    lastMetricTick: Date.now(),
    logs: [{ time: formatClock(), text: "打卡系统在线。点击办公室中的区域开始今天。" }],
    salary: 0,
    xp: 0,
    collection: []
  };
}

function ensureCurrentDay() {
  if (!state) return false;
  const today = getTodayKey();
  if (state.dateKey === today) return false;
  const elapsedDays = daysBetween(state.dateKey, today);
  state.day += elapsedDays;
  state.dateKey = today;
  state.body = 75;
  state.mood = 70;
  state.ability = 0;
  Object.assign(state, defaultMetrics());
  state.completed = [];
  state.actionCounts = {};
  state.workSinceWater = 0;
  state.workSinceBreak = 0;
  state.lastActionAt = { water: Date.now(), break: Date.now() };
  state.lastMetricTick = Date.now();
  state.continuousWorkMinutes = 0;
  state.fatigueNotified = false;
  state.sleepPending = false;
  state.asleep = false;
  state.drowsy = false;
  state.reminderCounts = {};
  state.refusedReminders = {};
  state.sleepEndsAt = 0;
  state.workGoals = [];
  state.agendaTriggered = [];
  state.logs = [{ time: formatClock(), text: "新的真实日期已同步。今日任务已经重置。" }];
  if (summaryDialog?.open) summaryDialog.close();
  saveState();
  return true;
}

function getProfession() {
  if (state?.userMode === "creator") return STUDIO_TYPES[state.studioType] || STUDIO_TYPES.content;
  return PROFESSIONS[state?.profession] || PROFESSIONS.designer;
}

function getTaskTitle(task) {
  return getProfession().overrides[task.id] || task.title;
}

function getCategory(task) {
  return CATEGORIES[task.category] || CATEGORIES.routine;
}

function effectText(effects) {
  const labels = [];
  if (effects.ability) labels.push(`能力${effects.ability > 0 ? "+" : ""}${effects.ability}`);
  if (effects.body) labels.push(`身体${effects.body > 0 ? "+" : ""}${effects.body}`);
  if (effects.mood) labels.push(`心情${effects.mood > 0 ? "+" : ""}${effects.mood}`);
  return labels.join(" / ") || "无变化";
}

function getShiftName(date = new Date()) {
  const hour = date.getHours();
  if (hour < 9) return "上班前";
  if (hour < 12) return "上午班";
  if (hour < 14) return "午休时间";
  if (hour < 18) return "下午班";
  return "下班时间";
}

function showGame() {
  startScreen.hidden = true;
  gameScreen.hidden = false;
  renderAll();
  recordLoginAttendance();
  switchView("office");
  if (!state.deskId) {
    setTimeout(() => {
      if (!deskDialog.open) deskDialog.showModal();
    }, 120);
  }
}

function selectDesk(deskId) {
  state.deskId = deskId;
  state.lastAction = "idle";
  saveState();
  renderCharacterPanel();
  if (deskDialog.open) deskDialog.close();
  showToast(`已选择工位 ${deskId}`);
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function awardPoints(amount, reason) {
  if (!state || amount <= 0) return;
  state.points = (state.points || 0) + amount;
  state.lifetimePoints = (state.lifetimePoints || 0) + amount;
  state.logs.push({ time: formatClock(), text: `${reason}，积分 +${amount}。` });
}

function applyUserMode() {
  const creator = state.userMode === "creator";
  const creatorNav = document.getElementById("creator-nav-button");
  const managementView = document.querySelector('[data-view-panel="management"]');
  creatorNav.hidden = !creator;
  document.getElementById("patrol-button").hidden = !creator;
  if (!creator) {
    const wasManagement = !managementView.hidden;
    managementView.hidden = true;
    if (wasManagement) switchView("office");
  }
}

function renderStoreView() {
  const pointsLabel = document.getElementById("store-points");
  if (!pointsLabel) return;
  pointsLabel.textContent = `${state.points || 0} POINTS`;
  const list = document.getElementById("reward-store-list");
  list.innerHTML = (state.rewards || []).map((reward) => {
    const redeemed = state.redeemedRewards.some((item) => item.rewardId === reward.id);
    const soldOut = reward.stock <= 0;
    const canRedeem = !soldOut && (state.points || 0) >= reward.cost;
    return `
      <article class="reward-card">
        <div class="reward-card-head"><h3>${reward.name}</h3><strong class="reward-cost">${reward.cost} P</strong></div>
        <p>${reward.description || "自定义兑换奖励"}</p>
        <div class="reward-meta">类型：${reward.type} / 库存：${reward.stock}</div>
        <button class="primary-action" type="button" data-redeem-id="${reward.id}" ${canRedeem ? "" : "disabled"}>${soldOut ? "已兑完" : redeemed ? "再次兑换" : "兑换"}</button>
      </article>
    `;
  }).join("");
  const redeemedLabel = document.getElementById("redeemed-count");
  redeemedLabel.textContent = `${state.redeemedRewards.length} ITEMS`;
  document.getElementById("redeemed-list").innerHTML = state.redeemedRewards.length
    ? state.redeemedRewards.map((item) => `<div class="redeemed-item">${item.name} · ${item.cost} P</div>`).join("")
    : '<div class="redeemed-item">还没有兑换记录。</div>';
}

function redeemReward(rewardId) {
  const reward = state.rewards.find((item) => item.id === rewardId);
  if (!reward) return;
  if (reward.stock <= 0) return showToast("这个奖励已经兑完了。");
  if ((state.points || 0) < reward.cost) return showToast("积分不足。");
  state.points -= reward.cost;
  reward.stock -= 1;
  state.redeemedRewards.push({ rewardId: reward.id, name: reward.name, cost: reward.cost, time: Date.now() });
  if (reward.type === "skin" && reward.skin) {
    if (!state.unlockedSkins.includes(reward.skin)) state.unlockedSkins.push(reward.skin);
    state.profile.outfit = reward.skin;
  }
  state.logs.push({ time: formatClock(), text: `兑换了「${reward.name}」，消耗 ${reward.cost} 积分。` });
  saveState();
  renderAll();
  showToast(`已兑换：${reward.name}`);
}

function renderManagementView() {
  if (!state || state.userMode !== "creator") return;
  const staffList = document.getElementById("staff-list");
  staffList.innerHTML = state.staff.map((member) => `
    <article class="staff-card">
      <div class="staff-card-head"><strong>${member.name}</strong><span>${member.rank} / ${member.role}</span></div>
      <div class="staff-location">${member.location} · ${member.taskState} · ${member.status}</div>
      <div class="staff-stats"><div>身体<strong>${member.body}</strong></div><div>心情<strong>${member.mood}</strong></div><div>能力<strong>${member.ability}</strong></div></div>
      <div class="staff-actions"><button type="button" data-staff-action="reward" data-staff-id="${member.id}">奖励 20P</button>${member.isBoss ? "" : `<button type="button" data-staff-action="promote" data-staff-id="${member.id}">提拔</button>`}</div>
    </article>
  `).join("");
  const assignee = document.getElementById("task-assignee");
  assignee.innerHTML = state.staff.map((member) => `<option value="${member.id}">${member.name}</option>`).join("");
  document.getElementById("published-task-list").innerHTML = state.publishedTasks.length
    ? state.publishedTasks.map((task) => `<div class="admin-item"><span>${task.title}</span><span>${task.assignee} · ${task.points}P</span></div>`).join("")
    : '<div class="admin-item"><span>暂无发布任务</span></div>';
  document.getElementById("meeting-list").innerHTML = state.meetings.length
    ? state.meetings.map((meeting) => `<div class="admin-item"><span>${meeting.topic}</span><span>${meeting.time} · ${meeting.status || "scheduled"}</span></div>`).join("")
    : '<div class="admin-item"><span>暂无会议</span></div>';
  document.getElementById("agent-list").innerHTML = state.agents.length
    ? state.agents.map((agent) => `<div class="admin-item"><span>${agent.name} / ${agent.role} · ${agent.location || "core"}</span><span>${Math.round(agent.progress || 0)}%</span></div>`).join("")
    : '<div class="admin-item"><span>暂无虚拟员工</span></div>';
  renderAttendanceList();
}

function handleStaffAction(action, staffId) {
  const member = state.staff.find((item) => item.id === staffId);
  if (!member) return;
  if (action === "reward") {
    member.points += 20;
    state.logs.push({ time: formatClock(), text: `奖励员工 ${member.name} 20 积分。` });
    showToast(`已奖励 ${member.name} 20 积分`);
  }
  if (action === "promote") {
    const ranks = ["实习生", "员工", "高级员工", "组长", "部门负责人"];
    const index = Math.max(0, ranks.indexOf(member.rank));
    member.rank = ranks[Math.min(ranks.length - 1, index + 1)];
    state.logs.push({ time: formatClock(), text: `员工 ${member.name} 已晋升为 ${member.rank}。` });
    showToast(`${member.name} 已晋升为 ${member.rank}`);
  }
  saveState();
  renderAll();
}

function setOfficeLayout(layout) {
  state.officeLayout = layout;
  document.getElementById("office-map").dataset.layout = layout;
  saveState();
  renderAll();
  showToast(`办公室布局已切换为：${layout}`);
}

let activeSocialId = null;

function getRelationship(staffId) {
  if (!state.relationships) state.relationships = {};
  if (!state.relationships[staffId]) state.relationships[staffId] = { affection: 20, giftsSent: 0, giftsReceived: 0, meetings: 0 };
  return state.relationships[staffId];
}

function getAffectionLevel(value) {
  if (value >= 80) return "默契";
  if (value >= 60) return "信任";
  if (value >= 30) return "熟悉";
  return "陌生";
}

function getSocialEfficiencyBonus() {
  const total = Object.values(state.relationships || {}).reduce((sum, rel) => sum + rel.affection, 0);
  return Math.min(.15, total / 1000);
}

function renderSocialView() {
  const inbox = document.getElementById("social-inbox-list");
  if (!inbox) return;
  document.getElementById("social-inbox-count").textContent = `${state.socialInbox.length} MESSAGES`;
  document.getElementById("social-badge").hidden = !state.socialUnread;
  document.getElementById("social-badge").textContent = String(state.socialUnread || 0);
  inbox.innerHTML = state.socialInbox.length
    ? [...state.socialInbox].reverse().map((message) => `<div class="social-message"><time>${message.time}</time>${message.text}</div>`).join("")
    : '<div class="social-message">还没有消息。点击办公室里的员工头像开始互动。</div>';
  document.getElementById("relationship-list").innerHTML = state.staff.map((member) => {
    const rel = getRelationship(member.id);
    return `<div class="relationship-card"><div class="relationship-head"><strong>${member.name} · ${member.role}</strong><span>${getAffectionLevel(rel.affection)} ${rel.affection}/100</span></div><div class="relationship-progress"><i style="width:${rel.affection}%"></i></div><div class="relationship-small">送出礼物 ${rel.giftsSent} · 预约会议 ${rel.meetings}</div></div>`;
  }).join("");
}

function showSocialFeedback(text) {
  const feedback = document.getElementById("social-feedback");
  if (!feedback) return;
  feedback.textContent = text;
  feedback.hidden = false;
}

function openSocialDialog(staffId) {
  const member = state.staff.find((item) => item.id === staffId);
  if (!member) return;
  activeSocialId = staffId;
  const rel = getRelationship(staffId);
  document.getElementById("social-role-label").textContent = member.isBoss ? "老板" : "同事";
  document.getElementById("social-name").textContent = `${member.name} · ${member.role}`;
  document.getElementById("social-affection-text").textContent = `情感值 ${rel.affection} / 100 · ${getAffectionLevel(rel.affection)}`;
  document.getElementById("social-affection-bar").style.width = `${rel.affection}%`;
  document.getElementById("social-option-panel").innerHTML = "";
  document.getElementById("social-feedback").hidden = true;
  toast.classList.remove("is-visible");
  clearTimeout(showToast.timer);
  document.getElementById("social-dialog").showModal();
}

function renderSocialOptions(type) {
  const panel = document.getElementById("social-option-panel");
  if (type === "gift") {
    panel.innerHTML = SOCIAL_GIFTS.map((gift) => `<button type="button" data-gift-id="${gift.id}">${gift.emoji} 送${gift.name} · ${gift.cost}P / 情感+${gift.affection}</button>`).join("");
  } else if (type === "chat") {
    panel.innerHTML = SOCIAL_CHATS.map((chat) => `<button type="button" data-chat-id="${chat.id}">${chat.text} / 情感+${chat.affection}</button>`).join("");
  } else if (type === "emoji") {
    panel.innerHTML = SOCIAL_EMOJIS.map((emoji) => `<button type="button" data-emoji="${emoji}">发送 ${emoji}</button>`).join("");
  } else {
    panel.innerHTML = "";
  }
}

function pushSocialMessage(text) {
  state.socialInbox.push({ id: createId("message"), text, time: formatClock() });
  state.socialUnread = (state.socialUnread || 0) + 1;
}

function sendGift(giftId) {
  const gift = SOCIAL_GIFTS.find((item) => item.id === giftId);
  const member = state.staff.find((item) => item.id === activeSocialId);
  if (!gift || !member) return;
  if ((state.points || 0) < gift.cost) return showToast("积分不足，无法送礼。");
  const rel = getRelationship(member.id);
  state.points -= gift.cost;
  rel.giftsSent += 1;
  rel.affection = clamp(rel.affection + Math.max(1, Math.round(gift.affection / 2)));
  state.logs.push({ time: formatClock(), text: `你给 ${member.name} 送了 ${gift.name}。` });
  saveState();
  renderAll();
  openSocialDialog(member.id);
  showSocialFeedback(`礼物「${gift.name}」已送出，正在等待 ${member.name} 回应。`);
  setTimeout(() => resolveGiftResponse(member.id, gift), 1300);
}

function resolveGiftResponse(staffId, gift) {
  const member = state.staff.find((item) => item.id === staffId);
  if (!member) return;
  const rel = getRelationship(staffId);
  const roll = Math.random();
  if (roll < .6) {
    rel.affection = clamp(rel.affection + gift.affection);
    member.mood = clamp(member.mood + 2);
    state.mood = clamp(state.mood + 1);
    pushSocialMessage(`${member.name} 接受了你的${gift.name}，情感值 +${gift.affection}。`);
  } else if (roll < .82) {
    rel.affection = clamp(rel.affection - 2);
    state.mood = clamp(state.mood - 1);
    pushSocialMessage(`${member.name} 拒绝了你的${gift.name}，情感值 -2。`);
  } else {
    rel.affection = clamp(rel.affection + 2);
    state.points += Math.round(gift.cost / 2);
    pushSocialMessage(`${member.name} 回赠了礼物，你返还了 ${Math.round(gift.cost / 2)} 积分。`);
  }
  saveState();
  renderAll();
  showSocialFeedback(`已收到 ${member.name} 的回应，详情已写入沟通收件箱。`);
}

function sendChat(chatId) {
  const chat = SOCIAL_CHATS.find((item) => item.id === chatId);
  const member = state.staff.find((item) => item.id === activeSocialId);
  if (!chat || !member) return;
  const rel = getRelationship(member.id);
  rel.affection = clamp(rel.affection + chat.affection);
  state.mood = clamp(state.mood + 1);
  pushSocialMessage(`你对 ${member.name} 说：${chat.text}。`);
  saveState();
  renderAll();
  showSocialFeedback(`消息已发送给 ${member.name}，等待对方回复。`);
  setTimeout(() => {
    pushSocialMessage(`${member.name} 回复：${chat.reply}`);
    showSocialFeedback(`${member.name} 回复：${chat.reply}`);
    saveState();
    renderAll();
  }, 700);
}

function sendEmoji(emoji) {
  const member = state.staff.find((item) => item.id === activeSocialId);
  if (!member) return;
  const rel = getRelationship(member.id);
  rel.affection = clamp(rel.affection + 1);
  pushSocialMessage(`你向 ${member.name} 发送了表情 ${emoji}。`);
  saveState();
  renderAll();
  showSocialFeedback(`表情 ${emoji} 已发送给 ${member.name}。`);
}

function scheduleSocialMeeting() {
  const member = state.staff.find((item) => item.id === activeSocialId);
  if (!member) return;
  const time = `${String(new Date().getHours() + 1).padStart(2, "0")}:00`;
  const check = canScheduleMeeting(time);
  if (!check.ok) {
    showSocialFeedback("预约失败：" + check.reason);
    return;
  }
  const rel = getRelationship(member.id);
  rel.affection = clamp(rel.affection + 3);
  rel.meetings += 1;
  state.meetings.push({ id: createId("meeting"), topic: `与 ${member.name} 的一对一沟通`, time, dateKey: getTodayKey(), status: "scheduled", staffId: member.id });
  pushSocialMessage(`你预约了与 ${member.name} 的会议，时间 ${time}。`);
  saveState();
  renderAll();
  showSocialFeedback(`会议预约成功：${member.name} · ${time}。会议记录已加入日程和收件箱。`);
}

function renderProfessionPicker() {
  const creator = setupProfile.mode === "creator";
  const source = creator ? STUDIO_TYPES : PROFESSIONS;
  document.getElementById("profession-heading").textContent = creator ? "选择工作室类型" : "选择你的职业";
  const tiny = document.querySelector(".profession-picker .tiny");
  if (tiny) tiny.textContent = creator ? `STUDIO TYPE / 0${Object.keys(source).length}` : `PROFESSION / 0${Object.keys(source).length}`;
  professionGrid.innerHTML = Object.values(source).map((identity) => `
    <button class="profession-card" type="button" data-profession="${identity.id}" aria-pressed="false" style="--profession-color:${identity.color}">
      <span class="profession-icon">${identity.code}</span>
      <strong>${identity.name}</strong>
      <span>${identity.description}</span>
    </button>
  `).join("");
}

function renderStartProfile() {
  if (!previewAvatar) return;
  const creator = setupProfile.mode === "creator";
  document.getElementById("studio-name-field").hidden = !creator;
  document.getElementById("join-studio-field").hidden = creator;
  if (creator) {
    const studioNameInput = document.getElementById("studio-name-input");
    if (studioNameInput.value !== setupProfile.studioName) studioNameInput.value = setupProfile.studioName;
  } else {
    renderStudioSearchResults(document.getElementById("studio-search-input")?.value || "");
  }
  previewAvatar.dataset.outfit = setupProfile.outfit;
  previewExpression.textContent = EXPRESSIONS[setupProfile.expression]?.face || "•‿•";
  previewName.textContent = setupProfile.nickname.trim() || "未命名员工";
  previewMeta.textContent = `${setupProfile.mode === "creator" ? "创作工作室" : "员工模式"} / ${GENDERS[setupProfile.gender]?.label || "中性"} / ${OUTFITS[setupProfile.outfit]?.label || "深海工装"} / ${EXPRESSIONS[setupProfile.expression]?.label || "平静"}`;
  updateStartButtonState();
}

function updateStartButtonState() {
  const creator = setupProfile.mode === "creator";
  const hasNickname = setupProfile.nickname.trim().length > 0;
  const hasProfession = Boolean(selectedProfession);
  const hasStudioName = setupProfile.studioName.trim().length > 0;
  const hasStudio = Boolean(setupProfile.studioId);
  const ready = hasNickname && hasProfession && (creator ? hasStudioName : hasStudio);
  startButton.disabled = !ready;
  const identity = creator ? STUDIO_TYPES[selectedProfession] : PROFESSIONS[selectedProfession];
  startButton.textContent = !hasProfession
    ? (creator ? "先选择工作室类型" : "先选择职业")
    : !hasNickname
      ? "填写昵称后入职"
      : creator && !hasStudioName
        ? "填写工作室名称"
        : !creator && !hasStudio
          ? "搜索并选择工作室"
          : creator
            ? `创建「${identity.name}」`
            : `加入「${setupProfile.studioName}」`;
}

function bindSetupChoice(containerId, key) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.addEventListener("click", (event) => {
    const button = event.target.closest(`[data-${key}]`);
    if (!button) return;
    setupProfile[key] = button.dataset[key];
    container.querySelectorAll(`[data-${key}]`).forEach((item) => item.classList.toggle("is-selected", item === button));
    if (key === "mode") {
      selectedProfession = null;
      if (setupProfile.mode === "creator") {
        setupProfile.studioName = "";
        setupProfile.studioId = null;
      } else {
        setupProfile.studioName = "像素工作室";
        setupProfile.studioId = "ST-DEMO-001";
      }
      renderProfessionPicker();
    }
    renderStartProfile();
  });
}

function renderAll() {
  if (!state) return;
  const profession = getProfession();
  document.documentElement.style.setProperty("--accent", profession.color);
  document.getElementById("role-label").textContent = profession.title;
  document.getElementById("studio-brand-name").textContent = `PIXEL DESK // ${state.studioName || "像素工作室"}`;
  document.getElementById("day-label").textContent = `DAY ${String(state.day).padStart(2, "0")} // ${getDateLabel()}`;
  document.getElementById("collection-count").textContent = state.collection.length;
  document.getElementById("office-map").dataset.layout = state.officeLayout || "default";
  renderClock();
  renderStats();
  renderLogs();
  renderRooms();
  movePlayerTo(state.playerLocation || "core");
  renderChecklist();
  renderTasksView();
  renderCompanyView();
  renderSettingsView();
  renderSocialView();
  renderStoreView();
  renderManagementView();
  applyUserMode();
  updateObjective();
  renderMeetingBanner();
  renderSleepBanner();
  if (activeLocation) renderLocationActions(activeLocation);
}

function renderClock() {
  if (!state) return;
  const now = new Date();
  tickMetrics(now);
  document.getElementById("time-label").textContent = formatClock(now, true);
  document.getElementById("shift-status").textContent = getShiftName(now);
  renderStats();
  renderReminder();
  processScheduledMeetings();
  simulateAgents();
  processAgenda();
  processGoalReminders();
  processSleepState();
}

function renderStats() {
  if (!state) return;
  renderCharacterPanel();
}

function renderCharacterPanel() {
  const profile = state.profile || { nickname: "RIN", gender: "nonbinary", outfit: "navy", expression: "calm" };
  const profession = getProfession();
  const avatar = document.getElementById("game-avatar");
  avatar.dataset.outfit = profile.outfit;
  document.getElementById("game-avatar-face").textContent = EXPRESSIONS[profile.expression]?.face || "•‿•";
  document.getElementById("character-name").textContent = profile.nickname || "RIN";
  document.getElementById("character-gender").textContent = GENDERS[profile.gender]?.label || "中性";
  document.getElementById("character-profession").textContent = profession.title;
  document.getElementById("character-outfit").textContent = OUTFITS[profile.outfit]?.label || SKIN_OPTIONS[profile.outfit]?.label || "深海工装";
  document.getElementById("character-mode").textContent = state.userMode === "creator" ? "创作工作室" : "员工模式";
  document.getElementById("character-points").textContent = String(state.points || 0);
  document.getElementById("character-efficiency").textContent = `${Math.round(getEfficiency() * 100)}%`;
  document.getElementById("character-patrol-count").textContent = String(state.patrolCount || 0);
  document.getElementById("patrol-status").textContent = `巡查 ${state.patrolCount || 0} / 效率 +${Math.round((state.patrolBoost || 0) * 100)}%`;
  document.getElementById("points-value").textContent = String(state.points || 0);
  document.getElementById("character-expression").textContent = EXPRESSIONS[profile.expression]?.label || "平静";
  document.getElementById("character-studio-id").textContent = state.studioId || "ST-DEMO-001";
  document.getElementById("character-desk").textContent = state.deskId ? `工位 ${state.deskId}` : "未选择工位";
  document.getElementById("character-ability").textContent = `${Math.round(state.ability)}%`;
  document.getElementById("character-body").textContent = `${Math.round(state.body)}%`;
  document.getElementById("character-mood").textContent = `${Math.round(state.mood)}%`;
  document.getElementById("character-hydration").textContent = `${Math.round(state.hydration)}%`;
  document.getElementById("character-bladder").textContent = `${Math.round(state.bladder)}%`;
  document.getElementById("character-distraction").textContent = `${Math.round(state.distraction)}%`;
  document.getElementById("character-meeting-load").textContent = `${Math.round(state.meetingLoad)}`;
  document.getElementById("character-task-progress").textContent = `${(state.workGoals || []).filter((goal) => goal.done).length} / ${(state.workGoals || []).length}`;
  document.getElementById("character-salary").textContent = `${state.salary || 0} CR`;
  document.getElementById("nav-desk-label").textContent = state.deskId ? `工位 ${state.deskId}` : "未选择";
  document.getElementById("nav-status-label").textContent = getActionStatusLabel(state.lastAction);
  const condition = getCharacterCondition();
  const pill = document.getElementById("character-state-pill");
  pill.textContent = getActionStatusLabel(state.lastAction);
  pill.classList.toggle("is-alert", condition.alert);
  pill.classList.toggle("is-good", condition.good);
  document.getElementById("character-message").textContent = condition.message;
}

function getActionStatusLabel(action) {
  const labels = {
    idle: "Idle",
    patrol: "Patrolling",
    water: "Resting",
    fruit: "Eating",
    plan: "Planning",
    work: "Working",
    lunch: "Eating",
    toilet: "Resting",
    slack: "Resting",
    gossip: "Resting",
    meeting: "Meeting",
    report: "Reporting",
    nap: "Resting",
    sleepy: "Sleepy",
    drowsy: "Drowsy",
    sleeping: "Sleeping"
  };
  return labels[action] || "Idle";
}

function getCharacterCondition() {
  if (state.asleep) return { label: "睡觉中", alert: false, good: true, message: "人物正在睡觉。可以让老板、同事或 Agent 提醒，也可以点击其他区域移动来自然醒来。" };
  if (state.drowsy) return { label: "困倦未解除", alert: true, message: "人物被提醒后仍然困倦。手动点击其他区域让角色移动，才能彻底恢复。" };
  if (state.continuousWorkMinutes >= 180) return { label: "需要休息", alert: true, message: "连续工作超过 3 小时，困意很强。建议去休息区小憩或睡觉。" };
  if (state.bladder >= RULES.bladderWarning) return { label: "需要去厕所", alert: true, message: "尿意已经很高。继续工作会明显降低能力收益。" };
  if (state.meetingLoad >= RULES.meetingLoadWarning) return { label: "会议疲劳", alert: true, message: "会议负荷偏高。建议暂停会议，去休息接待区放松。" };
  if (state.distraction >= RULES.distractionWarning) return { label: "分心偏高", alert: true, message: "摸鱼和八卦的收益正在下降。先回到办公室完成工作。" };
  if (state.hydration <= 30) return { label: "水分不足", alert: true, message: "身体开始缺水。建议去茶水间喝水。" };
  if (state.mood <= 35) return { label: "心情低落", alert: true, message: "心情较低。休息接待区可能比硬撑更有效。" };
  if (state.body <= 35) return { label: "身体疲惫", alert: true, message: "身体状态不佳。吃饭或休息可以恢复。" };
  if (state.completed.length === TASKS.length) return { label: "今日完成", good: true, message: "今天的全部任务已经完成，可以正式下班了。" };
  return { label: "状态稳定", message: "状态稳定。按自己的节奏完成今天的工作即可。" };
}

function renderLogs() {
  logList.innerHTML = [...state.logs].reverse().map((entry) => `
    <div class="log-item"><time>${entry.time}</time>${entry.text}</div>
  `).join("");
}

function movePlayerTo(location) {
  const map = document.getElementById("office-map");
  const room = document.querySelector(`.room[data-location="${location}"]`);
  const marker = document.getElementById("player-marker");
  if (!map || !room || !marker) return;
  const mapRect = map.getBoundingClientRect();
  const roomRect = room.getBoundingClientRect();
  marker.style.left = `${roomRect.left - mapRect.left + roomRect.width / 2}px`;
  marker.style.top = `${roomRect.top - mapRect.top + roomRect.height - 18}px`;
  marker.textContent = "你";
  state.playerLocation = location;
}

function renderChecklist() {
  const summary = document.getElementById("summary-checklist");
  document.getElementById("summary-checklist-count").textContent = `${state.completed.length} / ${TASKS.length}`;
  summary.innerHTML = TASKS.map((task) => checklistItem(task, state.completed.includes(task.id))).join("");
}

function checklistItem(task, done) {
  const category = getCategory(task);
  const count = state.actionCounts[task.id] || 0;
  return `
    <div class="checklist-item${done ? " is-done" : ""}">
      <span class="check-box">${done ? "✓" : "○"}</span>
      <span class="check-copy">
        <strong>${getTaskTitle(task)}</strong>
        <small><em class="category-pill ${category.className}">${category.label}</em>${done ? `已完成 ×${count}` : "待完成"}</small>
      </span>
    </div>
  `;
}

function renderTasksView() {
  const container = document.getElementById("tasks-view-list");
  if (!container) return;
  const goals = state.workGoals || [];
  const done = goals.filter((goal) => goal.done).length;
  document.getElementById("tasks-view-count").textContent = done + " / " + goals.length;
  container.innerHTML = goals.length
    ? goals.map((goal) => '<button class="checklist-item' + (goal.done ? " is-done" : "") + '" type="button" data-goal-id="' + goal.id + '"><span class="goal-checkbox">' + (goal.done ? "✓" : "○") + '</span><span class="check-copy"><strong>' + goal.title + '</strong><small>' + goal.location + ' · ' + (goal.done ? "已完成" : "待完成") + '</small></span></button>').join("")
    : '<div class="routine-item">还没有自定义目标，请在上方添加。</div>';
  const routine = document.getElementById("routine-list");
  if (routine) routine.innerHTML = TASKS.map((task) => '<div class="routine-item">' + getTaskTitle(task) + ' · ' + task.location + '</div>').join("");
}
function getCompanyLevel() {
  const score = (state.xp || 0) + state.completed.length * 12 + Math.round(state.ability);
  return Math.max(1, Math.min(99, Math.floor(score / 100) + 1));
}

function renderCompanyView() {
  const level = getCompanyLevel();
  const score = (state.xp || 0) + state.completed.length * 12 + Math.round(state.ability);
  const progress = Math.min(100, score % 100);
  const rankNames = ["小型工作室", "成长型工作室", "区域协作工作室", "城市级工作室"];
  document.getElementById("company-level").textContent = `LV.${String(level).padStart(2, "0")}`;
  document.getElementById("character-company-level").textContent = `LV.${String(level).padStart(2, "0")}`;
  document.getElementById("company-rank-text").textContent = rankNames[Math.min(rankNames.length - 1, Math.floor((level - 1) / 3))];
  document.getElementById("company-progress-bar").style.width = `${progress}%`;
  document.getElementById("company-xp").textContent = `${state.xp || 0} XP`;
}

function renderSettingsView() {
  const profile = state.profile || { nickname: "RIN" };
  document.getElementById("settings-name").textContent = profile.nickname || "RIN";
  document.getElementById("settings-studio-name").textContent = state.studioName || "像素工作室";
  document.getElementById("settings-studio-id").textContent = state.studioId || "ST-DEMO-001";
  document.getElementById("settings-profession").textContent = getProfession().title;
  document.getElementById("settings-desk").textContent = state.deskId ? `工位 ${state.deskId}` : "未选择";
  document.getElementById("settings-status").textContent = getActionStatusLabel(state.lastAction);
}

function switchView(view) {
  if (view === "social" && state) { state.socialUnread = 0; saveState(); }
  document.querySelectorAll("[data-view]").forEach((button) => {
    const selected = button.dataset.view === view;
    button.classList.toggle("active", selected);
    if (selected) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.viewPanel !== view;
  });
  const meta = {
    office: ["OFFICE FLOOR / LIVE MAP", "像素工作室"],
    tasks: ["DAILY CARDS / CHECKLIST", "今日任务栏"],
    social: ["SOCIAL / RELATIONSHIP", "沟通与关系"],
    logs: ["SYSTEM LOG / RECENT", "日志"],
    company: ["COMPANY PROGRESS / GROWTH", "公司发展进程"],
    settings: ["LOCAL SAVE / SETTINGS", "系统设置"]
  }[view] || ["OFFICE FLOOR / LIVE MAP", "像素工作室"];
  document.getElementById("view-eyebrow").textContent = meta[0];
  document.getElementById("view-title").textContent = meta[1];
}

function updateObjective() {
  const goals = state.workGoals || [];
  const completedCount = goals.filter((goal) => goal.done).length;
  document.getElementById("task-counter").textContent = `清单 ${completedCount} / ${goals.length}`;
  document.getElementById("objective-task").textContent = `${completedCount} / ${goals.length}`;
  document.getElementById("objective-ability").textContent = `${Math.round(state.ability)}%`;
  document.getElementById("objective-salary").textContent = `${estimateSalary()} CR`;
  document.getElementById("goal-state").textContent = goals.length > 0 && completedCount === goals.length ? "已完成" : "进行中";
}

function renderReminder() {
  const reminder = Date.now() < reminderMutedUntil
    ? { alert: false, title: "今日工作标准", text: `饮水建议每 ${RULES.waterIntervalMinutes} 分钟一次；连续工作 ${RULES.breakIntervalMinutes} 分钟建议起身；会议单次建议不超过 ${RULES.meetingIntervalMinutes} 分钟。` }
    : getReminder();
  reminderBar.classList.toggle("is-alert", reminder.alert);
  document.getElementById("reminder-title").textContent = reminder.title;
  document.getElementById("reminder-text").textContent = reminder.text;
}

let patrolInProgress = false;

function advanceStaffStates() {
  state.staff.forEach((member) => {
    if (member.taskState === "pending" && Math.random() < .3) member.taskState = "working";
    else if (member.taskState === "working" && Math.random() < .3) member.taskState = "review";
    else if (member.taskState === "review" && Math.random() < .25) {
      member.taskState = "done";
      member.points += 5;
      member.ability = clamp(member.ability + 2);
      member.mood = clamp(member.mood + 1);
    } else if (member.taskState === "done" && Math.random() < .15) member.taskState = "working";
  });
}

async function startPatrol() {
  if (!state || state.userMode !== "creator" || patrolInProgress) return;
  patrolInProgress = true;
  state.lastAction = "patrol";
  const homeLocation = state.playerLocation || "core";
  const path = ["core", "office2", "meeting", "rest", "archive", "restroom", "reception"];
  const catches = [];
  advanceStaffStates();
  for (const location of path) {
    movePlayerTo(location);
    const marker = document.getElementById("player-marker");
    if (marker) marker.textContent = "巡";
    document.querySelectorAll(".room").forEach((room) => room.classList.toggle("is-focus", room.dataset.location === location));
    state.playerLocation = location;
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const boss = state.staff.find((member) => member.isBoss);
    if (location === "rest" && state.asleep && boss) wakeByReminder(boss, boss.name);
    state.staff.filter((member) => member.location === location).forEach((member) => {
      const lazy = member.slacking || member.taskState === "slacking" || member.status === "Slacking" || member.status === "Idle";
      if (lazy) {
        member.points = Math.max(0, member.points - 15);
        member.mood = clamp(member.mood - 10);
        member.ability = clamp(member.ability - 1);
        member.taskState = "pending";
        member.status = "Patrolled";
        catches.push(member.name);
      }
    });
  }
  state.playerLocation = homeLocation;
  movePlayerTo(homeLocation);
  const markerHome = document.getElementById("player-marker");
  if (markerHome) markerHome.textContent = "你";
  state.patrolCount = (state.patrolCount || 0) + 1;
  const moodCost = Math.min(18, 5 + state.patrolCount * 2);
  const boostGain = Math.max(.03, .11 - (state.patrolCount - 1) * .02);
  state.mood = clamp(state.mood - moodCost);
  state.patrolBoost = Math.min(.35, (state.patrolBoost || 0) + boostGain);
  state.lastPatrolAt = Date.now();
  if (state.patrolCount >= 3) {
    state.staff.forEach((member) => { member.mood = clamp(member.mood - 2); });
    state.logs.push({ time: formatClock(), text: "高频巡查让员工压力上升，全体员工心情 -2。" });
  }
  state.logs.push({ time: formatClock(), text: catches.length ? `巡查发现摸鱼：${catches.join("、")}，相关人员积分 -15、心情 -10。` : "巡查结束，没有发现明显摸鱼行为。" });
  state.logs.push({ time: formatClock(), text: `巡查消耗心情 ${moodCost}，工作效率加成 +10% 左右。` });
  if (state.completed.length === TASKS.length) state.lastAction = "idle";
  patrolInProgress = false;
  saveState();
  renderAll();
  showToast(catches.length ? `巡查发现：${catches.join("、")}` : "巡查完成，没有发现摸鱼");
}

function getReminder() {
  const now = Date.now();
  if (state.bladder >= RULES.bladderWarning) return { alert: true, title: "建议去卫生间", text: "尿意过高会降低工作效率。现在去卫生间可以恢复专注。" };
  if (state.meetingLoad >= RULES.meetingLoadWarning) return { alert: true, title: "会议负荷偏高", text: "连续会议会降低心情和能力收益。建议暂停会议、喝水或摸鱼。" };
  if (state.workSinceWater >= 1) return { alert: true, title: "建议起身喝水", text: "已经连续完成较多工作，喝水和短暂离开工位可以降低疲劳。" };
  if (state.workSinceBreak >= 1) return { alert: true, title: "建议起身休息", text: "连续工作接近上限，摸鱼、八卦或上厕所都可以让状态回稳。" };
  if (state.distraction >= RULES.distractionWarning) return { alert: true, title: "分心程度偏高", text: "继续摸鱼会进一步拖慢工作。可以先完成一次工作或写日报。" };
  if (state.hydration <= 30) return { alert: true, title: "水分偏低", text: "建议去茶水间喝水，水分不足也会影响工作状态。" };
  const minutesSinceWater = (now - (state.lastActionAt.water || now)) / 60000;
  if (minutesSinceWater >= RULES.waterIntervalMinutes) return { alert: true, title: "到了建议喝水时间", text: `距离上次喝水已经超过 ${RULES.waterIntervalMinutes} 分钟。` };
  return { alert: false, title: "今日工作标准", text: `饮水建议每 ${RULES.waterIntervalMinutes} 分钟一次；连续工作 ${RULES.breakIntervalMinutes} 分钟建议起身；会议单次建议不超过 ${RULES.meetingIntervalMinutes} 分钟。` };
}

function getEfficiency() {
  let efficiency = 1;
  if (state.bladder >= RULES.bladderWarning) efficiency -= .35;
  else if (state.bladder >= 45) efficiency -= .15;
  if (state.distraction >= RULES.distractionWarning) efficiency -= .25;
  else if (state.distraction >= 40) efficiency -= .1;
  if (state.meetingLoad >= RULES.meetingLoadWarning) efficiency -= .2;
  if (state.drowsy) efficiency -= .3;
  if (state.hydration <= 30) efficiency -= .15;
  return Math.max(.25, efficiency + (state.patrolBoost || 0) + getSocialEfficiencyBonus());
}

function canRepeat(task) {
  if (task.final) return false;
  if (task.id === "toilet" && state.completed.includes(task.id) && state.bladder < 15) return false;
  return true;
}

function renderLocationActions(location) {
  activeLocation = location;
  const room = document.querySelector(`.room[data-location="${location}"]`);
  document.getElementById("action-location").textContent = room ? room.querySelector("strong").textContent : "现场操作";
  const tasks = TASKS.filter((task) => task.location === location);
  actionDrawer.hidden = false;
  actionList.innerHTML = tasks.map((task, index) => {
    const done = state.completed.includes(task.id);
    const finalLocked = task.final && state.completed.filter((id) => id !== "off").length < TASKS.length - 1;
    const locked = finalLocked || !canRepeat(task);
    const count = state.actionCounts[task.id] || 0;
    const category = getCategory(task);
    const status = finalLocked ? "未解锁" : !done ? "今日打卡" : count > 1 ? `继续 ×${count}` : "可继续";
    return `
      <button class="action-button${done ? " is-completed" : ""}${locked ? " is-locked" : ""}" type="button" data-action-task="${task.id}" ${locked ? "disabled" : ""}>
        <span class="task-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="task-copy">
          <strong>${getTaskTitle(task)}</strong>
          <span><em class="category-pill ${category.className}">${category.label}</em>${task.description}</span>
        </span>
        <span class="task-effects">${status}</span>
      </button>
    `;
  }).join("");
}

function activateLocation(location) {
  if (state.asleep) {
    state.asleep = false;
    state.drowsy = false;
    state.sleepPending = false;
    state.continuousWorkMinutes = 0;
    state.fatigueNotified = false;
    state.lastAction = "resting";
    state.logs.push({ time: formatClock(), text: "你通过移动到其他区域自然醒来，困意完全解除。" });
    showToast("角色移动后自然醒来，困意已解除");
  } else if (state.drowsy) {
    state.drowsy = false;
    state.continuousWorkMinutes = 0;
    state.fatigueNotified = false;
    state.logs.push({ time: formatClock(), text: "手动移动后，困倦状态解除。" });
  }
  movePlayerTo(location);
  if (location === "reception") {
    handleGateAction();
    return;
  }
  const pending = TASKS.filter((task) => task.location === location && !task.final && !state.completed.includes(task.id));
  if (pending.length > 0) {
    completeTask(pending[0].id);
    renderLocationActions(location);
    return;
  }
  renderLocationActions(location);
  const room = document.querySelector(`.room[data-location="${location}"]`);
  if (room) showToast(`${room.querySelector("strong").textContent}已展开`);
}

function getTaskLog(task, first, count) {
  const messages = {
    water: first ? "今日喝水已完成，身体 +8。" : "又喝了一杯水，水分继续上升，尿意也开始累积。",
    fruit: "吃了一份水果，身体 +8，心情 +2。",
    plan: `${getTaskTitle(task)}已经写好，能力 +10。`,
    work: `完成一次工作，能力收益 ${Math.round(getEfficiency() * 100)}%，专注状态继续变化。`,
    lunch: "午饭时间。身体 +25，心情 +5。",
    toilet: "离开工位去了卫生间，尿意清零，专注恢复。",
    slack: first ? "摸鱼完成。心情 +25，能力 -4。" : `第 ${count} 次摸鱼，分心开始累积。`,
    gossip: first ? "八卦交换完成。心情 +15，能力 -2。" : `第 ${count} 次八卦，心情收益正在递减。`,
    meeting: first ? "会议结束。能力 +15，身体 -8。" : `第 ${count} 次会议结束，会议负荷继续上升。`,
    report: "日报已提交，能力 +6。",
    nap: "在休息区小憩了一会儿，困意减轻。",
  };
  return messages[task.id] || `${getTaskTitle(task)}完成。`;
}

function applyActionEffects(task, first, count) {
  const id = task.id;
  if (id === "water") {
    const overHydrated = state.hydration >= 90;
    state.hydration = clamp(state.hydration + (overHydrated ? 12 : 25));
    state.bladder = clamp(state.bladder + (overHydrated ? 25 : 15));
    state.body = clamp(state.body + (overHydrated ? 2 : 8));
    state.workSinceWater = 0;
    state.continuousWorkMinutes = 0;
    state.fatigueNotified = false;
    if (overHydrated) state.mood = clamp(state.mood - 2);
  } else if (id === "fruit") {
    state.hydration = clamp(state.hydration + 5);
    state.bladder = clamp(state.bladder + 6);
    state.body = clamp(state.body + (first ? 8 : 3));
    state.mood = clamp(state.mood + 2);
    state.continuousWorkMinutes = 0;
  } else if (id === "plan") {
    state.ability = clamp(state.ability + (first ? 10 : 3));
    state.mood = clamp(state.mood + (first ? 5 : 2));
    state.distraction = clamp(state.distraction - 5);
  } else if (id === "lunch") {
    state.body = clamp(state.body + (first ? 25 : 6));
    state.mood = clamp(state.mood + (first ? 5 : 2));
    state.hydration = clamp(state.hydration + (first ? 10 : 5));
    state.bladder = clamp(state.bladder + 10);
    state.continuousWorkMinutes = 0;
    state.fatigueNotified = false;
  } else if (id === "toilet") {
    if (!first && state.bladder < 15) return { blocked: true, message: "现在还不需要上厕所。" };
    state.bladder = 0;
    state.body = clamp(state.body + 3);
    state.mood = clamp(state.mood + 5);
    state.distraction = clamp(state.distraction - 12);
    state.workSinceBreak = 0;
    state.continuousWorkMinutes = 0;
    state.fatigueNotified = false;
  } else if (id === "slack") {
    state.mood = clamp(state.mood + (first ? 25 : Math.max(4, 12 - count * 3)));
    state.body = clamp(state.body + (first ? 8 : 3));
    state.ability = clamp(state.ability - (first ? 4 : 5));
    state.distraction = clamp(state.distraction + (first ? 12 : 15));
    state.workSinceBreak = 0;
    state.continuousWorkMinutes = 0;
    state.fatigueNotified = false;
  } else if (id === "gossip") {
    state.mood = clamp(state.mood + (first ? 15 : Math.max(3, 8 - count * 2)));
    state.ability = clamp(state.ability - (first ? 2 : 3));
    state.distraction = clamp(state.distraction + (first ? 6 : 8));
    state.workSinceBreak = 0;
  }
  else if (id === "work") {
    const gain = Math.max(5, Math.round(35 * getEfficiency() * (first ? 1 : .75)));
    state.ability = clamp(state.ability + gain);
    state.body = clamp(state.body - ((first ? 20 : 14) + (state.bladder >= RULES.bladderWarning ? 8 : 0)));
    state.mood = clamp(state.mood - (first ? 5 : 4));
    state.distraction = clamp(state.distraction + (first ? 5 : 8));
    state.workSinceWater += 1;
    state.workSinceBreak += 1;
    state.continuousWorkMinutes += 60;
    if (state.continuousWorkMinutes >= 180 && !state.fatigueNotified) {
      state.fatigueNotified = true;
      state.mood = clamp(state.mood - 10);
      state.body = clamp(state.body - 15);
      state.lastAction = "sleepy";
      state.logs.push({ time: formatClock(), text: "连续工作超过 3 小时，困意和疲惫明显增加。" });
      pushSocialMessage("身体提醒：连续工作超过 3 小时，建议去休息区睡觉或小憩。");
      openAgendaPrompt({ id: "fatigue", time: formatClock(), title: "困意来袭", text: "连续工作超过 3 小时，身体非常疲惫。建议立即去休息区小憩或睡觉。", location: "rest" });
    }
  } else if (id === "meeting") {
    state.meetingLoad = clamp(state.meetingLoad + (first ? 15 : 20));
    state.ability = clamp(state.ability + (first ? 15 : Math.max(3, 10 - count * 2)));
    state.body = clamp(state.body - (first ? 8 : 6));
    state.mood = clamp(state.mood - (first ? 4 : 6 + (state.meetingLoad >= RULES.meetingLoadWarning ? 4 : 0)));
    state.workSinceBreak += 1;
  } else if (id === "report") {
    state.ability = clamp(state.ability + (first ? 6 : 3));
    state.body = clamp(state.body - (first ? 8 : 4));
    state.mood = clamp(state.mood - 2);
    state.distraction = clamp(state.distraction - 8);
  } else if (id === "nap") {
    state.body = clamp(state.body + 20);
    state.mood = clamp(state.mood + 8);
    state.ability = clamp(state.ability - 2);
    state.continuousWorkMinutes = 0;
    state.fatigueNotified = false;
    state.workSinceBreak = 0;
  }
  return { blocked: false };
}

function estimateSalary() {
  return 200 + Math.round(state.ability * 2) + (state.mood >= 80 ? 100 : 0) + (state.body >= 70 ? 50 : 0);
}

function completeTask(taskId) {
  if (!state) return;
  if (state.asleep) { showToast("人物正在睡觉，暂时不能执行行动。"); return; }
  const task = TASKS.find((item) => item.id === taskId);
  if (!task) return;
  const first = !state.completed.includes(task.id);
  if (!first && !canRepeat(task)) {
    showToast(task.id === "toilet" ? "现在还不需要上厕所。" : "这个行动暂时不能继续。");
    return;
  }
  const finalRemaining = TASKS.filter((item) => !state.completed.includes(item.id) && !item.final).length;
  if (task.final && finalRemaining > 0) {
    showToast(`还有 ${finalRemaining} 项今日任务没有完成。`);
    return;
  }
  const count = state.actionCounts[task.id] || 0;
  const result = applyActionEffects(task, first, count);
  if (result.blocked) {
    showToast(result.message);
    return;
  }
  if (first) {
    state.completed.push(task.id);
    const points = task.id === "work" ? POINT_RULES.work
      : task.id === "meeting" ? POINT_RULES.meeting
      : POINT_RULES.task;
    awardPoints(points, first ? "完成任务奖励" : "重复行动");
  }
  state.actionCounts[task.id] = count + 1;
  state.lastActionAt[task.id] = Date.now();
  state.lastAction = state.continuousWorkMinutes >= 180 ? "sleepy" : task.id;
  state.logs.push({ time: formatClock(), text: getTaskLog(task, first, count + 1) });
  saveState();
  renderAll();
  if (activeLocation) renderLocationActions(activeLocation);
  if (task.final) {
    setTimeout(showSummary, 300);
  } else {
    showToast(`已执行：${getTaskTitle(task)}`);
  }
}

function showSummary() {
  const salary = estimateSalary();
  const xp = 50 + Math.round(state.ability) + state.completed.length * 2;
  const unlock = COSMETICS.find((item) => !state.collection.includes(item.id));
  if (unlock) state.collection.push(unlock.id);
  state.salary += salary;
  state.xp += xp;
  saveState();
  renderAll();
  document.getElementById("summary-day").textContent = `DAY ${String(state.day).padStart(2, "0")} // ${getDateLabel()}`;
  const sideEffects = state.bladder >= RULES.bladderWarning || state.distraction >= RULES.distractionWarning || state.meetingLoad >= RULES.meetingLoadWarning;
  const metGoal = state.ability >= GOAL_ABILITY;
  document.getElementById("summary-message").textContent = !metGoal
    ? "今日任务清单已经完成，但额外行动拖慢了能力提升。"
    : sideEffects
      ? "今日任务清单已经完成，但额外行动对状态造成了明显影响。"
      : "今日任务清单全部完成，能力也达到了目标。";
  document.getElementById("summary-ability").textContent = `${Math.round(state.ability)}%`;
  document.getElementById("summary-salary").textContent = `${salary} CR`;
  document.getElementById("summary-xp").textContent = `${xp} XP`;
  document.getElementById("summary-unlock").textContent = unlock ? unlock.name : "重复装饰兑换券";
  summaryDialog.showModal();
}

function finishToday() {
  summaryDialog.close();
  renderAll();
  showToast("今日清单已保存。明天会根据真实日期自动重置。");
}

function tickMetrics(now = Date.now()) {
  if (!state.lastMetricTick) state.lastMetricTick = now;
  const elapsedMinutes = Math.min(5, (now - state.lastMetricTick) / 60000);
  if (elapsedMinutes <= 0) return;
  state.hydration = clamp(state.hydration - elapsedMinutes * .12);
  state.bladder = clamp(state.bladder + elapsedMinutes * (.18 + state.hydration / 500));
  state.distraction = clamp(state.distraction - elapsedMinutes * .08);
  state.meetingLoad = clamp(state.meetingLoad - elapsedMinutes * .12);
  state.lastMetricTick = now;
  if (now - lastSavedAt > 10000) saveState();
}

function showToast(message) {
  if (document.getElementById("social-dialog")?.open) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function renderCollection() {
  const items = state.collection.map((id) => COSMETICS.find((item) => item.id === id)).filter(Boolean);
  document.getElementById("collection-dialog-count").textContent = `${items.length} ITEMS`;
  document.getElementById("collection-grid").innerHTML = items.length
    ? items.map((item) => `<div class="collection-item">${item.name}</div>`).join("")
    : `<div class="collection-item">还没有解锁收藏。</div>`;
}

function resetGame() {
  const dialog = document.getElementById("reset-dialog");
  document.getElementById("reset-confirm-check").checked = false;
  document.getElementById("reset-confirm-button").disabled = true;
  if (!dialog.open) dialog.showModal();
}

function performReset() {
  if (!document.getElementById("reset-confirm-check").checked) return;
  try { Object.keys(localStorage).filter((key) => key.startsWith("studio-verse-")).forEach((key) => localStorage.removeItem(key)); } catch {}
  state = null;
  selectedProfession = null;
  location.reload();
}

renderProfessionPicker();
renderStartProfile();
nicknameInput.addEventListener("input", () => {
  setupProfile.nickname = nicknameInput.value;
  renderStartProfile();
});
document.getElementById("studio-name-input").addEventListener("input", (event) => {
  setupProfile.studioName = event.target.value;
  updateStartButtonState();
});
document.getElementById("studio-search-input").addEventListener("input", (event) => renderStudioSearchResults(event.target.value));
document.getElementById("studio-search-button").addEventListener("click", () => renderStudioSearchResults(document.getElementById("studio-search-input").value));
document.getElementById("studio-search-results").addEventListener("click", (event) => {
  const card = event.target.closest("[data-studio-id]");
  if (card) selectStudio(card.dataset.studioId);
});
bindSetupChoice("mode-options", "mode");
bindSetupChoice("gender-options", "gender");
bindSetupChoice("outfit-options", "outfit");
bindSetupChoice("expression-options", "expression");

professionGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-profession]");
  if (!card) return;
  selectedProfession = card.dataset.profession;
  professionGrid.querySelectorAll("[data-profession]").forEach((item) => item.setAttribute("aria-pressed", String(item === card)));
  updateStartButtonState();
});

startButton.addEventListener("click", () => {
  if (!selectedProfession) return;
  const creator = setupProfile.mode === "creator";
  const profile = { ...setupProfile, nickname: setupProfile.nickname.trim() };
  if (creator) {
    profile.studioName = setupProfile.studioName.trim();
    profile.studioId = state?.studioId || generateStudioId();
    registerStudio({ id: profile.studioId, name: profile.studioName, type: selectedProfession, owner: profile.nickname, checkInTime: "09:00" });
  } else {
    const studio = loadStudioDirectory().find((item) => item.id === setupProfile.studioId) || DEMO_STUDIO;
    profile.studioId = studio.id;
    profile.studioName = studio.name;
    profile.checkInTime = studio.checkInTime || "09:00";
    submitJoinRequest(profile, selectedProfession).catch(() => {});
  }
  if (state?.needsProfile) {
    state.profile = profile;
    state.userMode = profile.mode || "employee";
    state.profession = state.userMode === "creator" ? null : selectedProfession;
    state.studioType = state.userMode === "creator" ? selectedProfession : null;
    state.studioId = profile.studioId;
    state.studioName = profile.studioName;
    delete state.needsProfile;
  } else {
    state = createInitialState(selectedProfession, profile);
  }
  saveState();
  showGame();
  showToast(creator ? `工作室已创建：${profile.studioName} / ${profile.studioId}` : `已申请加入 ${profile.studioName}`);
});

function showStartExperience() {
  if (state?.needsProfile) {
    ensureCurrentDay();
    setupProfile.mode = state.userMode || "employee";
    renderProfessionPicker();
    selectedProfession = setupProfile.mode === "creator" ? (state.studioType || "content") : state.profession;
    const selectedCard = professionGrid.querySelector(`[data-profession="${selectedProfession}"]`);
    if (selectedCard) selectedCard.setAttribute("aria-pressed", "true");
    updateStartButtonState();
    startScreen.hidden = false;
    gameScreen.hidden = true;
  } else if (state) {
    ensureCurrentDay();
    showGame();
  } else {
    startScreen.hidden = false;
    gameScreen.hidden = true;
  }
}

async function initRemoteAuth() {
  const authScreen = document.getElementById("auth-screen");
  const authStatus = document.getElementById("auth-status");
  const authForm = document.getElementById("auth-form");
  const authEmail = document.getElementById("auth-email");
  const authPassword = document.getElementById("auth-password");
  if (!isRemoteEnabled) {
    authScreen.hidden = true;
    showStartExperience();
    return;
  }
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    authScreen.hidden = true;
    await syncRemoteStudios();
    showStartExperience();
  } else {
    authScreen.hidden = false;
    startScreen.hidden = true;
    gameScreen.hidden = true;
  }
  authForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    authStatus.textContent = "正在登录...";
    const { error } = await supabase.auth.signInWithPassword({ email: authEmail.value, password: authPassword.value });
    if (error) { authStatus.textContent = error.message; return; }
    authScreen.hidden = true;
    await syncRemoteStudios();
    showStartExperience();
  });
  document.getElementById("auth-signup").addEventListener("click", async () => {
    authStatus.textContent = "正在注册...";
    const { data, error } = await supabase.auth.signUp({ email: authEmail.value, password: authPassword.value, options: { data: { nickname: "未命名员工" } } });
    if (error) { authStatus.textContent = error.message; return; }
    authStatus.textContent = data.session ? "注册成功，正在进入游戏..." : "注册成功，请检查邮箱完成验证。";
    if (data.session) {
      authScreen.hidden = true;
      await syncRemoteStudios();
      showStartExperience();
    }
  });
}

initRemoteAuth();

function getTodayMeetings() {
  const today = getTodayKey();
  return (state.meetings || []).filter((meeting) => (meeting.dateKey || today) === today);
}

function hasMeetingConflict(time) {
  return getTodayMeetings().some((meeting) => meeting.time === time && ["scheduled", "active"].includes(meeting.status || "scheduled"));
}

function canScheduleMeeting(time) {
  if (hasMeetingConflict(time)) return { ok: false, reason: "这个时间已经有一场会议，时间冲突。" };
  const activeCount = getTodayMeetings().filter((meeting) => (meeting.status || "scheduled") !== "conflict").length;
  if (activeCount >= MAX_MEETINGS_PER_DAY) return { ok: false, reason: "每天最多安排 " + MAX_MEETINGS_PER_DAY + " 场会议。" };
  return { ok: true };
}

function renderMeetingBanner() {
  const banner = document.getElementById("meeting-banner");
  if (!banner) return;
  const meeting = (state.meetings || []).find((item) => item.id === state.activeMeetingId && item.status === "active");
  banner.hidden = !meeting;
  if (meeting) document.getElementById("active-meeting-topic").textContent = "会议进行中：" + meeting.topic;
}

function startMeetingTimer(meetingId) {
  setTimeout(() => {
    const meeting = state.meetings.find((item) => item.id === meetingId);
    if (!meeting || meeting.status !== "active") return;
    meeting.status = "done";
    if (state.activeMeetingId === meetingId) state.activeMeetingId = null;
    state.lastAction = "idle";
    state.logs.push({ time: formatClock(), text: "会议结束：" + meeting.topic + "。" });
    pushSocialMessage("会议结束：" + meeting.topic + "。");
    saveState();
    renderAll();
    showToast("会议已结束");
  }, 10000);
}

function processScheduledMeetings() {
  if (!state) return;
  const now = formatClock();
  const today = getTodayKey();
  const due = (state.meetings || []).find((meeting) => (meeting.dateKey || today) === today && (meeting.status || "scheduled") === "scheduled" && meeting.time <= now);
  if (!due) return;
  if (state.activeMeetingId) {
    due.status = "conflict";
    state.logs.push({ time: formatClock(), text: "会议时间冲突：" + due.topic + " 与进行中的会议重叠。" });
    pushSocialMessage("会议时间冲突：" + due.topic + " 无法开始。");
    saveState();
    renderAll();
    showToast("时间冲突：" + due.topic);
    return;
  }
  due.status = "active";
  state.activeMeetingId = due.id;
  state.lastAction = "meeting";
  state.playerLocation = "meeting";
  movePlayerTo("meeting");
  document.querySelectorAll(".room").forEach((room) => room.classList.toggle("is-focus", room.dataset.location === "meeting"));
  pushSocialMessage("会议到点自动开始：" + due.topic + "，人物已进入会议室。");
  state.logs.push({ time: formatClock(), text: "会议到点自动开始：" + due.topic + "。" });
  completeTask("meeting");
  startMeetingTimer(due.id);
}

function generateStudioId() {
  const now = new Date();
  const date = String(now.getFullYear()).slice(-2) + String(now.getMonth() + 1).padStart(2, "0") + String(now.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return "ST-" + date + "-" + random;
}

function loadStudioDirectory() {
  if (isRemoteEnabled) return [DEMO_STUDIO].concat(remoteStudioCache);
  try {
    const raw = localStorage.getItem(STUDIO_DIRECTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    let custom = [];
    if (parsed && parsed.version === STUDIO_DIRECTORY_VERSION && Array.isArray(parsed.studios)) {
      custom = parsed.studios;
    } else if (raw) {
      saveStudioDirectory([]);
    }
    const merged = [DEMO_STUDIO].concat(Array.isArray(custom) ? custom : []);
    return merged.filter((studio, index) => merged.findIndex((item) => item.id === studio.id) === index);
  } catch {
    return [DEMO_STUDIO];
  }
}

function saveStudioDirectory(list) {
  try {
    const custom = (Array.isArray(list) ? list : []).filter((studio) => studio.id !== DEMO_STUDIO.id);
    localStorage.setItem(STUDIO_DIRECTORY_KEY, JSON.stringify({ version: STUDIO_DIRECTORY_VERSION, studios: custom }));
  } catch {}
}

function registerStudio(studio) {
  if (isRemoteEnabled) {
    remoteStudioCache = remoteStudioCache.filter((item) => item.id !== studio.id).concat(studio);
    syncStudioToRemote(studio).catch(() => {});
    return;
  }
  const list = loadStudioDirectory().filter((item) => item.id !== studio.id);
  list.push(studio);
  saveStudioDirectory(list);
}

async function syncStudioToRemote(studio) {
  if (!supabase) return;
  const { data } = await supabase.auth.getUser();
  if (!data?.user) return;
  await supabase.from("studios").upsert({
    id: studio.id,
    name: studio.name,
    type: studio.type,
    owner_id: data.user.id,
    check_in_time: studio.checkInTime || "09:00",
    office_layout: studio.officeLayout || "default"
  });
}

async function syncRemoteStudios() {
  if (!supabase) return;
  const { data, error } = await supabase.from("studios").select("id,name,type,owner_id,check_in_time,office_layout");
  if (error) return;
  remoteStudioCache = (data || []).map((studio) => ({ id: studio.id, name: studio.name, type: studio.type, owner: studio.owner_id, checkInTime: studio.check_in_time, officeLayout: studio.office_layout }));
  renderStudioSearchResults(document.getElementById("studio-search-input")?.value || "");
}

function searchStudios(query) {
  const keyword = (query || "").trim().toLowerCase();
  const list = loadStudioDirectory();
  if (!keyword) return list;
  return list.filter((studio) => studio.id.toLowerCase().includes(keyword) || studio.name.toLowerCase().includes(keyword));
}

function renderStudioSearchResults(query) {
  const container = document.getElementById("studio-search-results");
  if (!container) return;
  const results = searchStudios(query);
  container.innerHTML = results.length
    ? results.map((studio) => '<button class="studio-result' + (setupProfile.studioId === studio.id ? " is-selected" : "") + '" type="button" data-studio-id="' + studio.id + '"><strong>' + studio.name + '</strong><span>' + studio.id + ' · ' + (STUDIO_TYPES[studio.type]?.name || studio.type) + '</span></button>').join("")
    : '<div class="studio-result">没有找到匹配的工作室</div>';
}

function selectStudio(studioId) {
  const studio = loadStudioDirectory().find((item) => item.id === studioId);
  if (!studio) return;
  setupProfile.studioId = studio.id;
  setupProfile.studioName = studio.name;
  renderStudioSearchResults(document.getElementById("studio-search-input")?.value || "");
  updateStartButtonState();
}

let lastAgentTick = 0;

function renderRooms() {
  document.querySelectorAll(".room").forEach((room) => {
    const location = room.dataset.location;
    const people = (state.staff || []).filter((member) => member.location === location).map((member) => ({ ...member, isAgent: false })).concat((state.agents || []).filter((agent) => agent.location === location).map((agent) => ({ ...agent, isAgent: true })));
    const count = room.querySelector(".room-count");
    if (count) count.textContent = people.length ? String(people.length) : "";
    let peopleBox = room.querySelector(".room-people");
    if (!peopleBox) { peopleBox = document.createElement("span"); peopleBox.className = "room-people"; room.appendChild(peopleBox); }
    const visible = people.slice(0, 3).map((person) => {
      const stateClass = person.taskState === "done" ? "done" : person.taskState === "slacking" ? "slacking" : person.taskState === "review" ? "review" : "working";
      const idAttr = person.isAgent ? 'data-agent-id="' + person.id + '"' : 'data-staff-id="' + person.id + '"';
      const title = person.name + " / " + (person.role || "Agent") + " / " + (person.progress !== undefined ? Math.round(person.progress) + "%" : person.taskState);
      return '<i class="staff-dot ' + stateClass + (person.isAgent ? " agent-dot" : "") + '" ' + idAttr + ' title="' + title + '">' + person.name.slice(0, 2).toUpperCase() + "</i>";
    }).join("");
    peopleBox.innerHTML = visible + (people.length > 3 ? "<b>+" + (people.length - 3) + "</b>" : "");
  });
}
function simulateAgents() {
  if (!state || !state.agents || !state.agents.length) return;
  const now = Date.now();
  if (now - lastAgentTick < 5000) return;
  lastAgentTick = now;
  const zones = ["core", "office2", "archive", "rest", "meeting"];
  state.agents.forEach((agent) => {
    agent.progress = Math.min(100, (agent.progress || 0) + 5 + Math.random() * 15);
    if (agent.progress >= 100) {
      agent.progress = 0;
      agent.points = (agent.points || 0) + 5;
      agent.ability = clamp((agent.ability || 50) + 1);
      state.points = (state.points || 0) + 5;
      state.lifetimePoints = (state.lifetimePoints || 0) + 5;
      state.logs.push({ time: formatClock(), text: "Agent " + agent.name + " 自动完成一项工作，工作室积分 +5。" });
    }
    if (Math.random() < .25) agent.location = zones[Math.floor(Math.random() * zones.length)];
    if (Math.random() < .15) { agent.taskState = "review"; agent.status = "Review"; }
    else { agent.taskState = "working"; agent.status = "Working"; }
  });
  saveState();
  renderRooms();
  if (state.userMode === "creator") renderManagementView();
}

function toggleWorkGoal(goalId) {
  const goal = (state.workGoals || []).find((item) => item.id === goalId);
  if (!goal) return;
  goal.done = !goal.done;
  if (goal.done) { goal.nextReminderAt = null; goal.reminded = true; }
  if (goal.done && !goal.rewarded) {
    goal.rewarded = true;
    state.points = (state.points || 0) + POINT_RULES.goal;
    state.lifetimePoints = (state.lifetimePoints || 0) + POINT_RULES.goal;
    state.ability = clamp(state.ability + 2);
    state.mood = clamp(state.mood + 1);
    state.logs.push({ time: formatClock(), text: "完成工作目标：" + goal.title + "，积分 +" + POINT_RULES.goal + "。" });
    showToast("目标已完成：" + goal.title + "，积分 +" + POINT_RULES.goal);
  }
  saveState();
  renderAll();
}

let activeAgendaRule = null;
let remoteStudioCache = [];
let lastAgendaAt = 0;

function getLocationLabel(location) {
  const labels = { core: "核心办公区", office2: "双人办公室", meeting: "会议室", rest: "茶水休息区", archive: "资料室", restroom: "厕所", reception: "大门" };
  return labels[location] || location;
}

function openAgendaPrompt(rule) {
  activeAgendaRule = rule;
  document.getElementById("agenda-time").textContent = rule.time || formatClock();
  document.getElementById("agenda-title").textContent = rule.title;
  document.getElementById("agenda-message").textContent = rule.text;
  document.getElementById("agenda-location").textContent = getLocationLabel(rule.location);
  if (rule.id === "fatigue") { state.sleepPending = true; state.sleepPendingAt = Date.now(); saveState(); }
  const dialog = document.getElementById("agenda-dialog");
  if (!dialog.open) dialog.showModal();
}

function goToAgendaLocation() {
  if (!activeAgendaRule) return;
  if (activeAgendaRule.id === "fatigue") { startSleep(); return; }
  movePlayerTo(activeAgendaRule.location);
  document.querySelectorAll(".room").forEach((room) => room.classList.toggle("is-focus", room.dataset.location === activeAgendaRule.location));
  showToast("已前往：" + getLocationLabel(activeAgendaRule.location));
  document.getElementById("agenda-dialog").close();
  activeAgendaRule = null;
}

function processAgenda() {
  if (!state || document.getElementById("agenda-dialog")?.open) return;
  const now = formatClock();
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  const today = getTodayKey();
  const dueRules = AGENDA_RULES.filter((item) => !(state.agendaTriggered || []).includes(today + ":" + item.id) && now >= item.time).sort((a, b) => a.time.localeCompare(b.time));
  for (const rule of dueRules) {
    const parts = rule.time.split(":").map(Number);
    const ruleMinutes = parts[0] * 60 + parts[1];
    state.agendaTriggered.push(today + ":" + rule.id);
    if (nowMinutes - ruleMinutes <= 30) {
      saveState();
      openAgendaPrompt(rule);
      return;
    }
  }
  saveState();
}

const CLOCKOUT_MESSAGES = [
  "今天也认真生活了，你比昨天更接近想去的地方。",
  "辛苦不是终点，你正在把喜欢的事情一点点变成现实。",
  "今天完成的事情已经足够证明，你一直在往前走。",
  "允许自己休息，明天依然可以闪闪发光。",
  "每一次认真工作，都是在为未来积累一束光。"
];

function getTodayAttendance() {
  if (!state.attendance) state.attendance = [];
  const dateKey = getTodayKey();
  let record = state.attendance.find((item) => item.dateKey === dateKey);
  if (!record) {
    record = { dateKey, checkInAt: null, checkOutAt: null, status: "pending" };
    state.attendance.push(record);
  }
  return record;
}

function minutesFromTime(value) {
  const parts = String(value || "00:00").split(":").map(Number);
  return parts[0] * 60 + parts[1];
}

function recordLoginAttendance() {
  if (!state) return;
  const record = getTodayAttendance();
  if (record.checkInAt) return;
  record.checkInAt = formatClock();
  const now = new Date().getHours() * 60 + new Date().getMinutes();
  const late = now > minutesFromTime(state.checkInTime || "09:00") + 5;
  record.status = late ? "late" : "present";
  state.logs.push({ time: record.checkInAt, text: "登录即签到成功" + (late ? "，记录为迟到。" : "。") });
  saveState();
  showToast("登录签到成功：" + record.checkInAt);
}

function handleGateAction() {
  if (!state) return;
  if (state.asleep) { showToast("人物正在睡觉，暂时无法离开。"); return; }
  const record = getTodayAttendance();
  if (!record.checkInAt) recordLoginAttendance();
  if (record.checkOutAt) { showToast("今天已经下班了。"); return; }
  record.checkOutAt = formatClock();
  record.durationMinutes = Math.max(0, minutesFromTime(record.checkOutAt) - minutesFromTime(record.checkInAt));
  state.logs.push({ time: record.checkOutAt, text: "手动下班：" + record.checkOutAt + "。" });
  saveState();
  if (state.userMode === "employee") showClockoutOverlay();
  else { showToast("下班已记录：" + record.checkOutAt); renderAll(); }
}

function showClockoutOverlay() {
  const message = CLOCKOUT_MESSAGES[Math.floor(Math.random() * CLOCKOUT_MESSAGES.length)];
  document.getElementById("clockout-message").textContent = message;
  document.getElementById("clockout-stamp").textContent = "CHECKED OUT · " + formatClock();
  document.getElementById("clockout-overlay").hidden = false;
}

function startSleep() {
  if (!state || state.asleep) return;
  state.asleep = true;
  state.drowsy = true;
  state.sleepPending = false;
  state.sleepEndsAt = 0;
  state.continuousWorkMinutes = 0;
  state.fatigueNotified = false;
  state.lastAction = "sleeping";
  state.playerLocation = "rest";
  state.mood = clamp(state.mood + 15);
  state.body = clamp(state.body + 30);
  state.ability = clamp(state.ability - 2);
  if (state.activeMeetingId) {
    const meeting = state.meetings.find((item) => item.id === state.activeMeetingId);
    if (meeting) meeting.status = "conflict";
    state.activeMeetingId = null;
  }
  movePlayerTo("rest");
  document.getElementById("agenda-dialog").close();
  activeAgendaRule = null;
  state.logs.push({ time: formatClock(), text: "人物因困意自动睡着，会议和行动暂时中断。" });
  pushSocialMessage("你因为太困睡着了，30 秒后会自动醒来。");
  saveState();
  renderAll();
  showToast("人物已经睡着");
}

function processSleepState() {
  if (!state) return;
  if (state.sleepPending && Date.now() - state.sleepPendingAt >= 20000) startSleep();
}

function renderAttendanceList() {
  const input = document.getElementById("check-in-time");
  if (!input) return;
  input.value = state.checkInTime || "09:00";
  const list = document.getElementById("attendance-list");
  const records = (state.attendance || []).slice(-7).reverse();
  list.innerHTML = records.length ? records.map((record) => '<div class="admin-item"><span>' + record.dateKey + ' · ' + (record.status || "present") + '</span><span>签到 ' + (record.checkInAt || "--") + ' / 下班 ' + (record.checkOutAt || "--") + '</span></div>').join("") : '<div class="admin-item"><span>暂无考勤记录</span></div>';
}

const GOAL_ADVANCE_MINUTES = 10;

function processGoalReminders() {
  if (!state || state.asleep || document.getElementById("agenda-dialog")?.open) return;
  const now = Date.now();
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  const today = getTodayKey();
  const goal = (state.workGoals || []).find((item) => {
    if (item.done) return false;
    if (item.dueTime) {
      const parts = item.dueTime.split(":").map(Number);
      const dueMinutes = parts[0] * 60 + parts[1];
      return !item.reminded && nowMinutes >= dueMinutes - GOAL_ADVANCE_MINUTES && nowMinutes - dueMinutes <= 30;
    }
    return item.nextReminderAt && now >= item.nextReminderAt;
  });
  if (!goal) return;
  if (goal.dueTime) goal.reminded = true;
  goal.nextReminderAt = now + (10 + Math.random() * 10) * 60000;
  saveState();
  openAgendaPrompt({ id: "goal-" + goal.id, time: goal.dueTime || formatClock(), title: goal.dueTime ? "工作目标即将到时间" : "工作目标提醒", text: "目标：" + goal.title + "。建议前往对应区域推进。", location: goal.location, goalId: goal.id });
}

function wakeUp(reminderName) {
  if (!state || !state.asleep) return;
  state.asleep = false;
  state.drowsy = true;
  state.sleepEndsAt = 0;
  state.sleepPending = false;
  state.lastAction = "sleepy";
  state.mood = clamp(state.mood + 5);
  state.logs.push({ time: formatClock(), text: (reminderName || "同事") + " 提醒你起床，人物被唤醒，但困意仍未完全解除。" });
  pushSocialMessage((reminderName || "同事") + " 提醒你起床，但困意仍然存在。请手动移动角色继续清醒。");
  saveState();
  renderAll();
  showToast((reminderName || "同事") + " 提醒你起床了，但困意还未解除");
}

function wakeByReminder(person, name) {
  if (!state || !state.asleep) return;
  if (!person.isBoss && state.refusedReminders?.[person.id]) {
    showToast(name + " 已经提醒过多次，不愿意再提醒了。");
    return;
  }
  const rel = getRelationship(person.id);
  if (person.isBoss) {
    state.points = Math.max(0, (state.points || 0) - 15);
    state.mood = clamp(state.mood - 3);
    rel.affection = clamp(rel.affection + 1);
    state.logs.push({ time: formatClock(), text: "老板巡查发现你睡着，远程提醒并扣除 15 积分。" });
    wakeUp(name || "老板");
    return;
  }
  state.reminderCounts[person.id] = (state.reminderCounts[person.id] || 0) + 1;
  const count = state.reminderCounts[person.id];
  rel.affection = clamp(rel.affection + 2);
  state.points = Math.max(0, (state.points || 0) - 5);
  const reportChance = Math.min(.45, .1 + count * .1);
  if (Math.random() < reportChance) {
    state.points = Math.max(0, state.points - 20);
    state.reportCount = (state.reportCount || 0) + 1;
    const bossRel = getRelationship("boss");
    bossRel.affection = clamp(bossRel.affection - 5);
    pushSocialMessage(person.name + " 向老板打了小报告，你被额外扣除 20 积分。");
    state.logs.push({ time: formatClock(), text: person.name + " 打了小报告，老板对你的信任下降。" });
  }
  if (count >= 3) {
    state.refusedReminders[person.id] = true;
    pushSocialMessage(person.name + " 已经提醒你多次，之后可能不再愿意叫你起床。");
  }
  saveState();
  wakeUp(name || person.name || "同事");
}

function renderSleepBanner() {
  const banner = document.getElementById("sleep-banner");
  if (banner) banner.hidden = !state.asleep;
}

async function submitJoinRequest(profile, identityId) {
  if (!supabase) return;
  const { data } = await supabase.auth.getUser();
  if (!data?.user) return;
  await supabase.from("join_requests").upsert({
    studio_id: profile.studioId,
    user_id: data.user.id,
    nickname: profile.nickname,
    profession: identityId,
    studio_type: selectedProfession,
    status: "pending"
  }, { onConflict: "studio_id,user_id" });
}
