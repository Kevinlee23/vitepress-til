# Redis 基础

## key-value

- set, get 存储，获得键值对数据
- incr 自增存储的键值数据
- keys 查询数据库中的键

```bash
keys 'jwt_token_username'
keys 'jwt_token_*'
keys '*'
```

## list

> 这些都是对列表型数据的操作

- lpush: 尾增
- lpop: 尾出
- rpush: 头增
- rpop: 头出
- lrange (list, begin, end): 获取列表数据
- llen: 返回长度
- lmove: 将数据从一个列表移到另一个列表

## set

> 无序、不重复集合

- sadd: 存储数据
- srem: 移除数据
- sismember: 判断数据是否在集合中
- scard: 返回集合长度
- smenbers: 返回储存在 key 处的所有集合值

```bash
redis> SADD myset "Hello" "World"
redis> SADD myset "World"
redis> SMEMBERS myset

"Hello"
"World"
```

## zset

> 排序、不重复集合

- zadd: 存储数据
- zrem: 移除数据
- zrange: 取排名范围的数据
- zrank: 返回指定键的值排名

```bash
$ ZADD myzset 1 "one"
$ ZADD myzset 1 "uno"
$ ZADD myzset 2 "two" 3 "three"
$ ZRANGE myzset 0 -1 WITHSCORES

"one"
"1"
"uno"
"1"
"two"
"2"
"three"
"3"
```

## hash

> map 型数据

- hset, hmset
- hget, hmget
- hdel
- hkeys
- hlen
- hexists

## expire， ttl

> 为 key-value 数据设置、查询过期时间 (s)

## 资料

[api 查询](https://redis.io/docs/latest/commands/)
