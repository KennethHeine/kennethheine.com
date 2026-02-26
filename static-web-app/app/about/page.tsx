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
    'Kenneth Heine is a technical advisor helping project leaders deliver Azure cloud and platform projects predictably. Learn about the Predictable Delivery™ program.',
  openGraph: {
    title: 'About Kenneth Heine - Technical Advisor for Project Leaders',
    description:
      'Kenneth Heine is a technical advisor helping project leaders deliver Azure cloud and platform projects predictably. Learn about the Predictable Delivery™ program.',
    type: 'website',
    url: 'https://kennethheine.com/about',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Kenneth Heine - Technical Advisor for Project Leaders',
      },
    ],
  },
  twitter: null,
  alternates: {
    canonical: 'https://kennethheine.com/about',
  },
};

/**
 * About page component
 * Features:
 * - Personal bio and background
 * - Skills grid with technology badges
 * - Professional timeline/milestones
 * - Personal interests
 */
export default function AboutPage() {
  const personData = generatePersonStructuredData('https://kennethheine.com');

  // Skills organized by category
  const skills = {
    technical_advisory: [
      'Risk Assessment',
      'Vendor Management',
      'Technical Due Diligence',
      'Go-Live Readiness',
      'Decision Governance',
      'Architecture Review',
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
    platform_operations: [
      'Terraform',
      'Bicep',
      'ARM Templates',
      'PowerShell',
      'Python',
      'Bash',
      'Security & Compliance',
    ],
  }; // Professional timeline
  const timeline = [
    {
      year: '2022-Present',
      title: 'Technical Advisor – Azure & Platform Delivery',
      company: 'KS Cloud Solutions',
      description:
        'Helping project leaders make technical decisions so the plan holds. Specializing in Azure cloud architecture, vendor management, risk assessment, and go-live readiness for platform delivery projects.',
    },
    {
      year: '2022-2022',
      title: 'Senior Azure Consultant',
      company: 'CTGlobal',
      description:
        'Provided expert consulting on Azure cloud solutions, focusing on architecture design, automation, and DevOps practices. Worked with clients to implement scalable and secure cloud infrastructures.',
    },
    {
      year: '2021-2022',
      title: 'Cloud Architect @ Shared Platforms & DevOps',
      company: 'BEC Financial Technologies',
      description:
        'Designed and implemented Azure cloud secret solution with Azure Key Vault',
    },
    {
      year: '2020-2021',
      title: 'Cloud Architect - Azure',
      company: 'Koncern IT - Copenhagen Municipality',
      description:
        'Developed and managed Azure cloud solutions for the Copenhagen Municipality. Focused on optimizing cloud resources, implementing security best practices, and automating deployment processes.',
    },
    {
      year: '2017-2020',
      title: 'Network Engineer - Technical Responsible',
      company: 'Koncern IT - Copenhagen Municipality',
      description:
        'Managed and optimized network infrastructure for the Copenhagen Municipality. Led a team of technicians in maintaining high availability and performance for over 25,000 users.',
    },
    {
      year: '2013-2017',
      title: 'Data Technician Apprentice specializing in Infrastructure',
      company: 'Koncern IT - Copenhagen Municipality',
      description:
        'Accumulated significant knowledge in enterprise IT while providing support for 25,000 users',
    },
    {
      year: '2012-2013',
      title: 'IT Support Specialist',
      company: 'A.B Consult Aps',
      description:
        'Provided technical support and system administration services.',
    },
  ];

  return (
    <main>
      <JsonLd data={personData} />
      {/* Hero Section with modern layout */}
      <section className='relative overflow-hidden py-20 sm:py-32'>
        {/* Subtle background gradient */}
        <div className='absolute inset-0 -z-10 bg-gradient-to-br from-brand-50/50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800' />

        <Container>
          <div className='mx-auto max-w-4xl'>
            <div className='grid gap-12 lg:grid-cols-2 lg:gap-16'>
              {/* Text Content */}
              <div className='animate-slide-in-left'>
                <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
                  About Me
                </h1>{' '}
                <p className='mt-6 text-lg leading-7 text-gray-600 dark:text-gray-300'>
                  I&apos;m Kenneth, a technical advisor who helps project
                  leaders make technical decisions so the plan holds. I work
                  with project and program managers delivering Azure cloud and
                  platform projects — often with multiple teams and vendors.
                </p>
                <p className='mt-4 text-base leading-7 text-gray-600 dark:text-gray-300'>
                  With extensive experience in Azure cloud architecture, DevOps
                  practices, and hands-on platform engineering, I make risks and
                  dependencies visible and manageable — so you deliver more
                  predictably and avoid expensive late-stage surprises.
                </p>
              </div>
              {/* Profile Photo with modern frame */}{' '}
              <div className='relative animate-slide-in-right'>
                <div className='relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-brand-100 to-blue-100 p-2 shadow-2xl ring-1 ring-brand-200/50 dark:from-brand-900/30 dark:to-blue-900/30 dark:ring-brand-700/50'>
                  <div className='h-full w-full overflow-hidden rounded-2xl'>
                    <Image
                      src='/images/about-photo.jpg'
                      alt='Kenneth Heine - About Photo'
                      width={400}
                      height={400}
                      className='h-full w-full object-cover transition-transform duration-500 hover:scale-105'
                      sizes='(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw'
                      priority
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className='absolute -top-4 -right-4 h-24 w-24 rounded-full bg-brand-500/10 blur-2xl dark:bg-brand-400/10' />
                  <div className='absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl dark:bg-blue-400/10' />
                </div>
              </div>
            </div>
          </div>{' '}
        </Container>
      </section>

      {/* Mission Statement with modern card */}
      <section className='py-20 bg-white dark:bg-gray-900'>
        <Container>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl'>
              My Mission
            </h2>{' '}
            <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300'>
              Project and program leaders running Azure cloud and platform
              initiatives with multiple teams and vendors often face the same
              problem: they must commit to a plan and a deadline, but they
              can&apos;t fully see the technical dependencies and risks — and
              vendors can sound convincing even when the delivery won&apos;t
              hold up in reality. The result is quiet scope creep and hard
              problems surfacing late, right when you&apos;re close to go-live.
            </p>{' '}
            <div className='mt-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-blue-50 to-purple-50 p-8 shadow-xl ring-1 ring-brand-200/50 dark:from-brand-900/20 dark:via-blue-900/20 dark:to-purple-900/20 dark:ring-brand-700/50'>
              {/* Decorative gradient overlay */}
              <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(3,105,161,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.05),transparent_70%)]' />

              <blockquote className='relative text-base italic leading-relaxed text-gray-700 dark:text-gray-300'>
                &ldquo;I help project leaders make technical decisions so the
                plan holds. Over 12 weeks, I make risks and dependencies visible
                and manageable — and give them a technical compass to steer
                vendors and teams week by week.&rdquo;
              </blockquote>
            </div>
          </div>
        </Container>
      </section>

      {/* Skills Section */}
      <section className='py-20 bg-gray-50 dark:bg-gray-900/50'>
        <Container>
          <div className='mx-auto max-w-4xl'>
            {' '}
            <h2 className='text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl'>
              Technical Advisory & Azure Expertise
            </h2>
            <p className='mt-4 text-center text-base text-gray-600 dark:text-gray-400'>
              The knowledge and experience I bring to help project leaders
              navigate technical decisions
            </p>
            <div className='mt-12 space-y-8'>
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category}>
                  <h3 className='mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400'>
                    {category.replace(/_/g, ' ').charAt(0).toUpperCase() +
                      category.replace(/_/g, ' ').slice(1)}
                  </h3>
                  <div className='flex flex-wrap gap-2'>
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

      {/* Timeline Section with enhanced design */}
      <section className='py-20'>
        <Container>
          <div className='mx-auto max-w-4xl'>
            {' '}
            <h2 className='text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl'>
              Professional Journey
            </h2>{' '}
            <p className='mt-4 text-center text-base text-gray-600 dark:text-gray-400'>
              From infrastructure management to technical advisory for Azure
              cloud and platform projects
            </p>
            <div className='mt-12'>
              <div className='relative'>
                {/* Timeline line with gradient */}
                <div className='absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-brand-500 via-brand-400 to-brand-300 dark:from-brand-400 dark:via-brand-500 dark:to-brand-600 sm:left-1/2 sm:-translate-x-px opacity-30'></div>

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

      {/* Personal Interests with modern tags */}
      <section className='py-20 bg-gray-50 dark:bg-gray-900/50'>
        <Container>
          <div className='mx-auto max-w-3xl text-center'>
            {' '}
            <h2 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl'>
              Beyond the Code
            </h2>{' '}
            <p className='mt-6 text-base leading-7 text-gray-600 dark:text-gray-300'>
              In my free time, I enjoy spending quality time with my wife and
              our three wonderful sons. Together, we engage in outdoor
              activities, maintain our kitchen garden, and participate actively
              in football. I believe that these diverse experiences with family
              and nature make me a better version of myself.
            </p>
            <div className='mt-8 flex flex-wrap justify-center gap-3'>
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
                  className='inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md ring-1 ring-gray-200/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:ring-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:ring-gray-700/50 dark:hover:ring-gray-600 backdrop-blur-sm'
                >
                  <span className='h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-brand-400' />
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
