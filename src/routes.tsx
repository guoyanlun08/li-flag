import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import EveryDay from '@/views/EveryDay';
import RecentlyCompleted from '@/views/RecentlyCompleted';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'everyday',
        element: <EveryDay />
      },
      {
        path: 'recent-completed',
        element: <RecentlyCompleted />
      }
    ]
  }
]);

export default router;
