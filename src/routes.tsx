import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';

// 首页
import Home from '@/views/Home';

// 每日模块
import EveryDayOutlet from '@/views/EveryDay';
import EveryDay from '@/views/EveryDay/EveryDay';
import TeamFlag from '@/views/TeamFlag';
import TeamFlagCard from '@/views/TeamFlag/components/TeamFlagCard';
import TeamFlagDetail from '@/views/TeamFlag/components/TeamFlagDeatail';

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
      },
      {
        path: '/teamFlag',
        element: <TeamFlag />,
        children: [
          {
            path: '',
            element: <TeamFlagCard />
          },
          {
            path: '/teamFlag/:id',
            element: <TeamFlagDetail />
          }
        ]
      }
    ]
  }
]);

export default router;
