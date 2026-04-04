# ✨ Mira AI

An AI-powered learning companion that helps you track what you learn and turn it into shareable content.

---

## 🚀 Overview

Mira AI is a full-stack Next.js application designed to help developers (and learners) document their daily learning and instantly convert it into structured social media posts using AI.

Instead of staring at a blank screen, Mira helps you:

- Capture what you learned
- Generate high-quality posts (X / LinkedIn)
- Track your learning progress visually

---

## 🧠 Core Idea

> Learn → Reflect → Generate → Share

Mira AI bridges the gap between **learning and sharing** by turning raw notes into polished content.

---

## ✨ Features

### 🔐 Authentication

- Secure login using Auth.js
- Protected routes for user-specific data

### 📝 Learning Tracker

- Add skills you’re learning
- Log daily learning entries (topic + notes)

### 🤖 AI Post Generator

- Generate posts based on your learning
- Supports multiple platforms (X, LinkedIn)
- Customize tone and style
- Structured output (title, content, hashtags)

### 📊 Dashboard

- Track your learning activity
- Visual insights with charts
- Skill-wise progress tracking
- Contribution-style activity heatmap

### 🗂️ Posts History

- View previously generated posts
- Reuse or refine content

### ⚡ Smart Fallback

- Works even when AI token limit is reached
- Uses template-based generation as backup

---

## 🏗️ Tech Stack

### Frontend

- Next.js (App Router)
- React
- Tailwind CSS
- shadcn/ui

### State & Forms

- Zustand (UI state)
- React Hook Form
- Zod (validation)

### Backend & Database

- Supabase (PostgreSQL + Storage)
- Auth.js (authentication)

### AI

- Google AI Studio (Gemini) / OpenRouter
- Structured prompt + response validation

### Visualization

- Recharts

---

## 📂 Project Structure

```
app/
    dashboard/
    posts/
    skills/
    api/

components/
    charts/
    forms/
    ui/

lib/
ai/
db/
validation/

store/
    zustand/

types/

```

---

## 🪟 Popup Flow (Vibe Coding Notes)

### 1.) Implementation Summary (for interviewers)

- Built a reusable popup architecture with a shared `useDialogOverlay` hook for open/close, escape handling, and body scroll lock.
- Applied feature-level popup orchestration hooks:
  - Add Entry flow (`useAddEntryDialog`)
  - Add Skill flow (`useAddSkillDialog`)
  - Skill Post dialog flow (`useSkillPostDialog`)
- Standardized popup composition pattern:
  - Dialog shell component for layout/visual treatment
  - Feature hook for state + behavior
  - Form/content component receiving a single `dialog` object
- Refined business flow correctness:
  - Topic checkbox opens entry popup only.
  - Data mutation (create post, create entry, mark topic complete) happens on submit action.
- Reduced page-level complexity by moving popup state and behavior out of parent pages/components.
- Improved maintainability by separating:
  - generic primitives (`hooks/*`)
  - feature logic (`features/*`)
  - UI rendering (`components/*`)

🧑‍💻 Author

Built by Vaishali
Frontend Engineer • Building in public 🚀

<!-- Branches -->
<!-- main - static pages with pages and popups - static design  -->
<!-- data-formatting has zustand and its store -->
<!-- design-data-mere - merged both branches above -->

<!-- upload image in user entry popup -->
<!-- one column for view entry in skill table -->

<!-- Popup reminder -->
<!-- Keep popup UI in components/popups, logic in features/* -->
<!-- Use one shared dialog primitive: useDialogOverlay -->
<!-- Popup trigger should not mutate business data unless explicitly required -->
<!-- Keep generic hooks in hooks/* and feature hooks in features/* -->
<!-- Avoid duplicate logic paths (old hook stays only as temporary shim, not active usage) -->
<!-- Keep naming consistent: topics, entries, postId, skillId -->
<!-- Do not change design while refactoring architecture -->
