import { services as allServices, type Service, type WhoId } from "../data/services";

export function matchingServices(
  picked: Iterable<WhoId>,
  list: Service[] = allServices
): Service[] {
  const set = new Set(picked);
  return list.filter((s) => s.who.some((w) => set.has(w)));
}

export function serviceIndexFromHash(hash: string, list: Service[] = allServices): number {
  const id = hash.replace(/^#/, "");
  return id ? list.findIndex((s) => s.id === id) : -1;
}

export function summaryText(matches: Service[]): string {
  const names = matches.map((s) => s.inline);
  const joined =
    names.length > 1 ? `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}` : names[0];
  const noun = matches.length === 1 ? "servicio" : "servicios";
  return `Te encajan ${matches.length} ${noun}: ${joined}.`;
}
