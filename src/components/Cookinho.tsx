type Pose = "idle" | "aceno" | "pulo" | "confere";

export function Cookinho({ pose }: { pose: Pose }) {
  return <span key={pose} aria-hidden="true" className={`cookinho cookinho-${pose}`} />;
}
