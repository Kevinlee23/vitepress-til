import { computed } from "vue";

const NOT_THIS_MON_COLOR = "#c2c4c3";
const FREQUENCY_COLOR = ["#ebedf0", "#9be9a8", "#30a14e", "#216e39"];

export default function useMonthCompute() {
  /**
   * 月份数据转化成 color:
   * 深灰色(不属于这个月的数据)
   * 浅灰色(文章数为 0 的日期)
   * 浅绿(小于每日平均文章数且不等于 0 的日期)
   * 次绿(大于每日平均文章数的日期)
   * 深绿(最大文章数的日期)
   */
  const monColor = computed(() => {
    return (firstDay, lastDay, MON, monDate, monMax) => {
      const fDay = new Date(firstDay).getDay();
      const prefixLength = fDay === 0 ? 6 : fDay - 1;
      const prefixArr = new Array(prefixLength).fill({
        text: "last",
        color: NOT_THIS_MON_COLOR,
      });

      const lDay = new Date(lastDay).getDay();
      const suffixLength = lDay === 0 ? 0 : 7 - lDay;
      const suffixArr = new Array(suffixLength).fill({
        text: "next",
        color: NOT_THIS_MON_COLOR,
      });

      const arr = new Array(monDate.length).fill(null);
      const addDay = monDate.length
      const fillDay = new Set(monDate).size;
      MON.map((num, index) => {
        if (num === 0) {
          arr[index] = { text: index + 1, color: FREQUENCY_COLOR[0], num };
        } else if (num === monMax && num >= 3) {
          arr[index] = { text: index + 1, color: FREQUENCY_COLOR[3], num };
        } else if (num > addDay / fillDay) {
          arr[index] = { text: index + 1, color: FREQUENCY_COLOR[2], num };
        } else {
          arr[index] = { text: index + 1, color: FREQUENCY_COLOR[1], num };
        }
      });

      const allDay = [...prefixArr, ...arr, ...suffixArr];
      const result = [];
      const xLen = 7;
      const yLen = allDay.length / 7;
      for (let x = 1; x < xLen + 1; x++) {
        for (let y = 1; y < yLen + 1; y++) {
          result.push(allDay[x + (y - 1) * 7 - 1]);
        }
      }

      return result;
    };
  });

  // 月份初始化
  const monthInit = (MON, monDate, monMax) => {
    monDate.map(day => {
      MON.value[day-1]++
    })
    MON.value.map(num => {
      monMax.value = Math.max(monMax.value, num)
    })
  }

  return { monColor, monthInit };
}
