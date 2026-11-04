import { createFileRoute } from '@tanstack/react-router'
import { allEducations, allJobs } from 'content-collections'
import { marked } from 'marked'
import { useReveal } from '@/components/site/Chrome'

export const Route = createFileRoute('/resume')({
  head: () => ({ meta: [{ title: 'Resume | BLURRED' }] }),
  component: Resume,
})

function Resume() {
  useReveal()

  return (
    <div className="page">
      <div className="container narrow">
        <header className="page-head" data-reveal>
          <div className="eyebrow">Resume</div>
          <h1 className="h1">
            Experience <span className="gold">&amp;</span> education.
          </h1>
        </header>

        <section className="timeline-section">
          <h2 className="h3">Work</h2>
          <ol className="timeline">
            {allJobs.map((job) => (
              <li key={job._meta.path} className="timeline-item" data-reveal>
                <div className="timeline-date">
                  {job.startDate} — {job.endDate || 'Present'}
                </div>
                <h3 className="timeline-title">{job.jobTitle}</h3>
                <div className="timeline-meta">
                  {job.company} · {job.location}
                </div>
                <p className="timeline-text">{job.summary}</p>
                {job.content && (
                  <div className="prose-dark" dangerouslySetInnerHTML={{ __html: marked.parse(job.content) as string }} />
                )}
                <div className="tags">
                  {job.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="timeline-section">
          <h2 className="h3">Education</h2>
          <ol className="timeline">
            {allEducations.map((ed) => (
              <li key={ed._meta.path} className="timeline-item" data-reveal>
                <div className="timeline-date">
                  {ed.startDate} — {ed.endDate || 'Present'}
                </div>
                <h3 className="timeline-title">{ed.school}</h3>
                <p className="timeline-text">{ed.summary}</p>
                {ed.content && (
                  <div className="prose-dark" dangerouslySetInnerHTML={{ __html: marked.parse(ed.content) as string }} />
                )}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}
