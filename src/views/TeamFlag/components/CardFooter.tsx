import { Styled_CardFooterContainer } from '../Styles';
import { CheckCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { CardFooterProps } from '@/features/teamFlag/type';

export default function CardFooter(props: CardFooterProps) {
  return (
    <Styled_CardFooterContainer>
      <div className="flag-record">
        <div className="finish-record">
          <CheckCircleOutlined />
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
