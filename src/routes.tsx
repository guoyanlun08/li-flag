import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';

// 首页
import Home from '@/views/Home';

// 每日模块
import EveryDayOutlet from '@/views/EveryDay';
import EveryDay from '@/views/EveryDay/EveryDay';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'everyday',
        element: <EveryDayOutlet />,
        children: [
          {
            path: '',
            element: <EveryDay />
          }
        ]
      }
    ]
  }
]);

export default router;
