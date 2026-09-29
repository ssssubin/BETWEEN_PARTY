import "./VoteMatchSection.css";
import type { Participant } from "../types/participant";

interface MatchResult {
  male: Participant;
  female: Participant;
}

interface VoteMatchSectionProps {
  matches: MatchResult[];
  title: string;
}

export function VoteMatchSection({ matches, title }: VoteMatchSectionProps) {
  return (
    <section className="first-vote-match-section">
      <h2 className="match-section-title">
        {title} 매칭 결과 ({matches.length}쌍)
      </h2>

      <div className="match-list">
        {matches.map((match, index) => (
          <div className="match-card" key={index}>
            <span className="male-match">
              {match.male.region} {match.male.nickname}
            </span>

            <span className="match-arrow">↔</span>

            <span className="female-match">
              {match.female.region} {match.female.nickname}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
