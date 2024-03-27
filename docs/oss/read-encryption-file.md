# 读取加密文件

Bucket 设置为 `加密读`

给文件的 `url` 加上 `OSSAccessKeyId`、`Expires`、`Signature` 和 `security-token` 参数

```js
client.signatureUrl(file.name)

// http://shenzhenoss97.oss-cn-shenzhen.aliyuncs.com/wallhaven-7pmgey.jpg
// => 
// "http://shenzhenoss97.oss-cn-shenzhen.aliyuncs.com/wallhaven-7pmgey.jpg?OSSAccessKeyId=STS.NTv57VMdWQb7vtan3g7g2xgbH&Expires=1711529319&Signature=VxbjRs%2BV90zLA55xK53qiwiImS4%3D&security-token=CAIS9QF1q6Ft5B2yfSjIr5fDfo3ioLt25qDcdFLQijMyO%2Bgel6LJqjz2IHhMeXVoCe8es%2Fg%2Bnm9V6PYYlqJoRoReREvCccZr8sy4Tccw7NOT1fau5Jko1beHewHKeTOZsebWZ%2BLmNqC%2FHt6md1HDkAJq3LL%2Bbk%2FMdle5MJqP%2B%2FUFB5ZtKWveVzddA8pMLQZPsdITMWCrVcygKRn3mGHdfiEK00he8ToltvXlm5XDt0aO1wWilrQvyt6vcsT%2BXa5FJ4xiVtq55utye5fa3TRYgxowr%2F8u0fAcqWif443MWQYMvUXcKYnT6cYqJwh%2FerI9H773GRkhCniy0BqAAV76rEbFG3yCE7e45zdM2zQ7KMKKfY5Kf6%2B%2Fu4AdvSMt3Ryx76eFhy406YbxU0oN9cHFX71w7AhPTGv9EpMrTypccDESCK4Y3iUukuHYiyqIMiOpFoZmN8irOyhdHHWT9IRv%2BCTYfL3eb74E3fNTUBaUj8K2ZUE4akddoUSXqnVLIAA%3D"
```