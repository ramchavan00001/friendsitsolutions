import { notFound } from "next/navigation";
import { Briefcase, Clock, MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CareerForm } from "@/components/forms/career-form";
import { JsonLd } from "@/components/seo/json-ld";
import { jobs as localJobs } from "@/content/company";
import { site } from "@/content/site";
import { getJobs } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return localJobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const job = (await getJobs()).find((j) => j.slug === slug);
  if (!job) return {};
  return buildMetadata({ title: `${job.title} — Careers`, description: `${job.summary} ${job.location} · ${job.type} · ${job.experience}.`, path: `/careers/${job.slug}` });
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const jobs = await getJobs();
  const job = jobs.find((j) => j.slug === slug);
  if (!job) notFound();

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `<p>${job.summary}</p><ul>${job.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul>`,
    datePosted: job.postedAt,
    employmentType: job.type === "Full-time" ? "FULL_TIME" : "PART_TIME",
    hiringOrganization: { "@type": "Organization", name: site.name, sameAs: site.url },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.state, addressCountry: "IN" } },
    ...(job.location.startsWith("Remote") && { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "India" } }),
  };

  const list = (title: string, items: string[]) => (
    <>
      <h2>{title}</h2>
      <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </>
  );

  return (
    <>
      <JsonLd data={jobSchema} />
      <PageHero eyebrow={job.department} title={job.title} description={job.summary} crumbs={[{ name: "Careers", path: "/careers" }, { name: job.title, path: `/careers/${job.slug}` }]}>
        <ul className="flex flex-wrap gap-4 text-sm text-[#D3DDD5]">
          <li className="flex items-center gap-1"><MapPin className="h-4 w-4" aria-hidden="true" />{job.location} · {site.city}</li>
          <li className="flex items-center gap-1"><Briefcase className="h-4 w-4" aria-hidden="true" />{job.type}</li>
          <li className="flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden="true" />{job.experience}</li>
        </ul>
      </PageHero>
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2">
          <article className="prose prose-slate max-w-none dark:prose-invert">
            {list("What you'll do", job.responsibilities)}
            {list("What we're looking for", job.requirements)}
            {list("Nice to have", job.niceToHave)}
          </article>
          <div id="apply" className="rounded-sm border bg-card p-6 md:p-8">
            <h2 className="mb-6 text-2xl font-light">Apply for this role</h2>
            <CareerForm positions={[job.title]} defaultPosition={job.title} />
          </div>
        </div>
      </section>
    </>
  );
}
