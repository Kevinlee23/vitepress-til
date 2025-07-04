---
outline: deep
---

# 定时任务

> 任务调度允许你安排任意代码（方法/函数）在固定日期/时间、重复间隔或在指定间隔后执行一次

## 安装

```bash
$ pnpm add @nestjs/schedule
$ pnpm adad cron # cron 的版本要和 @nestjs/schedule 中使用的版本保持一致
```

## 接入

```typescript
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot()],
})
export class AppModule {}
```

## 组织定时任务模块和服务

```typescript
@Module({
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
```

```typescript
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private scheduleRegistry: SchedulerRegistry) {}

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: "30-SECONDS",
    timeZone: "Asia/Shanghai",
  })
  handleCron() {
    this.logger.debug("Called when the second is 30");
  }
}
```

## 定时任务装饰器

### 时间定义

在定时任务的执行函数前加上装饰器 @Cron():

`Cron(cronTime: CronJobParams['cronTime'], options?: CronOptions)`

这里定时任务的时间可以是：

- 一次指定的日期和时间
- 在指定的间隔内的指定时刻

标准定时模式：

- 星号 (\*)
- 作用域 (1-3,5)
- 步骤 (\*/2)

corn 模式字符：

```txt
* * * * * *
| | | | | |
| | | | | day of week
| | | | months
| | | day of month
| | hours
| minutes
seconds (optional)
```

@nestjs/schedule 提供了一个枚举：CronExpression, 方便进行定时任务

### options

@cron 第二个参数是配置项，包含：

- name 用于声明后访问和控制 cron-job
- timeZone 指定执行时区，具体参考 [链接](https://moment.nodejs.cn/timezone/)

## 动态 cron job

可以在代码中任何位置注入：schedulerRegistry: SchedulerRegistry

### 动态关闭

假设已经有一个定时任务，name 为 notifications, 可以通过以下方式访问：

```typescript
@Controller("task")
class TaskControll {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Get("stop")
  stopCron() {
    const job = this.schedulerRegistry.getCronJob("notifications");

    job.stop();
    console.log(job.lastDate());
  }
}
```

### cron job 实例

getCronJob() 方法返回指定的 cron 作业。返回的 CronJob 对象有以下方法：

- stop() - 停止计划运行的作业
- start() - 重新启动已停止的作业
- setTime(time: CronTime) - 停止作业，为其设置新时间，然后启动它
- lastDate() - 返回上次执行作业发生的日期的 DateTime 表示形式
- nextDate() - 返回 DateTime 表示的日期，表示计划下次执行作业的日期
- nextDates(count: number) - 为将触发作业执行的下一组日期提供 DateTime 表示形式的数组（大小 count）。count 默认为 0，返回空数组。

### 动态开启

也可以在代码中动态开启一个定时任务：

```typescript
@Controller("task")
class TaskControll {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Get("enable")
  enableCron(@Query("name") name: string, @Query("second") second: string) {
    const job = new CronJob(seconds, () => {
      this.logger.debug("Called when the second is 10");
    });

    this.scheduleRegistry.addCronJob(name, job);
    job.start();

    this.logger.debug(`job ${name} start`);
  }
}
```
