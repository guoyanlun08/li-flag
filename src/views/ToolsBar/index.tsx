import React from 'react';
import style from './index.module.scss';

export function ToolsBar() {
  return (
    <div className={style['tool-bar']}>
      {/* 将来会是个循环 */}
      <div className="tool-content">
        <div className="tool-item">切换 list</div>
      </div>
    </div>
  );
}
