import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Ending from './Ending';
import room from '../Images/room.jpeg'
import judge from '../Images/Telework/judge.png'
import objection from '../Images/Telework/objection.jpg'
import backgroundLeft from '../Images/Background/background1.jpg'
import deskLeft from '../Images/Background/desk1.png'
import backgroundRight from '../Images/Background/background2.jpg'
import deskRight from '../Images/Background/desk2.png'
import Tele_StandTalk from '../GIFS/MR. Telework/Stand_Talk.gif'
import Tele_ReadTalk from '../GIFS/MR. Telework/Read_Talk.gif'
import Tele_SlamTalk from '../GIFS/MR. Telework/Slam_Talk.gif'
import Tele_Slam from '../GIFS/MR. Telework/Slam.gif'
import Tele_SmirkTalk from '../GIFS/MR. Telework/Smirk_Talk.gif'
import Tele_ThinkStand from '../GIFS/MR. Telework/Think_Stand.gif'
import Tele_ThinkTalk from '../GIFS/MR. Telework/Think_Talk.gif'
import Tele_PointStart from '../GIFS/MR. Telework/Point_Start.gif'
import Tele_PointTalk from '../GIFS/MR. Telework/Point_Talk.gif'

import NoTele_ArmsCrossed from '../GIFS/Mr.No-Telework/Arms_Crossed.gif'
import NoTele_ArmsCrossedTalk from '../GIFS/Mr.No-Telework/Arms_Crossed_Talk.gif'
import NoTele_Cornered from '../GIFS/Mr.No-Telework/Cornered.gif'
import NoTele_DeskSlam from '../GIFS/Mr.No-Telework/Desk_Slam.gif'
import NoTele_DeskTalk from '../GIFS/Mr.No-Telework/Desk_Talk.gif'
import NoTele_PointTalk from '../GIFS/Mr.No-Telework/Point_Talk.gif'
import NoTele_StandTalk from '../GIFS/Mr.No-Telework/Stand_Talk (1).gif'


const Dialog = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(26, 32, 39, 0.5)',
  }),
  width: '100%',
  position: 'absolute',
  bottom: 0,
}));
/*
1 = telework
2 = no telework
3 = objection
4 = judge
5 = room

*/
const englishTexts = [
  { turn: 5,pose: "temp", background: 1, text: "June 30, 2025" },
  { turn: 5,pose: "temp", background: 1, text: "A court case is about to begin." },
  { turn: 5,pose: "temp", background: 1, text: "The judge, soon to enter, will sit at the center stage."},
  { turn: 5,pose: "temp", background: 1, text: "On one side, the defense attorney, Telework Wrights, stands ready to argue in favor of teleworking." },
  { turn: 5,pose: "temp", background: 1, text: "On the other side, the prosecutor, No-Telework, is prepared to present the case against it." },
  { turn: 4,pose: "temp", background: 1, text: "Order in the court! " },
  { turn: 4,pose: "temp", background: 1, text: "We are here today to debate the merits and drawbacks of teleworking. Mr. Wright, you may begin your opening statement." },
  { turn: 1,pose: Tele_ThinkStand, background: 1, text: "" },
  { turn: 1,pose: Tele_StandTalk, background: 1, text: "LET US TELEWORK!" },
  { turn: 1,pose: Tele_PointTalk, background: 1, text: "Telework is a basic human right!"},
  { turn: 3,pose: "temp", background: 1, text: "" },
  { turn: 2,pose: NoTele_StandTalk, background: 1, text: "JUST WORK IN THE OFFICE!" },
  { turn: 3,pose: "temp", background: 1, text: "" },
  { turn: 1,pose: Tele_Slam, background: 1, text: "" },
  { turn: 1,pose: Tele_SlamTalk, background: 1, text: "WE DON'T LIKE THE OFFICE!" },
  { turn: 1,pose: Tele_StandTalk, background: 1, text: "Teleworking offers numerous benefits, including increased flexibility, reduced commuting time, and a better work-life balance." },
  { turn: 1,pose: Tele_StandTalk, background: 1, text: "It empowers employees to be more productive and satisfied with their jobs." },
  { turn: 3,pose: "temp", background: 1, text: "" },
  { turn: 2,pose: NoTele_StandTalk, background: 1, text: "A compelling argument, Mr. Wright, but let's not overlook the potential downsides." },
  { turn: 2,pose: NoTele_StandTalk, background: 1, text: "Teleworking can lead to isolation and difficulties in communication. " },
  { turn: 2,pose: NoTele_StandTalk, background: 1, text: "Not to mention, the blurred lines between work and personal life can lead to burnout." },
  { turn: 4,pose: "temp", background: 1, text: "Could you elaborate further, Mr. No-Telework?" },
  { turn: 2,pose: NoTele_ArmsCrossedTalk, background: 1, text: "Working remotely often means missing out on the casual, spontaneous interactions that occur in a physical office setting." },
  { turn: 2,pose: NoTele_ArmsCrossedTalk, background: 1, text: "These interactions can be crucial for building relationships and fostering a sense of belonging among employees." },
  { turn: 3,pose: "temp", background: 1, text: "" },
  { turn: 1,pose: Tele_Slam, background: 1, text: "HOLD IT!" },
  { turn: 1,pose: Tele_SlamTalk, background: 1, text: "However, these spontaneous interactions can also be a cause of distraction." },
  { turn: 1,pose: Tele_SlamTalk, background: 1, text: "A distracted employee will not be able to focus on their work during and sometimes even after the chat has finished." },
  { turn: 1,pose: Tele_StandTalk, background: 1, text: "This leads to a delayed schedule and thus requiring employees to work overtime. " },
  { turn: 1,pose: Tele_ReadTalk, background: 1, text: "On the otherhand, studies have shown that teleworking can actually enhance productivity." },
  { turn: 1,pose: Tele_PointStart, background: 1, text: "" },
  { turn: 1,pose: Tele_PointTalk, background: 1, text: "Employees have reported fewer distractions and more time to focus on their tasks." },
  { turn: 2,pose: NoTele_DeskSlam, background: 1, text: "But what about the impact on communication? " },
  { turn: 2,pose: NoTele_DeskTalk, background: 1, text: "Without the benefit of non-verbal cues, such as body language and tone of voice, written communication can be easily misinterpreted. " },
  { turn: 2,pose: NoTele_PointTalk, background: 1, text: "Furthermore, we also have to take into consideration the language barrier between employees." },
  { turn: 1,pose: Tele_ThinkTalk, background: 1, text: "Your concerns are valid Mr.No-Telework" },
  { turn: 1,pose: Tele_ReadTalk, background: 1, text: "But with modern technology, a face-to-face communication is a click away with online meetings alongside a camera." },
  { turn: 1,pose: Tele_ReadTalk, background: 1, text: "If a written message is difficult to understand, it is the employee's responsibility to clarify any uncertainties. " },
  { turn: 3,pose: "temp", background: 1, text: "" },
  { turn: 2,pose: NoTele_ArmsCrossedTalk, background: 1, text: "Even with virtual meetings, resolving issues can be a challenging task." },
  { turn: 1,pose: Tele_StandTalk, background: 1, text: "A valid point Mr.No-Telework and I have to agree with you." },
  { turn: 1,pose: Tele_Slam, background: 1, text: "" },
  { turn: 1,pose: Tele_SlamTalk, background: 1, text: "However, this is only a problem through waterfall. Not in the Agile methodology." },
  { turn: 1,pose: Tele_SlamTalk, background: 1, text: "Each sprint, we pick items from the backlog, size them, and those items will be our task throughout the sprint." },
  { turn: 1,pose: Tele_SmirkTalk, background: 1, text: "If an issue occurs, we add to the backlog by creating a new item." },
  { turn: 2,pose: NoTele_ArmsCrossed, background: 1, text: "..." },
  { turn: 1,pose: Tele_PointStart, background: 1, text: "" },
  { turn: 1,pose: Tele_PointTalk, background: 1, text: "In other words, we do not need to address the issue immediately." },
  { turn: 1,pose: Tele_PointTalk, background: 1, text: "We can address it next sprint, and if need be, find a date where everyone can come in person to resolve the issue." },
  { turn: 2,pose: NoTele_ArmsCrossed, background: 1, text: "..." },
  { turn: 1,pose: Tele_ReadTalk, background: 1, text: "Furthermore, up until now all issue reporting and resolutions have been reported through Teams." },
  { turn: 1,pose: Tele_ThinkTalk, background: 1, text: "If we continue doing what we are doing, teleworking will be no different than working in the office." },
  { turn: 4,pose: "temp", background: 1, text: "Mr. No-Telework, do you have a rebuttal?" },
  { turn: 2,pose: NoTele_DeskSlam, background: 1, text: "..." },
  { turn: 2,pose: NoTele_DeskTalk, background: 1, text: "The lack of supervision is an issue. Supervisors cannot verify if employees are properly and efficiently doing their work." },
  { turn: 2,pose: NoTele_StandTalk, background: 1, text: "Employees working at home can be doing things other than work, which will bring down productivity." },
  { turn: 2,pose: NoTele_PointTalk, background: 1, text: "The home environment plays a big role as well. Home distractions can also cause employees to lose motivation in their work." },
  { turn: 3,pose: "temp", background: 1, text: "" },
  { turn: 1,pose: Tele_PointTalk, background: 1, text: "I welcome the fact that employees can enjoy the freedom of being able to do whatever they want." },
  { turn: 1,pose: Tele_SlamTalk, background: 1, text: "This freedom of action is why teleworking is so desirable among employees." },
  { turn: 1,pose: Tele_ThinkTalk, background: 1, text: "Let me break down a typical work day for you without teleworking." },
  { turn: 1,pose: Tele_ThinkTalk, background: 1, text: "Wake up at 7AM and prepare to leave for work." },
  { turn: 2,pose: NoTele_ArmsCrossed, background: 1, text: "..." },
  { turn: 1,pose: Tele_ThinkTalk, background: 1, text: "Start the commute to the office at 8AM and arrive at the office at 9AM." },
  { turn: 1,pose: Tele_StandTalk, background: 1, text: "Work from 9AM till 5:30PM. Maybe a little overtime and we're at 6:30PM." },
  { turn: 1,pose: Tele_StandTalk, background: 1, text: "We take the same hour commute back and the employee arrives home at 7:30PM." },
  { turn: 1,pose: Tele_StandTalk, background: 1, text: "The employee showers for 15minutes, makes dinner for 30minutes, and eats for 30minutes. The time now is 8:45PM" },
  { turn: 1,pose: Tele_StandTalk, background: 1, text: "If the employee wants to sleep by 10PM in order to wake up the next day in time, they only have an hour of free time." },
  { turn: 2,pose: NoTele_ArmsCrossed, background: 1, text: "..." },
  { turn: 1,pose: Tele_StandTalk, background: 1, text: "With teleworking, the employee can use the commuting time for their own needs." },
  { turn: 1,pose: Tele_ReadTalk, background: 1, text: "Downtime in the office can also be used freely while teleworking. Especially with how restricting the office environment is." },
  { turn: 1,pose: Tele_ReadTalk, background: 1, text: "Without teleworking, a promotion in this company is also near impossible." },
  { turn: 1,pose: Tele_SmirkTalk, background: 1, text: "This company values certifications, but if there is so little free time, the employee won't have time to study." },
  { turn: 2,pose: NoTele_Cornered, background: 1, text: "..." },
  { turn: 1,pose: Tele_SmirkTalk, background: 1, text: "This leads to no certifications and no promotions. There is no career path for the employee. " },
  { turn: 1,pose: Tele_PointTalk, background: 1, text: "They may as well quit." },
  { turn: 3,pose: "temp", background: 1, text: "" },
  { turn: 2,pose: NoTele_Cornered, background: 1, text: "Employees can also study in the office or on weekends. " },
  { turn: 3,pose: "temp", background: 1, text: "" },
  { turn: 1,pose: Tele_SlamTalk, background: 1, text: "Studying in the office is limited due to company policy." },
  { turn: 1,pose: Tele_SlamTalk, background: 1, text: "Some websites are not accessible and some employees may not have to enter personal information on company computers." },
  { turn: 1,pose: Tele_SlamTalk, background: 1, text: "Asking employees to study on the weekend is fine, but every week will be a problem." },
  { turn: 1,pose: Tele_SlamTalk, background: 1, text: "There will be no work-life balance and the employee won't be any happier." },
  { turn: 1,pose: Tele_SlamTalk, background: 1, text: "Unhappy employees will not be able to work efficiently and put in the same motivation as a happy one." },
  { turn: 4,pose: "temp", background: 1, text: "So what do you propose Mr. Wrights?" },
  { turn: 1,pose: Tele_PointTalk, background: 1, text: "I propose that employees have the right to telework! Either everyday or on a hybrid schedule." },
  { turn: 2,pose: NoTele_StandTalk, background: 1, text: "While hybrid models are promising, they require careful implementation." },
  { turn: 1,pose: Tele_ReadTalk, background: 1, text: "We can easily implement a hybrid model." },
  { turn: 1,pose: Tele_ReadTalk, background: 1, text: "As a team, determine which days to telework and whichs days to come into the office." },
  { turn: 1,pose: Tele_ReadTalk, background: 1, text: "Task delegation and issue mitigation can be done through Agile. Communication over team, virtual meetings if needed." },
  { turn: 4,pose: "temp", background: 1, text: "What do you think Mr.No-Telework?" },
  { turn: 2,pose: NoTele_Cornered, background: 1, text: "..." },
  { turn: 2,pose: NoTele_ArmsCrossed, background: 1, text: "..." },
  { turn: 2,pose: NoTele_ArmsCrossedTalk, background: 1, text: "I SHALL TELEWORK FROM NOW ON!" },
  { turn: 2,pose: NoTele_StandTalk, background: 1, text: "TELEWORK FOR EVERYONE" },
  { turn: 4,pose: "temp", background: 1, text: "Let me give the verdict." },
  { turn: 4,pose: "temp", background: 1, text: "Teleworking shall be allowed!" },
  { turn: 5,pose: "temp", background: 1, text: "Let us telework?" },
];

const japaneseTexts = [
  { turn: 5, pose: "temp", background: 1, text: "2025年6月30日" },
  { turn: 5, pose: "temp", background: 1, text: "裁判が始まろうとしています。" },
  { turn: 5, pose: "temp", background: 1, text: "まもなく入廷する裁判官が中央に座ります。" },
  { turn: 5, pose: "temp", background: 1, text: "一方には、テレワークを支持する弁護士、テレワーク・ライツが立っています。" },
  { turn: 5, pose: "temp", background: 1, text: "もう一方には、テレワークに反対する検事、ノー・テレワークがいます。" },
  { turn: 4, pose: "temp", background: 1, text: "静粛に！" },
  { turn: 4, pose: "temp", background: 1, text: "本日はテレワークの利点と欠点について議論します。ライツさん、冒頭陳述をお願いします。" },
  { turn: 1, pose: Tele_ThinkStand, background: 1, text: "" },
  { turn: 1, pose: Tele_PointTalk, background: 1, text: "テレワークをさせてください！" },
  { turn: 1, pose: Tele_ThinkTalk, background: 1, text: "テレワークは基本的人権です！" },
  { turn: 3, pose: "temp", background: 1, text: "" },
  { turn: 2, pose: NoTele_StandTalk, background: 1, text: "オフィスで働け！" },
  { turn: 3, pose: "temp", background: 1, text: "" },
  { turn: 1, pose: Tele_Slam, background: 1, text: "" },
  { turn: 1, pose: Tele_SlamTalk, background: 1, text: "オフィスは嫌いです！" },
  { turn: 1, pose: Tele_StandTalk, background: 1, text: "テレワークは柔軟性の向上、通勤時間の短縮、ワークライフバランスの改善など多くの利点を提供します。" },
  { turn: 1, pose: Tele_StandTalk, background: 1, text: "それは従業員がより生産的で仕事に満足できるようにします。" },
  { turn: 3, pose: "temp", background: 1, text: "" },
  { turn: 2, pose: NoTele_StandTalk, background: 1, text: "説得力のある議論ですね、ライツさん。しかし、潜在的な欠点を見逃してはいけません。" },
  { turn: 2, pose: NoTele_StandTalk, background: 1, text: "テレワークは孤立やコミュニケーションの難しさを引き起こす可能性があります。" },
  { turn: 2, pose: NoTele_StandTalk, background: 1, text: "さらに、仕事と私生活の境界が曖昧になることで燃え尽き症候群を引き起こすこともあります。" },
  { turn: 4, pose: "temp", background: 1, text: "ノー・テレワークさん、もう少し詳しく説明していただけますか？" },
  { turn: 2, pose: NoTele_ArmsCrossedTalk, background: 1, text: "リモートで働くことは、物理的なオフィス環境で発生するカジュアルで自発的な交流を逃すことを意味します。" },
  { turn: 2, pose: NoTele_ArmsCrossedTalk, background: 1, text: "これらの交流は、従業員間の関係を築き、帰属意識を育むために重要です。" },
  { turn: 3, pose: "temp", background: 1, text: "" },
  { turn: 1, pose: Tele_Slam, background: 1, text: "待った！" },
  { turn: 1, pose: Tele_SlamTalk, background: 1, text: "しかし、これらの自発的な交流もまた、気を散らす原因となることがあります。" },
  { turn: 1, pose: Tele_SlamTalk, background: 1, text: "気が散った従業員は、チャットが終わった後も仕事に集中できません。" },
  { turn: 1, pose: Tele_StandTalk, background: 1, text: "これによりスケジュールが遅れ、従業員が残業を余儀なくされます。" },
  { turn: 1, pose: Tele_ReadTalk, background: 1, text: "一方で、研究によればテレワークは実際に生産性を向上させることが示されています。" },
  { turn: 1, pose: Tele_PointStart, background: 1, text: "" },
  { turn: 1, pose: Tele_PointTalk, background: 1, text: "従業員は気が散ることが少なくなり、タスクに集中する時間が増えたと報告しています。" },
  { turn: 2, pose: NoTele_DeskSlam, background: 1, text: "しかし、コミュニケーションへの影響はどうでしょうか？" },
  { turn: 2, pose: NoTele_DeskTalk, background: 1, text: "非言語的な手がかり、例えばボディランゲージや声のトーンがないと、書かれたコミュニケーションは簡単に誤解される可能性があります。" },
  { turn: 2, pose: NoTele_PointTalk, background: 1, text: "さらに、従業員間の言語の壁も考慮する必要があります。" },
  { turn: 1, pose: Tele_ThinkTalk, background: 1, text: "ノー・テレワークさん、あなたの懸念はもっともです。" },
  { turn: 1, pose: Tele_ReadTalk, background: 1, text: "しかし、現代の技術を使えば、オンライン会議とカメラで顔を合わせたコミュニケーションがワンクリックで可能です。" },
  { turn: 1, pose: Tele_ReadTalk, background: 1, text: "書かれたメッセージが理解しにくい場合は、従業員が不明点を明確にする責任があります。" },
  { turn: 3, pose: "temp", background: 1, text: "" },
  { turn: 2, pose: NoTele_ArmsCrossedTalk, background: 1, text: "仮想会議があっても、問題を解決するのは難しい作業です。" },
  { turn: 1, pose: Tele_StandTalk, background: 1, text: "ノー・テレワークさん、あなたの指摘はもっともで、私も同意せざるを得ません。" },
  { turn: 1, pose: Tele_Slam, background: 1, text: "" },
  { turn: 1, pose: Tele_SlamTalk, background: 1, text: "しかし、これはウォーターフォールでのみの問題です。アジャイル手法ではありません。" },
  { turn: 1, pose: Tele_SlamTalk, background: 1, text: "各スプリントで、バックログからアイテムを選び、それらをサイズ分けし、スプリント中のタスクとします。" },
  { turn: 1, pose: Tele_SmirkTalk, background: 1, text: "問題が発生した場合は、新しいアイテムを作成してバックログに追加します。" },
  { turn: 2, pose: NoTele_ArmsCrossed, background: 1, text: "..." },
  { turn: 1, pose: Tele_PointStart, background: 1, text: "" },
  { turn: 1, pose: Tele_PointTalk, background: 1, text: "つまり、問題をすぐに対処する必要はありません。" },
  { turn: 1, pose: Tele_PointTalk, background: 1, text: "次のスプリントで対処することができ、必要であれば、全員が集まって問題を解決する日を見つけることができます。" },
  { turn: 2, pose: NoTele_ArmsCrossed, background: 1, text: "..." },
  { turn: 1, pose: Tele_ReadTalk, background: 1, text: "さらに、これまでのところ、すべての問題報告と解決はTeamsを通じて報告されています。" },
  { turn: 1, pose: Tele_ThinkTalk, background: 1, text: "私たちがやっていることを続ければ、テレワークはオフィスで働くのと変わりません。" },
  { turn: 4, pose: "temp", background: 1, text: "ノー・テレワークさん、反論はありますか？" },
  { turn: 2, pose: NoTele_DeskSlam, background: 1, text: "..." },
  { turn: 2, pose: NoTele_DeskTalk, background: 1, text: "監督の欠如が問題です。監督者は従業員が適切かつ効率的に仕事をしているかどうかを確認できません。" },
  { turn: 2, pose: NoTele_StandTalk, background: 1, text: "在宅勤務の従業員は、仕事以外のことをしている可能性があり、それが生産性を低下させます。" },
  { turn: 2, pose: NoTele_PointTalk, background: 1, text: "家庭環境も大きな役割を果たします。家庭の気が散る要因も、従業員が仕事に対するモチベーションを失う原因となります。" },
  { turn: 3, pose: "temp", background: 1, text: "" },
  { turn: 1, pose: Tele_PointTalk, background: 1, text: "従業員が自由に好きなことをできるという事実を歓迎します。" },
  { turn: 1, pose: Tele_SlamTalk, background: 1, text: "この行動の自由こそが、テレワークが従業員にとって非常に魅力的である理由です。" },
  { turn: 1, pose: Tele_ThinkTalk, background: 1, text: "テレワークなしの典型的な1日の仕事を説明しましょう。" },
  { turn: 1, pose: Tele_ThinkTalk, background: 1, text: "午前7時に起きて、仕事に行く準備をします。" },
  { turn: 2, pose: NoTele_ArmsCrossed, background: 1, text: "..." },
  { turn: 1, pose: Tele_ThinkTalk, background: 1, text: "午前8時にオフィスに向かい、午前9時にオフィスに到着します。" },
  { turn: 1, pose: Tele_StandTalk, background: 1, text: "午前9時から午後5時30分まで働きます。少し残業して午後6時30分になります。" },
  { turn: 1, pose: Tele_StandTalk, background: 1, text: "同じ1時間の通勤をして、午後7時30分に帰宅します。" },
  { turn: 1, pose: Tele_StandTalk, background: 1, text: "従業員は15分間シャワーを浴び、30分間夕食を作り、30分間食事をします。現在の時刻は午後8時45分です。" },
  { turn: 1, pose: Tele_StandTalk, background: 1, text: "翌日に間に合うように午前10時までに寝たい場合、自由時間は1時間しかありません。" },
  { turn: 2, pose: NoTele_ArmsCrossed, background: 1, text: "..." },
  { turn: 1, pose: Tele_StandTalk, background: 1, text: "テレワークを利用すれば、通勤時間を自分のニーズに使うことができます。" },
  { turn: 1, pose: Tele_ReadTalk, background: 1, text: "オフィスでのダウンタイムも、テレワーク中に自由に使うことができます。特にオフィス環境がどれほど制約されているかを考えると。" },
  { turn: 1, pose: Tele_ReadTalk, background: 1, text: "テレワークがなければ、この会社での昇進もほぼ不可能です。" },
  { turn: 1, pose: Tele_SmirkTalk, background: 1, text: "この会社は資格を重視していますが、自由時間がほとんどない場合、従業員は勉強する時間がありません。" },
  { turn: 2, pose: NoTele_Cornered, background: 1, text: "..." },
  { turn: 1, pose: Tele_SmirkTalk, background: 1, text: "これにより、資格も昇進もなくなります。従業員にはキャリアパスがありません。" },
  { turn: 1, pose: Tele_PointTalk, background: 1, text: "彼らは辞めるかもしれません。" },
  { turn: 3, pose: "temp", background: 1, text: "" },
  { turn: 2, pose: NoTele_Cornered, background: 1, text: "従業員はオフィスや週末に勉強することもできます。" },
  { turn: 3, pose: "temp", background: 1, text: "" },
  { turn: 1, pose: Tele_SlamTalk, background: 1, text: "オフィスでの勉強は会社の方針により制限されています。" },
  { turn: 1, pose: Tele_SlamTalk, background: 1, text: "一部のウェブサイトはアクセスできず、一部の従業員は会社のコンピュータに個人情報を入力する必要がないかもしれません。" },
  { turn: 1, pose: Tele_SlamTalk, background: 1, text: "従業員に週末に勉強するように頼むのは構いませんが、毎週では問題になります。" },
  { turn: 1, pose: Tele_SlamTalk, background: 1, text: "ワークライフバランスがなくなり、従業員は幸せになりません。" },
  { turn: 1, pose: Tele_SlamTalk, background: 1, text: "不幸な従業員は効率的に働くことができず、幸せな従業員と同じモチベーションを持つことができません。" },
  { turn: 4, pose: "temp", background: 1, text: "ライツさん、あなたの提案は何ですか？" },
  { turn: 1, pose: Tele_PointTalk, background: 1, text: "私は従業員がテレワークをする権利を提案します！毎日またはハイブリッドスケジュールで。" },
  { turn: 2, pose: NoTele_StandTalk, background: 1, text: "ハイブリッドモデルは有望ですが、慎重な実施が必要です。" },
  { turn: 1, pose: Tele_ReadTalk, background: 1, text: "ハイブリッドモデルを簡単に実施できます。" },
  { turn: 1, pose: Tele_ReadTalk, background: 1, text: "チームとして、どの日にテレワークをし、どの日にオフィスに来るかを決定します。" },
  { turn: 1, pose: Tele_ReadTalk, background: 1, text: "タスクの委任と問題の緩和はアジャイルを通じて行うことができます。必要に応じて、チームでのコミュニケーションや仮想会議を行います。" },
  { turn: 4, pose: "temp", background: 1, text: "ノー・テレワークさん、どう思いますか？" },
  { turn: 2, pose: NoTele_Cornered, background: 1, text: "..." },
  { turn: 2, pose: NoTele_ArmsCrossed, background: 1, text: "..." },
  { turn: 2, pose: NoTele_ArmsCrossedTalk, background: 1, text: "これからはテレワークをします！" },
  { turn: 2, pose: NoTele_StandTalk, background: 1, text: "みんなのためのテレワーク" },
  { turn: 4, pose: "temp", background: 1, text: "判決を下します。" },
  { turn: 4, pose: "temp", background: 1, text: "テレワークを許可します！" },
  { turn: 5, pose: "temp", background: 1, text: "テレワークをさせてください？" },
];

function Telework({ language }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [showNextComponent, setShowNextComponent] = useState(false);

  const handleNextText = () => {
    if (currentIndex + 1 < textArray.length) {
      setCharIndex(0);
      setDisplayedText('');
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowNextComponent(true); 
    }
  };

  const textArray = language === 1 ? englishTexts : japaneseTexts;

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        handleNextText();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  useEffect(() => {
    if (charIndex < textArray[currentIndex].text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + textArray[currentIndex].text[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 25);
      return () => clearTimeout(timeoutId);
    }
  }, [charIndex, currentIndex, textArray]);

  if (showNextComponent) {
    return <Ending />; 
  }
  else if(textArray[currentIndex].turn === 1) {
    return (
        <Box
            style={{ flex: 1, maxHeight: '100%', maxWidth: '100%', position: 'relative' }}
            elevation={0}
            onClick={handleNextText}
        >
            <div style={{ backgroundColor: "lightblue", flex: 1, minHeight: "85vmin", minWidth: "85vmin", position: 'relative', backgroundImage: `url('${backgroundLeft}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <img alt="asd" src={textArray[currentIndex].pose} style={{position: "absolute", bottom: "40px", left: "0%", maxWidth: "100%"}}></img>
              <img alt="asd" src={deskLeft} style={{position: "absolute", bottom: "0%", left: "0%",minWidth:"100%", maxWidth: "100%"}}></img>
              <div style={{ backgroundColor: "black", width: "10%", height:"50px", position: "absolute", bottom: "75px", textAlign: 'center'}}> 
                  <h4 style={{ color: "white", marginTop: "0px" }}>Telework Wrights</h4>
              </div>
              <Dialog>
                  <h4 style={{ color: "white", opacity: 1 }}>
                  {displayedText}
                  </h4>
              </Dialog>
            </div>
        </Box>
    )
  }
  else if(textArray[currentIndex].turn === 2) {
    return (
        <Box
            style={{ flex: 1, maxHeight: '100%', maxWidth: '100%', position: 'relative' }}
            elevation={0}
            onClick={handleNextText}
        >
        <div style={{ backgroundColor: "lightblue", flex: 1, minHeight: "85vmin", minWidth: "85vmin", position: 'relative', backgroundImage: `url('${backgroundRight}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <img alt="asd" src={textArray[currentIndex].pose} style={{position: "absolute", bottom: "16px", right: "0%", maxWidth: "100%"}}></img>
              <img alt="asd" src={deskRight} style={{position: "absolute", bottom: "0%", right: "0%",minWidth:"100%", maxWidth: "100%"}}></img>
          <div style={{ backgroundColor: "black", width: "10%", height:"50px", position: "absolute", bottom: "75px", textAlign: 'center'}}> 
                <h4 style={{ color: "white", marginTop: "0px" }}>No-Telework</h4>
            </div>
          <Dialog>
            <h4 style={{ color: "white", opacity: 1 }}>
              {displayedText}
            </h4>
          </Dialog>
        </div>
        </Box>
    )
  }
  else if(textArray[currentIndex].turn === 3) {
    return (
        <Box
            style={{ flex: 1, maxHeight: '100%', maxWidth: '100%', position: 'relative' }}
            elevation={0}
            onClick={handleNextText}
        >
        <div style={{ backgroundColor: "lightblue", flex: 1, minHeight: "85vmin", minWidth: "85vmin", position: 'relative', backgroundImage: `url('${objection}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
        </Box>
    )
  }
  else if(textArray[currentIndex].turn === 4) {
    return (
        <Box
            style={{ flex: 1, maxHeight: '100%', maxWidth: '100%', position: 'relative' }}
            elevation={0}
            onClick={handleNextText}
        >
        <div style={{ backgroundColor: "lightblue", flex: 1, minHeight: "85vmin", minWidth: "85vmin", position: 'relative', backgroundImage: `url('${judge}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div style={{ backgroundColor: "black", width: "10%", height:"50px", position: "absolute", bottom: "75px", textAlign: 'center'}}> 
                <h4 style={{ color: "white", marginTop: "0px" }}>Judge</h4>
            </div>
          <Dialog>
            <h4 style={{ color: "white", opacity: 1 }}>
              {displayedText}
            </h4>
          </Dialog>
        </div>
        </Box>
    )
  }
  else if(textArray[currentIndex].turn === 5) {
    return (
        <Box
            style={{ flex: 1, maxHeight: '100%', maxWidth: '100%', position: 'relative' }}
            elevation={0}
            onClick={handleNextText}
        >
        <div style={{ backgroundColor: "lightblue", flex: 1, minHeight: "85vmin", minWidth: "85vmin", position: 'relative', backgroundImage: `url('${room}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Dialog>
            <h4 style={{ color: "white", opacity: 1 }}>
              {displayedText}
            </h4>
          </Dialog>
          
        </div>
        </Box>
    )
  }
}

export default Telework;