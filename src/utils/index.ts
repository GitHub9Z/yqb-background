import React from 'react';
import moment from 'moment';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import { message } from 'antd';
type RangePickerValue = RangePickerProps<moment.Moment>['value'];

export function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type: 'today' | 'week' | 'month' | 'year'): RangePickerValue {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }
  const year = now.getFullYear();

  if (type === 'month') {
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();
    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

// 字符串的下划线格式转驼峰格式，eg：hello_world => helloWorld
export function underline2Hump(s: string) {
  return s.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

// 字符串的驼峰格式转下划线格式，eg：helloWorld => hello_world
export function hump2Underline(s: string) {
  return s.replace(/([A-Z])/g, '_$1').toLowerCase();
}

// JSON对象的key值转换为驼峰式
export function jsonToHump(obj: any) {
  if (obj instanceof Array) {
    obj.forEach(function (v) {
      jsonToHump(v);
    });
  } else if (obj instanceof Object) {
    Object.keys(obj).forEach(function (key) {
      const newKey = underline2Hump(key);
      if (newKey !== key) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
      jsonToHump(obj[newKey]);
    });
  }
}

export function customBreadcrumb(name: string | undefined) {
  return (_: any, defaultDom: any) => {
    // defaultDom 是组件实例，获取组件内部的面包屑的原始值
    const routes = [...defaultDom?.props.routes];
    // 获取原始值要操作的数据
    const items = routes[routes.length - 1];

    const reg = RegExp(name || '', 'g');
    if (items && name && !reg.test(items.breadcrumbName)) {
      items.breadcrumbName = name + items.breadcrumbName;
    }
    // 通过React cloneElement转换，并重新给defaultDom组件赋值
    return React.cloneElement(defaultDom as any, {
      routes,
    });
  };
}

export const getMetaType = (arg: any) => {
  const mate = Object.prototype.toString.call(arg);
  return mate;
};

export function isPromise(p: any) {
  return !!p && (getMetaType(p) === '[object Promise]' || getMetaType(p) === '[object AsyncFunction]');
}

/**
 * 深拷贝数组或对象
 */
export const deepClone: any = (source: any[] | object | undefined) => {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments deepClone');
  }
  const targetObj = source.constructor === Array ? [] : {};

  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });

  return targetObj;
};

/**
 * 接口请求状态toast
 * @param status 接口返回的状态值
 * @param operation 操作
 */
export const operationToast = (status: any, operation: string) => {
  if (status) {
    message.success(`${operation}成功`);
  } else {
    message.error(`${operation}失败请重试！`);
  }
};
export function objectMerge(target: object, source: object) {
  if (typeof target !== 'object') {
    // eslint-disable-next-line no-param-reassign
    target = {};
  }
  if (Array.isArray(source)) {
    const newArray = JSON.stringify(source);
    // return source.slice()
    return JSON.parse(newArray);
  }

  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}
/**
 * 清除查询条件带空字符串
 * @param name
 * @returns Function
 */
export function cleanEmptyStr(name: string) {
  return (value: any) => {
    const params = {};

    const val = typeof value === 'string' && value === '' ? undefined : value;
    params[name] = val;
    return params;
  };
}

export const getParams = (url: string, key: string) => {
  const res = new RegExp('(?:&|/?)' + key + '=([^&$]+)').exec(url);
  return res ? res[1] : '';
};
