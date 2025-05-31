import { getAllPosts, getPostBySlug, getPostSlugs } from '../lib/blog'
import fs from 'fs'
import path from 'path'

// Mock fs module
jest.mock('fs')
jest.mock('path')

const mockedFs = jest.mocked(fs)
const mockedPath = jest.mocked(path)

describe('Blog utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getPostSlugs', () => {
    it('should return an array of post slugs', () => {
      // Mock fs.readdirSync to return sample filenames
      mockedFs.readdirSync = jest.fn().mockReturnValue([
        'hello-world.mdx',
        'nextjs-static-sites.mdx',        'not-mdx-file.txt'
      ] as any)
      
      mockedFs.existsSync = jest.fn().mockReturnValue(true)
      mockedPath.join = jest.fn().mockReturnValue('/mock/content/posts')

      const slugs = getPostSlugs()
      
      expect(slugs).toEqual(['hello-world', 'nextjs-static-sites'])
      // Verify that readdirSync was called
      expect(mockedFs.readdirSync).toHaveBeenCalledTimes(1)
    })

    it('should return empty array when posts directory does not exist', () => {
      mockedFs.existsSync = jest.fn().mockReturnValue(false)
      mockedPath.join = jest.fn().mockReturnValue('/mock/content/posts')

      const slugs = getPostSlugs()
      
      expect(slugs).toEqual([])
      expect(mockedFs.readdirSync).not.toHaveBeenCalled()
    })
  })

  describe('getPostBySlug', () => {
    it('should return a blog post with correct structure', () => {
      const mockFileContent = `---
title: "Test Post"
date: "2024-01-15"
excerpt: "This is a test post"
tags: ["test", "demo"]
published: true
author: "Test Author"
---

This is the content of the test post.`

      mockedFs.readFileSync = jest.fn().mockReturnValue(mockFileContent)
      mockedPath.join = jest.fn().mockReturnValue('/mock/content/posts/test-post.mdx')

      const post = getPostBySlug('test-post')
      
      expect(post).toEqual({
        slug: 'test-post',
        title: 'Test Post',
        date: '2024-01-15',
        excerpt: 'This is a test post',
        tags: ['test', 'demo'],
        published: true,
        author: 'Test Author',
        content: '\nThis is the content of the test post.',
        coverImage: undefined
      })
    })
  })
})
