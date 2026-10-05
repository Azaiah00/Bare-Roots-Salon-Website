import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JOURNAL, postBySlug } from "@/lib/content";
import { artistById } from "@/lib/site";
import { plainDate } from "@/lib/dates";
import { jsonLd, breadcrumbSchema, articleSchema } from "@/lib/schema";
import { Section } from "@/components/ui/Section";
import PageHero, { BackLink } from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function generateStaticParams() {
  return JOURNAL.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = postBySlug(params.slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.dek,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.dek,
      type: "article",
      publishedTime: post.date,
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
  };
}

export default function JournalPostPage({ params }: { params: { slug: string } }) {
  const post = postBySlug(params.slug);
  if (!post) notFound();

  const author = artistById(post.author)!;
  const others = JOURNAL.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Journal", path: "/journal" },
              { name: post.title, path: `/journal/${post.slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            articleSchema({
              title: post.title,
              dek: post.dek,
              date: post.date,
              slug: post.slug,
              authorName: author.name,
              image: post.image,
            }),
          ),
        }}
      />

      <PageHero
        ground="ink"
        eyebrow={`${author.name} · ${plainDate(post.date)} · ${post.readMins} min read`}
        title={post.title}
        lead={post.dek}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
          { name: post.title, path: `/journal/${post.slug}` },
        ]}
      />

      <Section ground="paper">
        <div className="mx-auto max-w-prose2">
          {post.image && (
            <Reveal className="relative mb-14 aspect-[3/2] overflow-hidden rounded-panel">
              <Image
                src={post.image}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 68ch, 92vw"
                className="object-cover"
              />
            </Reveal>
          )}

          <article className="prose-br">
            {post.body.map((para, i) => (
              <Reveal key={i} delay={(i % 3) * 60}>
                <p
                  className={
                    i === 0
                      ? "text-lead text-ink"
                      : "text-base2 text-ink-soft"
                  }
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </article>

          {/* Author */}
          <Reveal className="mt-14 card-light flex flex-wrap items-center gap-6 p-7" delay={80}>
            <div className="relative size-20 shrink-0 overflow-hidden rounded-pill">
              <Image
                src={author.photo}
                alt={`${author.name}, ${author.role}.`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="eyebrow text-bronze-ink">{author.role}</p>
              <p className="mt-2 font-display text-d4 text-ink">{author.name}</p>
              <p className="mt-2 text-sm2 text-ink-soft">{author.bio}</p>
            </div>
            <div className="flex gap-2">
              <a
                href={author.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-12 items-center justify-center rounded-xs2 border border-ink/15 text-ink transition-colors hover:border-bronze-ink hover:text-bronze-ink"
                aria-label={`${author.name} on Instagram`}
              >
                <Icon name="instagram" />
              </a>
              <Link href="/book" className="btn btn-dark btn-sm">
                Book with {author.name.split(" ")[0]}
              </Link>
            </div>
          </Reveal>

          <div className="mt-10">
            <BackLink href="/journal">All journal entries</BackLink>
          </div>
        </div>
      </Section>

      <Section ground="cream" label="More from the journal">
        <h2 className="eyebrow text-bronze-ink">Keep reading</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {others.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 80}>
              <Link href={`/journal/${p.slug}`} className="card-light card-hover group block h-full p-7">
                <p className="eyebrow text-bronze-ink">
                  {artistById(p.author)?.name} · {p.readMins} min
                </p>
                <h3 className="mt-4 font-display text-d4 text-ink">{p.title}</h3>
                <p className="mt-3 text-sm2 text-ink-soft">{p.dek}</p>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12">
          <ButtonLink href="/book" variant="dark" icon="arrow-right">
            Book an appointment
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
