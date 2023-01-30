import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Alert, Tag, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import * as echarts from 'echarts';
import * as API_bff from '@/services/api/bff'


import request from 'umi-request';

export default () => {
  useEffect(() => {
    console.log('jjjjjdddd')
    setTimeout(async () => {
      const echart = await API_bff.getEchart()
      var chartDom = document.getElementById('echart-container');
      console.log('jjjjj', echart)
      var myChart = echarts.init(chartDom);
      var option;

      myChart.showLoading();
      myChart.hideLoading();
      const formatUtil = echarts.format;
      function getLevelOption() {
        return [
          {
            itemStyle: {
              borderWidth: 0,
              gapWidth: 5
            }
          },
          {
            itemStyle: {
              gapWidth: 1
            }
          },
          {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
              gapWidth: 1,
              borderColorSaturation: 0.6
            }
          }
        ];
      }
      myChart.setOption(
        (option = {
          title: {
            text: 'API概览',
            left: 'center'
          },
          tooltip: {
            formatter: function (info) {
              var value = info.value;
              var treePathInfo = info.treePathInfo;
              var treePath = [];
              for (var i = 1; i < treePathInfo.length; i++) {
                treePath.push(treePathInfo[i].name);
              }
              return [
                '<div class="tooltip-title">' +
                formatUtil.encodeHTML(treePath.join('/')) +
                '</div>',
                '请求数量: ' + formatUtil.addCommas(value) + ' 次'
               ].join('');
            }
          },
          series: [
            {
              name: 'API概览',
              type: 'treemap',
              visibleMin: 300,
              label: {
                show: true,
                formatter: '{b}'
              },
              itemStyle: {
                borderColor: '#fff'
              },
              levels: getLevelOption(),
              data: echart
            }
          ]
        })
      );
    })
  }, [])
  /********* 搜索 */
  return (
    <PageContainer
    >
      <div id='echart-container' style={{ height: '70vh' }}></div>
    </PageContainer>
  );
};