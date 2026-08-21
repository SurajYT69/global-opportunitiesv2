import { Container } from "@/components/ui/container";
import { StoryCard, type Story } from "./success-stories/player";

/* ===========================================================================
   SUCCESS STORIES — the student films
   ---------------------------------------------------------------------------
   Sourced 2026-08-21 from GO's own landing pages:
     ads.global-opportunities.net/kdm/branch/hyderabad
     ads.global-opportunities.net/nz/branch/bangalore
   Each page carries four; three are shared, so there are five unique files.
   Copied into public/video/story/ rather than hot-linked — that host is an
   ads subdomain with its own release cycle, and a testimonial rail that
   silently empties when marketing reorganises a directory is worse than no
   rail. 13.5MB total, and none of it is fetched until someone taps.

   THE SOURCE PAGES SHIP THEM BARE — no name, no country, no branch, four
   anonymous faces in a row. The filenames encode destination and branch
   (`australia-ahmedabad`), and the same student appears on landing pages for
   OTHER branches, so the city in the filename is the student's branch and not
   the page's. That is what the captions say, and it is all they say.

   This file is a Server Component and stays one: the data and the heading
   live here, and only the card — which needs a dialog — is client. See
   success-stories/player.tsx for why the grid is posters and not five inline
   players.

   KNOWN GAP: no <track> captions. GO supplied none, and inventing a
   transcript for a student's spoken testimonial is not something to guess at.
   Each film carries an aria-label naming its destination and branch so the
   control is at least identifiable; real captions need the source files.
   ======================================================================== */

const STORIES: Story[] = [
  { file: "australia-ahmedabad", destination: "Australia", branch: "Ahmedabad" },
  { file: "australia-amritsar", destination: "Australia", branch: "Amritsar" },
  { file: "ireland-mumbai", destination: "Ireland", branch: "Mumbai" },
  { file: "uk-jalandhar2", destination: "United Kingdom", branch: "Jalandhar" },
  { file: "uk-mumbai", destination: "United Kingdom", branch: "Mumbai" },
];

export default function SuccessStories() {
  return (
    <section id="stories" className="scroll-mt-20 py-section-y">
      <Container className="flex flex-col gap-8">
        <header className="flex max-w-prose flex-col gap-3">
          <p className="text-caption text-muted-foreground">Success stories</p>
          <h2 className="text-d2 text-ink">In their own words.</h2>
          <p className="text-body text-muted-foreground">
            Five students on where they went and what it took to get there.
          </p>
        </header>

        {/* Five across at lg, so nothing wraps onto a ragged second row. Two
            across on a phone keeps each film wide enough to read a face. */}
        <ul className="grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-3 lg:grid-cols-5">
          {STORIES.map((story) => (
            <li key={story.file}>
              <StoryCard story={story} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
