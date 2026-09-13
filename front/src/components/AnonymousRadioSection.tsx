import { useState } from "react";
import type { Participant } from "../types/participant";
import "./AnonymousRadioSection.css";

interface RadioMessage {
  to: Participant;
  from: Participant;
  message: string;
}

interface AnonymousRadioSectionProps {
  messages: RadioMessage[];
}

export function AnonymousRadioSection({
  messages,
}: AnonymousRadioSectionProps) {
  const [selectedToId, setSelectedToId] = useState<number | null>(null);
  const [selectedFromId, setSelectedFromId] = useState<number | null>(null);

  // 받은 사람별 메시지 개수
  const receivedCounts = messages.reduce<Record<number, number>>(
    (acc, item) => {
      acc[item.to.id] = (acc[item.to.id] || 0) + 1;
      return acc;
    },
    {},
  );

  // 보낸 사람별 메시지 개수
  const sentCounts = messages.reduce<Record<number, number>>((acc, item) => {
    acc[item.from.id] = (acc[item.from.id] || 0) + 1;
    return acc;
  }, {});

  // 받은 사람 목록
  const receivedParticipants = Array.from(
    new Map(messages.map((item) => [item.to.id, item.to])).values(),
  );

  // 보낸 사람 목록
  const sentParticipants = Array.from(
    new Map(messages.map((item) => [item.from.id, item.from])).values(),
  );

  // 메시지 필터링
  const filteredMessages = messages.filter((item) => {
    const matchesTo = selectedToId === null || item.to.id === selectedToId;

    const matchesFrom =
      selectedFromId === null || item.from.id === selectedFromId;

    return matchesTo && matchesFrom;
  });

  return (
    <section className="anonymous-radio-section">
      {/* Select Box */}
      <div className="radio-filter">
        {/* 받는 사람 */}
        <select
          className="radio-participant-select"
          value={selectedToId ?? ""}
          onChange={(e) =>
            setSelectedToId(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">받는 사람</option>

          {receivedParticipants.map((participant) => (
            <option key={participant.id} value={participant.id}>
              {participant.nickname} ({receivedCounts[participant.id] || 0}개)
            </option>
          ))}
        </select>

        {/* 보낸 사람 */}
        <select
          className="radio-participant-select"
          value={selectedFromId ?? ""}
          onChange={(e) =>
            setSelectedFromId(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">보낸 사람</option>

          {sentParticipants.map((participant) => (
            <option key={participant.id} value={participant.id}>
              {participant.nickname} ({sentCounts[participant.id] || 0}개)
            </option>
          ))}
        </select>
      </div>

      {/* 메시지 */}
      <div className="radio-message-list">
        {filteredMessages.map((item, index) => (
          <article className="radio-message-card" key={index}>
            <div className="radio-message-to">TO. {item.to.nickname}</div>

            <div className="radio-message-from">FROM. {item.from.nickname}</div>

            <p className="radio-message-content">{item.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
