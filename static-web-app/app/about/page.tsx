// --- file: app/about/page.tsx ---
import { Metadata } from 'next'
import Image from 'next/image'
import Container from '@/components/Container'
import SkillBadge from '@/components/SkillBadge'
import { TimelineItem } from '@/components/TimelineItem'

// SEO metadata for the about page
export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Kenneth Heine, his background, skills, and journey as a full-stack developer.',
}

/**
 * About page component
 * Features:
 * - Personal bio and background
 * - Skills grid with technology badges
 * - Professional timeline/milestones
 * - Personal interests
 */
export default function AboutPage() {
  // Skills organized by category
  const skills = {
    frontend: [
      'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'
    ],
    backend: [
      'Node.js', 'Python', 'C#', '.NET', 'Express.js', 'FastAPI'
    ],
    database: [
      'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Prisma'
    ],
    cloud: [
      'Azure', 'AWS', 'Docker', 'Kubernetes', 'Serverless', 'CI/CD'
    ],
    tools: [
      'Git', 'VS Code', 'Figma', 'Jest', 'Playwright', 'Webpack'
    ]
  }

  // Professional timeline
  const timeline = [
    {
      year: '2025',
      title: 'Senior Full-Stack Developer',
      company: 'Current Role',
      description: 'Leading development of scalable web applications using modern technologies and best practices.'
    },
    {
      year: '2023',
      title: 'Full-Stack Developer',
      company: 'Previous Company',
      description: 'Developed and maintained multiple web applications serving thousands of users daily.'
    },
    {
      year: '2021',
      title: 'Frontend Developer',
      company: 'First Tech Role',
      description: 'Started my professional journey building responsive user interfaces and learning backend technologies.'
    },
    {
      year: '2020',
      title: 'Self-Taught Developer',
      company: 'Personal Journey',
      description: 'Began learning web development through online courses, tutorials, and building personal projects.'
    }
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Text Content */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  About Me
                </h1>                <p className="mt-6 text-lg leading-7 text-gray-600 dark:text-gray-300">
                  I&apos;m a passionate full-stack developer with a love for creating clean, 
                  efficient, and user-friendly web applications. My journey in tech started 
                  with curiosity and has evolved into a career focused on continuous learning 
                  and building meaningful digital experiences.
                </p>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing 
                  to open-source projects, or sharing knowledge through blog posts and 
                  mentoring fellow developers.
                </p>
              </div>

              {/* Profile Photo */}
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                  <Image
                    src="/about-photo.jpg"
                    alt="Kenneth Heine - About Photo"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 400px, 100vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Skills & Technologies
            </h2>
            <p className="mt-4 text-center text-base text-gray-600 dark:text-gray-400">
              Technologies and tools I work with to bring ideas to life
            </p>

            <div className="mt-12 space-y-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category}>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <SkillBadge key={skill} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              My Journey
            </h2>
            <p className="mt-4 text-center text-base text-gray-600 dark:text-gray-400">
              Key milestones in my development career
            </p>

            <div className="mt-12">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700 sm:left-1/2 sm:-translate-x-px"></div>
                
                {/* Timeline items */}
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <TimelineItem 
                      key={item.year} 
                      item={item} 
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Personal Interests */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Beyond the Code
            </h2>            <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
              When I&apos;m not immersed in code, I enjoy exploring new places, photography, 
              reading about emerging technologies, and spending time in nature. I believe 
              that diverse experiences make me a better developer and problem solver.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {['Photography', 'Travel', 'Hiking', 'Reading', 'Open Source', 'Mentoring'].map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
