import { Section, SectionHead, Accent } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import WorkGrid from "@/components/work/WorkGrid";

export default function WorkPreview() {
  return (
    <Section ground="paper" labelledBy="work-title">
      <SectionHead
        number="04"
        eyebrow="Selected work"
        id="work-title"
        title={
          <>
            Real texture, real <Accent>regrowth.</Accent>
          </>
        }
        lead="Installs, maintenance, colour and recovery. Every tile opens, and every tile books the service that made it."
        action={
          <ButtonLink href="/work" variant="outline" icon="arrow-right">
            All work
          </ButtonLink>
        }
      />
      <div className="mt-14">
        <WorkGrid limit={6} />
      </div>
    </Section>
  );
}
