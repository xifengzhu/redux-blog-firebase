import React from 'react';
import './NotFound.scss';

const NotFoundPage = () => {
  return (
    <div className="normal">
      <div className="container">
        <h1 className="title">404</h1>
        <p className="desc">未找到该页面</p>
        <a href="/"><button className="btn btn-primary" type="primary" style={{ marginTop: 5 }}>返回首页</button></a>
      </div>
    </div>
  );
};

export default NotFoundPage;
