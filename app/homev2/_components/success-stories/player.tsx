"use client";

import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import { Icon } from "@/components/ui/icon";

export interface Story {
  file: string;
  destination: string;
  branch: string;
}

/* ===========================================================================
   STORY CARD — poster in the grid, real player in a dialog
   ---------------------------------------------------------------------------
   WHY NOT FIVE INLINE <video controls>. That was the first cut and it read as
   plain, because at a fifth of a 1200px column each film is 227px wide and
   most of what the eye lands on is the BROWSER's control bar — a grey strip we
   do not style, cannot style, and which looks nothing like the rest of the
   page. Five of them in a row is five pieces of someone else's UI.

   So the grid shows posters with our own play affordance, and the actual
   player opens in a dialog at a size worth watching. shadcn has no video
   component — it is a Radix primitives library and there is no media player
   anywhere in it — but this needs one dialog, not a player.

   THE POSTER IS THE VIDEO ITSELF, seeked to 0.5s by the media fragment. The
   alternative was generating five JPEGs with ffmpeg and keeping them in sync
   with the films by hand. `preload="metadata"` means the browser pulls the
   header and one frame, not the file, so the grid costs about as much as five
   images would. It is aria-hidden and untabbable: the BUTTON is the control,
   and a nested focusable video would put a dead stop in the tab order.
   ======================================================================== */

export function StoryCard({ story }: { story: Story }) {
  const label = `${story.destination}, a student from the ${story.branch} branch`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Play: ${label}`}
          className="group block w-full cursor-pointer text-left"
        >
          <span className="relative block aspect-[9/16] w-full overflow-hidden rounded-2 bg-marine">
            <video
              className="size-full object-cover transition-transform duration-500 ease-quart group-hover:scale-105"
              src={`/video/story/${story.file}.mp4#t=0.5`}
              preload="metadata"
              muted
              playsInline
              tabIndex={-1}
              aria-hidden="true"
            />

            {/* Scrim, so the caption is legible over whatever frame 0.5s
                happens to be — these films composite their own captions and
                graphics, and we do not get to choose the backdrop. */}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 block h-2/5 bg-linear-to-t from-endpaper/90 to-transparent" />

            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-plate-white/90 text-marine transition-transform duration-200 ease-quad group-hover:scale-110">
                <Icon as={Play} size="md" className="ml-0.5 fill-current" />
              </span>
            </span>

            <span className="pointer-events-none absolute inset-x-0 bottom-0 block p-3">
              <span className="block text-body font-medium text-plate-white">
                {story.destination}
              </span>
              <span className="block text-caption text-plate-white/75">
                {story.branch}
              </span>
            </span>
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="w-[min(90vw,24rem)]">
        <DialogTitle className="sr-only">{label}</DialogTitle>
        {/* autoPlay is correct HERE and only here: the visitor opened this by
            tapping a play button, so playing is the thing they just asked for.
            Nothing autoplays in the grid. */}
        <video
          className="aspect-[9/16] w-full rounded-2 bg-endpaper"
          src={`/video/story/${story.file}.mp4`}
          controls
          autoPlay
          playsInline
          aria-label={label}
        />
      </DialogContent>
    </Dialog>
  );
}
