
<script>
export default {
  data () {
    return {
      status: null,
      mainUserStatus: null,
      viewerCount: 0,
      mainUserData: {
        type: '',
        viewer_count: 0
      }
    }
  },

  methods: {
    userStatus (users) {
      // let params = ''
      // for (let i = 0; i < users.length; i++) {
      //   if (i === 0) {
      //     params += `${users[i]}`
      //   } else {
      //       params += `&user_id=${users[i]}`
      //   }
      // }
      var request = new XMLHttpRequest()
      var method = 'GET'
      var url = `https://api.twitch.tv/helix/streams?first=100&client_id=${this.clientId}&user_login=Dekier`
      var async = true
      request.open(method, url, async)
      request.setRequestHeader('Client-ID', this.clientId)
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          const userData = JSON.parse(request.responseText)
          this.status = userData.data.map(s => s.type)
          if (userData.data[0]) {
            this.mainUserData = userData.data[0]
          }
          // this.mainUserStatus = this.status[0]
          // this.viewerCount = userData.data[0].viewer_count
        }
      }
      // 424722616
      // 146046615
      request.send()
    }
  }
}
</script>