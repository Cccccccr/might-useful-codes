function getRes (stack) {
  if (stack.length === 1) {
    return Number(stack[0]);
  }
  while (stack.length > 1) {
    let res = 0;
    const value1 = Number(stack.shift());
    const operator = stack.shift();
    let value2 = Number(stack.shift());
    if (operator === '-' || operator === '+') {
      while (stack.length && (stack[0] === '*' || stack[0] === '/')) {
        const nextOpeartor = stack.shift();
        const nextValue2 = Number(stack.shift());
        if (nextOpeartor === '*') {
          value2 =  value2 * nextValue2;
        } else {
          value2 = value2 / nextValue2;
        }
      }
      if (operator === '-') {
        res = value1 - value2;
      } else {
        res = value1 + value2;
      }
    } else if (operator === '*') {
      res = value1 * value2;
    } else if (operator === '/') {
      res = value1 / value2;
    } else {
      throw new Error('解析有误');
    }
    stack.unshift(res);
  }
  return stack[0];
};
function calculate(s) {
  const operator = ['+', '-', '*', '/'];
  const brackets = ['(', ')'];
  let stack = [];
  let temp = '';
  s.split('').forEach((item) => {
    if (~operator.indexOf(item) || ~brackets.indexOf(item)) {
      stack.push(temp);
      temp = '';
      stack.push(item);
    } else {
      temp = temp + item;
    }
  });
  stack.push(temp);
  stack = stack.filter(item => item);
  const first = stack[0];
  if (first === '+' || first === '-') {
    stack.unshift('0');
  }
  if (first === '(') {
    stack.unshift('0', '+');
  }
  const operation = (stack) => {
    const tempStack = [];
    let index = 0;
    if (!~stack.indexOf('(') && !~stack.indexOf(')')) {
      // 没有括号了，可以开始运算
      return getRes(stack);
    }
    while (index < stack.length) {
      const item = stack[index];
      // 如果是左括号，寻找右括号
      if (item === '(') {
        let left  = 1;
        for (let i = index + 1; i < stack.length; i++) {
          if (stack[i] === '(') {
            left = left + 1;
          } else if (stack[i] === ')') {
            left = left - 1;
            if (left === 0) {
              tempStack.push(operation(stack.slice(index + 1, i)));
              index = i + 1;
              break;
            }
          }
          if (i === stack.length - 1) {
            index = i + 1;
            throw new Error('错误的表达式');
          }
        }
      } else {
        tempStack.push(item);
        index += 1;
      }
    }
    return operation(tempStack);
  };
  return operation(stack);
}

// example
// console.log(calculate('-(1289+(213991)-(1289+(12839*4/2)/1+128/8))*1')) // -188297

module.exports = {
  calculate
};