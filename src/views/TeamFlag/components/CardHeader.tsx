import type { MenuProps } from 'antd';
import { Dropdown, Avatar } from 'antd';

import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';

import { CardHeaderProps } from '@/features/teamFlag/type';
import { Styled_CardHeaderContainer } from '../Styles';

export default function CardHeader(
  cardHeaderProps: CardHeaderProps & {
    handleCardDelete: (
      teamFlagId: number,
      e: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>
    ) => Promise<void>;
  }
) {
  const items: MenuProps['items'] = [
    {
      key: 'delete',
      label: '删除',
      icon: <DeleteOutlined style={{ color: 'red' }} />,
      onClick: (Item) => {
        console.log(Item);
        cardHeaderProps.handleCardDelete(cardHeaderProps.id, Item.domEvent);
      }
    }
  ];
  return (
    <Styled_CardHeaderContainer>
      <div className="team-flag-icon">
        <Avatar style={{ backgroundColor: cardHeaderProps.groupIcon, verticalAlign: 'middle' }} size="large">
          G
        </Avatar>
      </div>
      <div className="header-title">
        <div className="title">{cardHeaderProps.title}</div>
        <div className="description">{cardHeaderProps.description}</div>
      </div>
      <div className="flag-status">
        <div className="dead-line">
          <span>Deadline:</span>
          <span>{cardHeaderProps.deadline}</span>
        </div>
        <div className="card-operation">
          <Dropdown menu={{ items }} placement="bottom" arrow trigger={['click']}>
            <EllipsisOutlined onClick={(e) => e.stopPropagation()} />
          </Dropdown>
        </div>
      </div>
    </Styled_CardHeaderContainer>
  );
}
