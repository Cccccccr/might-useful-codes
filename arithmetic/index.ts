const compareEunm = {
  more: '>',
  less: '<',
  equal: '=',
}

/**
 *字符串前面或后面增加0
 *
 * @param {string} numStr
 * @param {number} addNum
 * @param {Boolean} [type=true] true前面加 false后面加
 * @return {*}  {string}
 */
const addZero = (numStr: string, addNum: number, type: Boolean = true):string => {
  for(let i = 0; i < addNum; i++) {
    if(type) {
      numStr = '0' + numStr;
    } else {
      numStr += '0';
    }
  }
  return numStr;
}

/**
 *加法
 *
 * @param {string} addend1
 * @param {string} addend2
 * @return {*}  {string}
 */
const addtion = (addend1: string, addend2: string): string => {
  if(addend1.length === addend2.length) {
    let len = addend1.length,
    carry = 0,
    res = '';
    while(len) {
      --len;
      const tempRes = ~~addend1[len] + ~~addend2[len] + carry;
      if(tempRes > 9) {
        res += tempRes % 10;
        carry = 1;
      } else {
        res += tempRes;
        carry = 0;
      }
    }
    if(carry) res += '1';
    return res.split('').reverse().join('');
  }
  return '';
}


/**
 *整数加法
 *
 * @param {string} addend1
 * @param {string} addend2
 * @param {Boolean} [part=true] true整数部分 false小数部分
 * @return {*}  {string}
 */
const addtionInt = (addend1: string, addend2: string, part: Boolean = true): string => {
  if(addend1.length <= addend2.length) {
    [addend1, addend2] = [addend2, addend1];
  }
  const maxLen = addend1.length;
  addend2 = addZero(addend2, maxLen - addend2.length, part);
  return addtion(addend1, addend2);
}

/**
 *小数相加
 *
 * @param {string} addend1
 * @param {string} addend2
 * @return {*}  {string}
 */
const addtionFloat = (addend1: string, addend2: string): string => {
  let [a1, a2] = addend1.split('.');
  let [b1, b2] = addend2.split('.');
  if(a1.length < b1.length) {
    [a1, b1] = [b1, a1];
  }
  if(a2.length < b2.length) {
    [a2, b2] = [b2, a2];
  }
  const intLen = a1.length;
  const floatLen = a2.length;
  let intRes = addtionInt(a1, b1);
  let floatRes = addtionInt(a2, b2, false);
  if(floatRes.length > floatLen) {
    return addtionInt(intRes, '1') + '.' + floatRes.slice(1);
  } else {
    return intRes + '.' + floatRes;
  }
}

function clearPreZero(str: string): string {
  let arr = str.split('');
  while(arr.length > 1) {
    if(arr[0] === '0') {
      arr.shift()
    } else {
      break;
    }
  }
  return arr.join('');
}

function compareIntStrNum(num1: string, num2: string): string | boolean {
  num1 = clearPreZero(num1);
  num2 = clearPreZero(num2);
  if(num1 === num2) {
    return compareEunm.equal;
  }
  if(num1.length !== num2.length) {
    return num1.length > num2.length ? compareEunm.more : compareEunm.less
  }
  if(num1.length < num2.length) [num1, num2] = [num2, num1];
  let arr1 = num1.split('');
  let arr2 = num2.split('');
  for(let i = 0, len = arr1.length; i < len; i++) {
    if(Number(arr1[i]) > Number(arr2[i])) {
      return compareEunm.more;
    }
    if(Number(arr1[i]) < Number(arr2[i])){
      return  compareEunm.less;
    }
  }
  return false
}

function power2(time: string): string | boolean {
  let res = '1',
      currTime = '0';
  while(compareIntStrNum(currTime, time) === compareEunm.less) {
    res = addtionInt(res, res);
    currTime = addtionInt(currTime, '1');
  }
  return res;
}

function multiplication(multiplier1: string, multiplier2: string): string | boolean {
  const p2IndexGenrate = (p2Index: object, index: string, initVlaue?: string): object => {
    const nextIndex = addtionInt(index, '1');
    if(index === '1') {
      p2Index[index] = {
        curr: index,
        next: nextIndex,
        value: '1',
        addValue: initVlaue
      }
    }
    p2Index[nextIndex] = {
      curr: nextIndex,
      next: addtionInt(nextIndex, '1'),
      pre: index,
      value: power2(currIndex),
      addValue: addtionInt(p2Index[index].addValue, p2Index[index].addValue) 
    }
    return p2Index
  }

  let time = '0'; // 和multiplier2对比，目前为之相加的次数
  let currIndex = '1';
  let p2Index = {};
  let res = '0';

  let count = 0;

  if(compareIntStrNum(multiplier1, multiplier2) === compareEunm.less) {
    [multiplier1, multiplier2] = [multiplier2, multiplier1];
  }

  // 初始化p2Index
  p2IndexGenrate(p2Index, currIndex, multiplier1);

  let tempTime = addtionInt(time, p2Index[currIndex].value);
  let continueFlag = true;
  while(continueFlag) {
    switch(compareIntStrNum(tempTime, multiplier2)) {
      case compareEunm.less: 
        console.log(res, time, ++count, p2Index[currIndex].value, "-----------");
        time = addtionInt(time, p2Index[currIndex].value);
        res = addtionInt(res, p2Index[currIndex].addValue);
        currIndex = addtionInt(currIndex, '1');
        p2IndexGenrate(p2Index, currIndex);
        tempTime = addtionInt(time, p2Index[currIndex].value);
        break;
      case compareEunm.more:
        tempTime = addtionInt(time, p2Index[p2Index[currIndex].pre].value);
        currIndex = p2Index[currIndex].pre;
        break;
      case compareEunm.equal:
        console.log(res, time, ++count, p2Index[currIndex].value, "+++++++++++");
        res = addtionInt(res, p2Index[currIndex].addValue);
        continueFlag = false;
        break;
      default:
        break;
    }

    if(Number(currIndex) > 1024) {
      continueFlag = false;
    }
  }
  return res || false; 
}

const num1 = '999999999999999';
const num2 = '99999999999';
multiplication(num1, num2);
console.log(Number(num1) * Number(num2));
// console.log(power2('4'));
