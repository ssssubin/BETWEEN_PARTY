import VotePage from "./VotePage";

export default function FirstVotePage() {
  return (
    <VotePage
      title="첫인상 투표💌"
      subtitle={
        <>
          최대 3명 선택 후 "제출하기" 버튼 클릭👆
          <br />
          📢꼭! <strong>모든 사람을 선택한 후</strong> 제출하기 버튼을 <br/> 클릭해주세요!
        </>
      }
      maxSelection={3}
    />
  );
}