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

🧑‍💻 Author

Built by Vaishali
Frontend Engineer • Building in public 🚀
