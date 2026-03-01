import roomPic from '@/assets/roomPic.jpg';
import { Card, Col, Image, Radio, Row, Spin, type RadioChangeEvent } from 'antd';
import { useEffect, useState } from 'react';
import { getRoomList, type RoomType } from '../../api/room';
import './index.scss';

function Room() {
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState('a1');
  const [imageUrl, setImageUrl] = useState<string>(roomPic);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(false);
  const handleOpen = (src: string) => {
    // 写死图片
    setImageUrl(src);
    setOpen(true);
  };

  const handleChange = (e: RadioChangeEvent) => {
    const curRoomId = e.target.value;
    setRoomId(curRoomId);
    loadRooms(curRoomId);
  };

  const loadRooms = async (curRoomId: string = roomId) => {
    try {
      setLoading(true);
      const res = await getRoomList({ roomId: curRoomId });
      setLoading(false);
      if (res.data) {
        const { rooms } = res.data;
        setRooms(rooms);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <div className="room">
      <Image
        width={200}
        style={{ display: 'none' }}
        preview={{
          open,
          src: imageUrl,
          onOpenChange: value => {
            setOpen(value);
          },
        }}
      />
      <Card className="mb">
        <Radio.Group value={roomId} onChange={handleChange} defaultValue="a1" buttonStyle="solid">
          <Radio.Button value="a1">A1幢写字楼</Radio.Button>
          <Radio.Button value="a2">A2幢写字楼</Radio.Button>
          <Radio.Button value="b1">B1幢写字楼</Radio.Button>
          <Radio.Button value="b2">B2幢写字楼</Radio.Button>
          <Radio.Button value="c1">C1幢写字楼</Radio.Button>
          <Radio.Button value="c2">C2幢写字楼</Radio.Button>
          <Radio.Button value="d1">天汇国际大厦A座</Radio.Button>
          <Radio.Button value="d2">时代金融广场</Radio.Button>
        </Radio.Group>
      </Card>
      <Spin spinning={loading}>
        <Row gutter={16}>
          {rooms.map(room => (
            <Col span={6} key={room.roomNumber}>
              <Card
                title="房间号："
                extra={<a onClick={() => handleOpen(imageUrl)}>户型图</a>}
                className="item mb"
              >
                <h1 className="tc">{room.roomNumber}</h1>
                <div className="clearfix mt">
                  <p className="fl">装修情况：</p>
                  <p className="fr">{room.decorationType}</p>
                </div>
                <div className="clearfix mt">
                  <p className="fl">房间面积：</p>
                  <p className="fr">{room.area}m^2</p>
                </div>
                <div className="clearfix mt">
                  <p className="fl">出租单价：</p>
                  <p className="fr">{room.unitPrice}元/平/日</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
}

export default Room;
