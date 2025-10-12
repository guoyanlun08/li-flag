import { Styled_CardFooterContainer } from '../../Styles';
import { CheckCircleTwoTone, UnorderedListOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

type CardFooterProps = {
  finished: number;
  total: number;
  memberAvatar: string[];
};

export default function CardFooter(props: CardFooterProps) {
  return (
    <Styled_CardFooterContainer>
      <div className="flag-record">
        <div className="finish-record">
          <CheckCircleTwoTone twoToneColor="#52c41a" />
          <span>{props.finished}</span>
        </div>
        <div className="total-record">
          <UnorderedListOutlined />
          <span>{props.total}</span>
        </div>
      </div>
      <div className="team-menber">
        <Avatar.Group maxCount={5}>
          {props.memberAvatar.map((item, index) => {
            return <Avatar src={item} key={index} />;
          })}
        </Avatar.Group>
      </div>
    </Styled_CardFooterContainer>
  );
}
