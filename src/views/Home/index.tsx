import React from 'react';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>欢迎来到我们，二人帮！！！ 处女作！！！ 史诗级！！！ 项目， LI-FLAG</h1>
      <p style={{ fontSize: '1.2em', marginTop: '20px' }}>
        你准备好踏上让自己变优秀！！的 "变形记" 之旅了吗? 还没有找到得力助手？那不用再找了，因为你刚刚找到了最酷，最适合你的
        "良师益友"了！！！
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <img src="project-image.jpg" alt="Project Image" style={{ width: '50%', borderRadius: '10px' }} />
      </div>
      <p style={{ fontSize: '1.1em', marginTop: '20px' }}>我们的项目就像一只神奇的独角兽🦄-独特，强大。</p>
      <p style={{ fontSize: '1.1em', marginTop: '20px' }}>别错过了!点击下面的开始按钮，开启你的旅途吧。</p>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '1.1em',
          marginTop: '20px',
          backgroundColor: '#FFD700',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
        Let's Get Started!
      </button>
    </div>
  );
}

export default Home;
