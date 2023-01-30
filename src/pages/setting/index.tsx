import { useState, useEffect, useCallback } from 'react';
import { Switch, Card, Avatar, Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { history } from 'umi';
import Style from './index.less';
import * as GoodsPackageController from '@/services/api/ecs';
import { Tag, Tooltip } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import * as API_app from '@/services/api/app'

const { Meta } = Card;
const ProductManage: React.FC<{}> = (props: any) => {
  const [combo, setCombo] = useState<any[]>([]);
  const [current_tab, setCT] = useState('1');
  const [tab_config] = useState([
    {
      tab: '影音',
      key: '1',
    },
    {
      tab: '生活',
      key: '2',
    },
    {
      tab: '游戏',
      key: '3',
    },
    {
      tab: '体育',
      key: '4',
    },
    {
      tab: '系统',
      key: '5',
    }
  ])
  /* methods */
  const handleTabChange = (e) => {
    setCT(e)
  }

  const createCombo = useCallback(() => {
    history.push({ pathname: `./webos/edit/${btoa('{}')}` });
  }, []);
  const fetchData = useCallback(async () => {
    let res = await API_app.getappList({
      type: Number(current_tab)
    })
    setCombo(res)
  }, [current_tab]);
  useEffect(() => {
    fetchData()
  }, [current_tab])

  const handleSwitchChange = useCallback(async (record) => {
    let res = await API_app.update({
      ...record,
      status: !record.status
    })
    fetchData()
  }, [fetchData])
  return (
    <PageContainer
      title="应用管理"
      content={<div>应用管理用于WebOS的应用分发和版本迭代。</div>}
      tabList={tab_config}
      onTabChange={handleTabChange}
    >
      <Row gutter={[24, 12]} className={Style['grid']}>
        {combo?.map((item, index) => (
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24} key={index}>
            <Card
              className={Style['item']}
              hoverable
              style={{ width: 300, marginTop: 16 }}
              actions={[
                <>
                  <span
                    onClick={async () => {
                      history.push({
                        pathname: `./webos/edit/${btoa(JSON.stringify({
                          id: item.id
                        }))}`
                      });
                    }}
                  >
                    编辑应用
                  </span>
                </>,
                <>
                  <span
                    onClick={() => {
                      history.push({
                        pathname: `./webos/edition/${btoa(JSON.stringify({
                          id: item.id
                        }))}`
                      });
                    }}
                  >
                    版本管理
                  </span>
                </>,
              ]}
            >
              <Meta
                avatar={<Avatar src={item.icon} shape="square"></Avatar>}
                title={<div style={{
                  display: 'flex',
                  alignItems: 'center',
                }}><div style={{
                  maxWidth: '150px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginRight: '10px',
                  flex: 1
                }}>{item.title}</div><Tag color="processing">{item.code}</Tag><Switch onChange={() => handleSwitchChange(item)} checkedChildren="上线" unCheckedChildren="下线" checked={item.status} /></div>}
                description={item.intro || '暂无简介'}
              />
            </Card>
          </Col>
        ))}
        <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
          <div className={Style['item-new']} onClick={createCombo}>
            <div className={Style['content']}>
              <PlusCircleOutlined />
              <span>新增应用</span>
            </div>
          </div>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ProductManage;
