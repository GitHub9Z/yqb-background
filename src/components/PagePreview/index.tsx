import React, { useState, useRef, useEffect } from 'react';
import { DrawerForm, DrawerFormProps, ProFormInstance } from '@ant-design/pro-form';
import { List, Card } from 'antd';
// 接口
import * as PageControlApi from '@/services/api/pageContro';
// 样式
import styles from './index.less';
// const listData1 = {
//   list: [
//     {
//       rid: 3111,
//       pid: 1771,
//       type: 41,
//       height: 0,
//       items: [
//         {
//           id: 13667,
//           rid: 3111,
//           title: '记忆大师',
//           summary: '',
//           aid: 752690,
//           pic: 'http://ottdbui-zmimg.yysh.mgtv.com/asset/2019-03-07/1d/5c80eba6d78d8.jpg!0',
//           ptype: 2,
//           extra: {
//             score: 8.4,
//             tag: 'VIP',
//             tagColor: '#E65949',
//             tagEndColor: '',
//             tagTextColor: '',
//             drm: '',
//           },
//           bg: [],
//           jumpConfig: {
//             type: 0,
//             source: '12',
//             link: 'db://mediadetail?id=752690&rname=精选电影_记忆大师',
//           },
//         },
//         {
//           id: 13668,
//           rid: 3111,
//           title: '不速来客',
//           summary: '',
//           aid: 1810979,
//           pic: 'http://ottdbui-zmimg.yysh.mgtv.com/asset/2021-11-21/33/619a01aa7c880.jpg!0',
//           ptype: 2,
//           extra: {
//             score: 8.2,
//             tag: 'VIP',
//             tagColor: '#E65949',
//             tagEndColor: '',
//             tagTextColor: '',
//             drm: '',
//           },
//           bg: [],
//           jumpConfig: {
//             type: 0,
//             source: '12',
//             link: 'db://mediadetail?id=1810979&rname=精选电影_不速来客',
//           },
//         },
//         {
//           id: 13669,
//           rid: 3111,
//           title: '利刃出鞘',
//           summary: '',
//           aid: 1209146,
//           pic: 'http://ottdbui-zmimg.yysh.mgtv.com/tyos/2022-01-17/61e4e02621bab.jpeg!0',
//           ptype: 2,
//           extra: {
//             score: 8.2,
//             tag: 'VIP',
//             tagColor: '#E65949',
//             tagEndColor: '',
//             tagTextColor: '',
//             drm: '',
//           },
//           bg: [],
//           jumpConfig: {
//             type: 0,
//             source: '12',
//             link: 'db://mediadetail?id=1209146&rname=精选电影_利刃出鞘',
//           },
//         },
//         {
//           id: 13670,
//           rid: 3111,
//           title: '催眠裁决',
//           summary: '',
//           aid: 1084380,
//           pic: 'http://ottdbui-zmimg.yysh.mgtv.com/asset/2019-12-16/9f/5df6fcbcccfb9.jpg!0',
//           ptype: 2,
//           extra: {
//             score: 8.4,
//             tag: '',
//             tagColor: '',
//             tagEndColor: '',
//             tagTextColor: '',
//             drm: '',
//           },
//           bg: [],
//           jumpConfig: {
//             type: 0,
//             source: '12',
//             link: 'db://mediadetail?id=1084380&rname=精选电影_催眠裁决',
//           },
//         },
//       ],
//     },
//     {
//       rid: 3112,
//       pid: 1771,
//       type: 1,
//       height: 0,
//       title: '热门专区',
//       items: [
//         {
//           id: 13676,
//           rid: 3112,
//           title: '心理罪',
//           summary: '',
//           aid: 589381,
//           pic: 'http://ottdbui-zmimg.yysh.mgtv.com/asset/2021-12-29/95/61cb5a08bd936.jpg!0',
//           ptype: 1,
//           extra: {
//             score: 8.4,
//             tag: '',
//             tagColor: '',
//             tagEndColor: '',
//             tagTextColor: '',
//             drm: '',
//           },
//           bg: [],
//           jumpConfig: {
//             type: 0,
//             source: '12',
//             link: 'db://mediadetail?id=589381&rname=精选电影_心理罪',
//           },
//         },
//         {
//           id: 13675,
//           rid: 3112,
//           title: '调音师',
//           summary: '',
//           aid: 997604,
//           pic: 'http://ottdbui-zmimg.yysh.mgtv.com/asset/2019-05-14/9c/5cda2435b1abb.jpg!0',
//           ptype: 1,
//           extra: {
//             score: 8.5,
//             tag: 'VIP',
//             tagColor: '#E65949',
//             tagEndColor: '',
//             tagTextColor: '',
//             drm: '',
//           },
//           bg: [],
//           jumpConfig: {
//             type: 0,
//             source: '12',
//             link: 'db://mediadetail?id=997604&rname=精选电影_调音师',
//           },
//         },
//         {
//           id: 13674,
//           rid: 3112,
//           title: '禁闭岛',
//           summary: '',
//           aid: 110588,
//           pic: 'http://ottdbui-zmimg.yysh.mgtv.com/asset/2019-03-29/02/5c9db10c17727.jpg!0',
//           ptype: 1,
//           extra: {
//             score: 8.6,
//             tag: 'VIP',
//             tagColor: '#E65949',
//             tagEndColor: '',
//             tagTextColor: '',
//             drm: '',
//           },
//           bg: [],
//           jumpConfig: {
//             type: 0,
//             source: '12',
//             link: 'db://mediadetail?id=110588&rname=精选电影_禁闭岛',
//           },
//         },
//         {
//           id: 13673,
//           rid: 3112,
//           title: '烈日灼心',
//           summary: '',
//           aid: 141286,
//           pic: 'http://ottdbui-zmimg.yysh.mgtv.com/tyos/2021-09-28/6152adc1add14.jpg!0',
//           ptype: 1,
//           extra: {
//             score: 8.9,
//             tag: 'VIP',
//             tagColor: '#E65949',
//             tagEndColor: '',
//             tagTextColor: '',
//             drm: '',
//           },
//           bg: [],
//           jumpConfig: {
//             type: 0,
//             source: '12',
//             link: 'db://mediadetail?id=141286&rname=精选电影_烈日灼心',
//           },
//         },
//         {
//           id: 13672,
//           rid: 3112,
//           title: '你是凶手',
//           summary: '',
//           aid: 1203453,
//           pic: 'http://ottdbui-zmimg.yysh.mgtv.com/asset/2019-12-28/a2/5e0706add680d.jpg!0',
//           ptype: 1,
//           extra: {
//             score: 8,
//             tag: 'VIP',
//             tagColor: '#E65949',
//             tagEndColor: '',
//             tagTextColor: '',
//             drm: '',
//           },
//           bg: [],
//           jumpConfig: {
//             type: 0,
//             source: '12',
//             link: 'db://mediadetail?id=1203453&rname=精选电影_你是凶手',
//           },
//         },
//         {
//           id: 13671,
//           rid: 3112,
//           title: '东方快车谋杀案',
//           summary: '',
//           aid: 781082,
//           pic: 'http://ottdbui-zmimg.yysh.mgtv.com/asset/2019-03-07/7d/5c80e84c14909.jpg!0',
//           ptype: 1,
//           extra: {
//             score: 8.5,
//             tag: 'VIP',
//             tagColor: '#E65949',
//             tagEndColor: '',
//             tagTextColor: '',
//             drm: '',
//           },
//           bg: [],
//           jumpConfig: {
//             type: 0,
//             source: '12',
//             link: 'db://mediadetail?id=781082&rname=精选电影_东方快车谋杀案',
//           },
//         },
//         {
//           id: 13671,
//           rid: 3112,
//           title: '',
//           summary: '',
//           aid: 781082,
//           pic: '',
//           ptype: 1,
//           extra: {
//             score: 8.5,
//             tag: 'VIP',
//             tagColor: '#E65949',
//             tagEndColor: '',
//             tagTextColor: '',
//             drm: '',
//           },
//           bg: [],
//           jumpConfig: {
//             type: 0,
//             source: '12',
//             link: 'db://mediadetail?id=781082&rname=精选电影_东方快车谋杀案',
//           },
//         },
//       ],
//     },
//   ],
// };
// const listData2 = {
//   list: [
//     {
//       id: 3,
//       title: '列表测试数据',
//       type: 1,
//       sort: 1,
//       status: 1,
//       pid: 1,
//       titleShow: 1,
//       listJson: {
//         playSource: 2,
//         videoType: 0,
//         contentJson: [
//           {
//             id: 18,
//             title: '测试',
//             type: 1,
//             subtitle: '测试11',
//             aid: '12344',
//             status: 1,
//             playSource: 0,
//             jumpLink: 'wwww.test.com',
//             packageName: 'iqiyi.com',
//             picLink: 'www.baidu.com',
//             videoLink: 'www.ceshi.com',
//             startTime: 1642578870,
//             endTime: 1642578870,
//             createTime: '2022-01-27 15:05:58',
//             updateTime: '2022-01-27 15:05:58',
//             modifyTime: '2022-01-27 15:05:58',
//           },
//         ],
//         tagJson: {
//           privilege: 0,
//           sorting: 1,
//           area: 0,
//           sort: 0,
//           num: 100,
//           year: [],
//         },
//       },
//       contentJson: '',
//       createTime: '2022-02-07 10:34:57',
//       updateTime: '2022-02-07 10:34:57',
//       modifyTime: '2022-02-11 13:28:12',
//     },
//     {
//       id: 2,
//       title: '测试表头2',
//       type: 0,
//       sort: 1,
//       status: 1,
//       pid: 1,
//       titleShow: 1,
//       listJson: '',
//       contentJson: '',
//       createTime: '2022-02-07 10:34:31',
//       updateTime: '2022-02-07 10:34:31',
//       modifyTime: '2022-02-11 13:28:10',
//     },
//     {
//       id: 14,
//       title: '基础板块1',
//       type: 0,
//       sort: 2,
//       status: 1,
//       pid: 1,
//       titleShow: 1,
//       listJson: '',
//       contentJson: [
//         {
//           id: 27,
//           title: '',
//           type: 0,
//           sort: 1,
//           status: 0,
//           titleShow: 0,
//           scoreShow: 0,
//           contentJson: [
//             {
//               id: 18,
//               title: '测试',
//               type: 1,
//               subtitle: '测试11',
//               aid: '12344',
//               status: 1,
//               playSource: 0,
//               jumpLink: 'wwww.test.com',
//               packageName: 'iqiyi.com',
//               picLink: 'http://ottdbui-zmimg.yysh.mgtv.com/asset/2019-03-07/1d/5c80eba6d78d8.jpg!0',
//               videoLink: 'www.ceshi.com',
//               startTime: 1642578870,
//               endTime: 1642578870,
//               createTime: '2022-01-27 15:05:58',
//               updateTime: '2022-01-27 15:05:58',
//               modifyTime: '2022-01-27 15:05:58',
//             },
//             {
//               id: 18,
//               title: '测试',
//               type: 1,
//               subtitle: '测试11',
//               aid: '12344',
//               status: 1,
//               playSource: 0,
//               jumpLink: 'wwww.test.com',
//               packageName: 'iqiyi.com',
//               picLink: 'http://ottdbui-zmimg.yysh.mgtv.com/asset/2019-03-07/1d/5c80eba6d78d8.jpg!0',
//               videoLink: 'www.ceshi.com',
//               startTime: 1642578870,
//               endTime: 1642578870,
//               createTime: '2022-01-27 15:05:58',
//               updateTime: '2022-01-27 15:05:58',
//               modifyTime: '2022-01-27 15:05:58',
//             },
//           ],
//           createTime: '2022-02-11 21:22:16',
//           updateTime: '2022-02-11 21:22:16',
//           modifyTime: '2022-02-11 21:22:16',
//         },
//         {
//           id: 27,
//           title: '',
//           type: 0,
//           sort: 1,
//           status: 0,
//           titleShow: 0,
//           scoreShow: 0,
//           contentJson: [
//             {
//               id: 18,
//               title: '测试',
//               type: 1,
//               subtitle: '测试11',
//               aid: '12344',
//               status: 1,
//               playSource: 0,
//               jumpLink: 'wwww.test.com',
//               packageName: 'iqiyi.com',
//               picLink: 'http://ottdbui-zmimg.yysh.mgtv.com/asset/2019-03-07/1d/5c80eba6d78d8.jpg!0',
//               videoLink: 'www.ceshi.com',
//               startTime: 1642578870,
//               endTime: 1642578870,
//               createTime: '2022-01-27 15:05:58',
//               updateTime: '2022-01-27 15:05:58',
//               modifyTime: '2022-01-27 15:05:58',
//             },
//             {
//               id: 18,
//               title: '测试',
//               type: 1,
//               subtitle: '测试11',
//               aid: '12344',
//               status: 1,
//               playSource: 0,
//               jumpLink: 'wwww.test.com',
//               packageName: 'iqiyi.com',
//               picLink: 'http://ottdbui-zmimg.yysh.mgtv.com/asset/2019-03-07/1d/5c80eba6d78d8.jpg!0',
//               videoLink: 'www.ceshi.com',
//               startTime: 1642578870,
//               endTime: 1642578870,
//               createTime: '2022-01-27 15:05:58',
//               updateTime: '2022-01-27 15:05:58',
//               modifyTime: '2022-01-27 15:05:58',
//             },
//             {
//               id: 18,
//               title: '测试',
//               type: 1,
//               subtitle: '测试11',
//               aid: '12344',
//               status: 1,
//               playSource: 0,
//               jumpLink: 'wwww.test.com',
//               packageName: 'iqiyi.com',
//               picLink: 'http://ottdbui-zmimg.yysh.mgtv.com/asset/2019-03-07/1d/5c80eba6d78d8.jpg!0',
//               videoLink: 'www.ceshi.com',
//               startTime: 1642578870,
//               endTime: 1642578870,
//               createTime: '2022-01-27 15:05:58',
//               updateTime: '2022-01-27 15:05:58',
//               modifyTime: '2022-01-27 15:05:58',
//             },
//             {
//               id: 18,
//               title: '测试',
//               type: 1,
//               subtitle: '测试11',
//               aid: '12344',
//               status: 1,
//               playSource: 0,
//               jumpLink: 'wwww.test.com',
//               packageName: 'iqiyi.com',
//               picLink: 'http://ottdbui-zmimg.yysh.mgtv.com/asset/2019-03-07/1d/5c80eba6d78d8.jpg!0',
//               videoLink: 'www.ceshi.com',
//               startTime: 1642578870,
//               endTime: 1642578870,
//               createTime: '2022-01-27 15:05:58',
//               updateTime: '2022-01-27 15:05:58',
//               modifyTime: '2022-01-27 15:05:58',
//             },
//           ],
//           createTime: '2022-02-11 21:22:16',
//           updateTime: '2022-02-11 21:22:16',
//           modifyTime: '2022-02-11 21:22:16',
//         },
//       ],
//       createTime: '2022-02-11 17:03:03',
//       updateTime: '2022-02-11 21:22:17',
//       modifyTime: '2022-02-12 16:03:24',
//     },
//   ],
// };
const ModalPagePreview: React.FC<{} & DrawerFormProps> = (props: any) => {
  const formRef = useRef<ProFormInstance>();
  const [listData, setListData] = useState<any>();
  /**
   * 接口请求 start
   */
  // 获取table数据
  const getHttpList = async ({ current, ...other }: any = {}) => {
    const params = {
      id: props.id,
    };
    const result = (await PageControlApi.pagePreviewDataGet(params as any)) as any;
    setListData(result?.data);
  };
  useEffect(() => {
    // const formateListData = (data: any) => {
    //   for (let i = 0; i < data.length; i++) {
    //     data[i].items.forEach((item: any) => {
    //       console.log(item);
    //       if (item.pic == '') {
    //         item.pic = 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png';
    //       }
    //     });
    //   }
    //   return data;
    // };
    // setListData(formateListData(listData?.list) || []);
    // setListData(listData2.list);
    getHttpList();
  }, []);
  // const cardList = listData && (
  //   <List<any>
  //     rowKey="id"
  //     // loading={loading}
  //     dataSource={listData}
  //     renderItem={(item) => (
  //       <List.Item
  //         onClick={() => {
  //           console.log('dianji版块');
  //         }}
  //       >
  //         <Card className={styles.blockCard} hoverable bordered={false}>
  //           {item.title != '' && <Card.Meta title={<div className={styles.blockTitle}>{item.title}</div>} />}
  //           <List<any>
  //             rowKey="id"
  //             // loading={loading}
  //             grid={{
  //               gutter: 16,
  //               column: item?.items.length,
  //             }}
  //             dataSource={item?.items}
  //             // eslint-disable-next-line @typescript-eslint/no-shadow
  //             renderItem={(item) => (
  //               <List.Item
  //                 onClick={(e) => {
  //                   e.stopPropagation();
  //                   console.log('dianji配置区');
  //                 }}
  //               >
  //                 <Card className={styles.listCard} hoverable cover={<img alt={item.title} src={item.pic} />}>
  //                   {item.title != '' && <Card.Meta title={<div className={styles.listTitle}>{item.title}</div>} />}
  //                 </Card>
  //               </List.Item>
  //             )}
  //           />
  //         </Card>
  //       </List.Item>
  //     )}
  //   />
  // );
  //生成content item布局
  const rederContentJsonItem = (array: [] = []) => {
    if (array) {
      return array.map((item: any, index: number) => (
        // eslint-disable-next-line react/jsx-key
        <Card key={index} className={styles.listCard} hoverable cover={<img alt={item.title} src={item.picLink} />}>
          {item.title != '' && <Card.Meta title={<div className={styles.listTitle}>{item.title}</div>} />}
        </Card>
      ));
    }
  };
  //生成content布局
  const rederContentJson = (array: [] = []) => {
    if (Array.isArray(array)) {
      return (
        <List
          rowKey="id"
          dataSource={array}
          renderItem={(item_: any) => (
            <List.Item
              onClick={(e) => {
                e.stopPropagation();
                console.log('dianji配置区');
              }}
            >
              {rederContentJsonItem(item_.contentJson)}
            </List.Item>
          )}
        />
      );
    } else {
      return <></>;
    }
  };
  //生成list布局
  const rederListJson = (data: any) => {
    return (
      <List<any>
        rowKey="id"
        grid={{
          gutter: 16,
          column: 7,
        }}
        dataSource={Array(7).fill({ id: 1 })}
        renderItem={() => (
          <List.Item
            onClick={(e) => {
              e.stopPropagation();
              console.log('dianji配置区');
            }}
          >
            <Card
              className={styles.listCard}
              hoverable
              cover={<img src="http://ottdbui-zmimg.yysh.mgtv.com/asset/2019-03-29/02/5c9db10c17727.jpg!0" />}
            ></Card>
          </List.Item>
        )}
      />
    );
  };
  //type0是conetent数据1为list数据
  const cardList2 = listData && (
    <List<any>
      rowKey="id"
      dataSource={listData}
      renderItem={(item) => (
        <List.Item
          onClick={() => {
            console.log('dianji版块');
          }}
        >
          <Card className={styles.blockCard} hoverable bordered={false}>
            {item.title != '' && <Card.Meta title={<div className={styles.blockTitle}>{item.title}</div>} />}
            {item.type == 0 ? rederContentJson(item.contentJson) : rederListJson(item)}
          </Card>
        </List.Item>
      )}
    />
  );
  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      title="页面预览"
      formRef={formRef}
      {...props}
      autoFocusFirstInput
      submitter={false}
    >
      <div className={styles.coverCardList}>{cardList2}</div>
    </DrawerForm>
  );
};

export default ModalPagePreview;
