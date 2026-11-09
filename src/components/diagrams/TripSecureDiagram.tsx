import { Caption, Flow, Node, Svg } from "./primitives";

/** TripSecure+: flight data + webhooks → ASP.NET Core → rules / documents / partial state. */
export function TripSecureDiagram() {
  return (
    <Svg title="TripSecure+: Cirium flight data and webhook events feed ASP.NET Core services that apply database-driven claim rules, store documents in S3 and persist partial submissions.">
      <Caption x={20} y={28}>INBOUND</Caption>
      <Node x={20} y={44} w={160} label="Cirium flight data" sub="DELAY · CANCELLATION" tone="signal" />
      <Node x={20} y={110} w={160} label="Webhook events" sub="EVENT-DRIVEN" tone="signal" />
      <Node x={20} y={176} w={160} label="Customer submission" sub="MULTI-STEP" tone="muted" />

      <Flow d="M180 66 C220 66, 220 130, 250 130" tone="signal" />
      <Flow d="M180 132 H250" tone="signal" delay={0.2} />
      <Flow d="M180 198 C220 198, 220 140, 250 140" delay={0.4} />

      <Node x={250} y={104} w={170} h={60} label="ASP.NET Core services" sub="CLAIM WORKFLOW" tone="accent" />

      <Flow d="M335 164 C335 220, 100 220, 100 270" tone="accent" delay={0.5} />
      <Flow d="M335 164 V270" tone="accent" delay={0.6} />
      <Flow d="M335 164 C335 220, 470 220, 470 270" tone="accent" delay={0.7} />

      <Node x={20} y={270} w={160} h={54} label="Claim rules" sub="DATABASE-DRIVEN" />
      <Node x={250} y={270} w={170} h={54} label="Documents" sub="AWS S3" />
      <Node x={420} y={270} w={120} h={54} label="Partial state" sub="RESUMABLE" />

      <Caption x={250} y={372} tone="accent">→ FLIGHT-DISRUPTION CLAIM PAYOUT</Caption>
      <Caption x={20} y={404}>SIMPLIFIED, PUBLIC-LEVEL VIEW</Caption>
    </Svg>
  );
}
