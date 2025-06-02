// --- file: app/about/page.tsx ---
import { Metadata } from 'next'
import Image from 'next/image'
import Container from '@/components/Container'
import SkillBadge from '@/components/SkillBadge'
import { TimelineItem } from '@/components/TimelineItem'

// SEO metadata for the about page
export const metadata: Metadata = {
  title: 'About',
  description: 'Kenneth Heine is a DevOps engineer and cloud architect passionate about bringing AI into software development. Learn about his background in Azure cloud architecture and automation.',
}

/**
 * About page component
 * Features:
 * - Personal bio and background
 * - Skills grid with technology badges
 * - Professional timeline/milestones
 * - Personal interests
 */
export default function AboutPage() {  // Skills organized by category
  const skills = {
    ai_tools: [
      'GitHub Copilot', 'GPT APIs', 'Claude API', 'ChatGPT', 'AI Code Generation', 'Prompt Engineering'
    ],
    azure_cloud: [
      'Azure Architecture', 'Azure App Service', 'Azure Functions', 'Azure Container Apps', 
      'Azure Static Web Apps', 'Azure DevOps', 'Azure Storage', 'Azure Cosmos DB'
    ],
    devops: [
      'CI/CD Pipelines', 'GitHub Actions', 'Azure Pipelines', 'Docker', 'Kubernetes', 'Infrastructure as Code'
    ],
    automation: [
      'Terraform', 'Bicep', 'ARM Templates', 'PowerShell', 'Python', 'Bash', 'Ansible'
    ],
    development: [
      'TypeScript', 'Node.js', 'React', 'Next.js', 'Python', 'REST APIs', 'Microservices'
    ]
  }  // Professional timeline
  const timeline = [
    {
      year: '2022-Present',
      title: 'Azure Cloud & AI DevOps Expert',
      company: 'KS Cloud Solutions',
      description: 'Leading Azure cloud architecture design and AI-powered DevOps implementations. Specializing in Infrastructure as Code, CI/CD pipelines, and integrating AI tools into development workflows for enhanced productivity.'
    },
    {
      year: '2022-2022',
      title: 'Senior Azure Consultant',
      company: 'CTGlobal',
      description: 'Provided expert consulting on Azure cloud solutions, focusing on architecture design, automation, and DevOps practices. Worked with clients to implement scalable and secure cloud infrastructures.'
    },
    {
      year: '2021-2022',
      title: 'Cloud Architect @ Shared Platforms & DevOps',
      company: 'BEC Financial Technologies',
      description: 'Designed and implementede Azure cloud secret soultion with Azure Key Vault'
    },
    {
      year: '2020-2021',
      title: 'Cloud Architect - Azure',
      company: 'Koncern IT - Copenhagen Municipality',
      description: 'Developed and managed Azure cloud solutions for the Copenhagen Municipality. Focused on optimizing cloud resources, implementing security best practices, and automating deployment processes.'
    },
    {
      year: '2017-2020',
      title: 'Network Engineer - Technical Responsible',
      company: 'Koncern IT - Copenhagen Municipality',
      description: 'Managed and optimized network infrastructure for the Copenhagen Municipality. Led a team of technicians in maintaining high availability and performance for over 25,000 users.'
    },
    {
      year: '2013-2017',
      title: 'Data Technician Apprentice specializing in Infrastructure', 
      company: 'Koncern IT - Copenhagen Municipality',
      description: 'Accumulated significant knowledge in enterprise IT while providing support for 25,000 users'
    },
    {
      year: '2012-2013',
      title: 'IT Support Specialist',
      company: 'A.B Consult Aps',
      description: 'Provided technical support and system administration services.'
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
                  I&apos;m Kenneth, a DevOps engineer and cloud architect passionate about bringing AI into the heart of 
                  software development. I help developers and teams understand and implement the 
                  latest AI and automation tools while designing scalable, efficient cloud architectures on Azure.
                </p>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  With extensive experience in Azure cloud architecture, DevOps practices, and hands-on 
                  application of AI to real-world development pipelines, I break down complex concepts 
                  into practical, actionable strategies that make a measurable difference in team productivity 
                  and software quality.
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
          </div>        </Container>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              My Mission
            </h2>            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              My mission is to empower software teams to work more efficiently and effectively 
              by integrating AI and automation into their everyday workflows, while building 
              robust, scalable cloud architectures on Azure. Through tutorials, guides, and 
              consulting, I provide clear, practical advice to help developers navigate the 
              fast-changing landscape of AI tools and cloud technologies.
            </p>            <div className="mt-8 rounded-2xl bg-brand-50 p-8 dark:bg-brand-900/20">
              <blockquote className="text-base italic text-gray-700 dark:text-gray-300">
                &ldquo;I help developers and DevOps teams work smarter, not harder — by teaching them 
                how to use AI, automation, and Azure cloud architecture to code faster, deploy faster, 
                and deliver better software that scales.&rdquo;
              </blockquote>
            </div>
          </div>
        </Container>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <Container>
          <div className="mx-auto max-w-4xl">            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              AI, Automation & Cloud Architecture Expertise
            </h2>
            <p className="mt-4 text-center text-base text-gray-600 dark:text-gray-400">
              Tools and technologies I use to help developers work smarter and build scalable solutions
            </p><div className="mt-12 space-y-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category}>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {category.replace(/_/g, ' ').charAt(0).toUpperCase() + category.replace(/_/g, ' ').slice(1)}
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
          <div className="mx-auto max-w-4xl">            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Professional Journey
            </h2>            <p className="mt-4 text-center text-base text-gray-600 dark:text-gray-400">
              From infrastructure management to AI-powered development workflows and Azure cloud architecture
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
