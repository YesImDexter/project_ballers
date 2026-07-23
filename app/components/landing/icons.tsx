import { Briefcase, Check, GraduationCap, Zap } from "lucide-react";

export function IconCandidate() {
  return <GraduationCap className="size-5" strokeWidth={2} />;
}

export function IconEmployer() {
  return <Briefcase className="size-5" strokeWidth={2} />;
}

export function IconLightning() {
  return <Zap className="size-5" strokeWidth={2} />;
}

export function IconCheck() {
  return <Check className="size-5" strokeWidth={3} />;
}

export function iconByName(name: "candidate" | "employer" | "lightning" | "check") {
  switch (name) {
    case "candidate":
      return <IconCandidate />;
    case "employer":
      return <IconEmployer />;
    case "lightning":
      return <IconLightning />;
    case "check":
      return <IconCheck />;
  }
}
