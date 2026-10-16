export const ALLERGEN_LABELS: Record<string, string> = {
  A: 'Glutenhaltiges Getreide',
  B: 'Krebstiere und -erzeugnisse',
  C: 'Eier und daraus gewonnene Erzeugnisse',
  D: 'Fisch- und Fischerzeugnisse',
  E: 'Erdnüsse und -erzeugnisse',
  F: 'Soja(-bohnen) und -erzeugnisse',
  G: 'Milch und Milcherzeugnisse (inkl. Laktose)',
  H: 'Schalenfrüchte und daraus gewonnene Erzeugnisse',
  L: 'Sellerie und -erzeugnisse',
  M: 'Senf und Senferzeugnisse',
  N: 'Sesamsamen und -erzeugnisse',
  O: 'Schwefeldioxid und -erzeugnisse',
  P: 'Lupinen und daraus hergestellte Produkte',
  R: 'Weichtiere (Schnecken, Muscheln, Tintenfische)',
};

export const ALLERGEN_LEGEND = Object.entries(ALLERGEN_LABELS);

export default function AllergenBadges({ codes, size = 'md' }: { codes?: string[]; size?: 'sm' | 'md' }) {
  if (!codes || codes.length === 0) return null;
  return (
    <span className={`allergen-badges allergen-badges-${size}`}>
      {codes.map((code) => (
        <span className="allergen-badge" key={code} title={ALLERGEN_LABELS[code] ?? code}>
          {code}
        </span>
      ))}
    </span>
  );
}
