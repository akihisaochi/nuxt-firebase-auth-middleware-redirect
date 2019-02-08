export default function(context) {
  if (context.from !== undefined) {
    if (context.from.name === 'admin-auth') return
  }
  context.store.dispatch('initAuth', {
    callback: token => authExecution(context, token),
    cookie: context.req ? context.req.headers.cookie : null
  })
}
function authExecution(context, token) {
  if (!token) {
    context.redirect(`/admin/auth`)
  }
}
