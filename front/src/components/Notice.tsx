import { useEffect, useState } from 'react';
import NoticeItem from './NoticeItem';

const notices = [
  {
    id: 1,
    title: '프로그램 안내',
    content: [
      '- 1부 8:10 ~ 11:10 (180분) - 주류 포틀럭',
      '- 2부 11:30 ~ 2:30(180분) - 주류 무제한',
    ],
  },
  {
    id: 2,
    title: '화장실',
    content: [
      '- 화장실은 1층에 위치해 있습니다.',
      '- 남자 화장실: *2726',
      '- 여자 화장실: *4500'
    ],
  },
  {
    id: 3,
    title: '흡연구역',
    content: [
      '- 흡연은 지정된 흡연구역에서만 가능합니다.',
      '- 1층 건물 밖 나가서 왼쪽편에 있습니다.',
      '- 건물 내 흡연 적발 시 강제 퇴실 조치가 있을 수 있어요🙏'
    ],
  },
    {
    id: 4,
    title: '복도 및 계단에서의 대화 조금만 stop❗',
    content: [
      '- 저희 공간이 아닌 복도 계단에서 큰소리 및 대화는 자제 부탁드립니다🙏',
      '- 2층부터 주거 공간이라 소음이 번져 민원이 들어올 수 있어요🥲',
    ],
  },
  {
    id: 5,
    title: '안전 및 규칙사항',
    content: [
      '- 파티룸 물품들은 소중히 다뤄주세요🙏',
      '- 고장 또는 파손 시 책임은 사고를 낸 본인께서 지셔야 합니다.',
      '- 소셜링 중 찍힌 사진들은 블러 처리 되어 후기 등에 사용될 수 있습니다.',
    ],
  },
];

function Notice() {
    const [alertOpen, setAlertOpen] = useState(false);
    // 여러 개의 토글을 동시에 열 수 있도록 배열로 관리 
    const [openMenus, setOpenMenus] = useState<number[]>([]);
    const handleToggle = (menu: number) => { 
        setOpenMenus((prev) => 
            { 
                // 이미 열려 있다면 닫기 
                if (prev.includes(menu))
                    return prev.filter((id) => id !== menu); 

                // 닫혀 있다면 추가해서 열기 
                return [...prev, menu]; 
            }); 
        };

    const isValid = false; // 호스트가 호스트페이지에서 제어
    useEffect(() => {
        if (isValid) {
        setOpenMenus([]);
        }
    }, [isValid]);


  return (
    <>
        <div>
        {notices.map((notice) => (
            <NoticeItem 
                key={notice.id} 
                title={notice.title} 
                isOpen={openMenus.includes(notice.id)} 
                onToggle={() => handleToggle(notice.id)}
            >
            {notice.content.map((text, index) => (
                <p key={index}>{text}</p>
            ))}
            </NoticeItem>
        ))}
        </div>
        <button className="enter-btn"  disabled={!isValid} onClick={() => setAlertOpen(true)}>
            {'1차'} 투표🤍
        </button>
    </>
  );
}

export default Notice;