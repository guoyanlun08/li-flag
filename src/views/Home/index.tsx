import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Styled_Home, Styled_Header, Styled_Introduce } from './Styles';

function Home() {
  const navigate = useNavigate();

  return (
    <Styled_Home>
      <Styled_Header>
        <h1>LI-FLAG！！！欢迎来到我们，二人帮！！！ 处女作！！！ 史诗级！！！最伟大的作品 </h1>
        <p style={{ fontSize: '1.2em', marginTop: '20px' }}>
          你准备好踏上让自己变优秀！！的 "变形记" 之旅了吗? 还没有找到得力助手？那不用再找了，因为你刚刚找到了最酷，最适合你的
          "良师益友"了！！！
        </p>
      </Styled_Header>

      <Styled_Introduce>
        <div className="intro-title">LI-Flag:</div>
        <div className="intro-content">
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;LI-Flag 就是我们常说的 立Flag。立下一个个 Flag，然后一个个拔掉，非常豪爽！那就用 LI-Flag 来 立Flag
            吧！！！【手动狗头】
          </p>
        </div>
      </Styled_Introduce>

      <Styled_Introduce>
        <div className="intro-title">功能介绍:</div>
        <div className="intro-content">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;目前功能只有每日模块</p>
          <br />
          <div className="feature-box">
            <p>
              <strong>【每日模块】</strong>：主要是四象限学习法则，来规划进度。简要如下：
            </p>
            <p>新建：鼠标双击每个模块新建一个 todo 项</p>
            <p>删除：对一个 todo项，右键删除</p>
            <p>拖拽移动 todo 项目</p>
            <p>查看近期完成 todo项</p>
            <br />
          </div>
        </div>
      </Styled_Introduce>

      <Styled_Introduce>
        <div className="intro-title">公告:</div>
        <div className="intro-content">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;LI-Flag 还会不断的完善呢，已经有第二期的想法啦！</p>
          <br />
          <p>（进度是有点小慢，只有下班的时间搞呐，那个骑行佬周末要骑车磨蛋的）</p>
          <br />
          <p>
            欢迎大家对 LI-Flag有什么点子，想法，BUG(骑行佬写的)，可以
            <a href="https://github.com/guoyanlun08/li-flag/issues" target="_blank">
              在这里
            </a>
            新建一个 issue提供给我们wo~
          </p>
        </div>
      </Styled_Introduce>

      <div className="footer">
        <div>
          <div style={{ fontSize: '1.1em', marginTop: '20px' }}>话不多说！上号！原... LI-Flag</div>
          <div className="footer-btn">
            <button
              style={{
                padding: '10px 20px',
                fontSize: '1.1em',
                marginTop: '20px',
                backgroundColor: '#FFD700',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/everyday')}>
              Let's Get Started!
            </button>
          </div>
        </div>
      </div>
    </Styled_Home>
  );
}

export default Home;
