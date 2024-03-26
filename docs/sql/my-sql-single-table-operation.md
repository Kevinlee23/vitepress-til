# 单表基本操作

## 前提

表结构:

- 学生表 `student (id, name, gender, age, class, score)`

## sql

```sql
SELECT * FROM student;

SELECT name, score FROM student;

SELECT * FROM student WHERE class IN ('一班', '二班');

# 占位符
SELECT * FROM student WHERE name LIKE '王%';

# AND
SELECT * FROM student WHERE name LIKE '王%' AND class In ('一班', '二班');

# NOT IN
SELECT * FROM student WHERE class NOT IN ('一班', '二班');

# BETWEEN
SELECT * FROM student WHERE age BETWEEN 18 AND 19;

# 分页查询, 0-5
SELECT * FROM student LIMIT 0, 5;

# 分页查询, 5-10
SELECT * FROM student LIMIT 5, 5;

# 排序
SELECT name, score, age FROM student ORDER BY score DESC, age ASC;

# 内置平均函数 AVG, 分组 ORDER BY 分组后过滤 HAVING
SELECT class AS '班级', AVG(score) AS '平均成绩' FROM student GROUP BY class ORDER BY '平均成绩' DESC;
SELECT class AS '班级', AVG(score) AS avg_score FROM student GROUP BY class HAVING avg_score > 90;

# COUNT 统计行
SELECT class AS '班级', COUNT(*) AS 'count' FROM student GROUP BY class;

# 去重
SELECT DISTINCT class FROM student;

# 内置函数 AVG COUNT SUM MIN MAX
SELECT AVG(score) AS '平均成绩', COUNT(*) AS '人数', SUM(score) AS '总成绩', MIN(score) AS '最低分', MAX(score) AS '最高分' FROM student;

# 判断语句 IF
SELECT name, IF(score >= 60, '及格', '不及格') AS '是否及格' from student;

# 判断语句 CASE (WHEN THEN) ELSE END
SELECT name, score, CASE WHEN score >= 90 THEN '优秀' WHEN score >= 60 THEN '良好' ELSE '差' END AS '成绩档次' FROM student;
```