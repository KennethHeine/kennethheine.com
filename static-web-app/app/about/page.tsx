// --- file: app/about/page.tsx ---
import Container from '@/components/layout/Container';
import { JsonLd } from '@/components/seo/JsonLd';
import SkillBadge from '@/components/ui/SkillBadge';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { generatePersonStructuredData } from '@/lib/seo/structured-data';
import { Metadata } from 'next';
import Image from 'next/image';

// SEO metadata for the about page
export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm Kenneth Heine, a cloud architect at KS Cloud Solutions. My background is in infrastructure, and my work spans Azure platforms, DevOps, and AI-assisted development.",
  openGraph: {
    title: 'About Kenneth Heine - DevOps Engineer & Cloud Architect',
    description:
      "I'm Kenneth Heine, a cloud architect at KS Cloud Solutions. My background is in infrastructure, and my work spans Azure platforms, DevOps, and AI-assisted development.",
    type: 'website',
    url: 'https://kennethheine.com/about',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Kenneth Heine - DevOps Engineer & Cloud Architect',
      },
    ],
  },
  twitter: null,
  alternates: {
    canonical: 'https://kennethheine.com/about',
  },
};

/**
 * About page component - "Signal & Ledger" editorial layout
 * Features:
 * - Personal bio with technical-figure photo treatment
 * - Approach pull-quote in display type
 * - Skills as a ledger of categories
 * - Professional timeline
 */
export default function AboutPage() {
  const personData = generatePersonStructuredData('https://kennethheine.com');

  // Skills organized by category
  const skills = {
    ai_tools: [
      'GitHub Copilot',
      'GPT APIs',
      'Claude API',
      'ChatGPT',
      'AI Code Generation',
      'Prompt Engineering',
    ],
    azure_cloud: [
      'Azure Architecture',
      'Azure App Service',
      'Azure Functions',
      'Azure Container Apps',
      'Azure Static Web Apps',
      'Azure DevOps',
      'Azure Storage',
      'Azure Cosmos DB',
    ],
    devops: [
      'CI/CD Pipelines',
      'GitHub Actions',
      'Azure Pipelines',
      'Docker',
      'Kubernetes',
      'Infrastructure as Code',
    ],
    automation: [
      'Terraform',
      'Bicep',
      'ARM Templates',
      'PowerShell',
      'Python',
      'Bash',
      'Ansible',
    ],
    development: [
      'TypeScript',
      'Node.js',
      'React',
      'Next.js',
      'Python',
      'REST APIs',
      'Microservices',
    ],
  }; // Professional timeline
  const timeline = [
    {
      year: '2022-Present',
      title: 'Cloud Architect & DevOps Consultant',
      company: 'KS Cloud Solutions',
      description:
        'I work with development teams on Azure architecture, infrastructure as code, and CI/CD. I also help teams use AI tools and automate repetitive parts of software delivery.',
    },
    {
      year: '2022-2022',
      title: 'Senior Azure Consultant',
      company: 'CTGlobal',
      description:
        'I advised clients on Azure architecture and worked on cloud infrastructure, automation, and DevOps practices.',
    },
    {
      year: '2021-2022',
      title: 'Cloud Architect @ Shared Platforms & DevOps',
      company: 'BEC Financial Technologies',
      description:
        'I designed and implemented a solution for managing secrets with Azure Key Vault.',
    },
    {
      year: '2020-2021',
      title: 'Cloud Architect - Azure',
      company: 'Koncern IT - Copenhagen Municipality',
      description:
        'I developed and managed Azure infrastructure for Copenhagen Municipality, working on cloud resources, security, and deployment automation.',
    },
    {
      year: '2017-2020',
      title: 'Network Engineer - Technical Responsible',
      company: 'Koncern IT - Copenhagen Municipality',
      description:
        'I was responsible for network infrastructure at Copenhagen Municipality and led technicians supporting a network used by more than 25,000 people.',
    },
    {
      year: '2013-2017',
      title: 'Data Technician Apprentice specializing in Infrastructure',
      company: 'Koncern IT - Copenhagen Municipality',
      description:
        'I trained in enterprise infrastructure and supported an IT environment with 25,000 users.',
    },
    {
      year: '2012-2013',
      title: 'IT Support Specialist',
      company: 'A.B Consult Aps',
      description: 'I worked in technical support and system administration.',
    },
  ];

  return (
    <main>
      <JsonLd data={personData} />
      {/* Hero Section - editorial split */}
      <section className='relative overflow-hidden border-b border-gray-200 bg-blueprint texture-grain dark:border-gray-800'>
        <div
          className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_10%,transparent_30%,var(--color-gray-50)_95%)] dark:bg-[radial-gradient(ellipse_at_70%_10%,transparent_30%,var(--color-gray-950)_95%)]'
          aria-hidden='true'
        />
        <Container>
          <div className='relative mx-auto max-w-5xl py-20 sm:py-24'>
            <div className='grid gap-12 lg:grid-cols-2 lg:gap-16'>
              {/* Text Content */}
              <div className='reveal'>
                <p className='label-mono flex items-center gap-3'>
                  <span
                    className='inline-block h-px w-10 bg-brand-500'
                    aria-hidden='true'
                  />
                  Profile / 01
                </p>
                <h1 className='mt-3 font-display text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl'>
                  About Me
                </h1>
                <p className='mt-6 text-lg leading-7 text-gray-600 dark:text-gray-300'>
                  I&apos;m Kenneth, a cloud architect and DevOps consultant at
                  KS Cloud Solutions. My background is in infrastructure, and
                  much of my work is about helping development teams build and
                  run software on Azure.
                </p>
                <p className='mt-4 text-base leading-7 text-gray-600 dark:text-gray-300'>
                  I work across teams to find what slows delivery down. That
                  might mean building a platform, automating a manual process,
                  or helping someone understand a technical choice. I enjoy the
                  hands-on work as much as explaining it to developers and
                  product owners.
                </p>
              </div>
              {/* Profile Photo - technical figure */}
              <figure className='reveal reveal-delay-2 lg:justify-self-end'>
                <div className='frame-ticks relative aspect-square w-64 sm:w-80 overflow-hidden'>
                  <Image
                    src='/images/about-photo.jpg'
                    alt='Kenneth Heine - About Photo'
                    width={400}
                    height={400}
                    className='h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0 motion-reduce:transition-none'
                    sizes='(min-width: 640px) 320px, 256px'
                    priority
                  />
                </div>
                <figcaption className='label-mono mt-4'>
                  Fig. 02 / Kenneth Heine
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* Approach - display pull-quote */}
      <section className='border-b border-gray-200 py-20 sm:py-24 dark:border-gray-800'>
        <Container>
          <div className='mx-auto max-w-4xl'>
            <p className='label-mono'>Approach / 02</p>
            <h2 className='mt-3 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl'>
              How I work
            </h2>
            <p className='mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300'>
              I like building platforms that teams can use without having to ask
              for help with every change. Infrastructure as code and automated
              builds give us a repeatable starting point. Tests and monitoring
              help us see whether the system behaves as expected. I take the
              same approach to AI: give it useful context, then check the
              result.
            </p>
            <blockquote className='mt-12 border-l-2 border-brand-500 pl-6 sm:pl-10'>
              <p className='font-display text-2xl font-semibold leading-snug tracking-tight text-gray-900 dark:text-gray-50 sm:text-3xl'>
                People set the direction. Tests and feedback help us check
                whether the code does the job.
              </p>
            </blockquote>
          </div>
        </Container>
      </section>

      {/* Skills Section - ledger of categories */}
      <section className='border-b border-gray-200 py-20 sm:py-24 dark:border-gray-800'>
        <Container>
          <div className='mx-auto max-w-4xl'>
            <p className='label-mono'>Expertise / 03</p>
            <h2 className='mt-3 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl'>
              Tools I work with
            </h2>
            <p className='mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-400'>
              My work covers cloud infrastructure, delivery pipelines, and
              software development. These are some of the tools I use.
            </p>
            <div className='mt-12'>
              {Object.entries(skills).map(([category, skillList], i) => (
                <div
                  key={category}
                  className='grid gap-3 border-t border-gray-200 py-6 sm:grid-cols-12 sm:gap-8 dark:border-gray-800'
                >
                  <h3 className='label-mono sm:col-span-3 sm:pt-2'>
                    <span
                      className='mr-2 text-brand-600 dark:text-brand-400'
                      aria-hidden='true'
                    >
                      0{i + 1}
                    </span>
                    {category.replace(/_/g, ' ').charAt(0).toUpperCase() +
                      category.replace(/_/g, ' ').slice(1)}
                  </h3>
                  <div className='flex flex-wrap gap-2 sm:col-span-9'>
                    {skillList.map(skill => (
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
      <section className='border-b border-gray-200 py-20 sm:py-24 dark:border-gray-800'>
        <Container>
          <div className='mx-auto max-w-4xl'>
            <p className='label-mono'>Journey / 04</p>
            <h2 className='mt-3 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl'>
              My background
            </h2>
            <p className='mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-400'>
              I started in IT support and infrastructure before moving into
              Azure architecture and DevOps. Here&apos;s my career so far.
            </p>
            <div className='mt-12'>
              <div className='relative'>
                {/* Timeline spine */}
                <div className='absolute left-8 top-0 h-full w-px bg-gray-200 dark:bg-gray-800 sm:left-1/2 sm:-translate-x-px'></div>

                {/* Timeline items */}
                <div className='space-y-12'>
                  {timeline.map((item, index) => (
                    <TimelineItem key={item.year} item={item} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Personal Interests */}
      <section className='py-20 sm:py-24'>
        <Container>
          <div className='mx-auto max-w-4xl'>
            <p className='label-mono'>Off duty / 05</p>
            <h2 className='mt-3 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl'>
              Away from work
            </h2>
            <p className='mt-6 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300'>
              Away from work, I spend time with my wife and our three sons. We
              enjoy being outdoors and looking after our kitchen garden.
              Football is part of family life too, including coaching and taking
              part in the local community.
            </p>
            <div className='mt-8 flex flex-wrap gap-2'>
              {[
                'Family Time',
                'Football',
                'Gardening',
                'Outdoor Activities',
                'Coaching',
                'Community',
              ].map(interest => (
                <span
                  key={interest}
                  className='inline-flex items-center gap-2 border border-gray-300 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-gray-700 transition-colors duration-200 hover:border-brand-500 hover:text-brand-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-brand-400 dark:hover:text-brand-400 motion-reduce:transition-none'
                >
                  <span
                    className='h-1.5 w-1.5 bg-brand-500 dark:bg-brand-400'
                    aria-hidden='true'
                  />
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
