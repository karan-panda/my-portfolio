import type { DiagramKind } from "@/types/content";
import { DrDiagram } from "./DrDiagram";
import { KypDiagram } from "./KypDiagram";
import { RenewalDiagram } from "./RenewalDiagram";
import { RydDiagram } from "./RydDiagram";
import { TravelDiagram } from "./TravelDiagram";
import { TripSecureDiagram } from "./TripSecureDiagram";
import { DiagramFrame } from "./DiagramFrame";

const map: Record<DiagramKind, () => React.JSX.Element> = {
  kyp: KypDiagram,
  ryd: RydDiagram,
  renewal: RenewalDiagram,
  travel: TravelDiagram,
  tripsecure: TripSecureDiagram,
  dr: DrDiagram,
};

/** Schematic frame with corner registration marks around a project diagram. */
export function ProjectDiagram({ kind, caption }: { kind: DiagramKind; caption?: string }) {
  const D = map[kind];
  return (
    <DiagramFrame>
      <span aria-hidden="true" className="corner tl" />
      <span aria-hidden="true" className="corner tr" />
      <span aria-hidden="true" className="corner bl" />
      <span aria-hidden="true" className="corner br" />
      <D />
      {caption && <figcaption className="text-label mt-4 text-muted">{caption}</figcaption>}
    </DiagramFrame>
  );
}
