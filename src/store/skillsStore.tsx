import { skills } from "@/data/mock-data"
import { posts } from "@/data/skill-detail-data"
import { Post, Skill } from "@/types/app-types"
import { create } from "zustand"

type SkillStoreType = {
	skills: Skill[]
	addSkill: (newSkill: Skill) => void
}

const useSkillStore = create<SkillStoreType>()((set) => ({
	skills: skills || [],
	addSkill: (newSkill: Skill) => {
		set((state) => ({ skills: [...state.skills, newSkill] }))
	},
}))

export const useSkills = () => useSkillStore((state) => state.skills)
export const useAddSkill = () => useSkillStore((state) => state.addSkill)

// ===============================

type PostsStoreType = {
	posts: Post[]
	addPost: (newPost: Post) => void
}

const usePostStore = create<PostsStoreType>()((set) => ({
	posts: posts || [],
	addPost: (newPost: Post) => {
		set((state) => ({ posts: [...state.posts, newPost] }))
	},
}))

export const usePosts = () => usePostStore((state) => state.posts)
export const useAddPost = () => usePostStore((state) => state.addPost)
