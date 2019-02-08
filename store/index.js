import axios from 'axios'
import Cookie from 'js-cookie'
const cookieparser = require('cookieparser')

export const satate = () => ({
  loadedPosts: [],
  token: null
})
export const getters = {
  loadedPosts(state) {
    return state.loadedPosts
  },
  isAuthenticated(state) {
    return state.token != null
  }
}
export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts
  },
  addPost(state, post) {
    state.loadedPosts.push(post)
  },
  editPost(state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(
      post => post.id === editedPost.id
    )
    state.loadedPosts[postIndex] = editedPost
  },
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
    alert('clear localStorage')
    localStorage.clear()
    Cookie.remove('token')
  }
}
export const actions = {
  nuxtServerInit(vuexContext, context) {
    return axios
      .get(`${process.env.baseUrl}/posts.json`)
      .then(res => {
        const postsArray = []
        for (const key in res.data) {
          postsArray.push({ ...res.data[key], id: key })
        }
        vuexContext.commit('setPosts', postsArray)
      })
      .catch(e => context.error(e))
  },
  addPost(vuexContext, postData) {
    const createdPost = {
      ...postData,
      updatedDate: new Date()
    }
    return axios
      .post(
        `${process.env.baseUrl}/posts.json?auth=${vuexContext.state.token}`,
        createdPost
      )
      .then(result => {
        vuexContext.commit('addPost', {
          ...createdPost,
          id: result.data.name
        })
      })
      .catch(e => console.log(e))
  },
  editPost(vuexContext, editedPost) {
    return axios
      .put(
        `${process.env.baseUrl}/posts/${editedPost.id}.json?auth=${
          vuexContext.state.token
        }`,
        editedPost
      )
      .then(res => {
        vuexContext.commit('editPost', editedPost)
      })
      .catch(e => console.log(e))
  },
  setPosts(vuexContext, posts) {
    vuexContext.commit('setPosts', posts)
  },
  authenticateUser(vuexContext, authData) {
    const authUrl = authData.isLogin
      ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword'
      : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser'
    return axios
      .post(`${authUrl}?key=${process.env.fbAPIKey}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(result => {
        const expiresIn = Number(result.data.expiresIn) * 100
        localStorage.setItem('token', result.data.idToken)
        Cookie.set('token', result.data.idToken, { expires: expiresIn })

        vuexContext.commit('setToken', result.data.idToken)
        vuexContext.dispatch('setLogoutTimer', expiresIn)
        authData.router.push('/admin/')
      })
      .catch(e => {
        console.info(e)
      })
  },
  setLogoutTimer(vuexContext, duration) {
    setTimeout(() => {
      vuexContext.commit('clearToken')
    }, duration)
  },
  initAuth(vuexContext, initPotion) {
    const parsedCokkie =
      initPotion.cookie !== null ? cookieparser.parse(initPotion.cookie) : null
    const token =
      parsedCokkie === null ? localStorage.getItem('token') : parsedCokkie.token
    initPotion.callback(token)
    if (token) {
      vuexContext.commit('setToken', token)
    }
  }
}
