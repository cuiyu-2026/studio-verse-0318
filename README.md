# StudioVerse Multiplayer

## 当前阶段

这是一个准备部署到 Vercel 的多人版项目骨架，使用 Vite + Supabase。

- 前端：Vite
- 登录与数据库：Supabase
- 部署：Vercel
- 实时同步和 Presence：Supabase Realtime

## 1. Supabase

1. 打开 Supabase 项目。
2. 进入 SQL Editor。
3. 复制并执行 `supabase/schema.sql`。
4. 进入 Authentication → Providers，启用 Email。
5. 测试阶段可以关闭 Confirm email。
6. 记录 Project URL 和 anon public key。

不要使用或公开 service_role key。

## 2. 本地环境变量

复制 `.env.example` 为 `.env`：

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 3. 本地运行

```bash
npm install
npm run dev
```

## 4. Vercel 部署

1. Vercel 使用 GitHub 登录。
2. 导入仓库 `studio-verse-0318`。
3. Framework Preset 选择 Vite。
4. Build Command 使用 `npm run build`。
5. Output Directory 使用 `dist`。
6. 在 Environment Variables 中添加：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. 点击 Deploy。

## 5. 多人测试顺序

1. 创始人注册并登录。
2. 创建工作室，获得工作室 ID。
3. 朋友注册并登录。
4. 搜索工作室 ID 或名称。
5. 提交加入申请。
6. 创始人在管理中心审批。
7. 审批通过后进入同一个工作室。

## 后续需要接入

- 账号界面与 Supabase Auth
- 远程工作室目录
- 加入申请和审批
- Realtime Presence
- 成员状态 JSON 同步
- 工作室共享状态同步
- 离线提醒
- 服务端积分校验
