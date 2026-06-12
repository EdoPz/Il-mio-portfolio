import logoMinimal from '../assets/logos/Logo Minimal.svg';

export default function ConceptBadge() {
  return (
    <div className="concept-badge" aria-hidden="true">
      <img src={logoMinimal} className="concept-badge__icon" alt="" />
      <span className="concept-badge__tag">Concept</span>
    </div>
  );
}
