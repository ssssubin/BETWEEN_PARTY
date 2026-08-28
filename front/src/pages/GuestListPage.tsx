import { useState } from "react";
import "./GuestListPage.css";
import background from "../assets/background.png";
import CustomAlert from "../components/CustomAlert";
import guestData from '../mock/guestList.json'; // 경로 설정

export default function NoticePage() {
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <>
      <div
        className="mobile-frame"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,120,0,.45), rgba(0,0,0,.45)),
          url(${background})
        `,
        }}
      >
        <div className="container">
          <div className="inner">
            <h1 className="title">BETWEEN PARTY</h1>
            <h3 className="subtitle">
              ❝저희 파티는 적당한 온도 속에서 서로를 알아가보는
              <br />
              잔잔한 설렘을 추구합니다😊❞
            </h3>
            <div className="table-card-box">
                {guestData.guestData.map((table) => (
                    <div key={table.tableNum} className="table-card">
                        <h2 className="table-title">TABLE {table.tableNum}</h2>
                        <div className="members-grid">
                            {table.members.map((member) => (
                                <span
                                    key={member.id}
                                    className={`member-badge ${member.gender}`}
                                >
                                    {member.nickname}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button className="enter-btn" onClick={() => setAlertOpen(true)}>
              {'1차'} 투표🤍
            </button>
          </div>
        </div>
      </div>

      <CustomAlert open={alertOpen} title="BETWEEN PARTY" message="입장이 완료되었습니다." onClose={() => setAlertOpen(false)} />
    </>
  );
}
