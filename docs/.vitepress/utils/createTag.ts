export interface TagItem {
  title: string,
  link: string
}

export interface TagGroup {
  groupName: string,
  items: TagItem[]
}

export interface TagStatus {
  type: string,
  text: string
}

export const tagStatusMap = {
  'BETA': { type: 'warning', text: 'beta' },
  'MERGED': { type: 'danger', text: 'merged' },
  'UPDATED': { type: 'info', text: 'updated' }
}

export function createTag(): TagGroup[] {
  const res: TagGroup[] = [
    {
      groupName: '前端基础', items: [
        { title: 'Javascript', link: '/javascript/event-loop' },
        { title: 'JS Code', link: '/javascript/wapper-for-websocket-vue3' },
        { title: 'Typescript', link: '/typescript/basic-object-and-function' },
        { title: 'CSS', link: '/css/gradient-color' },
        { title: '类型编程', link: '/typescript/internal-tool-type' },
        { title: 'HTTP', link: '/http/HTTP-request-and-response-header' },
      ]
    },
    {
      groupName: '框架', items: [
        { title: 'Vue3', link: '/vue3/get-component-instance-in-setup' },
        { title: 'React', link: '/react/avoid-mutation' },
        { title: 'React Native', link: '/react-native/styleSheet' },
      ]
    },
    {
      groupName: '工具', items: [
        { title: 'Git', link: '/git/01-git-pull-repository' },
        { title: 'SQL', link: '/sql/my-sql-single-table-operation' },
        { title: 'OSS', link: '/oss/get-sts' },
        { title: 'Docker', link: '/docker/docker-and-compose' },
      ]
    },
    {
      groupName: '第三方库', items: [
        { title: 'mockJs', link: '/3-party-library/how-to-use-mockjs' }
      ]
    },
    {
      groupName: '杂项', items: [
        { title: 'Config', link: '/config/off-hibernate' },
        { title: 'Error Fix', link: '/fix/nvm-president-problem-for-mac' },
      ]
    },
    {
      groupName: '杂谈', items: [
        { title: 'Ordinary', link: '/ordinary/What-marriage-brings-to-me' }
      ]
    }
  ]

  return res
}