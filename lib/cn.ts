/**
 * Class joiner. Deliberately six lines rather than a dependency.
 *
 * It does NOT merge conflicting Tailwind classes the way tailwind-merge does —
 * which is fine, because the rule in this codebase is that a component owns its
 * own layout classes and callers pass additive ones. If you find yourself
 * needing to override `p-7` with `p-4` from outside, the component wants a prop,
 * not a smarter class joiner.
 */
export type ClassValue = string | number | null | false | undefined;

export function cn(...parts: ClassValue[]): string {
  return parts.filter(Boolean).join(" ");
}
