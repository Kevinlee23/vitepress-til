import { ref, computed } from "vue";

interface DayItem {
  text: string | number;
  color: string;
  num: string | number;
}

const NOT_THIS_MON_COLOR: string = "#c2c4c3";
const FREQUENCY_COLOR: string[] = ["#ebedf0", "#9be9a8", "#30a14e", "#216e39"];

export default function useMonthCompute(
  year: number,
  month: number,
  length: number
) {
  const monthDate = ref<number[]>(new Array(length).fill(0));
  const monthMax = ref<number>(0);

  /**
   * 月份数据转化成 color:
   * 深灰色(不属于这个月的数据)
   * 浅灰色(文章数为 0 的日期)
   * 浅绿(小于每日平均文章数且不等于 0 的日期)
   * 次绿(大于每日平均文章数的日期)
   * 深绿(最大文章数的日期)
   */
  const monColor = computed(() => {
    return (markedDate: number[]) => {
      const fDay = new Date(`${year}-${month}-01`).getDay();
      const prefixLength = fDay === 0 ? 6 : fDay - 1;

      const prefixArr = new Array(prefixLength).fill({
        text: "last",
        color: NOT_THIS_MON_COLOR,
        num: "null",
      });

      const lDay = new Date(`${year}-${month}-${length}`).getDay();
      const suffixLength = lDay === 0 ? 0 : 7 - lDay;
      const suffixArr = new Array(suffixLength).fill({
        text: "next",
        color: NOT_THIS_MON_COLOR,
        num: "null",
      });

      const _length = markedDate.length;
      const arr = new Array(_length).fill(null);
      const addDay = _length;
      const fillDay = new Set(markedDate).size;
      monthDate.value.map((num, index) => {
        if (num === 0) {
          arr[index] = { text: index + 1, color: FREQUENCY_COLOR[0], num };
        } else if (num === monthMax.value && num >= 3) {
          arr[index] = { text: index + 1, color: FREQUENCY_COLOR[3], num };
        } else if (num > addDay / fillDay) {
          arr[index] = { text: index + 1, color: FREQUENCY_COLOR[2], num };
        } else {
          arr[index] = { text: index + 1, color: FREQUENCY_COLOR[1], num };
        }
      });

      const allDay = [...prefixArr, ...arr, ...suffixArr];
      const result: DayItem[] = [];
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
  const monthInit = (markedDate: number[]) => {
    markedDate.map((day) => {
      monthDate.value[day - 1]++;
    });
    monthDate.value.map((num) => {
      monthMax.value = Math.max(monthMax.value, num);
    });
  };

  return { monColor, monthInit };
}
