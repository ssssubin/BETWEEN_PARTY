import VotePage from "./VotePage";

export default function FinalVotePage() {
  return (
    <VotePage
      title="최종 투표💘"
      subtitle={
        <>
          ⭐최종 투표는 <strong>한 명만</strong> 선택할 수 있어요⭐<br />
        </>
      }
      maxSelection={1}
    />
  );
}
