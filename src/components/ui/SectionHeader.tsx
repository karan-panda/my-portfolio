import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { MaskLines } from "./MaskText";
import { SectionLabel } from "./SectionLabel";

type Props = {
  index: string;
  label: string;
  /** Title lines — authored line breaks */
  lines: ReactNode[];
  id: string;
  aside?: ReactNode;
};

/** Consistent section opener: schematic label, masked display title, optional aside. */
export function SectionHeader({ index, label, lines, id, aside }: Props) {
  return (
    <Reveal className="grid grid-cols-12 items-end gap-x-6 gap-y-6 border-t border-line pt-6">
      <div className="col-span-12 md:col-span-8">
        <div data-reveal>
          <SectionLabel index={index}>{label}</SectionLabel>
        </div>
        <h2 id={id} className="text-display mt-8">
          <MaskLines lines={lines} />
        </h2>
      </div>
      {aside && (
        <div data-reveal className="col-span-12 text-text-dim md:col-span-4 md:pb-2">
          {aside}
        </div>
      )}
    </Reveal>
  );
}
