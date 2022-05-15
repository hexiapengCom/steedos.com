import { createPageList } from '@/utils/createPageList'

const deploy = createPageList(
  require.context(`../pages/docs/deploy/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/deploy'
)
const admin = createPageList(
  require.context(`../pages/docs/admin/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/admin'
)
const user = createPageList(
  require.context(`../pages/docs/user/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/user'
)
const developer = createPageList(
  require.context(`../pages/docs/developer/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/developer'
)

export const documentationNav = {
  '安装部署': [
    deploy['getting-started'],
    deploy['deploy-docker'],
    deploy['deploy-cloud'],
    deploy['devops'],
    deploy['deploy-windows'],
    deploy['deploy-mac'],
    deploy['deploy-activate'],
    deploy['steedos-config'],
    deploy['upgrade'],
  ],
  '用户向导': [
    user['getting-started'],
    user['apps'],
    user['workflow'],
  ],
  '管理员向导': [
    admin['getting-started'],
    admin['organization'],
    admin['permission_set'],
    admin['import'],
    admin['integration'],
  ],
  '自定义应用': [
    admin['create_object'],
    admin['field_type'],
    admin['formula'],
    admin['functions'],
    admin['no-code-extend'],
    admin['datasource'],
  ],
  '统计分析': [
    admin['record_report'],
    admin['dashboard'],
    admin['stimulsoft'],
    admin['reports'],
  ],
  '流程自动化': [
    admin['auto_process'],
    admin['workflow-rules'],
    admin['approval-process'],
    admin['workflow-admin'],
  ],
  '开发人员向导': [
    developer['getting-started'],
    developer['objectql'],
    developer['graphql-api'],
    developer['package'],
    developer['node-red'],
    developer['jsreport'],
    developer['deploy-gitpod'],
  ]
}
